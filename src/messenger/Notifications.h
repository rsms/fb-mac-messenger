#pragma once
#include "common.h"
#include "include/cef_browser.h"
#include <map>

struct Notification : public CefBase {
  Notification(const CefString& title,
               const CefString& body,
               const CefString& iconURL,
               const CefString& tag);
  
  const CefString& tag() const { return _tag; } // never empty
  const CefString& title() const { return _title; }
  const CefString& body() const { return _body; }
  const CefString& iconURL() const { return _iconURL; }
  bool isAnonymous() const { return _isAnonymous; }
  
  const CefRefPtr<CefBrowser>& associatedBrowser() const { return _browser; }
  void setAssociatedBrowser(CefRefPtr<CefBrowser> b) { _browser = b; }
  
  void schedule() const;
  
private:
  CefString _tag;
  CefString _title;
  CefString _body;
  CefString _iconURL;
  CefRefPtr<CefBrowser> _browser;
  bool      _isAnonymous; // true if not tag was provided with constructor
  
  IMPLEMENT_REFCOUNTING(Notification);
};


struct Notifications {
  
  // Create a notification and register it
  template <typename... Args>
  CefRefPtr<Notification> create(Args&&... args) {
    CefRefPtr<Notification> n(new Notification(args...));
    auto I = _notifs.emplace(n->tag(), n);
    if (!I.second) {
      // another notification exists -- replace it
      I.first->second = n;
    }
    return n;
  }

  // Remove and possibly cancel a notifcation.
  // Returns true if notification was found and removed.
  bool remove(const CefString& tag);
  
private:
  std::map<CefString, CefRefPtr<Notification>> _notifs;
};
