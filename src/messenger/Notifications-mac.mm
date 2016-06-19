#import "Notifications.h"
#import "NSImage+RoundCorner.h"
#include "include/wrapper/cef_helpers.h"


void Notification::schedule() const {
  CEF_REQUIRE_UI_THREAD();

  auto notif = [NSUserNotification new];
  
  auto ident = NSStringFromCefString(_tag);
  notif.identifier = ident;

  notif.title = _title.empty() ? nil : NSStringFromCefString(_title);
  notif.informativeText = _body.empty() ? nil : NSStringFromCefString(_body);
  notif.soundName = NSUserNotificationDefaultSoundName;
  notif.userInfo = @{@"cef": @(YES)};
  
  NSURL* iconURL = nil;
  if (!_iconURL.empty()) {
    iconURL = [NSURL URLWithString:NSStringFromCefString(_iconURL)];
  }
  // Note: a malformed url string yields nil, so we need to check iconURL again
  if (iconURL) {
    // TODO: support data URLs
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
      NSImage *contentImage = [[NSImage alloc] initWithContentsOfURL:iconURL];
      notif.contentImage = [contentImage roundedImage];
      dispatch_async(dispatch_get_main_queue(), ^{
        [[NSUserNotificationCenter defaultUserNotificationCenter] scheduleNotification:notif];
      });
    });
  } else {
    [[NSUserNotificationCenter defaultUserNotificationCenter] scheduleNotification:notif];
  }
}


bool Notifications::remove(const CefString& tagstr) {
  auto nc = [NSUserNotificationCenter defaultUserNotificationCenter];
  auto tag = NSStringFromCefString(tagstr);
  for (NSUserNotification* n in nc.deliveredNotifications) {
    if ([n.identifier isEqualToString:tag]) {
      [nc removeDeliveredNotification:n];
      return true;
    }
  }
  for (NSUserNotification* n in nc.scheduledNotifications) {
    if ([n.identifier isEqualToString:tag]) {
      [nc removeScheduledNotification:n];
      return true;
    }
  }
  return false;
}


//void Notifications::clearAnonymous() {
//  auto nc = [NSUserNotificationCenter defaultUserNotificationCenter];
//}

