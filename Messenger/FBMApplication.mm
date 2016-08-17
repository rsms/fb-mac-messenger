#import "FBMApplication.h"
#import "AppDelegate.h"

@implementation FBMApplication

- (void)sendEvent:(NSEvent*)event {
  // Cmd-1 .. Cmd-9
  auto flags = event.modifierFlags;
  if (event.type == NSKeyDown && (flags & NSCommandKeyMask)) {
    auto chars = event.charactersIgnoringModifiers;
    if (chars.length == 1) {
      if ((flags & NSAlternateKeyMask) || (flags & NSControlKeyMask)) {
        // cmd-opt-1, cmd-ctrl-1 => show inbox
        // cmd-opt-2, cmd-ctrl-2 => show active friends
        // cmd-opt-3, cmd-ctrl-3 => show message requests
        switch ([chars characterAtIndex:0]) {
          case u'1': {
            AppDelegate* delegate = (AppDelegate*)[self delegate];
            [delegate showInbox];
            break;
          }
          case u'2': {
            AppDelegate* delegate = (AppDelegate*)[self delegate];
            [delegate showActiveFriends];
            break;
          }
          case u'3': {
            AppDelegate* delegate = (AppDelegate*)[self delegate];
            [delegate showMessageRequests];
            break;
          }
          default: {
            break;
          }
        }
      } else {
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
  }
  [super sendEvent:event];
}

@end
