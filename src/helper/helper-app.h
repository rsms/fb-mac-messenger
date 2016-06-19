#pragma once
#include "common.h"
#include "include/cef_app.h"
#include "include/cef_v8.h"
#include "include/cef_stream.h"
#include <map>

// Implement application-level callbacks for the browser process
struct HelperApp : public CefApp
                 , public CefRenderProcessHandler
                 , public CefV8Handler
{
  HelperApp();
  ~HelperApp();
  
  // CefApp methods:
  virtual CefRefPtr<CefRenderProcessHandler> GetRenderProcessHandler() OVERRIDE {
    return this;
  }

  // CefRenderProcessHandler methods:
  virtual void OnWebKitInitialized() OVERRIDE;
  virtual void OnContextCreated(CefRefPtr<CefBrowser>,
                                CefRefPtr<CefFrame>,
                                CefRefPtr<CefV8Context>) OVERRIDE;
  virtual void OnContextReleased(CefRefPtr<CefBrowser> browser,
                                 CefRefPtr<CefFrame> frame,
                                 CefRefPtr<CefV8Context> context) OVERRIDE;
  virtual bool OnProcessMessageReceived(CefRefPtr<CefBrowser>,
                                        CefProcessId,
                                        CefRefPtr<CefProcessMessage>) OVERRIDE;

  // CefV8Handler methods:
  virtual bool Execute(const CefString& name,
                       CefRefPtr<CefV8Value> object,
                       const CefV8ValueList& arguments,
                       CefRefPtr<CefV8Value>& retval,
                       CefString& exception) OVERRIDE;

  // Calling between JS and native
  struct Promise {
    CefRefPtr<CefV8Context> ctx;
    CefRefPtr<CefV8Value>   resolveFun;
    CefRefPtr<CefV8Value>   rejectFun;
    Promise(const Promise&) = delete; // not copyable
    Promise(Promise&&) = default;     // is movable
  };

  bool finalizePromise(bool isResolved, CefRefPtr<CefProcessMessage>);
  void cancelPromisesInCtx(CefRefPtr<CefV8Context>);

  // Resources
  CefRefPtr<CefStreamReader> streamForAppResource(const CefString& name);

private:
  using PromiseMap = std::map<int32, Promise>;

  int32      _msgid;
  PromiseMap _promises;

  // Include the default reference counting implementation.
  IMPLEMENT_REFCOUNTING(HelperApp);
};
