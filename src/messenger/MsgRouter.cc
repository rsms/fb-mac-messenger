#include "MsgRouter.h"

#ifdef dlog
#undef dlog
#endif
#define dlog(...) ((void)0)

static const auto kResolve = CefStr(u"Resolve");
static const auto kReject = CefStr(u"Reject");


template <typename F>
static inline void Resolve(CefRefPtr<CefBrowser> b, int32 msgid, F&& f) {
  auto msg = CefProcessMessage::Create(kResolve);
  auto args = msg->GetArgumentList();
  args->SetInt(0, msgid);
  f(args);
  b->SendProcessMessage(PID_RENDERER, msg);
}


void MsgPromise::resolve() const {
  Resolve(_b, _msgid, [&](CefRefPtr<CefListValue>){});
}

void MsgPromise::resolve(bool v) const {
  Resolve(_b, _msgid, [&](CefRefPtr<CefListValue> r){ r->SetBool(1, v); });
}

void MsgPromise::resolve(int v) const {
  Resolve(_b, _msgid, [&](CefRefPtr<CefListValue> r){ r->SetInt(1, v); });
}

void MsgPromise::resolve(double v) const {
  Resolve(_b, _msgid, [&](CefRefPtr<CefListValue> r){ r->SetDouble(1, v); });
}

void MsgPromise::resolve(const CefString& v) const {
  Resolve(_b, _msgid, [&](CefRefPtr<CefListValue> r){ r->SetString(1, v); });
}

void MsgPromise::resolve(CefRefPtr<CefListValue> v) const {
  Resolve(_b, _msgid, [&](CefRefPtr<CefListValue> r){ r->SetList(1, v); });
}

void MsgPromise::resolve(CefRefPtr<CefDictionaryValue> v) const {
  Resolve(_b, _msgid, [&](CefRefPtr<CefListValue> r){ r->SetDictionary(1, v); });
}

void MsgPromise::resolve(CefRefPtr<CefValue> v) const {
  Resolve(_b, _msgid, [&](CefRefPtr<CefListValue> r){ r->SetValue(1, v); });
}

void MsgPromise::resolvev(std::initializer_list<Val> args) const {
  auto v = CefListValue::Create();
  int index = 0;
  for (auto& arg : args) {
    v->SetValue(index++, arg.val);
  }
  Resolve(_b, _msgid, [&](CefRefPtr<CefListValue> r){ r->SetList(1, v); });
}


void MsgPromise::reject(const CefString& error) const {
  auto msg = CefProcessMessage::Create(kReject);
  msg->GetArgumentList()->SetInt(0, _msgid);
  msg->GetArgumentList()->SetString(1, error); // TODO: make error dict
  _b->SendProcessMessage(PID_RENDERER, msg);
}


void MsgRouter::addCall(CefString name, CallHandler handler) {
  #ifndef NDEBUG
  assert(_calls.emplace(name, handler).second ||!"duplicate handler");
  #else
  _calls.emplace(name, handler);
  #endif
}


void MsgRouter::addNotify(CefString name, NotifyHandler handler) {
#ifndef NDEBUG
  assert(_notifs.emplace(name, handler).second ||!"duplicate handler");
#else
  _notifs.emplace(name, handler);
#endif
}


bool MsgRouter::handleMessage(CefRefPtr<CefBrowser> b, CefRefPtr<CefProcessMessage> m) {
  dlog("handleMessage browser#%d msg name: '%s', argc: %zu",
       b->GetIdentifier(),
       m->GetName().ToString().c_str(),
       m->GetArgumentList()->GetSize());

  static CefString kCall((const char16*)u"Call", 4, false);
  static CefString kNotify((const char16*)u"Notify", 6, false);
  
  auto mname = m->GetName();
  bool isCall = mname == kCall;
  if (!isCall && mname != kNotify) {
    #ifndef NDEBUG
    dlog("handleMessage unexpected message '%s'", mname.ToString().c_str());
    #endif
    return false;
  }
  
  auto args = m->GetArgumentList();
  if (args->GetSize() < 1) {
    return false;
  }
  auto sel = args->GetString(0);
  
  // copy args, skipping the first N args
  auto args2 = CefListValue::Create();
  assert(args->GetSize() <= INT_MAX);
  auto argc = int(args->GetSize());
  int i = isCall ? 2 : 1; // Call has sel,msgid, Notify has just sel
  int i2 = 0;
  while (i < argc) {
    args2->SetValue(i2, args->GetValue(i));
    i++;
    i2++;
  }
  
  if (isCall) {
    auto msgid = args->GetInt(1);

    auto I = _calls.find(sel);
    if (I == _calls.end()) {
      MsgPromise(b, msgid).reject(CefStr(u"invalid call"));
      return false;
    }
    auto& handler = I->second;

    if (args->GetSize() < 2 || args->GetType(1) != VTYPE_INT) {
      fprintf(stderr, "[msgrouter] Call \"%s\" missing msgid\n", sel.ToString().c_str());
      return false;
    }
    handler(args2, new MsgPromise(b, msgid));
  } else {
    auto I = _notifs.find(sel);
    if (I == _notifs.end()) {
      return false;
    }
    auto& handler = I->second;
    handler(args2);
  }

  return true;
}
