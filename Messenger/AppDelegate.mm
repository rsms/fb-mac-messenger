#import "AppDelegate.h"
#import <Sparkle/Sparkle.h>
#import <IOKit/IOKitLib.h>
#import <dispatch/dispatch.h>
#import <SystemConfiguration/SCNetworkReachability.h>
#import "jsapi.h"
#import "WebPreferencesPrivate.h"
#import "WebStorageManagerPrivate.h"
#import "WebViewZoomController.h"
#import "JSClass.hh"
#import "MEmbeddedRes.h"
#import "FBMWindow.h"
#import "PFMoveApplication.h"

extern NSString* kMainJSDataURL; // implemented in generated file MainJSDataURL.m

#define USE_BLURRY_BACKGROUND 0

static NSString* kDefaultWindowTitle = @"Messenger";

static BOOL kCFIsOSX_10_10_orNewer;

static void __attribute__((constructor))_init() {
  kCFIsOSX_10_10_orNewer = kCFCoreFoundationVersionNumber >= kCFCoreFoundationVersionNumber10_10;
}

int FBMOSX1010OrNewer() {
  return kCFIsOSX_10_10_orNewer ? 1 : 0;
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
  FBMWindow*           _window;
  WebView*             _webView;
  WebViewZoomController* _webViewZoomController;
  WebView*             _dummyExternalWebView;
  NSString*            _lastNotificationCount;
  NSProgressIndicator* _progressBar;
  NSView*              _curtainView;
  NSTimer*             _reloadWhenIdleTimer;
  NSDate*              _lastReloadDate;
  SCNetworkReachabilityRef _netReachRef;
  BOOL                 _isOnline;
  BOOL                 _needsReload;
  BOOL                 _webAppIsFunctional;
  BOOL                 _needsJSInjection;
}

const CGFloat kTitlebarHeightAtDefaultScale = 50;


- (void)applicationDidFinishLaunching:(NSNotification*)notification {

  #ifndef DEBUG
  // Ask to be moved into Applications folder
  PFMoveToApplicationsFolderIfNecessary();
  #endif

  // Register ourselves as the default-user-notification center delegate
  [NSUserNotificationCenter defaultUserNotificationCenter].delegate = self;

  // Register user defaults
  auto ud = [NSUserDefaults standardUserDefaults];
  [ud registerDefaults:@{@"WebContinuousSpellCheckingEnabled": @YES}];

  // Create main window
  _window = [[FBMWindow alloc] initWithTitlebarHeight:kTitlebarHeightAtDefaultScale];

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
  ENABLE(databasesEnabled);
  DISABLE(webGLEnabled);
  
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
  [_window setMainView:webView];
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
  #if USE_BLURRY_BACKGROUND
  webView.drawsBackground = NO;
  #endif
  _webView = webView;

  _webViewZoomController = [[WebViewZoomController alloc] initWithWebView:webView userDefaults:[NSUserDefaults standardUserDefaults]];
  [_webViewZoomController restoreSavedZoomLevels];
  [_webViewZoomController addObserver:self forKeyPath:@"zoomLevel" options:0 context:nil];
  [self updateAfterZoomLevelChange];
  
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

  _lastNotificationCount = @"";
  _isOnline = YES; // initially assume we are online and can access messenger.com
  
  // Sparkle
  auto bundleInfo = [NSBundle mainBundle].infoDictionary;
  NSString* appVersion = bundleInfo[@"CFBundleVersion"];
  assert([appVersion isKindOfClass:[NSString class]]);
  
  // Sparkle
  auto su = [SUUpdater sharedUpdater];
  if ([appVersion hasPrefix:@"0.1.2."] || [appVersion hasPrefix:@"0.1.1."] || [appVersion hasPrefix:@"0.1.0."] || [appVersion hasPrefix:@"0.0."]) {
    // Revert previous behaviour of Sparkle which prevented "new version" dialog to appear automatically
    su.automaticallyDownloadsUpdates = NO;
  }
  su.userAgentString = [NSString stringWithFormat:@"Messenger/%@ Sparkle/%@ Device/%@",
                        appVersion,
                        [NSBundle bundleForClass:[SUUpdater class]].infoDictionary[@"CFBundleVersion"],
                        ReadDeviceID()];
  su.updateCheckInterval = 60 * 60; // every hour
  su.automaticallyChecksForUpdates = YES;
  [su performSelector:@selector(checkForUpdatesInBackground) withObject:nil afterDelay:1];

  [self reloadFromServer:self];
  [self initNetReachObservation];
}


- (void)dealloc {
  [self disableNetReachObservation];
  [_webViewZoomController removeObserver:self forKeyPath:@"zoomLevel" context:nil];
}


- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary<NSKeyValueChangeKey,id> *)change context:(void *)context {
  assert([keyPath isEqualToString:@"zoomLevel"]); // change to if stmt if observing more things
  [self updateAfterZoomLevelChange];
}


- (void)updateAfterZoomLevelChange {
  CGFloat titlebarHeight = kTitlebarHeightAtDefaultScale;
  switch (_webViewZoomController.zoomLevel) {
    case -3: {
      // 50% -- 50px = 25px
      titlebarHeight = titlebarHeight * 0.5; break;
    }
    case -2: {
      // 75% -- 50px = 38px
      titlebarHeight = titlebarHeight * 0.75; break;
    }
    case -1: {
      // 85% -- 50px = 43px
      titlebarHeight = titlebarHeight * 0.85; break;
    }
    // 0: 100% -- 50px
    case 1: {
      // 115% -- 50px = 58px
      titlebarHeight = titlebarHeight * 1.15; break;
    }
    case 2: {
      // 125% -- 50px = 63px
      titlebarHeight = titlebarHeight * 1.25; break;
    }
    case 3: {
      // 150% -- 50px = 75px
      titlebarHeight = titlebarHeight * 1.50; break;
    }
    case 4: {
      // 175% -- 50px = 88px
      titlebarHeight = titlebarHeight * 1.75; break;
    }
    case 5: {
      // 200% -- 50px = 100px
      titlebarHeight = titlebarHeight * 2; break;
    }
    case 6: {
      // 250% -- 50px = 125px
      titlebarHeight = titlebarHeight * 2.5; break;
    }
    default: {
      if (titlebarHeight < 0) {
        titlebarHeight = ceil(titlebarHeight * 0.25);
      } else if (titlebarHeight < 0) {
        titlebarHeight = ceil(titlebarHeight * 3);
      }
    }
  }
  _window.titlebarHeight = titlebarHeight;
}


- (NSWindow*)mainWindow {
  return _window;
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


- (id)evaluateJavaScript:(NSString *)script {
  WebScriptObject *scriptObject = _webView.windowScriptObject;
  static NSString * const kErrorPrefix = @"Exception raised during -evaluateWebScript: ";
  script = [NSString stringWithFormat:
            @"try { %@ } catch (e) { \"%@main.js:\"+e.line+\": \"+e.toString() }", script, kErrorPrefix];
  id result = [scriptObject evaluateWebScript:script];
  if ([result isKindOfClass:[NSString class]] && [result hasPrefix:kErrorPrefix]) {
    //[NSException raise:NSGenericException format:@"%@", result];
    NSLog(@"[evaluateJavaScript] %@", result);
    return nil;
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
//  } else if (action == @selector(showAbout:)) {
//    menuItem.title = [NSString stringWithFormat:@"About Messenger %@", [NSBundle mainBundle].infoDictionary[@"CFBundleVersion"]];
//    return YES;
  } else {
    return YES;
  }
}


- (BOOL)canSelectNewerConversation {
  NSNumber* v = [self evaluateJavaScript:@"MacMessenger.canSelectNewerConversation()"];
  return v == nil || ![v isKindOfClass:[NSNumber class]] ? NO : [v boolValue];
}


- (IBAction)selectNewerConversation:(id)sender {
  [self evaluateJavaScript:@"MacMessenger.selectNewerConversation()"];
}


- (BOOL)canSelectOlderConversation {
  NSNumber* v = [self evaluateJavaScript:@"MacMessenger.canSelectOlderConversation()"];
  return v == nil || ![v isKindOfClass:[NSNumber class]] ? NO : [v boolValue];
}


- (IBAction)selectOlderConversation:(id)sender {
  [self evaluateJavaScript:@"MacMessenger.selectOlderConversation()"];
}


- (IBAction)reloadFromServer:(id)sender {
  NSString* url = nil;
  if (_webView.mainFrame.DOMDocument != nil &&
      [_webView.mainFrame.DOMDocument.URL hasPrefix:@"https://www.messenger.com/"])
  {
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
  
  // Safari views don't seem to want to paste anything that isn't a URL (or plain text), so if it's not one of those we try to fix that.
  NSURL *pastedFileURL = [[pasteboard readObjectsForClasses:@[[NSURL class]] options:nil] firstObject];
  
  // NOTE: if the clipboard simply contains plain text, it won't have a URL, but none of the methods in this will handle it, so it will fall through at the end just fine.
  // We can't pre-emptively check whether the pasteboard contains NSString, because this is basically always true (e.g. plain text filename)
  // Structured this way, we ONLY mess around with the pasteboard data if it contains image data with no URL (more handlers can be added later if needed)
  // Note that we need a file URL, images copied from Safari include a web URL when the user actually wants to paste the image.
  if (!(pastedFileURL != nil && [pastedFileURL isFileURL])) {
    // Image data with no URL (e.g. a screenshot or copied from somewhere)
    if ([pasteboard canReadObjectForClasses:@[[NSImage class]] options:nil]) {
      NSImage *pastedImage = [[pasteboard readObjectsForClasses:@[[NSImage class]] options:nil] firstObject];
      
      // Convert the pasteboard image to a JPEG. NSPNGFileType does not offer any compression at all, and we don't want to upload huge files.
      NSRect proposedRect = NSMakeRect(0, 0, pastedImage.size.width, pastedImage.size.height);
      CGImageRef pastedImageRef = [pastedImage CGImageForProposedRect:&proposedRect
                                                              context:NULL
                                                                hints:nil];
      NSBitmapImageRep *bitmapImageRep = [[NSBitmapImageRep alloc] initWithCGImage:pastedImageRef];
      // Save it as JPEG at near highest quality; we don't need lossless because Facebook will ruin it anyway
      NSData *JPEGImageData = [bitmapImageRep representationUsingType:NSJPEGFileType properties:@{ NSImageCompressionFactor : @0.99 }];
      
      // Save it (temporarily with a new name).
      NSString *uniqueFilename = [[NSUUID UUID].UUIDString stringByAppendingString:@".jpeg"];
      NSString *tmpPath = [NSTemporaryDirectory() stringByAppendingPathComponent:uniqueFilename];
      [JPEGImageData writeToFile:tmpPath atomically:YES];
      
      pastedFileURL = [NSURL fileURLWithPath:tmpPath];
      
      // Write our newly saved file to the pasteboard.
      [pasteboard clearContents];
      [pasteboard declareTypes:@[NSFilenamesPboardType] owner:self];
      [pasteboard writeObjects:@[pastedFileURL]];
    }
  }
  else {
    // We can't paste directories, show an error
    // TODO: in future, try silently zipping up the directory and sending that?
    NSNumber *res;
    [pastedFileURL getResourceValue:&res forKey:NSURLIsDirectoryKey error:nil];
    if ([res boolValue]) {
      NSAlert *alert = [NSAlert new];
      [alert addButtonWithTitle:@"OK"];
      [alert setMessageText:@"Could not send attachment"];
      [alert setInformativeText:@"Directories cannot be sent. Zip it up first and try again."];
      [alert setAlertStyle:NSAlertStyleWarning];
      [alert beginSheetModalForWindow:self.mainWindow completionHandler:nil];
      return;
    }
  }
  
  // forward the paste action to the webview, now that we've fixed the paste data (if needed)
  [[NSApplication sharedApplication] sendAction:@selector(paste:) to:_webView from:self];
}

- (IBAction)openMainMenu:(id)sender {
  [self evaluateJavaScript:@"MacMessenger.openMainMenu()"];
}

- (IBAction)showInbox:(id)sender {
  [self evaluateJavaScript:@"MacMessenger.showInbox()"];
}

- (IBAction)showActiveFriends:(id)sender {
  [self evaluateJavaScript:@"MacMessenger.showActiveFriends()"];
}

- (IBAction)showArchivedThreads:(id)sender {
  [self evaluateJavaScript:@"MacMessenger.showArchivedThreads()"];
}

- (IBAction)showMessageRequests:(id)sender {
  [self evaluateJavaScript:@"MacMessenger.showMessageRequests()"];
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
  [self showWebViewWindowWithID:@"about" title:[NSString stringWithFormat:@"About Messenger %@", [NSBundle mainBundle].infoDictionary[@"CFBundleVersion"]] URL:@"https://www.messenger.com/about"];
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
  if (title.length == 0) {
    title = kDefaultWindowTitle;
  }
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

// forward everything to `_webViewZoomController`
- (BOOL) canMakeTextLarger            { return _webViewZoomController.canMakeTextLarger; }
- (IBAction)makeTextLarger:(id)sender       { [_webViewZoomController makeTextLarger:sender]; }
- (BOOL) canMakeTextSmaller           { return _webViewZoomController.canMakeTextSmaller; }
- (IBAction)makeTextSmaller:(id)sender      { [_webViewZoomController makeTextSmaller:sender]; }
- (BOOL) canMakeTextStandardSize      { return _webViewZoomController.canMakeTextStandardSize; }
- (IBAction)makeTextStandardSize:(id)sender { [_webViewZoomController makeTextStandardSize:sender]; }
- (BOOL) canZoomPageIn               { return [_webViewZoomController canZoomPageIn]; }
- (IBAction)zoomPageIn:(id)sender           { [_webViewZoomController zoomPageIn:sender]; }
- (BOOL) canZoomPageOut              { return [_webViewZoomController canZoomPageOut]; }
- (IBAction)zoomPageOut:(id)sender          { [_webViewZoomController zoomPageOut:sender]; }
- (BOOL) canResetPageZoom            { return [_webViewZoomController canResetPageZoom]; }
- (IBAction)resetPageZoom:(id)sender        { [_webViewZoomController resetPageZoom:sender]; }


#pragma mark - FBMWindow callbacks

- (void)windowDidBecomeKey:(NSWindow*)w {
  if (w == _window) {
    [self evaluateJavaScript:@"try { (typeof MacMessenger != 'undefined') && MacMessenger.focusComposer(); } catch(_) {}"];
    [self evaluateJavaScript:@"try { verifyWindowActive && verifyWindowActive(); } catch(_) {}"];
  }
}

- (void)windowDidResignKey:(NSWindow*)w {
  if (w == _window) {
    // Make sure a blur event is always triggered when the window becomes inactive
    [self evaluateJavaScript:@"try { verifyWindowInactive && verifyWindowInactive(); } catch(_) {}"];
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


- (NSArray*)webView:(WebView*)sender contextMenuItemsForElement:(NSDictionary *)element defaultMenuItems:(NSArray *)defaultMenuItems {
  //NSLog(@"contextMenuItemsForElement: element = %@, menu items = %@, tags = %@", element, defaultMenuItems, [defaultMenuItems valueForKey:@"tag"]);
  
  // Filter menu items based on option key being pressed or not
  NSMutableArray *menuItems = [NSMutableArray new];
  for (NSMenuItem *menuItem in defaultMenuItems) {
    if (menuItem.isSeparatorItem && !menuItems.count) {
      // Skip separators at the very top
      // (as an effect of filtering out other items at the top of the menu)
      continue;
    }
    switch (menuItem.tag) {
      case WebMenuItemTagReload:
        continue;
      case 2024: // Inspect Element
        if (NSEvent.modifierFlags & NSAlternateKeyMask) {
          break;
        }
        continue;
    }
    [menuItems addObject:menuItem];
  }
  return ([menuItems count]) ? menuItems : nil;
}


#pragma mark - WebFrameLoadDelegate


JSValueRef JSAPI_SetMainWindowTitle(JSContextRef ctx,
                                    JSObjectRef function,
                                    JSObjectRef thisObject,
                                    size_t argc,
                                    const JSValueRef arguments[],
                                    JSValueRef* exception)
{
  if (argc > 0) {
    auto title = JSClass::NSStringFromJSValue(ctx, arguments[0]);
    if (title.length == 0) {
      title = kDefaultWindowTitle;
    }
    ((AppDelegate*)NSApp.delegate).mainWindow.title = title;
  }
  return JSValueMakeUndefined(ctx);
}


JSValueRef JSAPI_ShowMainWindowTitlebar(
    JSContextRef ctx,
    JSObjectRef fn,
    JSObjectRef obj,
    size_t argc,
    const JSValueRef argv[],
    JSValueRef* exc)
{
  BOOL animate = (argc == 0) || JSValueIsBoolean(ctx, argv[0]);
  [((FBMWindow*)((AppDelegate*)NSApp.delegate).mainWindow) showTitlebarAnimate:animate];
  return JSValueMakeUndefined(ctx);
}


JSValueRef JSAPI_HideMainWindowTitlebar(
    JSContextRef ctx,
    JSObjectRef fn,
    JSObjectRef obj,
    size_t argc,
    const JSValueRef argv[],
    JSValueRef* exc)
{
  BOOL animate = (argc == 0) || JSValueIsBoolean(ctx, argv[0]);
  [((FBMWindow*)((AppDelegate*)NSApp.delegate).mainWindow) hideTitlebarAnimate:animate];
  return JSValueMakeUndefined(ctx);
}


- (void)webView:(WebView *)webView didClearWindowObject:(WebScriptObject *)windowObject forFrame:(WebFrame *)frame {
  if (webView != _webView || frame != _webView.mainFrame || !_needsJSInjection) {
    return;
  }
  #if DEBUG
  NSLog(@"DEBUG: Setting up JS API for view:%@ frame:%@", webView, frame);
  #endif

  auto ctx = webView.mainFrame.globalContext;
  JSObjectRef globalObj = JSContextGetGlobalObject(ctx);
  
  // Make sure the titlebar is visible
  [_window showTitlebarAnimate:NO];

  // Function definition macro
  #define DefFunc(nameUTF16, impl) do { \
    auto name = U16JSStr(nameUTF16); \
    auto fun = JSObjectMakeFunctionWithCallback(ctx, name, impl); \
    JSObjectSetProperty(ctx, globalObj, name, fun, kJSPropertyAttributeReadOnly, nullptr); \
    JSStringRelease(name); \
  } while (0)
  
  DefFunc(u"SetMainWindowTitle", JSAPI_SetMainWindowTitle);
  DefFunc(u"ShowMainWindowTitlebar", JSAPI_ShowMainWindowTitlebar);
  DefFunc(u"HideMainWindowTitlebar", JSAPI_HideMainWindowTitlebar);
  
  
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
  // Note: Since OS X 10.11.3(?) localStorage persistency as implemented by this app is broken.
  // The most important feature that use, which depends on localStorage, is desktop notifications.
  // So when the app starts with an empty localStorage, we turn on notifications.
  // The user can still turn off notifications in System Preferences.
  // Eventually we will migrate to the next-gen webview WKWebView, which has stable support for
  // local storage in apps.
  [webView.mainFrame.windowObject evaluateWebScript:@""
   "if (!localStorage.getItem('_cs_desktopNotifsEnabled')) {"
   "  var v = {__t:(new Date).getTime(),__v:true};"
   "  localStorage._cs_desktopNotifsEnabled = v;"
   "  localStorage.setItem('_cs_desktopNotifsEnabled', JSON.stringify(v));"
   "  localStorage.setItem('CacheStorageVersion', '3b');"  // until we migrate to WKWebView
   "}"
   ];
  
  // JS injection. Wait for <head> to become available and then add our <script>
  if (![[NSUserDefaults standardUserDefaults] boolForKey:@"main.js/disable"]) {
    auto bundleInfo = [NSBundle mainBundle].infoDictionary;

    // Note: 10.11 introduces "App Transport Security" which blocks custom URL protocols from
    // being used in web views, and also prohibits non-HTTPS from loading in HTTPS context.
    // So, we have to inject main.js.
    auto mainJSURLString = kMainJSDataURL;

    [webView.mainFrame.windowObject evaluateWebScript:
     [NSString stringWithFormat:@""
      "window.MacMessengerVersion = '%@';"
      "window.MacMessengerGitRev = '%@';"
      "(function(){"
      "function injectMainJS() {"
      "  var pe = document.head;"
      "  if (!pe) { console.log('injectMainJS retry'); return setTimeout(injectMainJS, 10); }"
      "  var script = document.createElement('script');"
      "  script.src = '%@';"
      "  script.async = true;"
      "  pe.appendChild(script);"
      "  return true;"
      "}"
      "injectMainJS();"
      "})();",
      bundleInfo[@"CFBundleShortVersionString"],
      bundleInfo[@"GitRev"],
      mainJSURLString]
     ];
  }
  
  // Disable vertical scroll elasticity on parent webview scrollview
  webView.mainFrame.frameView.allowsScrolling = NO; // < Note: Doesn't seem to have any effect.
  webView.mainFrame.frameView.documentView.enclosingScrollView.verticalScrollElasticity = NSScrollElasticityNone;
  
  _needsJSInjection = NO;
}


- (void)webView:(WebView *)sender didCommitLoadForFrame:(WebFrame *)frame {
  // Called when the web view starts loading (NOT called if loading failed)
  _needsReload = NO;
  _webAppIsFunctional = YES;
  _needsJSInjection = YES;
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
