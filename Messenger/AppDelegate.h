#import <WebKit/WebKit.h>

@interface AppDelegate : NSObject <NSApplicationDelegate, NSUserNotificationCenterDelegate, NSWindowDelegate>

- (IBAction)checkForUpdates:(id)sender;
- (void)setActiveConversationAtIndex:(NSString *)index;
- (BOOL)canSelectNewerConversation;
- (IBAction)selectNewerConversation:(id)sender;
- (BOOL)canSelectOlderConversation;
- (IBAction)selectOlderConversation:(id)sender;

@end

