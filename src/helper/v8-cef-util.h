#pragma once
#include "include/cef_v8.h"

// Converts between CEF IPC data and JavaScript data
CefRefPtr<CefValue> V8ValueToCefValue(const CefRefPtr<CefV8Value>&);
CefRefPtr<CefV8Value> CefValueToV8Value(const CefRefPtr<CefValue>&);
