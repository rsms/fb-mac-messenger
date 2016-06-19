#include "common.h"

CefString CefStringFromNSString(NSString* s) {
  auto str = (__bridge CFStringRef)s;
  UniChar* buf = nullptr;
  CFIndex len = CFStringGetLength(str);
  const UniChar* chars = CFStringGetCharactersPtr(str);
  
  if (chars == NULL) {
    buf = (UniChar*)malloc(len * sizeof(UniChar));
    CFStringGetCharacters(str, CFRangeMake(0, len), buf);
    chars = buf;
  }
  
  CefString cefstr(chars, len, /*copy=*/true);
  
  if (buf != nullptr) {
    free(buf);
  }
  
  return cefstr;
}


string16 string16FromNSString(NSString* s) {
  auto str = (__bridge CFStringRef)s;
  UniChar* buf = nullptr;
  CFIndex len = CFStringGetLength(str);
  const UniChar* chars = CFStringGetCharactersPtr(str);
  
  if (chars) {
    return string16((const char16*)chars, len);
  }

  string16 str16;
  str16.reserve(len);
  str16.resize(len);

  buf = (UniChar*)malloc(len * sizeof(UniChar));
  CFStringGetCharacters(str, CFRangeMake(0, len), (UniChar*)str16.data());

  return str16;
}
