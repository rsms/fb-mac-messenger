//
//  WebViewZoomController.m
//  Messenger
//
//  Created by Maciej Konieczny on 12/11/15.
//  Copyright © 2015 Rsms. All rights reserved.
//

#import "WebViewZoomController.h"
#import "WebViewPrivate.h"


@interface WebViewZoomController ()

@property (nonatomic, weak) WebView *webView;

@end


@implementation WebViewZoomController

#pragma mark - Lifecycle

- (instancetype)initWithWebView:(WebView *)webView {
  self = [super init];
  if (self) {
    _webView = webView;
  }

  return self;
}


#pragma mark - WebView Proxy API

- (BOOL)canMakeTextLarger {
  return self.webView.canMakeTextLarger;
}

- (IBAction)makeTextLarger:(id)sender {
  if (self.canMakeTextLarger) {
    [self.webView makeTextLarger:sender];
  }
}


- (BOOL)canMakeTextSmaller {
  return self.webView.canMakeTextSmaller;
}

- (IBAction)makeTextSmaller:(id)sender {
  if (self.canMakeTextSmaller) {
    [self.webView makeTextSmaller:sender];
  }
}


- (BOOL)canMakeTextStandardSize {
  return self.webView.canMakeTextStandardSize;
}

- (IBAction)makeTextStandardSize:(id)sender {
  if (self.canMakeTextStandardSize) {
    [self.webView makeTextStandardSize:sender];
  }
}


// Warning: The following methods are internal to WebView and might change at any time

- (BOOL)canZoomPageIn {
  return [self.webView canZoomPageIn];
}

- (IBAction)zoomPageIn:(id)sender {
  // Possible alternate way, which would require some fairly advanced layout code:
  // auto clipView = self.webView.mainFrame.frameView.documentView.superview;
  // [clipView scaleUnitSquareToSize:NSMakeSize(1.1, 1.1)];
  // [clipView setNeedsDisplay:YES];

  if (self.canZoomPageIn) {
    [self.webView zoomPageIn:sender];
  }
}

- (BOOL)canZoomPageOut {
  return [self.webView canZoomPageOut];
}

- (IBAction)zoomPageOut:(id)sender {
  if (self.canZoomPageOut) {
    [self.webView zoomPageOut:sender];
  }
}


- (BOOL)canResetPageZoom {
  return [self.webView canResetPageZoom] || [self canMakeTextStandardSize];
}

- (IBAction)resetPageZoom:(id)sender {
  // We also reset text size
  if (self.canResetPageZoom) {
    [self.webView resetPageZoom:sender];
    [self.webView makeTextStandardSize:sender];
  }
}

@end
