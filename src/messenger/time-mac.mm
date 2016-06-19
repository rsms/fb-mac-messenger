#import "time.h"
#import <CoreFoundation/CFDate.h>

Timestamp TimeNow() {
  return uint64(floor((CFAbsoluteTimeGetCurrent() +
                       kCFAbsoluteTimeIntervalSince1970) * 1000.0));
}
