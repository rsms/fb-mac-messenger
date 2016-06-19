#import "RCWindow.h"
#import "MacWindow.h"
#import "include/wrapper/cef_helpers.h"
#import "include/base/cef_bind.h"
#import "include/wrapper/cef_closure_task.h"


#define selfWindow ((__bridge NSWindow*)_win)

void RCWindow::setID(const std::string& winID) {
  DCHECK(_win != nullptr);
  selfWindow.frameAutosaveName = [NSString stringWithUTF8String:winID.c_str()];
}

void RCWindow::setTitle(const CefString& title) {
  if (!CefCurrentlyOn(TID_UI)) {
    // Execute on the UI thread.
    CefPostTask(TID_UI, base::Bind(&RCWindow::setTitle, this, title));
    return;
  }
  [selfWindow setTitle:NSStringFromCefString(title)];
}

void RCWindow::hide() {
  if (!CefCurrentlyOn(TID_UI)) {
    CefPostTask(TID_UI, base::Bind(&RCWindow::hide, this));
    return;
  }
  [selfWindow orderOut:nil];
}


void RCWindow::show() {
  if (!CefCurrentlyOn(TID_UI)) {
    CefPostTask(TID_UI, base::Bind(&RCWindow::show, this));
    return;
  }
  [selfWindow orderFront:nil];
}


void RCWindow::showAndMakeKey() {
  if (!CefCurrentlyOn(TID_UI)) {
    CefPostTask(TID_UI, base::Bind(&RCWindow::showAndMakeKey, this));
    return;
  }
  [selfWindow makeKeyAndOrderFront:nil];
  //[NSApp requestUserAttention:NSInformationalRequest];
  //[NSApp unhide:nil];
}

#pragma mark - Native window

void RCWindow::createNativeWindow(CefWindowInfo& wconf, const std::string& winID) {
  NSRect f{{0,0},{CGFloat(wconf.width), CGFloat(wconf.height)}};
  
  NSUInteger style = NSTitledWindowMask
                   | NSClosableWindowMask
                   | NSMiniaturizableWindowMask
                   | NSResizableWindowMask
                   | NSFullSizeContentViewWindowMask
                   | NSUnifiedTitleAndToolbarWindowMask ;
  
  auto w = [[MacWindow alloc] initWithContentRect:f styleMask:style backing:NSBackingStoreBuffered defer:NO];
  
  w.titlebarAppearsTransparent = YES;
  w.titleVisibility = NSWindowTitleHidden;
//  w.animationBehavior = NSWindowAnimationBehaviorDocumentWindow;
  
  // title size "hack"
  auto toolbar = [[NSToolbar alloc] initWithIdentifier:@"titlebar"];
  toolbar.showsBaselineSeparator = NO;
  toolbar.displayMode = NSToolbarDisplayModeIconAndLabel;
  w.toolbar = toolbar;
  
  // Must set frameAutosaveName before calling SetAsChild since the
  // frame might be changed by frameAutosaveName.
  [w center];
  if (!winID.empty()) {
    w.frameAutosaveName = [NSString stringWithUTF8String:winID.c_str()];
  }
  
  // Get the actual content size of the window since setFrameAutosaveName could
  // result in the window size changing.
  auto bounds = [w contentRectForFrameRect:w.frame];
  
  // Associate the contentView with the CEF browser
  wconf.SetAsChild(w.contentView, 0, 0, bounds.size.width, bounds.size.height);

  // native window has a weak ref to `this`
  w->_msgwin = this;
  
  // We own native window
  w.releasedWhenClosed = NO;
  _win = (void*)CFBridgingRetain(w);
}


void RCWindow::closeNativeWindow() {
  DCHECK(_win != nullptr);
  //printf("RCWindow::closeNativeWindow\n");
  
  // Take window off the screen
  //  [wo orderOut:nil];

  // Important: CefBrowserHostImpl::CloseContents requires the CefBrowserHostView
  // to be deallocated at the time when a call to DoClose (with a `false` return value)
  // returns. We call this function (nativeWindowWillClose) from DoClose and must
  // explicitly release the CefBrowserHostView which is a subview of our window.
  // The reason this isn't automatically handled by Cef is that we have a custom
  // window implementation.
  auto w = (MacWindow*)CFBridgingRelease(_win);
  _win = nullptr;

  for (NSView* v in w.contentView.subviews) {
    [v removeFromSuperviewWithoutNeedingDisplay];
  }
  w.contentView = nil;
  
  [w close];
}