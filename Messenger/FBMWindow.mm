#import "FBMWindow.h"
#import "AppDelegate.h"


@interface DraggableView : NSView {}
@property (nonatomic, weak) NSWindow* draggingWindow;
@end

@implementation DraggableView
@synthesize draggingWindow;
-(void)mouseDragged:(NSEvent *)theEvent {
  NSWindow * w = self.draggingWindow;
  CGRect frame = w.frame;
  frame.origin.x += theEvent.deltaX;
  frame.origin.y -= theEvent.deltaY;
  [w setFrameOrigin:frame.origin];
}
@end



@implementation FBMWindow {
  NSView*              _titlebarView; // NSTitlebarView
  DraggableView*       _draggableView;
}


- (instancetype)init {
  NSUInteger windowStyle = NSTitledWindowMask | NSClosableWindowMask | NSMiniaturizableWindowMask | NSResizableWindowMask;
  if (FBMOSX1010OrNewer()) {
    windowStyle |= NSFullSizeContentViewWindowMask;
  }
  NSSize frameSize = {800,600};
  self = [[FBMWindow alloc] initWithContentRect:{{0,0},frameSize} styleMask:windowStyle backing:NSBackingStoreBuffered defer:YES];
  if (FBMOSX1010OrNewer()) {
    self.appearance = [NSAppearance appearanceNamed:NSAppearanceNameVibrantLight];
    self.titleVisibility = NSWindowTitleHidden;
    self.titlebarAppearsTransparent = YES;
    
#if USE_BLURRY_BACKGROUND
    auto* fxview = [[NSVisualEffectView alloc] initWithFrame:{{0,0},frameSize}];
    fxview.blendingMode = NSVisualEffectBlendingModeBehindWindow;
    fxview.material = NSVisualEffectMaterialAppearanceBased;
    fxview.state = NSVisualEffectStateFollowsWindowActiveState;
    self.contentView = fxview;
#endif
  }
  self.collectionBehavior = NSWindowCollectionBehaviorFullScreenPrimary;
  
  auto ud = [NSUserDefaults standardUserDefaults];
  if ([ud boolForKey:@"moves-with-active-space"]) {
    self.collectionBehavior |= NSWindowCollectionBehaviorMoveToActiveSpace;
  }
  self.minSize = {320,300};
  self.releasedWhenClosed = NO;
  self.delegate = self;
  [self center];
  self.frameAutosaveName = @"main";
  self.movableByWindowBackground = YES;
  _titlebarView = [self standardWindowButton:NSWindowCloseButton].superview;
  
  _draggableView = [[DraggableView alloc] init];
  _draggableView.draggingWindow = self;
  
  [self updateWindowTitlebar];
  
  return self;
}


- (void)setMainView:(NSView*)mainView {
  assert(self.contentView.subviews.count == 0);
  [self.contentView addSubview:mainView];
  [self.contentView addSubview:_draggableView];
}



- (void)updateWindowTitlebar {
  const CGFloat kTitlebarHeight = 50;
  const CGFloat kFullScreenButtonYOrigin = 3;
  auto windowFrame = self.frame;
  BOOL fullScreen = (self.styleMask & NSFullScreenWindowMask) == NSFullScreenWindowMask;

  // Set size of titlebar container
  auto titlebarContainerView = _titlebarView.superview;
  auto titlebarContainerFrame = titlebarContainerView.frame;
  titlebarContainerFrame.origin.y = windowFrame.size.height - kTitlebarHeight;
  titlebarContainerFrame.size.height = kTitlebarHeight;
  titlebarContainerView.frame = titlebarContainerFrame;
  
  auto hidden = [[NSUserDefaults standardUserDefaults] boolForKey:@"traffic-lights/hidden"];

  // Set position of window buttons
  __block CGFloat x = 12; // initial LHS margin, matching Safari 8.0 on OS X 10.10.
  auto updateButton = ^(NSView* buttonView) {
    auto buttonFrame = buttonView.frame;

    // in fullscreen, the titlebar frame is not governed by kTitlebarHeight but rather appears to be fixed by the system.
    // thus, we set a constant Y origin for the buttons when in fullscreen.
    buttonFrame.origin.y = fullScreen ?
      kFullScreenButtonYOrigin :
      round((kTitlebarHeight - buttonFrame.size.height) / 2.0);

    buttonFrame.origin.x = x;

    // spacing for next button, matching Safari 8.0 on OS X 10.10.
    x += buttonFrame.size.width + 6;

    [buttonView setFrameOrigin:buttonFrame.origin];
    
    if (hidden) {
      buttonView.hidden = YES;
    }
  };
  updateButton([self standardWindowButton:NSWindowCloseButton]);
  updateButton([self standardWindowButton:NSWindowMiniaturizeButton]);
  updateButton([self standardWindowButton:NSWindowZoomButton]);
  
  [_draggableView setFrame:[_titlebarView convertRect:_titlebarView.bounds toView:self.contentView]];
  _draggableView.hidden = fullScreen;
}


- (void)setTitle:(NSString *)title {
  [super setTitle:title];
  if (self.isVisible) {
    [self updateWindowTitlebar];
  }
}



#pragma mark - NSWindowDelegate


- (void)windowDidBecomeKey:(NSNotification*)notification {
  [((AppDelegate*)NSApp.delegate) windowDidBecomeKey:self];
}


- (void)windowDidResize:(NSNotification *)notification {
  if (self.isVisible) {
    [self updateWindowTitlebar];
  }
}

- (void)windowDidExitFullScreen:(NSNotification *)notification {
  if (self.isVisible) {
    [self updateWindowTitlebar];
  }
}

- (void)windowDidChangeScreen:(NSNotification *)notification {
  if (self.isVisible) {
    [self updateWindowTitlebar];
  }
}



@end
