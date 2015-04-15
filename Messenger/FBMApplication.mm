#import "FBMApplication.h"
#import "AppDelegate.h"
#import "virtual-key-codes.hh"

@implementation FBMApplication

- (void)sendEvent:(NSEvent *)event {
  // Cmd-1 .. Cmd-9
  using namespace VirtualKeyCodes;
  if (event.type == NSKeyDown && (event.modifierFlags & NSCommandKeyMask)) {
    switch (event.keyCode) {
      case ANSI_1: case ANSI_2: case ANSI_3: case ANSI_4: case ANSI_5: case ANSI_6: case ANSI_7: case ANSI_8: case ANSI_9: {
        [((AppDelegate*)self.delegate) setActiveConversationAtIndex:event.characters];
        return;
      }
      default: {
        break;
      }
    }
  }
  [super sendEvent:event];
}

@end
