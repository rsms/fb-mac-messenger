#import "NSImage+RoundCorner.h"
#import "jsapi.h"
#import "JSClass.hh"
#import "JSObjWrapper.h"
#import <iostream>
#import <map>


static JSStringRef kJSString_GRANTED;


static void __attribute__((constructor))_init() {
  kJSString_GRANTED = U16JSStr(u"granted");
}


struct JSNotification : JSClass {

  JSNotification() {}
  
  // Called just before JSNotification{Create,Construct} returns
  bool jsinit(size_t argc, const JSValueRef argv[], JSValueRef* exc) {
    // args: (p.title, {body: p.body, icon: p.icon, tag: p.tag})
    //NSLog(@"JSNotification.jsinit()");
    auto notif = [NSUserNotification new];
    
    notif.title = argc > 0 ? JSClass::NSStringFromJSValue(jsctx, argv[0]) : nil;
    
    NSURL* iconURL = nil;
    
    if (argc > 1) {
      auto params = JSValueToObject(jsctx, argv[1], exc);
      if (!params) {
        return nullptr;
      }

      auto bodyv = JSClass::tryGetProperty(jsctx, params, u"body");
      if (JSValueIsString(jsctx, bodyv)) {
        notif.informativeText = JSClass::NSStringFromJSValue(jsctx, bodyv, exc);
        if (notif.informativeText == nullptr) {
          return nullptr;
        }
      }
      
      auto iconv = JSClass::tryGetProperty(jsctx, params, u"icon");
      if (JSValueIsString(jsctx, bodyv)) {
        auto icons = JSClass::NSStringFromJSValue(jsctx, iconv, exc);
        if (icons != nullptr) {
          iconURL = [NSURL URLWithString:icons];
        }
      }
    }

    notif.userInfo = @{@"isJSNotification": @(YES)};
    notif.identifier = JSNotificationsAddNotification(jsctx, jsobj, exc);

    if (iconURL != nullptr) {
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

    return true;
  }
  
  //.onclick = p.onClick;
  //.onclose = function() {};
  
  JSValueRef jsget_permission(JSValueRef* exc) {
    return JSValueMakeString(jsctx, kJSString_GRANTED);
  }
  
  JSValueRef jscall_requestPermission(size_t argc, const JSValueRef argv[], JSValueRef* exc) {
    //NSLog(@"JSNotification.requestPermission()");
    return JSValueMakeUndefined(jsctx);
  }

  JSValueRef jscall_close(size_t argc, const JSValueRef argv[], JSValueRef* exc) {
    //NSLog(@"JSNotification.close()");
    // TODO implementation
    return JSValueMakeUndefined(jsctx);
  }
  
  
  BOOL didActivate(NSUserNotification* notif) {
    //NSLog(@"JSNotification.didActivate()");
    auto v = tryGetProperty(jsctx, jsobj, u"onclick");
    if (v == nullptr || !JSValueIsObject(jsctx, v)) {
      v = tryGetProperty(jsctx, jsobj, u"onClick");
      if (v == nullptr || !JSValueIsObject(jsctx, v)) {
        return NO;
      }
    }
    auto o = JSValueToObject(jsctx, v, nullptr);
    if (o == nullptr) { return NO; }
    auto rv = JSObjectCallAsFunction(jsctx, o, jsobj, 0, nullptr, nullptr);
    return rv != nullptr;
  }

};


static JSNotification* _JSNotificationGet(JSContextRef ctx, JSObjectRef obj, JSValueRef* exc) {
  auto p = (JSNotification*)JSObjectGetPrivate(obj);
  if (p == nullptr && exc != nullptr) {
    *exc = JSClass::createJSError(ctx, u"method called on unexpected \"this\" object");
  }
  return p;
}


BOOL JSNotificationDidActivate(JSContextRef ctx, JSObjectRef obj, NSUserNotification* notif) {
  auto p = _JSNotificationGet(ctx, obj, nullptr);
  if (p == nullptr) { return NO; }
  return p->didActivate(notif);
}

