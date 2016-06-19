#pragma once
#import "include/cef_application_mac.h"

struct RCWindow;

@interface MacWindow : UnderlayOpenGLHostingWindow <NSWindowDelegate> {
  NSMutableSet<id<NSObject>>* _notificationObservers;
@public
  RCWindow*  _msgwin; // weak, owns us
  NSUInteger _windowedStyleMask; // style mask used in non-fullscreen mode
  NSToolbar* _windowedToolbar;
  BOOL       _isFullscreen;
}
@end
