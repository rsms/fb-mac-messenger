//
//  Inherit from this class to build JavaScript object "classes" preprocessed by jscls
//
#pragma once
#import <JavaScriptCore/JavaScriptCore.h>
#import <string>
#import <map>


struct JSClass {
  
  // copies enumerable properties from object src to object dst as read-only properties
  static bool extendJSObject(JSContextRef ctx, JSObjectRef src, JSObjectRef dst, JSValueRef* exc);
  
#pragma mark - Helpers
  
  using ArrayVisitor = bool(^)(unsigned int i, JSValueRef v, JSValueRef* exc);
  
  // Since JSValueToObject does not set an error when failing, this does
  static JSObjectRef JSValueToJSObject(JSContextRef ctx, JSValueRef value, JSValueRef* exc=nullptr);
  
  // Visit each entry in an array. Returns false and sets exc (unless nullptr) on failure.
  static bool walkArray(JSContextRef ctx, JSValueRef arrayValue, ArrayVisitor visitor, JSValueRef* exc=nullptr);
  
  static std::u16string U16StringFromJSValue(JSContextRef ctx, JSValueRef v, JSValueRef* exc=nullptr);
  static NSString* NSStringFromJSValue(JSContextRef ctx, JSValueRef v, JSValueRef* exc=nullptr);
  static JSValueRef JSValueFromNSString(JSContextRef ctx, NSString* s);
  static JSValueRef JSValueFromU16String(JSContextRef ctx, const std::u16string&);
  
  std::u16string U16StringFromJSValue(JSValueRef v, JSValueRef* exc=nullptr) { return U16StringFromJSValue(jsctx, v, exc); }
  NSString* NSStringFromJSValue(JSValueRef v, JSValueRef* exc=nullptr) { return NSStringFromJSValue(jsctx, v, exc); }
  JSValueRef JSValueFromNSString(NSString* s) { return JSValueFromNSString(jsctx, s); }
  
  // Create JSObject from map-like objects (std::map, std::unordered_map, etc)
  template <class A, class B, typename std::enable_if<
  std::is_constructible<std::u16string, decltype(std::declval<A>()->first)>::value
  && std::is_constructible<JSValueRef, decltype(std::declval<B>()->second)>::value,
  int>::type = 0>
  JSObjectRef makeJSObject(JSPropertyAttributes attrs, A I, const B& end, JSValueRef* exc) {
    auto obj = JSObjectMake(jsctx, nullptr, nullptr);
    for (;I != end; I++) {
      auto name = JSStringCreateWithCharacters((const JSChar*)I->first.data(), I->first.size());
      JSObjectSetProperty(jsctx, obj, name, I->second, attrs, exc);
      JSStringRelease(name);
    }
    return obj;
  }

  template <class M, typename std::enable_if<
    std::is_constructible<std::u16string, decltype(std::declval<M>().begin()->first)>::value
    && std::is_constructible<JSValueRef, decltype(std::declval<M>().begin()->second)>::value,
    int>::type = 0>
  JSObjectRef makeJSObject(JSPropertyAttributes attrs, const M& m, JSValueRef* exc) {
    return makeJSObject(attrs, m.begin(), m.end(), exc);
  }

  JSObjectRef makeJSObject(JSPropertyAttributes, const std::map<std::u16string,JSValueRef>&, JSValueRef* exc);

#pragma mark - Properties
  
  static bool hasProperty(JSContextRef ctx, JSObjectRef obj, const char16_t* propname, JSValueRef* exc=nullptr);

  // Get property or throw exception if not found
  static JSValueRef getProperty(JSContextRef ctx, JSObjectRef obj, const char16_t* propname, JSValueRef* exc=nullptr);
  // Get property or returns undefined if not found
  static JSValueRef tryGetProperty(JSContextRef ctx, JSObjectRef obj, const char16_t* propname);
  static JSValueRef tryGetProperty(JSContextRef ctx, JSObjectRef obj, const std::u16string& propname);
  JSValueRef tryGetProperty(const std::u16string& propname) { return JSClass::tryGetProperty(jsctx, jsobj, propname); }

  static JSObjectRef getObjectProperty(JSContextRef ctx, JSObjectRef obj, const char16_t* propname, JSValueRef* exc=nullptr);
  
  static std::u16string getU16StringProperty(JSContextRef ctx, JSObjectRef obj, const char16_t* propname, JSValueRef* exc=nullptr);
  static NSString* getNSStringProperty(JSContextRef ctx, JSObjectRef obj, const char16_t* propname, JSValueRef* exc=nullptr);
  
  JSValueRef getProperty(JSObjectRef obj, const char16_t* propname, JSValueRef* exc=nullptr) {
    return getProperty(jsctx, obj, propname, exc);
  }
  JSValueRef getProperty(JSObjectRef obj, NSString* propname, JSValueRef* exc=nullptr); // deprecated
  JSValueRef getProperty(NSString* propname, JSValueRef* exc=nullptr) {
    return getProperty(jsobj, propname, exc);
  }
  
  JSObjectRef getObjectProperty(JSObjectRef obj, NSString* propname, JSValueRef* exc=nullptr); // deprecated
  JSObjectRef getObjectProperty(NSString* propname, JSValueRef* exc=nullptr) {
    return getObjectProperty(jsobj, propname, exc);
  }
  
  std::u16string getU16StringProperty(JSObjectRef obj, const char16_t* propname, JSValueRef* exc=nullptr) {
    return getU16StringProperty(jsctx, obj, propname, exc);
  }
  std::u16string getU16StringProperty(const char16_t* propname, JSValueRef* exc=nullptr) {
    return getU16StringProperty(jsobj, propname, exc);
  }

  NSString* getNSStringProperty(JSObjectRef obj, const char16_t* propname, JSValueRef* exc=nullptr) {
    return getNSStringProperty(jsctx, obj, propname, exc);
  }
  NSString* getNSStringProperty(JSObjectRef obj, NSString* propname, JSValueRef* exc=nullptr); // deprecated
  NSString* getNSStringProperty(NSString* propname, JSValueRef* exc=nullptr) {
    return getNSStringProperty(jsobj, propname, exc);
  }
  
  // Returns NaN if an exception was thrown
  static double getNumberProperty(JSContextRef ctx, JSObjectRef obj, const char16_t* propname, double defaultValue=0.0, JSValueRef* exc=nullptr);
  static double tryGetNumberProperty(JSContextRef ctx, JSObjectRef obj, const char16_t* propname, double defaultValue=0.0);
  
  double getNumberProperty(JSObjectRef obj, const char16_t* propname, double defaultValue=0.0, JSValueRef* exc=nullptr) {
    return getNumberProperty(jsctx, obj, propname, defaultValue, exc);
  }
  double getNumberProperty(JSObjectRef obj, NSString* propname, double defaultValue=0.0, JSValueRef* exc=nullptr);
  double getNumberProperty(NSString* propname, double defaultValue=0.0, JSValueRef* exc=nullptr) {
    return getNumberProperty(jsobj, propname, defaultValue, exc);
  }
  
  static bool setProperty(JSContextRef, JSObjectRef dst, const char16_t* propname, JSValueRef v, JSValueRef* exc=nullptr, JSPropertyAttributes attrs=kJSPropertyAttributeReadOnly);

#pragma mark - Errors
  
  static JSObjectRef createJSError(JSContextRef ctx, NSString* message);
  static JSObjectRef createJSError(JSContextRef ctx, const std::u16string& message);
  static JSObjectRef createJSError(JSContextRef ctx, const std::string& message);
  static JSObjectRef createJSError(JSContextRef ctx, const char16_t* message);
  static JSObjectRef createJSError(JSContextRef ctx, JSStringRef message);

#pragma mark - Internal

  // These values are only valid within jscall_*, jsget_* and jsset_* method calls.
  JSGlobalContextRef jsctx;
  JSObjectRef        jsobj;
};
