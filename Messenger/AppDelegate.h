#import <WebKit/WebKit.h>

@interface AppDelegate : NSObject <NSApplicationDelegate, NSUserNotificationCenterDelegate, NSWindowDelegate>

- (IBAction)checkForUpdates:(id)sender;
- (void)setActiveConversationAtIndex:(NSString *)index;

@end

