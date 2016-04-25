#import "MacWindow.h"
#import "RCWindow.h"

@implementation MacWindow

- (instancetype)initWithContentRect:(NSRect)contentRect styleMask:(NSUInteger)aStyle backing:(NSBackingStoreType)bufferingType defer:(BOOL)flag {
  self = [super initWithContentRect:contentRect styleMask:aStyle backing:bufferingType defer:flag];
  
  self.delegate = self;
  self.collectionBehavior = NSWindowCollectionBehaviorFullScreenPrimary
                          | NSWindowCollectionBehaviorFullScreenAllowsTiling;
  
  return self;
}


- (void)dealloc {
  NSLog(@"-[MacWindow dealloc]");
}


- (void)captureScreenFullscreen {
  [self.contentView enterFullScreenMode:[NSScreen mainScreen] withOptions:nil];
}


- (void)windowWillEnterFullScreen:(NSNotification*)n {
  NSLog(@"-[MacWindow windowWillEnterFullScreen]");
  //self.titleVisibility = NSWindowTitleVisible;
  // Remove toolbar, which is not allowed for NSBorderlessWindowMask
  _windowedToolbar = self.toolbar;
  self.toolbar = nil;
  _isFullscreen = YES;
}


- (void)windowDidEnterFullScreen:(NSNotification*)n {
  NSLog(@"-[MacWindow windowDidEnterFullScreen]");
  // Store styleMask and set to NSBorderlessWindowMask.
  // This causes the fullscreen window to not have an OS titlebar at the top,
  // which would be redundand as we implement our own titlebar.
  _windowedStyleMask = self.styleMask;
  // Note: We intentionally don't set NSFullScreenWindowMask
  self.styleMask = NSBorderlessWindowMask;
}


- (void)toggleFullScreen:(id)sender {
  NSLog(@"-[MacWindow toggleFullScreen:]");
  if (_isFullscreen) {
    // Must restore styleMask before calling toggleFullScreen, or we won't exit fullscreen mode
    //auto s = NSTitledWindowMask | NSFullSizeContentViewWindowMask | NSUnifiedTitleAndToolbarWindowMask | NSResizableWindowMask;
    self.styleMask = _windowedStyleMask;
    // TODO: Hide traffic light buttons until windowDidExitFullScreen to prevent "flashing" incorrect positions
  } else {
    auto app = [NSApplication sharedApplication];
    app.presentationOptions = NSApplicationPresentationHideDock | NSApplicationPresentationAutoHideMenuBar;
    
    _windowedStyleMask = self.styleMask;
    self.styleMask = NSBorderlessWindowMask;
    //    auto style = self.styleMask;
    //    style |= ;
    //    self.styleMask = style;
  }
  //  [super toggleFullScreen:sender];
}


- (void)windowWillExitFullScreen:(NSNotification*)notification {
  NSLog(@"-[MacWindow windowWillExitFullScreen]");
  _isFullscreen = NO;
}


- (void)windowDidExitFullScreen:(NSNotification*)notification {
  NSLog(@"-[MacWindow windowDidExitFullScreen]");
  // Restore toolbar
  self.toolbar = _windowedToolbar;
  _windowedToolbar = nil;
}

- (NSApplicationPresentationOptions)window:(NSWindow *)window
      willUseFullScreenPresentationOptions:(NSApplicationPresentationOptions)proposedOptions
{
  NSLog(@"-[MacWindow window:willUseFullScreenPresentationOptions:]");
  return proposedOptions;
}


- (void)windowDidBecomeKey:(NSNotification*)notification {
  DCHECK(_msgwin != nullptr);
  _msgwin->onBecameKey();
}


- (BOOL)windowShouldClose:(id)window {
  NSLog(@"-[MacWindow windowShouldClose:]");
  // Note: See description of CefLifeSpanHandler::DoClose
  DCHECK(_msgwin != nullptr);
  if (_msgwin->isClosing()) {
    // JavaScript 'onbeforeunload' and 'onunload' has executed and user has
    // allowed closing the window.
    NSLog(@"windowShouldClose => YES");
    return YES;
  }
  //NSLog(@"windowShouldClose: NO");
  _msgwin->browserHost()->CloseBrowser(/*force_close=*/false);
  return NO;
}


@end
