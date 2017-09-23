@interface FBMWindow : NSWindow <NSWindowDelegate, NSTouchBarDelegate>

@property (nonatomic) CGFloat titlebarHeight;

- (instancetype)initWithTitlebarHeight:(CGFloat)titlebarHeight;

- (void)setMainView:(NSView*)mainView;

- (void)showTitlebarAnimate:(BOOL)animate;
- (void)hideTitlebarAnimate:(BOOL)animate;

- (void)updateWindowTitlebar;

@end
