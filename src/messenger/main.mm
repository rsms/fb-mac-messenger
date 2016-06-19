#import <signal.h>

#import "App.h"
#import "AppDelegate.h"

#import "include/cef_application_mac.h"
#import "include/wrapper/cef_helpers.h"
#import "include/cef_version.h"

static void SIGPIPE_handler(int sig) {
  fprintf(stderr, "[warn] ignoring SIGPIPE\n");
}


void CefStringSetNSString(cef_string_t* target, NSString* value) {
  auto str = (__bridge CFStringRef)value;
  UniChar* buf = nullptr;
  CFIndex len = CFStringGetLength(str);
  const UniChar* chars = CFStringGetCharactersPtr(str);
  
  if (chars == NULL) {
    buf = (UniChar*)malloc(len * sizeof(UniChar));
    CFStringGetCharacters(str, CFRangeMake(0, len), buf);
    chars = buf;
  }
  
  cef_string_utf16_set(chars, len, target, /*copy=*/true);
  
  if (buf != nullptr) {
    free(buf);
  }
}


int main(int argc, char* argv[]) {
  // Provide CEF with command-line arguments.
  CefMainArgs main_args(argc, argv);
  
  // RCApp implements application-level callbacks. It will create the first
  // browser instance in OnContextInitialized() after CEF has initialized.
  AppPtr = new RCApp;
  
  // Handle SIGPIPE (re CefRunMessageLoop/cef_run_message_loop)
  signal(SIGPIPE, SIGPIPE_handler);
  
  @autoreleasepool {
    
    // Initialize the MacApp instance.
    [MacApp sharedApplication];
    
    // Specify CEF global settings here.
    CefSettings settings;

    auto bundle = [NSBundle mainBundle];
    auto homedir = NSHomeDirectory();
    auto bundleID = bundle.bundleIdentifier;
    
    // User-Agent
    NSString* bundleVersion = [bundle objectForInfoDictionaryKey:(__bridge NSString *)kCFBundleVersionKey];
    auto procInfo = [NSProcessInfo processInfo];
    auto osVersion = procInfo.operatingSystemVersion;
    auto userAgent = [NSString stringWithFormat:
      @"Mozilla/5.0 (Macintosh; Intel Mac OS X %ld_%ld_%ld) AppleWebKit/537.36 (KHTML, like Gecko) fb-mac-messenger/%@ Chrome/"
                      MAKE_STRING(CHROME_VERSION_MAJOR) "."
                      MAKE_STRING(CHROME_VERSION_MINOR) "."
                      MAKE_STRING(CHROME_VERSION_BUILD) "."
                      MAKE_STRING(CHROME_VERSION_PATCH)
                      " Safari/537.36",
                      osVersion.majorVersion,
                      osVersion.minorVersion,
                      osVersion.patchVersion,
                      bundleVersion];
    CefStringSetNSString(&settings.user_agent, userAgent);

    // Locale (note: OSX uses underscores while CEF expects minus chars)
    CefStringSetNSString(&settings.locale, [[[NSLocale currentLocale] localeIdentifier] stringByReplacingOccurrencesOfString:@"_" withString:@"-"]);

    // Helper process
    // Note: Helper app needs to live in Frameworks.
    // CEF seem to have a built-in idea of this, where when we keep the helper
    // in, say Resources, CEF creates an empty file in Frameworks with
    // the same name ("Messenger Helper") which causes signing issues.
    CefStringSetNSString(&settings.browser_subprocess_path, [bundle.privateFrameworksPath stringByAppendingString:@"/Messenger Helper.app/Contents/MacOS/Messenger Helper"]);

    // Cache path = ~/Library/Caches/<bundle-id>
    CefStringSetNSString(&settings.cache_path, [NSString stringWithFormat:@"%@/Library/Caches/%@", homedir, bundleID]);
    
    // Data path = ~/Library/Application Support/<bundle-id>
    CefStringSetNSString(&settings.user_data_path, [NSString stringWithFormat:@"%@/Library/Application Support/%@", homedir, bundleID]);
    
    // Log file = ~/Library/Logs/<bundle-id>-debug.log
    CefStringSetNSString(&settings.log_file, [NSString stringWithFormat:@"%@/Library/Logs/%@-debug.log", homedir, bundleID]);
    
    // log_severity -- Also configurable using the "log-severity" command-line switch with a value of "verbose", "info", "warning", "error", "error-report" or "disable".
    settings.log_severity = LOGSEVERITY_INFO;
    
    // TODO: When compiling CEF statically, set resources_dir_path to CEFs resources dir (probably inside app resources)
    
    settings.background_color = CefColorSetARGB(0xFF, 0xFF, 0xFF, 0xFF);

    // Remote inspector
    #if DEBUG
    settings.remote_debugging_port = 13370;
    NSLog(@"remote inspector enabled at http://localhost:13370/");
    #endif

    // Configure Mac app delegate
    auto appDelegate = [AppDelegate new];
    [[NSApplication sharedApplication] setDelegate:appDelegate];
    
    // Initialize CEF for the browser process
    CefInitialize(main_args, settings, &App, NULL);

    // Schedule "application start" on next runloop iteration
    dispatch_async(dispatch_get_main_queue(), ^{
      App.boostrapNativeApp();
      App.appStarted();
    });

    // Run the CEF message loop. This will block until CefQuitMessageLoop() is called.
    CefRunMessageLoop();
    
    // Shut down CEF.
    CefShutdown();
    
  } // autoreleasepool
  
  return 0;
}
