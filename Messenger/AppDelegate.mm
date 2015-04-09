#import "AppDelegate.h"
#import <WebKit/WebKit.h>
#import <Sparkle/Sparkle.h>
#import "jsapi.h"
#import "WebPreferences.h"
#import "JSClass.hh"


@interface AppDelegate ()
@property (weak) IBOutlet NSWindow *window;
@end
@implementation AppDelegate {
  WebView* _webView;
}

- (void)applicationDidFinishLaunching:(NSNotification *)aNotification {
  // Configure main window
  self.window.appearance = [NSAppearance appearanceNamed:NSAppearanceNameVibrantLight];
  self.window.titleVisibility = NSWindowTitleHidden;
  self.window.titlebarAppearsTransparent = YES;
  
  // Register ourselves as the default-user-notification center delegate
  [NSUserNotificationCenter defaultUserNotificationCenter].delegate = self;
  
  // Hack to hide "traffic lights" but still allowing window manipulation (which isn't the case if we use proper window flags)
  [[self.window standardWindowButton:NSWindowCloseButton] setFrame:NSZeroRect];
  [[self.window standardWindowButton:NSWindowMiniaturizeButton] setFrame:NSZeroRect];
  [[self.window standardWindowButton:NSWindowZoomButton] setFrame:NSZeroRect];
  
  // App data
  auto appDataDir = [NSString stringWithFormat:@"~/Library/Application Support/%@", [NSBundle mainBundle].bundleIdentifier].stringByExpandingTildeInPath;

  // Web prefs
  auto wp = [[WebPreferences alloc] initWithIdentifier:@"main"];
  [wp _setLocalStorageDatabasePath:[appDataDir stringByAppendingPathComponent:@"localstorage"]];
  #define ENABLE(k) do { wp.k = YES; } while(0)
  #define DISABLE(k) do { wp.k = NO; } while(0)
  #define PRINT(k) NSLog(@"%s: %s", #k, wp.k ? "y" : "n")
  //  PRINT(showDebugBorders);
  //  PRINT(showRepaintCounter);
  
  // Official settings
  DISABLE(javaEnabled);
  ENABLE(autosaves); // saves to user defaults with keys prefixed `identifier`
  
  // Unofficial/Private settings
  ENABLE(acceleratedCompositingEnabled);
  ENABLE(acceleratedDrawingEnabled);
  ENABLE(accelerated2dCanvasEnabled);
  ENABLE(offlineWebApplicationCacheEnabled);
  ENABLE(localStorageEnabled);
  ENABLE(webAudioEnabled);
  DISABLE(usesEncodingDetector);
  DISABLE(usePreHTML5ParserQuirks);
  DISABLE(useLegacyTextAlignPositionedElementBehavior);
  DISABLE(textAreasAreResizable);
  ENABLE(subpixelCSSOMElementMetricsEnabled);
  DISABLE(mediaPlaybackRequiresUserGesture);
  ENABLE(mediaPlaybackAllowsInline);
  ENABLE(hixie76WebSocketProtocolEnabled);
  //ENABLE(frameFlatteningEnabled);
  ENABLE(fullScreenEnabled);
  ENABLE(hiddenPageCSSAnimationSuspensionEnabled);
  ENABLE(hiddenPageDOMTimerThrottlingEnabled);
  DISABLE(backspaceKeyNavigationEnabled);
  
  // Security relaxation
  //DISABLE(XSSAuditorEnabled);
  //DISABLE(WebSecurityEnabled);
  //DISABLE(hyperlinkAuditingEnabled);
  
  // Dev
#if DEBUG
  ENABLE(developerExtrasEnabled);
#endif
  #undef ENABLE
  #undef DISABLE
  #undef PRINT

  // Web view in main window
  auto webView = [[WebView alloc] initWithFrame:{{0,0},{100,100}} frameName:@"main" groupName:@"main"];
  self.window.contentView = webView;
  webView.policyDelegate = self;
  webView.frameLoadDelegate = self;
  webView.preferences = wp;
  auto req = [[NSURLRequest alloc] initWithURL:[NSURL URLWithString:@"https://www.messenger.com/login"]];
  [webView.mainFrame loadRequest:req];
  _webView = webView;
  
  // Sparkle
  auto su = [SUUpdater sharedUpdater];
  su.automaticallyChecksForUpdates = YES;
  su.automaticallyDownloadsUpdates = YES;
  su.feedURL = [NSURL URLWithString:@"http://fbmacmessenger.rsms.me/changelog.xml"];
  [su checkForUpdatesInBackground];
}


- (IBAction)checkForUpdates:(id)sender {
  [[SUUpdater sharedUpdater] checkForUpdates:self];
}


#pragma mark - NSUserNotificationCenterDelegate


- (BOOL)userNotificationCenter:(NSUserNotificationCenter*)center
     shouldPresentNotification:(NSUserNotification*)notification {
  NSLog(@"%@%@ notification=%@", self, NSStringFromSelector(_cmd), notification);
  return YES;
}


#pragma mark - WebUIDelegate


- (NSUInteger)webView:(WebView *)webView dragDestinationActionMaskForDraggingInfo:(id <NSDraggingInfo>)draggingInfo {
  // This method is called periodically as something is dragged over a WebView.
  // The UI delegate can return a mask indicating which drag destination actions can occur,
  // WebDragDestinationActionAny to allow any kind of action or WebDragDestinationActionNone
  // to not accept the drag.
  //  NSLog(@"%@%@ draggingInfo=%@", self, NSStringFromSelector(_cmd), draggingInfo);
  return WebDragDestinationActionAny;
}


- (void)userNotificationCenter:(NSUserNotificationCenter*)center
       didActivateNotification:(NSUserNotification*)notification {
  NSLog(@"%@%@ notification=%@", self, NSStringFromSelector(_cmd), notification);
  if (notification.userInfo && notification.userInfo[@"isJSNotification"]) {
    JSNotificationsActivateNotification(_webView.mainFrame.globalContext, notification);
  }
}


#pragma mark - WebFrameLoadDelegate


- (void)webView:(WebView *)webView didClearWindowObject:(WebScriptObject *)windowObject forFrame:(WebFrame *)frame {
  auto ctx = webView.mainFrame.globalContext;
  JSObjectRef globalObj = JSContextGetGlobalObject(ctx);
  
  auto Notifications = JSNotificationsCreate(ctx, 0, nullptr, nullptr);
  JSClass::setProperty(ctx, globalObj, u"_notifications", Notifications);

  
  auto NotificationCons = JSObjectMakeConstructor(ctx, JSNotificationJSClass(), JSNotificationConstruct);
  
  auto s = U16JSStr(u"granted");
  JSClass::setProperty(ctx, NotificationCons, u"permission", JSValueMakeString(ctx, s));
  JSStringRelease(s);

  s = U16JSStr(u"requestPermission");
  auto paramName = U16JSStr(u"callback");
  auto bodys = U16JSStr(u"console.log('requestPermission'); callback(\"granted\");");
  auto f = JSObjectMakeFunction(ctx, s, 1, &paramName, bodys, nullptr, 1, nullptr);
  JSClass::setProperty(ctx, NotificationCons, u"requestPermission", f);
  JSStringRelease(paramName);
  JSStringRelease(bodys);
  JSStringRelease(s);

  JSClass::setProperty(ctx, globalObj, u"Notification", NotificationCons);
  
  // WARNING! Fragile hack to automatically enable desktop notifications:
//  auto r = [webView.mainFrame.windowObject evaluateWebScript:
//   @"var v = {__t:(new Date).getTime(),__v:true}; localStorage._cs_desktopNotifsEnabled = v; localStorage.setItem('_cs_desktopNotifsEnabled',JSON.stringify(v));"];
//  NSLog(@"r: %@", r);
  
}


#pragma mark - WebPolicyDelegate

- (void)webView:(WebView *)sender decidePolicyForNavigationAction:(NSDictionary *)actionInformation request:(NSURLRequest *)request frame:(WebFrame *)frame decisionListener:(id<WebPolicyDecisionListener>)listener {
  if ([sender isEqual:self.window.contentView]) {
    [listener use];
  } else {
    [[NSWorkspace sharedWorkspace] openURL:[actionInformation objectForKey:WebActionOriginalURLKey]];
    [listener ignore];
  }
}

- (void)webView:(WebView *)sender decidePolicyForNewWindowAction:(NSDictionary *)actionInformation request:(NSURLRequest *)request newFrameName:(NSString *)frameName decisionListener:(id<WebPolicyDecisionListener>)listener {
  [[NSWorkspace sharedWorkspace] openURL:[actionInformation objectForKey:WebActionOriginalURLKey]];
  [listener ignore];
}

@end
