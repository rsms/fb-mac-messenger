//
//  WebViewZoomController.h
//  Messenger
//
//  Created by Maciej Konieczny on 12/11/15.
//  Copyright © 2015 Rsms. All rights reserved.
//

#import <Foundation/Foundation.h>

@class WebView;


@interface WebViewZoomController : NSObject

- (instancetype)initWithWebView:(WebView *)webView;


#pragma mark - WebView Proxy API

- (BOOL)canMakeTextLarger;
- (IBAction)makeTextLarger:(id)sender;

- (BOOL)canMakeTextSmaller;
- (IBAction)makeTextSmaller:(id)sender;

- (BOOL)canMakeTextStandardSize;
- (IBAction)makeTextStandardSize:(id)sender;


- (BOOL)canZoomPageIn;
- (IBAction)zoomPageIn:(id)sender;

- (BOOL)canZoomPageOut;
- (IBAction)zoomPageOut:(id)sender;

- (BOOL)canResetPageZoom;
- (IBAction)resetPageZoom:(id)sender;

@end
