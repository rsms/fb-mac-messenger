#import "JSClass.hh"


static JSStringRef kJSString_length;

static void __attribute__((constructor))_init() {
  auto p = u"length";
  kJSString_length = JSStringCreateWithCharacters((const JSChar*)p, std::char_traits<char16_t>::length(p));
}

  
// copies enumerable properties from object src to object dst as read-only properties
bool JSClass::extendJSObject(JSContextRef ctx, JSObjectRef src, JSObjectRef dst, JSValueRef* exc) {
  auto propv = JSObjectCopyPropertyNames(ctx, src);
  auto propc = JSPropertyNameArrayGetCount(propv);
  for (size_t i = 0; i != propc; ++i) {
    auto propName = JSPropertyNameArrayGetNameAtIndex(propv, i);
    auto propValue = JSObjectGetProperty(ctx, src, propName, exc);
    if (propValue == nullptr) {
      JSPropertyNameArrayRelease(propv);
      return false;
    }
    JSObjectSetProperty(ctx, dst, propName, propValue, kJSPropertyAttributeReadOnly, exc);
    if (exc != nullptr && *exc != nullptr) {
      return false;
    }
  }
  JSPropertyNameArrayRelease(propv);
  return true;
}

#pragma mark - Helpers

JSObjectRef JSClass::JSValueToJSObject(JSContextRef ctx, JSValueRef v, JSValueRef* exc) {
  auto o = JSValueToObject(ctx, v, exc);
  if (o == nullptr) {
    if (exc != nullptr) *exc = createJSError(ctx, u"value is not an object");
  }
  return o;
}

// Visit each entry in an array. Returns false and sets exc (unless nullptr) on failure.
bool JSClass::walkArray(JSContextRef ctx, JSValueRef arrayValue, ArrayVisitor visitor, JSValueRef* exc) {
  //if (!JSValueIsObject(jsctx, arrayValue)) return false;
  auto o = JSValueToJSObject(ctx, arrayValue, exc);
  if (o == nullptr) return false;
  
  auto lengthv = JSObjectGetProperty(ctx, o, kJSString_length, exc);
  if (lengthv == nullptr) return false;
  
  auto length = (unsigned int)JSValueToNumber(ctx, lengthv, exc);
  for (unsigned int i = 0; i != length; ++i) {
    JSValueRef entryv = JSObjectGetPropertyAtIndex(ctx, o, i, exc);
    if (entryv == nullptr) return false;
    if (!visitor(i, entryv, exc)) return false;
  }
  
  return true;
}

std::u16string JSClass::U16StringFromJSValue(JSContextRef ctx, JSValueRef v, JSValueRef* exc) {
  if (!JSValueIsUndefined(ctx, v) && !JSValueIsNull(ctx, v)) {
    auto s = JSValueToStringCopy(ctx, v, exc);
    if (s != nullptr) {
      std::u16string u16str{(const char16_t*)JSStringGetCharactersPtr(s), JSStringGetLength(s)};
      JSStringRelease(s);
      return u16str;
    }
  }
  return std::u16string{};
}

NSString* JSClass::NSStringFromJSValue(JSContextRef ctx, JSValueRef v, JSValueRef* exc) {
  if (JSValueIsUndefined(ctx, v) || JSValueIsNull(ctx, v)) {
    return nil;
  }
  auto s = JSValueToStringCopy(ctx, v, exc);
  if (s != nullptr) {
    NSString* nsstr = (NSString*)CFBridgingRelease(JSStringCopyCFString(kCFAllocatorDefault, s));
    JSStringRelease(s);
    return nsstr;
  }
  return nil;
}

JSValueRef JSClass::JSValueFromNSString(JSContextRef ctx, NSString* nsstr) {
  if (nsstr == nil) {
    return JSValueMakeNull(ctx);
  }
  auto s = JSStringCreateWithCFString((__bridge CFStringRef)nsstr);
  auto v = JSValueMakeString(ctx, s);
  JSStringRelease(s);
  return v;
}

JSValueRef JSClass::JSValueFromU16String(JSContextRef ctx, const std::u16string& str) {
  auto s = JSStringCreateWithCharacters((const JSChar*)str.data(), str.size());
  auto v = JSValueMakeString(ctx, s);
  JSStringRelease(s);
  return v;
}

JSObjectRef JSClass::makeJSObject(JSPropertyAttributes attrs,
    const std::map<std::u16string,JSValueRef>& m, JSValueRef* exc)
{
  return makeJSObject(attrs, m.begin(), m.end(), exc);
}



#pragma mark - Properties


bool JSClass::hasProperty(JSContextRef ctx, JSObjectRef obj, const char16_t* n, JSValueRef* exc) {
  auto s = JSStringCreateWithCharacters((const JSChar*)n, std::char_traits<char16_t>::length(n));
  auto b = JSObjectHasProperty(ctx, obj, s);
  JSStringRelease(s);
  return b;
}


JSValueRef JSClass::getProperty(JSContextRef ctx, JSObjectRef obj, const char16_t* n, JSValueRef* exc) {
  auto s = JSStringCreateWithCharacters((const JSChar*)n, std::char_traits<char16_t>::length(n));
  auto v = JSObjectGetProperty(ctx, obj, s, exc);
  JSStringRelease(s);
  if (v == nullptr || JSValueIsUndefined(ctx, v)) {
    if (exc != nullptr) *exc = createJSError(ctx, std::u16string{u"property not found: \""} + n + u"\"");
  }
  return v;
}

JSValueRef JSClass::tryGetProperty(JSContextRef ctx, JSObjectRef obj, const char16_t* n) {
  auto s = JSStringCreateWithCharacters((const JSChar*)n, std::char_traits<char16_t>::length(n));
  auto v = JSObjectGetProperty(ctx, obj, s, nullptr);
  JSStringRelease(s);
  return v;
}


JSValueRef JSClass::tryGetProperty(JSContextRef ctx, JSObjectRef obj, const std::u16string& n) {
  auto s = JSStringCreateWithCharacters((const JSChar*)n.data(), n.size());
  auto v = JSObjectGetProperty(ctx, obj, s, nullptr);
  JSStringRelease(s);
  return v;
}


JSObjectRef JSClass::getObjectProperty(JSContextRef ctx, JSObjectRef obj, const char16_t* propname, JSValueRef* exc) {
  auto v = getProperty(ctx, obj, propname, exc);
  return v != nullptr ? JSValueToJSObject(ctx, v, exc) : nil;
}


std::u16string JSClass::getU16StringProperty(JSContextRef ctx, JSObjectRef obj, const char16_t* propname, JSValueRef* exc) {
  auto v = getProperty(ctx, obj, propname, exc);
  return v != nullptr ? U16StringFromJSValue(ctx, v, exc) : std::u16string{};
}

NSString* JSClass::getNSStringProperty(JSContextRef ctx, JSObjectRef obj, const char16_t* propname, JSValueRef* exc) {
  auto v = getProperty(ctx, obj, propname, exc);
  return v != nullptr ? NSStringFromJSValue(ctx, v, exc) : nil;
}



JSValueRef JSClass::getProperty(JSObjectRef obj, NSString* propname, JSValueRef* exc) {
  auto s = JSStringCreateWithCFString((__bridge CFStringRef)propname);
  auto v = JSObjectGetProperty(jsctx, obj, s, exc);
  JSStringRelease(s);
  return v;
}

JSObjectRef JSClass::getObjectProperty(JSObjectRef obj, NSString* propname, JSValueRef* exc) {
  auto v = getProperty(obj, propname, exc);
  return v != nullptr ? JSValueToJSObject(jsctx, v, exc) : nil;
}

NSString* JSClass::getNSStringProperty(JSObjectRef obj, NSString* propname, JSValueRef* exc) {
  auto v = getProperty(obj, propname, exc);
  return v != nullptr ? NSStringFromJSValue(v, exc) : nil;
}

double JSClass::getNumberProperty(JSContextRef ctx, JSObjectRef obj, const char16_t* propname, double defaultValue, JSValueRef* exc) {
  auto v = getProperty(ctx, obj, propname, exc);
  if (JSValueIsNumber(ctx, v)) {
    return JSValueToNumber(ctx, v, exc);
  }
  return defaultValue;
}

double JSClass::tryGetNumberProperty(JSContextRef ctx, JSObjectRef obj, const char16_t* propname, double defaultValue) {
  auto v = tryGetProperty(ctx, obj, propname);
  if (JSValueIsNumber(ctx, v)) {
    auto n = JSValueToNumber(ctx, v, nullptr);
    if (!isnan(n)) {
      return n;
    }
  }
  return defaultValue;
}

double JSClass::getNumberProperty(JSObjectRef obj, NSString* propname, double defaultValue, JSValueRef* exc) {
  auto v = getProperty(obj, propname, exc);
  if (v != nullptr && JSValueIsNumber(jsctx, v)) {
    return JSValueToNumber(jsctx, v, exc);
  }
  return defaultValue;
}


bool JSClass::setProperty(JSContextRef ctx, JSObjectRef dst, const char16_t* n, JSValueRef v, JSValueRef* exc, JSPropertyAttributes attrs) {
  auto propname = JSStringCreateWithCharacters((const JSChar*)n, std::char_traits<char16_t>::length(n));
  JSObjectSetProperty(ctx, dst, propname, v, attrs, exc);
  JSStringRelease(propname);
  return (exc == nullptr || *exc == nullptr);
}


#pragma mark - Errors

JSObjectRef JSClass::createJSError(JSContextRef ctx, NSString* message) {
  auto s = JSStringCreateWithCFString((__bridge CFStringRef)message);
  auto err = createJSError(ctx, s);
  JSStringRelease(s);
  return err;
}

JSObjectRef JSClass::createJSError(JSContextRef ctx, const std::string& message) {
  auto s = JSStringCreateWithUTF8CString(message.c_str());
  auto err = createJSError(ctx, s);
  JSStringRelease(s);
  return err;
}

JSObjectRef JSClass::createJSError(JSContextRef ctx, const char16_t* message) {
  auto s = JSStringCreateWithCharacters(
    (const JSChar*)message,
    std::char_traits<char16_t>::length(message)
  );
  auto err = createJSError(ctx, s);
  JSStringRelease(s);
  return err;
}

JSObjectRef JSClass::createJSError(JSContextRef ctx, const std::u16string& message) {
  auto s = JSStringCreateWithCharacters((const JSChar*)message.data(), message.size());
  auto err = createJSError(ctx, s);
  JSStringRelease(s);
  return err;
}

JSObjectRef JSClass::createJSError(JSContextRef ctx, JSStringRef message) {
  auto v = JSValueMakeString(ctx, message);
  auto err = JSObjectMakeError(ctx, 1, &v, nullptr);
  assert(err != nullptr); // should only fail when out of memory, which shouldn't really happen
  return err;
}


