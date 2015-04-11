#import <WebKit/WebKit.h>

@interface AppDelegate : NSObject <NSApplicationDelegate, NSUserNotificationCenterDelegate, NSWindowDelegate>

- (id)callJS:(NSString*)methodName, ... NS_REQUIRES_NIL_TERMINATION;
- (IBAction)checkForUpdates:(id)sender;

@end

