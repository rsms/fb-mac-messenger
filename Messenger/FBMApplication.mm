#import "FBMApplication.h"
#import "AppDelegate.h"

@implementation FBMApplication

- (void)sendEvent:(NSEvent*)event {
  // Cmd-1 .. Cmd-9
  if (event.type == NSKeyDown && (event.modifierFlags & NSCommandKeyMask)) {
    auto chars = event.charactersIgnoringModifiers;
    if (chars.length == 1) {
      switch ([chars characterAtIndex:0]) {
        case u'1' ... u'9': {
          [((AppDelegate*)self.delegate) setActiveConversationAtIndex:event.characters];
          return;
        }
        case u']': {
          AppDelegate* delegate = (AppDelegate*)[self delegate];
          if ([delegate canSelectOlderConversation]) {
            [delegate selectOlderConversation:self];
            return;
          }
          break;
        }
        case u'[': {
          AppDelegate* delegate = (AppDelegate*)[self delegate];
          if ([delegate canSelectNewerConversation]) {
            [delegate selectNewerConversation:self];
            return;
          }
          break;
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
