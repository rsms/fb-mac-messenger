#include "helper-app.h"
#include "include/cef_app.h"

// Entry point function for sub-processes.
int main(int argc, char* argv[]) {
  // Provide CEF with command-line arguments.
  CefMainArgs main_args(argc, argv);

  auto app = new HelperApp();

  return CefExecuteProcess(main_args, app, nullptr);
}
