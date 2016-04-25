#pragma once
#include "include/cef_app.h"
#include "include/wrapper/cef_message_router.h"

// Implement application-level callbacks for the browser process
struct HelperApp : public CefApp,
                   public CefRenderProcessHandler
{
  HelperApp();
  ~HelperApp();
  
  // CefApp methods:
  virtual CefRefPtr<CefRenderProcessHandler> GetRenderProcessHandler() OVERRIDE {
    return this;
  }

  // CefRenderProcessHandler methods:
  virtual void OnContextCreated(CefRefPtr<CefBrowser>,
                                CefRefPtr<CefFrame>,
                                CefRefPtr<CefV8Context>) OVERRIDE;
  virtual void OnContextReleased(CefRefPtr<CefBrowser> browser,
                                 CefRefPtr<CefFrame> frame,
                                 CefRefPtr<CefV8Context> context) OVERRIDE;
  virtual bool OnProcessMessageReceived(CefRefPtr<CefBrowser>,
                                        CefProcessId,
                                        CefRefPtr<CefProcessMessage>) OVERRIDE;

private:
  CefRefPtr<CefMessageRouterRendererSide> _msgRouter;

  // Include the default reference counting implementation.
  IMPLEMENT_REFCOUNTING(HelperApp);
};
