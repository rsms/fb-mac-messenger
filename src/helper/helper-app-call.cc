#include "helper-app.h"
#include "v8-cef-util.h"
#include <string>

bool HelperApp::Execute(const CefString& name,
                        CefRefPtr<CefV8Value> object,
                        const CefV8ValueList& args,
                        CefRefPtr<CefV8Value>& retval,
                        CefString& exception)
{
  //printf("HelperApp Execute %s\n", name.ToString().c_str());
  
  static const auto kCall = CefStr(u"Call");
  static const auto kNotify = CefStr(u"Notify");
  
  if (name == "Ping") {
    retval = CefV8Value::CreateDouble(123);
    return true;
  
  }

  bool isCall = (name == kCall);
  if (!isCall && name != kNotify) {
    return false;
  }
  
  // Forward asynchronously to browser
  auto ctx = CefV8Context::GetCurrentContext();
  auto browser = ctx->GetBrowser();
  if (!browser.get()) {
    return false;
  }

  if (args.size() < 1) {
    exception = "missing name";
    return true;
  }

  auto msg = CefProcessMessage::Create(name);
  auto msgargs = msg->GetArgumentList();
  auto sel = args[0]->GetStringValue();
  unsigned int argi = 1;
  unsigned int msgargi = 0;
  msgargs->SetString(msgargi++, sel);
  
  if (isCall) {
    //printf("HelperApp Execute Call %d %s\n", _msgid, sel.ToString().c_str());

    // we expect two functions as promise callbacks (resolve, reject, args...)
    if (args.size() < 3) {
      exception = "too few arguments for Call";
      return true;
    }
    if (!args[1]->IsFunction() || !args[2]->IsFunction()) {
      exception = "2nd and 3rd argument are not functions";
      return true;
    }
    
    argi = 3;
    _promises.emplace(_msgid, Promise{ctx, args[1], args[2]});
    msgargs->SetInt(msgargi++, _msgid);
    _msgid++;
  } else {
    //printf("HelperApp Execute Notify %s\n", sel.ToString().c_str());
  }

  // Forward any remaining arguments
  int argc = int(args.size());
  while (argi < argc) {
    msgargs->SetValue(msgargi, V8ValueToCefValue(args[argi]));
    argi++;
    msgargi++;
  }
  
  browser->SendProcessMessage(PID_BROWSER, msg);
  return true; // call was handled
}


void HelperApp::cancelPromisesInCtx(CefRefPtr<CefV8Context> ctx) {
  auto I = _promises.begin();
  std::vector<PromiseMap::iterator> itsToErase;
  for (; I != _promises.end(); I++) {
    if (I->second.ctx->IsSame(ctx)) {
      itsToErase.emplace_back(I);
    }
  }
  for (auto& I : itsToErase) {
    _promises.erase(I);
  }
}


bool HelperApp::finalizePromise(bool isResolved, CefRefPtr<CefProcessMessage> msg) {
  CefRefPtr<CefListValue> msgargs = msg->GetArgumentList();
  int32 msgid = msgargs->GetInt(0);
  
  auto I = _promises.find(msgid);
  if (I == _promises.end()) {
    // promise is gone
    //printf("HelperApp finalizePromise notfound #%d\n", msgid);
    return false;
  }

  auto& promise = I->second;
  CefV8ValueList args;
  promise.ctx->Enter();
  
  // Sanity check to make sure the context is still attched to a browser.
  // Async callbacks could be initiated after a browser instance has been deleted,
  // which can lead to bad things. If the browser instance has been deleted, don't
  // invoke this callback.
  if (promise.ctx->GetBrowser()) {
    for (int i = 1; i < msgargs->GetSize(); i++) {
      args.push_back(CefValueToV8Value(msgargs->GetValue(i)));
    }

    if (isResolved) {
      //printf("HelperApp finalizePromise resolve #%d\n", msgid);
      promise.resolveFun->ExecuteFunction(NULL, args);
    } else {
      //printf("HelperApp finalizePromise reject #%d\n", msgid);
      promise.rejectFun->ExecuteFunction(NULL, args);
    }
  }
  
  promise.ctx->Exit();
  
  _promises.erase(I);
  return true;
}
