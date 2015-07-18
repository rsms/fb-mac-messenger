#import "FBMApplication.h"
#import "AppDelegate.h"

@implementation FBMApplication

- (void)sendEvent:(NSEvent*)event {
  if (event.type == NSKeyDown && (event.modifierFlags & NSCommandKeyMask)) {
    auto chars = event.charactersIgnoringModifiers;
    if (chars.length == 1) {
      switch ([chars characterAtIndex:0]) {

        // Cmd-1 .. Cmd-9
        case u'1' ... u'9': {
          [((AppDelegate*)self.delegate) setActiveConversationAtIndex:event.characters];
          return;
        }
        
        // Cmd-k
        case 107: {
          [((AppDelegate*)self.delegate) setFocusToSearchField];
          return;
        }
        
        // Cmd-return
        case 13: {
          [((AppDelegate*)self.delegate) setActiveConversationAtIndex:@"1"];
          return;
        }
        
        default: {
          break;
        }
      }
    }
  }
  [super sendEvent:event];
}

@end
