#pragma once

#include "include/cef_base.h"
#include "include/cef_client.h"
#include "include/wrapper/cef_message_router.h"

#include <functional>

template <typename F> using func = std::function<F>;


struct RCWindow : public CefClient,
                  public CefDisplayHandler,
                  public CefLifeSpanHandler,
                  public CefLoadHandler,
                  public CefRequestHandler,
                  public CefMessageRouterBrowserSide::Handler
{
  using WinCallback = func<void(CefRefPtr<RCWindow>)>;

  static CefRefPtr<RCWindow> create(const std::string& url, const std::string& winID);
  
  void setID(const std::string& winID);
  void setTitle(const CefString&);
  void hide();
  void show();
  void showAndMakeKey();
  void close();
  void forceClose();
  
  // Zooming the view
  void zoomIn();
  void zoomOut();
  void resetZoom();
  double getZoom();
  void setZoom(double);
  
  // Callbacks from native window
  void onBecameKey();
  void setOnKey(WinCallback cb) { _onKey = cb; }
  void setOnClose(WinCallback cb) { _onClose = cb; }

  // true if DoClose has been called and the window is about to disappear.
  bool isClosing() const { return _isClosing; }
  
  const CefRefPtr<CefBrowserHost>& browserHost() { return _b; }
  
  // CefClient methods:
  virtual CefRefPtr<CefLifeSpanHandler> GetLifeSpanHandler() OVERRIDE { return this; }
  virtual CefRefPtr<CefDisplayHandler> GetDisplayHandler() OVERRIDE { return this; }
  virtual CefRefPtr<CefLoadHandler> GetLoadHandler() OVERRIDE { return this; }
  virtual CefRefPtr<CefRequestHandler> GetRequestHandler() OVERRIDE { return this; }
  virtual bool OnProcessMessageReceived(CefRefPtr<CefBrowser>,
                                        CefProcessId src,
                                        CefRefPtr<CefProcessMessage>) OVERRIDE;

  // CefLifeSpanHandler methods:
  virtual void OnAfterCreated(CefRefPtr<CefBrowser> browser) OVERRIDE;
  virtual bool DoClose(CefRefPtr<CefBrowser> browser) OVERRIDE;
  virtual void OnBeforeClose(CefRefPtr<CefBrowser> browser) OVERRIDE;

  // CefDisplayHandler methods:
  virtual bool OnConsoleMessage(CefRefPtr<CefBrowser> browser,
                                const CefString& message,
                                const CefString& source,
                                int line) OVERRIDE;
  virtual void OnTitleChange(CefRefPtr<CefBrowser> browser,
                             const CefString& title) OVERRIDE;
  virtual void OnAddressChange(CefRefPtr<CefBrowser> browser,
                               CefRefPtr<CefFrame> frame,
                               const CefString& url) OVERRIDE;

  // CefLoadHandler methods:
  virtual void OnLoadStart(CefRefPtr<CefBrowser> browser,
                           CefRefPtr<CefFrame> frame) OVERRIDE;
  virtual void OnLoadError(CefRefPtr<CefBrowser> browser,
                           CefRefPtr<CefFrame> frame,
                           ErrorCode errorCode,
                           const CefString& errorText,
                           const CefString& failedUrl) OVERRIDE;

  // CefRequestHandler methods:
  virtual bool OnBeforeBrowse(CefRefPtr<CefBrowser>,
                              CefRefPtr<CefFrame>,
                              CefRefPtr<CefRequest>,
                              bool is_redirect) OVERRIDE;
  virtual void OnRenderProcessTerminated(CefRefPtr<CefBrowser>,
                                         TerminationStatus) OVERRIDE;

  // CefMessageRouterBrowserSide::Handler methods:
  virtual bool OnQuery(CefRefPtr<CefBrowser> browser,
                       CefRefPtr<CefFrame> frame,
                       int64 query_id,
                       const CefString& request,
                       bool persistent,
                       CefRefPtr<Callback> callback) OVERRIDE;
  virtual void OnQueryCanceled(CefRefPtr<CefBrowser> browser,
                               CefRefPtr<CefFrame> frame,
                               int64 query_id) OVERRIDE;

  // closeNativeWindow is called just before the window closes.
  // The implementation should clear the window's browser view so that the
  // underlying CefBrowser implementation can deallocate it's view.
  void closeNativeWindow();

  virtual ~RCWindow();

private:
  void*                     _win = nullptr; // native window handle
  CefRefPtr<CefBrowserHost> _b; // null until OnAfterCreated, null after OnBeforeClose
  WinCallback               _onClose;
  WinCallback               _onKey;
  bool                      _isClosing = false;
  CefRefPtr<CefMessageRouterBrowserSide> _msgRouter;

  RCWindow();
  void createNativeWindow(CefWindowInfo& wconf, const std::string& winID);

  IMPLEMENT_REFCOUNTING(RCWindow);
};
