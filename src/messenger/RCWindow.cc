#include "RCWindow.h"
#include "App.h"
#include "include/wrapper/cef_helpers.h"

RCWindow::RCWindow() {
  _msgRouter.addCall("echo", [=](CefRefPtr<CefListValue> args,
                     CefRefPtr<MsgPromise> p)
  {
    p->resolve(args);
  });
  
  _msgRouter.addCall(u"createNotification", [=](CefRefPtr<CefListValue> args,
                     CefRefPtr<MsgPromise> p)
  {
    auto title = args->GetString(0);
    auto options = args->GetDictionary(1);
    
    static const auto kBody = CefStr(u"body");
    static const auto kIcon = CefStr(u"icon");
    static const auto kTag  = CefStr(u"tag");
    
    auto body = options->GetString(kBody);
    auto iconURL = options->GetString(kIcon);
    auto tag = options->GetString(kTag);

    auto n = App.notifications().create(title, body, iconURL, tag);
    if (_b) {
      n->setAssociatedBrowser(_b->GetBrowser());
    }
    n->schedule();

    // Return notification tag
    p->resolve(n->tag());
  });
  
  _msgRouter.addNotify(u"closeNotification", [=] (CefRefPtr<CefListValue> args) {
    auto tag = args->GetString(0);
    if (tag.empty()) {
      return;
    }
    App.notifications().remove(tag);
  });
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
  
//  CefBrowserHost::CreateBrowserSync(wconf, w.get(), "file:///Users/rsms/src/Messenger-cef/src/messenger/test.html", bconf, nullptr);
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


static const double kInitialZoom = -1.0;

void RCWindow::zoomIn() {
  setZoom(getZoom() + 0.5);
  //printf("zoom increased to %f\n", getZoom());
}

void RCWindow::zoomOut() {
  setZoom(getZoom() - 0.5);
  //printf("zoom decreased to %f\n", getZoom());
}

void RCWindow::resetZoom() {
  setZoom(kInitialZoom);
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
  if (srcID == PID_RENDERER) {
    return _msgRouter.handleMessage(b, m);
  }
  return false;
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
  if (!_hasLoadedOnce) {
    _hasLoadedOnce = true;
    _b->SetZoomLevel(kInitialZoom);
  }
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
  return false;
}


// Called on the browser process UI thread when the render process
// terminates unexpectedly. |status| indicates how the process
// terminated.
void RCWindow::OnRenderProcessTerminated(CefRefPtr<CefBrowser> b, TerminationStatus status) {
}
