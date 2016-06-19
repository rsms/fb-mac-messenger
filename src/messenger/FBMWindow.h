@interface FBMWindow : NSWindow <NSWindowDelegate>

- (void)setMainView:(NSView*)mainView;

- (void)showTitlebarAnimate:(BOOL)animate;
- (void)hideTitlebarAnimate:(BOOL)animate;

@end
