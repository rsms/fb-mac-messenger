#import "FBMApplication.h"
#import "AppDelegate.h"

@implementation FBMApplication

- (void)sendEvent:(NSEvent *)event {
  // Cmd-1 .. Cmd-9
  if (event.type == NSKeyDown && (event.modifierFlags & NSCommandKeyMask) && event.keyCode >= 18 && event.keyCode <= 28) {
    [((AppDelegate*)self.delegate) setActiveConversationAtIndex:event.characters];
    return;
  }
  
  // Ctrl + Tab
    if (event.type == NSKeyDown && (event.modifierFlags & NSControlKeyMask) && event.keyCode == 48) {
        if (event.modifierFlags & NSShiftKeyMask) {
            // Shift also pressed -> backwards
            NSInteger newIndex = ((AppDelegate*)self.delegate).activeConversationIndex;
            if (newIndex > 0) {
                newIndex--;
            }
            [((AppDelegate*)self.delegate) setActiveConversationAtIndex: [NSString stringWithFormat:@"%ld", (long)newIndex]];
        } else {
            // Shift not pressed -> forwards
            NSInteger newIndex = ((AppDelegate*)self.delegate).activeConversationIndex + 1;
            [((AppDelegate*)self.delegate) setActiveConversationAtIndex: [NSString stringWithFormat:@"%ld", (long)newIndex]];
        }
    }
    
  [super sendEvent:event];
}

@end
