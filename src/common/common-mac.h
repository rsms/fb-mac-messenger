#pragma once

#if defined(__OBJC__)

// include common.h instead of this file
#include <Cocoa/Cocoa.h>

static inline NSString* NSStringFromCefString(const CefString& s) {
  return [[NSString alloc] initWithCharacters:(unichar*)s.c_str() length:s.size()]; // copy
}

CefString CefStringFromNSString(NSString*);
string16 string16FromNSString(NSString*);


#endif /* defined(__OBJC__) */
