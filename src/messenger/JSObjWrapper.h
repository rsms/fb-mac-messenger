#import <JavaScriptCore/JavaScriptCore.h>

@interface JSObjWrapper : NSObject
@property (readonly, nonatomic) JSContextRef jsctx;
@property (readonly, nonatomic) JSObjectRef jsobj;
- (instancetype)initWithJSContext:(JSContextRef)ctx object:(JSObjectRef)obj;
@end
