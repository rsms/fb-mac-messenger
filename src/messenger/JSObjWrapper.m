#import "JSObjWrapper.h"

@implementation JSObjWrapper {
  JSGlobalContextRef _ctx;
  JSObjectRef        _obj;
}
- (instancetype)initWithJSContext:(JSContextRef)ctx object:(JSObjectRef)obj {
  _ctx = JSContextGetGlobalContext(ctx);
  JSValueProtect(_ctx, obj);
  _obj = obj;
  return self;
}
- (JSContextRef)jsctx {
  return _ctx;
}
- (JSObjectRef)jsobj {
  return _obj;
}
- (void)dealloc {
  JSValueUnprotect(_ctx, _obj);
}
@end