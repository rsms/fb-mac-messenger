#import "jsapi.h"
#import "JSClass.hh"
#import "JSObjWrapper.h"
#import <iostream>
#import <map>


// Note: "user notifications" in OS X can be activated at any point in time, even across app launches.
// We don't support "across app launches" (because Messenger associates a javascript onclick function
// with notifications.)

// Note: NSUserNotifcation can not be extended and it is actually serialized and is not just residing
// in memory. Therefore we maintain a dictionary of notification identifiers => javascript objects,
// where the javascript object is a window.Notification object (JSNotification.)


struct JSNotifications : JSClass {

  JSNotifications() {
    _notifs = [NSMutableDictionary new];
  }
  
  
  NSString* addNotification(JSObjectRef obj, JSValueRef* exc) {
    //NSLog(@"JSNotifications.addNotification()");
    auto jsobjwrapper = [[JSObjWrapper alloc] initWithJSContext:jsctx object:obj];
    auto identifier = [NSString stringWithFormat:@"n%f", [NSDate date].timeIntervalSinceReferenceDate];
    _notifs[identifier] = jsobjwrapper;
    return identifier;
  }
  
  
  BOOL activateNotification(NSUserNotification* notif) {
    //NSLog(@"JSNotifications.activateNotification()");
    JSObjWrapper* ow = _notifs[notif.identifier];
    if (ow == nil) { return NO; }
    assert([ow isKindOfClass:[JSObjWrapper class]]);
    return JSNotificationDidActivate(ow.jsctx, ow.jsobj, notif);
  }
  
  
  NSMutableDictionary* _notifs;

};


static JSNotifications* _JSNotificationsGet(JSContextRef ctx, JSValueRef* exc) {
  auto globalObj = JSContextGetGlobalObject(ctx);
  assert(globalObj != nullptr);
  auto v = JSClass::getProperty(ctx, globalObj, u"_notifications", exc);
  if (v == nullptr){
    return nullptr;
  }
  auto obj = JSValueToObject(ctx, v, exc);
  if (obj == nullptr) {
    return nullptr;
  }
  auto p = (JSNotifications*)JSObjectGetPrivate(obj);
  if (p == nullptr) {
    if (exc != nullptr) {
      *exc = JSClass::createJSError(ctx, u"method called on unexpected \"this\" object");
    }
  }
  return p;
}


NSString* JSNotificationsAddNotification(JSContextRef ctx, JSObjectRef obj, JSValueRef* exc) {
  auto notifs = _JSNotificationsGet(ctx, exc);
  if (!notifs) {
    return nullptr;
  }
  return notifs->addNotification(obj, exc);
}


BOOL JSNotificationsActivateNotification(JSContextRef ctx, NSUserNotification* notif) {
  //NSLog(@"JSNotificationsActivateNotification()");
  auto n = _JSNotificationsGet(ctx, nullptr);
  return (n != nullptr) ? n->activateNotification(notif) : NO;
}

