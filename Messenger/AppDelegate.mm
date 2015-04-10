#import "AppDelegate.h"
#import <WebKit/WebKit.h>
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
@property (weak) IBOutlet NSWindow *window;
@end
@implementation AppDelegate {
  WebView* _webView;
  NSView*  _titlebarView; // NSTitlebarView
  NSString* _lastNotificationCount;
}

- (void)applicationDidFinishLaunching:(NSNotification*)notification {
  // Register ourselves as the default-user-notification center delegate
  [NSUserNotificationCenter defaultUserNotificationCenter].delegate = self;

  // Configure main window
  if (kCFIsOSX_10_10_orNewer) {
    self.window.appearance = [NSAppearance appearanceNamed:NSAppearanceNameVibrantLight];
    self.window.titleVisibility = NSWindowTitleHidden;
    self.window.titlebarAppearsTransparent = YES;
    self.window.styleMask |= NSFullSizeContentViewWindowMask;
  }

  if (kCFIsOSX_10_10_orNewer) {
    // Hack to hide "traffic lights" but still allowing window manipulation (which isn't the case if we use proper window flags)
    _titlebarView = [self.window standardWindowButton:NSWindowCloseButton].superview;
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

  // Web view in main window
  auto webView = [[WebView alloc] initWithFrame:{{0,0},{100,100}} frameName:@"main" groupName:@"main"];
  self.window.contentView = webView;
  webView.policyDelegate = self;
  webView.frameLoadDelegate = self;
  webView.UIDelegate = self;
  webView.preferences = wp;
  auto req = [[NSURLRequest alloc] initWithURL:[NSURL URLWithString:@"https://www.messenger.com/t/"]];
  [webView.mainFrame loadRequest:req];
  _webView = webView;
  
  //- (BOOL)searchFor:(NSString *)string direction:(BOOL)forward caseSensitive:(BOOL)caseFlag wrap:(BOOL)wrapFlag;

  // Sparkle
  auto su = [SUUpdater sharedUpdater];
  su.automaticallyChecksForUpdates = YES;
  su.automaticallyDownloadsUpdates = YES;
  su.feedURL = [NSURL URLWithString:@"http://fbmacmessenger.rsms.me/changelog.xml"];
  [su checkForUpdatesInBackground];
    
  _lastNotificationCount = @"";
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
  [_webView.windowScriptObject evaluateWebScript:@"document.querySelector('input[placeholder~=\"Search\"]').focus();"];
}


- (IBAction)checkForUpdates:(id)sender {
  [[SUUpdater sharedUpdater] checkForUpdates:self];
}

- (BOOL)applicationShouldHandleReopen:(NSApplication *)sender hasVisibleWindows:(BOOL)flag {
  [self.window makeKeyAndOrderFront:self];
  return YES;
}

- (void)applicationDidBecomeActive:(NSNotification *)notification {
  [self.window makeKeyAndOrderFront:self];
}


#pragma mark - NSUserNotificationCenterDelegate


- (BOOL)userNotificationCenter:(NSUserNotificationCenter*)center
     shouldPresentNotification:(NSUserNotification*)notification {
  //NSLog(@"%@%@ notification=%@", self, NSStringFromSelector(_cmd), notification);
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
  return WebDragDestinationActionAny;
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
  [openPanel beginSheetModalForWindow:self.window completionHandler:onComplete];
//  [openPanel beginWithCompletionHandler:onComplete];
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
    [webView.mainFrame.windowObject evaluateWebScript:
     [NSString stringWithFormat:@"document.body.innerText = ''; var e = document.createElement('p'); document.body.appendChild(e); e.innerText = 'Oh noes. It appears Messenger.com is down for maintenance. Please try again later.'; var s = e.style; s.font='18px helvetica-light'; s.lineHeight='27px'; s.color='#999'; s.margin='0 auto'; s.width='50%%'; s.textAlign='center'; s.margin='0 auto'; s.marginTop='100px'; s.marginBottom='30px'; s.width='235px'; s.height='235px'; s.paddingTop='250px'; s.backgroundRepeat='no-repeat'; s.backgroundPosition='top center'; s.backgroundImage='url(%@)';", kErrorPNGDataURL]];
  }
}

-(void)webView:(WebView *)webView didFailProvisionalLoadWithError:(NSError *)error forFrame:(WebFrame *)frame {
  NSLog(@"%@%@ error=%@", self, NSStringFromSelector(_cmd), error);
  [webView.mainFrame.windowObject evaluateWebScript:
   [NSString stringWithFormat:@"document.body.innerText = ''; var e = document.createElement('p'); document.body.appendChild(e); e.innerText = 'Oh snap. It looks like your connection is offline, please try again later.'; var s = e.style; s.font='18px helvetica-light'; s.lineHeight='27px'; s.color='#999'; s.margin='0 auto'; s.width='50%%'; s.textAlign='center'; s.margin='0 auto'; s.marginTop='100px'; s.marginBottom='30px'; s.width='235px'; s.height='235px'; s.paddingTop='250px'; s.backgroundRepeat='no-repeat'; s.backgroundPosition='top center'; s.backgroundImage='url(%@)';", kErrorPNGDataURL]];
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
