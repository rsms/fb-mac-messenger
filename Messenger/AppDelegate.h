#import <WebKit/WebKit.h>

@interface AppDelegate : NSObject <NSApplicationDelegate, NSUserNotificationCenterDelegate, NSWindowDelegate>
// ISSUE 189: When we switch to build against the 10.11 SDK, the following interfaces
// have been converted to protocols, requiring us to specify adherence:
//  - WebPolicyDelegate
//  - WebFrameLoadDelegate
//  - WebUIDelegate

- (IBAction)checkForUpdates:(id)sender;
- (void)setActiveConversationAtIndex:(NSString *)index;
- (BOOL)canSelectNewerConversation;
- (IBAction)selectNewerConversation:(id)sender;
- (BOOL)canSelectOlderConversation;
- (IBAction)selectOlderConversation:(id)sender;

@end

