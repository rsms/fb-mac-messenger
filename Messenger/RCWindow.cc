#include "RCWindow.h"
#include "include/wrapper/cef_helpers.h"

RCWindow::RCWindow() {
  // Configure message router (e.g. to communicate with JS in a HTML document.)
  // The same config values must be passed to both
  // CefMessageRouterBrowserSide and CefMessageRouterRendererSide.
  CefMessageRouterConfig c;
  c.js_query_function = "hostQuery";
  c.js_cancel_function = "hostCancelQuery";
  _msgRouter = CefMessageRouterBrowserSide::Create(c);
  _msgRouter->AddHandler(this, /*first=*/true);
}


RCWindow::~RCWindow() {
  fprintf(stderr, "—— ~RCWindow\n");
}

//static
CefRefPtr<RCWindow> RCWindow::create(const std::string& url, const std::string& winID) {
  CEF_REQUIRE_UI_THREAD();

  auto w = CefRefPtr<RCWindow>(new RCWindow);
  
  CefWindowInfo wconf;
  wconf.width = 800;
  wconf.height = 600;
  
  w->createNativeWindow(wconf, winID);
  
  CefBrowserSettings bconf;
  bconf.web_security = STATE_DISABLED;
  bconf.local_storage = STATE_ENABLED;
  bconf.databases = STATE_ENABLED;
  bconf.application_cache = STATE_ENABLED;
  bconf.webgl = STATE_ENABLED;

  CefBrowserHost::CreateBrowserSync(wconf, w.get(), url, bconf, nullptr);

  return w;
}


void RCWindow::close() {
  if (_b != nullptr) {
    _b->CloseBrowser(false);
  }
}

void RCWindow::forceClose() {
  if (_b != nullptr) {
    _b->CloseBrowser(true);
  }
}


void RCWindow::onBecameKey() {
  // Give focus to the browser window.
  browserHost()->SetFocus(true);
  if (_onKey) {
    _onKey(this);
  }
}


void RCWindow::zoomIn() {
  setZoom(getZoom() + 0.5);
}

void RCWindow::zoomOut() {
  setZoom(getZoom() - 0.5);
}

void RCWindow::resetZoom() {
  setZoom(0);
}

double RCWindow::getZoom() {
  return _b == nullptr ? 0 : _b->GetZoomLevel();
}

void RCWindow::setZoom(double z) {
  if (_b != nullptr) {
    _b->SetZoomLevel(z);
    // TODO: persist for windows with an ID
  }
}


#pragma mark - CefLifeSpanHandler

// Called after a new browser is created
void RCWindow::OnAfterCreated(CefRefPtr<CefBrowser> b) {
  CEF_REQUIRE_UI_THREAD();
  fprintf(stderr, "—— RCWindow::OnAfterCreated browser#%d\n", b->GetIdentifier());
  
  _b = b->GetHost();
}


bool RCWindow::DoClose(CefRefPtr<CefBrowser> b) {
  CEF_REQUIRE_UI_THREAD();
  fprintf(stderr, "—— RCWindow::DoClose browser#%d\n", b->GetIdentifier());
  
  _isClosing = true;
  closeNativeWindow();
  
  //
  
  //fprintf(stderr, "—— RCWindow::DoClose EXIT browser#%d\n", b->GetIdentifier());
  return false;
}


// OnBeforeClose() is called immediately before the browser object is destroyed
void RCWindow::OnBeforeClose(CefRefPtr<CefBrowser> b) {
  CEF_REQUIRE_UI_THREAD();
  fprintf(stderr, "—— RCWindow::OnBeforeClose browser#%d\n", b->GetIdentifier());
  
  _msgRouter->OnBeforeClose(b);
  
  if (_onClose) {
    _onClose(this);
  }
  
  // Browser is about to be deallocated -- clear our reference
  _b = nullptr;
}

#pragma mark - CefClient

// Called when a new message is received from a different process. Return true
// if the message was handled or false otherwise. Do not keep a reference to
// or attempt to access the message outside of this callback.
bool RCWindow::OnProcessMessageReceived(CefRefPtr<CefBrowser> b,
                                        CefProcessId srcID,
                                        CefRefPtr<CefProcessMessage> m)
{
  //fprintf(stderr,
  //        "—— RCWindow::OnProcessMessageReceived browser#%d msg name: '%s'\n",
  //        b->GetIdentifier(),
  //        m->GetName().ToString().c_str());
  // Returns true if the message is handled by this router or false otherwise.
  return _msgRouter->OnProcessMessageReceived(b, srcID, m);
}


#pragma mark - CefDisplayHandler


void RCWindow::OnTitleChange(CefRefPtr<CefBrowser> b, const CefString& title) {
  CEF_REQUIRE_UI_THREAD();
  setTitle(title);
}


void RCWindow::OnAddressChange(CefRefPtr<CefBrowser> b,
                               CefRefPtr<CefFrame> f,
                               const CefString& urlstr)
{
  auto url = urlstr.ToString();
  //fprintf(stderr, "—— RCWindow::OnAddressChange browser#%d frame->IsMain()=%s url='%s'\n",
  //        b->GetIdentifier(), f->IsMain() ? "true" : "false", url.c_str());
  if (f->IsMain()) {
    // ...
  }
}

// Called to display a console message. Return true to stop the message from
// being output to the console.
bool RCWindow::OnConsoleMessage(CefRefPtr<CefBrowser> browser,
                                const CefString& message,
                                const CefString& source,
                                int line)
{
  return true; // XXX DEBUG mute console messages
}


#pragma mark - CefLoadHandler

void RCWindow::OnLoadStart(CefRefPtr<CefBrowser> b, CefRefPtr<CefFrame> f) {
  //fprintf(stderr,
  //        "—— RCWindow::OnLoadStart browser#%d thread=%s\n",
  //        b->GetIdentifier(),
  //        CefCurrentlyOn(TID_RENDERER) ? "TID_RENDERER" : "TID_UI");
}

void RCWindow::OnLoadError(CefRefPtr<CefBrowser> browser,
                           CefRefPtr<CefFrame> frame,
                           ErrorCode errorCode,
                           const CefString& errorText,
                           const CefString& failedUrl)
{
  CEF_REQUIRE_UI_THREAD();
  
  // Don't display an error for downloaded files.
  if (errorCode == ERR_ABORTED)
    return;
  
  // Display a load error message.
  std::stringstream ss;
  ss << "<html><body bgcolor=\"white\">"
  "<h2>Failed to load URL " << std::string(failedUrl) <<
  " with error " << std::string(errorText) << " (" << errorCode <<
  ").</h2></body></html>";
  frame->LoadString(ss.str(), failedUrl);
}


#pragma mark - CefRequestHandler

// Called on the UI thread before browser navigation. Return true to cancel
// the navigation or false to allow the navigation to proceed. The |request|
// object cannot be modified in this callback.
// CefLoadHandler::OnLoadingStateChange will be called twice in all cases.
// If the navigation is allowed CefLoadHandler::OnLoadStart and
// CefLoadHandler::OnLoadEnd will be called. If the navigation is canceled
// CefLoadHandler::OnLoadError will be called with an |errorCode| value of
// ERR_ABORTED.
bool RCWindow::OnBeforeBrowse(CefRefPtr<CefBrowser> b,
                              CefRefPtr<CefFrame> f,
                              CefRefPtr<CefRequest> request,
                              bool is_redirect)
{
  // Proceed
  _msgRouter->OnBeforeBrowse(b, f); // only call when proceeding w/ navigation
  return false;
}


// Called on the browser process UI thread when the render process
// terminates unexpectedly. |status| indicates how the process
// terminated.
void RCWindow::OnRenderProcessTerminated(CefRefPtr<CefBrowser> b, TerminationStatus status) {
  _msgRouter->OnRenderProcessTerminated(b);
}


#pragma mark - CefMessageRouterBrowserSide::Handler


// Executed when a new query is received. |query_id| uniquely identifies the
// query for the life span of the router. Return true to handle the query
// or false to propagate the query to other registered handlers, if any. If
// no handlers return true from this method then the query will be
// automatically canceled with an error code of -1 delivered to the
// JavaScript onFailure callback. If this method returns true then a
// Callback method must be executed either in this method or asynchronously
// to complete the query.
bool RCWindow::OnQuery(CefRefPtr<CefBrowser> b,
                       CefRefPtr<CefFrame> f,
                       int64 query_id,
                       const CefString& request,
                       bool persistent,
                       CefRefPtr<Callback> callback)
{
  fprintf(stderr,
          "—— RCWindow::OnQuery browser#%d"
          " query_id=%llu,"
          " request=%s"
          " persistent=%s"
          "\n",
          b->GetIdentifier(),
          query_id,
          request.ToString().c_str(),
          persistent ? "true" : "false");
  // TODO: something meaningful
  callback->Success(CefString("Hello from browser process"));
  return true;
}


// Executed when a query has been canceled either explicitly using the
// JavaScript cancel function or implicitly due to browser destruction,
// navigation or renderer process termination. It will only be called for
// the single handler that returned true from OnQuery for the same
// |query_id|. No references to the associated Callback object should be
// kept after this method is called, nor should any Callback methods be
// executed.
void RCWindow::OnQueryCanceled(CefRefPtr<CefBrowser> b,
                               CefRefPtr<CefFrame> f,
                               int64 query_id)
{
  fprintf(stderr, "—— RCWindow::OnQueryCanceled browser#%d query_id=%llu\n", b->GetIdentifier(), query_id);
  // TODO: cancel any in-flight queries
}
