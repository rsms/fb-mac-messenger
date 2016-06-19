#include "App.h"

#include "include/cef_browser.h"
#include "include/cef_command_line.h"
#include "include/base/cef_bind.h"
#include "include/wrapper/cef_helpers.h"
#include "include/wrapper/cef_closure_task.h"

#include <string>
#include <signal.h>
#include <unistd.h>


RCApp* AppPtr = nullptr; // set in main


RCApp::RCApp() {
}


void RCApp::OnContextInitialized() {
  CEF_REQUIRE_UI_THREAD();
  // Note: This is called when CEF is ready, but not neccesarily the Cocoa part of the app.
  //printf("RCApp::OnContextInitialized\n");
}


// Called once on the main thread when the app has started.
// This happens after OnContextInitialized and after 
void RCApp::appStarted() {
  //printf("RCApp::appStarted\n");
  openNewMessengerWindow()->showAndMakeKey();
}


CefRefPtr<RCWindow> RCApp::openNewWindow(const std::string& url, const std::string& winID) {
  CEF_REQUIRE_UI_THREAD();

  auto w = RCWindow::create(url, winID);

  w->setOnClose([=](CefRefPtr<RCWindow> w) {
    //fprintf(stderr, "—— RCApp::openNewWindow onClose callback\n");
    if (_keyWindow == w.get()) {
      _keyWindow = nullptr;
    }
    _openWindows.erase(w);
    if (_isTerminating && _openWindows.empty()) {
      // Final document window closed and we can now actually terminate
      finalizeTermination();
    }
  });
  
  w->setOnKey([=](CefRefPtr<RCWindow> w) {
    _keyWindow = w.get();
  });
  
  _openWindows.emplace(w);
  
  return w;
}


CefRefPtr<RCWindow> RCApp::openNewMessengerWindow() {
  return openNewWindow("https://www.messenger.com/login", "main");
}


void RCApp::requestTermination() {
  CEF_REQUIRE_UI_THREAD();
  //fprintf(stderr, "—— RCApp::requestTermination\n");
  
  _isTerminating = true;
  
  if (App.suddenTerminationAllowed()) {
    kill(getpid(), 9);
  }
  
  if (_openWindows.empty()) {
    // Nothing to wait for — terminate immediately
    finalizeTermination();
    return;
  }
  
  // Request that all document windows close.
  // Note that the user might cancel termination by declining to close a window
  // which uses an onbeforeunload handler.
  WindowSet windows{_openWindows};
    // copy since we might cause modification to _openWindows
  for (auto& w : windows) {
    w->close();
  }
}


void RCApp::finalizeTermination() {
  //fprintf(stderr, "—— RCApp::finalizeTermination\n");
  CefQuitMessageLoop();
}

