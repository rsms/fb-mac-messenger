#import "AppDelegate.h"
#import <Sparkle/Sparkle.h>
#import "jsapi.h"
#import "WebPreferences.h"
#import "JSClass.hh"
#import "MEmbeddedRes.h"

static BOOL kCFIsOSX_10_10_orNewer;

static void __attribute__((constructor))_init() {
  kCFIsOSX_10_10_orNewer = floor(kCFCoreFoundationVersionNumber) > kCFCoreFoundationVersionNumber10_9;
}

@interface AppDelegate ()
@property (nonatomic, readonly) BOOL canMakeTextLarger;
- (IBAction)makeTextLarger:(id)sender;
@property (nonatomic, readonly) BOOL canMakeTextSmaller;
- (IBAction)makeTextSmaller:(id)sender;
@property (nonatomic, readonly) BOOL canMakeTextStandardSize;
- (IBAction)makeTextStandardSize:(id)sender;
@end

@implementation AppDelegate {
  NSWindow* _window;
  WebView*  _webView;
  NSView*   _titlebarView; // NSTitlebarView
  NSString* _lastNotificationCount;
  NSString* _injectionJS;
}

- (void)applicationDidFinishLaunching:(NSNotification*)notification {
  // Register ourselves as the default-user-notification center delegate
  [NSUserNotificationCenter defaultUserNotificationCenter].delegate = self;

  // Create main window
  NSUInteger windowStyle = NSTitledWindowMask | NSClosableWindowMask | NSMiniaturizableWindowMask | NSResizableWindowMask;
  if (kCFIsOSX_10_10_orNewer) {
    windowStyle |= NSFullSizeContentViewWindowMask;
  }
  _window = [[NSWindow alloc] initWithContentRect:{{0,0},{800,600}} styleMask:windowStyle backing:NSBackingStoreBuffered defer:YES];
  if (kCFIsOSX_10_10_orNewer) {
    _window.appearance = [NSAppearance appearanceNamed:NSAppearanceNameVibrantLight];
    _window.titleVisibility = NSWindowTitleHidden;
    _window.titlebarAppearsTransparent = YES;
  }
  _window.minSize = {640,400};
  _window.releasedWhenClosed = NO;
  _window.delegate = self;
  [_window center];
  _window.frameAutosaveName = @"main";

  if (kCFIsOSX_10_10_orNewer) {
    // Hack to hide "traffic lights" but still allowing window manipulation (which isn't the case if we use proper window flags)
    _titlebarView = [_window standardWindowButton:NSWindowCloseButton].superview;
    _titlebarView.wantsLayer = YES;
    _titlebarView.layer.opacity = 0.0;
    auto titlebarTrackingArea = [[NSTrackingArea alloc] initWithRect:_titlebarView.bounds options:NSTrackingMouseEnteredAndExited|NSTrackingActiveInActiveApp owner:self userInfo:nil];
    [_titlebarView addTrackingArea:titlebarTrackingArea];
  }
  
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
  DISABLE(mediaPlaybackRequiresUserGesture);
  ENABLE(mediaPlaybackAllowsInline);
  ENABLE(hixie76WebSocketProtocolEnabled);
  //ENABLE(frameFlatteningEnabled);
  ENABLE(fullScreenEnabled);
  ENABLE(hiddenPageCSSAnimationSuspensionEnabled);
  ENABLE(hiddenPageDOMTimerThrottlingEnabled);
  DISABLE(backspaceKeyNavigationEnabled);
  if (kCFIsOSX_10_10_orNewer) {
    ENABLE(subpixelCSSOMElementMetricsEnabled);
  }
  
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
  
  auto path = [[NSBundle mainBundle] pathForResource:@"injection" ofType:@"js"];
  _injectionJS = [NSString stringWithContentsOfFile:path encoding:NSUTF8StringEncoding error:NULL];

  // Web view in main window
  auto webView = [[WebView alloc] initWithFrame:{{0,0},{100,100}} frameName:@"main" groupName:@"main"];
  _window.contentView = webView;
  webView.policyDelegate = self;
  webView.frameLoadDelegate = self;
  webView.UIDelegate = self;
  webView.preferences = wp;
  auto req = [[NSURLRequest alloc] initWithURL:[NSURL URLWithString:@"https://www.messenger.com/t/"]];
  [webView.mainFrame loadRequest:req];
  _webView = webView;

  // Present main window
  [_window makeKeyAndOrderFront:self];
  
  //- (BOOL)searchFor:(NSString *)string direction:(BOOL)forward caseSensitive:(BOOL)caseFlag wrap:(BOOL)wrapFlag;

  // Sparkle
  auto su = [SUUpdater sharedUpdater];
  su.automaticallyChecksForUpdates = YES;
  su.automaticallyDownloadsUpdates = YES;
  su.feedURL = [NSURL URLWithString:@"http://fbmacmessenger.rsms.me/changelog.xml"];
  [su checkForUpdatesInBackground];
    
  _lastNotificationCount = @"";
}

- (void)setActiveConversationAtIndex:(NSString*)index {
  [_webView.windowScriptObject evaluateWebScript:
   [NSString stringWithFormat: @"FBM.setActiveConversation(%@);", index]];
}

- (IBAction)nextConversation:(NSMenuItem *)sender {
    [_webView.windowScriptObject evaluateWebScript:@"\
     FBM.setActiveConversation(FBM.activeConversationIndex + 1);"];
}

- (IBAction)previousConversation:(NSMenuItem *)sender {
    [_webView.windowScriptObject evaluateWebScript:@"\
     FBM.setActiveConversation(FBM.activeConversationIndex - 1);"];
}

- (void)mouseEntered:(NSEvent*)ev {
  // titlebar
  _titlebarView.layer.opacity = 1;
}


- (void)mouseExited:(NSEvent*)ev {
  // titlebar
  _titlebarView.layer.opacity = 0;
}

- (IBAction)find:(NSMenuItem*)sender {
  // Give input focus to the search field
  [_webView.windowScriptObject evaluateWebScript:@"FBM.focusSearchField();"];
}


- (IBAction)checkForUpdates:(id)sender {
  [[SUUpdater sharedUpdater] checkForUpdates:self];
}

- (IBAction)openPreferences:(NSMenuItem *)sender {
  [_webView.windowScriptObject evaluateWebScript:@"FBM.toggleSettings();"];
}

- (BOOL)applicationShouldHandleReopen:(NSApplication *)sender hasVisibleWindows:(BOOL)flag {
  [_window makeKeyAndOrderFront:self];
  return YES;
}

- (void)applicationDidBecomeActive:(NSNotification *)notification {
  [_window makeKeyAndOrderFront:self];
}


#pragma mark - WebView proxies

- (BOOL)canMakeTextLarger { return _webView.canMakeTextLarger; }
- (IBAction)makeTextLarger:(id)sender { [_webView makeTextLarger:sender]; }
- (BOOL)canMakeTextSmaller { return _webView.canMakeTextSmaller; }
- (IBAction)makeTextSmaller:(id)sender { [_webView makeTextSmaller:sender]; }
- (BOOL)canMakeTextStandardSize { return _webView.canMakeTextStandardSize; }
- (IBAction)makeTextStandardSize:(id)sender { [_webView makeTextStandardSize:sender]; }


#pragma mark - NSWindowDelegate


- (void)windowDidBecomeKey:(NSNotification*)notification {
  //NSLog(@"%@%@%@", self, NSStringFromSelector(_cmd), notification);
  // Give focus to the composer
  [_webView.windowScriptObject evaluateWebScript:@"FBM.focusComposerField();"];
}


#pragma mark - NSUserNotificationCenterDelegate


- (BOOL)userNotificationCenter:(NSUserNotificationCenter*)center
     shouldPresentNotification:(NSUserNotification*)notification {
  //NSLog(@"%@%@%@", self, NSStringFromSelector(_cmd), notification);
  return YES;
}


- (void)userNotificationCenter:(NSUserNotificationCenter*)center
       didActivateNotification:(NSUserNotification*)notification {
  //NSLog(@"%@%@ notification=%@", self, NSStringFromSelector(_cmd), notification);
  if (notification.userInfo && notification.userInfo[@"isJSNotification"]) {
    JSNotificationsActivateNotification(_webView.mainFrame.globalContext, notification);
  }
}


#pragma mark - WebUIDelegate


- (NSUInteger)webView:(WebView *)webView dragDestinationActionMaskForDraggingInfo:(id <NSDraggingInfo>)draggingInfo {
  // This method is called periodically as something is dragged over a WebView.
  // The UI delegate can return a mask indicating which drag destination actions can occur,
  // WebDragDestinationActionAny to allow any kind of action or WebDragDestinationActionNone
  // to not accept the drag.
  //  NSLog(@"%@%@ draggingInfo=%@", self, NSStringFromSelector(_cmd), draggingInfo);
  return WebDragDestinationActionDHTML;
}


- (void)webView:(WebView*)webView runOpenPanelForFileButtonWithResultListener:(id<WebOpenPanelResultListener>)resultListener allowMultipleFiles:(BOOL)allowMultipleFiles {
  //NSLog(@"%@%@ resultListener=%@", self, NSStringFromSelector(_cmd), resultListener);
  auto openPanel = [NSOpenPanel openPanel];
  openPanel.canChooseDirectories = NO;
  openPanel.canChooseFiles = YES;
  openPanel.allowsMultipleSelection = allowMultipleFiles;
  openPanel.resolvesAliases = YES;
  openPanel.canResolveUbiquitousConflicts = YES;
  openPanel.canDownloadUbiquitousContents = YES;
  openPanel.canCreateDirectories = YES;
  openPanel.title = @"Select files";
  
  auto ud = [NSUserDefaults standardUserDefaults];
  auto dirURL = [ud URLForKey:@"open-dialog-url"];
  if (!dirURL) {
    dirURL = [NSURL fileURLWithPath:NSHomeDirectory() isDirectory:YES];
  }
  
  openPanel.directoryURL = dirURL;
  
  auto onComplete = ^(NSInteger result) {
    [ud setURL:openPanel.directoryURL forKey:@"open-dialog-url"];
    if (result == 1) {
      auto filenames = [NSMutableArray arrayWithCapacity:openPanel.URLs.count];
      for (NSURL* url in openPanel.URLs) {
        [filenames addObject:url.absoluteURL.path];
      }
      [resultListener chooseFilenames:filenames];
    } else {
      [resultListener cancel];
    }
  };
  [openPanel beginSheetModalForWindow:_window completionHandler:onComplete];
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


- (void)webView:(WebView *)webView didFinishLoadForFrame:(WebFrame *)frame {
  auto rsp = frame.dataSource.response;
  if ([rsp isKindOfClass:[NSHTTPURLResponse class]] && ((NSHTTPURLResponse*)rsp).statusCode == 400) {
    NSLog(@"%@%@ frame.dataSource.response=%@", self, NSStringFromSelector(_cmd), frame.dataSource.response);
    [webView.mainFrame.windowObject evaluateWebScript:@"FBM.showMaintenanceMessage();"];
  } else {
    [_webView.windowScriptObject evaluateWebScript:_injectionJS];
    [_webView.windowScriptObject evaluateWebScript:
     [NSString stringWithFormat:@"FBM.loadImage('background', '%@');", kErrorPNGDataURL]];
  }
}

-(void)webView:(WebView *)webView didFailProvisionalLoadWithError:(NSError *)error forFrame:(WebFrame *)frame {
  NSLog(@"%@%@ error=%@", self, NSStringFromSelector(_cmd), error);
  [webView.mainFrame.windowObject evaluateWebScript:@"FBM.showOfflineMessage();"];
}

- (void)webView:(WebView *)sender didReceiveTitle:(NSString *)title forFrame:(WebFrame *)frame {
  NSString* notificationCount = _lastNotificationCount;
  
  if ([title isEqualToString:@"Messenger"]) {
    notificationCount = @"";
  } else {
    NSRegularExpression* regex = [NSRegularExpression regularExpressionWithPattern:@"\\(([0-9]+)\\) Messenger" options:0 error:nil];
    NSTextCheckingResult* match = [regex firstMatchInString:title options:0 range:NSMakeRange(0, [title length])];
    
    if (match) {
      notificationCount = [title substringWithRange:[match rangeAtIndex:1]];
    }
  }
  
  if (![notificationCount isEqualTo:_lastNotificationCount]) {
    [[NSApp dockTile] setBadgeLabel: notificationCount];
    _lastNotificationCount = notificationCount;
  }
}


#pragma mark - WebPolicyDelegate

- (void)webView:(WebView *)sender
decidePolicyForNavigationAction:(NSDictionary *)actionInformation
        request:(NSURLRequest *)request
          frame:(WebFrame *)frame
decisionListener:(id<WebPolicyDecisionListener>)listener
{
  //NSLog(@"%@%@ actionInformation=%@ request=%@", self, NSStringFromSelector(_cmd), actionInformation, request);
  NSURL* url = [[actionInformation objectForKey:WebActionOriginalURLKey] absoluteURL];
  if ([url.host isEqualToString:@"www.messenger.com"] ||
      ([url.host isEqualToString:@"www.facebook.com"] &&
       ([url.path hasPrefix:@"/login/"] || [url.path hasPrefix:@"/checkpoint/"] || [url.path isEqualToString:@"/checkpoint"])
      ) )
  {
    [listener use];
  } else {
    [self openWorkspaceURL:url];
    [listener ignore];
  }
}


- (void)webView:(WebView *)sender decidePolicyForNewWindowAction:(NSDictionary *)actionInformation request:(NSURLRequest *)request newFrameName:(NSString *)frameName decisionListener:(id<WebPolicyDecisionListener>)listener {
  // Open all "new window" links in the browser
  //NSLog(@"%@%@ actionInformation=%@ request=%@", self, NSStringFromSelector(_cmd), actionInformation, request);
  NSURL* url = [actionInformation objectForKey:WebActionOriginalURLKey];
  [self openWorkspaceURL:url];
  [listener ignore];
}


- (void)openWorkspaceURL:(NSURL*)url {
  if ([url.path hasPrefix:@"/l.php"]) {
    // Make things a bit faster by bypassing Facebook's link filter, which sometimes traps completely
    // legit URLs as "phishing" (like the website for this app!)
    for (NSString* kv in [url.query componentsSeparatedByString:@"&"]) {
      auto r = [kv rangeOfString:@"=" options:NSLiteralSearch];
      if (r.location != NSNotFound && [[kv substringToIndex:r.location] isEqualToString:@"u"]) {
        auto encodedURL = [kv substringFromIndex:r.location + r.length];
        url = [NSURL URLWithString:[encodedURL stringByRemovingPercentEncoding]];
      }
    }
  }
  [[NSWorkspace sharedWorkspace] openURL:url];
}


@end
