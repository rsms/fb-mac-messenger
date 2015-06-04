#import "AppDelegate.h"
#import <Sparkle/Sparkle.h>
#import "jsapi.h"
#import "WebPreferencesPrivate.h"
#import "WebStorageManagerPrivate.h"
#import "JSClass.hh"
#import "MEmbeddedRes.h"


#define USE_BLURRY_BACKGROUND 0

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
  NSWindow*            _window;
  WebView*             _webView;
  NSView*              _titlebarView; // NSTitlebarView
  NSString*            _lastNotificationCount;
  NSProgressIndicator* _progressBar;
}

- (void)applicationDidFinishLaunching:(NSNotification*)notification {
  // Register ourselves as the default-user-notification center delegate
  [NSUserNotificationCenter defaultUserNotificationCenter].delegate = self;

  // Create main window
  NSUInteger windowStyle = NSTitledWindowMask | NSClosableWindowMask | NSMiniaturizableWindowMask | NSResizableWindowMask;
  if (kCFIsOSX_10_10_orNewer) {
    windowStyle |= NSFullSizeContentViewWindowMask;
  }
  NSSize frameSize = {800,600};
  _window = [[NSWindow alloc] initWithContentRect:{{0,0},frameSize} styleMask:windowStyle backing:NSBackingStoreBuffered defer:YES];
  if (kCFIsOSX_10_10_orNewer) {
    _window.appearance = [NSAppearance appearanceNamed:NSAppearanceNameVibrantLight];
    _window.titleVisibility = NSWindowTitleHidden;
    _window.titlebarAppearsTransparent = YES;
    
    #if USE_BLURRY_BACKGROUND
    auto* fxview = [[NSVisualEffectView alloc] initWithFrame:{{0,0},frameSize}];
    fxview.blendingMode = NSVisualEffectBlendingModeBehindWindow;
    fxview.material = NSVisualEffectMaterialAppearanceBased;
    fxview.state = NSVisualEffectStateFollowsWindowActiveState;
    _window.contentView = fxview;
    #endif
  }
  _window.collectionBehavior = NSWindowCollectionBehaviorFullScreenPrimary;
  if ([[NSUserDefaults standardUserDefaults] boolForKey:@"moves-with-active-space"]) {
    _window.collectionBehavior |= NSWindowCollectionBehaviorMoveToActiveSpace;
  }
  _window.minSize = {640,400};
  _window.releasedWhenClosed = NO;
  _window.delegate = self;
  [_window center];
  _window.frameAutosaveName = @"main";
  _window.movableByWindowBackground = YES;
  _titlebarView = [_window standardWindowButton:NSWindowCloseButton].superview;
  [self updateWindowTitlebar];

  // Web prefs
  auto wp = [[WebPreferences alloc] initWithIdentifier:@"main"];
  #define ENABLE(k) do { wp.k = YES; } while(0)
  #define DISABLE(k) do { wp.k = NO; } while(0)
  #define PRINT(k) NSLog(@"%s: %s", #k, wp.k ? "y" : "n")
  //  PRINT(showDebugBorders);
  //  PRINT(showRepaintCounter);
  
  // Official settings
  DISABLE(javaEnabled);
  ENABLE(autosaves); // saves to user defaults with keys prefixed `identifier`

  // Set localstorage path to match WebStorageManager location. See http://stackoverflow.com/a/18153115
  wp.applicationCacheTotalQuota = 500 * 1024 * 1024;
  wp.applicationCacheDefaultOriginQuota = 500 * 1024 * 1024;
  [wp _setLocalStorageDatabasePath:[WebStorageManager _storageDirectoryPath]];
  ENABLE(localStorageEnabled);
  
  // Unofficial/Private settings
  ENABLE(acceleratedCompositingEnabled);
  ENABLE(acceleratedDrawingEnabled);
  ENABLE(accelerated2dCanvasEnabled);
  ENABLE(offlineWebApplicationCacheEnabled);
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
  [webView setFrame:[_window.contentView bounds]];
  webView.translatesAutoresizingMaskIntoConstraints = YES;
  webView.autoresizesSubviews = YES;
  webView.autoresizingMask = NSViewWidthSizable | NSViewHeightSizable;
  [_window.contentView addSubview:webView];
  webView.policyDelegate = self;
  webView.frameLoadDelegate = self;
  webView.UIDelegate = self;
  webView.preferences = wp;
  webView.continuousSpellCheckingEnabled = YES;
  #if USE_BLURRY_BACKGROUND
  webView.drawsBackground = NO;
  #endif
  _webView = webView;
  
  // Progress bar
  _progressBar = [[NSProgressIndicator alloc] initWithFrame:{{0,0},{500,5}}];
  _progressBar.indeterminate = NO;
  _progressBar.minValue = 0;
  _progressBar.maxValue = 1;
  _progressBar.style = NSProgressIndicatorBarStyle;
  _progressBar.usesThreadedAnimation = YES;
  _progressBar.displayedWhenStopped = NO;
  [_progressBar sizeToFit];
  [[NSNotificationCenter defaultCenter] addObserverForName:WebViewProgressStartedNotification object:webView queue:nil usingBlock:^(NSNotification *note) {
    _progressBar.doubleValue = 0;
    [_progressBar startAnimation:nil];
  }];
  [[NSNotificationCenter defaultCenter] addObserverForName:WebViewProgressEstimateChangedNotification object:webView queue:nil usingBlock:^(NSNotification *note) {
    _progressBar.doubleValue = webView.estimatedProgress;
  }];
  [[NSNotificationCenter defaultCenter] addObserverForName:WebViewProgressFinishedNotification object:webView queue:nil usingBlock:^(NSNotification *note) {
    _progressBar.doubleValue = 1;
    dispatch_async(dispatch_get_main_queue(), ^{
      [_progressBar stopAnimation:nil];
      _progressBar.displayedWhenStopped = NO;
    });
  }];
  _progressBar.translatesAutoresizingMaskIntoConstraints = NO;
  [_window.contentView addSubview:_progressBar];
  [_window.contentView addConstraints:
   [NSLayoutConstraint constraintsWithVisualFormat:@"H:|-40-[progressBar]-40-|"
                                           options:0
                                           metrics:nil
                                             views:@{@"progressBar": _progressBar}]];
  [_window.contentView addConstraints:
   [NSLayoutConstraint constraintsWithVisualFormat:@"V:|-(>=20)-[progressBar]-(>=20)-|"
                                           options:0
                                           metrics:nil
                                             views:@{@"progressBar": _progressBar}]];
  [_window.contentView addConstraint:
   [NSLayoutConstraint constraintWithItem:_progressBar
                                attribute:NSLayoutAttributeCenterY
                                relatedBy:NSLayoutRelationEqual
                                   toItem:_window.contentView
                                attribute:NSLayoutAttributeCenterY
                               multiplier:1.f constant:0.f]];

  // Present main window
  [_window makeKeyAndOrderFront:self];

  // Sparkle
  auto su = [SUUpdater sharedUpdater];
  su.feedURL = [NSURL URLWithString:@"http://fbmacmessenger.rsms.me/changelog.xml"];
  [su checkForUpdatesInBackground];
  su.automaticallyChecksForUpdates = YES;
  su.automaticallyDownloadsUpdates = YES;
    
  _lastNotificationCount = @"";

  [self reloadFromServer:self];
}


- (void)updateWindowTitlebar {
  const CGFloat kTitlebarHeight = 50;
  const CGFloat kFullScreenButtonYOrigin = 3;
  auto windowFrame = _window.frame;
  BOOL fullScreen = (_window.styleMask & NSFullScreenWindowMask) == NSFullScreenWindowMask;

  // Set size of titlebar container
  auto titlebarContainerView = _titlebarView.superview;
  auto titlebarContainerFrame = titlebarContainerView.frame;
  titlebarContainerFrame.origin.y = windowFrame.size.height - kTitlebarHeight;
  titlebarContainerFrame.size.height = kTitlebarHeight;
  titlebarContainerView.frame = titlebarContainerFrame;

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
  };
  updateButton([_window standardWindowButton:NSWindowCloseButton]);
  updateButton([_window standardWindowButton:NSWindowMiniaturizeButton]);
  updateButton([_window standardWindowButton:NSWindowZoomButton]);
}


- (void)setActiveConversationAtIndex:(NSString*)index {
  [_webView.windowScriptObject evaluateWebScript:
   [NSString stringWithFormat:@"MacMessenger.selectConversationAtIndex(%@)", index]];
}


- (IBAction)reloadFromServer:(id)sender {
  auto req = [[NSURLRequest alloc] initWithURL:[NSURL URLWithString:@"https://www.messenger.com/login"]];
  [_webView.mainFrame loadRequest:req];
}


- (IBAction)find:(id)sender {
  // Give input focus to the search field
  [_webView.windowScriptObject evaluateWebScript:@"MacMessenger.focusSearchField()"];
}


- (IBAction)composeNewMessage:(id)sender {
  [_webView.mainFrame.windowObject evaluateWebScript:@"MacMessenger.composeNewMessage()"];
}


- (IBAction)checkForUpdates:(id)sender {
  [[SUUpdater sharedUpdater] checkForUpdates:self];
}


- (IBAction)showPreferences:(id)sender {
  [_webView.mainFrame.windowObject evaluateWebScript:@"MacMessenger.showSettings()"];
}


- (IBAction)showAppHelp:(id)sender {
  [[NSWorkspace sharedWorkspace] openURL:[NSURL URLWithString:@"https://www.facebook.com/help/735006619902401"]];
}

- (IBAction)showAbout:(id)sender {
  [self showWebViewWindowWithID:@"about" title:@"About Messenger" URL:@"https://www.messenger.com/about"];
}

- (IBAction)logOut:(id)sender {
  [_webView.mainFrame.windowObject evaluateWebScript:@"MacMessenger.logOut()"];
}

- (IBAction)showTerms:(id)sender {
  [[NSWorkspace sharedWorkspace] openURL:[NSURL URLWithString:@"https://www.facebook.com/policies"]];
}

- (IBAction)showPrivacyPolicy:(id)sender {
  [self showWebViewWindowWithID:@"privacy-policy" title:@"Messenger Privacy Policy" URL:@"https://www.facebook.com/help/cookies"];
}


- (BOOL)applicationShouldHandleReopen:(NSApplication *)sender hasVisibleWindows:(BOOL)flag {
  [_window makeKeyAndOrderFront:self];
  return YES;
}

- (void)applicationDidBecomeActive:(NSNotification *)notification {
  [_window makeKeyAndOrderFront:self];
}


#pragma mark - Utils

- (NSWindow*)showWebViewWindowWithID:(NSString*)identifier title:(NSString*)title URL:(NSString*)url {
  NSUInteger windowStyle = NSTitledWindowMask | NSClosableWindowMask | NSResizableWindowMask;
  if (kCFIsOSX_10_10_orNewer) {
    windowStyle |= NSFullSizeContentViewWindowMask;
  }
  auto window = [[NSWindow alloc] initWithContentRect:{{0,0},{1040,800}} styleMask:windowStyle backing:NSBackingStoreBuffered defer:YES];
  window.minSize = {200,100};
  [window center];
  window.frameAutosaveName = identifier;
  window.movableByWindowBackground = YES;
  window.title = title;
  if (kCFIsOSX_10_10_orNewer) {
    window.appearance = [NSAppearance appearanceNamed:NSAppearanceNameVibrantLight];
    window.titleVisibility = title == nil ? NSWindowTitleHidden : NSWindowTitleVisible;
    //window.titlebarAppearsTransparent = YES;
  }

  auto webView = [[WebView alloc] initWithFrame:{{0,0},{100,100}} frameName:@"main" groupName:identifier];
  [webView setFrame:[window.contentView bounds]];
  webView.translatesAutoresizingMaskIntoConstraints = YES;
  webView.autoresizesSubviews = YES;
  webView.autoresizingMask = NSViewWidthSizable | NSViewHeightSizable;
  window.contentView = webView;
  auto req = [[NSURLRequest alloc] initWithURL:[NSURL URLWithString:url]];
  [webView.mainFrame loadRequest:req];
  
  window.releasedWhenClosed = YES;
  CFBridgingRetain(window);
  [window makeKeyAndOrderFront:self];

  return window;
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
  [_webView.windowScriptObject evaluateWebScript:@"MacMessenger.focusComposer()"];
}


- (void)windowDidResize:(NSNotification *)notification {
  if (_window.isVisible) {
    [self updateWindowTitlebar];
  }
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
  if (kCFIsOSX_10_10_orNewer) {
    openPanel.canResolveUbiquitousConflicts = YES;
    openPanel.canDownloadUbiquitousContents = YES;
  }
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
  auto bodys = U16JSStr(u"callback(\"granted\");");
  auto f = JSObjectMakeFunction(ctx, s, 1, &paramName, bodys, nullptr, 1, nullptr);
  JSClass::setProperty(ctx, NotificationCons, u"requestPermission", f);
  JSStringRelease(paramName);
  JSStringRelease(bodys);
  JSStringRelease(s);

  JSClass::setProperty(ctx, globalObj, u"Notification", NotificationCons);
  
  // Enable desktop notifications by default
  // Must be injected as localStorage access is per domain name (and so we can't access it from main.js)
  [webView.mainFrame.windowObject evaluateWebScript:@""
   "if (!localStorage.getItem('_cs_desktopNotifsEnabled')) {"
   "  var v = {__t:(new Date).getTime(),__v:true};"
   "  localStorage._cs_desktopNotifsEnabled = v;"
   "  localStorage.setItem('_cs_desktopNotifsEnabled', JSON.stringify(v));"
   "}"
   ];
  
  // JS injection. Wait for <head> to become available and then add our <script>
  if (![[NSUserDefaults standardUserDefaults] boolForKey:@"main.js/disable"]) {
    auto bundleInfo = [NSBundle mainBundle].infoDictionary;
    #if DEBUG
    auto mainJSURLString = @"resource://bundle/main.js";
    #else
    auto mainJSURLString = [NSString stringWithFormat:@"http://fbmacmessenger.rsms.me/app/main.js?v=%@", bundleInfo[@"GitRev"]];
    #endif
    [webView.mainFrame.windowObject evaluateWebScript:
     [NSString stringWithFormat:@""
      "window.MacMessengerVersion = '%@';"
      "window.MacMessengerGitRev = '%@';"
      "new MutationObserver(function() {"
      "  if (document.head) {"
      "    var script = document.createElement('script');"
      "    script.async = true;"
      "    script.src = '%@';"
      "    document.head.appendChild(script);"
      "    this.disconnect();"
      "  }"
      "}).observe(document, { attributes: false, childList: true, characterData: false });",
      bundleInfo[@"CFBundleShortVersionString"],
      bundleInfo[@"GitRev"],
      mainJSURLString]
     ];
  }
}


- (void)webView:(WebView *)webView didFinishLoadForFrame:(WebFrame *)frame {
  auto rsp = frame.dataSource.response;
  if ([rsp isKindOfClass:[NSHTTPURLResponse class]] && ((NSHTTPURLResponse*)rsp).statusCode == 400) {
    NSLog(@"%@%@ frame.dataSource.response=%@", self, NSStringFromSelector(_cmd), frame.dataSource.response);
    [webView.mainFrame.windowObject evaluateWebScript:
     [NSString stringWithFormat:@""
      "document.body.innerText = '';"
      "var e = document.createElement('p');"
      "document.body.appendChild(e);"
      "e.innerText = 'Oh noes. It appears Messenger.com is down for maintenance. Please try again later.';"
      "var s = e.style;"
      "s.font='18px helvetica-light';"
      "s.lineHeight='27px';"
      "s.color='#999';"
      "s.margin='0 auto';"
      "s.width='50%%';"
      "s.textAlign='center';"
      "s.margin='0 auto';"
      "s.marginTop='100px';"
      "s.marginBottom='30px';"
      "s.width='235px';"
      "s.height='235px';"
      "s.paddingTop='250px';"
      "s.backgroundRepeat='no-repeat';"
      "s.backgroundPosition='top center';"
      "s.backgroundImage='url(%@)';",
      kErrorPNGDataURL]];
  }
}

-(void)webView:(WebView *)webView didFailProvisionalLoadWithError:(NSError *)error forFrame:(WebFrame *)frame {
  NSLog(@"%@%@ error=%@", self, NSStringFromSelector(_cmd), error);
  [webView.mainFrame.windowObject evaluateWebScript:
   [NSString stringWithFormat:@""
    "document.body.innerText = '';"
    "var e = document.createElement('p');"
    "document.body.appendChild(e);"
    "e.innerText = 'Oh snap. It looks like your connection is offline, please try again later.';"
    "var s = e.style;"
    "s.font='18px helvetica-light';"
    "s.lineHeight='27px';"
    "s.color='#999';"
    "s.margin='0 auto';"
    "s.width='50%%';"
    "s.textAlign='center';"
    "s.margin='0 auto';"
    "s.marginTop='100px';"
    "s.marginBottom='30px';"
    "s.width='235px';"
    "s.height='235px';"
    "s.paddingTop='250px';"
    "s.backgroundRepeat='no-repeat';"
    "s.backgroundPosition='top center';"
    "s.backgroundImage='url(%@)';",
    kErrorPNGDataURL]];
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
  } else if ([[url description] isCaseInsensitiveLike:@"about:blank"]) {
    // NSLog(@"Ignore about:blank request."); Seems like a dirty workaround and probably needs further investigation.
    [listener ignore];
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
