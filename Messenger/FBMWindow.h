@interface FBMWindow : NSWindow <NSWindowDelegate, NSTouchBarDelegate>

- (void)setMainView:(NSView*)mainView;

- (void)showTitlebarAnimate:(BOOL)animate;
- (void)hideTitlebarAnimate:(BOOL)animate;

@end
