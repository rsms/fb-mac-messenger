#import "App.h"
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
#import "MMFakeDragInfo.h"
#import "FBMWindow.h"

extern NSString* kMainJSDataURL; // implemented in generated file MainJSDataURL.m

#define USE_BLURRY_BACKGROUND 0

static BOOL kCFIsOSX_10_10_orNewer;

static void __attribute__((constructor))_init() {
  kCFIsOSX_10_10_orNewer = floor(kCFCoreFoundationVersionNumber) > kCFCoreFoundationVersionNumber10_9;
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


@implementation AppDelegate


- (NSApplicationTerminateReply)applicationShouldTerminate:(NSApplication*)sender {
  return NSTerminateNow;
}


- (BOOL)applicationShouldHandleReopen:(NSApplication *)sender hasVisibleWindows:(BOOL)hasVisibleWindows {
  if (!hasVisibleWindows) {
    App.activateApp();
  }
  return YES;
}



- (void)applicationDidFinishLaunching:(NSNotification*)notification {
  // Register ourselves as the default-user-notification center delegate
  [NSUserNotificationCenter defaultUserNotificationCenter].delegate = self;

  // Register user defaults
  auto ud = [NSUserDefaults standardUserDefaults];
  [ud registerDefaults:@{@"WebContinuousSpellCheckingEnabled": @YES}];
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
  return NO;
}

- (IBAction)selectNewerConversation:(id)sender {
}

- (BOOL)canSelectOlderConversation {
  return NO;
}

- (IBAction)selectOlderConversation:(id)sender {
}

- (void)setActiveConversationAtIndex:(NSString*)index {
}

- (IBAction)reloadFromServer:(id)sender {
}

- (IBAction)findPeopleAndGroups:(id)sender {
}

- (IBAction)openNewWindow:(id)sender {
  App.openNewMessengerWindow()->showAndMakeKey();
}

- (IBAction)composeNewMessage:(id)sender {
}

- (IBAction)checkForUpdates:(id)sender {
}

- (IBAction)showPreferences:(id)sender {
}

- (IBAction)showAppHelp:(id)sender {
}

- (IBAction)showAbout:(id)sender {
}

- (IBAction)logOut:(id)sender {
}

- (IBAction)showTerms:(id)sender {
}

- (IBAction)showPrivacyPolicy:(id)sender {
}

- (IBAction)showMessageRequests:(id)sender {
}

- (IBAction)paste:(id)sender {
}

- (IBAction)toggleFullscreen:(id)sender {
}


#pragma mark - Zooming the view

- (BOOL)canZoomPageIn { return App.keyWindow() != nullptr; }
- (IBAction)zoomPageIn:(id)sender {
  auto win = App.keyWindow();
  if (win != nullptr) {
    win->zoomIn();
  }
}

- (BOOL)canZoomPageOut {  return App.keyWindow() != nullptr; }
- (IBAction)zoomPageOut:(id)sender {
  auto win = App.keyWindow();
  if (win != nullptr) {
    win->zoomOut();
  }
}

- (BOOL)canResetPageZoom {
  auto win = App.keyWindow();
  return win != nullptr && win->getZoom() != 0;
}
- (IBAction)resetPageZoom:(id)sender {
  auto win = App.keyWindow();
  if (win != nullptr) {
    win->resetZoom();
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
}


@end
