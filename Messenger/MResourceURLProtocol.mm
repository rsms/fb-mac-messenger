#import "MResourceURLProtocol.h"
#import <CoreServices/CoreServices.h>

@implementation MResourceURLProtocol


+ (BOOL)canInitWithRequest:(NSURLRequest*)request {
  if (request.URL.scheme != nil && [request.URL.scheme caseInsensitiveCompare:@"resource"] == NSOrderedSame) {
    return YES;
  }
  return NO;
}


+ (NSURLRequest*)canonicalRequestForRequest:(NSURLRequest*)theRequest {
  return theRequest;
}


static NSString* MIMETypeForFilename(NSString* filename){
  auto ext = (__bridge CFStringRef)filename.pathExtension;
  auto uti = UTTypeCreatePreferredIdentifierForTag(kUTTagClassFilenameExtension, ext, NULL);
  CFStringRef MIMEType = UTTypeCopyPreferredTagWithClass(uti, kUTTagClassMIMEType);
  CFRelease(uti);
  return (__bridge_transfer NSString*)MIMEType;
}


// var s = document.createElement('script'); s.src = 'resource://bundle/main.js'; document.head.appendChild(s);


- (void)startLoading {
  //NSLog(@"startLoading %@", self.request.URL.path ? self.request.URL.path : self.request.URL.description);
  
  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
    auto path = self.request.URL.path;
    path = [[path stringByReplacingOccurrencesOfString:@"../" withString:@""] stringByTrimmingCharactersInSet:[NSCharacterSet characterSetWithCharactersInString:@"/"]];
    if (path.length == 0) {
      dispatch_async(dispatch_get_main_queue(), ^{
        [self.client URLProtocol:self didFailWithError:[NSError errorWithDomain:@"messenger" code:0 userInfo:@{NSLocalizedDescriptionKey: @"no resource path specified"}]];
      });
      return;
    }

    auto host = self.request.URL.host;
    if ([host isEqualToString:@"bundle"]) {
      path = [[NSBundle mainBundle].resourcePath stringByAppendingFormat:@"/%@", path];
    } else {
      dispatch_async(dispatch_get_main_queue(), ^{
        [self.client URLProtocol:self didFailWithError:[NSError errorWithDomain:@"messenger" code:0 userInfo:@{NSLocalizedDescriptionKey: [NSString stringWithFormat:@"unknown domain \"%@\"", host]}]];
      });
      return;
    }

    NSError* error = nil;
    auto data = [NSData dataWithContentsOfFile:path options:NSDataReadingMappedIfSafe error:&error];
    if (data == nil) {
      dispatch_async(dispatch_get_main_queue(), ^{
        [self.client URLProtocol:self didFailWithError:[NSError errorWithDomain:@"messenger" code:0 userInfo:@{NSLocalizedDescriptionKey: error.localizedDescription}]];
      });
      return;
    }
    
    auto client = self.client;
    auto mimeType = MIMETypeForFilename(path);
    if (mimeType == nil) {
      mimeType = @"application/octet-stream";
    }
    auto response = [[NSURLResponse alloc] initWithURL:self.request.URL MIMEType:mimeType expectedContentLength:data.length textEncodingName:nil];
    dispatch_async(dispatch_get_main_queue(), ^{
      [client URLProtocol:self didReceiveResponse:response cacheStoragePolicy:NSURLCacheStorageAllowedInMemoryOnly];
      [client URLProtocol:self didLoadData:data];
      [client URLProtocolDidFinishLoading:self];
    });
  });
}


- (void)stopLoading {
  // Note: This method _must_ be implemented, even if it does nothing, or web views will hang and
  // get all weird and shit.
  //  NSLog(@"request cancelled. stop loading the response, if possible");
  //  [self.client URLProtocol:self didFailWithError:[NSError errorWithDomain:@"URLProtocol" code:1 userInfo:nil]];
  [self.client URLProtocolDidFinishLoading:self];
}

@end


__attribute__((constructor)) static void init() {
  [NSURLProtocol registerClass:[MResourceURLProtocol class]];
}
