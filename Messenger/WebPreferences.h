#pragma once

@interface WebPreferences (Private)
@property (nonatomic) BOOL acceleratedCompositingEnabled;
@property (nonatomic) BOOL acceleratedDrawingEnabled;
@property (nonatomic) BOOL accelerated2dCanvasEnabled;
@property (nonatomic) BOOL showDebugBorders;
@property (nonatomic) BOOL showRepaintCounter;
@property (nonatomic) BOOL developerExtrasEnabled;
@property (nonatomic) BOOL localStorageEnabled;
@property (nonatomic) BOOL databasesEnabled;
@property (nonatomic) BOOL notificationsEnabled;
@property (nonatomic) BOOL offlineWebApplicationCacheEnabled;
@property (nonatomic) BOOL webGLEnabled;
@property (nonatomic) BOOL multithreadedWebGLEnabled;
@property (nonatomic) BOOL webAudioEnabled;
@property (nonatomic) BOOL usesEncodingDetector;
@property (nonatomic) BOOL usePreHTML5ParserQuirks;
@property (nonatomic) BOOL useLegacyTextAlignPositionedElementBehavior;
@property (nonatomic) BOOL textAreasAreResizable;
@property (nonatomic) BOOL subpixelCSSOMElementMetricsEnabled;
@property (nonatomic) BOOL mediaPlaybackRequiresUserGesture;
@property (nonatomic) BOOL mediaPlaybackAllowsInline;
@property (nonatomic, getter=isXSSAuditorEnabled) BOOL XSSAuditorEnabled;
@property (nonatomic, getter=isWebSecurityEnabled) BOOL WebSecurityEnabled;
@property (nonatomic, getter=isHixie76WebSocketProtocolEnabled) BOOL hixie76WebSocketProtocolEnabled;
@property (nonatomic, getter=isFrameFlatteningEnabled) BOOL frameFlatteningEnabled;
@property (nonatomic, getter=isDNSPrefetchingEnabled) BOOL DNSPrefetchingEnabled;
@property (nonatomic) BOOL hyperlinkAuditingEnabled;
@property (nonatomic) BOOL hiddenPageCSSAnimationSuspensionEnabled;
@property (nonatomic) BOOL hiddenPageDOMTimerThrottlingEnabled;
@property (nonatomic) BOOL fullScreenEnabled;
@property (nonatomic) BOOL diagnosticLoggingEnabled;
@property (nonatomic) BOOL cssCompositingEnabled;
@property (nonatomic) BOOL cssRegionsEnabled;
@property (nonatomic) BOOL backspaceKeyNavigationEnabled;
@property (nonatomic) BOOL asynchronousSpellCheckingEnabled;
@property (nonatomic) BOOL zoomsTextOnly;
@property (nonatomic) BOOL mockScrollbarsEnabled;
- (void)_setLocalStorageDatabasePath:(NSString*)path;
@end
