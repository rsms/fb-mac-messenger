#pragma once
#include "include/cef_base.h"
#include "include/cef_stream.h"

using base::string16;
using base::char16;

// Returns a CefString that references a constant UTF-16 string
template <size_t N>
inline CefString CefStr(const char16_t (&s)[N]) {
  return CefString((const char16*)s, N-1, false);
}

// Returns a CefString that owns its data, from converting UTF-8 bytes.
CefString CefStrUTF8(const char* p, size_t len);

// Read all of stream as UTF-8
CefString ReadUTF8CefStream(CefRefPtr<CefStreamReader>);


#if defined(OS_MACOSX)
#include "common-mac.h"
#endif
