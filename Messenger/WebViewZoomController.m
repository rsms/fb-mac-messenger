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

- (BOOL)canMakeTextLarger { return _webView.canMakeTextLarger; }
- (IBAction)makeTextLarger:(id)sender { [_webView makeTextLarger:sender]; }
- (BOOL)canMakeTextSmaller { return _webView.canMakeTextSmaller; }
- (IBAction)makeTextSmaller:(id)sender { [_webView makeTextSmaller:sender]; }
- (BOOL)canMakeTextStandardSize { return _webView.canMakeTextStandardSize; }
- (IBAction)makeTextStandardSize:(id)sender { [_webView makeTextStandardSize:sender]; }

// Warning: The following methods are internal to WebView and might change at any time
- (IBAction)zoomPageIn:(id)sender {
  [_webView zoomPageIn:sender];
  // Possible alternate way, which would require some fairly advanced layout code:
  // auto clipView = _webView.mainFrame.frameView.documentView.superview;
  // [clipView scaleUnitSquareToSize:NSMakeSize(1.1, 1.1)];
  // [clipView setNeedsDisplay:YES];
}
- (IBAction)zoomPageOut:(id)sender { [_webView zoomPageOut:sender]; }
- (BOOL)canZoomPageIn { return [_webView canZoomPageIn]; }
- (IBAction)resetPageZoom:(id)sender {
  [_webView resetPageZoom:sender];
  // We also reset text size
  [_webView makeTextStandardSize:sender];
}
- (BOOL)canZoomPageOut { return [_webView canZoomPageOut]; }
- (BOOL)canResetPageZoom { return [_webView canResetPageZoom] || [self canMakeTextStandardSize]; }

@end
