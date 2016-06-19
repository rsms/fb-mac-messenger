#import <WebKit/WebKit.h>


@interface WebView (MacMessengerPrivate)

- (IBAction)zoomPageIn:(id)sender;
- (BOOL)canZoomPageIn;
- (IBAction)zoomPageOut:(id)sender;
- (BOOL)canZoomPageOut;
- (IBAction)resetPageZoom:(id)sender;
- (BOOL)canResetPageZoom;

@end
