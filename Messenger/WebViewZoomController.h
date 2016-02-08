@class WebView;


@interface WebViewZoomController : NSObject

- (instancetype)initWithWebView:(WebView *)webView userDefaults:(NSUserDefaults *)userDefaults;

- (void)restoreSavedZoomLevels;


#pragma mark - WebView Proxy API

- (BOOL)canMakeTextLarger;
- (IBAction)makeTextLarger:(id)sender;

- (BOOL)canMakeTextSmaller;
- (IBAction)makeTextSmaller:(id)sender;

- (BOOL)canMakeTextStandardSize;
- (IBAction)makeTextStandardSize:(id)sender;


- (BOOL)canZoomPageIn;
- (IBAction)zoomPageIn:(id)sender;

- (BOOL)canZoomPageOut;
- (IBAction)zoomPageOut:(id)sender;

- (BOOL)canResetPageZoom;
- (IBAction)resetPageZoom:(id)sender;

@end
