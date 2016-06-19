#include "common.h"

CefString CefStrUTF8(const char* p, size_t len) {
  #if !defined(CEF_STRING_TYPE_UTF16)
  #error "non-utf16 CefString conversion not implemented"
  #endif

  auto s = new cef_string_utf16_t;
  memset(s, 0, sizeof(cef_string_utf16_t));
  /*bool perfectConversion =*/
  cef_string_utf8_to_utf16(p, len, s);

  CefString str;
  str.Attach(s, /*owner=*/true);
  return str;
}


CefString ReadUTF8CefStream(CefRefPtr<CefStreamReader> rs) {
  size_t cap = 4096;
  char* startp = (char*)malloc(cap);
  char* endp = startp + cap;
  char* p = startp;

  while (!rs->Eof()) {
    size_t space = size_t(endp - p);
    if (space < 64) {
      cap += 4096;
      size_t offs = p - startp;
      startp = (char*)realloc((void*)startp, cap);
      p = startp + offs;
    }
    auto nread = rs->Read(p, 1, space);
    if (nread == 0) {
      break;
    }
    p += nread;
  }

  auto str = CefStrUTF8(startp, size_t(p - startp));
  free(startp);
  return str;
}
