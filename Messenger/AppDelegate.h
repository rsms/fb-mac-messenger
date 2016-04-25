#import <WebKit/WebKit.h>
#import <Availability.h>

int FBMOSX1010OrNewer();

@interface AppDelegate : NSObject <NSApplicationDelegate,
                                   NSUserNotificationCenterDelegate>

- (IBAction)checkForUpdates:(id)sender;
- (void)setActiveConversationAtIndex:(NSString *)index;
- (BOOL)canSelectNewerConversation;
- (IBAction)selectNewerConversation:(id)sender;
- (BOOL)canSelectOlderConversation;
- (IBAction)selectOlderConversation:(id)sender;

@property (nonatomic, readonly) BOOL canZoomPageIn;
@property (nonatomic, readonly) BOOL canZoomPageOut;
@property (nonatomic, readonly) BOOL canResetPageZoom;

@end

