//
//  NSImage+RoundCorner.h
//  Round Corner Image
//
//  Created by Venj Chu on 11/08/20.
//  Copyright 2011年 Home. All rights reserved.
//

#import <Foundation/Foundation.h>
/* C Prototypes */
void addRoundedRectToPath(CGContextRef context, CGRect rect, float ovalWidth, float ovalHeight);

@interface NSImage(RoundCorner)
- (NSImage *)roundCornersImageCornerRadius:(NSInteger)radius;
@end
