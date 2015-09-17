#import <WebKit/WebKit.h>
#import <Availability.h>

@interface AppDelegate : NSObject <NSApplicationDelegate, NSUserNotificationCenterDelegate, NSWindowDelegate
#if __MAC_OS_X_VERSION_MAX_ALLOWED >= __MAC_10_11
// When we switched to build against the 10.11 SDK, the following interfaces
// are now protocols: (are interfaces in <=10.10)
, WebPolicyDelegate, WebFrameLoadDelegate, WebUIDelegate
#endif
>

- (IBAction)checkForUpdates:(id)sender;
- (void)setActiveConversationAtIndex:(NSString *)index;
- (BOOL)canSelectNewerConversation;
- (IBAction)selectNewerConversation:(id)sender;
- (BOOL)canSelectOlderConversation;
- (IBAction)selectOlderConversation:(id)sender;

@end

