#pragma once
#include "include/cef_app.h"
#include "RCWindow.h"
#include <set>

#if defined(__MACH__) && defined(__APPLE__) && defined(__OBJC__)
#include "include/cef_application_mac.h"
@interface MacApp : NSApplication<CefAppProtocol>
@end
#endif

// Singleton access to App. Never deallocated.
#define App ((RCApp&)*AppPtr)
struct RCApp;
extern RCApp* AppPtr;

// Container for open windows
using WindowSet = std::set<CefRefPtr<RCWindow>>;


struct RCApp : public CefApp,
               public CefBrowserProcessHandler
{
  RCApp();

  // CefApp methods:
  virtual CefRefPtr<CefBrowserProcessHandler> GetBrowserProcessHandler() OVERRIDE {
    return this;
  }

  // CefBrowserProcessHandler methods:
  virtual void OnContextInitialized() OVERRIDE;

  // Called once on the main thread as the app is starting.
  // Should perform any platform specific setup, like loading UI.
  void boostrapNativeApp();

  // Called once on the main thread when the app has started (after boostrapNativeApp.)
  void appStarted();

  // When user clicked on the app icon or otherwise requested to activate the app
  void activateApp();

  // Returns the key (frontmost) window, or null if none.
  RCWindow* keyWindow() const { return _keyWindow; }

  // Open a new window
  CefRefPtr<RCWindow> openNewWindow(const std::string& url, const std::string& winID);
  CefRefPtr<RCWindow> openNewMessengerWindow();

  // disable or enable sudden termination.
  // N calls to disable should be balanced with N calls to enable.
  bool suddenTerminationAllowed() const { return _suddenTerminationCounter == 0; }
  void disableSuddenTermination();
  void enableSuddenTermination();

  // Request that the app terminates
  void requestTermination();

private:
  bool      _isTerminating = false;
  WindowSet _openWindows; // open windows. Only accessed on the UI thread.
  size_t    _suddenTerminationCounter = 1; // 0=allowed
  RCWindow* _keyWindow = nullptr; // weak. owned by _openWindows

  // Called after requestTermination() has been called and all document windows have
  // been closed. Closes the document browser window and exits the main event loop.
  void finalizeTermination();

  // Include the default reference counting implementation.
  IMPLEMENT_REFCOUNTING(RCApp);
};

