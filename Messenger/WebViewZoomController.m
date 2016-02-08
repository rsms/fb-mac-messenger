#import "WebViewZoomController.h"
#import "WebViewPrivate.h"


static NSString * const textKey = @"WebViewZoomController textSizeLevel";
static NSString * const zoomKey = @"WebViewZoomController zoomLevel";


@interface WebViewZoomController ()

@property (nonatomic, weak) WebView *webView;
@property (nonatomic, strong) NSUserDefaults *userDefaults;

@property (nonatomic) NSInteger textSizeLevel;
@property (nonatomic) NSInteger zoomLevel;

@end


@implementation WebViewZoomController

#pragma mark - Lifecycle

- (instancetype)initWithWebView:(WebView *)webView userDefaults:(NSUserDefaults *)userDefaults {
  self = [super init];
  if (self) {
    _webView = webView;
    _userDefaults = userDefaults;
  }

  return self;
}


#pragma mark - Zoom API

- (void)restoreSavedZoomLevels {
  NSInteger textSizeLevelDelta = self.textSizeLevel;
  NSInteger zoomLevelDelta = self.zoomLevel;

  id sender = nil;
  [self resetPageZoom:sender];
  

  while (self.canMakeTextSmaller && textSizeLevelDelta < 0) {
    [self makeTextSmaller:sender];
    textSizeLevelDelta += 1;
  }

  while (self.canMakeTextLarger && textSizeLevelDelta > 0) {
    [self makeTextLarger:sender];
    textSizeLevelDelta -= 1;
  }


  while (self.canZoomPageOut && zoomLevelDelta < 0) {
    [self zoomPageOut:sender];
    zoomLevelDelta += 1;
  }

  while (self.canZoomPageIn && zoomLevelDelta > 0) {
    [self zoomPageIn:sender];
    zoomLevelDelta -= 1;
  }

}

- (NSInteger)textSizeLevel {
  return [self.userDefaults integerForKey:textKey];
}

- (void)setTextSizeLevel:(NSInteger)textSizeLevel {
  [self.userDefaults setInteger:textSizeLevel forKey:textKey];
}

- (NSInteger)zoomLevel {
  return [self.userDefaults integerForKey:zoomKey];
}

- (void)setZoomLevel:(NSInteger)zoomLevel {
  [self.userDefaults setInteger:zoomLevel forKey:zoomKey];
}


#pragma mark - WebView Proxy API

- (BOOL)canMakeTextLarger {
  return self.webView.canMakeTextLarger;
}

- (IBAction)makeTextLarger:(id)sender {
  if (self.canMakeTextLarger) {
    [self.webView makeTextLarger:sender];
    self.textSizeLevel += 1;
  }
}


- (BOOL)canMakeTextSmaller {
  return self.webView.canMakeTextSmaller;
}

- (IBAction)makeTextSmaller:(id)sender {
  if (self.canMakeTextSmaller) {
    [self.webView makeTextSmaller:sender];
    self.textSizeLevel -= 1;
  }
}


- (BOOL)canMakeTextStandardSize {
  return self.webView.canMakeTextStandardSize;
}

- (IBAction)makeTextStandardSize:(id)sender {
  if (self.canMakeTextStandardSize) {
    [self.webView makeTextStandardSize:sender];
    self.textSizeLevel = 0;
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
    self.zoomLevel += 1;
  }
}

- (BOOL)canZoomPageOut {
  return [self.webView canZoomPageOut];
}

- (IBAction)zoomPageOut:(id)sender {
  if (self.canZoomPageOut) {
    [self.webView zoomPageOut:sender];
    self.zoomLevel -= 1;
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
  self.textSizeLevel = 0;
  self.zoomLevel = 0;
}

@end
