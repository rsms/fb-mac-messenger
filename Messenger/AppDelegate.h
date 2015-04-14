#import <WebKit/WebKit.h>

@interface AppDelegate : NSObject <NSApplicationDelegate, NSUserNotificationCenterDelegate, NSWindowDelegate>

- (id)callJS:(NSString*)methodName, ...;
- (IBAction)checkForUpdates:(id)sender;

@end

