#import "AppDelegate.h"
#import <Sparkle/Sparkle.h>
#import <IOKit/IOKitLib.h>
#import <dispatch/dispatch.h>
#import <SystemConfiguration/SCNetworkReachability.h>
#import "jsapi.h"
#import "WebPreferencesPrivate.h"
#import "WebStorageManagerPrivate.h"
#import "WebViewPrivate.h"
#import "JSClass.hh"
#import "MEmbeddedRes.h"
#import "MMFakeDragInfo.h"

#define USE_BLURRY_BACKGROUND 0

static BOOL kCFIsOSX_10_10_orNewer;

static void __attribute__((constructor))_init() {
  kCFIsOSX_10_10_orNewer = floor(kCFCoreFoundationVersionNumber) > kCFCoreFoundationVersionNumber10_9;
}


// Returns the serial number as a CFString.
// It is the caller's responsibility to release the returned CFString when done with it.
NSString* ReadDeviceID() {
  NSString* did = nil;
  io_service_t platformExpert = IOServiceGetMatchingService(kIOMasterPortDefault, IOServiceMatching("IOPlatformExpertDevice"));
  if (platformExpert) {
    CFTypeRef serialNumberAsCFString = IORegistryEntryCreateCFProperty(platformExpert, CFSTR(kIOPlatformSerialNumberKey), kCFAllocatorDefault, 0);
    CFStringRef sr = (CFStringRef)serialNumberAsCFString;
    did = (NSString*)CFBridgingRelease(sr);
    IOObjectRelease(platformExpert);
  }
  return did;
}



@interface AppDelegate ()
@property (nonatomic, readonly) BOOL canMakeTextLarger;
- (IBAction)makeTextLarger:(id)sender;
@property (nonatomic, readonly) BOOL canMakeTextSmaller;
- (IBAction)makeTextSmaller:(id)sender;
@property (nonatomic, readonly) BOOL canMakeTextStandardSize;
- (IBAction)makeTextStandardSize:(id)sender;
- (void)updateNetReach:(SCNetworkConnectionFlags)flags;
@end


static void NetReachCallback(SCNetworkReachabilityRef target,
                             SCNetworkConnectionFlags flags,
                             void* userdata)
{
  // Observed flags:
  // - nearly gone: kSCNetworkFlagsReachable alone (ignored)
  // - gone: kSCNetworkFlagsTransientConnection | kSCNetworkFlagsReachable | kSCNetworkFlagsConnectionRequired
  // - connected: kSCNetworkFlagsIsDirect | kSCNetworkFlagsReachable
  auto self = (__bridge AppDelegate*)userdata;
  [self updateNetReach:flags];
}


@implementation AppDelegate {
  NSWindow*            _window;
  WebView*             _webView;
  WebView*             _dummyExternalWebView;
  NSView*              _titlebarView; // NSTitlebarView
  NSString*            _lastNotificationCount;
  NSProgressIndicator* _progressBar;
  NSView*              _curtainView;
  NSTimer*             _reloadWhenIdleTimer;
  NSDate*              _lastReloadDate;
  SCNetworkReachabilityRef _netReachRef;
  BOOL                 _isOnline;
  BOOL                 _needsReload;
  BOOL                 _webAppIsFunctional;
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
  _window.minSize = {605,300};
    // note: as of 2015-08-12, 604pt is as narrow as messenger.com allows the view to be, before body starts scrolling.
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
  NSString *webKitVersion = [[NSBundle bundleForClass:[WebView class]]
                             objectForInfoDictionaryKey:(__bridge NSString *)kCFBundleVersionKey];
  NSString *version = [[NSBundle mainBundle] objectForInfoDictionaryKey:(__bridge NSString *)kCFBundleVersionKey];
  webView.applicationNameForUserAgent = [NSString stringWithFormat:@"fb-mac-messenger/%@, like Safari/%@",
                                         version, webKitVersion];
  #if 0
  webView.customUserAgent = @"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/600.7.12 (KHTML, like Gecko) Version/8.0.7 Safari/600.7.12";
  #endif // 0
  webView.maintainsBackForwardList = NO;
  webView.continuousSpellCheckingEnabled = YES;
  #if USE_BLURRY_BACKGROUND
  webView.drawsBackground = NO;
  #endif
  _webView = webView;
  
  // Dim effect view
  _curtainView = [[NSView alloc] initWithFrame:[_window.contentView bounds]];
  _curtainView.translatesAutoresizingMaskIntoConstraints = YES;
  _curtainView.autoresizesSubviews = YES;
  _curtainView.autoresizingMask = NSViewWidthSizable | NSViewHeightSizable;
  _curtainView.wantsLayer = YES;
  _curtainView.layer.backgroundColor = [NSColor whiteColor].CGColor;
  _curtainView.layer.opaque = NO;
  _curtainView.alphaValue = 0.8;
  [_window.contentView addSubview:_curtainView];
  
  // Progress bar
  _progressBar = [[NSProgressIndicator alloc] initWithFrame:{{0,0},{500,5}}];
  _progressBar.indeterminate = NO;
  _progressBar.minValue = 0;
  _progressBar.maxValue = 1;
  _progressBar.style = NSProgressIndicatorBarStyle;
  [_progressBar sizeToFit];
  [[NSNotificationCenter defaultCenter] addObserverForName:WebViewProgressStartedNotification object:webView queue:nil usingBlock:^(NSNotification *note) {
    _progressBar.doubleValue = 0;
    _curtainView.alphaValue = 0.8;
    _curtainView.hidden = NO;
    [_progressBar startAnimation:nil];
  }];
  [[NSNotificationCenter defaultCenter] addObserverForName:WebViewProgressEstimateChangedNotification object:webView queue:nil usingBlock:^(NSNotification *note) {
    _progressBar.doubleValue = webView.estimatedProgress;
  }];
  [[NSNotificationCenter defaultCenter] addObserverForName:WebViewProgressFinishedNotification object:webView queue:nil usingBlock:^(NSNotification *note) {
    _progressBar.doubleValue = 1;
    _curtainView.animator.alphaValue = 0;
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, 0.5 * NSEC_PER_SEC), dispatch_get_main_queue(), ^(void){
      if (_curtainView.alphaValue == 0) {
        _curtainView.hidden = YES;
      }
    });
    dispatch_async(dispatch_get_main_queue(), ^{
      [_progressBar stopAnimation:nil];
    });
  }];
  _progressBar.translatesAutoresizingMaskIntoConstraints = NO;
  [_curtainView addSubview:_progressBar];
  [_curtainView addConstraints:
   [NSLayoutConstraint constraintsWithVisualFormat:@"H:|-40-[progressBar]-40-|"
                                           options:0
                                           metrics:nil
                                             views:@{@"progressBar": _progressBar}]];
  [_curtainView addConstraints:
   [NSLayoutConstraint constraintsWithVisualFormat:@"V:|-(>=20)-[progressBar]-(>=20)-|"
                                           options:0
                                           metrics:nil
                                             views:@{@"progressBar": _progressBar}]];
  [_curtainView addConstraint:
   [NSLayoutConstraint constraintWithItem:_progressBar
                                attribute:NSLayoutAttributeCenterY
                                relatedBy:NSLayoutRelationEqual
                                   toItem:_curtainView
                                attribute:NSLayoutAttributeCenterY
                               multiplier:1.f constant:0.f]];

  // Present main window
  [_window makeKeyAndOrderFront:self];

  auto bundleInfo = [NSBundle mainBundle].infoDictionary;
  NSString* appVersion = bundleInfo[@"CFBundleVersion"];
  assert([appVersion isKindOfClass:[NSString class]]);

  // Sparkle
  auto su = [SUUpdater sharedUpdater];
  if ([appVersion hasPrefix:@"0.1.2."] || [appVersion hasPrefix:@"0.1.1."] || [appVersion hasPrefix:@"0.1.0."] || [appVersion hasPrefix:@"0.0."]) {
    // Revert previous behaviour of Sparkle which prevented "new version" dialog to appear automatically
    su.automaticallyDownloadsUpdates = NO;
  }
  su.feedURL = [NSURL URLWithString:@"http://fbmacmessenger.rsms.me/changelog.xml"];
  su.userAgentString = [NSString stringWithFormat:@"Messenger/%@ Sparkle/%@ Device/%@",
                        appVersion,
                        [NSBundle bundleForClass:[SUUpdater class]].infoDictionary[@"CFBundleVersion"],
                        ReadDeviceID()];
  su.updateCheckInterval = 60 * 60; // every hour
  su.automaticallyChecksForUpdates = YES;
  [su performSelector:@selector(checkForUpdatesInBackground) withObject:nil afterDelay:1];

  _lastNotificationCount = @"";
  _isOnline = YES; // initially assume we are online and can access messenger.com

  [self reloadFromServer:self];
  [self initNetReachObservation];
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
  
  auto hidden = [[NSUserDefaults standardUserDefaults] boolForKey:@"traffic-lights/hidden"];

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
    
    if (hidden) {
      buttonView.hidden = YES;
    }
  };
  updateButton([_window standardWindowButton:NSWindowCloseButton]);
  updateButton([_window standardWindowButton:NSWindowMiniaturizeButton]);
  updateButton([_window standardWindowButton:NSWindowZoomButton]);
}


- (void)dealloc {
  [self disableNetReachObservation];
}


- (void)initNetReachObservation {
  _netReachRef = SCNetworkReachabilityCreateWithName(kCFAllocatorDefault, "www.messenger.com");
  assert(_netReachRef != nullptr); // FIXME
  SCNetworkReachabilityContext context = {0, (__bridge void*)self, NULL, NULL, NULL};
  SCNetworkReachabilitySetCallback(_netReachRef, NetReachCallback, &context);
  auto queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
  SCNetworkReachabilitySetDispatchQueue(_netReachRef, queue);
  // Get initial flags
//  CFRetain(_netReachRef);
//  dispatch_async(queue, ^{
//    SCNetworkConnectionFlags flags;
//    if (_netReachRef != nil) {
//      if (SCNetworkReachabilityGetFlags(_netReachRef, &flags)) {
//        [self updateNetReach:flags];
//      }
//      CFRelease(_netReachRef);
//    }
//  });
}


- (void)updateNetReach:(SCNetworkConnectionFlags)flags {
  BOOL isOnline = ( (flags & kSCNetworkFlagsReachable) && !(flags & kSCNetworkFlagsConnectionRequired) );
  if (isOnline != _isOnline) {
    // changed
    _isOnline = isOnline;
    NSLog(@"netreach changed to %@", isOnline ? @"online" : @"offline");
    if (isOnline && _needsReload) {
      dispatch_async(dispatch_get_main_queue(), ^{
        if (!_webAppIsFunctional || [NSApplication sharedApplication].isActive) {
          [self reloadFromServer:self];
        }
      });
    }
  }
}


- (void)disableNetReachObservation {
  if (_netReachRef) {
    SCNetworkReachabilityUnscheduleFromRunLoop(_netReachRef, CFRunLoopGetMain(), kCFRunLoopCommonModes);
    SCNetworkReachabilitySetCallback(_netReachRef, NULL, NULL);
    CFRelease(_netReachRef);
    _netReachRef = nil;
  }
}


- (id)evaluateJavaScript:(NSString *)script
{
  WebScriptObject *scriptObject = _webView.windowScriptObject;
  static NSString * const kErrorPrefix = @"Exception raised during -evaluateWebScript: ";
  script = [NSString stringWithFormat:
            @"try { %@ } catch (e) { \"%@\"+e.sourceURL+\":\"+e.line+\": \"+e.toString() }", script, kErrorPrefix];
  id result = [scriptObject evaluateWebScript:script];
  if ([result isKindOfClass:[NSString class]] && [result hasPrefix:kErrorPrefix]) {
    [NSException raise:NSGenericException format:@"%@", result];
  }
  return result;
}


- (void)setActiveConversationAtIndex:(NSString*)index {
  [self evaluateJavaScript:[NSString stringWithFormat:@"MacMessenger.selectConversationAtIndex(%@)", index]];
}


- (BOOL)validateMenuItem:(NSMenuItem *)menuItem {
  SEL action = [menuItem action];
  if (action == @selector(selectNewerConversation:)) {
    return [self canSelectNewerConversation];
  } else if (action == @selector(selectOlderConversation:)) {
    return [self canSelectOlderConversation];
  } else {
    return YES;
  }
}


- (BOOL)canSelectNewerConversation {
  return [[self evaluateJavaScript:@"MacMessenger.canSelectNewerConversation()"] boolValue];
}


- (IBAction)selectNewerConversation:(id)sender {
  [self evaluateJavaScript:@"MacMessenger.selectNewerConversation()"];
}


- (BOOL)canSelectOlderConversation {
  return [[self evaluateJavaScript:@"MacMessenger.canSelectOlderConversation()"] boolValue];
}


- (IBAction)selectOlderConversation:(id)sender {
  [self evaluateJavaScript:@"MacMessenger.selectOlderConversation()"];
}


- (IBAction)reloadFromServer:(id)sender {
  NSString* url = nil;
  if (_webView.mainFrame.DOMDocument != nil && _webView.mainFrame.DOMDocument.URL.length != 0) {
    NSLog(@"Reloading app");
    url = _webView.mainFrame.DOMDocument.URL;
  } else {
    url = @"https://www.messenger.com/login";
  }
  auto req = [[NSURLRequest alloc] initWithURL:[NSURL URLWithString:url]];
  [_webView.mainFrame loadRequest:req];
  _lastReloadDate = [NSDate date];
}


- (IBAction)findPeopleAndGroups:(id)sender {
  // Give input focus to the search field
  [self evaluateJavaScript:@"MacMessenger.focusSearchField()"];
}

- (IBAction)paste:(id)sender {
  NSPasteboard *pasteboard = [NSPasteboard generalPasteboard];

  // If we've got an image, let's paste it!
  // Ain't nobody got time for dirty hax with React.
  if ([pasteboard canReadObjectForClasses:@[[NSImage class]] options:nil]) {
    NSImage *pastedImage = [[pasteboard readObjectsForClasses:@[[NSImage class]] options:nil] firstObject];

    // Try to grab the URL to the image being pasted (if it's available) to just repurpose the already useable pasteboard.
    NSURL *pastedFileURL = [[pasteboard readObjectsForClasses:@[[NSURL class]] options:nil] firstObject];

    // If we haven't got a file URL (screenshot), we need to write it out first.
    if (pastedFileURL == nil) {
      // Convert the pasteboard image to a PNG.
      NSRect proposedRect = NSMakeRect(0, 0, pastedImage.size.width, pastedImage.size.height);
      CGImageRef pastedImageRef = [pastedImage CGImageForProposedRect:&proposedRect
                                                              context:NULL
                                                                hints:nil];
      NSBitmapImageRep *bitmapImageRep = [[NSBitmapImageRep alloc] initWithCGImage:pastedImageRef];
      NSData *PNGImageData = [bitmapImageRep representationUsingType:NSPNGFileType properties:nil];

      // Save it (temporarily with a new name).
      NSString *uniqueFilename = [[NSUUID UUID].UUIDString stringByAppendingString:@".png"];
      NSString *tmpPath = [NSTemporaryDirectory() stringByAppendingPathComponent:uniqueFilename];
      [PNGImageData writeToFile:tmpPath atomically:YES];

      pastedFileURL = [NSURL fileURLWithPath:tmpPath];

      // Write our newly saved file to the pasteboard.
      [pasteboard clearContents];
      [pasteboard declareTypes:@[NSFilenamesPboardType] owner:self];
      [pasteboard writeObjects:@[pastedFileURL]];
    }

    if (pastedFileURL != nil) {
      // Fire off a completely falsified (and bs) drag+drop event. >:D
      MMFakeDragInfo *info = [[MMFakeDragInfo alloc] initWithImage:pastedImage pasteboard:pasteboard];
      [_webView draggingEntered:info];
      [_webView draggingUpdated:info];
      [_webView performDragOperation:info];
    }
  } else {
    [[NSApplication sharedApplication] sendAction:@selector(paste:) to:nil from:self];
  }
}

- (IBAction)composeNewMessage:(id)sender {
  [self evaluateJavaScript:@"MacMessenger.composeNewMessage()"];
}


- (IBAction)checkForUpdates:(id)sender {
  [[SUUpdater sharedUpdater] checkForUpdates:self];
}


- (IBAction)showPreferences:(id)sender {
  [self evaluateJavaScript:@"MacMessenger.showSettings()"];
}


- (IBAction)showAppHelp:(id)sender {
  [[NSWorkspace sharedWorkspace] openURL:[NSURL URLWithString:@"https://www.facebook.com/help/735006619902401"]];
}

- (IBAction)showAbout:(id)sender {
  [self showWebViewWindowWithID:@"about" title:@"About Messenger" URL:@"https://www.messenger.com/about"];
}

- (IBAction)logOut:(id)sender {
  [self evaluateJavaScript:@"MacMessenger.logOut()"];
}

- (IBAction)showTerms:(id)sender {
  [[NSWorkspace sharedWorkspace] openURL:[NSURL URLWithString:@"https://www.facebook.com/policies"]];
}

- (IBAction)showPrivacyPolicy:(id)sender {
  [self showWebViewWindowWithID:@"privacy-policy" title:@"Messenger Privacy Policy" URL:@"https://www.facebook.com/help/cookies"];
}

- (IBAction)toggleFullscreen:(id)sender {
  [_window toggleFullScreen:sender];
}


- (BOOL)applicationShouldHandleReopen:(NSApplication *)sender hasVisibleWindows:(BOOL)flag {
  [_window makeKeyAndOrderFront:self];
  return YES;
}

- (void)applicationDidBecomeActive:(NSNotification *)notification {
  // Note: Becomes active after unlocking computer when app was active while the computer was locked
  [_window makeKeyAndOrderFront:self];
  [self cancelReloadTimer];
}

- (void)applicationDidResignActive:(NSNotification *)notification {
  [self restartReloadTimer];
}

#pragma mark - Background auto-reload

- (void)restartReloadTimer {
  static NSTimeInterval kMinReloadInterval = 4;   // wait at least N to reload
  
  NSTimeInterval interval = [[NSUserDefaults standardUserDefaults] floatForKey:@"autoreload"];
  if (isnan(interval) || interval < 0 || interval == +0.0 || interval == -0.0) {
    return;
  }

  if (interval < kMinReloadInterval) {
    interval = kMinReloadInterval;
  }

  NSTimeInterval timeSinceLastReload = -_lastReloadDate.timeIntervalSinceNow;
  NSTimeInterval reloadInterval = 0;

  if (_needsReload || timeSinceLastReload >= interval) {
    reloadInterval = kMinReloadInterval;
  } else {
    reloadInterval = (interval - timeSinceLastReload) + kMinReloadInterval;
  }

  [self cancelReloadTimer];
  //NSLog(@"reloading app in %.2f seconds", reloadInterval);
  _reloadWhenIdleTimer = [NSTimer scheduledTimerWithTimeInterval:reloadInterval target:self selector:@selector(reloadTimerTriggered) userInfo:nil repeats:NO];
  _reloadWhenIdleTimer.tolerance = 1;
}


- (void)reloadTimerTriggered {
  _reloadWhenIdleTimer = nil;
  _needsReload = YES;
  if (_isOnline) {
    [self reloadFromServer:self];
  }
}

- (void)cancelReloadTimer {
  if (_reloadWhenIdleTimer != nil) {
    [_reloadWhenIdleTimer invalidate];
    _reloadWhenIdleTimer = nil;
  }
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

// Warning: The following methods are internal to WebView and might change at any time
- (IBAction)zoomPageIn:(id)sender {
  [_webView zoomPageIn:sender];
  // Possible alternate way, which would require some fairly advanced layout code:
  // auto clipView = _webView.mainFrame.frameView.documentView.superview;
  // [clipView scaleUnitSquareToSize:NSMakeSize(1.1, 1.1)];
  // [clipView setNeedsDisplay:YES];
}
- (IBAction)zoomPageOut:(id)sender { [_webView zoomPageOut:sender]; }
- (BOOL)canZoomPageIn { return [_webView canZoomPageIn]; }
- (IBAction)resetPageZoom:(id)sender {
  [_webView resetPageZoom:sender];
  // We also reset text size
  [_webView makeTextStandardSize:sender];
}
- (BOOL)canZoomPageOut { return [_webView canZoomPageOut]; }
- (BOOL)canResetPageZoom { return [_webView canResetPageZoom] || [self canMakeTextStandardSize]; }

#pragma mark - NSWindowDelegate


- (void)windowDidBecomeKey:(NSNotification*)notification {
  //NSLog(@"%@%@%@", self, NSStringFromSelector(_cmd), notification);
  // Give focus to the composer
  [self evaluateJavaScript:@"(typeof MacMessenger != 'undefined') && MacMessenger.focusComposer()"];
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


- (WebView *)webView:(WebView *)sender createWebViewWithRequest:(NSURLRequest *)request {
  // When window.open() is used, request will be nil, so we have to create a dummy WebView and wait for the policy
  // delegate call:
  if (!_dummyExternalWebView) {
    _dummyExternalWebView = [WebView new];
    [_dummyExternalWebView setPolicyDelegate:self];
  }
  return _dummyExternalWebView;
}


#pragma mark - WebFrameLoadDelegate


- (void)webView:(WebView *)webView didClearWindowObject:(WebScriptObject *)windowObject forFrame:(WebFrame *)frame {
  if (webView != _webView || frame != _webView.mainFrame) {
    return;
  }
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
      "function injectMainJS() {"
      "  if (document.head || document.documentElement) {"
      "    var script = document.createElement('script');"
      "    script.async = true;"
      "    script.src = '%@';"
      "    (document.head || document.documentElement).appendChild(script);"
      "    return true;"
      "  }"
      "}"
      "if (!injectMainJS()) {"
      "  new MutationObserver(function() {"
      "    if (injectMainJS()) {"
      "      this.disconnect();"
      "    }"
      "  }).observe(document, { attributes: false, childList: true, characterData: false });"
      "}",
      bundleInfo[@"CFBundleShortVersionString"],
      bundleInfo[@"GitRev"],
      mainJSURLString]
     ];
  }
  
  // Disable vertical scroll elasticity on parent webview scrollview
  webView.mainFrame.frameView.allowsScrolling = NO; // < Note: Doesn't seem to have any effect.
  webView.mainFrame.frameView.documentView.enclosingScrollView.verticalScrollElasticity = NSScrollElasticityNone;
}


- (void)webView:(WebView *)sender didCommitLoadForFrame:(WebFrame *)frame {
  // Called when the web view starts loading (NOT called if loading failed)
  _needsReload = NO;
  _webAppIsFunctional = YES;
  
  // Restart reload timer?
  auto app = [NSApplication sharedApplication];
  if (!app.isActive || app.isHidden) {
    [self restartReloadTimer];
  }
}


- (void)webView:(WebView *)webView didFinishLoadForFrame:(WebFrame *)frame {
  auto rsp = frame.dataSource.response;
  if ([rsp isKindOfClass:[NSHTTPURLResponse class]] && ((NSHTTPURLResponse*)rsp).statusCode == 400) {
    NSLog(@"%@%@ frame.dataSource.response=%@", self, NSStringFromSelector(_cmd), frame.dataSource.response);
    _needsReload = YES;
    _webAppIsFunctional = NO;
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
  NSLog(@"%@ error=%@", NSStringFromSelector(_cmd), error);
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

  _webAppIsFunctional = NO;
  _needsReload = YES;
  if (_isOnline) {
    [self restartReloadTimer];
  }
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
#if DEBUG
  static BOOL sAlreadyReported = NO;
  if (!sAlreadyReported) {
    NSLog(@"DEBUG: request header User-Agent: %@", [request valueForHTTPHeaderField:@"User-Agent"]);
    sAlreadyReported = YES;
  }
#endif // DEBUG
  NSURL* url = [[actionInformation objectForKey:WebActionOriginalURLKey] absoluteURL];
  if ([url.scheme isEqualToString:@"about"]) {
    [listener ignore];
  } else if ([url.host isEqualToString:@"www.messenger.com"] ||
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
