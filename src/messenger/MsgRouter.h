#pragma once
#include "common.h"
#include "include/cef_process_message.h"
#include "include/cef_browser.h"
#include <map>
#include <functional>

struct MsgRouter;


struct MsgPromise : public CefBase {
  struct Val;

  void resolve() const; // void result
  void resolve(bool) const;
  void resolve(int) const;
  void resolve(double) const;
  void resolve(const CefString&) const;
  void resolve(CefRefPtr<CefListValue>) const;
  void resolve(CefRefPtr<CefDictionaryValue>) const;
  void resolve(CefRefPtr<CefValue>) const;
  void resolvev(std::initializer_list<Val>) const; // builds a CefListValue

  // Fail the promise with error message
  void reject(const CefString& error) const;
  
  // A promise is ==true && !=nullptr when it can be resolved.
  operator bool() const { return _b != nullptr; }
  bool operator==(bool v) const { return v == bool(*this); }
  bool operator!=(bool v) const { return v != bool(*this); }
  bool operator==(std::nullptr_t) const { return !_b; }
  bool operator!=(std::nullptr_t) const { return !!_b; }

private:
  friend struct MsgRouter;
  MsgPromise(CefRefPtr<CefBrowser> b, int32 msgid) : _b{b}, _msgid{msgid} {}

  CefRefPtr<CefBrowser> _b;
  int32                 _msgid;

public:
  struct Val {
    Val() : val(CefValue::Create()) {}
    Val(bool v) : Val() { val->SetBool(v); }
    Val(int v) : Val() { val->SetInt(v); }
    Val(double v) : Val() { val->SetDouble(v); }
    Val(const char* v) : Val() { val->SetString(v); }
    Val(const CefString& v) : Val() { val->SetString(v); }
    CefRefPtr<CefValue> val;
  };
  
  IMPLEMENT_REFCOUNTING(MsgPromise);
};


struct MsgRouter {
  using CallHandler = std::function<void(CefRefPtr<CefListValue> args,
                                         CefRefPtr<MsgPromise>)>;
  using NotifyHandler = std::function<void(CefRefPtr<CefListValue> args)>;

  void addCall(CefString, CallHandler);
  template <size_t N> inline void addCall(const char16_t (&s)[N], CallHandler h) {
    addCall(CefStr<N>(s), h); }
  
  void addNotify(CefString, NotifyHandler);
  template <size_t N> inline void addNotify(const char16_t (&s)[N], NotifyHandler h) {
    addNotify(CefStr<N>(s), h); }

  bool handleMessage(CefRefPtr<CefBrowser>, CefRefPtr<CefProcessMessage>);
  
private:
  std::map<CefString, CallHandler> _calls;
  std::map<CefString, NotifyHandler> _notifs;
};
