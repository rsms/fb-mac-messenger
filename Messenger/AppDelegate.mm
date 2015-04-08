#import "AppDelegate.h"
#import <WebKit/WebKit.h>

@interface AppDelegate ()

@property (weak) IBOutlet NSWindow *window;
@end

@implementation AppDelegate

- (void)applicationDidFinishLaunching:(NSNotification *)aNotification {
  self.window.appearance = [NSAppearance appearanceNamed:NSAppearanceNameVibrantLight];
  self.window.titleVisibility = NSWindowTitleHidden;
  self.window.titlebarAppearsTransparent = YES;

  auto webView = [[WebView alloc] initWithFrame:{{0,0},{100,100}} frameName:@"main" groupName:@"main"];
  self.window.contentView = webView;
  auto req = [[NSURLRequest alloc] initWithURL:[NSURL URLWithString:@"https://www.messenger.com/"]];
  [webView.mainFrame loadRequest:req];
    [[self.window standardWindowButton:NSWindowCloseButton]
     setFrame:NSZeroRect];
    [[self.window standardWindowButton:NSWindowMiniaturizeButton]
     setFrame:NSZeroRect];
    [[self.window standardWindowButton:NSWindowZoomButton]
     setFrame:NSZeroRect];
}

- (void)applicationWillTerminate:(NSNotification *)aNotification {
  // Insert code here to tear down your application
}

@end
