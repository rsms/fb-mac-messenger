#import <WebKit/WebKit.h>
#import <Availability.h>

int FBMOSX1010OrNewer();

@interface AppDelegate : NSObject <NSApplicationDelegate, NSUserNotificationCenterDelegate
#if __MAC_OS_X_VERSION_MAX_ALLOWED >= __MAC_10_11
// When we switched to build against the 10.11 SDK, the following interfaces
// are now protocols: (are interfaces in <=10.10)
, WebPolicyDelegate, WebFrameLoadDelegate, WebUIDelegate
#endif
>

@property (readonly, nonatomic) NSWindow* mainWindow;

- (IBAction)checkForUpdates:(id)sender;
- (void)setActiveConversationAtIndex:(NSString *)index;
- (BOOL)canSelectNewerConversation;
- (IBAction)selectNewerConversation:(id)sender;
- (BOOL)canSelectOlderConversation;
- (IBAction)selectOlderConversation:(id)sender;
- (IBAction)showActiveFriends:(id)sender;
- (IBAction)showInbox:(id)sender;
- (IBAction)showArchivedThreads:(id)sender;
- (IBAction)showMessageRequests:(id)sender;
- (IBAction)composeNewMessage:(id)sender;

- (void)windowDidBecomeKey:(NSWindow*)w;
- (void)windowDidResignKey:(NSWindow*)w;
// [self evaluateJavaScript:@"try { (typeof MacMessenger != 'undefined') && MacMessenger.focusComposer(); } catch(_) {}"];

@end

