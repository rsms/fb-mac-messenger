//
//  MMFakeDragInfo.m
//  Messenger
//
//  Created by Adam Bell on 5/11/15.
//  Copyright (c) 2015 Rsms. All rights reserved.
//

#import "MMFakeDragInfo.h"

@implementation MMFakeDragInfo

- (instancetype)initWithImage:(NSImage *)image pasteboard:(NSPasteboard *)pasteboard
{
  self = [super init];
  if (self != nil) {
    _image = image;
    _pasteboard = pasteboard;
  }

  return self;
}

- (NSWindow *)draggingDestinationWindow
{
  return [NSApplication sharedApplication].keyWindow;
}

- (NSDragOperation)draggingSourceOperationMask
{
  return NSDragOperationCopy;
}

- (NSPoint)draggingLocation
{
  NSRect windowBounds = [NSApplication sharedApplication].keyWindow.frame;
  return NSMakePoint(windowBounds.size.width - 100, windowBounds.size.height - 40);
}

- (NSPoint)draggedImageLocation
{
  NSRect windowBounds = [NSApplication sharedApplication].keyWindow.frame;
  return NSMakePoint(windowBounds.size.width - 100, windowBounds.size.height - 40);
}

- (NSImage *)draggedImage
{
  return _image;
}

- (NSPasteboard *)draggingPasteboard
{
  return _pasteboard;
}

- (id)draggingSource
{
  return nil;
}

- (NSInteger)draggingSequenceNumber
{
  return 0;
}

- (NSArray *)namesOfPromisedFilesDroppedAtDestination:(NSURL *)dropDestination
{
  return @[@"test.image.png"];
}

#pragma mark - Unimplemented
- (void)slideDraggedImageTo:(NSPoint)screenPoint {}
- (void)enumerateDraggingItemsWithOptions:(NSDraggingItemEnumerationOptions)enumOpts forView:(NSView *)view classes:(NSArray *)classArray searchOptions:(NSDictionary *)searchOptions usingBlock:(void (^)(NSDraggingItem *draggingItem, NSInteger idx, BOOL *stop))block NS_AVAILABLE_MAC(10_7) {}

@end
