//
//  MMFakeDragInfo.h
//  Messenger
//
//  Created by Adam Bell on 5/11/15.
//  Copyright (c) 2015 Rsms. All rights reserved.
//

#import <AppKit/AppKit.h>

//! @abstract Defines a completely fake and hardcoded / useless session about dragging an image on a pasteboard.
@interface MMFakeDragInfo : NSObject <NSDraggingInfo>

- (instancetype)initWithImage:(NSImage *)image pasteboard:(NSPasteboard *)pasteboard;

@property (nonatomic, strong) NSImage *image;
@property (nonatomic, strong) NSPasteboard *pasteboard;

@property NSDraggingFormation draggingFormation;
@property BOOL animatesToDestination;
@property NSInteger numberOfValidItemsForDrop;

@end
