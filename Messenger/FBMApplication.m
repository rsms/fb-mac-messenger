#import "FBMApplication.h"
#import "AppDelegate.h"

@implementation FBMApplication

- (void)sendEvent:(NSEvent *)event {
  // Cmd-1 .. Cmd-9
  if (event.type == NSKeyDown && (event.modifierFlags & NSCommandKeyMask) && event.keyCode >= 18 && event.keyCode <= 28) {
    [((AppDelegate*)self.delegate) setActiveConversationAtIndex:event.characters];
    return;
  }
  
  [super sendEvent:event];
}

@end
