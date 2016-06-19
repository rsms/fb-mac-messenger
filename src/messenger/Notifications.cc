#include "Notifications.h"
#include "include/wrapper/cef_helpers.h"
#include "time.h"


Notification::Notification(const CefString& title,
                           const CefString& body,
                           const CefString& iconURL,
                           const CefString& tag)
  : _title(title)
  , _body(body)
  , _iconURL(iconURL)
{
  if (tag.empty()) {
    // Assign tag
    auto anonTag = std::string("anon-") + "-" + std::to_string(TimeNow());
    _tag.FromASCII(anonTag.c_str());
    _isAnonymous = true;
  } else {
    _tag = tag;
    _isAnonymous = false;
  }
}


//void Notifications::clear() {
//  _notifs.clear();
//}
