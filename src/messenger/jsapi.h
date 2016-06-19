#pragma once
#import <Foundation/Foundation.h>
#import <JavaScriptCore/JavaScriptCore.h>

#define U16JSStr(p) JSStringCreateWithCharacters((const JSChar*)p, std::char_traits<char16_t>::length(p))

JSObjectRef JSNotificationsCreate(JSContextRef, size_t argc, const JSValueRef argv[], JSValueRef* exc);
NSString* JSNotificationsAddNotification(JSContextRef ctx, JSObjectRef obj, JSValueRef* exc);
BOOL JSNotificationsActivateNotification(JSContextRef ctx, NSUserNotification* notif);

JSClassRef JSNotificationJSClass();
JSObjectRef JSNotificationConstruct(JSContextRef, JSObjectRef, size_t argc, const JSValueRef argv[], JSValueRef* exc);
JSObjectRef JSNotificationCreate(JSContextRef, size_t argc, const JSValueRef argv[], JSValueRef* exc);
BOOL JSNotificationDidActivate(JSContextRef ctx, JSObjectRef obj, NSUserNotification* notif);
