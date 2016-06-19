#include "helper-app.h"
#include "include/cef_app.h"
#include <string>


int main(int argc, char* argv[]) {
  CefMainArgs main_args(argc, argv);
  auto app = new HelperApp();
  return CefExecuteProcess(main_args, app, nullptr);
}


static CefString gMessenger_js_str;


HelperApp::HelperApp() {
  auto rs = streamForAppResource(CefStr(u"Messenger.js"));
  gMessenger_js_str = ReadUTF8CefStream(rs);
}


HelperApp::~HelperApp() {
}


#pragma mark - CefRenderProcessHandler

void HelperApp::OnWebKitInitialized() {
  CefRegisterExtension("Messenger", gMessenger_js_str, this);
}

// Called immediately after the V8 context for a frame has been created. To
// retrieve the JavaScript 'window' object use the CefV8Context::GetGlobal()
// method. V8 handles can only be accessed from the thread on which they are
// created. A task runner for posting tasks on the associated thread can be
// retrieved via the CefV8Context::GetTaskRunner() method.
void HelperApp::OnContextCreated(CefRefPtr<CefBrowser> b,
                                 CefRefPtr<CefFrame> f,
                                 CefRefPtr<CefV8Context> ctx)
{
  f->ExecuteJavaScript(
    CefStr(u"Messenger._onWindowReady(window);"),
    CefString(),
    0
  );
}


// Called immediately before the V8 context for a frame is released. No
// references to the context should be kept after this method is called.
void HelperApp::OnContextReleased(CefRefPtr<CefBrowser> b,
                                  CefRefPtr<CefFrame> f,
                                  CefRefPtr<CefV8Context> ctx)
{
  if (ctx) {
    cancelPromisesInCtx(ctx);
  }
}


// Called when a new message is received from a different process. Return true
// if the message was handled or false otherwise. Do not keep a reference to
// or attempt to access the message outside of this callback.
bool HelperApp::OnProcessMessageReceived(CefRefPtr<CefBrowser> b,
                                         CefProcessId srcID,
                                         CefRefPtr<CefProcessMessage> msg)
{
  auto args = msg->GetArgumentList();
  //printf("HelperApp OnProcessMessageReceived '%s', argc: %zu\n",
  //       msg->GetName().ToString().c_str(),
  //       msg->GetArgumentList()->GetSize());
  
  static const auto kResolve = CefStr(u"Resolve");
  static const auto kReject = CefStr(u"Reject");
  static const auto kEval = CefStr(u"Eval");
  
  if (srcID != PID_BROWSER) {
    return false;
  }
  
  auto name = msg->GetName();

  if (name == kResolve) {
    return finalizePromise(/*isResolved*/true, msg);
  }
  
  if (name == kReject) {
    return finalizePromise(/*isResolved*/false, msg);
  }
  
  if (name == kEval) {
    auto args = msg->GetArgumentList();
    if (args->GetSize() == 0) {
      return false;
    }
    
    std::vector<int64> frameIDs;
    b->GetFrameIdentifiers(frameIDs);
    
    if (frameIDs.empty()) {
      // No active frames -- consume message and do nothing
      return true;
    }

    auto jscode = args->GetString(0);
    b->GetMainFrame()->ExecuteJavaScript(jscode, CefString(), 0);
    
    return true;
  }

  return false;
}

