#include "common.h"
#include "v8-cef-util.h"

CefRefPtr<CefValue> V8ValueToCefValue(const CefRefPtr<CefV8Value>& value) {
  auto cv = CefValue::Create();
  if (value->IsString()) {
    cv->SetString(value->GetStringValue());

  } else if (value->IsInt()) {
    cv->SetInt(value->GetIntValue());

  } else if (value->IsArray()) {
    auto dst = CefListValue::Create();
    int z = value->GetArrayLength();
    dst->SetSize(z);
    for (int i = 0; i < z; ++i) {
      dst->SetValue(i, V8ValueToCefValue(value->GetValue(i)));
    }
    cv->SetList(dst);

  } else if (value->IsObject()) {
    auto dst = CefDictionaryValue::Create();
    std::vector<CefString> keys;
    if (value->GetKeys(keys)) {
      for (auto& key : keys) {
        dst->SetValue(key, V8ValueToCefValue(value->GetValue(key)));
      }
    }
    cv->SetDictionary(dst);

  } else if (value->IsBool()) {
    cv->SetBool(value->GetBoolValue());

  } else if (value->IsDouble()) {
    cv->SetDouble(value->GetDoubleValue());

  } else {
    cv->SetNull();
  }
  return cv;
}


CefRefPtr<CefV8Value> CefValueToV8Value(const CefRefPtr<CefValue>& value) {
  switch (value->GetType()) {

  case VTYPE_LIST: {
    auto src = value->GetList();
    assert(src->GetSize() <= INT_MAX);
    int z = int(src->GetSize());
    auto dst = CefV8Value::CreateArray(z);
    for (int i = 0; i < z; ++i) {
      dst->SetValue(i, CefValueToV8Value(src->GetValue(i)));
    }
    return dst;
  }

  case VTYPE_DICTIONARY: {
    auto src = value->GetDictionary();
    assert(src->GetSize() <= INT_MAX);
    auto dst = CefV8Value::CreateObject(nullptr);
    CefDictionaryValue::KeyList keys;
    if (src->GetKeys(keys)) {
      for (auto& key : keys) {
        auto v = CefValueToV8Value(src->GetValue(key));
        dst->SetValue(key, v, V8_PROPERTY_ATTRIBUTE_READONLY);
      }
    }
    return dst;
  }

  case VTYPE_BOOL:
    return CefV8Value::CreateBool(value->GetBool());

  case VTYPE_DOUBLE:
    return CefV8Value::CreateDouble(value->GetDouble());

  case VTYPE_INT:
    return CefV8Value::CreateInt(value->GetInt());

  case VTYPE_STRING:
    return CefV8Value::CreateString(value->GetString());

  default:
    return CefV8Value::CreateNull();
  }
}
