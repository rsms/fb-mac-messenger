#import "helper-app.h"
#import "include/cef_stream.h"

CefRefPtr<CefStreamReader> HelperApp::streamForAppResource(const CefString& name) {
  static base::string16 respath; // with trailing "/"
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    respath = string16FromNSString([[NSBundle mainBundle].resourcePath stringByAppendingString:@"/"]);
  });
  return CefStreamReader::CreateForFile(respath + name.ToString16());
}
