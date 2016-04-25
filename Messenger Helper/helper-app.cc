#include "helper-app.h"
#include <string>


// See https://bitbucket.org/chromiumembedded/cef/wiki/GeneralUsage#markdown-header-cefapp

// See https://bitbucket.org/chromiumembedded/cef/wiki/GeneralUsage#markdown-header-inter-process-communication-ipc


HelperApp::HelperApp() {
  // The same config values must be passed to both
  // CefMessageRouterBrowserSide and CefMessageRouterRendererSide.
  CefMessageRouterConfig c;
  c.js_query_function = "hostQuery";
  c.js_cancel_function = "hostCancelQuery";
  _msgRouter = CefMessageRouterRendererSide::Create(c);
}


HelperApp::~HelperApp() {
}

#pragma mark - CefRenderProcessHandler


// Called immediately after the V8 context for a frame has been created. To
// retrieve the JavaScript 'window' object use the CefV8Context::GetGlobal()
// method. V8 handles can only be accessed from the thread on which they are
// created. A task runner for posting tasks on the associated thread can be
// retrieved via the CefV8Context::GetTaskRunner() method.
void HelperApp::OnContextCreated(CefRefPtr<CefBrowser> b,
                                 CefRefPtr<CefFrame> f,
                                 CefRefPtr<CefV8Context> ctx)
{
  _msgRouter->OnContextCreated(b, f, ctx);
}


// Called immediately before the V8 context for a frame is released. No
// references to the context should be kept after this method is called.
void HelperApp::OnContextReleased(CefRefPtr<CefBrowser> b,
                                  CefRefPtr<CefFrame> f,
                                  CefRefPtr<CefV8Context> ctx)
{
  _msgRouter->OnContextReleased(b, f, ctx);
}


// Called when a new message is received from a different process. Return true
// if the message was handled or false otherwise. Do not keep a reference to
// or attempt to access the message outside of this callback.
bool HelperApp::OnProcessMessageReceived(CefRefPtr<CefBrowser> b,
                                         CefProcessId srcID,
                                         CefRefPtr<CefProcessMessage> m)
{
  //fprintf(stderr, "~ HelperApp::OnProcessMessageReceived '%s'\n",
  //        m->GetName().ToString().c_str());
  // Returns true if the message is handled by this router or false otherwise
  return _msgRouter->OnProcessMessageReceived(b, srcID, m);
}

