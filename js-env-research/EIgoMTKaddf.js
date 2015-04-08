if (self.CavalryLogger) {
 CavalryLogger.start_js([ "YvPd+" ]);
}

__d("MercuryActionStatus", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 e.exports = {
  UNSENT: 0,
  SUCCESS: 1,
  UNCONFIRMED: 3,
  FAILED_UNKNOWN_REASON: 4,
  UNABLE_TO_CONFIRM: 5,
  RESENT: 6,
  RESENDING: 7,
  ERROR: 10
 };
}, null);

__d("MercuryActionType", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 e.exports = {
  LOG_MESSAGE: "ma-type:log-message",
  USER_GENERATED_MESSAGE: "ma-type:user-generated-message",
  CHANGE_READ_STATUS: "ma-type:change_read_status",
  MARK_THREAD_SEEN: "ma-type:mark_thread_seen",
  CHANGE_MUTE_SETTINGS: "ma-type:change-mute-settings",
  SEND_MESSAGE: "ma-type:send-message",
  UPDATE_ACTION_ID: "ma-type:update-action-id",
  DELETE_MESSAGES: "ma-type:delete-messages",
  MARK_MESSAGES_SPAM: "ma-type:mark-messages-spam",
  DELETE_THREAD: "ma-type:delete-thread",
  CHANGE_ARCHIVED_STATUS: "ma-type:change-archived-status",
  CHANGE_FOLDER: "ma-type:change-folder",
  ADD_PARTICIPANTS: "ma-type:add-participants",
  CANCEL_ATTACHMENT_PLACEHOLDER: "ma-type:cancel-attachment-placeholder",
  CONFIRM_ATTACHMENT_PLACEHOLDER: "ma-type:confirm-attachment-placeholder",
  ADD_SHARE_DATA_TO_EXISTING_MESSAGE: "ma-type:add-share-data-to-existing-message",
  UNPIN_THREAD: "ma-type:unpin-thread"
 };
}, null);

__d("MercuryAPIArgsSource", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 e.exports = {
  CHAT: "chat",
  JEWEL: "jewel",
  MERCURY: "mercury",
  WEBMESSENGER: "web_messenger",
  MESSENGER: "messenger"
 };
}, null);

__d("MercuryAttachmentContentType", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 e.exports = {
  PHOTO: "attach:image",
  VIDEO: "attach:video",
  MUSIC: "attach:music",
  VOICE: "attach:voice",
  TEXT: "attach:text",
  MSWORD: "attach:ms:word",
  MSXLS: "attach:ms:xls",
  MSPPT: "attach:ms:ppt",
  ORION: "attach:orion",
  SHOERACK_INVITATION: "attach:shoerackinvite",
  UNKNOWN: "attach:unknown"
 };
}, null);

__d("MercuryAttachmentType", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 e.exports = {
  ERROR: "error",
  FILE: "file",
  PHOTO: "photo",
  STICKER: "sticker",
  SHARE: "share",
  UNKNOWN: "unknown",
  VIDEO: "video",
  ANIMATED_IMAGE: "animated_image"
 };
}, null);

__d("MercuryErrorType", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 e.exports = {
  SERVER: 1,
  TRANSPORT: 2,
  TIMEOUT: 3
 };
}, null);

__d("MercuryGenericConstants", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 e.exports = {
  MAX_THREAD_NAME_LENGTH: 250
 };
}, null);

__d("MercuryGlobalActionType", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 e.exports = {
  MARK_ALL_READ: "mga-type:mark-all-read"
 };
}, null);

__d("MercuryLogMessageType", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 e.exports = {
  SUBSCRIBE: "log:subscribe",
  UNSUBSCRIBE: "log:unsubscribe",
  VIDEO_CALL: "log:video-call",
  PHONE_CALL: "log:phone-call",
  THREAD_NAME: "log:thread-name",
  THREAD_IMAGE: "log:thread-image",
  SERVER_ERROR: "log:error-msg",
  LIVE_LISTEN: "log:live-listen",
  WALLPAPER: "log:wallpaper",
  ORION: "log:orion",
  SWITCH_TO_WORK: "log:switch",
  PAGE_REPLY: "log:page-reply"
 };
}, null);

__d("MercuryMessageSourceTags", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 e.exports = {
  CHAT: "source:chat",
  EMAIL: "source:email",
  MESSENGER: "source:messenger",
  MOBILE: "source:mobile"
 };
}, null);

__d("MercuryPayloadSource", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 e.exports = {
  UNKNOWN: "unknown",
  CLIENT_CHANNEL_MESSAGE: "client_channel_message",
  CLIENT_SEND_MESSAGE: "client_send_message",
  CLIENT_CHANGE_ARCHIVED_STATUS: "client_change-archived_status",
  CLIENT_CHANGE_FOLDER: "client_change_folder",
  CLIENT_CHANGE_MUTE_SETTINGS: "client_change_mute_settings",
  CLIENT_CHANGE_READ_STATUS: "client_change_read_status",
  CLIENT_MARK_THREAD_SEEN: "client_mark_thread_seen",
  CLIENT_ADD_PARTICIPANTS: "client_add_participants",
  CLIENT_FETCH_PARTICIPANTS: "client_fetch_participants",
  CLIENT_DELETE_MESSAGES: "client_delete_messages",
  CLIENT_MARK_MESSAGES_SPAM: "client_mark_messages_spam",
  CLIENT_DELETE_THREAD: "client_delete_thread",
  CLIENT_HANDLE_ERROR: "client_handle_error",
  CLIENT_UNPIN_THREAD: "client_unpin_thread",
  SERVER_INITIAL_DATA: "server_initial_data",
  SERVER_SEND_MESSAGE: "server_send_message",
  SERVER_CONFIRM_MESSAGES: "server_confirm_messages",
  SERVER_CHANGE_ARCHIVED_STATUS: "server_change_archived_status",
  SERVER_CHANGE_READ_STATUS: "server_change_read_status",
  SERVER_MARK_FOLDER_READ: "server_mark_folder_read",
  SERVER_MARK_SEEN: "server_mark_seen",
  SERVER_FETCH_PARTICIPANTS: "server_fetch_participants",
  SERVER_FETCH_THREAD_INFO: "server_fetch_thread_info",
  SERVER_FETCH_THREADLIST_INFO: "server_fetch_threadlist_info",
  SERVER_STANDALONE_NOTIFICATIONS: "server_standalone_notifications",
  SERVER_THREAD_SYNC: "server_thread_sync",
  SERVER_TAB_PRESENCE: "server_tab_presence",
  SERVER_UNREAD_THREADS: "server_unread_threads",
  SERVER_SEARCH: "server_search",
  SERVER_ADD_SHARE_DATA_TO_EXISTING_MESSAGE: "server_add_share_data_to_existing_message"
 };
}, null);

__d("MercurySourceType", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 e.exports = {
  CHAT_ORCA: "source:chat:orca",
  CHAT_IPHONE: "source:chat:iphone",
  CHAT_JABBER: "source:chat:jabber",
  CHAT_MEEBO: "source:chat:meebo",
  CHAT_WEB: "source:chat:web",
  CHAT_TEST: "source:chat:test",
  CHAT: "source:chat",
  EMAIL: "source:email",
  EVENT_MESSAGE_BLAST: "source:event_message_blast",
  GIGABOXX_API: "source:gigaboxx:api",
  GIGABOXX_BLAST: "source:gigaboxx:blast",
  GIGABOXX_EMAIL_REPLY: "source:gigaboxx:emailreply",
  GIGABOXX_MOBILE: "source:gigaboxx:mobile",
  GIGABOXX_WAP: "source:gigaboxx:wap",
  GIGABOXX_WEB: "source:gigaboxx:web",
  LEIA: "source:leia",
  MESSENGER_WEB: "source:messenger:web",
  SAM_UFI: "source:sam:ufi",
  SHARE_DIALOG: "source:share:dialog",
  SEND_PLUGIN: "source:sendplugin",
  SMS: "source:sms",
  TEST: "source:test",
  TITAN_WAP: "source:titan:wap",
  TITAN_M_BASIC: "source:titan:m_basic",
  TITAN_M_FREE: "source:titan:m_free_basic",
  TITAN_M_JAPAN: "source:titan:m_japan",
  TITAN_M_MINI: "source:titan:m_mini",
  TITAN_M_TOUCH: "source:titan:m_touch",
  TITAN_M_APP: "source:titan:m_app",
  TITAN_M_TABLET: "source:titan:m_tablet",
  TITAN_M_ZERO: "source:titan:m_zero",
  TITAN_M_TALK: "source:titan:m_talk",
  TITAN_WEB: "source:titan:web",
  TITAN_FACEWEB_ANDROID: "source:titan:faceweb_android",
  TITAN_FACEWEB_BUFFY: "source:titan:faceweb_buffy",
  TITAN_FACEWEB_IPAD: "source:titan:faceweb_ipad",
  TITAN_FACEWEB_IPHONE: "source:titan:faceweb_iphone",
  TITAN_FACEWEB_UNKNOWN: "source:titan:faceweb_unknown",
  TITAN_API: "source:titan:api",
  TITAN_API_MOBILE: "source:titan:api_mobile",
  TITAN_ORCA: "source:titan:orca",
  TITAN_EMAIL_REPLY: "source:titan:emailreply",
  MOBILE: "source:mobile",
  PAGE_PLATFORM_API: "source:page_platform_api",
  UNKNOWN: "source:unknown",
  WEB: "source:web",
  HELPCENTER: "source:helpcenter",
  NEW_SHARE_DIALOG: "source:share:dialog:new",
  PAID_PROMOTION: "source:paid_promotion",
  BUFFY_SMS: "source:buffy:sms",
  WEBRTC_MOBILE: "source:webrtc:mobile",
  MESSENGER_COMMERCE: "source:messenger:commerce"
 };
}, null);

__d("MercuryThreadMode", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 e.exports = {
  EMAIL_ORIGINATED: 1,
  TITAN_ORIGINATED: 2,
  OBJECT_ORIGINATED: 3
 };
}, null);

__d("MercuryTimePassed", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 e.exports = {
  TODAY: 0,
  WEEK_AGO: 1,
  MONTH_AGO: 2,
  CURRENT_YEAR: 3,
  OTHER_YEAR: 4
 };
}, null);

__d("MessagingEvent", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 e.exports = {
  DELETE: "delete",
  DELETE_MESSAGES: "delete_messages",
  DELIVER: "deliver",
  ERROR: "error",
  READ: "read",
  REPORT_SPAM: "report_spam",
  REPORT_SPAM_MESSAGES: "report_spam_messages",
  UNMARK_SPAM: "unmark_spam",
  SUBSCRIBE: "subscribe",
  CHANGE_MUTE_SETTINGS: "change_mute_settings",
  TAG: "tag",
  UNREAD: "unread",
  UNSUBSCRIBE: "unsubscribe",
  DELIVER_LOG: "deliver_log",
  MORE_THREADS: "more_threads",
  READ_ALL: "read_all",
  READ_RECEIPT: "read_receipt",
  DELIVERY_RECEIPT: "delivery_receipt",
  SENT_PUSH: "sent_push",
  DELIVER_FAST_PAST: "deliver_fast_path",
  MESSENGER_STATUS: "messenger_status",
  UPDATE_PINNED_THREADS: "update_pinned_threads"
 };
}, null);

__d("MessagingRealtimeConstants", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 e.exports = {
  VIEWER_FBID: "realtime_viewer_fbid"
 };
}, null);

__d("MessagingTag", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 e.exports = {
  GROUPS: "groups",
  UNREAD: "unread",
  FLAGGED: "flagged",
  ACTION_ARCHIVED: "action:archived",
  INBOX: "inbox",
  OTHER: "other",
  EVENT: "event",
  SENT: "sent",
  SMS_MUTE: "sms_mute",
  SPAM: "spam",
  UPDATES: "broadcasts_inbox",
  BCC: "header:bcc",
  FILTERED_CONTENT: "filtered_content",
  UNAVAILABLE_ATTACHMENT: "unavailable_attachment",
  ARCHIVED: "archived",
  EMAIL: "email",
  VOICEMAIL: "voicemail",
  SPAM_SPOOFING: "spam:spoofing",
  SPOOF_WARNING: "MTA:spoof_warning",
  SMS_TAG_ROOT: "SMSShortcode:",
  APP_ID_ROOT: "app_id:",
  DOMAIN_AUTH_PASS: "MTA:dmarc:pass",
  DOMAIN_AUTH_FAIL: "MTA:dmarc:fail",
  MTA_SYSTEM_MESSAGE: "MTA:system_message",
  EMAIL_MESSAGE: "source:email"
 };
}, null);

__d("AjaxRequest", [ "ErrorUtils", "Keys", "URI", "UserAgent_DEPRECATED", "getSameOriginTransport", "setTimeoutAcrossTransitions", "PHPQuerySerializer", "copyProperties" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
 b.__markCompiled && b.__markCompiled();
 function o(s, t, u) {
  this.xhr = k();
  if (!(t instanceof i)) t = new i(t);
  if (u && s == "GET") {
   t.setQueryData(u);
  } else this._params = u;
  this.method = s;
  this.uri = t;
  this.xhr.open(s, t);
 }
 var p = window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest();
 o.supportsCORS = function() {
  return p;
 };
 o.ERROR = "ar:error";
 o.TIMEOUT = "ar:timeout";
 o.PROXY_ERROR = "ar:proxy error";
 o.TRANSPORT_ERROR = "ar:transport error";
 o.SERVER_ERROR = "ar:http error";
 o.PARSE_ERROR = "ar:parse error";
 o.SERVICE_UNAVAILABLE = "ar:noservice";
 o._inflight = [];
 function q() {
  var s = o._inflight;
  o._inflight = [];
  s.forEach(function(t) {
   t.abort();
  });
 }
 function r(s) {
  s.onJSON = s.onError = s.onSuccess = null;
  clearTimeout(s._timer);
  if (s.xhr && s.xhr.readyState < 4) {
   s.xhr.abort();
   s.xhr = null;
  }
  o._inflight = o._inflight.filter(function(t) {
   return t && t != s && t.xhr && t.xhr.readyState < 4;
  });
 }
 n(o.prototype, {
  timeout: 6e4,
  streamMode: true,
  prelude: /^for \(;;\);/,
  status: null,
  _eol: -1,
  _call: function(s) {
   if (this[s]) this[s](this);
  },
  _parseStatus: function() {
   var s;
   try {
    this.status = this.xhr.status;
    s = this.xhr.statusText;
   } catch (t) {
    if (this.xhr.readyState >= 4) {
     this.errorType = o.TRANSPORT_ERROR;
     this.errorText = t.message;
    }
    return;
   }
   if (this.status === 0 && !/^(file|ftp)/.test(this.uri)) {
    this.errorType = o.TRANSPORT_ERROR;
   } else if (this.status >= 100 && this.status < 200) {
    this.errorType = o.PROXY_ERROR;
   } else if (this.status >= 200 && this.status < 300) {
    return;
   } else if (this.status >= 300 && this.status < 400) {
    this.errorType = o.PROXY_ERROR;
   } else if (this.status >= 400 && this.status < 500) {
    this.errorType = o.SERVER_ERROR;
   } else if (this.status === 503) {
    this.errorType = o.SERVICE_UNAVAILABLE;
   } else if (this.status > 500 && this.status < 600) {
    this.errorType = o.PROXY_ERROR;
   } else if (this.status == 1223) {
    return;
   } else if (this.status >= 12001 && this.status <= 12156) {
    this.errorType = o.TRANSPORT_ERROR;
   } else {
    s = "unrecognized status code: " + this.status;
    this.errorType = o.ERROR;
   }
   if (!this.errorText) this.errorText = s;
  },
  _parseResponse: function() {
   var s, t = this.xhr.readyState;
   try {
    s = this.xhr.responseText || "";
   } catch (u) {
    if (t >= 4) {
     this.errorType = o.ERROR;
     this.errorText = "responseText not available - " + u.message;
    }
    return;
   }
   while (this.xhr) {
    var v = this._eol + 1, w = this.streamMode ? s.indexOf("\n", v) : s.length;
    if (w < 0 && t == 4) w = s.length;
    if (w <= this._eol) break;
    var x = s;
    if (this.streamMode) x = s.substr(v, w - v).replace(/^\s*|\s*$/g, "");
    if (v === 0 && this.prelude) if (this.prelude.test(x)) x = x.replace(this.prelude, "");
    this._eol = w;
    if (x) {
     try {
      this.json = JSON.parse(x);
     } catch (u) {
      var y = /(<body[\S\s]+?<\/body>)/i.test(s) && RegExp.$1, z = {
       message: u.message,
       "char": v,
       excerpt: (v === 0 && y || x).substr(512)
      };
      this.errorType = o.PARSE_ERROR;
      this.errorText = "parse error - " + JSON.stringify(z);
      return;
     }
     g.applyWithGuard(this._call, this, [ "onJSON" ]);
    }
   }
  },
  _onReadyState: function() {
   var s = this.xhr && this.xhr.readyState || 0;
   if (this.status == null && s >= 2) this._parseStatus();
   if (!this.errorType && this.status != null) if (s == 3 && this.streamMode || s == 4) this._parseResponse();
   if (this.errorType || s == 4) {
    this._time = Date.now() - this._sentAt;
    this._call(!this.errorType ? "onSuccess" : "onError");
    r(this);
   }
  },
  send: function(s) {
   this.xhr.onreadystatechange = function() {
    g.applyWithGuard(this._onReadyState, this, arguments);
   }.bind(this);
   var t = this.timeout;
   if (t) this._timer = l(function() {
    this.errorType = o.TIMEOUT;
    this.errorText = "timeout";
    this._time = Date.now() - this._sentAt;
    this._call("onError");
    r(this);
   }.bind(this), t);
   o._inflight.push(this);
   if (this.method == "POST") this.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
   this._sentAt = Date.now();
   this.xhr.send(s ? m.serialize(s) : "");
  },
  abort: function() {
   r(this);
  },
  toString: function() {
   var s = "[AjaxRequest readyState=" + this.xhr.readyState;
   if (this.errorType) s += " errorType=" + this.errorType + " (" + this.errorText + ")";
   return s + "]";
  },
  toJSON: function() {
   var s = {
    json: this.json,
    status: this.status,
    errorType: this.errorType,
    errorText: this.errorText,
    time: this._time
   };
   if (this.errorType) s.uri = this.uri;
   for (var t in s) if (s[t] == null) delete s[t];
   return s;
  }
 });
 if (window.addEventListener && j.firefox()) window.addEventListener("keydown", function(event) {
  if (event.keyCode === h.ESC) event.prevent();
 }, false);
 if (window.attachEvent) window.attachEvent("onunload", q);
 e.exports = o;
}, null);

__d("FBAjaxRequest", [ "AjaxRequest", "copyProperties", "getAsyncParams" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 function j(k, l, m) {
  m = h(i(k), m);
  var n = new g(k, l, m);
  n.streamMode = false;
  var o = n._call;
  n._call = function(p) {
   if (p == "onJSON" && this.json) {
    if (this.json.error) {
     this.errorType = g.SERVER_ERROR;
     this.errorText = "AsyncResponse error: " + this.json.error;
    }
    this.json = this.json.payload;
   }
   o.apply(this, arguments);
  };
  n.ajaxReqSend = n.send;
  n.send = function(p) {
   this.ajaxReqSend(h(p, m));
  };
  return n;
 }
 e.exports = j;
}, null);

__d("CallbackManagerController", [ "ErrorUtils", "copyProperties" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 var i = function(j) {
  this._pendingIDs = [];
  this._allRequests = [ void 0 ];
  this._callbackArgHandler = j;
 };
 h(i.prototype, {
  executeOrEnqueue: function(j, k, l) {
   l = l || {};
   var m = this._attemptCallback(k, j, l);
   if (m) return 0;
   this._allRequests.push({
    fn: k,
    request: j,
    options: l
   });
   var n = this._allRequests.length - 1;
   this._pendingIDs.push(n);
   return n;
  },
  unsubscribe: function(j) {
   delete this._allRequests[j];
  },
  reset: function() {
   this._allRequests = [];
  },
  getRequest: function(j) {
   return this._allRequests[j];
  },
  runPossibleCallbacks: function() {
   var j = this._pendingIDs;
   this._pendingIDs = [];
   var k = [];
   j.forEach(function(l) {
    var m = this._allRequests[l];
    if (!m) return;
    if (this._callbackArgHandler(m.request, m.options)) {
     k.push(l);
    } else this._pendingIDs.push(l);
   }.bind(this));
   k.forEach(function(l) {
    var m = this._allRequests[l];
    delete this._allRequests[l];
    this._attemptCallback(m.fn, m.request, m.options);
   }.bind(this));
  },
  _attemptCallback: function(j, k, l) {
   var m = this._callbackArgHandler(k, l);
   if (m) {
    var n = {
     ids: k
    };
    g.applyWithGuard(j, n, m);
   }
   return !!m;
  }
 });
 e.exports = i;
}, null);

__d("KeyedCallbackManager", [ "CallbackManagerController", "ErrorUtils" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 function i() {
  "use strict";
  this.$KeyedCallbackManager0 = {};
  this.$KeyedCallbackManager1 = new g(this.$KeyedCallbackManager2.bind(this));
 }
 i.prototype.executeOrEnqueue = function(j, k) {
  "use strict";
  if (!(j instanceof Array)) {
   var l = j, m = k;
   j = [ j ];
   k = function(n) {
    m(n[l]);
   };
  }
  j = j.filter(function(n) {
   var o = n !== null && n !== void 0;
   if (!o) h.applyWithGuard(function() {
    throw new Error("KeyedCallbackManager.executeOrEnqueue: key " + JSON.stringify(n) + " is invalid");
   });
   return o;
  });
  return this.$KeyedCallbackManager1.executeOrEnqueue(j, k);
 };
 i.prototype.unsubscribe = function(j) {
  "use strict";
  this.$KeyedCallbackManager1.unsubscribe(j);
 };
 i.prototype.reset = function() {
  "use strict";
  this.$KeyedCallbackManager1.reset();
  this.$KeyedCallbackManager0 = {};
 };
 i.prototype.getUnavailableResources = function(j) {
  "use strict";
  var k = this.$KeyedCallbackManager1.getRequest(j), l = [];
  if (k) l = k.request.filter(function(m) {
   return !this.$KeyedCallbackManager0[m];
  }.bind(this));
  return l;
 };
 i.prototype.getUnavailableResourcesFromRequest = function(j) {
  "use strict";
  var k = Array.isArray(j) ? j : [ j ];
  return k.filter(function(l) {
   if (l !== null && l !== void 0) return !this.$KeyedCallbackManager0[l];
  }, this);
 };
 i.prototype.addResourcesAndExecute = function(j) {
  "use strict";
  Object.assign(this.$KeyedCallbackManager0, j);
  this.$KeyedCallbackManager1.runPossibleCallbacks();
 };
 i.prototype.setResource = function(j, k) {
  "use strict";
  this.$KeyedCallbackManager0[j] = k;
  this.$KeyedCallbackManager1.runPossibleCallbacks();
 };
 i.prototype.getResource = function(j) {
  "use strict";
  return this.$KeyedCallbackManager0[j];
 };
 i.prototype.getAllResources = function() {
  "use strict";
  return this.$KeyedCallbackManager0;
 };
 i.prototype.dumpResources = function() {
  "use strict";
  var j = {};
  for (var k in this.$KeyedCallbackManager0) {
   var l = this.$KeyedCallbackManager0[k];
   if (typeof l === "object") l = Object.assign({}, l);
   j[k] = l;
  }
  return j;
 };
 i.prototype.$KeyedCallbackManager2 = function(j) {
  "use strict";
  var k = {};
  for (var l = 0; l < j.length; l++) {
   var m = j[l], n = this.$KeyedCallbackManager0[m];
   if (typeof n == "undefined") return false;
   k[m] = n;
  }
  return [ k ];
 };
 e.exports = i;
}, null);

__d("BaseAsyncLoader", [ "KeyedCallbackManager", "copyProperties" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 var i = {};
 function j(l, m, n) {
  var o = new g(), p = false, q = [];
  function r() {
   if (!q.length || p) return;
   p = true;
   setTimeout(t, 0);
  }
  function s(w) {
   p = false;
   w.forEach(o.unsubscribe.bind(o));
   r();
  }
  function t() {
   var w = {}, x = [];
   q = q.filter(function(z) {
    var aa = o.getUnavailableResources(z);
    if (aa.length) {
     aa.forEach(function(ba) {
      w[ba] = true;
     });
     x.push(z);
     return true;
    }
    return false;
   });
   var y = Object.keys(w);
   if (y.length) {
    n(l, y, x, u.bind(null, x), v.bind(null, x));
   } else p = false;
  }
  function u(w, x) {
   var y = x.payload[m] || x.payload;
   o.addResourcesAndExecute(y);
   s(w);
  }
  function v(w) {
   s(w);
  }
  return {
   get: function(w, x) {
    var y = o.executeOrEnqueue(w, x), z = o.getUnavailableResources(y);
    if (z.length) {
     q.push(y);
     r();
    }
   },
   getCachedKeys: function() {
    return Object.keys(o.getAllResources());
   },
   getNow: function(w) {
    return o.getResource(w) || null;
   },
   set: function(w) {
    o.addResourcesAndExecute(w);
   }
  };
 }
 function k(l, m) {
  throw "BaseAsyncLoader can't be instantiated";
 }
 h(k.prototype, {
  _getLoader: function() {
   if (!i[this._endpoint]) i[this._endpoint] = j(this._endpoint, this._type, this.send);
   return i[this._endpoint];
  },
  get: function(l, m) {
   return this._getLoader().get(l, m);
  },
  getCachedKeys: function() {
   return this._getLoader().getCachedKeys();
  },
  getNow: function(l) {
   return this._getLoader().getNow(l);
  },
  reset: function() {
   i[this._endpoint] = null;
  },
  set: function(l) {
   this._getLoader().set(l);
  }
 });
 e.exports = k;
}, null);

__d("AjaxLoader", [ "copyProperties", "FBAjaxRequest", "BaseAsyncLoader" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 function j(k, l) {
  this._endpoint = k;
  this._type = l;
 }
 g(j.prototype, i.prototype);
 j.prototype.send = function(k, l, m, n, o) {
  var p = new h("GET", k, {
   ids: l
  });
  p.onJSON = function(q) {
   n({
    payload: q.json
   });
  };
  p.onError = o;
  p.send();
 };
 e.exports = j;
}, null);

__d("ChatConfig", [ "ChatConfigInitialData", "copyProperties" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 var i = {}, j = {
  get: function(k, l) {
   return k in i ? i[k] : l;
  },
  set: function(k) {
   if (arguments.length > 1) {
    var l = {};
    l[k] = arguments[1];
    k = l;
   }
   h(i, k);
  },
  getDebugInfo: function() {
   return i;
  }
 };
 j.set(g);
 e.exports = j;
}, null);

__d("ChannelConstants", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 var g = "channel/", h = {
  ON_SHUTDOWN: g + "shutdown",
  ON_INVALID_HISTORY: g + "invalid_history",
  ON_CONFIG: g + "config",
  ON_ENTER_STATE: g + "enter_state",
  ON_EXIT_STATE: g + "exit_state",
  ATTEMPT_RECONNECT: g + "attempt_reconnect",
  RTI_SESSION: g + "new_rti_address",
  SKYWALKER: g + "skywalker",
  OK: "ok",
  ERROR: "error",
  ERROR_MAX: "error_max",
  ERROR_MISSING: "error_missing",
  ERROR_MSG_TYPE: "error_msg_type",
  ERROR_SHUTDOWN: "error_shutdown",
  ERROR_STALE: "error_stale",
  SYS_OWNER: "sys_owner",
  SYS_NONOWNER: "sys_nonowner",
  SYS_ONLINE: "sys_online",
  SYS_OFFLINE: "sys_offline",
  SYS_TIMETRAVEL: "sys_timetravel",
  HINT_AUTH: "shutdown auth",
  HINT_CONN: "shutdown conn",
  HINT_DISABLED: "shutdown disabled",
  HINT_INVALID_STATE: "shutdown invalid state",
  HINT_MAINT: "shutdown maint",
  HINT_UNSUPPORTED: "shutdown unsupported",
  reason_Unknown: 0,
  reason_AsyncError: 1,
  reason_TooLong: 2,
  reason_Refresh: 3,
  reason_RefreshDelay: 4,
  reason_UIRestart: 5,
  reason_NeedSeq: 6,
  reason_PrevFailed: 7,
  reason_IFrameLoadGiveUp: 8,
  reason_IFrameLoadRetry: 9,
  reason_IFrameLoadRetryWorked: 10,
  reason_PageTransitionRetry: 11,
  reason_IFrameLoadMaxSubdomain: 12,
  reason_NoChannelInfo: 13,
  reason_NoChannelHost: 14,
  CAPABILITY_VOIP_INTEROP: 8,
  CAPABILITY_VIDEO: 32,
  FANTAIL_DEBUG: "DEBUG",
  FANTAIL_WARN: "WARN",
  FANTAIL_INFO: "INFO",
  FANTAIL_ERROR: "ERROR",
  SUBSCRIBE: "subscribe",
  UNSUBSCRIBE: "unsubscribe",
  getArbiterType: function(i) {
   return g + "message:" + i;
  },
  getSkywalkerArbiterType: function(i) {
   return g + "skywalker:" + i;
  }
 };
 e.exports = h;
}, null);

__d("LogHistory", [ "CircularBuffer", "createArrayFromMixed" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 var i = 500, j = {}, k = new g(i);
 function l(t, u, v) {
  var event = v.shift();
  k.write({
   date: Date.now(),
   level: t,
   category: u,
   event: event,
   args: v
  });
 }
 function m(t) {
  "use strict";
  this.category = t;
 }
 m.prototype.debug = function(event) {
  "use strict";
  l("debug", this.category, h(arguments));
  return this;
 };
 m.prototype.log = function(event) {
  "use strict";
  l("log", this.category, h(arguments));
  return this;
 };
 m.prototype.warn = function(event) {
  "use strict";
  l("warn", this.category, h(arguments));
  return this;
 };
 m.prototype.error = function(event) {
  "use strict";
  l("error", this.category, h(arguments));
  return this;
 };
 function n(t) {
  if (!j[t]) j[t] = new m(t);
  return j[t];
 }
 function o() {
  return k.read();
 }
 function p() {
  k.clear();
 }
 function q(t) {}
 function r(t) {
  return t.map(function(u) {
   var v = /\d\d:\d\d:\d\d/.exec(new Date(u.date));
   return [ v && v[0], u.level, u.category, u.event, JSON.stringify(u.args) ].join(" | ");
  }).join("\n");
 }
 var s = {
  MAX: i,
  getInstance: n,
  getEntries: o,
  clearEntries: p,
  toConsole: q,
  formatEntries: r
 };
 e.exports = s;
}, null);

__d("ChannelSubdomain", [ "Event", "JSLogger", "Run", "setTimeoutAcrossTransitions", "LogHistory", "WebStorage" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 var k = b("LogHistory").getInstance("channel"), l = b("WebStorage").getLocalStorage(), m = h.create("channel"), n = "channel_sub:", o = 7, p = 100 * 1e3, q = null, r;
 function s() {
  if (r) {
   clearTimeout(r);
   r = null;
  }
  if (l && q != null) l.removeItem(n + q);
  q = null;
 }
 function t(u, v, w) {
  var x = (u - 1) * o;
  if (w) {
   if (r) clearTimeout(r);
   q = r = null;
  }
  if (v == null) v = Math.floor(Math.random() * x);
  if (q == null) if (l) {
   var y = [];
   for (var z = 0; z < l.length; z++) {
    var aa = l.key(z);
    if (aa.indexOf(n) === 0) {
     var ba = parseInt(aa.substr(n.length), 10);
     y[ba] = parseInt(l.getItem(aa), 10);
    }
   }
   var ca = Date.now() - p;
   for (z = 0; z < x; z++) {
    var da = (z + v) % x;
    if (!y[da] || y[da] < ca) {
     q = da;
     break;
    }
   }
   if (q != null) {
    var ea = function() {
     try {
      l.setItem(n + q, Date.now());
     } catch (fa) {
      k.warn("subdomain set failed", fa.message);
     }
     r = j(ea, p / 2);
    };
    ea();
   } else {
    k.warn("no channel subdomain", y);
    m.error("subdomain_overflow");
   }
   if (typeof window.onpageshow != "undefined") {
    g.listen(window, "pagehide", s);
   } else i.onUnload(s);
  } else q = v;
  return q == null ? null : q % o;
 }
 e.exports = {
  allocate: t,
  clear: s
 };
}, null);

__d("DocRPC", [ "ErrorUtils" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 var h = {
  _apis: {},
  _dispatch: function(i) {
   var j;
   try {
    i = JSON.parse(i);
   } catch (k) {
    throw new Error('DocRPC unparsable dispatch: "' + i + '"');
   }
   if (h._apis.hasOwnProperty(i.api)) {
    var l = h._apis[i.api];
    if (l[i.method]) j = g.applyWithGuard(l[i.method], l, i.args);
   }
   if (j === void 0) j = null;
   return JSON.stringify(j);
  },
  publish: function(i, j) {
   h._apis[j] = i;
  },
  proxy: function(i, j, k) {
   var l = {};
   k.forEach(function(m) {
    l[m] = function() {
     var n = {
      api: j,
      method: m,
      args: Array.prototype.slice.call(arguments)
     }, o;
     try {
      if (i.closed) throw new Error("DocRPC window closed");
      o = i.DocRPC._dispatch(JSON.stringify(n));
     } catch (p) {
      g.reportError(p);
      return;
     }
     if (typeof o == "string") try {
      o = JSON.parse(o);
     } catch (p) {
      throw new Error("DocRPC " + j + "." + m + ' unparsable return: "' + o + '"');
     }
     return o;
    };
   });
   return l;
  }
 };
 e.exports = a.DocRPC = h;
}, null);

__d("ChannelTransport", [ "AjaxRequest", "ChannelConstants", "DocRPC", "LogHistory", "URI", "copyProperties", "bind", "setTimeoutAcrossTransitions" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
 b.__markCompiled && b.__markCompiled();
 var o = j.getInstance("channel");
 function p() {
  return (1048576 * Math.random() | 0).toString(36);
 }
 function q(z, aa) {
  var ba = z.subdomain;
  ba = ba === null ? "" : ba + "-";
  var ca = new k(aa).setDomain(ba + z.host + "." + z.domain).setPort(z.port).setSecure(k().isSecure());
  return ca;
 }
 function r(z) {
  var aa = {
   partition: z.partition,
   cb: p()
  };
  if (z.sticky_token) aa.sticky_token = z.sticky_token;
  var ba = q(z, "/p").setQueryData(aa);
  o.log("start_p", {
   uri: ba.toString()
  });
  var ca = new g("GET", ba);
  if (g.supportsCORS()) ca.xhr.withCredentials = true;
  var da = function(ea) {
   o.log("finish_p", {
    xhr: ea.toJSON ? ea.toJSON() : ea
   });
  };
  ca.timeout = z.P_TIMEOUT;
  ca.onError = ca.onSuccess = da;
  ca.send();
 }
 function s(z, aa, ba) {
  var ca = new Image(), da = 0, ea = function(ha) {
   ca.abort();
   return ha ? aa() : ba();
  };
  ca.onload = function() {
   o.log("ping_ok", {
    duration: Date.now() - da
   });
   ea(true);
  };
  ca.onerror = function() {
   r(z);
   ea(false);
  };
  var fa = n(ca.onerror, 1e4);
  ca.abort = function() {
   if (fa) {
    clearTimeout(fa);
    fa = null;
   }
   ca.onload = ca.onerror = null;
  };
  var ga = {
   partition: z.partition,
   cb: p()
  };
  if (z.sticky_token) ga.sticky_token = z.sticky_token;
  if (z.sticky_pool) ga.sticky_pool = z.sticky_pool;
  if (z.lastRequestErrorReason) {
   ga.reason = z.lastRequestErrorReason;
   z.lastRequestErrorReason = null;
  }
  if (z.uid && z.viewerUid) {
   ga.uid = z.uid;
   ga.viewer_uid = z.viewerUid;
  }
  if (z.watchdog && z.watchdog.enabled) ga.wtc = z.watchdog.doSerialize();
  da = Date.now();
  ca.src = q(z, "/ping").setQueryData(ga);
  return ca;
 }
 function t(z) {
  var aa = {
   channel: z.user_channel,
   partition: z.partition,
   clientid: z.sessionID,
   cb: p(),
   cap: 0,
   uid: z.uid,
   viewer_uid: z.viewerUid
  };
  if (z.sticky_token) aa.sticky_token = z.sticky_token;
  if (z.sticky_pool) aa.sticky_pool = z.sticky_pool;
  if (z.is_offline || z.shouldSuppressPresence) {
   aa.state = "offline";
  } else aa.state = "active";
  if (aa.state === z.lastPresenceState) return;
  z.lastPresenceState = aa.state;
  if (z.profile) aa.profile = z.profile;
  if (z.capabilities) aa.cap = z.capabilities;
  var ba = q(z, "/active_ping").setQueryData(aa), ca = new g("GET", ba);
  if (g.supportsCORS()) ca.xhr.withCredentials = true;
  ca.onError = function(da) {
   o.warn("active_ping_error");
  };
  ca.onSuccess = function(da) {
   o.log("active_ping_ok");
  };
  ca.timeout = z.P_TIMEOUT;
  ca.send();
 }
 function u(z, aa, ba, ca) {
  var da = new Date(), ea = -1;
  if (z.userActive > 0) {
   ea = (da - z.userActive) / 1e3 | 0;
   if (ea < 0) o.warn("idle_regression", {
    idleTime: ea,
    now: da.getTime(),
    userActive: z.userActive
   });
  }
  var fa = {
   channel: z.user_channel,
   seq: z.seq,
   partition: z.partition,
   clientid: z.sessionID,
   cb: p(),
   idle: ea,
   cap: 0
  };
  if (!!z.watchdog && z.watchdog.enabled) fa.wtc = z.watchdog.doSerialize();
  fa.msgs_recv = z.estimatedReceived;
  if (z.uid && z.viewerUid) {
   fa.uid = z.uid;
   fa.viewer_uid = z.viewerUid;
  }
  if (z.sticky_token) fa.sticky_token = z.sticky_token;
  if (z.sticky_pool) fa.sticky_pool = z.sticky_pool;
  if ("trace_id" in z) fa.traceid = z.trace_id;
  if (z.is_offline || z.shouldSuppressPresence) {
   fa.state = "offline";
  } else if (z.userActive > 0 && ea < 60) fa.state = "active";
  z.lastPresenceState = fa.state;
  if (z.streamingCapable) {
   fa.mode = "stream";
   fa.format = "json";
  }
  if (z.profile) fa.profile = z.profile;
  if (z.capabilities) fa.cap = z.capabilities;
  var ga = q(z, "/pull").setQueryData(fa), ha = z.fantail_enabled ? "POST" : "GET", ia = new g(ha, ga);
  if (g.supportsCORS()) ia.xhr.withCredentials = true;
  ia.timeout = z.streamingCapable ? z.STREAMING_TIMEOUT : z.LONGPOLL_TIMEOUT;
  ia.onJSON = aa;
  ia.onSuccess = ba;
  ia.onError = function() {
   var la = this.status == 12002 && this._time >= z.MIN_12002_TIMEOUT || this.status == 504 && this._time >= z.MIN_504_TIMEOUT, ma = la ? ba : ca;
   return ma && ma.apply(this, arguments);
  };
  if (z.fantail_logs && z.fantail_logs.length > 0) {
   var ja = {};
   for (var ka = 0; ka < z.fantail_logs.length; ka++) l(ja, z.fantail_logs[ka]);
   ia.send(ja);
   z.fantail_logs = [];
  } else ia.send();
  z.inStreaming = z.streamingCapable;
  return ia;
 }
 function v(z) {
  this.manager = z;
  this.init && this.init();
 }
 function w(z) {
  v.apply(this, arguments);
 }
 l(w.prototype, {
  logName: "CORS",
  enterState: function(z, aa) {
   if (this._request) {
    this._request.abort();
    this._request = null;
   }
   if (z == "init") n(m(this.manager, "exitState", {
    status: h.OK,
    stateId: aa.stateId
   }), 3e3);
   if (!/pull|ping/.test(z)) return;
   var ba = this.manager;
   if (z == "ping") {
    this._request = s(aa, m(ba, "exitState", {
     status: h.OK,
     stateId: aa.stateId
    }), m(ba, "exitState", {
     status: h.ERROR,
     stateId: aa.stateId
    }));
   } else if (z == "pull") this._request = u(aa, m(ba, "_processTransportData", aa.stateId), m(ba, "exitState", {
    status: h.OK,
    stateId: aa.stateId
   }), m(ba, "exitState", {
    status: h.ERROR,
    stateId: aa.stateId
   }));
  }
 });
 function x(z) {
  o.log("iframe_init_constructor");
  v.apply(this, arguments);
  this._iframe = document.createElement("iframe");
  this._iframe.style.display = "none";
  document.body.appendChild(this._iframe);
  i.publish(this, "outerTransport");
 }
 l(x.prototype, {
  logName: "iframe",
  _initIframe: function(z) {
   o.log("iframe_init_start");
   window.onchanneliframeready = function() {
    o.log("iframe_resources");
    return z.resources;
   };
   window.onchanneliframeloaded = function() {
    o.log("iframe_loaded");
   };
   if (z) {
    this._iframeURI = q(z, z.path);
    if (z.resources) {
     var aa = this._iframeURI.getDomain();
     z.resources = z.resources.map(function(da) {
      var ea = k(da);
      if (ea.getPath().startsWith("/intern/rsrc.php") && ea.getQueryData().origin !== void 0) return ea.addQueryData("origin", aa).toString();
      return da;
     });
    }
    if (z.bustIframe) {
     var ba = {
      partition: z.partition,
      cb: p()
     };
     this._iframeURI.setQueryData(ba);
    }
   } else this._iframeURI = "about:blank";
   this._iframeProxy = null;
   try {
    this._iframe.contentWindow.location.replace(this._iframeURI);
    o.log("iframe_uri_set");
   } catch (ca) {
    o.error("iframe_uri_set_error", ca);
    this.exitState({
     status: h.ERROR,
     stateId: z.stateId
    }, ca + "");
   }
  },
  enterState: function(z, aa) {
   if (z == "init") {
    this._initIframe(aa);
   } else if (/idle|ping|pull/.test(z)) {
    if (this._iframeProxy) {
     this._iframeProxy.enterState.apply(this._iframeProxy, arguments);
    } else if (z != "idle") this.exitState({
     status: h.ERROR,
     stateId: aa.stateId
    }, "iframe not yet loaded");
   } else if (z == "shutdown") this._initIframe();
  },
  _processTransportData: function() {
   this.manager._processTransportData.apply(this.manager, arguments);
  },
  exitState: function(z) {
   if (this.manager.state == "init" && z.status == h.OK) this._iframeProxy = i.proxy(this._iframe.contentWindow, "innerTransport", [ "enterState" ], (this._iframeURI + "").replace(/iframe.*/, ""));
   if (/ping|pull/.test(this.manager.state) && !this._iframeProxy) return;
   this.manager.exitState.apply(this.manager, arguments);
  }
 });
 function y() {
  this.init = this.init.bind(this);
  v.apply(this, arguments);
 }
 l(y.prototype, {
  logName: "iframe(inner)",
  init: function() {
   i.publish(this, "innerTransport");
   try {
    var aa = i.proxy(window.parent, "outerTransport", [ "_processTransportData", "exitState" ], top.DocRPC.origin);
    l(this, aa);
    this.exitState({
     status: h.OK,
     stateId: 1e6
    });
   } catch (z) {
    o.error("iframe_inner_init_error", z);
   }
  },
  enterState: function(z, aa) {
   if (this._request) {
    this._request.abort();
    this._request = null;
   }
   if (z == "ping") {
    this._request = s(aa, m(this, "exitState", {
     status: h.OK,
     stateId: aa.stateId
    }), m(this, "exitState", {
     status: h.ERROR,
     stateId: aa.stateId
    }));
   } else if (z == "pull") this._request = u(aa, m(this, "_processTransportData", aa.stateId), m(this, "exitState", {
    status: h.OK,
    stateId: aa.stateId
   }), m(this, "exitState", {
    status: h.ERROR,
    stateId: aa.stateId
   }));
  }
 });
 e.exports = {
  getURI: q,
  Transport: v,
  CORSTransport: w,
  IframeTransport: x,
  IframeInnerTransport: y,
  sendActivePing: t
 };
}, null);

__d("randomInt", [ "invariant" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 function h(i, j) {
  var k = arguments.length;
  g(k > 0 && k <= 2);
  if (k === 1) {
   j = i;
   i = 0;
  }
  g(j > i);
  var l = this.random || Math.random;
  return Math.floor(i + l() * (j - i));
 }
 e.exports = h;
}, null);

__d("PresenceUtil", [ "CurrentUser", "randomInt" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 var i = h(0, 4294967295) + 1;
 function j() {
  return i;
 }
 function k() {
  return g.isLoggedInNow();
 }
 e.exports = {
  getSessionID: j,
  hasUserCookie: k
 };
}, null);

__d("PresencePrivacy", [ "Arbiter", "AsyncRequest", "ChannelConstants", "CurrentUser", "PresencePrivacyInitialData", "JSLogger", "PresenceUtil", "copyProperties" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
 b.__markCompiled && b.__markCompiled();
 var o = "/ajax/chat/privacy/settings.php", p = "/ajax/chat/privacy/online_policy.php", q = "/ajax/chat/privacy/visibility.php", r = "friend_visibility", s = "visibility", t = "online_policy", u = n({}, k.privacyData), v = k.visibility, w = n({}, k.privacyData), x = v, y = k.onlinePolicy, z = y, aa = [], ba = false;
 function ca() {
  return l.create("blackbird");
 }
 var da = n(new g(), {
  WHITELISTED: 1,
  BLACKLISTED: -1,
  UNLISTED: 0,
  ONLINE: 1,
  OFFLINE: 0,
  ONLINE_TO_WHITELIST: 0,
  ONLINE_TO_BLACKLIST: 1
 });
 function ea(qa) {
  var ra;
  for (ra in qa) {
   var sa = qa[ra];
   if (ra == j.getID()) {
    ca().error("set_viewer_visibility");
    throw new Error("Invalid to set current user's visibility");
   }
   switch (sa) {
   case da.WHITELISTED:
   case da.BLACKLISTED:
   case da.UNLISTED:
    break;

   default:
    ca().error("set_invalid_friend_visibility", {
     id: ra,
     value: sa
    });
    throw new Error("Invalid state: " + sa);
   }
  }
  for (ra in qa) u[ra] = qa[ra];
  da.inform("privacy-changed");
 }
 function fa(qa, ra) {
  var sa = {};
  sa[qa] = ra;
  ea(sa);
 }
 function ga(qa) {
  switch (qa) {
  case da.ONLINE:
  case da.OFFLINE:
   break;

  default:
   ca().error("set_invalid_visibility", {
    value: qa
   });
   throw new Error("Invalid visibility: " + qa);
  }
  v = qa;
  da.inform("privacy-changed");
  da.inform("privacy-user-presence-changed");
  g.inform("chat/visibility-changed", {
   sender: this
  });
 }
 function ha(qa) {
  switch (qa) {
  case da.ONLINE_TO_WHITELIST:
  case da.ONLINE_TO_BLACKLIST:
   break;

  default:
   throw new Error("Invalid default online policy: " + qa);
  }
  y = qa;
  da.inform("privacy-user-presence-changed");
  da.inform("privacy-changed");
 }
 function ia(qa, ra) {
  ba = true;
  qa.send();
 }
 function ja(qa, ra) {
  aa.push({
   request: qa,
   data: ra
  });
  if (!ba) {
   var sa = aa.shift();
   ia(sa.request, sa.data);
  }
 }
 function ka(qa, ra) {
  var sa = qa.type;
  if (sa === r) {
   var ta = ra.payload.user_availabilities;
   if (!Array.isArray(ta)) {
    da.inform("privacy-availability-changed", {
     user_availabilities: ta
    });
    for (var ua in qa.settings) w[ua] = qa.settings[ua];
   }
  } else {
   if (sa === s) {
    x = qa.visibility;
   } else if (sa === t) z = qa.online_policy;
   da.inform("privacy-user-presence-response");
  }
  ca().log("set_update_response", {
   data: qa,
   response: ra
  });
 }
 function la(qa, ra) {
  if (v !== x) ga(x);
  if (y !== z) ha(z);
  n(u, w);
  da.inform("privacy-changed");
  aa = [];
  ca().log("set_error_response", {
   data: qa,
   response: ra
  });
 }
 function ma(qa) {
  ba = false;
  if (aa.length > 0) {
   var ra = aa.shift();
   ia(ra.request, ra.data);
  }
 }
 function na(qa, ra) {
  if (m != null) {
   var sa = qa.getData();
   sa.window_id = m.getSessionID();
   qa.setData(sa);
  }
  qa.setHandler(ka.bind(this, ra)).setErrorHandler(la.bind(this, ra)).setTransportErrorHandler(la.bind(this, ra)).setFinallyHandler(ma.bind(this)).setAllowCrossPageTransition(true);
  return qa;
 }
 function oa(qa, ra, sa) {
  return na(new h(qa).setData(ra), sa);
 }
 function pa(qa, ra) {
  var sa = ra.obj;
  if (sa.viewer_id != j.getID()) {
   ca().error("invalid_viewer_for_channel_message", {
    type: qa,
    data: ra
   });
   throw new Error("Viewer got from the channel is not the real viewer");
  }
  if (sa.window_id === m.getSessionID()) return;
  var ta = sa.data;
  if (sa.event == "access_control_entry") {
   ta.target_ids.forEach(function(va) {
    fa(va, ta.setting);
    w[va] = ta.setting;
   });
  } else {
   if (sa.event == "visibility_update") {
    var ua = !!ta.visibility ? da.ONLINE : da.OFFLINE;
    ga(ua);
    x = ua;
   } else if (sa.event == "online_policy_update") {
    ha(ta.online_policy);
    z = ta.online_policy;
   }
   da.inform("privacy-user-presence-response");
  }
  ca().log("channel_message_received", {
   data: ra.obj
  });
 }
 n(da, {
  WHITELISTED: 1,
  BLACKLISTED: -1,
  UNLISTED: 0,
  ONLINE: 1,
  OFFLINE: 0,
  ONLINE_TO_WHITELIST: 0,
  ONLINE_TO_BLACKLIST: 1,
  init: function(qa, ra, sa) {},
  setVisibility: function(qa) {
   x = v;
   ga(qa);
   var ra = {
    visibility: qa
   }, sa = {
    type: s,
    visibility: qa
   }, ta = oa(q, ra, sa);
   ja(ta, sa);
   ca().log("set_visibility", {
    data: ra
   });
   return qa;
  },
  getVisibility: function() {
   return v;
  },
  setOnlinePolicy: function(qa) {
   z = y;
   ha(qa);
   var ra = {
    online_policy: qa
   }, sa = {
    type: t,
    online_policy: qa
   }, ta = oa(p, ra, sa);
   ja(ta, sa);
   ca().log("set_online_policy", {
    data: ra
   });
   return qa;
  },
  getOnlinePolicy: function() {
   return y;
  },
  getFriendVisibility: function(qa) {
   return u[qa] || da.UNLISTED;
  },
  isUserOffline: function() {
   return this.getVisibility() === da.OFFLINE;
  },
  allows: function(qa) {
   if (this.isUserOffline()) return false;
   var ra = this.getOnlinePolicy();
   return ra === da.ONLINE_TO_WHITELIST ? u[qa] == da.WHITELISTED : u[qa] != da.BLACKLISTED;
  },
  setFriendsVisibility: function(qa, ra) {
   if (qa.length > 0) {
    var sa = {};
    for (var ta = 0; ta < qa.length; ta++) {
     var ua = qa[ta];
     w[ua] = u[ua];
     sa[ua] = ra;
    }
    ea(sa);
    var va = ra;
    if (va == da.UNLISTED) va = w[qa[0]];
    var wa = {
     users: qa,
     setting: ra,
     setting_type: va
    }, xa = {
     type: r,
     settings: sa
    }, ya = oa(o, wa, xa);
    ja(ya, xa);
    ca().log("set_friend_visibility", {
     data: wa
    });
   }
   return ra;
  },
  setFriendVisibilityMap: function(qa, ra) {
   for (var sa in qa) w[sa] = u[sa];
   ea(qa);
   var ta = {
    type: r,
    settings: qa
   };
   ja(na(ra, ta), ta);
   ca().log("set_friend_visibility_from_map", {
    data: qa
   });
  },
  allow: function(qa) {
   if (this.allows(qa)) {
    ca().error("allow_already_allowed");
    throw new Error("allow() should only be called for users that " + "are not already allowed");
   }
   if (this.getVisibility() === da.OFFLINE) {
    ca().error("allow_called_while_offline");
    throw new Error("allow() should only be called when the user is already online");
   }
   var ra = this.getOnlinePolicy() === da.ONLINE_TO_WHITELIST ? da.WHITELISTED : da.UNLISTED;
   return this.setFriendsVisibility([ qa ], ra);
  },
  disallow: function(qa) {
   if (!this.allows(qa)) {
    ca().error("disallow_already_disallowed");
    throw new Error("disallow() should only be called for users that " + "are not already disallowed");
   }
   if (this.getVisibility() === da.OFFLINE) {
    ca().error("disallow_called_while_offline");
    throw new Error("disallow() should only be called when the user is already online");
   }
   var ra = this.getOnlinePolicy() === da.ONLINE_TO_BLACKLIST ? da.BLACKLISTED : da.UNLISTED;
   return this.setFriendsVisibility([ qa ], ra);
  },
  getBlacklist: function() {
   var qa = [];
   for (var ra in u) if (u[ra] === da.BLACKLISTED) qa.push(ra);
   return qa;
  },
  getWhitelist: function() {
   var qa = [];
   for (var ra in u) if (u[ra] === da.WHITELISTED) qa.push(ra);
   return qa;
  },
  getMapForTest: function() {
   return u;
  },
  setMapForTest: function(qa) {
   u = qa;
  }
 });
 da.inform("privacy-changed");
 da.inform("privacy-user-presence-changed", g.BEHAVIOR_STATE);
 ca().log("initialized", {
  visibility: v,
  policy: y
 });
 g.subscribe(l.DUMP_EVENT, function(qa, ra) {
  ra.presence_privacy = {
   initial: k.privacyData,
   current: u
  };
 });
 g.subscribe(i.getArbiterType("privacy_changed"), pa.bind(this));
 g.subscribe(i.ON_CONFIG, function(qa, ra) {
  var sa = ra.getConfig("visibility", null);
  if (sa !== null && typeof sa !== "undefined") {
   var ta = sa ? da.ONLINE : da.OFFLINE;
   ga(ta);
   ca().log("config_visibility", {
    vis: ta
   });
  }
 }.bind(this));
 a.PresencePrivacy = e.exports = da;
}, 3);

__d("ChatVisibility", [ "Arbiter", "JSLogger", "PresencePrivacy" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 var j = {
  isOnline: function() {
   return i.getVisibility() === i.ONLINE;
  },
  hasBlackbirdEnabled: function() {
   return this.isVisibleToMostFriends() || this.isVisibleToSomeFriends();
  },
  isVisibleToMostFriends: function() {
   return i.getOnlinePolicy() === i.ONLINE_TO_BLACKLIST && i.getBlacklist().length > 0;
  },
  isVisibleToSomeFriends: function() {
   return i.getOnlinePolicy() === i.ONLINE_TO_WHITELIST && i.getWhitelist().length > 0;
  },
  goOnline: function(k) {
   if (i.getVisibility() === i.OFFLINE) {
    h.create("blackbird").log("chat_go_online");
    i.setVisibility(i.ONLINE);
    g.inform("chat-visibility/go-online");
   }
   k && k();
  },
  goOffline: function(k) {
   if (i.getVisibility() === i.ONLINE) {
    h.create("blackbird").log("chat_go_offline");
    i.setVisibility(i.OFFLINE);
    g.inform("chat-visibility/go-offline");
   }
   k && k();
  },
  toggleVisibility: function() {
   if (j.isOnline()) {
    j.goOffline();
   } else j.goOnline();
  }
 };
 e.exports = j;
}, null);

__d("MovingStat", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 function g(h) {
  h = h || 6e4;
  var i = {
   t: new Date(),
   count: 0,
   v: 0
  }, j = i, k = 0, l = 0;
  function m() {
   var n = new Date() - h;
   while (j && j.next && j.t < n) {
    k -= j.v;
    l -= j.count;
    j = j.next;
   }
  }
  this.add = function(n) {
   k += n;
   l++;
   var o = new Date();
   if (o - i.t < 1e3) {
    i.v += n;
    i.count++;
   } else {
    i.next = {
     t: o,
     v: n,
     count: 1
    };
    i = i.next;
    m();
   }
  };
  this.tally = function(n) {
   n = n || 1e3;
   m();
   return {
    sum: k,
    count: l,
    timeAverage: k * n / h
   };
  };
 }
 e.exports = g;
}, null);

__d("Dcode", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 var g, h = {}, i = {
  _: "%",
  A: "%2",
  B: "000",
  C: "%7d",
  D: "%7b%22",
  E: "%2c%22",
  F: "%22%3a",
  G: "%2c%22ut%22%3a1",
  H: "%2c%22bls%22%3a",
  I: "%2c%22n%22%3a%22%",
  J: "%22%3a%7b%22i%22%3a0%7d",
  K: "%2c%22pt%22%3a0%2c%22vis%22%3a",
  L: "%2c%22ch%22%3a%7b%22h%22%3a%22",
  M: "%7b%22v%22%3a2%2c%22time%22%3a1",
  N: ".channel%22%2c%22sub%22%3a%5b",
  O: "%2c%22sb%22%3a1%2c%22t%22%3a%5b",
  P: "%2c%22ud%22%3a100%2c%22lc%22%3a0",
  Q: "%5d%2c%22f%22%3anull%2c%22uct%22%3a",
  R: ".channel%22%2c%22sub%22%3a%5b1%5d",
  S: "%22%2c%22m%22%3a0%7d%2c%7b%22i%22%3a",
  T: "%2c%22blc%22%3a1%2c%22snd%22%3a1%2c%22ct%22%3a",
  U: "%2c%22blc%22%3a0%2c%22snd%22%3a1%2c%22ct%22%3a",
  V: "%2c%22blc%22%3a0%2c%22snd%22%3a0%2c%22ct%22%3a",
  W: "%2c%22s%22%3a0%2c%22blo%22%3a0%7d%2c%22bl%22%3a%7b%22ac%22%3a",
  X: "%2c%22ri%22%3a0%7d%2c%22state%22%3a%7b%22p%22%3a0%2c%22ut%22%3a1",
  Y: "%2c%22pt%22%3a0%2c%22vis%22%3a1%2c%22bls%22%3a0%2c%22blc%22%3a0%2c%22snd%22%3a1%2c%22ct%22%3a",
  Z: "%2c%22sb%22%3a1%2c%22t%22%3a%5b%5d%2c%22f%22%3anull%2c%22uct%22%3a0%2c%22s%22%3a0%2c%22blo%22%3a0%7d%2c%22bl%22%3a%7b%22ac%22%3a"
 };
 (function() {
  var k = [];
  for (var l in i) {
   h[i[l]] = l;
   k.push(i[l]);
  }
  k.reverse();
  g = new RegExp(k.join("|"), "g");
 })();
 var j = {
  encode: function(k) {
   return encodeURIComponent(k).replace(/([_A-Z])|%../g, function(l, m) {
    return m ? "%" + m.charCodeAt(0).toString(16) : l;
   }).toLowerCase().replace(g, function(l) {
    return h[l];
   });
  },
  decode: function(k) {
   return decodeURIComponent(k.replace(/[_A-Z]/g, function(l) {
    return i[l];
   }));
  }
 };
 e.exports = j;
}, null);

__d("PresenceCookieManager", [ "Cookie", "CurrentUser", "Dcode", "ErrorUtils", "JSLogger", "PresenceInitialData", "PresenceUtil", "URI" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
 b.__markCompiled && b.__markCompiled();
 var o = l.cookieVersion, p = l.dictEncode, q = "presence", r = {}, s = null, t = null, u = k.create("presence_cookie");
 function v() {
  try {
   var z = g.get(q);
   if (s !== z) {
    s = z;
    t = null;
    if (z && z.charAt(0) == "E") z = i.decode(z.substring(1));
    if (z) t = JSON.parse(z);
   }
   if (t && (!t.user || t.user === h.getID())) return t;
  } catch (y) {
   u.warn("getcookie_error", y);
  }
  return null;
 }
 function w() {
  return parseInt(Date.now() / 1e3, 10);
 }
 var x = {
  register: function(y, z) {
   r[y] = z;
  },
  store: function() {
   var y = v();
   if (y && y.v && o < y.v) {
    u.debug("stale_cookie", o);
    return;
   }
   var z = {
    v: o,
    time: w(),
    user: h.getID()
   };
   for (var aa in r) z[aa] = j.applyWithGuard(r[aa], r, [ y && y[aa] ], function(ea) {
    ea.presence_subcookie = aa;
   });
   var ba = JSON.stringify(z);
   if (p) ba = "E" + i.encode(ba);
   if (m.hasUserCookie()) {
    var ca = ba.length;
    if (ca > 1024) u.warn("big_cookie", ca);
    var da = n.getRequestURI(false).isSecure() && !!g.get("csm");
    g.set(q, ba, null, null, da);
   }
  },
  clear: function() {
   g.clear(q);
  },
  getSubCookie: function(y) {
   var z = v();
   if (!z) return null;
   return z[y];
  }
 };
 e.exports = x;
}, null);

__d("PresenceState", [ "Arbiter", "ErrorUtils", "JSLogger", "PresenceCookieManager", "copyProperties", "debounceAcrossTransitions", "setIntervalAcrossTransitions", "PresenceInitialData" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
 b.__markCompiled && b.__markCompiled();
 var o = n.cookiePollInterval || 2e3, p = n.shouldSuppress || false, q = [], r = [], s = null, t = null, u = 0, v = null, w = 0, x = [ "sb2", "t2", "lm2", "uct2", "tr", "tw", "at", "wml" ], y = i.create("presence_state");
 function z() {
  return j.getSubCookie("state");
 }
 function aa() {
  u = Date.now();
  j.store();
  ea(t);
 }
 var ba = l(aa, 0);
 function ca(ja) {
  if (typeof ja == "undefined" || isNaN(ja) || ja == Number.POSITIVE_INFINITY || ja == Number.NEGATIVE_INFINITY) ja = 0;
  return ja;
 }
 function da(ja) {
  var ka = {};
  if (ja) {
   x.forEach(function(na) {
    ka[na] = ja[na];
   });
   if (u < ja.ut) y.error("new_cookie", {
    cookie_time: ja.ut,
    local_time: u
   });
  }
  ka.ut = u;
  for (var la = 0, ma = q.length; la < ma; la++) h.applyWithGuard(q[la], null, [ ka ]);
  t = ka;
  return t;
 }
 function ea(ja) {
  w++;
  u = ca(ja.ut);
  if (!s) s = m(ha, o);
  t = ja;
  if (v === null) v = ja;
  for (var ka = 0, la = r.length; ka < la; ka++) h.applyWithGuard(r[ka], null, [ ja ]);
  w--;
 }
 function fa(ja) {
  if (ja && ja.ut) if (u < ja.ut) {
   return true;
  } else if (ja.ut < u) y.error("old_cookie", {
   cookie_time: ja.ut,
   local_time: u
  });
  return false;
 }
 function ga() {
  var ja = z();
  if (fa(ja)) t = ja;
  return t;
 }
 function ha() {
  var ja = z();
  if (fa(ja)) ea(ja);
 }
 j.register("state", da);
 g.subscribe(i.DUMP_EVENT, function(ja, ka) {
  ka.presence_state = {
   initial: k({}, v),
   state: k({}, t),
   update_time: u,
   sync_paused: w,
   poll_time: o
  };
 });
 (function() {
  var ja = ga();
  if (ja) {
   ea(ja);
  } else {
   y.debug("no_cookie_initial");
   ea(da());
   return;
  }
 })();
 var ia = {
  doSync: function(ja) {
   if (w) return;
   if (ja) {
    aa();
   } else ba();
  },
  registerStateStorer: function(ja) {
   q.push(ja);
  },
  registerStateLoader: function(ja) {
   r.push(ja);
  },
  get: function() {
   return ga();
  },
  getInitial: function() {
   return v;
  },
  shouldSuppress: function() {
   return p;
  },
  verifyNumber: ca
 };
 e.exports = ia;
}, null);

__d("VideoCallSupport", [ "ChannelConstants", "ChatVisibility", "RTCConfig", "UserAgent" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 var k = {
  isSendWebrtcSupported: function() {
   return i.SendNewVCGK;
  },
  isReceiveWebrtcSupported: function() {
   return i.ReceiveNewVCGK;
  },
  isVideoInteropSupported: function() {
   return i.VideoInteropGK;
  },
  isVideoCallSupported: function() {
   return k.isSendWebrtcSupported();
  },
  isWebrtcSupported: function() {
   return j.isBrowser("Chrome >= 28") || j.isBrowser("Firefox >= 25") || j.isBrowser("Opera >= 20");
  },
  isOSSupported: function() {
   return !j.isPlatform("Android") && !j.isPlatform("iOS");
  },
  getCapabilities: function() {
   var l = 0;
   if (this.isReceiveWebrtcSupported() && h.isOnline()) l = g.CAPABILITY_VOIP_INTEROP;
   return l;
  }
 };
 e.exports = k;
}, null);

__d("RTISession", [ "URI", "AjaxRequest", "copyProperties", "invariant", "ErrorUtils" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var l = ".facebook.com";
 function m(n, o, p, q, r, s, t, u, v) {
  j(n);
  j(q);
  j(r);
  this.domain = n;
  this.port = o;
  this.edgePoolName = p;
  this.stickyToken = q;
  this.loggedInId = r;
  this.accountId = s;
  this.clientProfile = t || "desktop";
  this.clientId = u;
  this.capabilities = v;
 }
 m.prototype.issueRequest = function(n, o, p, q, r) {
  j(n);
  j(o);
  j(q);
  var s = this.domain.length - l.length, t = s > 0 && this.domain.indexOf(l, s) !== -1, u = t ? this.domain : this.domain + l, v = (1048576 * Math.random() | 0).toString(36), w = {
   cb: v,
   sticky_token: this.stickyToken,
   uid: this.loggedInId,
   viewer_uid: this.accountId,
   sticky_pool: this.edgePoolName,
   profile: this.clientProfile,
   clientid: this.clientId,
   cap: this.capabilities
  };
  for (var x in w) j(!o[x]);
  i(w, o);
  var y = new g(n).setDomain(u).setPort(this.port).setSecure(g().isSecure()).setQueryData(w), z = p ? "POST" : "GET", aa = new h(z, y);
  aa.timeout = r ? r * 1e3 : 3e4;
  if (aa.xhr) aa.xhr.withCredentials = true;
  var ba = {};
  aa.onSuccess = function() {};
  aa.onJSON = function() {
   ba.data = aa.json;
   ba.error = null;
   k.applyWithGuard(q, this, [ ba ]);
  }.bind(this);
  aa.onError = function() {
   ba.data = null;
   ba.error = aa.errorType || "error";
   k.applyWithGuard(q, this, [ ba ]);
  }.bind(this);
  aa.send(JSON.stringify(p));
 };
 e.exports = m;
}, null);

__d("ChannelManager", [ "AjaxRequest", "Arbiter", "AsyncRequest", "ChannelConstants", "ChannelInitialData", "ChannelSubdomain", "ChannelTransport", "ChatVisibility", "DTSG", "Env", "FBAjaxRequest", "ISB", "JSLogger", "MessagingRealtimeConstants", "MovingStat", "PresenceCookieManager", "PresenceState", "PresenceUtil", "SystemEvents", "URI", "UserActivity", "VideoCallSupport", "RTISession", "copyProperties", "createArrayFromMixed", "setIntervalAcrossTransitions", "setTimeoutAcrossTransitions", "WebStorage" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba, ca, da, ea, fa, ga) {
 b.__markCompiled && b.__markCompiled();
 var ha = b("WebStorage").getSessionStorage(), ia = "chproxy_base_sess", ja, ka = s.create("channel"), la = null;
 function ma(ya) {
  la = ya;
 }
 var na = {
  idle: {
   ok: "init!"
  },
  init: {
   ok: "pull!",
   error: "reconnect",
   sys_online: "init",
   sys_timetravel: "init"
  },
  pull: {
   ok: "pull!",
   error: "ping",
   error_missing: "pull",
   error_msg_type: "pull",
   refresh_0: "reconnect",
   refresh_110: "reconnect",
   refresh_111: "reconnect",
   refresh_112: "pull",
   refresh_113: "pull",
   refresh_117: "reconnect"
  },
  ping: {
   ok: "pull!",
   error: "ping",
   error_stale: "reconnect!"
  },
  reconnect: {
   ok: "init!",
   error: "reconnect",
   sys_online: "reconnect",
   sys_timetravel: "reconnect"
  },
  shutdown: {},
  _all: {
   error_max: "shutdown!",
   error_shutdown: "shutdown!",
   sys_owner: "reconnect",
   sys_nonowner: "idle!",
   sys_online: "ping",
   sys_offline: "idle!",
   sys_timetravel: "ping"
  }
 }, oa = {
  reconnectOverrideTimeMillis: Date.now(),
  userActive: Date.now(),
  lastPresenceState: null,
  lastRequestErrorReason: null,
  estimatedReceived: 0,
  fantail_logs: [],
  sessionID: (Math.random() * 2147483648 | 0).toString(16),
  capabilities: ba.getCapabilities(),
  streamingCapable: false,
  inStreaming: false,
  shouldSuppressPresence: w.shouldSuppress(),
  LONGPOLL_TIMEOUT: 6e4,
  STREAMING_TIMEOUT: 6e4,
  P_TIMEOUT: 3e4,
  IFRAME_LOAD_TIMEOUT: 3e4,
  MIN_RETRY_INTERVAL: 5e3,
  MAX_RETRY_INTERVAL: 32e4,
  MIN_12002_TIMEOUT: 9e3,
  MIN_504_TIMEOUT: 2e4,
  STALL_THRESHOLD: 18e4,
  JUMPSTART_THRESHOLD: 9e4,
  MIN_INIT_PROBE_DELAY: 3e3,
  INIT_PROBE_DELAY_RANDOMIZE_RANGE: 12e3,
  CHANNEL_PROXY_REPORTING_MIN_INTERVAL: 1e4,
  PROBE_DELAY: 6e4,
  PROBE_HEARTBEATS_INTERVAL_LOW: 1e3,
  PROBE_HEARTBEATS_INTERVAL_HIGH: 5e3,
  STREAMING_EXIT_STATE_ON_CONTINUE: false,
  FANTAIL_QUEUE_CAPACITY: 50
 }, pa = {
  MAX_CONTINUOUS_PULL_FAILS: 3,
  enabled: false,
  uptimeMillis: Date.now(),
  timeInGoodStatesStartMillis: Date.now(),
  timeInGoodStatesMillis: 0,
  initialized: false,
  firstPullSentTimeMillis: Date.now(),
  accumulatedPullTimeMillis: 0,
  pullStartTimeMillis: 0,
  pingCount: 0,
  pullCount: 0,
  continuousPullFails: 0,
  getTimeSinceFirstPullSentSeconds: function() {
   return (Date.now() - this.firstPullSentTimeMillis) / 1e3;
  },
  getUptimeSeconds: function() {
   return (Date.now() - this.uptimeMillis) / 1e3;
  },
  getAccumulatedPullTimeSeconds: function() {
   var ya = this.accumulatedPullTimeMillis, za = Date.now();
   if (this.pullStartTimeMillis > 0 && za - this.pullStartTimeMillis <= oa.LONGPOLL_TIMEOUT) ya += za - this.pullStartTimeMillis;
   var ab = ya / 1e3;
   if (ab >= this.getTimeSinceFirstPullSentSeconds()) this.initialize();
   return ab;
  },
  getPingToPullRatio: function() {
   return this.pullCount === 0 ? 0 : this.pingCount / this.pullCount;
  },
  reportPullSent: function() {
   if (!this.enabled) return;
   if (!this.initialized) this.initialize();
   this.pullStartTimeMillis = Date.now();
  },
  initialize: function() {
   this.initialized = true;
   this.firstPullSentTimeMillis = Date.now();
   this.pullStartTimeMillis = 0;
   this.accumulatedPullTimeMillis = 0;
   this.pingCount = 0;
   this.pullCount = 0;
   this.timeInGoodStatesStartMillis = Date.now();
   this.timeInGoodStatesMillis = 0;
   this.uptimeMillis = Date.now();
  },
  reportPullReturned: function(ya, za) {
   if (!this.enabled) return;
   if (this.pullStartTimeMillis > 0) {
    this.accumulatedPullTimeMillis += Date.now() - this.pullStartTimeMillis;
    if (ya) {
     this.pullCount++;
     this.continuousPullFails = 0;
    } else this.continuousPullFails++;
   }
   this.pullStartTimeMillis = 0;
  },
  reportPingSent: function() {
   if (!this.enabled) return;
   this.pingCount++;
  },
  isGoodState: function(ya) {
   return ya.indexOf("pull") === 0 || ya.indexOf("init") === 0 || ya.indexOf("idle") === 0;
  },
  getTotalTimeInGoodStatesSeconds: function() {
   var ya = this.timeInGoodStatesMillis;
   if (this.timeInGoodStatesStartMillis > 0) ya += Date.now() - this.timeInGoodStatesStartMillis;
   return ya / 1e3;
  },
  clientEnteredState: function(ya) {
   if (!this.enabled) return;
   var za = this.isGoodState(ya);
   if (za && this.timeInGoodStatesStartMillis === 0) {
    this.timeInGoodStatesStartMillis = Date.now();
   } else if (!za && this.timeInGoodStatesStartMillis > 0) {
    this.timeInGoodStatesMillis = Date.now() - this.timeInGoodStatesStartMillis;
    this.timeInGoodStatesStartMillis = 0;
   }
  },
  transportEnteredState: function(ya) {
   if (!this.enabled) return;
   if (ya.indexOf("pull") === 0) {
    this.reportPullSent();
   } else if (ya.indexOf("ping") === 0 && oa.lastRequestErrorReason !== j.SYS_TIMETRAVEL && oa.lastRequestErrorReason !== j.SYS_ONLINE && oa.lastRequestErrorReason !== j.SYS_OWNER && oa.lastRequestErrorReason !== j.SYS_NONOWNER) this.reportPingSent();
  },
  doSerialize: function() {
   if (!this.enabled) return "";
   return this.getTimeSinceFirstPullSentSeconds().toFixed(0) + "," + this.getAccumulatedPullTimeSeconds().toFixed(0) + "," + this.getPingToPullRatio().toFixed(3) + "," + this.getUptimeSeconds().toFixed(0) + "," + this.getTotalTimeInGoodStatesSeconds().toFixed(0);
  }
 }, qa = 1, ra = {}, sa = 0;
 function ta() {
  return i.lastSuccessTime ? Math.round((Date.now() - i.lastSuccessTime) / 1e3) : -1;
 }
 function ua() {
  var ya = {};
  if (ja.getConfig("host")) ya[ja.getConfig("user_channel")] = ja.getConfig("seq", 0);
  return ya;
 }
 function va() {
  var ya = Date.now(), za = Date.now(), ab = {
   total: 0
  }, bb = "idle", cb = false;
  y.subscribe([ y.USER, y.ONLINE, y.TIME_TRAVEL ], function(fb, gb) {
   xa(true);
   za = null;
   ja.lastPullTime = Date.now();
   var hb;
   switch (fb) {
   case y.USER:
    hb = y.isPageOwner() ? j.SYS_OWNER : j.SYS_NONOWNER;
    break;

   case y.ONLINE:
    hb = gb ? j.SYS_ONLINE : j.SYS_OFFLINE;
    break;

   case y.TIME_TRAVEL:
    hb = j.SYS_TIMETRAVEL;
    break;
   }
   ja.exitState({
    status: hb,
    stateId: qa
   });
  });
  var db = function(fb, gb) {
   var hb = Date.now(), ib;
   if (gb) {
    ya = hb;
    ib = gb.nextState || gb.state;
   } else ib = bb;
   y.checkTimeTravel();
   if (za) {
    var jb = Math.round((hb - za) / 1e3);
    if (jb > 0) {
     ab[bb] = (ab[bb] || 0) + jb;
     ab.total += jb;
    }
   }
   bb = ib;
   za = hb;
   if (!fb) {
    ab.lastSuccessTime = ta();
    ab.online = y.isOnline();
    ka.log("rollup", ab);
   }
  };
  h.subscribe(j.ON_ENTER_STATE, db);
  fa(db, 6e4);
  h.subscribe(s.DUMP_EVENT, function(fb, gb) {
   gb.channelRollup = ab;
  });
  var eb = function() {
   if (ja.isShutdown() || ja.shouldIdle()) return;
   y.checkTimeTravel();
   var fb = Date.now() - (ja.lastPullTime || p.start);
   if (!cb && fb > oa.STALL_THRESHOLD) {
    var gb = ta();
    ka.error("stall", {
     lastSuccessTime: gb,
     rollupState: bb
    });
    cb = true;
   }
   var hb = Date.now() - ya;
   if (ja.state == "pull" && hb > oa.JUMPSTART_THRESHOLD) {
    ya = null;
    ka.warn("jumpstart", {
     state: ja.state,
     dormant: hb
    });
    ja.enterState("init");
   }
  };
  fa(eb, 1e4);
 }
 function wa() {
  var ya = Date.now(), za = 1;
  function ab() {
   ga(ab, za * 1e3);
   var fb = ja.state;
   if (fb == "idle" && ja.shouldIdle()) return;
   ka.bump("conn_t", za);
   if (fb == "pull") ka.bump("conn_t_pull", za);
  }
  ab();
  var bb = [ 15, 30, 60, 120, 240 ], cb = false, db = false;
  function eb(fb) {
   ga(function() {
    ka.rate("pullenter_" + fb, cb);
    ka.rate("pullexit_" + fb, db);
   }, fb * 1e3);
  }
  while (bb.length) eb(bb.shift());
  h.subscribe(j.ON_ENTER_STATE, function(fb, gb) {
   if (gb.state == "pull") cb = true;
   ya = Date.now();
  });
  h.subscribe(j.ON_EXIT_STATE, function(fb, gb) {
   if (gb.state != "pull" || !ya) return;
   var hb = "other";
   if (gb.status == j.OK) {
    db = true;
    hb = "ok";
   } else if (gb.xhr && gb.xhr.errorType) {
    hb = /ar:(\w+)/.test(gb.xhr.errorType) && RegExp.$1;
   } else if (/^sys_/.test(gb.status)) return;
   var ib = (Date.now() - ya) / 1e3;
   if (ib < 0) {
    return;
   } else if (ib > 3600) ib = 3600;
   ka.bump("conn_num");
   ka.bump("conn_exit", ib);
   ka.bump("conn_num_" + hb);
   ka.bump("conn_exit_" + hb, ib);
  });
 }
 function xa(ya) {
  if (ya) {
   sa = 0;
   ra = {};
  } else sa++;
 }
 ja = {
  state: "idle",
  nextState: null,
  proxyDown: false,
  lastPullTime: Date.now(),
  lastReportOnMisguidedMsgTime: Date.now(),
  heartbeats: [],
  setTestCallback: ma,
  backoff: false,
  init: function(ya) {
   this.init = function() {};
   this._logFantail("client initialized", j.FANTAIL_INFO);
   var za = !!oa.use_sticky_session, ab = null;
   if (za && ha) {
    for (var bb = 0; bb < ha.length; bb++) {
     var cb = ha.key(bb);
     if (cb.indexOf(ia) === 0) {
      ab = ha.getItem(cb);
      break;
     }
    }
    if (!ab) {
     ab = oa.sessionID;
     ha.setItem(ia, ab);
    }
   }
   pa.enabled = !!oa.watchdog_enabled;
   oa.watchdog = pa;
   if (typeof aa != "undefined") {
    aa.subscribe(function() {
     oa.userActive = Date.now();
     m.sendActivePing(oa);
    }.bind(this));
   } else ka.error("user_activity_undefined");
   v.register("ch", ua);
   var db = this.getConfig("max_conn", 2);
   oa.subdomain = l.allocate(db);
   if (ab && ab.length && ab.trim()) oa.sessionID = ab;
   this._logFantail("using session id: " + oa.sessionID, j.FANTAIL_INFO);
   this._transportRate = new u(3e4);
   var eb = g.supportsCORS() && !oa.forceIframe ? "CORSTransport" : "IframeTransport";
   this.transport = new m[eb](this);
   if (ya) this.enterState.apply(this, arguments);
   h.subscribe(s.DUMP_EVENT, function(event, gb) {
    gb.transportRate = this._transportRate.tally();
    gb.transportType = eb;
    gb.transportVersion = 2;
   }.bind(this));
   va();
   wa();
   if (ja.getConfig("tryStreaming") && ja.getConfig("host") && g.supportsCORS() && !oa.forceIframe) {
    var fb = oa.MIN_INIT_PROBE_DELAY + Math.random() * oa.INIT_PROBE_DELAY_RANDOMIZE_RANGE;
    ga(this._probeTest, fb);
   }
  },
  configure: function() {
   var ya = ea(arguments);
   ka.log("configure", ya);
   ya.forEach(da.bind(null, oa));
   h.inform(j.ON_CONFIG, this);
  },
  getConfig: function(ya, za) {
   return ya in oa ? oa[ya] : za;
  },
  getCompleteConfig: function() {
   return oa;
  },
  getWatchdog: function() {
   return pa;
  },
  isShutdown: function() {
   return this.state == "shutdown";
  },
  shouldIdle: function() {
   return !(y.isPageOwner() && y.isOnline());
  },
  _sendIframeError: function(ya) {
   var za = new i().setURI("/ajax/presence/reconnect.php").setData({
    reason: ya,
    fb_dtsg: o.getToken()
   }).setOption("suppressErrorHandlerWarning", true).setOption("retries", 1).setMethod("GET").setReadOnly(true).setAllowCrossPageTransition(true);
   za.specifiesWriteRequiredParams() && za.send();
  },
  _getDelay: function() {
   var ya = Math.min(oa.MIN_RETRY_INTERVAL * Math.pow(2, Math.max(0, sa - 1)), oa.MAX_RETRY_INTERVAL);
   if (this.proxyDown && "proxy_down_delay_millis" in oa) ya = oa.proxy_down_delay_millis;
   this.proxyDown = false;
   return Math.floor(ya * (1 + Math.random() * .5));
  },
  enterState: function() {
   if (this._inEnterState) ka.warn("enterstate_recursion");
   this._inEnterState = true;
   try {
    this._enterState.apply(this, arguments);
    this._inEnterState = false;
   } catch (ya) {
    this._inEnterState = false;
    throw ya;
   }
  },
  _enterState: function(ya) {
   if ((ya.indexOf("pull") === 0 || ya.indexOf("ping") === 0 || ya.indexOf("shutdown") === 0) && !!oa.active_config_refresh) {
    var za = Date.now(), ab = (za - oa.reconnectOverrideTimeMillis) / 1e3;
    if ("config_refresh_seconds" in oa && oa.config_refresh_seconds > 0 && ab > oa.config_refresh_seconds) {
     ya = "reconnect";
     this._logFantail("forcing reconnect to refresh config" + " - this is normal behavior", j.FANTAIL_DEBUG);
    }
   }
   if (ya.indexOf("reconnect") === 0) oa.reconnectOverrideTimeMillis = Date.now();
   var bb = this.backoff ? this._getDelay() : 0;
   this.backoff = false;
   var cb = ea(arguments);
   if (this.isShutdown()) {
    this._logFantail("not executing state due to shutdown mode: " + ya, j.FANTAIL_WARN);
    return;
   }
   if (ya != "idle!" && this.shouldIdle()) {
    this._logFantail("forced idleness", j.FANTAIL_WARN);
    return;
   }
   qa++;
   oa.stateId = qa;
   clearTimeout(this._deferredTransition);
   this._deferredTransition = null;
   this.transport.enterState("idle");
   this.state = "idle";
   this.nextState = null;
   if (/!$/.test(ya)) {
    var db = this._transportRate.tally().timeAverage, eb = ja.getConfig("MAX_CHANNEL_STATES_PER_SEC", 1);
    if (db >= eb) {
     if (!this._throttled) {
      this._throttled = true;
      ka.warn("throttled");
     }
     ka.bump("throttle");
     bb = 1e3 / eb;
    }
   } else if (!/#$/.test(ya)) bb = this._getDelay();
   ya = ya.replace(/\W*$/, "");
   if (!na[ya]) {
    this._logFantail("invalid state: " + ya, j.FANTAIL_ERROR);
    throw new Error("invalid state:" + ya);
   }
   var fb;
   if (bb <= 0) {
    fb = {
     state: ya
    };
    this._transportRate.add(1);
    this.state = ya;
    var gb = this["_enter_" + this.state];
    if (gb) {
     cb.shift();
     gb.apply(this, cb);
    }
    if (/init|idle|pull|ping/.test(this.state)) {
     if (oa.streamingCapable && /pull/.test(this.state)) this.heartbeats = [];
     pa.transportEnteredState(ya);
     pa.clientEnteredState(ya);
     oa.is_offline = !n.isOnline();
     oa.capabilities = ba.getCapabilities();
     this._logFantail("entering transport state: " + this.state, j.FANTAIL_INFO);
     this.transport.enterState(this.state, oa);
     if (this.state == "ping") {
      fb.url = m.getURI(oa).toString();
      fb.port = oa.port || "undefined";
     }
    }
   } else {
    this.state = "idle";
    this.nextState = ya;
    fb = {
     state: this.state,
     delay: bb,
     nextState: ya
    };
    cb[0] = ya + "#";
    this._deferredTransition = ga(function() {
     this._deferredTransition = null;
     this.enterState.apply(this, cb);
    }.bind(this), bb);
   }
   if (/pull/.test(ya)) {
    fb.client_id = oa.sessionID;
    fb.streaming = oa.inStreaming;
   }
   ka.log("enter_" + this.state, fb);
   h.inform(j.ON_ENTER_STATE, fb);
  },
  exitState: function(ya, za) {
   var ab = ya.stateId, bb = ya.status;
   if ((bb == j.SYS_TIMETRAVEL || bb == j.SYS_ONLINE || bb == j.SYS_NONOWNER || bb == j.SYS_OWNER) && pa) pa.initialize();
   if (this.isShutdown() || ab < qa) return;
   var cb = ea(arguments), db = this.state;
   cb[0] = ya.status;
   var eb = {
    state: db,
    status: bb
   };
   if (/pull/.test(db)) {
    eb.client_id = oa.sessionID;
    eb.streaming = oa.inStreaming;
   }
   if (/ping/.test(db) && bb != j.OK) eb.url = m.getURI(oa).toString();
   if (this.nextState) eb.nextState = this.nextState;
   if (za && za.errorType) {
    oa.lastRequestErrorReason = za.errorType;
    eb.xhr = za.toJSON ? za.toJSON() : za;
    if (za.errorType == g.SERVICE_UNAVAILABLE) {
     this._logFantail("got 5xx http status code, setting long delay", j.FANTAIL_ERROR);
     this.proxyDown = true;
    }
    delete eb.xhr.json;
   } else if (bb != j.OK) oa.lastRequestErrorReason = bb;
   if (za && za.json) {
    if (za.json.t) eb.t = za.json.t;
    if (za.json.reason) eb.reason = za.json.reason;
    if (za.json.seq) eb.seq = za.json.seq;
   }
   ka.log("exit_" + db, eb);
   h.inform(j.ON_EXIT_STATE, eb);
   var fb = this["_exit_" + db];
   if (fb) bb = fb.apply(this, cb) || bb;
   if (bb != j.OK) {
    xa();
    ra[db] = (ra[db] || 0) + 1;
   }
   var gb = na[this.nextState || db][bb] || na._all[bb], hb = gb && gb.replace(/!*$/, "");
   if (!hb) {
    ka.error("terminal_transition", eb);
    this._shutdownHint = j.HINT_INVALID_STATE;
    gb = "shutdown!";
    this._logFantail("entering shutdown state", j.FANTAIL_ERROR);
   }
   this._lastState = db;
   this._lastStatus = bb;
   this.enterState(gb);
  },
  _processTransportData: function(ya, za) {
   var ab = za.json, bb = ab.t;
   if ("s" in ab) {
    ab.seq = ab.s;
    delete ab.s;
   }
   if (ab.u && oa.user && ab.u != oa.user) {
    ka.warn("misguided_msg", {
     user: oa.user,
     target: ab.u
    });
    this._reportProxyMisguidedMsg(ab.u, oa.user);
    return;
   }
   var cb = oa.seq;
   if ("seq" in ab) {
    oa.seq = ab.seq;
    w.doSync();
   }
   switch (bb) {
   case "continue":
    if (oa.inStreaming && this.heartbeats.length < 1) {
     oa.streamingCapable = false;
     ka.log("switch_to_longpoll");
     ga(this._probeTest, oa.PROBE_DELAY);
    }
    xa(true);
    if (!oa.inStreaming || oa.STREAMING_EXIT_STATE_ON_CONTINUE) this.exitState({
     status: j.OK,
     stateId: ya
    });
    break;

   case "refresh":
   case "refreshDelay":
    this._logFantail("got refresh with reason: " + ab.reason, j.FANTAIL_INFO);
    this.exitState({
     status: "refresh_" + (ab.reason || 0),
     stateId: ya
    }, za);
    break;

   case "backoff":
    this._logFantail("server told client to back off", j.FANTAIL_WARN);
    xa();
    this.backoff = true;
    break;

   case "lb":
    var db = ab.lb_info;
    oa.estimatedReceived = 0;
    if (db) {
     oa.sticky_token = db.sticky;
     if ("pool" in db) {
      oa.sticky_pool = db.pool;
     } else oa.host = db.vip;
     if (g.supportsCORS() && !oa.forceIframe) {
      var eb = oa.subdomain === null ? oa.host : oa.subdomain + "-" + oa.host, fb = new ca(eb, oa.port, oa.sticky_pool, oa.sticky_token, oa.uid, oa.viewer_uid, oa.profile, oa.sessionID, oa.capabilities);
      h.inform(j.RTI_SESSION, fb);
     }
    } else ka.error("bad lb info");
    break;

   case "test_streaming":
    ga(this._probeTest, 500);
    break;

   case "fullReload":
    v.clear();
    ka.log("invalid_history");
    h.inform(j.ON_INVALID_HISTORY);
    xa(true);
    this._logFantail("full reload incurred", j.FANTAIL_INFO);
    this.exitState({
     status: j.ERROR_MISSING,
     stateId: ya
    }, za);
    break;

   case "msg":
    var gb, hb, ib, jb;
    xa(true);
    if ("tr" in ab) oa.trace_id = ab.tr;
    hb = ab.ms;
    ib = oa.seq - hb.length;
    for (gb = 0; gb < hb.length; gb++, ib++) {
     oa.estimatedReceived++;
     if (ib >= cb) {
      jb = hb[gb];
      if (jb.type) {
       var kb = j.getArbiterType(jb.type);
       if (jb.type === "messaging") {
        var lb = {
         type: "messaging",
         event: jb.event
        };
        if (jb.message) {
         lb.inbox_unread = jb.unread_counts && jb.unread_counts.inbox;
         lb.tid = jb.message.tid;
         lb.mid = jb.message.mid;
         this._logFantail("got message with id: " + jb.message.mid, j.FANTAIL_INFO);
        }
        ka.debug("message", lb);
       } else if (jb.type === "m_messaging") {
        ka.debug("message", {
         type: "m_messaging",
         tid: jb.tid,
         mid: jb.uuid
        });
       } else if (jb.type === "pages_messaging") {
        if (jb.unread_counts && jb.unread_counts.inbox) h.inform(j.getArbiterType("pages_inbox_count_update"), {
         page_id: jb[t.VIEWER_FBID],
         inbox_unread: jb.unread_counts.inbox
        });
       } else if (jb.type === "skywalker") {
        kb = j.SKYWALKER;
       } else ka.debug("message", {
        type: jb.type
       });
       h.inform(kb, {
        obj: jb
       });
      }
     } else ka.warn("seq_regression", {
      seq: ib,
      last_seq: cb,
      messages: hb.length
     });
    }
    break;

   case "heartbeat":
    if (oa.inStreaming) {
     var mb = Date.now();
     if (this.heartbeats.length > 0) {
      var nb = mb - this.heartbeats[this.heartbeats.length - 1];
      ka.log("heartbeat_interval", {
       client_id: oa.sessionID,
       interval: nb
      });
     }
     this.heartbeats.push(mb);
    }
    break;

   default:
    this._logFantail("got an unknown protocol message: " + bb, j.FANTAIL_ERROR);
    ka.error("unknown_msg_type", {
     type: bb
    });
    break;
   }
  },
  _enter_init: function() {
   if (ra.init >= ja.getConfig("MAX_INIT_FAILS", 2)) return setTimeout(this.exitState.bind(this, {
    status: j.ERROR_MAX,
    stateId: qa
   }), 0);
   this._initTimer = ga(this.exitState.bind(this, {
    status: j.ERROR,
    stateId: qa
   }, "timeout"), oa.IFRAME_LOAD_TIMEOUT);
  },
  _enter_reconnect: function(ya) {
   this._logFantail("entered reconnect with reason: " + ya, j.FANTAIL_INFO);
   var za = qa;
   if (!x.hasUserCookie()) {
    this._logFantail("user has no cookie???", j.FANTAIL_WARN);
    ka.warn("no_user_cookie");
    setTimeout(function() {
     ja._shutdownHint = j.HINT_AUTH;
     ja.exitState({
      status: j.ERROR_SHUTDOWN,
      stateId: za
     });
    }, 0);
    return;
   }
   var ab = {
    reason: ya,
    fb_dtsg: o.getToken()
   };
   if (r.token) ab.fb_isb = r.token;
   if (la) la(ab);
   var bb = new q("GET", "/ajax/presence/reconnect.php", ab);
   bb.onSuccess = function() {
    ja.configure(bb.json);
    v.store();
    this.exitState({
     status: j.OK,
     stateId: za
    });
   }.bind(this);
   bb.onError = function() {
    var cb = bb.json && bb.json.error;
    this._logFantail("reconnect error: " + bb.errorType, j.FANTAIL_ERROR);
    if (bb.errorType == g.TRANSPORT_ERROR || bb.errorType == g.PROXY_ERROR || bb.errorType == g.SERVICE_UNAVAILABLE) this._shutdownHint = j.HINT_CONN;
    if (cb && cb == 1356007) {
     this._shutdownHint = j.HINT_MAINT;
    } else if (cb == 1357001 || cb == 1357004 || cb == 1348009) {
     this._shutdownHint = j.HINT_AUTH;
    } else this._shutdownHint = null;
    this.exitState({
     status: this._shutdownHint ? j.ERROR_SHUTDOWN : j.ERROR,
     stateId: za
    }, bb);
   }.bind(this);
   bb.send();
  },
  _enter_shutdown: function() {
   h.inform(j.ON_SHUTDOWN, {
    reason: this._shutdownHint
   });
   if (!!oa.shutdown_recovery_enabled && "shutdown_recovery_interval_seconds" in oa && oa.shutdown_recovery_interval_seconds > 0) {
    var ya = oa.shutdown_recovery_interval_seconds * 1e3;
    ga(function() {
     h.inform(j.ATTEMPT_RECONNECT);
     this.state = "reconnect!";
     this.enterState("reconnect!");
    }.bind(this), ya);
   }
  },
  _exit_init: function(ya) {
   if (this._initTimer) this._initTimer = clearTimeout(this._initTimer);
   if (ya == j.ERROR_MAX) this._sendIframeError(j.reason_IFrameLoadGiveUp);
  },
  _exit_pull: function(ya, za) {
   var ab = ya == j.OK;
   pa.reportPullReturned(ab, this);
   if (ab) {
    this.lastPullTime = Date.now();
   } else {
    var bb = "exit status: " + ya;
    if (za && za.errorType) bb += " ajax request error: " + za.errorType;
    this._logFantail("pull failed with status: " + bb, j.FANTAIL_ERROR);
   }
  },
  _exit_ping: function(ya) {
   if (ya == j.OK) {
    var za = Date.now() - (this.lastPullTime || p.start);
    if (za > oa.STALL_THRESHOLD) {
     this._logFantail("didnt complete a successful pull for too long", j.FANTAIL_ERROR);
     return j.ERROR_STALE;
    }
   } else this._logFantail("ping failed with status: " + ya, j.FANTAIL_ERROR);
  },
  _reportProxyMisguidedMsg: function(ya, za) {
   this._logFantail("misguided message to " + za + " meant for " + ya, j.FANTAIL_ERROR);
   var ab = Date.now();
   if (ab - this.lastReportOnMisguidedMsgTime <= oa.CHANNEL_PROXY_REPORTING_MIN_INTERVAL) return;
   this.lastReportOnMisguidedMsgTime = ab;
   var bb = {
    received_uid: ya,
    expected_uid: za
   };
   if (oa.sticky_token) bb.sticky_token = oa.sticky_token;
   var cb = new z("/err_misguided_msg").setDomain(oa.host + "." + oa.domain).setPort(oa.port).setSecure(z().isSecure()).setQueryData(bb), db = new g("GET", cb);
   if (g.supportsCORS()) db.xhr.withCredentials = true;
   db.onSuccess = function(eb) {};
   db.onError = function(eb) {};
   db.onJSON = function(eb, fb) {};
   db.send();
  },
  _probeTest: function() {
   oa.streamingCapable = false;
   var ya = [], za = {
    mode: "stream",
    format: "json"
   };
   if (oa.sticky_token) za.sticky_token = oa.sticky_token;
   var ab = new z("/probe").setDomain(oa.host + "." + oa.domain).setPort(oa.port).setSecure(z().isSecure()).setQueryData(za), bb = new g("GET", ab);
   bb.onJSON = function(cb, db) {
    if (cb && cb.json && cb.json.t === "heartbeat") {
     ya.push(Date.now());
     if (ya.length >= 2) {
      var eb = ya[1] - ya[0];
      if (eb >= oa.PROBE_HEARTBEATS_INTERVAL_LOW && eb <= oa.PROBE_HEARTBEATS_INTERVAL_HIGH) {
       oa.streamingCapable = true;
       ka.log("switch_to_streaming");
      }
      ka.log("probe_ok", {
       time: eb
      });
     }
    }
   };
   bb.onSuccess = function(cb) {
    if (ya.length != 2) {
     oa.streamingCapable = false;
     ka.error("probe_error", {
      error: "beats.length = " + ya.length
     });
    }
   };
   bb.onError = function(cb) {
    oa.streamingCapable = false;
    ka.error("probe_error", cb);
   };
   ka.log("probe_request");
   bb.send();
  },
  _logFantail: function(ya, za) {
   var ab = oa.fantail_queue_capacity || oa.FANTAIL_QUEUE_CAPACITY;
   if (!oa.fantail_enabled || oa.fantail_logs.length > ab) return;
   var bb = "fantail queue size exceeded", cb = j.FANTAIL_WARN;
   if (oa.fantail_logs.length < ab) {
    bb = ya;
    cb = za;
   }
   var db = oa.fantail_logs.length, eb = {};
   eb["time" + db] = Date.now();
   eb["log" + db] = bb;
   eb["severity" + db] = cb;
   oa.fantail_logs.push(eb);
  }
 };
 e.exports = ja;
 if (k.channelConfig) {
  ja.configure(k.channelConfig);
  if (/shutdown/.test(k.state)) ja._shutdownHint = j[k.reason];
  ja.init(k.state, k.reason);
 }
}, null);

__d("ChannelConnection", [ "Arbiter", "copyProperties", "ChatConfig", "Run", "SystemEvents", "ChannelConstants", "ChannelManager", "JSLogger", "setTimeoutAcrossTransitions" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
 b.__markCompiled && b.__markCompiled();
 var p = n.create("channel_connection"), q = null, r = null, s = null, t = null, u = 0, v = h(new g(), {
  CONNECTED: "chat-connection/connected",
  RECONNECTING: "chat-connection/reconnecting",
  SHUTDOWN: "chat-connection/shutdown",
  MUTE_WARNING: "chat-connection/mute",
  UNMUTE_WARNING: "chat-connection/unmute"
 });
 function w() {
  if (r) {
   clearTimeout(r);
   r = null;
  }
 }
 function x() {
  w();
  p.log("unmute_warning");
  v.inform(v.UNMUTE_WARNING);
 }
 function y(ba) {
  w();
  r = o(x, ba);
  p.log("mute_warning", {
   time: ba
  });
  v.inform(v.MUTE_WARNING);
 }
 function z() {
  if (s) {
   clearTimeout(s);
   s = null;
  }
 }
 function aa(ba, ca) {
  z();
  if (ba === l.ON_ENTER_STATE && (ca.nextState || ca.state) === "pull") {
   if (t !== v.CONNECTED) {
    p.log("connected");
    var da = !t;
    t = v.CONNECTED;
    u = 0;
    v.inform(v.CONNECTED, {
     init: da
    });
   }
  } else if (ba === l.ON_ENTER_STATE && ((ca.nextState || ca.state) === "ping" || !ca.nextState && ca.state === "idle")) {
   s = o(function() {
    var ea = null;
    if (!(ca.state === "idle" && !ca.nextState)) ea = ca.delay || 0;
    p.log("reconnecting", {
     delay: ea
    });
    if (v.disconnected()) p.log("reconnecting_ui", {
     delay: ea
    });
    t = v.RECONNECTING;
    ca.state === "idle" && u++;
    if (u > 1) {
     v.inform(v.RECONNECTING, ea);
    } else if (!ca.nextState && ca.state === "idle") aa(ba, ca);
   }, 500);
  } else if (ba === l.ON_SHUTDOWN) {
   p.log("shutdown", {
    reason: ca.reason
   });
   t = v.SHUTDOWN;
   u = 0;
   v.inform(v.SHUTDOWN, ca.reason);
  }
 }
 if (m.isShutdown()) {
  aa(l.ON_SHUTDOWN, m._shutdownHint);
 } else aa(l.ON_ENTER_STATE, {
  state: m.state,
  nextState: m.nextState,
  delay: 0
 });
 h(v, {
  disconnected: function() {
   return t === v.SHUTDOWN || t === v.RECONNECTING && !r && u > 1;
  },
  isShutdown: function() {
   return t === v.SHUTDOWN;
  },
  reconnect: function(ba) {
   if (m.state === "ping" || m.isShutdown()) return;
   p.log("reconnect", {
    now: ba
   });
   v.inform(v.RECONNECTING, 0);
   if (!!ba) {
    if (q !== null) {
     clearTimeout(q);
     q = null;
    }
    m.enterState("ping!");
   } else if (!q) q = o(function() {
    m.enterState("ping!");
    q = null;
   }, i.get("channel_manual_reconnect_defer_msec"));
  },
  unmuteWarning: x
 });
 g.subscribe([ l.ON_ENTER_STATE, l.ON_SHUTDOWN ], aa);
 g.subscribe(l.ATTEMPT_RECONNECT, function() {
  if (v.disconnected()) v.reconnect();
 });
 k.subscribe(k.TIME_TRAVEL, function() {
  v.reconnect();
  y(i.get("mute_warning_time_msec"));
 });
 j.onBeforeUnload(z, false);
 e.exports = v;
}, null);

__d("AvailableListConstants", [ "fbt" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 var h = {
  ON_AVAILABILITY_CHANGED: "buddylist/availability-changed",
  ON_UPDATE_ERROR: "buddylist/update-error",
  ON_UPDATED: "buddylist/updated",
  ON_CHAT_NOTIFICATION_CHANGED: "chat-notification-changed",
  OFFLINE: 0,
  IDLE: 1,
  ACTIVE: 2,
  MOBILE: 3,
  WEB_STATUS: "webStatus",
  FB_APP_STATUS: "fbAppStatus",
  MESSENGER_STATUS: "messengerStatus",
  OTHER_STATUS: "otherStatus",
  ACTIVE_ON_WEB: g._("Web"),
  ACTIVE_ON_MOBILE: g._("Mobile"),
  LEGACY_OVERLAY_OFFLINE: -1,
  LEGACY_OVERLAY_ONLINE: 0,
  LEGACY_OVERLAY_IDLE: 1,
  STATUS_ACTIVE: "active",
  STATUS_IDLE: "idle",
  STATUS_OFFLINE: "offline",
  legacyStatusMap: {
   "0": 2,
   "1": 1,
   "-1": 0,
   "2": 3
  },
  reverseLegacyStatusMap: {
   0: -1,
   1: 1,
   2: 0,
   3: 2
  }
 };
 a.AvailableListConstants = e.exports = h;
}, null);

__d("ServerTime", [ "InitialServerTime" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 k(g.serverTime);
 var h;
 function i() {
  return Date.now() - h;
 }
 function j() {
  return h;
 }
 function k(l) {
  h = Date.now() - l;
 }
 e.exports = {
  getMillis: i,
  getOffsetMillis: j,
  update: k,
  get: i,
  getSkew: j
 };
}, null);

__d("LastMobileActiveTimes", [ "ServerTime", "fbt" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 var i = {};
 function j(n) {
  if (!n || n < 0) return "";
  var o = g.get() / 1e3 - n, p = Math.floor(o / 60), q = Math.floor(p / 60), r = Math.floor(q / 24);
  if (p <= 1) {
   return h._("{count}m", [ h.param("count", 1) ]);
  } else if (p < 60) {
   return h._("{count}m", [ h.param("count", p) ]);
  } else if (q < 24) {
   return h._("{count}h", [ h.param("count", q) ]);
  } else if (r < 3) {
   return h._("{count}d", [ h.param("count", r) ]);
  } else return "";
 }
 function k(n, o) {
  if (!(n in i) || i[n] < o) i[n] = o;
 }
 function l(n) {
  if (n in i) {
   return i[n];
  } else return 0;
 }
 var m = {
  update: function(n) {
   for (var o in n) k(o, n[o]);
  },
  getShortDisplay: function(n) {
   return j(l(n));
  },
  get: function(n) {
   return l(n);
  }
 };
 e.exports = m;
}, null);

__d("ChatContexts", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 var g = {};
 function h(k) {
  var l = k ? k.subtext : "";
  return l;
 }
 function i(k, l) {
  g[k] = l;
 }
 var j = {
  get: function(k) {
   if (k in g) {
    return g[k];
   } else return null;
  },
  update: function(k) {
   for (var l in k) i(l, k[l]);
  },
  getShortDisplay: function(k) {
   return h(j.get(k));
  }
 };
 e.exports = j;
}, null);

__d("Poller", [ "ArbiterMixin", "AsyncRequest", "CurrentUser", "copyProperties", "emptyFunction", "mixin", "setTimeoutAcrossTransitions" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
 b.__markCompiled && b.__markCompiled();
 var n = l(g);
 for (var o in n) if (n.hasOwnProperty(o)) q[o] = n[o];
 var p = n === null ? null : n.prototype;
 q.prototype = Object.create(p);
 q.prototype.constructor = q;
 q.__superConstructor__ = n;
 function q(t) {
  "use strict";
  this._config = j({
   clearOnQuicklingEvents: true,
   setupRequest: k,
   interval: null,
   maxRequests: Infinity,
   dontStart: false
  }, t);
  this._handle = null;
  if (!this._config.dontStart) this.start();
 }
 q.prototype.start = function() {
  "use strict";
  if (this._polling) return this;
  this._requests = 0;
  this.request();
  return this;
 };
 q.prototype.stop = function() {
  "use strict";
  this._cancelRequest();
  return this;
 };
 q.prototype.mute = function() {
  "use strict";
  this._muted = true;
  return this;
 };
 q.prototype.resume = function() {
  "use strict";
  if (this._muted) {
   this._muted = false;
   if (this._handle === null && this._polling) return this.request();
  }
  return this;
 };
 q.prototype.skip = function() {
  "use strict";
  this._skip = true;
  return this;
 };
 q.prototype.reset = function() {
  "use strict";
  return this.stop().start();
 };
 q.prototype.request = function() {
  "use strict";
  this._cancelRequest();
  this._polling = true;
  if (!s()) return this._done();
  if (this._muted) return this;
  if (++this._requests > this._config.maxRequests) return this._done();
  var t = new h();
  t.setIsBackgroundRequest(true);
  var u = false;
  t.setInitialHandler(function() {
   return !u;
  });
  this._cancelRequest = function() {
   u = true;
   this._cleanup();
  }.bind(this);
  t.setFinallyHandler(r.bind(this));
  t.setInitialHandler = k;
  t.setFinallyHandler = k;
  this._config.setupRequest(t, this);
  if (this._skip) {
   this._skip = false;
   setTimeout(r.bind(this), 0);
  } else t.send();
  return this;
 };
 q.prototype.isPolling = function() {
  "use strict";
  return this._polling;
 };
 q.prototype.isMuted = function() {
  "use strict";
  return this._muted;
 };
 q.prototype.setInterval = function(t) {
  "use strict";
  if (t) {
   this._config.interval = t;
   this.start();
  }
 };
 q.prototype.getInterval = function() {
  "use strict";
  return this._config.interval;
 };
 q.prototype._cleanup = function() {
  "use strict";
  if (this._handle !== null) clearTimeout(this._handle);
  this._handle = null;
  this._cancelRequest = k;
  this._polling = false;
 };
 q.prototype._done = function() {
  "use strict";
  this._cleanup();
  this.inform("done", {
   sender: this
  });
  return this;
 };
 q.MIN_INTERVAL = 2e3;
 j(q.prototype, {
  _config: null,
  _requests: 0,
  _muted: false,
  _polling: false,
  _skip: false,
  _cancelRequest: k
 });
 function r() {
  if (!this._polling) return;
  if (this._requests < this._config.maxRequests) {
   var t = this._config.interval;
   t = typeof t === "function" ? t(this._requests) : t;
   t = t > q.MIN_INTERVAL ? t : q.MIN_INTERVAL;
   if (this._config.clearOnQuicklingEvents) {
    this._handle = setTimeout(this.request.bind(this), t);
   } else this._handle = m(this.request.bind(this), t);
  } else this._done();
 }
 function s() {
  return i.isLoggedInNow();
 }
 e.exports = q;
}, null);

__d("PresenceStatus", [ "ArbiterMixin", "AvailableListConstants", "BanzaiODS", "ChatVisibility", "CurrentUser", "LastMobileActiveTimes", "LogHistory", "PresencePrivacy", "ServerTime", "createObjectFrom", "debounceAcrossTransitions" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
 b.__markCompiled && b.__markCompiled();
 i.setEntitySample("presence", 1e-4);
 var r = m.getInstance("presence_status"), s = {}, t = {}, u = {}, v = {}, w = {}, x = {}, y = {}, z = Object.assign({}, g), aa = q(function() {
  return z.inform("change");
 }, 0);
 Object.assign(z, {
  resetPresenceData: function() {
   t = {};
   u = {};
   y = {};
   x = {};
   w = {};
  },
  reset: function() {
   z.resetPresenceData();
   v = {};
  },
  get: function(ba) {
   if (ba == k.getID()) return j.isOnline() ? h.ACTIVE : h.OFFLINE;
   var ca = h.OFFLINE;
   if (ba in t) ca = t[ba];
   if (ca === h.OFFLINE || ca === h.IDLE) if (v[ba]) ca = h.MOBILE;
   if (!n.allows(ba)) ca = h.OFFLINE;
   return ca;
  },
  getCapabilities: function(ba) {
   var ca = z.get(ba);
   if (ca == h.OFFLINE) return 0;
   var da = u[ba];
   return da ? da : 0;
  },
  getDetailedActivePresence: function(ba) {
   var ca = y[ba];
   if (!ca) return h.ACTIVE_ON_WEB;
   var da = ca[h.WEB_STATUS], ea = ca[h.FB_APP_STATUS], fa = ca[h.MESSENGER_STATUS], ga = ca[h.OTHER_STATUS];
   if (ea === h.STATUS_ACTIVE || fa === h.STATUS_ACTIVE) {
    return h.ACTIVE_ON_MOBILE;
   } else if (da === h.STATUS_ACTIVE || ga === h.STATUS_ACTIVE) {
    return h.ACTIVE_ON_WEB;
   } else {
    if (!s[ba]) {
     r.error("inconsistent_presence", {
      id: ba,
      presence: z.getDebugInfo(ba)
     });
     i.bumpEntityKey("presence", "inconsistent_presence");
     s[ba] = true;
    }
    return null;
   }
  },
  isMessengerUser: function(ba) {
   var ca = y[ba];
   if (ca) if (ca[h.MESSENGER_STATUS] == h.STATUS_ACTIVE) return true;
   return v[ba];
  },
  hasDetailedPresenceData: function(ba) {
   return y[ba] != null;
  },
  getGroup: function(ba) {
   return ba.some(function(ca) {
    if (ca == k.getID()) return false;
    return z.get(ca) === h.ACTIVE;
   }) ? h.ACTIVE : h.OFFLINE;
  },
  set: function(ba, ca, da, ea, fa, ga) {
   if (ba == k.getID()) return false;
   switch (ca) {
   case h.OFFLINE:
   case h.IDLE:
   case h.ACTIVE:
   case h.MOBILE:
    break;

   default:
    return false;
   }
   var ha = z.get(ba), ia = ha != ca;
   if (ia && ha == h.ACTIVE || ca == h.ACTIVE) {
    var ja = {};
    ja[ba] = o.get() / 1e3;
    l.update(ja);
   }
   var ka = false;
   if (!ia && fa) ka = z.getCapabilities(ba) != fa;
   if (da) {
    w[ba] = o.get();
    x[ba] = ea;
   }
   t[ba] = ca;
   if (fa) u[ba] = fa;
   if (ga) y[ba] = ga;
   var la = ia || ka;
   if (la) aa();
   return la;
  },
  setMobileFriends: function(ba) {
   v = p(ba);
  },
  getOnlineIDs: function() {
   var ba, ca = [];
   for (ba in t) if (z.get(ba) === h.ACTIVE) ca.push(ba);
   return ca;
  },
  getAvailableIDs: function() {
   var ba = z.getOnlineIDs(), ca;
   for (ca in v) {
    if (t[ca]) continue;
    ba.push(ca);
   }
   return ba;
  },
  getOnlineCount: function() {
   return z.getOnlineIDs().length;
  },
  getPresenceStats: function() {
   var ba = 0, ca = 0, da = 0, ea = 0, fa = 0;
   for (var ga in t) {
    ba += 1;
    switch (z.get(ga)) {
    case h.OFFLINE:
     ca += 1;
     break;

    case h.IDLE:
     da += 1;
     break;

    case h.ACTIVE:
     ea += 1;
     break;

    case h.MOBILE:
     fa += 1;
     break;

    default:
     break;
    }
   }
   return {
    total: ba,
    offline: ca,
    idle: da,
    active: ea,
    mobile: fa
   };
  },
  getDebugInfo: function(ba) {
   return {
    id: ba,
    presence: t[ba],
    detailedPresence: y[ba],
    overlaySource: x[ba],
    overlayTime: w[ba],
    mobile: v[ba]
   };
  }
 });
 e.exports = z;
}, null);

__d("XChatUserInfoAllAsyncController", [ "XController" ], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 e.exports = b("XController").create("/chat/user_info_all/", {
  viewer: {
   type: "Int",
   required: true
  }
 });
}, null);

__d("ShortProfilesBootstrapper", [ "AsyncRequest", "BanzaiODS", "CurrentUser", "JSLogger", "Promise", "XChatUserInfoAllAsyncController" ], function(a, b, c, d, e, f, g, h, i, j, k, l) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var m = 5, n = 1e4, o = l.getURIBuilder().setInt("viewer", i.getID()).getURI(), p = j.create("short_profiles");
 function q(r) {
  this.$ShortProfilesBootstrapper0 = r;
  this.$ShortProfilesBootstrapper1 = new k(function(s, t) {
   this.$ShortProfilesBootstrapper2 = s;
   this.$ShortProfilesBootstrapper3 = t;
  }.bind(this));
  this.$ShortProfilesBootstrapper4 = false;
  this.$ShortProfilesBootstrapper5 = null;
  this.$ShortProfilesBootstrapper6 = 0;
  this.$ShortProfilesBootstrapper7 = 0;
  this.$ShortProfilesBootstrapper8 = 0;
  this.$ShortProfilesBootstrapper9 = false;
  this.$ShortProfilesBootstrappera = false;
 }
 q.prototype.fetchAll = function() {
  this.$ShortProfilesBootstrapperb();
  if (this.$ShortProfilesBootstrapper4 || this.$ShortProfilesBootstrapper5) return this.$ShortProfilesBootstrapper1;
  if (this.$ShortProfilesBootstrapper6 >= m) {
   this.$ShortProfilesBootstrapperc();
   return this.$ShortProfilesBootstrapper1;
  }
  this.$ShortProfilesBootstrapper6++;
  this.$ShortProfilesBootstrapperd();
  this.$ShortProfilesBootstrapper5 = new g(o).setHandler(function(r) {
   this.$ShortProfilesBootstrapper5 = null;
   this.$ShortProfilesBootstrapper4 = true;
   this.$ShortProfilesBootstrappere();
   this.$ShortProfilesBootstrapper0(r.payload);
   this.$ShortProfilesBootstrapper2();
  }.bind(this)).setErrorHandler(function() {
   this.$ShortProfilesBootstrapper5 = null;
   this.$ShortProfilesBootstrapper7++;
   this.$ShortProfilesBootstrapperf();
  }.bind(this)).setTimeoutHandler(n, function() {
   this.$ShortProfilesBootstrapper5 = null;
   this.$ShortProfilesBootstrapper8++;
   this.$ShortProfilesBootstrapperg();
  }.bind(this)).setAllowCrossPageTransition(true);
  this.$ShortProfilesBootstrapper5.send();
  return this.$ShortProfilesBootstrapper1;
 };
 q.prototype.isBootstrapped = function() {
  return this.$ShortProfilesBootstrapper4;
 };
 q.prototype.isBootstrapping = function() {
  return !!this.$ShortProfilesBootstrapper5;
 };
 q.prototype.getAttemptCount = function() {
  return this.$ShortProfilesBootstrapper6;
 };
 q.prototype.getErrorCount = function() {
  return this.$ShortProfilesBootstrapper7;
 };
 q.prototype.getTimeoutCount = function() {
  return this.$ShortProfilesBootstrapper8;
 };
 q.prototype.$ShortProfilesBootstrapperb = function() {
  if (!this.$ShortProfilesBootstrapper9) {
   p.log("bootstrap_start");
   h.bumpEntityKey("chat.web", "typeahead.bootstrap.starts");
   this.$ShortProfilesBootstrapper9 = true;
  }
 };
 q.prototype.$ShortProfilesBootstrapperd = function() {
  p.log("bootstrap_attempt");
  h.bumpEntityKey("chat.web", "typeahead.bootstrap.attempts");
 };
 q.prototype.$ShortProfilesBootstrappere = function() {
  p.log("bootstrap_success");
  h.bumpEntityKey("chat.web", "typeahead.bootstrap.successes");
  if (this.$ShortProfilesBootstrapper6 > 1) h.bumpEntityKey("chat.web", "typeahead.bootstrap.successes_after_retries");
 };
 q.prototype.$ShortProfilesBootstrapperf = function() {
  p.log("bootstrap_error");
  h.bumpEntityKey("chat.web", "typeahead.bootstrap.errors");
 };
 q.prototype.$ShortProfilesBootstrapperg = function() {
  p.log("bootstrap_timeout");
  h.bumpEntityKey("chat.web", "typeahead.bootstrap.timeouts");
 };
 q.prototype.$ShortProfilesBootstrapperc = function() {
  if (!this.$ShortProfilesBootstrappera) {
   p.log("bootstrap_giveup");
   h.bumpEntityKey("chat.web", "typeahead.bootstrap.giveups");
   this.$ShortProfilesBootstrappera = true;
   this.$ShortProfilesBootstrapper3();
  }
 };
 e.exports = q;
}, null);

__d("XChatUserInfoAsyncController", [ "XController" ], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 e.exports = b("XController").create("/chat/user_info/", {
  ids: {
   type: "IntVector",
   defaultValue: []
  }
 });
}, null);

__d("ShortProfiles", [ "AjaxLoader", "Arbiter", "JSLogger", "ShortProfilesBootstrapper", "XChatUserInfoAsyncController" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 var l = null, m = new g(k.getURIBuilder().getURI().toString(), "profiles"), n = {
  get: function(p, q) {
   this.getMulti([ p ], function(r) {
    q(r[p], p);
   });
  },
  getMulti: function(p, q) {
   function r(s) {
    q(o(s));
   }
   m.get(p, r);
  },
  getNow: function(p) {
   return o(m.getNow(p) || null);
  },
  getNowUnsafe: function(p) {
   return m.getNow(p) || null;
  },
  getCachedProfileIDs: function() {
   return m.getCachedKeys();
  },
  hasAll: function() {
   return !!l && l.isBootstrapped();
  },
  fetchAll: function() {
   if (!l) l = new j(function(p) {
    m.set(p);
   });
   return l.fetchAll();
  },
  set: function(p, q) {
   var r = {};
   r[p] = q;
   this.setMulti(r);
  },
  setMulti: function(p) {
   m.set(o(p));
  }
 };
 function o(p) {
  return JSON.parse(JSON.stringify(p));
 }
 h.subscribe(i.DUMP_EVENT, function(p, q) {
  var r = n.getCachedProfileIDs(), s = i.getEntries(function(t) {
   return t.cat == "short_profiles" || t.cat == "chat_typeahead";
  });
  q.chat_typeahead = {
   bootstrapped: l && l.isBootstrapped(),
   bootstrapping: l && l.isBootstrapping(),
   bootstrap_attempts: l && l.getAttemptCount(),
   bootstrap_errors: l && l.getErrorCount(),
   bootstrap_timeouts: l && l.getTimeoutCount(),
   entries: r,
   entry_count: r.length,
   history: s
  };
 });
 e.exports = n;
}, null);

__d("PresencePoller", [ "AvailableListConstants", "AvailableListInitialData", "BanzaiODS", "ChannelConnection", "ChatContexts", "ChatVisibility", "CurrentUser", "JSLogger", "LastMobileActiveTimes", "Poller", "PresencePrivacy", "PresenceStatus", "ServerTime", "ShortProfiles", "UserActivity", "copyProperties", "debounceAcrossTransitions" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w) {
 b.__markCompiled && b.__markCompiled();
 var x = 5, y = "/ajax/chat/buddy_list.php", z = 18e5, aa = h.pollInterval, ba = h.lazyPollInterval, ca = h.lazyThreshold, da = n.create("available_list"), ea = "presence_poller";
 i.setEntitySample(ea, .01);
 function fa(ga) {
  "use strict";
  this.$PresencePoller0 = ga;
  this.$PresencePoller1 = false;
  this.$PresencePoller2 = h.chatNotif;
  this.$PresencePoller3 = new p({
   interval: aa,
   setupRequest: this.$PresencePoller4.bind(this),
   clearOnQuicklingEvents: false,
   dontStart: true
  });
  if (l.isOnline()) {
   this.$PresencePoller5 = Date.now();
   this.$PresencePoller6 = Date.now();
   this.$PresencePoller7 = Date.now();
   this.$PresencePoller8 = h.updateTime;
  } else {
   this.$PresencePoller5 = 0;
   this.$PresencePoller8 = 0;
   this.$PresencePoller6 = 0;
   this.$PresencePoller7 = 0;
  }
  this.$PresencePoller9 = 0;
  this.$PresencePollera("available_initial_data", h.updateTime, h.availableList, h.lastActiveTimes, h.mobileFriends);
  u.subscribe(function(ha, ia) {
   if (ia.idleness > aa) this.forceUpdate();
  }.bind(this));
  q.subscribe("privacy-user-presence-changed", function() {
   this.forceUpdate();
  }.bind(this));
 }
 fa.prototype.start = function() {
  "use strict";
  setTimeout(this.$PresencePoller3.start.bind(this.$PresencePoller3), 0);
 };
 fa.prototype.restart = function() {
  "use strict";
  if (this.$PresencePoller3.isMuted()) {
   this.$PresencePoller3.resume();
   this.forceUpdate();
  }
 };
 fa.prototype.stop = function() {
  "use strict";
  this.$PresencePoller3.mute();
 };
 fa.prototype.forceUpdate = function() {
  "use strict";
  this.$PresencePoller3.request();
 };
 fa.prototype.getIsUserIdle = function() {
  "use strict";
  return this.$PresencePoller1;
 };
 fa.prototype.getWebChatNotification = function() {
  "use strict";
  return this.$PresencePoller2;
 };
 fa.prototype.getCallback = function() {
  "use strict";
  return this.$PresencePoller0;
 };
 fa.prototype.$PresencePollerb = function() {
  "use strict";
  return w(function() {
   this.$PresencePoller0(g.ON_AVAILABILITY_CHANGED);
  }.bind(this), 0)();
 };
 fa.prototype.$PresencePollera = function(ga, ha, ia, ja, ka) {
  "use strict";
  this.$PresencePoller8 = ha;
  if (!Array.isArray(ia)) {
   r.resetPresenceData();
   for (var la in ia) r.set(la, ia[la].a, false, ga, ia[la].c, ia[la].p);
  }
  if (ja && !Array.isArray(ja)) o.update(ja);
  if (ka) r.setMobileFriends(ka);
  this.$PresencePollerb();
 };
 fa.prototype.$PresencePoller4 = function(ga) {
  "use strict";
  if (j.isShutdown() || !l.isOnline()) {
   this.$PresencePoller3.skip();
   i.bumpEntityKey(ea, "skip.offline");
   return;
  }
  if (Date.now() - this.$PresencePoller5 < aa) {
   this.$PresencePoller3.skip();
   i.bumpEntityKey(ea, "skip.recent");
   return;
  }
  i.bumpEntityKey(ea, "request");
  this.$PresencePoller5 = Date.now();
  var ha = Date.now() - this.$PresencePoller7, ia = t.getCachedProfileIDs().join(",");
  ga.setHandler(this.$PresencePollerc.bind(this)).setErrorHandler(this.$PresencePollerd.bind(this)).setOption("suppressErrorAlerts", true).setOption("retries", 1).setData({
   user: m.getID(),
   cached_user_info_ids: ia,
   fetch_mobile: ha > z
  }).setURI(y).setAllowCrossPageTransition(true);
 };
 fa.prototype.$PresencePollerc = function(ga) {
  "use strict";
  var ha = ga.getPayload(), ia = ha.buddy_list;
  if (!ia) {
   this.$PresencePollerd(ga);
   return;
  }
  i.bumpEntityKey(ea, "response");
  this.$PresencePollere();
  this.$PresencePoller6 = Date.now();
  s.update(ha.time);
  if (ia.mobile_friends) this.$PresencePoller7 = Date.now();
  this.$PresencePoller9 = 0;
  this.$PresencePollerf();
  var ja = ia.userInfos;
  if (ja) t.setMulti(ja);
  var ka = ia.chatContexts;
  ka && k.update(ka);
  this.$PresencePoller1 = ia.userIsIdle;
  if (ia.chatNotif !== void 0) {
   this.$PresencePoller2 = ia.chatNotif;
   this.$PresencePoller0(g.ON_CHAT_NOTIFICATION_CHANGED, this.$PresencePoller2);
  }
  this.$PresencePollera("buddy_list_poller", ha.time, ia.nowAvailableList, ia.last_active_times, ia.mobile_friends);
 };
 fa.prototype.$PresencePollerd = function(ga) {
  "use strict";
  i.bumpEntityKey(ea, "error");
  if (ga.getError() == 1356007) return;
  this.$PresencePoller9++;
  if (this.$PresencePoller9 >= x) this.$PresencePoller0(g.ON_UPDATE_ERROR);
 };
 fa.prototype.$PresencePollerf = function() {
  "use strict";
  var ga = u.isActive(ca) ? aa : ba;
  i.bumpEntityKey(ea, "period." + ga);
  this.$PresencePoller3.setInterval(ga);
 };
 fa.prototype.$PresencePollere = function() {
  "use strict";
  var ga = Date.now(), ha = ga - this.$PresencePoller6;
  da.log("buddylist_presence_stats", v({
   duration: ha
  }, r.getPresenceStats()));
 };
 e.exports = fa;
}, null);

__d("TypingStates", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 var g = {
  INACTIVE: 0,
  TYPING: 1,
  QUITTING: 2
 };
 e.exports = g;
}, null);

__d("AvailableList", [ "Arbiter", "ArbiterMixin", "AsyncRequest", "AvailableListConstants", "BanzaiODS", "ChannelConnection", "ChannelConstants", "ChatConfig", "ChatVisibility", "JSLogger", "LastMobileActiveTimes", "PresencePoller", "PresencePrivacy", "PresenceStatus", "ServerTime", "ShortProfiles", "TypingStates", "copyProperties", "debounceAcrossTransitions", "emptyFunction" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z) {
 b.__markCompiled && b.__markCompiled();
 k.setEntitySample("presence", 1e-4);
 var aa = x({}, j, h);
 aa.subscribe([ j.ON_AVAILABILITY_CHANGED, j.ON_UPDATE_ERROR ], function(ja, ka) {
  g.inform(ja, ka);
 });
 var ba = y(function() {
  aa.inform(j.ON_AVAILABILITY_CHANGED);
 }, 0);
 function ca(ja, ka, la, ma, na, oa) {
  var pa = t.set(ja, ka, la, ma, na, oa);
  if (pa) ba();
 }
 function da(ja) {
  var ka = ja.payload.availability || {};
  for (var la in ka) ca(la, ka[la].a, true, "mercury_tabs", ka[la].c, ka[la].p);
 }
 function ea() {
  ia.restart();
 }
 function fa() {
  ia.stop();
 }
 function ga(ja) {
  var ka = aa.getDebugInfo(ja), la = ka.presence == j.ACTIVE, ma = new i("/ajax/mercury/tabs_presence.php").setData({
   target_id: ja,
   to_online: la,
   presence_source: ka.overlaySource,
   presence_time: ka.overlayTime
  }).setHandler(da).setErrorHandler(z).setAllowCrossPageTransition(true).send();
 }
 function ha(ja, ka) {
  ka.chat_config = n.getDebugInfo();
  ka.available_list_debug_info = {};
  t.getAvailableIDs().forEach(function(la) {
   ka.available_list_debug_info[la] = aa.getDebugInfo(la);
  });
  ka.available_list_poll_interval = aa._poller && aa._poller.getInterval();
 }
 var ia = new r(function(event) {
  aa.inform(event);
 });
 x(aa, {
  get: function(ja) {
   return t.get(ja);
  },
  updateForID: function(ja) {
   ga(ja);
  },
  shouldUpdateForID: function(ja) {
   if (n.get("avoid_available_list_updates", false)) return t.getCapabilities(ja) === 0;
   return true;
  },
  getWebChatNotification: function() {
   return ia.getWebChatNotification();
  },
  isUserIdle: function() {
   return ia.getIsUserIdle();
  },
  isReady: function() {
   return true;
  },
  set: function(ja, ka, la, ma, na) {
   ca(ja, ka, true, la, ma, na);
  },
  update: function() {
   ia.forceUpdate();
  },
  isIdle: function(ja) {
   return aa.get(ja) == j.IDLE;
  },
  getDebugInfo: function(ja) {
   var ka = t.getDebugInfo(ja), la = v.getNow(ja);
   if (la) ka.name = la.name;
   return ka;
  }
 });
 ia.start();
 g.subscribe(p.DUMP_EVENT, ha);
 g.subscribe("chat-visibility/go-online", ea);
 g.subscribe("chat-visibility/go-offline", fa);
 s.subscribe([ "privacy-changed", "privacy-availability-changed", "privacy-user-presence-response" ], ba);
 l.subscribe([ l.CONNECTED, l.RECONNECTING, l.SHUTDOWN, l.MUTE_WARNING, l.UNMUTE_WARNING ], ba);
 g.subscribe(m.getArbiterType("buddylist_overlay"), function(ja, ka) {
  var la = {}, ma = ka.obj.overlay;
  for (var na in ma) {
   aa.set(na, ma[na].a, ma[na].s || "channel", ma[na].vc, ma[na].p);
   if (ma[na].la) la[na] = ma[na].la;
  }
  q.update(la);
 });
 g.subscribe([ m.getArbiterType("typ"), m.getArbiterType("ttyp") ], function(ja, ka) {
  var la = ka.obj;
  if (la.st === w.TYPING) {
   var ma = la.from;
   if (o.isOnline()) {
    k.bumpEntityKey("presence", "stale_presence_check_typing");
    var na = t.get(ma);
    if (na != j.ACTIVE) {
     var oa = q.get(ma) * 1e3, pa = u.get();
     if (!oa) {
      k.bumpEntityKey("presence", "no_detailed_presence_typing");
     } else if (pa - oa > 5 * 60 * 1e3) {
      var qa = "stale_presence_typing", ra = pa - oa;
      if (ra < 10 * 60 * 1e3) {
       qa += "600";
      } else if (ra < 60 * 60 * 1e3) qa += "3600";
      k.bumpEntityKey("presence", qa);
     }
    }
   }
   aa.set(ma, j.ACTIVE, "channel-typing");
  }
 });
 g.subscribe(m.getArbiterType("messaging"), function(ja, ka) {
  if (!o.isOnline()) return;
  var la = ka.obj;
  if (la.message && la.message.timestamp && la.message.sender_fbid) {
   var ma = u.get(), na = la.message.timestamp;
   if (ma - na < 2 * 60 * 1e3) {
    k.bumpEntityKey("presence", "stale_presence_check");
    var oa = la.message.sender_fbid, pa = t.get(oa);
    if (pa == j.ACTIVE) return;
    var qa = q.get(oa) * 1e3;
    if (!qa) {
     k.bumpEntityKey("presence", "no_detailed_presence");
    } else if (na - qa > 5 * 60 * 1e3) {
     var ra = "stale_presence", sa = na - qa;
     if (sa < 10 * 60 * 1e3) {
      ra += "600";
     } else if (sa < 60 * 60 * 1e3) ra += "3600";
     k.bumpEntityKey("presence", ra);
    }
   }
  }
 });
 a.AvailableList = e.exports = aa;
}, null);

__d("TooltipMixin", [ "React", "Tooltip", "DOM" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 var j = g, k = j.PropTypes;
 function l(n) {
  var o = n.tooltip;
  return o != null && typeof o !== "string";
 }
 var m = {
  propTypes: {
   tooltip: k.oneOfType([ k.element, k.string ]),
   position: k.oneOf([ "above", "below", "left", "right" ]),
   alignH: k.oneOf([ "left", "center", "right" ])
  },
  getInitialState: function() {
   return {
    tooltipContainer: l(this.props) ? i.create("div") : null
   };
  },
  componentWillReceiveProps: function(n) {
   var o = l(n), p = this.state.tooltipContainer;
   if (p && !o) {
    this.setState({
     tooltipContainer: null
    });
   } else if (!p && o) this.setState({
    tooltipContainer: i.create("div")
   });
  },
  componentDidMount: function() {
   this._updateTooltip();
  },
  componentDidUpdate: function(n, o) {
   if (o.tooltipContainer && !this.state.tooltipContainer) this._cleanupContainer(o.tooltipContainer);
   this._updateTooltip();
  },
  _updateTooltip: function() {
   var n;
   if (l(this.props)) {
    n = this.state.tooltipContainer;
    g.render(this.props.tooltip, n);
   } else n = this.props.tooltip;
   if (n != null) {
    h.set(g.findDOMNode(this), n, this.props.position, this.props.alignH);
   } else h.remove(g.findDOMNode(this));
  },
  componentWillUnmount: function() {
   if (this.state.tooltipContainer) this._cleanupContainer(this.state.tooltipContainer);
   h.remove(g.findDOMNode(this));
  },
  _cleanupContainer: function(n) {
   g.unmountComponentAtNode(n);
  }
 };
 e.exports = m;
}, null);

__d("TooltipLink.react", [ "React", "TooltipMixin" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 var i = g.createClass({
  displayName: "TooltipLink",
  mixins: [ h ],
  render: function() {
   return g.createElement("a", g.__spread({}, this.props), this.props.children);
  }
 });
 e.exports = i;
}, null);

__d("DialogPosition", [ "Vector" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 var h = 40, i, j = {
  calculateTopMargin: function(k, l) {
   if (i) return i;
   var m = g.getViewportDimensions(), n = Math.floor((m.x + k) * (m.y - l) / (4 * m.x));
   return Math.max(n, h);
  },
  setFixedTopMargin: function(k) {
   i = k;
  }
 };
 e.exports = j;
}, null);

__d("flattenArray", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 function g(h) {
  var i = h.slice(), j = [];
  while (i.length) {
   var k = i.pop();
   if (Array.isArray(k)) {
    Array.prototype.push.apply(i, k);
   } else j.push(k);
  }
  return j.reverse();
 }
 e.exports = g;
}, null);

__d("JSXDOM", [ "DOM", "flattenArray" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 var i = [ "a", "blockquote", "br", "button", "canvas", "checkbox", "dd", "div", "dl", "dt", "em", "form", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "i", "iframe", "img", "input", "label", "li", "option", "p", "pre", "select", "span", "strong", "table", "tbody", "thead", "td", "textarea", "th", "tr", "ul", "video" ], j = {};
 i.forEach(function(k) {
  var l = function(m, n) {
   if (arguments.length > 2) n = Array.prototype.slice.call(arguments, 1);
   if (!n && m) {
    n = m.children;
    delete m.children;
   }
   if (n) n = Array.isArray(n) ? h(n) : h([ n ]);
   return g.create(k, m, n);
  };
  j[k] = l;
 });
 e.exports = j;
}, null);

__d("TabbableElements", [ "Style", "createArrayFromMixed" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 function i(l) {
  if (l.tabIndex > 0 || l.tabIndex === 0 && l.getAttribute("tabIndex") !== null) return true;
  switch (l.tagName) {
  case "A":
   return l.href && l.rel != "ignore";

  case "INPUT":
   return l.type != "hidden" && l.type != "file" && !l.disabled;

  case "BUTTON":
  case "SELECT":
  case "TEXTAREA":
   return !l.disabled;
  }
  return false;
 }
 function j(l) {
  if (l.offsetHeight === 0 && l.offsetWidth === 0) return false;
  while (l !== document && g.get(l, "visibility") != "hidden") l = l.parentNode;
  return l === document;
 }
 var k = {
  find: function(l) {
   var m = h(l.getElementsByTagName("*"));
   return m.filter(k.isTabbable);
  },
  isTabbable: function(l) {
   return i(l) && j(l);
  }
 };
 e.exports = k;
}, null);

__d("focusWithinLayer", [ "DOMQuery", "Focus", "TabbableElements", "getActiveElement" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 function k(l) {
  var m = g.scry(l, ".autofocus")[0], n = true;
  if (!m) {
   var o = j();
   if (g.isNodeOfType(o, [ "input", "textarea" ])) return;
   var p = i.find(l);
   for (var q = 0; q < p.length; q++) {
    var r = p[q];
    if (r.tagName !== "A") {
     m = p[q];
     break;
    }
   }
  } else if (m.tabIndex !== 0) n = false;
  if (m) {
   n ? h.set(m) : h.setWithoutOutline(m);
  } else if (!l.offsetWidth) {
   l.tabIndex = 0;
   h.setWithoutOutline(l);
  }
 }
 e.exports = k;
}, null);

__d("LayerAutoFocus", [ "focusWithinLayer" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 function h(i) {
  "use strict";
  this._layer = i;
  this._subscription = null;
 }
 h.prototype.enable = function() {
  "use strict";
  this._subscription = this._layer.subscribe("aftershow", this._focus.bind(this));
 };
 h.prototype.disable = function() {
  "use strict";
  this._subscription.unsubscribe();
  this._subscription = null;
 };
 h.prototype._focus = function() {
  "use strict";
  var i = this._layer.getRoot();
  i && g(i);
 };
 e.exports = h;
}, null);

__d("Button", [ "CSS", "DataStore", "DOM", "Event", "Parent", "cx", "emptyFunction" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
 b.__markCompiled && b.__markCompiled();
 var n = "uiButtonDisabled", o = "uiButtonDepressed", p = "_42fr", q = "_42fs", r = "button:blocker", s = "href", t = "ajaxify";
 function u(aa, ba) {
  var ca = h.get(aa, r);
  if (ba) {
   if (ca) {
    ca.remove();
    h.remove(aa, r);
   }
  } else if (!ca) h.set(aa, r, j.listen(aa, "click", m.thatReturnsFalse, j.Priority.URGENT));
 }
 function v(aa) {
  var ba = k.byClass(aa, "uiButton") || k.byClass(aa, "_42ft");
  if (!ba) throw new Error("invalid use case");
  return ba;
 }
 function w(aa) {
  return i.isNodeOfType(aa, "a");
 }
 function x(aa) {
  return i.isNodeOfType(aa, "button");
 }
 function y(aa) {
  return g.hasClass(aa, "_42ft");
 }
 var z = {
  getInputElement: function(aa) {
   aa = v(aa);
   if (w(aa)) throw new Error("invalid use case");
   return x(aa) ? aa : i.find(aa, "input");
  },
  isEnabled: function(aa) {
   return !(g.hasClass(v(aa), n) || g.hasClass(v(aa), p));
  },
  setEnabled: function(aa, ba) {
   aa = v(aa);
   var ca = y(aa) ? p : n;
   g.conditionClass(aa, ca, !ba);
   if (w(aa)) {
    var da = aa.getAttribute("href"), ea = aa.getAttribute("ajaxify"), fa = h.get(aa, s, "#"), ga = h.get(aa, t);
    if (ba) {
     if (!da) aa.setAttribute("href", fa);
     if (!ea && ga) aa.setAttribute("ajaxify", ga);
     aa.removeAttribute("tabIndex");
    } else {
     if (da && da !== fa) h.set(aa, s, da);
     if (ea && ea !== ga) h.set(aa, t, ea);
     aa.removeAttribute("href");
     aa.removeAttribute("ajaxify");
     aa.setAttribute("tabIndex", "-1");
    }
    u(aa, ba);
   } else {
    var ha = z.getInputElement(aa);
    ha.disabled = !ba;
    u(ha, ba);
   }
  },
  setDepressed: function(aa, ba) {
   aa = v(aa);
   var ca = y(aa) ? q : o;
   g.conditionClass(aa, ca, ba);
  },
  isDepressed: function(aa) {
   aa = v(aa);
   var ba = y(aa) ? q : o;
   return g.hasClass(aa, ba);
  },
  setLabel: function(aa, ba) {
   aa = v(aa);
   if (y(aa)) {
    var ca = [];
    if (ba) ca.push(ba);
    var da = i.scry(aa, ".img")[0];
    if (da) if (aa.firstChild == da) {
     ca.unshift(da);
    } else ca.push(da);
    i.setContent(aa, ca);
   } else if (w(aa)) {
    var ea = i.find(aa, "span.uiButtonText");
    i.setContent(ea, ba);
   } else z.getInputElement(aa).value = ba;
   var fa = y(aa) ? "_42fv" : "uiButtonNoText";
   g.conditionClass(aa, fa, !ba);
  },
  setIcon: function(aa, ba) {
   if (ba && !i.isNode(ba)) return;
   aa = v(aa);
   var ca = i.scry(aa, ".img")[0];
   if (!ba) {
    ca && i.remove(ca);
    return;
   }
   g.addClass(ba, "customimg");
   if (ca != ba) if (ca) {
    i.replace(ca, ba);
   } else i.prependContent(aa, ba);
  }
 };
 e.exports = z;
}, null);

__d("LayerButtons", [ "Button", "Event", "Parent", "copyProperties", "cx" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 function l(m) {
  "use strict";
  this._layer = m;
 }
 l.prototype.enable = function() {
  "use strict";
  this._listener = h.listen(this._layer.getRoot(), "click", this._handle.bind(this));
 };
 l.prototype.disable = function() {
  "use strict";
  this._listener.remove();
  this._listener = null;
 };
 l.prototype._handle = function(m) {
  "use strict";
  var n = m.getTarget(), o = i.byClass(n, "layerConfirm");
  if (o) {
   if (this._isButton(o) && !g.isEnabled(o)) return;
   if (this._layer.inform("confirm", o) === false) m.prevent();
   return;
  }
  var p = i.byClass(n, "layerCancel");
  if (p) {
   if (this._isButton(p) && !g.isEnabled(p)) return;
   if (this._layer.inform("cancel", p) !== false) this._layer.hide();
   m.prevent();
   return;
  }
  var q = i.byClass(n, "layerButton");
  if (q) {
   if (this._isButton(q) && !g.isEnabled(q)) return;
   if (this._layer.inform("button", q) === false) m.prevent();
  }
 };
 l.prototype._isButton = function(m) {
  "use strict";
  return !!(i.byClass(m, "uiButton") || i.byClass(m, "_42ft"));
 };
 j(l.prototype, {
  _listener: null
 });
 e.exports = l;
}, null);

__d("LayerFormHooks", [ "Event", "copyProperties" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 function i(j) {
  "use strict";
  this._layer = j;
 }
 i.prototype.enable = function() {
  "use strict";
  var j = this._layer.getRoot();
  this._subscriptions = [ g.listen(j, "submit", this._onSubmit.bind(this)), g.listen(j, "success", this._onSuccess.bind(this)), g.listen(j, "error", this._onError.bind(this)) ];
 };
 i.prototype.disable = function() {
  "use strict";
  this._subscriptions.forEach(function(j) {
   j.remove();
  });
  this._subscriptions = null;
 };
 i.prototype._onSubmit = function(event) {
  "use strict";
  if (this._layer.inform("submit", event) === false) event.kill();
 };
 i.prototype._onSuccess = function(event) {
  "use strict";
  if (this._layer.inform("success", event) === false) event.kill();
 };
 i.prototype._onError = function(event) {
  "use strict";
  var j = event.getData();
  if (this._layer.inform("error", {
   response: j.response
  }) === false) event.kill();
 };
 h(i.prototype, {
  _subscriptions: null
 });
 e.exports = i;
}, null);

__d("LayerRefocusOnHide", [ "ContextualThing", "DOM", "DOMQuery", "Focus", "Parent", "copyProperties" ], function(a, b, c, d, e, f, g, h, i, j, k, l) {
 b.__markCompiled && b.__markCompiled();
 function m(n) {
  "use strict";
  this._layer = n;
 }
 m.prototype.enable = function() {
  "use strict";
  this._subscription = this._layer.subscribe("hide", this._handle.bind(this));
 };
 m.prototype.disable = function() {
  "use strict";
  this._subscription.unsubscribe();
  this._subscription = null;
 };
 m.prototype._handle = function(n, event) {
  "use strict";
  if (document.activeElement === document.body || i.contains(this._layer.getRoot(), document.activeElement)) {
   var o = this._layer.getCausalElement();
   while (o && !o.offsetWidth) {
    var p = k.byClass(o, "uiToggle");
    if (p && p.offsetWidth) {
     o = h.scry(p, '[rel="toggle"]')[0];
    } else {
     var q = g.getContext(o);
     if (q) {
      o = q;
     } else o = o.parentNode;
    }
   }
   if (o) if (o.tabIndex != -1) j.setWithoutOutline(o);
  }
 };
 l(m.prototype, {
  _subscription: null
 });
 e.exports = m;
}, null);

__d("TabIsolation", [ "DOMQuery", "Event", "Focus", "Keys", "TabbableElements" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 var l = [], m = 0;
 function n(o) {
  "use strict";
  this._root = o;
  this._eventHandler = null;
  this._identifier = m++;
 }
 n.prototype.enable = function() {
  "use strict";
  l.unshift(this._identifier);
  this._eventHandler = h.listen(window, "keydown", function(o) {
   if (l[0] === this._identifier) this._tabHandler(o);
  }.bind(this), h.Priority.URGENT);
 };
 n.prototype.disable = function() {
  "use strict";
  var o;
  if (this._eventHandler) {
   o = l.indexOf(this._identifier);
   if (o > -1) l.splice(o, 1);
   this._eventHandler.remove();
   this._eventHandler = null;
  }
 };
 n.prototype._tabHandler = function(o) {
  "use strict";
  if (h.getKeyCode(o) !== j.TAB) return;
  var p = o.getTarget();
  if (!p) return;
  var q = k.find(this._root), r = q[0], s = q[q.length - 1], t = o.getModifiers().shift;
  if (t && p === r) {
   o.preventDefault();
   i.set(s);
  } else if (!t && p === s || !g.contains(this._root, p)) {
   o.preventDefault();
   i.set(r);
  }
 };
 e.exports = n;
}, null);

__d("LayerTabIsolation", [ "TabIsolation", "copyProperties" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 function i(j) {
  "use strict";
  this._layer = j;
  this._tabIsolation = null;
 }
 i.prototype.enable = function() {
  "use strict";
  this._tabIsolation = new g(this._layer.getRoot());
  this._subscriptions = [ this._layer.subscribe("show", this._tabIsolation.enable.bind(this._tabIsolation)), this._layer.subscribe("hide", this._tabIsolation.disable.bind(this._tabIsolation)) ];
 };
 i.prototype.disable = function() {
  "use strict";
  while (this._subscriptions.length) this._subscriptions.pop().unsubscribe();
  this._tabIsolation.disable();
  this._tabIsolation = null;
 };
 h(i.prototype, {
  _subscriptions: []
 });
 e.exports = i;
}, null);

__d("Toggler", [ "Arbiter", "ArbiterMixin", "ContextualThing", "CSS", "DataStore", "DOM", "DOMQuery", "Event", "Focus", "Keys", "TabbableElements", "arrayContains", "copyProperties", "createArrayFromMixed", "cx", "emptyFunction", "ge", "getContextualParent", "getObjectValues", "setImmediate", "mixin" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa) {
 b.__markCompiled && b.__markCompiled();
 var ba = [], ca, da = false;
 function ea() {
  if (!da) {
   da = true;
   z(function() {
    da = false;
   });
  }
 }
 function fa() {
  fa = v;
  n.listen(document.documentElement, "click", function(event) {
   if (da) return;
   var ma = event.getTarget();
   ba.forEach(function(na) {
    na.clickedTarget = ma;
    na.active && !na.sticky && !i.containsIncludingLayers(na.getActive(), ma) && !na.inTargetFlyout(ma) && na.inActiveDialog() && !na.isIgnoredByModalLayer(ma) && na.hide();
   });
  }, n.Priority.URGENT);
 }
 var ga = aa(h);
 for (var ha in ga) if (ga.hasOwnProperty(ha)) ja[ha] = ga[ha];
 var ia = ga === null ? null : ga.prototype;
 ja.prototype = Object.create(ia);
 ja.prototype.constructor = ja;
 ja.__superConstructor__ = ga;
 function ja() {
  "use strict";
  this.active = null;
  this.togglers = {};
  this.setSticky(false);
  ba.push(this);
  this.subscribe([ "show", "hide" ], ja.inform.bind(ja));
  return fa();
 }
 ja.prototype.show = function(ma) {
  "use strict";
  var na = ka(this, ma), oa = na.active;
  if (ma !== oa) {
   oa && na.hide();
   na.active = ma;
   j.addClass(ma, "openToggler");
   var pa = l.scry(ma, 'a[rel="toggle"]');
   if (pa.length > 0 && pa[0].getAttribute("data-target")) j.removeClass(w(pa[0].getAttribute("data-target")), "toggleTargetClosed");
   var qa = m.scry(ma, ".uiToggleFlyout")[0];
   if (qa) {
    var ra = q.find(qa)[0] || qa;
    if (ra.tabIndex == -1) ra.tabIndex = 0;
    o.setWithoutOutline(ra);
   }
   if (pa.length > 0) {
    l.appendContent(ma, na.getToggler("next"));
    l.prependContent(ma, na.getToggler("prev"));
   }
   n.listen(ma, "keydown", function(event) {
    if (n.getKeyCode(event) === p.ESC) if (na.isShown()) {
     var sa = l.scry(ma, 'a[rel="toggle"]')[0];
     sa && sa.focus();
     na.hide();
    }
   });
   na.inform("show", na);
  }
 };
 ja.prototype.hide = function(ma) {
  "use strict";
  var na = ka(this, ma), oa = na.active;
  if (oa && (!ma || ma === oa)) {
   j.removeClass(oa, "openToggler");
   var pa = l.scry(oa, 'a[rel="toggle"]');
   if (pa.length > 0 && pa[0].getAttribute("data-target")) j.addClass(w(pa[0].getAttribute("data-target")), "toggleTargetClosed");
   y(na.togglers).forEach(l.remove);
   na.inform("hide", na);
   na.active = null;
  }
 };
 ja.prototype.toggle = function(ma) {
  "use strict";
  var na = ka(this, ma);
  if (na.active === ma) {
   na.hide();
  } else na.show(ma);
  ea();
 };
 ja.prototype.getActive = function() {
  "use strict";
  return ka(this).active;
 };
 ja.prototype.isShown = function() {
  "use strict";
  return ka(this).active && j.hasClass(ka(this).active, "openToggler");
 };
 ja.prototype.inTargetFlyout = function(ma) {
  "use strict";
  var na = la(this.getActive());
  return na && i.containsIncludingLayers(na, ma);
 };
 ja.prototype.inActiveDialog = function() {
  "use strict";
  var ma = a.Dialog && a.Dialog.getCurrent();
  return !ma || l.contains(ma.getRoot(), this.getActive());
 };
 ja.prototype.isIgnoredByModalLayer = function(ma) {
  "use strict";
  var na = !!i.parentByClass(ma, "_3qw"), oa = !!i.parentByClass(this.getActive(), "_3qw");
  return na && !oa;
 };
 ja.prototype.getToggler = function(ma) {
  "use strict";
  var na = ka(this);
  if (!na.togglers[ma]) {
   na.togglers[ma] = l.create("button", {
    className: "hideToggler",
    onfocus: function() {
     var oa = l.scry(na.active, 'a[rel="toggle"]')[0];
     oa && oa.focus();
     na.hide();
    },
    style: {
     right: ma === "next" ? "0" : ""
    }
   });
   na.togglers[ma].setAttribute("type", "button");
  }
  return this.togglers[ma];
 };
 ja.prototype.setSticky = function(ma) {
  "use strict";
  var na = ka(this);
  ma = ma !== false;
  if (ma !== na.sticky) {
   na.sticky = ma;
   if (ma) {
    na.$Toggler0 && na.$Toggler0.unsubscribe();
   } else na.$Toggler0 = g.subscribe("pre_page_transition", na.hide.bind(na, null));
  }
  return na;
 };
 ja.prototype.setPrePageTransitionCallback = function(ma) {
  "use strict";
  var na = ka(this);
  na.$Toggler0 && na.$Toggler0.unsubscribe();
  na.$Toggler0 = g.subscribe("pre_page_transition", ma);
 };
 ja.bootstrap = function(ma) {
  "use strict";
  var na = ma.parentNode;
  ja.getInstance(na).toggle(na);
 };
 ja.createInstance = function(ma) {
  "use strict";
  var na = new ja().setSticky(true);
  k.set(ma, "toggler", na);
  return na;
 };
 ja.destroyInstance = function(ma) {
  "use strict";
  k.remove(ma, "toggler");
 };
 ja.getInstance = function(ma) {
  "use strict";
  while (ma) {
   var na = k.get(ma, "toggler");
   if (na) return na;
   if (j.hasClass(ma, "uiToggleContext")) return ja.createInstance(ma);
   ma = x(ma);
  }
  return ca = ca || new ja();
 };
 ja.listen = function(ma, na, oa) {
  "use strict";
  return ja.subscribe(t(ma), function(pa, qa) {
   if (qa.getActive() === na) return oa(pa, qa);
  });
 };
 s(ja, ja.prototype);
 s(ja, {
  subscribe: function(ma) {
   return function(na, oa) {
    na = t(na);
    if (r(na, "show")) ba.forEach(function(pa) {
     if (pa.getActive()) setTimeout(oa.bind(null, "show", pa), 0);
    });
    return ma(na, oa);
   };
  }(ja.subscribe.bind(ja))
 });
 function ka(ma, na) {
  if (ma instanceof ja) return ma;
  return ja.getInstance(na);
 }
 function la(ma) {
  var na = l.scry(ma, 'a[rel="toggle"]');
  if (na.length > 0 && na[0].getAttribute("data-target")) return w(na[0].getAttribute("data-target"));
 }
 e.exports = ja;
}, null);

__d("LayerTogglerContext", [ "Toggler" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 function h(i) {
  "use strict";
  this._layer = i;
 }
 h.prototype.enable = function() {
  "use strict";
  this._root = this._layer.getRoot();
  g.createInstance(this._root).setSticky(false);
 };
 h.prototype.disable = function() {
  "use strict";
  g.destroyInstance(this._root);
  this._root = null;
 };
 e.exports = h;
}, null);

__d("DialogX", [ "Arbiter", "CSS", "DialogPosition", "Event", "JSXDOM", "Layer", "LayerAutoFocus", "LayerButtons", "LayerFormHooks", "LayerRefocusOnHide", "LayerTabIsolation", "LayerTogglerContext", "ModalLayer", "Style", "Vector", "copyProperties", "cx", "debounce", "goURI", "shield" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z) {
 b.__markCompiled && b.__markCompiled();
 for (var aa in l) if (l.hasOwnProperty(aa)) ca[aa] = l[aa];
 var ba = l === null ? null : l.prototype;
 ca.prototype = Object.create(ba);
 ca.prototype.constructor = ca;
 ca.__superConstructor__ = l;
 function ca() {
  "use strict";
  if (l !== null) l.apply(this, arguments);
 }
 ca.prototype._configure = function(ea, fa) {
  "use strict";
  ba._configure.call(this, ea, fa);
  h.addClass(this.getRoot(), "_4-hy");
  if (ea.autohide) var ga = this.subscribe("show", function() {
   ga.unsubscribe();
   setTimeout(z(this.hide, this), ea.autohide);
  }.bind(this));
  if (ea.redirectURI) var ha = this.subscribe("hide", function() {
   ha.unsubscribe();
   y(ea.redirectURI);
  });
  this._fixedTopPosition = ea.fixedTopPosition;
 };
 ca.prototype._getDefaultBehaviors = function() {
  "use strict";
  return ba._getDefaultBehaviors.call(this).concat([ da, s, m, n, o, q, r, p ]);
 };
 ca.prototype._buildWrapper = function(ea, fa) {
  "use strict";
  var ga = ea.xui ? "_4-hz" : "_t", ha = ea.xui ? "_59s7" : "_1yv";
  this._innerContent = k.div(null, fa);
  this._wrapper = k.div({
   className: ha,
   role: "dialog",
   "aria-labelledby": ea.titleID || null
  }, k.div({
   className: ga
  }, this._innerContent));
  this.setWidth(ea.width);
  return k.div({
   className: "_10",
   role: "dialog"
  }, this._wrapper);
 };
 ca.prototype.getContentRoot = function() {
  "use strict";
  return this._wrapper;
 };
 ca.prototype.getInnerContent = function() {
  "use strict";
  return this._innerContent;
 };
 ca.prototype.updatePosition = function() {
  "use strict";
  var ea;
  if (this._fixedTopPosition) {
   ea = this._fixedTopPosition;
  } else {
   var fa = u.getElementDimensions(this._wrapper);
   ea = i.calculateTopMargin(fa.x, fa.y);
  }
  t.set(this._wrapper, "margin-top", ea + "px");
  this.inform("update_position", {
   type: "DialogX",
   top: ea
  });
 };
 ca.prototype.setWidth = function(ea) {
  "use strict";
  ea = Math.floor(ea);
  if (ea === this._width) return;
  this._width = ea;
  t.set(this._wrapper, "width", ea + "px");
 };
 ca.prototype.getWidth = function() {
  "use strict";
  return this._width;
 };
 ca.prototype.getFixedTopPosition = function() {
  "use strict";
  return this._fixedTopPosition;
 };
 function da(ea) {
  "use strict";
  this._layer = ea;
 }
 da.prototype.enable = function() {
  "use strict";
  this._subscription = this._layer.subscribe([ "show", "hide" ], function(ea) {
   if (ea === "show") {
    this._attach();
    g.inform("layer_shown", {
     type: "DialogX"
    });
   } else {
    this._detach();
    g.inform("layer_hidden", {
     type: "DialogX"
    });
   }
  }.bind(this));
 };
 da.prototype.disable = function() {
  "use strict";
  this._subscription.unsubscribe();
  this._subscription = null;
  this._resize && this._detach();
 };
 da.prototype._attach = function() {
  "use strict";
  this._layer.updatePosition();
  this._resize = j.listen(window, "resize", x(this._layer.updatePosition.bind(this._layer)));
 };
 da.prototype._detach = function() {
  "use strict";
  this._resize.remove();
  this._resize = null;
 };
 v(da.prototype, {
  _subscription: null,
  _resize: null
 });
 e.exports = ca;
}, null);

__d("nativeRequestAnimationFrame", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 var g = a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame || a.oRequestAnimationFrame || a.msRequestAnimationFrame;
 e.exports = g;
}, null);

__d("requestAnimationFramePolyfill", [ "emptyFunction", "nativeRequestAnimationFrame" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 var i = 0, j = h || function(k) {
  var l = Date.now(), m = Math.max(0, 16 - (l - i));
  i = l + m;
  return a.setTimeout(function() {
   k(Date.now());
  }, m);
 };
 j(g);
 e.exports = j;
}, null);

__d("requestAnimationFrameAcrossTransitions", [ "TimeSlice", "requestAnimationFramePolyfill" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 e.exports = function() {
  for (var i = [], j = 0, k = arguments.length; j < k; j++) i.push(arguments[j]);
  i[0] = g.guard(i[0], "requestAnimationFrame");
  return h.apply(a, i);
 };
}, null);

__d("requestAnimationFrame", [ "TimerStorage", "requestAnimationFrameAcrossTransitions" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 e.exports = function() {
  for (var i = [], j = 0, k = arguments.length; j < k; j++) i.push(arguments[j]);
  var l = h.apply(a, i);
  g.push(g.ANIMATION_FRAME, l);
  return l;
 };
}, null);

__d("LayerHideOnBlur", [ "copyProperties", "requestAnimationFrame" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 function i(j) {
  "use strict";
  this._layer = j;
 }
 i.prototype.enable = function() {
  "use strict";
  this._subscriptions = [ this._layer.subscribe("show", this._attach.bind(this)), this._layer.subscribe("hide", this._detach.bind(this)) ];
  if (this._layer.isShown()) this._attach();
 };
 i.prototype.disable = function() {
  "use strict";
  this._detach();
  while (this._subscriptions.length) this._subscriptions.pop().unsubscribe();
  this._subscriptions = null;
 };
 i.prototype._detach = function() {
  "use strict";
  this._onBlur && this._onBlur.unsubscribe();
  this._onBlur = null;
 };
 i.prototype._attach = function() {
  "use strict";
  this._onBlur = this._layer.subscribe("blur", function() {
   return h(function() {
    this._layer.hide();
    return false;
   }.bind(this));
  }.bind(this));
 };
 g(i.prototype, {
  _subscriptions: null,
  _onBlur: null
 });
 e.exports = i;
}, null);

__d("AbstractDialog.react", [ "DialogX", "LayerHideOnBlur", "React", "copyProperties", "merge" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 var l = i, m = l.PropTypes, n = {
  createSpec: function(o) {
   return {
    displayName: o.displayName,
    propTypes: {
     behaviors: m.object,
     className: m.string,
     modal: m.bool,
     autohide: m.number,
     width: m.number,
     titleID: m.string,
     causalElement: m.object,
     causalElementRef: m.string,
     shown: m.bool,
     layerHideOnBlur: m.bool,
     fixedTopPosition: m.number
    },
    createLayer: function(p) {
     var q = this.props.className, r = j({
      width: this.props.width,
      xui: true,
      autohide: this.props.autohide,
      classNames: q ? q.split(" ") : null,
      titleID: this.props.titleID,
      causalElement: this._getCausalElement(),
      fixedTopPosition: this.props.fixedTopPosition
     }, o || {}), s = k(o.addedBehaviors, this.props.behaviors);
     if (this.props.layerHideOnBlur !== false) s.LayerHideOnBlur = h;
     r.addedBehaviors = this.enumerateBehaviors(s);
     var t = new g(r, p);
     t.conditionShow(this.props.shown);
     return t;
    },
    receiveProps: function(p) {
     this.updateBehaviors(p.behaviors);
     if (this.layer) {
      this.layer.setCausalElement(this._getCausalElement());
      this.layer.conditionShow(p.shown);
      this.layer.setWidth(p.width);
      p.shown && this.layer.updatePosition();
     }
    },
    _getCausalElement: function() {
     var p;
     if (this.props.causalElementRef) {
      p = this.getNodeForOwnerRef(this.props.causalElementRef);
     } else p = this.props.causalElement;
     return p;
    }
   };
  }
 };
 e.exports = n;
}, null);

__d("ContextualDialogARIA", [ "DOM" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 function h(i) {
  "use strict";
  this._layer = i;
 }
 h.prototype.enable = function() {
  "use strict";
  this._subscription = this._layer.subscribe("beforeshow", this._addAriaAttribute.bind(this));
 };
 h.prototype.disable = function() {
  "use strict";
  this._subscription.unsubscribe();
  this._subscription = null;
 };
 h.prototype._addAriaAttribute = function() {
  "use strict";
  var i = this._layer.getCausalElement();
  if (!i) return;
  var j = g.scry(this._layer.getRoot(), ".accessible_elem");
  if (j.length) i.setAttribute("aria-describedby", g.getID(j[0]));
 };
 e.exports = h;
}, null);

__d("AccessibleLayer", [ "DOM", "Event", "Focus", "fbt" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 function k(l) {
  "use strict";
  this._layer = l;
 }
 k.prototype.enable = function() {
  "use strict";
  this._afterShowSubscription = this._layer.subscribe("aftershow", this._onAfterShow.bind(this));
 };
 k.prototype.disable = function() {
  "use strict";
  this._listener && this._listener.remove();
  this._afterShowSubscription.unsubscribe();
  this._listener = this._afterShowSubscription = null;
 };
 k.prototype._closeListener = function(event) {
  "use strict";
  var l = this._layer.getCausalElement();
  if (l) if (l.tabIndex == -1) {
   l.tabIndex = 0;
   i.setWithoutOutline(l);
  } else i.set(l);
  this._layer.hide();
 };
 k.prototype._onAfterShow = function() {
  "use strict";
  var l = this._layer.getContentRoot();
  if (g.scry(l, ".layer_close_elem")[0]) return;
  var m = g.create("a", {
   className: "accessible_elem layer_close_elem",
   href: "#"
  }, [ j._("Close popup and return") ]);
  g.appendContent(l, m);
  this._listener = h.listen(m, "click", this._closeListener.bind(this));
 };
 e.exports = k;
}, null);

__d("ContextualDialogArrow", [ "CSS", "DOM", "JSXDOM", "Locale", "Style", "Vector", "copyProperties", "cx" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
 b.__markCompiled && b.__markCompiled();
 var o = {
  bottom: "_53ik",
  top: "_53il",
  right: "_53im",
  left: "_53in"
 }, p = {
  above: "bottom",
  below: "top",
  left: "right",
  right: "left"
 };
 function q(r) {
  "use strict";
  this._layer = r;
 }
 q.prototype.enable = function() {
  "use strict";
  this._subscription = this._layer.subscribe([ "adjust", "reposition" ], this._handle.bind(this));
  g.addClass(this._layer.getContentRoot(), "_5v-0");
 };
 q.prototype.disable = function() {
  "use strict";
  this._subscription.unsubscribe();
  this._subscription = null;
  g.removeClass(this._layer.getContentRoot(), "_5v-0");
 };
 q.prototype._handle = function(r, s) {
  "use strict";
  if (r === "adjust") {
   this._repositionArrow(s);
  } else this._repositionRoot(s);
 };
 q.prototype._repositionRoot = function(r) {
  "use strict";
  var s = r.getAlignment();
  if (s == "center") return;
  var t = this._layer.getRoot(), u = this._layer.getContext(), v = r.isVertical(), w = this._layer.getArrowDimensions(), x = w.offset, y = w.length, z = l.getElementDimensions(u), aa = v ? z.x : z.y;
  if (aa >= y + x * 2) return;
  var ba = y / 2 + x, ca = aa / 2, da = parseInt(ba - ca, 10);
  if (v) {
   if (s == "left") {
    var ea = parseInt(k.get(t, "left"), 10);
    k.set(t, "left", ea - da + "px");
   } else {
    var fa = parseInt(k.get(t, "right"), 10);
    k.set(t, "right", fa - da + "px");
   }
  } else {
   var ga = parseInt(k.get(t, "top"), 10);
   k.set(t, "top", ga - da + "px");
  }
 };
 q.prototype._repositionArrow = function(r) {
  "use strict";
  var s = this._layer.getContentRoot(), t = r.getPosition(), u = p[t];
  for (var v in o) g.conditionClass(s, o[v], u === v);
  if (t == "none") return;
  if (!this._arrow) this._arrow = i.i({
   className: "_53io"
  });
  if (!h.contains(s, this._arrow)) h.appendContent(s, this._arrow);
  k.set(this._arrow, "top", "");
  k.set(this._arrow, "left", "");
  k.set(this._arrow, "right", "");
  k.set(this._arrow, "margin", "");
  var w = q.getOffsetPercent(r), x = q.getOffset(r, w, this._layer), y = q.getOffsetSide(r);
  k.set(this._arrow, y, w + "%");
  k.set(this._arrow, "margin-" + y, x + "px");
 };
 q.getOffsetPercent = function(r) {
  "use strict";
  var s = r.getAlignment(), t = r.getPosition();
  if (t == "above" || t == "below") if (s == "center") {
   return 50;
  } else if (s == "right") return 100;
  return 0;
 };
 q.getOffsetSide = function(r) {
  "use strict";
  var s = r.isVertical();
  return s ? j.isRTL() ? "right" : "left" : "top";
 };
 q.getOffset = function(r, s, t) {
  "use strict";
  var u = t.getArrowDimensions(), v = u.offset, w = u.length, x = r.getAlignment(), y = x == "center" ? 0 : v;
  y += w * s / 100;
  if (x != "left") y *= -1;
  return y;
 };
 m(q.prototype, {
  _subscription: null,
  _arrow: null
 });
 e.exports = q;
}, null);

__d("ContextualDialogDefaultTheme", [ "cx" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 var h = {
  wrapperClassName: "_53ip",
  arrowDimensions: {
   offset: 15,
   length: 16
  }
 };
 e.exports = h;
}, null);

__d("ContextualDialogKeepInViewport", [ "ContextualLayerDimensions", "Event", "Style", "Vector", "throttle" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 function l(m) {
  "use strict";
  this._layer = m;
  this._listeners = [];
  this._subscription = null;
  this._minimumTop = null;
 }
 l.prototype.enable = function() {
  "use strict";
  var m = this._layer.getArrowDimensions();
  this._arrowOffset = m.offset;
  var n = m.length;
  this._arrowBuffer = this._arrowOffset + n;
  this._subscription = this._layer.subscribe([ "show", "hide", "reposition" ], function(o, p) {
   if (this._layer.isFixed()) return;
   if (o == "reposition") {
    this._calculateMinimumTop(p);
   } else if (o == "show") {
    this._attachScroll();
    this._adjustForScroll();
   } else this._detachScroll();
  }.bind(this));
  if (this._layer.isShown()) this._attachScroll();
 };
 l.prototype.disable = function() {
  "use strict";
  if (this._layer.isShown()) this._detachScroll();
  this._subscription.unsubscribe();
  this._subscription = null;
 };
 l.prototype._attachScroll = function() {
  "use strict";
  var m = k(this._adjustForScroll.bind(this)), n = this._layer.getContextScrollParent() || window;
  this._listeners = [ h.listen(n, "scroll", m), h.listen(window, "resize", m) ];
 };
 l.prototype._detachScroll = function() {
  "use strict";
  while (this._listeners.length) this._listeners.pop().remove();
  this._listeners = [];
 };
 l.prototype._getContentHeight = function() {
  "use strict";
  if (!this._layer._contentWrapper) return 0;
  return j.getElementDimensions(this._layer._contentWrapper).y;
 };
 l.prototype._getContextY = function() {
  "use strict";
  return j.getElementPosition(this._layer.getContext()).y;
 };
 l.prototype._calculateMinimumTop = function(m) {
  "use strict";
  if (m.isVertical()) return;
  this._minimumTop = this._getContextY() - (this._getContentHeight() - this._arrowBuffer) + m.getOffsetY();
 };
 l.prototype._adjustForScroll = function() {
  "use strict";
  var m = this._layer._getOrientation(), n = this._layer.getContent();
  if (m.isVertical() || !n) return;
  var o = g.getViewportRect(this._layer), p = o.b - this._minimumTop;
  if (p < 0) return;
  var q = this._getContentHeight(), r = q - (this._arrowBuffer + this._arrowOffset), s = Math.max(0, Math.min(r, r - (p - q)));
  i.set(n, "top", -s + "px");
 };
 e.exports = l;
}, null);

__d("ContextualDialogFitInViewport_PUSHSAFE", [ "Style", "Vector" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 var i = 50, j = 10;
 function k(l) {
  "use strict";
  this._layer = l;
  this._contentHeight = null;
  this._contextY = null;
 }
 k.prototype.enable = function() {
  "use strict";
  var l = this._layer.getArrowDimensions();
  this._arrowOffset = l.offset;
  var m = l.length;
  this._arrowBuffer = this._arrowOffset + m;
  this._subscription = this._layer.subscribe([ "reposition" ], function(n, o) {
   if (!this._layer.isFixed() || o.isVertical()) return;
   this._adjustPosition();
  }.bind(this));
 };
 k.prototype.disable = function() {
  "use strict";
  this._subscription.unsubscribe();
  this._subscription = null;
 };
 k.prototype._getContentHeight = function() {
  "use strict";
  return h.getElementDimensions(this._layer._contentWrapper).y;
 };
 k.prototype._getContextY = function() {
  "use strict";
  return h.getElementPosition(this._layer.getContext(), "viewport").y;
 };
 k.prototype._adjustPosition = function() {
  "use strict";
  var l = this._getContextY(), m = this._getContentHeight();
  if (l === this._contextY && m === this._contentHeight) return;
  this._contextY = l;
  this._contentHeight = m;
  var n = h.getViewportDimensions().y, o = Math.min(Math.max(0, l + m + j - n), Math.max(0, l - i), m - this._arrowOffset - this._arrowBuffer);
  g.set(this._layer.getContent(), "top", -o + "px");
 };
 e.exports = k;
}, null);

__d("LayerMouseHooks", [ "Arbiter", "ContextualThing", "Event", "Layer" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 var k = new g();
 function l(m) {
  "use strict";
  this._layer = m;
  this._subscriptions = [];
  this._currentlyActive = false;
 }
 l.prototype.enable = function() {
  "use strict";
  this._subscriptions = [ k.subscribe("mouseenter", this._handleActive.bind(this)), k.subscribe("mouseleave", this._handleInactive.bind(this)), this._layer.subscribe("hide", function() {
   this._currentlyActive = false;
  }.bind(this)) ];
 };
 l.prototype.disable = function() {
  "use strict";
  while (this._subscriptions.length) this._subscriptions.pop().unsubscribe();
  this._subscriptions = [];
  this._currentlyActive = false;
 };
 l.prototype._handleActive = function(m, n) {
  "use strict";
  if (!this._currentlyActive && this._isNodeWithinStack(n)) {
   this._layer.inform("mouseenter");
   this._currentlyActive = true;
  }
 };
 l.prototype._handleInactive = function(m, n) {
  "use strict";
  if (this._currentlyActive) if (!n || !this._isNodeWithinStack(n)) {
   this._layer.inform("mouseleave");
   this._currentlyActive = false;
  }
 };
 l.prototype._isNodeWithinStack = function(m) {
  "use strict";
  return h.containsIncludingLayers(this._layer.getContentRoot(), m);
 };
 j.subscribe("show", function(m, n) {
  var o = n.getContentRoot(), p = [ i.listen(o, "mouseenter", function() {
   k.inform("mouseenter", o);
  }), i.listen(o, "mouseleave", function(r) {
   k.inform("mouseleave", r.getRelatedTarget());
  }) ], q = n.subscribe("hide", function() {
   while (p.length) p.pop().remove();
   q.unsubscribe();
   p = q = null;
  });
 });
 e.exports = l;
}, null);

__d("ContextualDialog", [ "ContextualDialogARIA", "AccessibleLayer", "ContextualDialogArrow", "ContextualDialogDefaultTheme", "ContextualDialogKeepInViewport", "ContextualDialogFitInViewport_PUSHSAFE", "ContextualLayer", "CSS", "DOM", "Event", "JSXDOM", "LayerButtons", "LayerFormHooks", "LayerRefocusOnHide", "LayerHideOnTransition", "LayerMouseHooks", "Style", "copyProperties", "csx", "cx", "invariant", "removeFromArray", "shield" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba, ca) {
 b.__markCompiled && b.__markCompiled();
 var da = 0, ea = 300;
 for (var fa in m) if (m.hasOwnProperty(fa)) ha[fa] = m[fa];
 var ga = m === null ? null : m.prototype;
 ha.prototype = Object.create(ga);
 ha.prototype.constructor = ha;
 ha.__superConstructor__ = m;
 function ha(ia, ja) {
  "use strict";
  ga.constructor.call(this, ia, ja);
  this._footer = null;
 }
 ha.prototype._configure = function(ia, ja) {
  "use strict";
  x(ia, ia.theme || j);
  var ka = ia.arrowBehavior || i;
  ia.addedBehaviors = ia.addedBehaviors || [];
  ia.addedBehaviors.push(ka);
  ga._configure.call(this, ia, ja);
  this._footer = o.scry(ja, "div._572u")[0];
  if (this._footer) if (this._footer.children.length === 1 && this._footer.children[0].nodeName === "DIV" && this._footer.children[0].children.length === 0) {
   this._footer.parentNode.removeChild(this._footer);
  } else n.addClass(this.getContentRoot(), "_kc");
  if (ia.hoverContext) this._registerHoverHandlers(ia.hoverContext, ia.hoverShowDelay, ia.hoverHideDelay);
 };
 ha.prototype._registerHoverHandlers = function(ia, ja, ka) {
  "use strict";
  if (ja == null) ja = da;
  if (ka == null) ka = ea;
  var la, ma, na = function(event) {
   clearTimeout(ma);
   la = setTimeout(ca(this.show, this), ja);
  }.bind(this), oa = function(event) {
   if (this._isHoverLocked()) return;
   clearTimeout(la);
   ma = setTimeout(this.hide.bind(this), ka);
  }.bind(this), pa = p.listen(ia, "mouseenter", na), qa = p.listen(ia, "mouseleave", oa), ra = this.subscribe("mouseenter", na), sa = this.subscribe("mouseleave", oa);
  this.subscribe("destroy", function() {
   clearTimeout(ma);
   pa.remove();
   qa.remove();
   ra.unsubscribe();
   sa.unsubscribe();
  });
 };
 ha.prototype._getDefaultBehaviors = function() {
  "use strict";
  var ia = ga._getDefaultBehaviors.call(this);
  ba(ia, u);
  return ia.concat([ h, t, k, l, r, s, v, g ]);
 };
 ha.prototype._buildWrapper = function(ia, ja) {
  "use strict";
  this._innerWrapper = q.div(null, ja);
  var ka = ga._buildWrapper.call(this, ia, this._innerWrapper);
  n.addClass(ka, ia.wrapperClassName);
  this.replaceEntireLayerContents(ja);
  aa(this.getContent() === ja);
  this.setWidth(ia.width);
  return ka;
 };
 ha.prototype.getContentRoot = function() {
  "use strict";
  aa(!!this._innerWrapper);
  return this._innerWrapper;
 };
 ha.prototype.setContent = function(ia) {
  "use strict";
  aa(false);
 };
 ha.prototype.replaceEntireLayerContents = function(ia) {
  "use strict";
  this._content = null;
  o.empty(this.getContentRoot());
  this.setInnerContent(ia);
 };
 ha.prototype.setInnerContent = function(ia) {
  "use strict";
  n.addClass(ia, "_53ij");
  if (this.getContent()) {
   o.replace(this.getContent(), ia);
  } else o.appendContent(this.getContentRoot(), ia);
  this._content = ia;
  this.isShown() && this.updatePosition();
 };
 ha.prototype.setWidth = function(ia) {
  "use strict";
  w.set(this.getContentRoot(), "width", ia ? Math.floor(ia) + "px" : "");
  return this;
 };
 ha.prototype.getFooter = function() {
  "use strict";
  return this._footer;
 };
 ha.prototype.lockHover = function() {
  "use strict";
  this._hoverLocked = true;
  return this;
 };
 ha.prototype.unlockHover = function() {
  "use strict";
  this._hoverLocked = false;
  return this;
 };
 ha.prototype._isHoverLocked = function() {
  "use strict";
  return !!this._hoverLocked;
 };
 ha.setContext = function(ia, ja) {
  "use strict";
  ia.setContext(ja);
 };
 e.exports = ha;
}, null);

__d("ReactAbstractContextualDialog", [ "ContextualDialog", "ContextualDialogArrow", "LayerAutoFocus", "LayerRefocusOnHide", "React", "copyProperties" ], function(a, b, c, d, e, f, g, h, i, j, k, l) {
 b.__markCompiled && b.__markCompiled();
 var m = k, n = m.PropTypes, o = {
  createSpec: function(p) {
   return {
    displayName: p.displayName,
    propTypes: {
     position: n.oneOf([ "above", "below", "left", "right" ]),
     alignment: n.oneOf([ "left", "center", "right" ]),
     offsetX: n.number,
     offsetY: n.number,
     width: n.number,
     autoFocus: n.bool,
     focusContextOnHide: n.bool,
     arrowBehavior: n.func,
     behaviors: n.object,
     shown: n.bool,
     contextRef: n.string,
     hoverContext: n.object,
     hoverShowDelay: n.number,
     hoverHideDelay: n.number,
     hasActionableContext: n.bool
    },
    immutableProps: {
     modal: null
    },
    createLayer: function(q) {
     var r = this.props.context || this.getNodeForOwnerRef(this.props.contextRef), s = l({
      context: r,
      hoverContext: this.props.hoverContext,
      hoverShowDelay: this.props.hoverShowDelay,
      hoverHideDelay: this.props.hoverHideDelay,
      position: this.props.position,
      alignment: this.props.alignment,
      offsetX: this.props.offsetX,
      offsetY: this.props.offsetY,
      width: this.props.width,
      shouldSetARIAProperties: !this.props.hasActionableContext,
      arrowBehavior: this.props.arrowBehavior || h,
      addedBehaviors: this.enumerateBehaviors(this.props.behaviors)
     }, p || {}), t = new g(s, q);
     if (this.props.contextBounds) t.setContextWithBounds(r, this.props.contextBounds);
     if (this.props.autoFocus !== false) t.enableBehavior(i);
     if (this.props.focusContextOnHide === false) t.disableBehavior(j);
     t.conditionShow(this.props.shown);
     return t;
    },
    receiveProps: function(q) {
     this.updateBehaviors(q.behaviors);
     var r = q.context || this.getNodeForOwnerRef(q.contextRef);
     if (r) if (q.contextBounds) {
      this.layer.setContextWithBounds(r, q.contextBounds);
     } else this.layer.setContext(r);
     this.layer.setPosition(q.position).setAlignment(q.alignment).setOffsetX(q.offsetX).setOffsetY(q.offsetY).setWidth(q.width).conditionShow(q.shown);
    }
   };
  }
 };
 e.exports = o;
}, null);

__d("UntrustedLink", [ "DOM", "Event", "URI", "UserAgent_DEPRECATED", "copyProperties" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 function l(m, n, o, p) {
  this.dom = m;
  this.url = m.href;
  this.hash = n;
  this.func_get_params = p || function() {
   return {};
  };
  h.listen(this.dom, "click", this.onclick.bind(this));
  h.listen(this.dom, "mousedown", this.onmousedown.bind(this));
  h.listen(this.dom, "mouseup", this.onmouseup.bind(this));
  h.listen(this.dom, "mouseout", this.onmouseout.bind(this));
  this.onmousedown(h.$E(o));
 }
 l.bootstrap = function(m, n, o, p) {
  if (m.__untrusted) return;
  m.__untrusted = true;
  new l(m, n, o, p);
 };
 l.prototype.getRewrittenURI = function() {
  var m = k({
   u: this.url,
   h: this.hash
  }, this.func_get_params(this.dom)), n = new i("/l.php").setSubdomain("www");
  if (new i(this.url).getProtocol() == "https") {
   return n.setQueryData(m).setProtocol("https");
  } else return n.setQueryData(m).setProtocol("http");
 };
 l.prototype.onclick = function() {
  setTimeout(function() {
   this.setHref(this.url);
  }.bind(this), 100);
  this.setHref(this.getRewrittenURI());
 };
 l.prototype.onmousedown = function(m) {
  if (m.button == 2) this.setHref(this.getRewrittenURI());
 };
 l.prototype.onmouseup = function() {
  this.setHref(this.getRewrittenURI());
 };
 l.prototype.onmouseout = function() {
  this.setHref(this.url);
 };
 l.prototype.setHref = function(m) {
  if (j.ie() < 9) {
   var n = g.create("span");
   g.appendContent(this.dom, n);
   this.dom.href = m;
   g.remove(n);
  } else this.dom.href = m;
 };
 e.exports = l;
}, null);

__d("Link.react", [ "ErrorUtils", "React", "UntrustedLink", "URI", "invariant", "isFacebookURI", "keyOf" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var n = m({
  url: null
 }), o = h.createClass({
  displayName: "Link",
  propTypes: {
   href: function(p, q, r) {
    var s = p[q], t = typeof s;
    k(s == null || t === "string" || s instanceof j || t === "object" && n in s);
   }
  },
  getURIData: function() {
   var p = this.props.href, q = null;
   if (p instanceof j) {
    p = p.toString();
   } else if (p && typeof p === "object") {
    var r = p;
    p = r.url;
    q = r.shimhash;
   }
   return {
    href: p || "#",
    shimhash: q
   };
  },
  render: function() {
   var p = this.getURIData(), q = this.props.rel;
   if (p.shimhash) {
    q = q ? q + " nofollow" : "nofollow";
   } else try {
    if (!l(j(p.href))) g.reportError(new Error("Rendering external link " + p.href + " without shim"), true);
   } catch (r) {}
   return h.createElement("a", h.__spread({}, this.props, {
    href: p.href,
    rel: q,
    onMouseDown: this._handleMouseDown
   }), this.props.children);
  },
  _handleMouseDown: function(event) {
   var p = this.getURIData();
   if (p.shimhash) i.bootstrap(h.findDOMNode(this), p.shimhash);
   this.props.onMouseDown && this.props.onMouseDown(event);
  }
 });
 e.exports = o;
}, null);

__d("joinClasses", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 function g(h) {
  if (!h) h = "";
  var i, j = arguments.length;
  if (j > 1) for (var k = 1; k < j; k++) {
   i = arguments[k];
   if (i) h = (h ? h + " " : "") + i;
  }
  return h;
 }
 e.exports = g;
}, null);

__d("ReactPropTransferer", [ "Object.assign", "emptyFunction", "joinClasses" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 function j(o) {
  return function(p, q, r) {
   if (!p.hasOwnProperty(q)) {
    p[q] = r;
   } else p[q] = o(p[q], r);
  };
 }
 var k = j(function(o, p) {
  return g({}, p, o);
 }), l = {
  children: h,
  className: j(i),
  style: k
 };
 function m(o, p) {
  for (var q in p) {
   if (!p.hasOwnProperty(q)) continue;
   var r = l[q];
   if (r && l.hasOwnProperty(q)) {
    r(o, q, p[q]);
   } else if (!o.hasOwnProperty(q)) o[q] = p[q];
  }
  return o;
 }
 var n = {
  mergeProps: function(o, p) {
   return m(g({}, o), p);
  }
 };
 e.exports = n;
}, null);

__d("cloneWithProps", [ "ReactElement", "ReactPropTransferer", "keyOf", "warning" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var k = i({
  children: null
 });
 function l(m, n) {
  var o = h.mergeProps(n, m.props);
  if (!o.hasOwnProperty(k) && m.props.hasOwnProperty(k)) o.children = m.props.children;
  return g.createElement(m.type, o);
 }
 e.exports = l;
}, null);

__d("AbstractButton.react", [ "Link.react", "React", "cloneWithProps", "cx", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 var l = h, m = l.PropTypes, n = h.createClass({
  displayName: "AbstractButton",
  propTypes: {
   image: m.element,
   imageRight: m.element,
   depressed: m.bool,
   label: m.node,
   onClick: m.func
  },
  handleLinkClick: function(o) {
   if (this.props.disabled) {
    o.preventDefault();
   } else if (this.props.onClick) this.props.onClick(o);
  },
  render: function() {
   var o = "_42ft" + (this.props.disabled ? " " + "_42fr" : "") + (this.props.depressed ? " " + "_42fs" : ""), p, q = this.props.image;
   if (q) {
    p = {};
    if (this.props.label) {
     p.alt = "";
     p.className = "_3-8_";
    }
    q = i(q, p);
   }
   var r = this.props.imageRight;
   if (r) {
    p = {};
    if (this.props.label) {
     p.alt = "";
     p.className = "_3-99";
    }
    r = i(r, p);
   }
   var s;
   if (this.props.href) {
    s = h.createElement(g, h.__spread({}, this.props, {
     className: k(this.props.className, o),
     disabled: null,
     label: null,
     onClick: this.handleLinkClick
    }), q, this.props.label, r);
   } else if (this.props.type && this.props.type !== "submit") {
    s = h.createElement("button", h.__spread({}, this.props, {
     className: k(this.props.className, o),
     label: null,
     type: this.props.type
    }), q, this.props.label, r);
   } else s = h.createElement("button", h.__spread({}, this.props, {
    className: k(this.props.className, o),
    label: null,
    type: "submit",
    value: "1"
   }), q, this.props.label, r);
   return s;
  }
 });
 e.exports = n;
}, null);

__d("XUIButton.react", [ "AbstractButton.react", "React", "cx", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 var k = h, l = k.PropTypes, m = "medium", n = h.createClass({
  displayName: "XUIButton",
  statics: {
   getButtonSize: function(o) {
    return o.size || m;
   }
  },
  propTypes: {
   use: l.oneOf([ "default", "special", "confirm" ]),
   size: l.oneOf([ "small", "medium", "large", "xlarge", "xxlarge" ]),
   borderShade: l.oneOf([ "light", "dark" ]),
   suppressed: l.bool
  },
  getDefaultProps: function() {
   return {
    use: "default",
    size: m,
    borderShade: "light",
    suppressed: false
   };
  },
  render: function() {
   var o = this.props.use, p = n.getButtonSize(this.props), q = this.props.borderShade, r = this.props.suppressed, s = "_4jy0" + (p === "small" ? " " + "_517i" : "") + (p === "medium" ? " " + "_4jy3" : "") + (p === "large" ? " " + "_4jy4" : "") + (p === "xlarge" ? " " + "_4jy5" : "") + (p === "xxlarge" ? " " + "_4jy6" : "") + (o === "default" ? " " + "_517h" : "") + (o === "confirm" ? " " + "_4jy1" : "") + (o === "special" ? " " + "_4jy2" : "") + (q === "light" ? " " + "_51sy" : "") + (q === "dark" ? " " + "_9c6" : "") + (r ? " " + "_59pe" : "") + (o === "confirm" || o === "special" ? " " + "selected" : "");
   return h.createElement(g, h.__spread({}, this.props, {
    className: j(this.props.className, s)
   }));
  }
 });
 e.exports = n;
}, null);

__d("XUIAbstractGlyphButton.react", [ "AbstractButton.react", "React", "cx", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var k = h, l = k.PropTypes, m = h.createClass({
  displayName: "XUIAbstractGlyphButton",
  propTypes: {
   label: l.node
  },
  render: function() {
   return h.createElement(g, h.__spread({}, this.props, {
    className: j(this.props.className, "_5upp")
   }));
  }
 });
 e.exports = m;
}, null);

__d("XUICloseButton.react", [ "XUIAbstractGlyphButton.react", "React", "cx", "fbt", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 var l = h, m = l.PropTypes, n = h.createClass({
  displayName: "XUICloseButton",
  propTypes: {
   shade: m.oneOf([ "light", "dark" ]),
   size: m.oneOf([ "small", "medium" ]),
   type: m.oneOf([ "submit", "button", "reset" ])
  },
  getDefaultProps: function() {
   return {
    size: "medium",
    shade: "dark",
    type: "button"
   };
  },
  render: function() {
   var o = this.props.size, p = this.props.shade, q = "_50zy" + (o === "small" ? " " + "_50zz" : "") + (o === "medium" ? " " + "_50-0" : "") + (p === "light" ? " " + "_50z_" : "") + (p === "dark" ? " " + "_50z-" : ""), r = this.props.label, s = this.props.title;
   if (!this.props.title && !this.props.tooltip) {
    if (!r) r = j._("Remove");
    s = r;
   }
   return h.createElement(g, h.__spread({}, this.props, {
    label: r,
    title: s,
    type: this.props.href ? null : this.props.type,
    "aria-label": this.props.tooltip,
    "data-hover": this.props.tooltip && "tooltip",
    "data-tooltip-alignh": this.props.tooltip && "center",
    className: k(this.props.className, q)
   }));
  }
 });
 e.exports = n;
}, null);

__d("LEGACY_getSiblingByRef", [ "ReactInstanceMap" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var h = function(i, j) {
  var k = g.get(i), l = k._currentElement._owner;
  if (!l || !l.getPublicInstance() || !l.getPublicInstance().refs) return null;
  return l.getPublicInstance().refs[j];
 };
 e.exports = h;
}, null);

__d("HasLayerContextMixin", [ "React", "LEGACY_getSiblingByRef" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 var i = {
  getContextNode: function() {
   var j = this.props.context;
   if (this.props.contextRef) {
    var k = h(this, this.props.contextRef);
    j = k && g.findDOMNode(k);
   }
   return j;
  }
 };
 e.exports = i;
}, null);

__d("ContextualDialogXUITheme", [ "cx" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 var h = {
  wrapperClassName: "_53ii",
  arrowDimensions: {
   offset: 12,
   length: 16
  }
 };
 e.exports = h;
}, null);

__d("SubscriptionsHandler", [ "invariant" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 function h(k) {
  return k.remove || k.reset || k.unsubscribe;
 }
 function i(k) {
  var l = h(k);
  l.call(k);
 }
 function j() {
  "use strict";
  this._subscriptions = [];
 }
 j.prototype.addSubscriptions = function() {
  "use strict";
  for (var k = [], l = 0, m = arguments.length; l < m; l++) k.push(arguments[l]);
  k.forEach(function(n) {
   var o = h(n);
   g(o);
  });
  if (this._subscriptions) {
   this._subscriptions = this._subscriptions.concat(k);
  } else k.forEach(i);
 };
 j.prototype.engage = function() {
  "use strict";
  this._subscriptions = this._subscriptions || [];
 };
 j.prototype.release = function() {
  "use strict";
  if (this._subscriptions) {
   this._subscriptions.forEach(i);
   this._subscriptions = null;
  }
 };
 e.exports = j;
}, null);

__d("ReactLayer", [ "React", "ReactBrowserEventEmitter", "SubscriptionsHandler", "emptyFunction", "getObjectValues", "invariant", "merge", "LEGACY_getSiblingByRef" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var o = {
  componentDidMount: function() {
   this._layerContainer = document.createElement("div");
   this._renderContentIntoContainer();
   this.layer = this.createLayer(this._layerContainer);
   l(this.layer);
   this.layerSubscriptions = new i();
   this.layerSubscribe("show", function() {
    return this.props.onToggle && this.props.onToggle(true);
   }.bind(this));
   this.layerSubscribe("hide", function() {
    return this.props.onToggle && this.props.onToggle(false);
   }.bind(this));
   this.layerSubscribe("blur", function() {
    return this.props.onBlur && this.props.onBlur();
   }.bind(this));
  },
  componentDidUpdate: function() {
   this._renderContentIntoContainer();
   this.receiveProps(this.props);
  },
  componentWillUnmount: function() {
   g.unmountComponentAtNode(this._layerContainer);
   this._layerContainer = null;
   if (this.layer) {
    this.layer.destroy();
    this.layer = null;
   }
   if (this.layerSubscriptions) {
    this.layerSubscriptions.release();
    this.layerSubscriptions = null;
   }
  },
  _renderContentIntoContainer: function() {
   g.render(g.createElement("div", null, this.props.children), this._layerContainer);
  },
  render: function() {
   return null;
  },
  enumerateBehaviors: function(q) {
   q = this.getEffectiveBehaviors(q);
   return k(q).filter(j.thatReturnsArgument);
  },
  updateBehaviors: function(q) {
   var r = this.getEffectiveBehaviors(this.props.behaviors), s = this.getEffectiveBehaviors(q), t;
   for (t in r) if (!s[t]) this.layer.disableBehavior(r[t]);
   for (t in s) {
    var u = r[t], v = s[t];
    if (u && v) {
     l(u === v);
     continue;
    }
    u && this.layer.disableBehavior(u);
    v && this.layer.enableBehavior(v);
   }
  },
  getEffectiveBehaviors: function(q) {
   if (!this.getDefaultEnabledBehaviors) return q || {};
   return m(this.getDefaultEnabledBehaviors(), q);
  },
  layerSubscribe: function(q, r) {
   var s = this.layer, t = s.subscribe || s.addListener;
   this.layerSubscriptions.addSubscriptions(t.call(s, q, function(u, v) {
    h.isEnabled() && r(u, v);
   }));
  },
  getNodeForOwnerRef: function(q) {
   var r = n(this, q);
   return r && g.findDOMNode(r);
  }
 }, p = {
  createClass: function(q) {
   return g.createClass({
    mixins: [ o, q ]
   });
  }
 };
 e.exports = p;
}, null);

__d("XUIContextualDialogBody.react", [ "React" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 var h = g.createClass({
  displayName: "XUIContextualDialogBody",
  render: function() {
   return g.createElement("div", null, this.props.children);
  }
 });
 e.exports = h;
}, null);

__d("XUIOverlayFooter.react", [ "React", "cx", "joinClasses" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 var j = g.createClass({
  displayName: "XUIOverlayFooter",
  render: function() {
   return g.createElement("div", g.__spread({}, this.props, {
    className: i(this.props.className, "_5lnf uiOverlayFooter")
   }), this.props.children);
  }
 });
 e.exports = j;
}, null);

__d("XUIContextualDialogFooter.react", [ "React", "XUIOverlayFooter.react", "cx" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 var j = g.createClass({
  displayName: "XUIContextualDialogFooter",
  render: function() {
   return g.createElement(h, {
    className: "_572u"
   }, this.props.children);
  }
 });
 e.exports = j;
}, null);

__d("XUIContextualDialogTitle.react", [ "React", "cx" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 var i = g, j = i.PropTypes, k = g.createClass({
  displayName: "XUIContextualDialogTitle",
  propTypes: {
   use: j.oneOf([ "primary", "secondary" ])
  },
  getDefaultProps: function() {
   return {
    use: "primary"
   };
  },
  render: function() {
   var l = this.props.use, m = "_47lu" + (l === "primary" ? " " + "_47lv" : "") + (l === "secondary" ? " " + "_47mc" : "");
   return g.createElement("h3", {
    className: m
   }, this.props.children);
  }
 });
 e.exports = k;
}, null);

__d("XUIContextualDialog.react", [ "HasLayerContextMixin", "ContextualDialogXUITheme", "React", "ReactAbstractContextualDialog", "ReactLayer", "XUIContextualDialogBody.react", "XUIContextualDialogFooter.react", "XUIContextualDialogTitle.react", "cx" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
 b.__markCompiled && b.__markCompiled();
 var p = i, q = p.PropTypes, r = k.createClass(j.createSpec({
  displayName: "ReactXUIContextualDialog",
  theme: h
 })), s = i.createClass({
  displayName: "XUIContextualDialog",
  mixins: [ g ],
  propTypes: {
   position: q.oneOf([ "above", "below", "left", "right" ]),
   alignment: q.oneOf([ "left", "center", "right" ]),
   offsetX: q.number,
   offsetY: q.number,
   width: q.number,
   autoFocus: q.bool,
   arrowBehavior: q.func,
   behaviors: q.object,
   shown: q.bool,
   context: q.object,
   contextRef: q.string,
   hoverContext: q.object,
   hoverShowDelay: q.number,
   hoverHideDelay: q.number,
   hasActionableContext: q.bool
  },
  getDefaultProps: function() {
   return {
    hasActionableContext: false
   };
  },
  _getDialogBody: function() {
   return this._getChildOfType(l);
  },
  _getDialogTitle: function() {
   return this._getChildOfType(n);
  },
  _getDialogFooter: function() {
   return this._getChildOfType(m);
  },
  _getChildOfType: function(t) {
   var u = null;
   i.Children.forEach(this.props.children, function(v) {
    if (!u && v.type === t) u = v;
   });
   return u;
  },
  updatePosition: function() {
   var t = this.refs.dialog;
   if (t) t.layer.updatePosition();
  },
  render: function() {
   var t = this.props.children, u = this._getDialogBody();
   if (u) t = i.createElement("div", {
    className: "_53iv"
   }, this._getDialogTitle(), u);
   return i.createElement(r, i.__spread({}, this.props, {
    ref: "dialog",
    context: this.getContextNode()
   }), t, u ? this._getDialogFooter() : null);
  }
 });
 s.WIDTH = {
  NORMAL: 312,
  WIDE: 400
 };
 e.exports = s;
}, null);

__d("XUIDialogButton.react", [ "React", "XUIButton.react", "cx", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 var k = g, l = k.PropTypes, m = g.createClass({
  displayName: "XUIDialogButton",
  propTypes: {
   action: l.oneOf([ "cancel", "confirm", "button" ])
  },
  render: function() {
   var n = this.props.action, o = (n == "confirm" ? "layerConfirm" : "") + (n == "cancel" ? " " + "layerCancel" : "") + (n == "button" ? " " + "layerButton" : ""), p = this.props.href;
   if (n == "cancel") {
    p = "#";
   } else if (n == "button") p = p || "#";
   return g.createElement(h, g.__spread({}, this.props, {
    className: j(this.props.className, o),
    href: p
   }));
  }
 });
 e.exports = m;
}, null);

__d("XUIDialogCancelButton.react", [ "React", "XUIDialogButton.react", "fbt" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 var j = g.createClass({
  displayName: "XUIDialogCancelButton",
  render: function() {
   return g.createElement(h, g.__spread({}, this.props, {
    action: "cancel",
    label: i._("Cancel")
   }));
  }
 });
 e.exports = j;
}, null);

__d("LayerFadeOnShow", [ "Animation", "Style", "UserAgent_DEPRECATED", "copyProperties", "emptyFunction" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 function l(m) {
  "use strict";
  this._layer = m;
 }
 l.prototype.enable = function() {
  "use strict";
  if (i.ie() < 9) return;
  this._subscriptions = [ this._layer.subscribe("beforeshow", function() {
   h.set(this._layer.getRoot(), "opacity", 0);
  }.bind(this)), this._layer.subscribe("show", this._animate.bind(this)) ];
 };
 l.prototype.disable = function() {
  "use strict";
  if (this._subscriptions) {
   while (this._subscriptions.length) this._subscriptions.pop().unsubscribe();
   this._subscriptions = null;
  }
 };
 l.prototype._getDuration = function() {
  "use strict";
  return 100;
 };
 l.prototype._animate = function() {
  "use strict";
  var m = this._layer.getRoot();
  new g(m).from("opacity", 0).to("opacity", 1).duration(this._getDuration()).ondone(h.set.bind(null, m, "opacity", "")).go();
 };
 l.forDuration = function(m) {
  "use strict";
  for (var n in l) if (l.hasOwnProperty(n)) p[n] = l[n];
  var o = l === null ? null : l.prototype;
  p.prototype = Object.create(o);
  p.prototype.constructor = p;
  p.__superConstructor__ = l;
  function p() {
   if (l !== null) l.apply(this, arguments);
  }
  p.prototype._getDuration = k.thatReturns(m);
  return p;
 };
 j(l.prototype, {
  _subscriptions: null
 });
 e.exports = l;
}, null);

__d("XUIDialog.react", [ "AbstractDialog.react", "LayerFadeOnShow", "ReactLayer" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 var j = i.createClass(g.createSpec({
  displayName: "XUIDialog",
  addedBehaviors: {
   LayerFadeOnShow: h
  }
 }));
 e.exports = j;
}, null);

__d("XUIText.react", [ "React", "cx", "joinClasses" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 var j = g, k = j.PropTypes, l = g.createClass({
  displayName: "XUIText",
  propTypes: {
   size: k.oneOf([ "small", "medium", "large", "xlarge", "inherit" ]),
   weight: k.oneOf([ "bold", "inherit", "normal" ]),
   display: k.oneOf([ "inline", "block" ])
  },
  getDefaultProps: function() {
   return {
    size: "inherit",
    weight: "inherit",
    display: "inline"
   };
  },
  render: function() {
   var m = this.props.size, n = this.props.weight, o = (m === "small" ? "_50f3" : "") + (m === "medium" ? " " + "_50f4" : "") + (m === "large" ? " " + "_50f5" : "") + (m === "xlarge" ? " " + "_50f6" : "") + (n === "bold" ? " " + "_50f7" : "") + (n === "normal" ? " " + "_5kx5" : "");
   if (this.props.display === "block") return g.createElement("div", g.__spread({}, this.props, {
    className: i(this.props.className, o)
   }), this.props.children);
   return g.createElement("span", g.__spread({}, this.props, {
    className: i(this.props.className, o)
   }), this.props.children);
  }
 });
 e.exports = l;
}, null);

__d("XUIDialogBody.react", [ "React", "cx", "joinClasses", "XUIText.react" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 var k = g, l = k.PropTypes, m = g.createClass({
  displayName: "XUIDialogBody",
  propTypes: {
   useCustomPadding: l.bool
  },
  render: function() {
   var n = "_4-i2" + (!this.props.useCustomPadding ? " " + "_57_a" : "");
   return g.createElement(j, g.__spread({}, this.props, {
    className: i(this.props.className, n),
    display: "block",
    size: "medium"
   }), this.props.children);
  }
 });
 e.exports = m;
}, null);

__d("LeftRight.react", [ "React", "ReactChildren", "cx", "invariant", "keyMirror", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j, k, l) {
 b.__markCompiled && b.__markCompiled();
 var m = k({
  left: true,
  right: true,
  both: true
 });
 function n(p) {
  j(p && (p.length === 1 || p.length === 2));
 }
 var o = g.createClass({
  displayName: "LeftRight",
  render: function() {
   var p = [];
   h.forEach(this.props.children, function(x) {
    p.push(x);
   }, this);
   n(p);
   var q = this.props.direction || m.both, r = q === m.both, s = r || q === m.left ? "_ohe lfloat" : "", t = r || q === m.right ? "_ohf rfloat" : "", u = g.createElement("div", {
    key: "left",
    className: s
   }, p[0]), v = p.length < 2 ? null : g.createElement("div", {
    key: "right",
    className: t
   }, p[1]), w = q === m.right && v ? [ v, u ] : [ u, v ];
   return g.createElement("div", g.__spread({}, this.props, {
    className: l(this.props.className, "clearfix")
   }), w);
  }
 });
 o.DIRECTION = m;
 e.exports = o;
}, null);

__d("XUIDialogFooter.react", [ "LeftRight.react", "React", "XUIOverlayFooter.react", "cx", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 var l = h, m = l.PropTypes, n = h.createClass({
  displayName: "XUIDialogFooter",
  propTypes: {
   fullBleedBorder: m.bool,
   leftContent: m.object
  },
  render: function() {
   var o = "_5a8u" + (this.props.fullBleedBorder ? " " + "_27qq" : "");
   return h.createElement(i, h.__spread({}, this.props, {
    className: k(this.props.className, o)
   }), h.createElement("div", {
    className: "_50f4"
   }, h.createElement(g, null, h.createElement("div", null, this.props.leftContent), h.createElement("div", null, this.props.children))));
  }
 });
 e.exports = n;
}, null);

__d("sliceChildren", [ "ReactFragment", "flattenChildren" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 function i(j, k, l) {
  if (j == null) return j;
  var m = {}, n = h(j), o = 0;
  for (var p in n) {
   if (!n.hasOwnProperty(p)) continue;
   var q = n[p];
   if (o >= k) m[p] = q;
   o++;
   if (l != null && o >= l) break;
  }
  return g.create(m);
 }
 e.exports = i;
}, null);

__d("XUIDialogTitle.react", [ "LeftRight.react", "React", "XUICloseButton.react", "cx", "fbt", "sliceChildren", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
 b.__markCompiled && b.__markCompiled();
 var n = h, o = n.PropTypes, p = h.createClass({
  displayName: "XUIDialogTitle",
  propTypes: {
   closeButtonText: o.string,
   showCloseButton: o.bool
  },
  getDefaultProps: function() {
   return {
    closeButtonText: k._("Close"),
    showCloseButton: true
   };
  },
  render: function() {
   var q = null;
   if (this.props.showCloseButton) q = h.createElement(i, {
    label: this.props.closeButtonText,
    className: "layerCancel _51-t"
   });
   return h.createElement("div", h.__spread({}, this.props, {
    className: m(this.props.className, "_4-i0")
   }), h.createElement(g, null, h.createElement("h3", {
    className: "_52c9"
   }, l(this.props.children, 0, 1)), h.createElement("div", {
    className: "_51-u"
   }, l(this.props.children, 1), q)));
  }
 });
 e.exports = p;
}, null);

__d("XUISpinner.react", [ "BrowserSupport", "React", "UserAgent_DEPRECATED", "cx", "fbt", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j, k, l) {
 b.__markCompiled && b.__markCompiled();
 var m = h, n = m.PropTypes, o = g.hasCSSAnimations() && !i.firefox(), p = h.createClass({
  displayName: "XUISpinner",
  propTypes: {
   paused: n.bool,
   showOnAsync: n.bool,
   size: n.oneOf([ "small", "large" ]),
   background: n.oneOf([ "light", "dark" ])
  },
  getDefaultProps: function() {
   return {
    showOnAsync: false,
    size: "small",
    background: "light"
   };
  },
  render: function() {
   var q = "img" + (" " + "_55ym") + (this.props.size == "small" ? " " + "_55yn" : "") + (this.props.size == "large" ? " " + "_55yq" : "") + (this.props.background == "light" ? " " + "_55yo" : "") + (this.props.background == "dark" ? " " + "_55yp" : "") + (this.props.showOnAsync ? " " + "_5tqs" : "") + (!o ? " " + "_5d9-" : "") + (o && this.props.paused ? " " + "_2y32" : "");
   return h.createElement("span", h.__spread({}, this.props, {
    className: l(this.props.className, q),
    "aria-label": k._("Loading..."),
    "aria-busy": true
   }));
  }
 });
 e.exports = p;
}, null);

__d("XUIGrayText.react", [ "React", "XUIText.react", "cx", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 var k = g, l = k.PropTypes, m = g.createClass({
  displayName: "XUIGrayText",
  propTypes: {
   shade: l.oneOf([ "light", "medium", "dark" ])
  },
  getDefaultProps: function() {
   return {
    shade: "light"
   };
  },
  render: function() {
   var n = (this.props.shade === "light" ? "_50f8" : "") + (this.props.shade === "medium" ? " " + "_c24" : "") + (this.props.shade === "dark" ? " " + "_50f9" : "");
   return g.createElement(h, g.__spread({}, this.props, {
    className: j(this.props.className, n)
   }), this.props.children);
  }
 });
 e.exports = m;
}, null);

__d("areJSONRepresentationsEqual", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 function g(h, i) {
  return JSON.stringify(h) == JSON.stringify(i);
 }
 e.exports = g;
}, null);

__d("cancelAnimationFramePolyfill", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 var g = a.cancelAnimationFrame || a.webkitCancelAnimationFrame || a.mozCancelAnimationFrame || a.oCancelAnimationFrame || a.msCancelAnimationFrame || a.clearTimeout;
 e.exports = g;
}, null);

__d("htmlSpecialChars", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 var g = /&/g, h = /</g, i = />/g, j = /"/g, k = /'/g;
 function l(m) {
  if (typeof m == "undefined" || m === null || !m.toString) return "";
  if (m === false) {
   return "0";
  } else if (m === true) return "1";
  return m.toString().replace(g, "&amp;").replace(j, "&quot;").replace(k, "&#039;").replace(h, "&lt;").replace(i, "&gt;");
 }
 e.exports = l;
}, null);

__d("Image.react-upstream", [ "React", "joinClasses" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 function i(k, l, m) {
  var n = k[l];
  if (typeof n === "string") return;
  if (n && typeof n === "object") {
   if (n.sprited && n.spriteMapCssClass && n.spriteCssClass) return;
   if (!n.sprited && n.uri) return;
  }
  return new Error("Provided `" + l + "` to `" + m + "`. Must be a string " + "or `ix` call.");
 }
 var j = g.createClass({
  displayName: "ReactImage",
  propTypes: {
   src: i
  },
  render: function() {
   var k = h(this.props.className, "img"), l = this.props.src, m = null;
   if (this.props.alt && typeof l !== "string" && l.sprited) m = g.createElement("u", null, this.props.alt);
   if (typeof l === "string") return g.createElement("img", g.__spread({}, this.props, {
    className: k
   }), m);
   if (l.sprited) {
    k = h(k, l.spriteMapCssClass, l.spriteCssClass);
    return g.createElement("i", g.__spread({}, this.props, {
     className: k,
     src: null
    }), m);
   }
   if (this.props.width === void 0 && this.props.height === void 0) return g.createElement("img", g.__spread({}, this.props, {
    className: k,
    width: l.width,
    height: l.height,
    src: l.uri
   }), m);
   return g.createElement("img", g.__spread({}, this.props, {
    className: k,
    src: l.uri
   }), m);
  }
 });
 j.validateImageSrcPropType = i;
 e.exports = j;
}, null);

__d("InlineBlock.react", [ "React", "cx", "joinClasses" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 var j = g, k = j.PropTypes, l = {
  baseline: null,
  bottom: "_6d",
  middle: "_6b",
  top: "_6e"
 }, m = g.createClass({
  displayName: "InlineBlock",
  propTypes: {
   alignv: k.oneOf([ "baseline", "bottom", "middle", "top" ]),
   height: k.number,
   fullWidth: k.bool
  },
  getDefaultProps: function() {
   return {
    alignv: "baseline",
    fullWidth: false
   };
  },
  render: function() {
   var n = l[this.props.alignv], o = "_6a";
   if (this.props.fullWidth) o = i(o, "_5u5j");
   var p = i(o, n);
   if (this.props.height != null) {
    var q = g.createElement("div", {
     className: i("_6a", n),
     style: {
      height: this.props.height + "px"
     }
    });
    return g.createElement("div", g.__spread({}, this.props, {
     className: i(this.props.className, o),
     height: null
    }), q, g.createElement("div", {
     className: p
    }, this.props.children));
   } else return g.createElement("div", g.__spread({}, this.props, {
    className: i(this.props.className, p)
   }), this.props.children);
  }
 });
 e.exports = m;
}, null);

__d("Image.react", [ "Image.react-upstream" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 e.exports = g;
}, null);

__d("formatDate", [ "DateConsts", "DateFormatConfig", "fbt", "invariant" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 function k(o, p, q) {
  q = q || {};
  if (!p || !o) return "";
  if (typeof o === "string") o = parseInt(o, 10);
  if (typeof o === "number") o = new Date(o * 1e3);
  j(o instanceof Date);
  j(!isNaN(o.getTime()));
  j(o.getTime() < 1e15);
  if (typeof p !== "string") {
   var r = m();
   for (var s in r) {
    var t = r[s];
    if (t.start <= o.getTime() && p[t.name]) {
     p = p[t.name];
     break;
    }
   }
  }
  var u;
  if (q.skipPatternLocalization || !q.formatInternal && n() || p.length === 1) {
   u = p;
  } else {
   j(h.formats[p]);
   u = h.formats[p];
  }
  var v = q.utc ? "getUTC" : "get", w = o[v + "Date"](), x = o[v + "Day"](), y = o[v + "Month"](), z = o[v + "FullYear"](), aa = o[v + "Hours"](), ba = o[v + "Minutes"](), ca = o[v + "Seconds"](), da = o[v + "Milliseconds"](), ea = "";
  for (var fa = 0; fa < u.length; fa++) {
   var ga = u.charAt(fa);
   switch (ga) {
   case "\\":
    fa++;
    ea += u.charAt(fa);
    break;

   case "d":
    ea += l(w, 2);
    break;

   case "j":
    ea += w;
    break;

   case "S":
    ea += g.getOrdinalSuffix(w);
    break;

   case "D":
    ea += g.getWeekdayNameShort(x);
    break;

   case "l":
    ea += g.getWeekdayName(x);
    break;

   case "F":
   case "f":
    ea += g.getMonthName(y + 1);
    break;

   case "M":
    ea += g.getMonthNameShort(y + 1);
    break;

   case "m":
    ea += l(y + 1, 2);
    break;

   case "n":
    ea += y + 1;
    break;

   case "Y":
    ea += z;
    break;

   case "y":
    ea += ("" + z).slice(2);
    break;

   case "a":
    if (aa < 12) {
     ea += i._("am");
    } else ea += i._("pm");
    break;

   case "A":
    if (aa < 12) {
     ea += i._("AM");
    } else ea += i._("PM");
    break;

   case "g":
    ea += aa === 0 || aa === 12 ? 12 : aa % 12;
    break;

   case "G":
    ea += aa;
    break;

   case "h":
    if (aa === 0 || aa === 12) {
     ea += 12;
    } else ea += l(aa % 12, 2);
    break;

   case "H":
    ea += l(aa, 2);
    break;

   case "i":
    ea += l(ba, 2);
    break;

   case "s":
    ea += l(ca, 2);
    break;

   case "X":
    ea += l(da, 3);
    break;

   default:
    ea += ga;
   }
  }
  return ea;
 }
 function l(o, p) {
  return Array(p - ("" + o).length + 1).join("0") + o;
 }
 function m() {
  var o = new Date(), p = o.getTime(), q = o.getFullYear(), r = o.getDate() - (o.getDay() - h.weekStart + 6) % 7, s = new Date(q, o.getMonth() + 1, 0).getDate(), t = new Date(q, 1, 29).getMonth() === 1 ? 366 : 365, u = 1e3 * 60 * 60 * 24;
  return [ {
   name: "today",
   start: o.setHours(0, 0, 0, 0)
  }, {
   name: "withinDay",
   start: p - u
  }, {
   name: "thisWeek",
   start: new Date(o.getTime()).setDate(r)
  }, {
   name: "withinWeek",
   start: p - u * 7
  }, {
   name: "thisMonth",
   start: o.setDate(1)
  }, {
   name: "withinMonth",
   start: p - u * s
  }, {
   name: "thisYear",
   start: o.setMonth(0)
  }, {
   name: "withinYear",
   start: p - u * t
  }, {
   name: "older",
   start: -Infinity
  } ];
 }
 k.periodNames = [ "today", "thisWeek", "thisMonth", "thisYear", "withinDay", "withinWeek", "withinMonth", "withinYear", "older" ];
 function n() {
  if (typeof window === "undefined" || !window || !window.location || !window.location.pathname) return false;
  var o = window.location.pathname, p = "/intern";
  return o.substr(0, p.length) === p;
 }
 e.exports = k;
}, null);

__d("Log", [ "sprintf" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 var h = {
  DEBUG: 3,
  INFO: 2,
  WARNING: 1,
  ERROR: 0
 };
 function i(k, l) {
  var m = Array.prototype.slice.call(arguments, 2), n = g.apply(null, m), o = window.console;
  if (o && j.level >= l) o[k in o ? k : "log"](n);
 }
 var j = {
  level: -1,
  Level: h,
  debug: i.bind(null, "debug", h.DEBUG),
  info: i.bind(null, "info", h.INFO),
  warn: i.bind(null, "warn", h.WARNING),
  error: i.bind(null, "error", h.ERROR)
 };
 e.exports = j;
}, null);

__d("cancelAnimationFrame", [ "cancelAnimationFramePolyfill" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 e.exports = g.bind(a);
}, null);

__d("shallowCompare", [ "shallowEqual" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 function h(i, j, k) {
  return !g(i.props, j) || !g(i.state, k);
 }
 e.exports = h;
}, null);

__d("ReactComponentWithPureRenderMixin", [ "shallowCompare" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var h = {
  shouldComponentUpdate: function(i, j) {
   return g(this, i, j);
  }
 };
 e.exports = h;
}, null);

__d("ReactLayeredComponentMixin", [ "ExecutionEnvironment", "ReactInstanceMap", "ReactCurrentOwner", "React", "ReactFragment" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var l = {
  componentWillMount: function() {
   if (g.canUseDOM) this._layersContainer = document.createElement("div");
  },
  componentDidMount: function() {
   this._renderLayersIntoContainer();
  },
  componentDidUpdate: function() {
   this._renderLayersIntoContainer();
  },
  componentWillUnmount: function() {
   j.unmountComponentAtNode(this._layersContainer);
  },
  _renderLayersIntoContainer: function() {
   i.current = h.get(this);
   var m;
   try {
    m = this.renderLayers();
   } finally {
    i.current = null;
   }
   if (m && !Array.isArray(m) && !j.isValidElement(m)) m = k.create(m);
   j.render(j.createElement("div", null, m), this._layersContainer);
  }
 };
 e.exports = l;
}, null);

__d("FBRTCConstants", [ "FBRTCStruct" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 var h = {
  OFFER: "offer",
  ANSWER: "answer",
  ICE_CANDIDATE: "ice_candidate",
  OK: "ok",
  PING: "ping",
  HANGUP: "hang_up",
  OTHER_DISMISS: "other_dismiss",
  MSG_ACK: "msg_ack",
  PRANSWER: "pranswer",
  ICERESTART_OFFER: "icerestart_offer",
  ICERESTART_ANSWER: "icerestart_answer",
  PCRESTART_OFFER: "pcrestart_offer",
  PCRESTART_ANSWER: "pcrestart_answer",
  SDP_UPDATE: "sdp_update",
  OFFER_ACK: "offer_ack",
  OFFER_NACK: "offer_nack",
  ANSWER_ACK: "answer_ack",
  SET_VIDEO: "set_video"
 }, i = new g([ {
  IGNORE_CALL: "IgnoreCall"
 }, {
  HANGUP_CALL: "HangupCall"
 }, {
  IN_ANOTHER_CALL: "InAnotherCall"
 }, {
  ACCEPT_AFTER_HANGUP: "CallEndAcceptAfterHangUp"
 }, {
  NO_ANSWER_TIMEOUT: "NoAnswerTimeout"
 }, {
  INCOMING_TIMEOUT: "IncomingTimeout"
 }, {
  OTHER_INSTANCE_HANDLED: "OtherInstanceHandled"
 }, {
  SIGNALING_MESSAGE_FAILED: "SignalingMessageFailed"
 }, {
  CONNECTION_DROPPED: "ConnectionDropped"
 }, {
  CLIENT_INTERRUPTED: "ClientInterrupted"
 }, {
  WEBRTC_ERROR: "WebRTCError"
 }, {
  CLIENT_ERROR: "ClientError"
 }, {
  NO_PERMISSION: "NoPermission"
 }, {
  OTHER_NOT_CAPABLE: "OtherNotCapable"
 }, {
  NO_UI_ERROR: "NoUIShown"
 }, {
  UNSUPPORTED_VERSION: "VersionUnsupported"
 }, {
  CALLER_NOT_VISIBLE: "CallerNotVisible"
 }, {
  CARRIER_BLOCKED: "CarrierBlocked"
 }, {
  OTHER_CARRIER_BLOCKED: "OtherCarrierBlocked"
 } ]), j = {
  HANG_UP: 1,
  TOGGLE_MUTE_AUDIO: 2,
  TOGGLE_MUTE_VIDEO: 3,
  TOGGLE_FULL_SCREEN: 4,
  TOGGLE_SELF_VIEW: 5,
  SUBMIT_STAR_RATING: 6,
  SUBMIT_FEEDBACK: 7,
  SHOW_SETTINGS: 8,
  START_CALL: 9
 }, k = {
  PayloadType: h,
  CallEndReason: i,
  UIEventType: j,
  endCallReasonFromString: function(l) {
   return i.strNames.indexOf(l);
  },
  callEndReasonString: function(l) {
   if (l < 0 || l > i.strNames.length) return "Unknown";
   return i.strNames[l];
  },
  fullCallEndReasonString: function(l, m) {
   return this.callEndReasonString(l) + "_" + (m ? "remote" : "local");
  }
 };
 e.exports = k;
}, null);

__d("FBRTCIceStatsParser", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 var g = null;
 h.getInstance = function() {
  "use strict";
  if (!g) g = new h();
  return g;
 };
 function h() {
  "use strict";
 }
 h.prototype.extractIceInfo = function(i) {
  "use strict";
  var j = [], k = i.split("\r\n");
  for (var l = 0; l < k.length; l++) {
   var m = k[l];
   if (this.$FBRTCIceStatsParser0(m)) j.push({
    gen: this.$FBRTCIceStatsParser1(m),
    type: this.$FBRTCIceStatsParser2(m)
   });
  }
  return j;
 };
 h.prototype.$FBRTCIceStatsParser0 = function(i) {
  "use strict";
  return i.indexOf("candidate:") > -1;
 };
 h.prototype.$FBRTCIceStatsParser1 = function(i) {
  "use strict";
  var j = 0, k = i.match(/generation (\d+)/);
  if (k) j = parseInt(k[1], 10);
  return j;
 };
 h.prototype.$FBRTCIceStatsParser2 = function(i) {
  "use strict";
  var j = i.match(/typ (host|relay|srflx|prflx)/);
  if (j) {
   return j[1];
  } else return "unknown";
 };
 e.exports = h;
}, null);

__d("FBRTCLogger", [ "Log", "LogHistory", "MarauderLogger", "formatDate", "pageID" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 var l = "webrtc", m = "sent_message", n = "received_message", o = "send_succeeded", p = "send_failed", q = "info", r = "call_action", s = "client_event", t = "client_error", u = "type", v = "msg_id", w = "ack_msg_id", x = "call_id", y = "from", z = "to", aa = "content", ba = "tag", ca = "peer_id", da = "error_code", ea = "trigger", fa = "endcallstats", ga = null;
 ha.getInstance = function() {
  "use strict";
  if (!ga) ga = new ha();
  return ga;
 };
 function ha() {
  "use strict";
  this.$FBRTCLogger0 = h.getInstance(l);
 }
 ha.prototype.logToConsole = function(ia) {
  "use strict";
  var ja = "Console";
  this.$FBRTCLogger1(null, null, ja, ia);
  this.$FBRTCLogger0.log(ja, ia);
 };
 ha.prototype.logReceivedMessage = function(ia, ja, ka) {
  "use strict";
  var la = {};
  la[y] = ia;
  la[x] = ja;
  la[u] = ka.type;
  la[v] = ka.msg_id;
  if (ka.sdp) la[aa] = ka.sdp;
  if (ka.ack_id) la[w] = ka.ack_id;
  this.$FBRTCLogger2(n, la);
  this.$FBRTCLogger1(ia, ja, "Received", ka.type + ", " + ka.msg_id);
 };
 ha.prototype.logSentMessage = function(ia, ja, ka) {
  "use strict";
  var la = {};
  la[z] = ia;
  la[x] = ja;
  la[u] = ka.type;
  la[v] = ka.msg_id;
  if (ka.sdp) la[aa] = ka.sdp;
  if (ka.ack_id) la[w] = ka.ack_id;
  this.$FBRTCLogger2(m, la);
  this.$FBRTCLogger1(ia, ja, "Sent", ka.type + ", " + ka.msg_id);
 };
 ha.prototype.logSentMessageSuccess = function(ia, ja, ka, la) {
  "use strict";
  var ma = {};
  ma[ca] = ia;
  ma[x] = ja;
  ma[u] = ka;
  ma[v] = la;
  this.$FBRTCLogger2(o, ma);
 };
 ha.prototype.logSentMessageFailure = function(ia, ja, ka, la, ma) {
  "use strict";
  var na = {};
  na[ca] = ia;
  na[x] = ja;
  na[u] = ka;
  na[v] = la;
  na[da] = ma;
  this.$FBRTCLogger2(p, na);
  this.$FBRTCLogger1(ia, ja, "Send Failed", ka + ", " + ma);
 };
 ha.prototype.logCallAction = function(ia, ja, ka, la, ma) {
  "use strict";
  var na = {};
  na[ca] = ia;
  na[x] = ja;
  na[r] = ka;
  na[aa] = la;
  if (ma) na[ea] = ma;
  this.$FBRTCLogger2(r, na);
  this.$FBRTCLogger1(ia, ja, "CallAction", ka + ", " + la);
 };
 ha.prototype.logEvent = function(ia, ja, event) {
  "use strict";
  var ka = {};
  ka[ca] = ia;
  ka[x] = ja;
  ka[aa] = event;
  this.$FBRTCLogger2(s, ka);
  this.$FBRTCLogger1(ia, ja, "Event", event);
 };
 ha.prototype.logInfo = function(ia, ja, ka) {
  "use strict";
  var la = {};
  la[ca] = ia;
  la[x] = ja;
  la[aa] = ka;
  this.$FBRTCLogger2(q, la);
  this.$FBRTCLogger1(ia, ja, "Info", ka);
 };
 ha.prototype.logError = function(ia, ja, ka) {
  "use strict";
  var la = {};
  la[ca] = ia;
  la[x] = ja;
  la[aa] = ka;
  this.$FBRTCLogger2(t, la);
  this.$FBRTCLogger1(ia, ja, "Error", ka);
 };
 ha.prototype.logErrorWithoutID = function(ia) {
  "use strict";
  this.logError(null, null, ia);
 };
 ha.prototype.logEndCallSummary = function(ia) {
  "use strict";
  if (!ia) return;
  var ja = {};
  ja[ca] = ia.peerID;
  ja[x] = ia.callID;
  ja[ba] = fa;
  ja[aa] = ia.toString();
  var ka = ia.getExtraInfo();
  for (var la in ka) if (ka.hasOwnProperty(la)) ja[la] = ka[la];
  this.$FBRTCLogger2(q, ja);
  this.$FBRTCLogger1(ia.peerID, ia.callID, "Call Summary", ja);
 };
 ha.prototype.$FBRTCLogger2 = function(ia, ja) {
  "use strict";
  ja.page_id = k;
  this.$FBRTCLogger0.log(ia, ja);
  i.log(ia, l, ja);
 };
 ha.prototype.$FBRTCLogger1 = function(ia, ja, ka, la) {
  "use strict";
 };
 ha.CallAction = {
  START_CALL: "start_call",
  RECEIVED_CALL: "received_call",
  ANSWER_CALL: "answer_call",
  END_CALL: "end_call",
  DENIED_PERMISSION: "denied_permission",
  SET_MUTE: "set_mute",
  SET_VIDEO_ON: "set_video_on",
  SET_SELF_VIEW_ON: "set_self_view_on",
  SET_FULLSCREEN_ON: "set_fullscreen_on",
  START_SKYPE: "start_skype",
  TRY_NEW: "try_new",
  OPEN_POPUP: "open_popup",
  POPUP_OPENED: "popup_opened",
  AUTO_DISABLE_VIDEO: "auto_disable_video",
  FAILED_GETTING_URI: "failed_getting_uri",
  OLD_URI: "old_uri",
  USER_SETTINGS_CHANGED: "user_settings_changed"
 };
 ha.Trigger = {
  ADMIN_MESSAGE: "admin_message",
  CHAT_TAB_ICON: "chat_tab_icon",
  CHAT_TAB_ICON_TOUR: "chat_tab_icon_tour",
  SKYPE_DEPRECATION_DIALOG: "skype_deprecation_dialog",
  REDIAL_BUTTON: "redial_button",
  RETURN_CALL: "return_call",
  WEB_MESSENGER: "web_messenger",
  POPUP_CALL_START_BUTTON: "popup_start_call_button",
  UNKNOWN: "unknown"
 };
 ha.Key = {
  DEVICE_INFO: "device_info",
  RATING: "rating5",
  RATING_SHOWN: "rating_shown",
  SURVEY_CHOICE: "survey_choice",
  SURVEY_DETAILS: "survey_details",
  SURVEY_SHOWN: "survey_shown",
  INITIATED_BY_PAGE_ID: "initiated_by_page_id",
  PEER_IS_MOBILE: "peer_is_mobile"
 };
 e.exports = ha;
}, null);

__d("FBRTCCallSummary", [ "FBRTCConstants", "FBRTCIceStatsParser", "FBRTCLogger", "UserAgentData", "copyProperties", "performanceNow" ], function(a, b, c, d, e, f, g, h, i, j, k, l) {
 b.__markCompiled && b.__markCompiled();
 var m = 5 * 60 * 1e3, n = {
  CALL_STARTED: "started",
  POPUP_OPENED: "opened",
  SENT_OFFER: "s_o",
  RECV_OFFER: "r_o",
  SENT_OFFER_ACK: "s_oack",
  RECV_OFFER_ACK: "r_oack",
  SENT_RETRIED_OFFER: "s_o2",
  RECV_RETRIED_OFFER: "r_o2",
  SENT_RETRIED_OFFER_ACK: "s_oack2",
  RECV_RETRIED_OFFER_ACK: "r_oack2",
  SENT_PRANSWER: "s_pr",
  RECV_PRANSWER: "r_pr",
  NETWORK_READY: "network_ready",
  SENT_ANSWER: "s_a",
  RECV_ANSWER: "r_a",
  SENT_ANSWER_ACK: "s_aack",
  RECV_ANSWER_ACK: "r_aack",
  SENT_RETRIED_ANSWER: "s_a2",
  RECV_RETRIED_ANSWER: "r_a2",
  SENT_RETRIED_ANSWER_ACK: "s_aack2",
  RECV_RETRIED_ANSWER_ACK: "r_aack2",
  SENT_OK: "s_ok",
  RECV_OK: "r_ok",
  CALL_CONNECTED: "connected",
  CALL_ENDED: "ended"
 };
 o.CURRENT_SUMMARY_VERSION = 10;
 function o(p) {
  "use strict";
  this.peerID = p.peerID;
  this.callID = p.callID;
  this.$FBRTCCallSummary0 = p.isCaller;
  this.$FBRTCCallSummary1 = new Date().valueOf();
  this.$FBRTCCallSummary2 = null;
  this.$FBRTCCallSummary3 = {};
  this.$FBRTCCallSummary4 = null;
  this.$FBRTCCallSummary5 = null;
  this.$FBRTCCallSummary6 = null;
  this.$FBRTCCallSummary7 = null;
  this.$FBRTCCallSummary8 = null;
  this.$FBRTCCallSummary9 = null;
  this.$FBRTCCallSummarya = {};
  this.$FBRTCCallSummaryb = {};
  this.$FBRTCCallSummaryc = {};
  this.$FBRTCCallSummaryd = {};
  this.$FBRTCCallSummarye = {};
  this.$FBRTCCallSummaryf = {};
  this.$FBRTCCallSummaryg = l();
  this.$FBRTCCallSummaryh = 0;
  this.$FBRTCCallSummaryi = {};
  this.$FBRTCCallSummaryj = this.$FBRTCCallSummaryg;
  this.$FBRTCCallSummaryk = 0;
  this.$FBRTCCallSummaryl = {};
  this.addExtraInfo(i.Key.DEVICE_INFO, this.$FBRTCCallSummarym());
  this.$FBRTCCallSummaryn();
  this.$FBRTCCallSummaryo = h.getInstance();
  this.$FBRTCCallSummaryp = i.getInstance();
 }
 o.prototype.toJsonString = function() {
  "use strict";
  this.$FBRTCCallSummary8 = new Date().valueOf();
  return JSON.stringify({
   version: o.CURRENT_SUMMARY_VERSION,
   peerID: this.peerID,
   callID: this.callID,
   isCaller: this.$FBRTCCallSummary0,
   startTime: this.$FBRTCCallSummary1,
   trigger: this.$FBRTCCallSummary2,
   signalingTime: this.$FBRTCCallSummary3,
   endCallReason: this.$FBRTCCallSummary4,
   endCallSubreason: this.$FBRTCCallSummary5,
   isRemoteEnded: this.$FBRTCCallSummary6,
   lastUpdatedTime: this.$FBRTCCallSummary7,
   lastSerializedTime: this.$FBRTCCallSummary8,
   unsetOnRetrieve: this.$FBRTCCallSummary9,
   openCount: this.$FBRTCCallSummaryk,
   extraInfo: this.$FBRTCCallSummaryl,
   pcStats: this.$FBRTCCallSummarya,
   captureStats: this.$FBRTCCallSummaryb,
   gen0IceSentCount: this.$FBRTCCallSummaryc,
   gen0IceReceivedCount: this.$FBRTCCallSummaryd,
   iceSentCount: this.$FBRTCCallSummarye,
   iceReceivedCount: this.$FBRTCCallSummaryf,
   newSignalingTime: this.$FBRTCCallSummaryi,
   accumulatedCallTime: this.$FBRTCCallSummaryq()
  });
 };
 o.fromJsonString = function(p) {
  "use strict";
  var q;
  try {
   q = JSON.parse(p);
  } catch (r) {
   return null;
  }
  if (q.version !== o.CURRENT_SUMMARY_VERSION) return null;
  if (!q.hasOwnProperty("peerID") || !q.hasOwnProperty("callID") || !q.hasOwnProperty("isCaller") || !q.hasOwnProperty("startTime") || !q.hasOwnProperty("trigger") || !q.hasOwnProperty("signalingTime") || !q.hasOwnProperty("endCallReason") || !q.hasOwnProperty("isRemoteEnded") || !q.hasOwnProperty("lastUpdatedTime") || !q.hasOwnProperty("lastSerializedTime")) return null;
  var s = new o({
   peerID: q.peerID,
   callID: q.callID,
   isCaller: q.isCaller
  });
  s.$FBRTCCallSummary1 = q.startTime;
  s.$FBRTCCallSummary2 = q.trigger;
  s.$FBRTCCallSummary3 = q.signalingTime;
  s.$FBRTCCallSummary4 = q.endCallReason;
  s.$FBRTCCallSummary5 = q.endCallSubreason;
  s.$FBRTCCallSummary6 = q.isRemoteEnded;
  s.$FBRTCCallSummary7 = q.lastUpdatedTime;
  s.$FBRTCCallSummary8 = q.lastSerializedTime;
  if (q.unsetOnRetrieve) s.$FBRTCCallSummary9 = q.unsetOnRetrieve;
  if (q.openCount) s.$FBRTCCallSummaryk = q.openCount;
  if (q.extraInfo) s.$FBRTCCallSummaryl = q.extraInfo;
  if (q.pcStats) s.$FBRTCCallSummarya = q.pcStats;
  if (q.captureStats) s.$FBRTCCallSummaryb = q.captureStats;
  if (q.gen0IceSentCount) s.$FBRTCCallSummaryc = q.gen0IceSentCount;
  if (q.gen0IceReceivedCount) s.$FBRTCCallSummaryd = q.gen0IceReceivedCount;
  if (q.iceSentCount) s.$FBRTCCallSummarye = q.iceSentCount;
  if (q.iceReceivedCount) s.$FBRTCCallSummaryf = q.iceReceivedCount;
  if (q.newSignalingTime) s.$FBRTCCallSummaryi = q.newSignalingTime;
  if (q.accumulatedCallTime) s.$FBRTCCallSummaryh = q.accumulatedCallTime;
  return s;
 };
 o.restoreOrInitialize = function(p, q, r, s, t) {
  "use strict";
  var u = p.retrieveCallSummary(q, r);
  if (!u) {
   u = new o({
    peerID: q,
    callID: r,
    isCaller: s
   });
   if (t) {
    u.onFullMessageReceived({
     msg: t
    });
    u.onOfferAckSent(t);
   } else u.onCallStarted(i.Trigger.UNKNOWN);
   i.getInstance().logError(q, r, "Missing call summary from storage");
  } else if (u.$FBRTCCallSummary9) {
   u.$FBRTCCallSummary4 = null;
   u.$FBRTCCallSummary5 = null;
   u.$FBRTCCallSummary6 = null;
   delete u.$FBRTCCallSummary3[n.CALL_ENDED];
   delete u.$FBRTCCallSummaryi[n.CALL_ENDED];
   u.$FBRTCCallSummary9 = null;
  }
  return u;
 };
 o.logSavedSummaries = function(p) {
  "use strict";
  var q = p.getLoggableSummaries(), r = q.length;
  if (r <= 0) return;
  var s = i.getInstance(), t = [];
  for (var u = 0; u < r; u++) {
   var v = q[u];
   s.logEndCallSummary(v);
   t.push({
    peerID: v.peerID,
    callID: v.callID
   });
  }
  p.removeCallSummaries(t);
  s.logToConsole("Logged pending summaries: " + r);
 };
 o.prototype.save = function(p) {
  "use strict";
  var q = l(), r = q - this.$FBRTCCallSummaryj;
  if (r > m) {
   this.$FBRTCCallSummaryp.logInfo(this.peerID, this.callID, "Summary too old: " + r);
   return;
  }
  p.storeCallSummary(this.peerID, this.callID, this);
  this.$FBRTCCallSummaryj = q;
 };
 o.prototype.getLastUpdatedTime = function() {
  "use strict";
  return this.$FBRTCCallSummary7;
 };
 o.prototype.setLastUpdatedTime = function(p) {
  "use strict";
  this.$FBRTCCallSummary7 = p;
 };
 o.prototype.getExtraInfo = function() {
  "use strict";
  return this.$FBRTCCallSummaryl;
 };
 o.prototype.addExtraInfo = function(p, q) {
  "use strict";
  this.$FBRTCCallSummaryl[p] = q;
  this.$FBRTCCallSummaryn();
 };
 o.prototype.onCallStarted = function(p) {
  "use strict";
  this.$FBRTCCallSummary2 = p;
  this.$FBRTCCallSummaryr(n.CALL_STARTED);
  this.$FBRTCCallSummaryn();
 };
 o.prototype.onPopupOpened = function() {
  "use strict";
  this.$FBRTCCallSummaryr(n.POPUP_OPENED);
  this.$FBRTCCallSummaryk++;
  this.$FBRTCCallSummaryn();
 };
 o.prototype.setPcStats = function(p) {
  "use strict";
  this.$FBRTCCallSummarya = p;
  this.$FBRTCCallSummaryn();
 };
 o.prototype.setVideoCaptureStats = function(p, q) {
  "use strict";
  this.$FBRTCCallSummaryb = {
   w: p,
   h: q
  };
  this.$FBRTCCallSummaryn();
 };
 o.prototype.onOfferAckSent = function(p) {
  "use strict";
  this.onMessageSent({
   type: g.PayloadType.OFFER_ACK,
   flag: p.flag
  });
 };
 o.prototype.onMessageSent = function(p) {
  "use strict";
  var q = p.flag === 1;
  switch (p.type) {
  case g.PayloadType.OFFER:
   this.$FBRTCCallSummarys(q, n.SENT_OFFER, n.SENT_RETRIED_OFFER);
   this.$FBRTCCallSummaryt(p, this.$FBRTCCallSummaryc, this.$FBRTCCallSummarye);
   break;

  case g.PayloadType.ANSWER:
   this.$FBRTCCallSummarys(q, n.SENT_ANSWER, n.SENT_RETRIED_ANSWER);
   this.$FBRTCCallSummaryt(p, this.$FBRTCCallSummaryc, this.$FBRTCCallSummarye);
   break;

  case g.PayloadType.OK:
   this.$FBRTCCallSummaryr(n.SENT_OK);
   break;

  case g.PayloadType.PRANSWER:
   this.$FBRTCCallSummaryr(n.SENT_PRANSWER);
   break;

  case g.PayloadType.OFFER_ACK:
   this.$FBRTCCallSummarys(q, n.SENT_OFFER_ACK, n.SENT_RETRIED_OFFER_ACK);
   break;

  case g.PayloadType.ANSWER_ACK:
   this.$FBRTCCallSummarys(q, n.SENT_ANSWER_ACK, n.SENT_RETRIED_ANSWER_ACK);
   break;

  case g.PayloadType.ICE_CANDIDATE:
   this.$FBRTCCallSummaryt(p, this.$FBRTCCallSummaryc, this.$FBRTCCallSummarye);
   break;

  default:  }
  this.$FBRTCCallSummaryn();
 };
 o.prototype.$FBRTCCallSummaryt = function(p, q, r) {
  "use strict";
  var s = null, t = null, u = this.$FBRTCCallSummaryo.extractIceInfo(p.sdp);
  for (var v = 0; v < u.length; v++) {
   s = u[v].gen;
   t = u[v].type;
   if (s === 0) this.$FBRTCCallSummaryu(q, t);
   this.$FBRTCCallSummaryu(r, t);
  }
 };
 o.prototype.$FBRTCCallSummaryu = function(p, q) {
  "use strict";
  if (!p[q]) {
   p[q] = 1;
  } else p[q] = p[q] + 1;
 };
 o.prototype.$FBRTCCallSummaryv = function(p) {
  "use strict";
  if (p.isFromMobile()) this.addExtraInfo(i.Key.PEER_IS_MOBILE, "1");
 };
 o.prototype.onFullMessageReceived = function(p) {
  "use strict";
  var q = p.msg, r = q.flag === 1;
  switch (q.type) {
  case g.PayloadType.OFFER:
   this.$FBRTCCallSummaryv(p);
   this.$FBRTCCallSummarys(r, n.RECV_OFFER, n.RECV_RETRIED_OFFER);
   this.$FBRTCCallSummaryt(q, this.$FBRTCCallSummaryd, this.$FBRTCCallSummaryf);
   break;

  case g.PayloadType.ANSWER:
   this.$FBRTCCallSummaryv(p);
   this.$FBRTCCallSummarys(r, n.RECV_ANSWER, n.RECV_RETRIED_ANSWER);
   this.$FBRTCCallSummaryt(q, this.$FBRTCCallSummaryd, this.$FBRTCCallSummaryf);
   break;

  case g.PayloadType.OK:
   this.$FBRTCCallSummaryr(n.RECV_OK);
   break;

  case g.PayloadType.PRANSWER:
   this.$FBRTCCallSummaryr(n.RECV_PRANSWER);
   break;

  case g.PayloadType.OFFER_ACK:
   this.$FBRTCCallSummarys(r, n.RECV_OFFER_ACK, n.RECV_RETRIED_OFFER_ACK);
   break;

  case g.PayloadType.ANSWER_ACK:
   this.$FBRTCCallSummarys(r, n.RECV_ANSWER_ACK, n.RECV_RETRIED_ANSWER_ACK);
   break;

  case g.PayloadType.ICE_CANDIDATE:
   this.$FBRTCCallSummaryt(q, this.$FBRTCCallSummaryd, this.$FBRTCCallSummaryf);
   break;

  default:  }
  this.$FBRTCCallSummaryn();
 };
 o.prototype.onMsgAckReceived = function(p, q) {
  "use strict";
  var r = p.msg.flag === 1;
  if (q) {
   this.$FBRTCCallSummarys(r, n.RECV_OFFER_ACK, n.RECV_RETRIED_OFFER_ACK);
  } else this.$FBRTCCallSummarys(r, n.RECV_ANSWER_ACK, n.RECV_RETRIED_ANSWER_ACK);
 };
 o.prototype.onCallConnected = function() {
  "use strict";
  this.$FBRTCCallSummaryr(n.NETWORK_READY);
  this.$FBRTCCallSummaryr(n.CALL_CONNECTED);
  this.$FBRTCCallSummaryn();
 };
 o.prototype.onCallEnded = function(p, q, r, s) {
  "use strict";
  this.$FBRTCCallSummary9 = r;
  this.$FBRTCCallSummary4 = p;
  this.$FBRTCCallSummary5 = s;
  this.$FBRTCCallSummary6 = q;
  this.$FBRTCCallSummaryr(n.CALL_ENDED);
  this.$FBRTCCallSummaryn();
 };
 o.prototype.toString = function() {
  "use strict";
  var p = {};
  p.core_metrics = this.$FBRTCCallSummaryw();
  p.time_series = null;
  return JSON.stringify(p);
 };
 o.prototype.$FBRTCCallSummaryw = function() {
  "use strict";
  var p = {};
  p.ver = o.CURRENT_SUMMARY_VERSION;
  p.caller = this.$FBRTCCallSummary0;
  p.conn = this.$FBRTCCallSummaryx();
  p.peer_id = this.peerID;
  p.has_video = true;
  p.open_count = this.$FBRTCCallSummaryk;
  p.signaling = this.$FBRTCCallSummaryy();
  p.sender = this.$FBRTCCallSummaryz();
  p.receiver = this.$FBRTCCallSummaryA();
  p.end = this.$FBRTCCallSummaryB();
  p.video = this.$FBRTCCallSummaryC();
  return p;
 };
 o.prototype.$FBRTCCallSummaryx = function() {
  "use strict";
  var p = {
   dtls: 1
  };
  if (this.$FBRTCCallSummarya.sender && this.$FBRTCCallSummarya.sender.rtt) p.rtt = this.$FBRTCCallSummarya.sender.rtt;
  return p;
 };
 o.prototype.$FBRTCCallSummaryy = function() {
  "use strict";
  var p = {};
  if (this.$FBRTCCallSummary2) p.trigger = this.$FBRTCCallSummary2;
  p.start_time = this.$FBRTCCallSummary1;
  p.time_from_start = this.$FBRTCCallSummary3;
  var q = this.$FBRTCCallSummary3[n.CALL_CONNECTED], r = this.$FBRTCCallSummary3[n.CALL_ENDED];
  if (q) {
   if (!r) if (this.$FBRTCCallSummary8) {
    r = this.$FBRTCCallSummary8 - this.$FBRTCCallSummary1;
   } else r = this.$FBRTCCallSummaryD();
   var s = r - q;
   if (s > 0) p.duration = s;
  }
  p.new_time_from_start = this.$FBRTCCallSummaryi;
  q = this.$FBRTCCallSummaryi[n.CALL_CONNECTED];
  r = this.$FBRTCCallSummaryi[n.CALL_ENDED];
  if (q) {
   if (!r) if (this.$FBRTCCallSummaryh > 0) {
    r = this.$FBRTCCallSummaryh;
   } else r = this.$FBRTCCallSummaryq();
   s = r - q;
   if (s > 0) p.new_duration = s;
  }
  return p;
 };
 o.prototype.$FBRTCCallSummaryz = function() {
  "use strict";
  var p = {};
  if (this.$FBRTCCallSummaryc) p.ice_g0 = this.$FBRTCCallSummaryc;
  if (this.$FBRTCCallSummarye) p.ice = this.$FBRTCCallSummarye;
  if (this.$FBRTCCallSummarya.sender) k(p, this.$FBRTCCallSummarya.sender);
  return p;
 };
 o.prototype.$FBRTCCallSummaryA = function() {
  "use strict";
  var p = {};
  if (this.$FBRTCCallSummaryd) p.ice_g0 = this.$FBRTCCallSummaryd;
  if (this.$FBRTCCallSummaryf) p.ice = this.$FBRTCCallSummaryf;
  return p;
 };
 o.prototype.$FBRTCCallSummaryB = function() {
  "use strict";
  var p = {};
  if (this.$FBRTCCallSummary4 !== null) {
   p.end_call_reason_string = g.callEndReasonString(this.$FBRTCCallSummary4);
   if (this.$FBRTCCallSummary5 !== null) p.end_call_subreason_string = this.$FBRTCCallSummary5;
   p.remote_ended = this.$FBRTCCallSummary6;
  }
  if (this.$FBRTCCallSummarya.end) k(p, this.$FBRTCCallSummarya.end);
  return p;
 };
 o.prototype.$FBRTCCallSummaryC = function() {
  "use strict";
  var p = {
   capture: {}
  };
  if (this.$FBRTCCallSummarya.video && this.$FBRTCCallSummarya.video.sender) k(p, this.$FBRTCCallSummarya.video.sender);
  if (this.$FBRTCCallSummaryb) k(p.capture, this.$FBRTCCallSummaryb);
  return {
   sender: p
  };
 };
 o.prototype.$FBRTCCallSummaryD = function() {
  "use strict";
  return new Date().valueOf() - this.$FBRTCCallSummary1;
 };
 o.prototype.$FBRTCCallSummaryq = function() {
  "use strict";
  var p = l() - this.$FBRTCCallSummaryg;
  return Math.floor(this.$FBRTCCallSummaryh + p);
 };
 o.prototype.$FBRTCCallSummaryr = function(p) {
  "use strict";
  if (this.$FBRTCCallSummary3[p]) return;
  this.$FBRTCCallSummary3[p] = this.$FBRTCCallSummaryD();
  this.$FBRTCCallSummaryi[p] = this.$FBRTCCallSummaryq();
 };
 o.prototype.$FBRTCCallSummarys = function(p, q, r) {
  "use strict";
  if (p) {
   this.$FBRTCCallSummaryr(r);
  } else this.$FBRTCCallSummaryr(q);
 };
 o.prototype.$FBRTCCallSummaryn = function() {
  "use strict";
  this.$FBRTCCallSummary7 = new Date().valueOf();
 };
 o.prototype.$FBRTCCallSummarym = function() {
  "use strict";
  return {
   device: j.deviceName,
   os: j.platformName,
   os_version: j.platformFullVersion,
   browser: j.browserName,
   browser_version: j.browserFullVersion,
   screen_height: window.screen.availHeight,
   screen_width: window.screen.availWidth
  };
 };
 e.exports = o;
}, null);

__d("FBRTCCallSummaryStore", [ "CacheStorage", "FBRTCCallSummary", "FBRTCLogger", "areEqual" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 var k = "localstorage", l = "RTC_CALL_SUMMARY_", m = "summary", n = 2e3, o = 3, p = 3 * 60 * 1e3, q = null;
 r.getInstance = function() {
  "use strict";
  if (!q) q = new r();
  return q;
 };
 function r() {
  "use strict";
  this.$FBRTCCallSummaryStore0 = new g(k, l);
  this.$FBRTCCallSummaryStore1 = i.getInstance();
 }
 r.prototype.storeCallSummary = function(s, t, u) {
  "use strict";
  var v = this;
  this.$FBRTCCallSummaryStore2(function(w) {
   if (!w[s]) w[s] = {};
   var x = w[s][t];
   if (x) {
    var y = v.$FBRTCCallSummaryStore3(x);
    if (y && y.getLastUpdatedTime() > u.getLastUpdatedTime()) {
     v.$FBRTCCallSummaryStore1.logToConsole("Outdated summaries");
     return null;
    }
   }
   w[s][t] = v.$FBRTCCallSummaryStore4(u);
   return w;
  }, v.$FBRTCCallSummaryStore1.logError.bind(v.$FBRTCCallSummaryStore1, s, t));
 };
 r.prototype.retrieveCallSummary = function(s, t) {
  "use strict";
  var u = this.$FBRTCCallSummaryStore5(), v = null;
  if (u[s]) v = u[s][t];
  if (v) {
   return this.$FBRTCCallSummaryStore3(v);
  } else return null;
 };
 r.prototype.removeCallSummary = function(s, t) {
  "use strict";
  this.removeCallSummaries([ {
   peerID: s,
   callID: t
  } ]);
 };
 r.prototype.removeCallSummaries = function(s) {
  "use strict";
  var t = this;
  this.$FBRTCCallSummaryStore2(function(u) {
   var v = s.length;
   for (var w = 0; w < v; w++) {
    var x = s[w].peerID, y = s[w].callID;
    if (u[x] && u[x][y]) {
     delete u[x][y];
     if (t.$FBRTCCallSummaryStore6(u[x])) delete u[x];
    }
   }
   return u;
  }, t.$FBRTCCallSummaryStore1.logError.bind(t.$FBRTCCallSummaryStore1, null, null));
 };
 r.prototype.getLoggableSummaries = function() {
  "use strict";
  var s = this.$FBRTCCallSummaryStore5(), t = [];
  for (var u in s) if (s.hasOwnProperty(u)) for (var v in s[u]) if (s[u].hasOwnProperty(v)) {
   var w = this.$FBRTCCallSummaryStore3(s[u][v], p);
   if (w) t.push(w);
  }
  return t;
 };
 r.prototype.$FBRTCCallSummaryStore6 = function(s) {
  "use strict";
  for (var t in s) if (s.hasOwnProperty(t)) return false;
  return true;
 };
 r.prototype.$FBRTCCallSummaryStore4 = function(s) {
  "use strict";
  var t = {
   __t: Date.now(),
   __d: s.toJsonString()
  };
  return t;
 };
 r.prototype.$FBRTCCallSummaryStore3 = function(s, t) {
  "use strict";
  if (s) if (!t || Date.now() - s.__t >= t) return h.fromJsonString(s.__d);
  return null;
 };
 r.prototype.$FBRTCCallSummaryStore5 = function() {
  "use strict";
  var s = this.$FBRTCCallSummaryStore0.get(m) || {};
  return s;
 };
 r.prototype.$FBRTCCallSummaryStore2 = function(s, t, u, v) {
  "use strict";
  if (u === void 0 || u === null) u = o;
  var w = this.$FBRTCCallSummaryStore5(), x = this.$FBRTCCallSummaryStore5(), y = s(w);
  if (y === null) return;
  var z = this.$FBRTCCallSummaryStore5();
  if (j(x, z)) {
   this.$FBRTCCallSummaryStore0.set(m, y);
   this.$FBRTCCallSummaryStore1.logToConsole("Updated summaries");
  } else if (u > 0) {
   t("Retry lock");
   if (v) {
    var aa = this;
    setTimeout(function() {
     aa.$FBRTCCallSummaryStore2(s, t, u - 1, true);
    }, n);
   } else this.$FBRTCCallSummaryStore2(s, t, u - 1, true);
  } else t("Failed to lock");
 };
 e.exports = r;
}, null);

__d("FBRTCMessageListener", [ "Arbiter", "ChannelConstants", "invariant", "mixInEventEmitter" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var k = [], l = null, m = {
  init: function() {
   g.subscribe(h.getArbiterType("webrtc"), function(n, o) {
    this._onMessage(o.obj);
   }.bind(this));
  },
  setMessageHandler: function(n, o) {
   i(!l);
   l = o ? n.bind(o) : n;
   while (k.length) l(k.shift());
  },
  _onMessage: function(n) {
   this.emit("messageReceived", n);
   if (l) {
    l(n);
   } else k.push(n);
  }
 };
 j(m, {
  messageReceived: true
 });
 e.exports = m;
}, null);

__d("FBRTCUtils", [ "emptyFunction", "randomInt", "AsyncRequest" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 var j = 6e3, k = {
  attachMediaStream: function(l, m) {
   if (window.webkitRTCPeerConnection) {
    l.src = window.webkitURL.createObjectURL(m);
   } else {
    l.mozSrcObject = m;
    l.play();
   }
  },
  reattachMediaStream: function(l, m) {
   if (window.webkitRTCPeerConnection) {
    l.src = m.src;
   } else {
    l.mozSrcObject = m.mozSrcObject;
    l.play();
   }
  },
  generateRandomInt: function() {
   return h(0, 4294967294) + 1;
  },
  aboutEqual: function(l, m) {
   return l - m < .01 && m - l < .01;
  },
  sendServerRequest: function(l, m, n, o, p, q) {
   m = m || g;
   n = n || g;
   o = o || false;
   p = p || j;
   q = q || {};
   var r = new i().setURI(l).setData(q).setAllowCrossPageTransition(true).setHandler(m).setErrorHandler(n).setTimeoutHandler(p, function() {
    n();
   });
   if (o) r.setOption("asynchronous", false);
   r.send();
  }
 };
 e.exports = k;
}, null);

__d("FBRTCStreamTester", [ "mixInEventEmitter", "FBRTCUtils" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 var i = 100, j = 30;
 function k(l) {
  "use strict";
  if (!l) l = {};
  this.$FBRTCStreamTester0 = l.retries || j;
  this.$FBRTCStreamTester1 = l.testInterval || i;
  this.$FBRTCStreamTester2 = null;
  this.$FBRTCStreamTester3 = null;
  this.$FBRTCStreamTester4 = false;
 }
 k.prototype.testStream = function(l, m) {
  "use strict";
  this.$FBRTCStreamTester2 = l;
  if (!m) {
   this.$FBRTCStreamTester4 = true;
   this.$FBRTCStreamTester3 = document.createElement("video");
   this.$FBRTCStreamTester3.muted = true;
   h.attachMediaStream(this.$FBRTCStreamTester3, this.$FBRTCStreamTester2);
   this.$FBRTCStreamTester3.play();
  } else {
   this.$FBRTCStreamTester4 = false;
   this.$FBRTCStreamTester3 = m;
  }
  this.$FBRTCStreamTester5(this.$FBRTCStreamTester0);
 };
 k.prototype.$FBRTCStreamTester5 = function(l) {
  "use strict";
  if (this.$FBRTCStreamTester2.getVideoTracks().length === 0 || this.$FBRTCStreamTester3.currentTime > 0) {
   this.$FBRTCStreamTester6();
   this.emit("streamWorking");
  } else if (l < 1) {
   this.$FBRTCStreamTester6();
   this.emit("streamBroken");
  } else setTimeout(this.$FBRTCStreamTester5.bind(this, l - 1), this.$FBRTCStreamTester1);
 };
 k.prototype.$FBRTCStreamTester6 = function() {
  "use strict";
  if (this.$FBRTCStreamTester4) this.$FBRTCStreamTester3.pause();
  this.$FBRTCStreamTester3 = null;
  this.$FBRTCStreamTester2 = null;
 };
 g(k, {
  streamWorking: true,
  streamBroken: true
 });
 e.exports = k;
}, null);

__d("XVideoCallInitController", [ "XController" ], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 e.exports = b("XController").create("/videocall/init/", {
  peer_id: {
   type: "Int",
   required: true
  },
  call_id: {
   type: "Int",
   required: true
  },
  is_caller: {
   type: "Bool",
   defaultValue: false
  },
  audio_only: {
   type: "Bool",
   defaultValue: false
  }
 });
}, null);

__d("XVideoCallController", [ "XController" ], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 e.exports = b("XController").create("/videocall/incall/", {
  peer_id: {
   type: "Int",
   required: true
  },
  call_id: {
   type: "Int"
  },
  is_caller: {
   type: "Bool",
   defaultValue: false
  },
  audio_only: {
   type: "Bool",
   defaultValue: false
  }
 });
}, null);

__d("FBRTCUrlManager", [ "FBRTCLogger", "FBRTCUtils", "XVideoCallInitController", "XVideoCallController" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 var k = 3, l = function(p, q, r, s) {
  g.getInstance().logCallAction(p, q, g.CallAction.OLD_URI);
  return j.getURIBuilder().setInt("peer_id", p).setInt("call_id", q).setBool("is_caller", r).setBool("audio_only", s).getURI();
 }, m = function(p, q, r, s, t, u, v) {
  if (v === void 0 || v === null) v = k;
  var w = i.getURIBuilder().setInt("peer_id", p).setInt("call_id", q).setBool("is_caller", r).setBool("audio_only", s).getURI();
  h.sendServerRequest(w, function(x) {
   t(x.payload.uri);
  }, function(x) {
   if (v > 0) {
    m(p, q, r, s, t, u, v - 1);
   } else t(l(p, q, r, s));
  });
 }, n = function(p) {
  window.history.replaceState({}, "", p);
 }, o = {
  init: function(p) {
   this._peerID = p;
  },
  onCallStarted: function() {
   n(l(this._peerID));
  },
  getCallUri: m
 };
 e.exports = o;
}, null);

__d("FBRTCUserMediaRequest", [ "mixInEventEmitter", "FBRTCStruct" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 var i = 960, j = 720, k = 640, l = 480, m = 30, n = function(t, u, v, w) {
  return {
   audio: o(v),
   video: p(t, u, w)
  };
 }, o = function(t) {
  if (!t) return true;
  return {
   optional: [ {
    sourceId: t
   } ]
  };
 }, p = function(t, u, v) {
  if (!t) return false;
  var w = u ? i : k, x = u ? j : l, y = {
   mandatory: {},
   optional: [ {
    maxWidth: w
   }, {
    minWidth: w
   }, {
    minHeight: x
   }, {
    maxHeight: x
   }, {
    minFrameRate: m
   }, {
    maxFrameRate: m
   }, {
    googLeakyBucket: true
   } ]
  };
  if (v) y.optional.push({
   sourceId: v
  });
  return y;
 }, q = function(t, u, v) {
  if (navigator.getUserMedia) {
   navigator.getUserMedia(t, u, v);
  } else if (navigator.webkitGetUserMedia) {
   navigator.webkitGetUserMedia(t, u, v);
  } else if (navigator.mozGetUserMedia) {
   navigator.mozGetUserMedia(t, u, v);
  } else if (navigator.msGetUserMedia) navigator.msGetUserMedia(t, u, v);
 }, r = new h([ "NO_VIDEO", "SD_VIDEO", "HD_VIDEO" ]);
 function s(t) {
  "use strict";
  if (t === void 0) t = r.SD_VIDEO;
  this.streamType = t;
  this.audioSource = null;
  this.videoSource = null;
 }
 s.prototype.request = function() {
  "use strict";
  var t = this.streamType !== r.NO_VIDEO, u = this.streamType === r.HD_VIDEO, v = n(t, u, this.audioSource, this.videoSource);
  q(v, function(w) {
   this.emit("success", w);
  }.bind(this), function(w) {
   this.emit("failed", w);
  }.bind(this));
 };
 s.STREAM_TYPE = r;
 s.HD_WIDTH = i;
 s.SD_WIDTH = k;
 g(s, {
  success: true,
  failed: true
 });
 e.exports = s;
}, null);

__d("FBRTCUserMedia", [ "mixInEventEmitter", "FBRTCLogger", "FBRTCStreamTester", "FBRTCUserMediaRequest" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 var k = {
  STREAM_TYPE: j.STREAM_TYPE,
  _localStream: null,
  _accessGranted: false,
  _pendingRequest: null,
  _failedVideoSources: [],
  _failedAudioSources: [],
  requestUserMedia: function(l, m, n) {
   if (this._localStream && !m && !n) {
    this.emit("streamReady", this._localStream);
   } else {
    this._startRequestListeners();
    this._pendingRequest = new j(l);
    this._pendingRequest.audioSource = m;
    this._pendingRequest.videoSource = n;
    this._pendingRequest.addListener("success", this._onRequestSuccess, this);
    this._pendingRequest.addListener("failed", this._onRequestFailure, this);
    this._pendingRequest.request();
   }
  },
  end: function() {
   this._stopEventListeners();
   if (this._localStream) this._localStream.stop();
  },
  _startRequestListeners: function() {
   if (navigator.mozGetUserMedia) {
    this._evListener = this._onMediaPromptHidden.bind(this);
    document.addEventListener("mousedown", this._evListener);
    document.addEventListener("focus", this._evListener);
   }
  },
  _stopEventListeners: function() {
   if (navigator.mozGetUserMedia) {
    if (this._promptTimeout) clearTimeout(this._promptTimeout);
    document.removeEventListener("mousedown", this._evListener);
    document.removeEventListener("focus", this._evListener);
   }
  },
  _onMediaPromptHidden: function() {
   this._promptTimeout = setTimeout(function() {
    if (!this._accessGranted && this._pendingRequest) this._pendingRequest.request();
   }.bind(this), 1500);
  },
  _onRequestSuccess: function(l) {
   this._stopEventListeners();
   if (!this._accessGranted) {
    this._accessGranted = true;
    this.emit("accessGranted");
   }
   l.videoMediaSourceId = this._pendingRequest.videoSource;
   l.audioMediaSourceId = this._pendingRequest.audioSource;
   var m = new i();
   m.addListener("streamWorking", function() {
    this._pendingRequest = null;
    if (this._localStream && this._localStream !== l) this._localStream.stop();
    this._localStream = l;
    this.emit("streamReady", this._localStream);
   }.bind(this));
   m.addListener("streamBroken", function() {
    l.stop();
    this._onRequestFailure("StreamFailedToStart");
   }.bind(this));
   m.testStream(l);
  },
  _onRequestFailure: function(l) {
   this._stopEventListeners();
   var m = this._getErrorName(l);
   if (this._shouldRetryRequest(m, this._pendingRequest)) {
    this._configureRequestForRetry(this._pendingRequest, m);
    return;
   }
   if (m === "InvalidStateError") {
    h.getInstance().logErrorWithoutID("Invalid state while requesting user media");
    return;
   }
   this._pendingRequest = null;
   if (m === "PERMISSION_DENIED" || m === "PermissionDeniedError" || m === "PermissionDismissedError") {
    this.emit("accessDenied", m);
   } else {
    if (m === "NO_DEVICES_FOUND") m = "DevicesNotFoundError";
    h.getInstance().logErrorWithoutID("getUserMedia error: " + m);
    this.emit("accessFailed", m);
   }
  },
  _getErrorName: function(l) {
   if (l.name) return l.name;
   return l;
  },
  _shouldRetryRequest: function(l, m) {
   return m.streamType !== this.STREAM_TYPE.NO_VIDEO && (l === "DevicesNotFoundError" || l === "StreamFailedToStart");
  },
  _configureRequestForRetry: function(l, m) {
   if (m === "StreamFailedToStart" && window.MediaStreamTrack && window.MediaStreamTrack.getSources) {
    if (l.videoSource) this._failedVideoSources.push(l.videoSource);
    window.MediaStreamTrack.getSources(function(n) {
     for (var o = 0; o < n.length; o++) {
      var p = n[o];
      if (p.kind === "video" && this._failedVideoSources.indexOf(p.id) === -1) {
       l.videoSource = p.id;
       l.request();
       return;
      }
     }
     l.streamType = this.STREAM_TYPE.NO_VIDEO;
     l.request();
    }.bind(this));
   } else {
    l.streamType = this.STREAM_TYPE.NO_VIDEO;
    l.request();
   }
  }
 };
 g(k, {
  streamReady: true,
  accessGranted: true,
  accessDenied: true,
  accessFailed: true
 });
 e.exports = k;
}, null);

__d("MercuryMessages", [ "AsyncRequest", "BanzaiODS", "CurrentUser", "EventEmitter", "ImmutableObject", "LogHistory", "Map", "MercuryActionStatus", "MercuryActionType", "MercuryAssert", "MercuryAttachmentType", "MercuryLogMessageType", "MercuryMessageClientState", "MercuryPayloadSource", "MercurySingletonMixin", "MercuryMessageActions", "MercuryMessageIDs", "RangedCallbackManager", "MercurySendMessageFields", "MercuryServerRequests", "MercuryThreadActions", "MercuryThreadInformer", "MercuryThreads", "URI", "copyProperties", "debounceAcrossTransitions", "invariant", "isMessengerDotComURI", "mergeDeep" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba, ca, da, ea, fa, ga, ha, ia) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var ja = new j(), ka = l.getInstance("mercury_messages");
 function la(xa, ya) {
  var za = ya;
  if (xa._localIdsMap[ya]) za = xa._localIdsMap[ya];
  return xa._messages.get(za);
 }
 function ma(xa) {
  switch (xa) {
  case t.UNKNOWN:
  case t.SERVER_INITIAL_DATA:
  case t.SERVER_FETCH_THREAD_INFO:
  case t.SERVER_THREAD_SYNC:
   return true;
  }
  return false;
 }
 function na(xa, ya) {
  if (!xa._threadsToMessages[ya]) xa._threadsToMessages[ya] = new x(function(za) {
   return la(xa, za).timestamp;
  }, function(za, ab) {
   return ab - za;
  });
  return xa._threadsToMessages[ya];
 }
 function oa(xa, ya, za) {
  ya.forEach(function(ab) {
   var bb = na(xa, ab);
   bb.setReachedEndOfArray();
   xa._emitReorderedChange(ab, za);
  });
 }
 function pa(xa) {
  this._fbid = xa;
  this._messageActions = v.getForFBID(this._fbid);
  this._serverRequests = z.getForFBID(this._fbid);
  this._threadInformer = ba.getForFBID(this._fbid);
  this._threads = ca.getForFBID(this._fbid);
  this._threadActions = aa.getForFBID(this._fbid);
  this._didChange = false;
  this._failedHistoryFetchThreads = {};
  this._threadsToMessages = {};
  this._localTitanMessagesCount = {};
  this._messages = new m();
  this._attachmentData = {};
  this._messagesNeedingAttachmentData = {};
  this._localIdsMap = {};
  this._serverRequests.subscribe("update-messages", function(ya, za) {
   var ab = (za.actions || []).filter(function(cb) {
    var db = cb.action_type, eb = (cb.is_forward || cb.thread_id) && (db == o.LOG_MESSAGE || db == o.USER_GENERATED_MESSAGE || db == o.SEND_MESSAGE || db == o.DELETE_THREAD || db == o.DELETE_MESSAGES || db == o.MARK_MESSAGES_SPAM), fb = cb.upload_id && cb.upload_data && (db == o.CANCEL_ATTACHMENT_PLACEHOLDER || db == o.CONFIRM_ATTACHMENT_PLACEHOLDER), gb = db == o.ADD_SHARE_DATA_TO_EXISTING_MESSAGE && (cb.server_id && cb.attach_key && cb.attach_data);
    return eb || fb || gb;
   }), bb = ma(za.payload_source);
   this.handleUpdates(ab, bb, za.payload_source, za.from_client);
   if (za.end_of_history) oa(this, za.end_of_history, za.payload_source);
   if (this._didChange) {
    this._didChange = false;
    ja.emit("change");
   }
  }.bind(this));
  ka.debug("constructed", {
   fbid: this._fbid
  });
 }
 ea(pa.prototype, {
  getMessagesFromIDs: function(xa) {
   return (xa || []).map(la.bind(null, this)).filter(function(ya) {
    return ya;
   });
  },
  hasLoadedNMessages: function(xa, ya) {
   var za = na(this, xa);
   return za.hasReachedEndOfArray() || za.getCurrentArraySize() >= ya;
  },
  hasLoadedExactlyNMessages: function(xa, ya) {
   var za = na(this, xa);
   return za.getCurrentArraySize() == ya;
  },
  clearMercuryInternalState_DO_NOT_USE: function() {
   this._failedHistoryFetchThreads = {};
   this._threadsToMessages = {};
   this._localTitanMessagesCount = {};
   this._messages = new m();
   this._attachmentData = {};
   this._messagesNeedingAttachmentData = {};
   this._localIdsMap = {};
  },
  getThreadMessagesRange: function(xa, ya, za, ab, bb, cb) {
   var db = na(this, xa), eb = function(mb) {
    ab(qa(this, mb));
   }.bind(this), fb = db.executeOrEnqueue(ya, za, eb), gb = db.getUnavailableResources(fb), hb = this._failedHistoryFetchThreads[xa];
   if (gb.length && !hb) {
    var ib = db.getCurrentArraySize(), jb = this._localTitanMessagesCount[xa] || 0, kb = ib - jb, lb = gb.length + jb;
    ka.debug("fetch_missing_messages", {
     threadID: xa,
     offset: ya,
     limit: za,
     missingIndices: gb,
     messageCount: ib,
     localMessageCount: jb
    });
    this._serverRequests.fetchThreadMessages(xa, kb, lb, bb, cb);
   } else this._failedHistoryFetchThreads[xa] = false;
   return fb;
  },
  getThreadMessagesRangeNow: function(xa, ya, za) {
   var ab = na(this, xa), bb = [];
   for (var cb = ya; cb < ya + za; cb++) {
    var db = ab.getResourceAtIndex(cb), eb = la(this, db);
    eb && bb.push(eb);
   }
   return bb;
  },
  getThreadMessagesSinceTimestamp: function(xa, ya) {
   var za = na(this, xa), ab = za.getElementsUntil(ya);
   return qa(this, ab);
  },
  hasLoadedAllMessages: function(xa) {
   return na(this, xa).hasReachedEndOfArray();
  },
  getCurrentlyLoadedMessages: function(xa) {
   var ya = na(this, xa).getAllResources();
   return qa(this, ya);
  },
  unsubscribe: function(xa, ya) {
   p.isThreadID(ya);
   var za = na(this, ya);
   za.unsubscribe(xa);
  },
  _addNewMessage: function(xa, ya) {
   ta(this, ya);
   ua(ya);
   this._messages.set(xa, new k(ya));
  },
  _updateMessage: function(xa, ya, za) {
   var ab = k.set(ya, za);
   this._messages.set(xa, ab);
   return ab;
  },
  _addAttachmentData: function(xa, ya, za) {
   var ab = la(this, xa);
   if (ab) {
    var bb = ab.attachments.indexOf(ya);
    if (bb != -1) {
     this._updateMessage(xa, ab, {
      attachments: ab.attachments.map(function(cb, db) {
       return db === bb ? za : cb;
      })
     });
     this._emitUpdatedChange(ab.thread_id, ab.message_id, "attach");
    }
   } else {
    if (!this._attachmentData[xa]) this._attachmentData[xa] = [];
    this._attachmentData[xa].push({
     attach_key: ya,
     data: za
    });
   }
  },
  _shouldSortOutOfOrderMessages: function(xa, ya, za) {
   if (xa == t.CLIENT_CHANNEL_MESSAGE) {
    var ab = this.getThreadMessagesSinceTimestamp(ya, za);
    if (ab.length > 0) {
     h.bumpEntityKey("chat.web", "channel.messages_reordered");
     return true;
    }
   }
   return false;
  },
  _preprocessIncomingAction: function(xa, ya) {
   var za = xa.action_type;
   if (ya == t.CLIENT_CHANNEL_MESSAGE && za == o.USER_GENERATED_MESSAGE && xa.threading_id && this._localIdsMap[xa.threading_id] === xa.threading_id) {
    xa.client_message_id = xa.threading_id;
    xa.status = n.SUCCESS;
    xa.action_type = o.SEND_MESSAGE;
    za = xa.action_type;
   }
   if (ya === t.CLIENT_CHANNEL_MESSAGE && za == o.USER_GENERATED_MESSAGE) {
    var ab = this._threads.getThreadMetaNow(xa.thread_id);
    if (ab && ab.folder) xa.folder = ab.folder;
   }
   return xa;
  },
  handleUpdates: function(xa, ya, za, ab) {
   var bb, cb = {}, db = {};
   for (var eb = 0; eb < xa.length; eb++) {
    var fb = this._preprocessIncomingAction(xa[eb], za), gb = fb.action_type, hb = la(this, fb.message_id);
    if (fb.is_forward || za == t.SERVER_SEARCH) {
     if (!this._messages.has(fb.message_id)) this._addNewMessage(fb.message_id, fb);
     continue;
    } else if (fb.client_state === s.SEND_TO_SERVER) {
     this._addNewMessage(fb.message_id, fb);
     continue;
    } else if (gb == o.SEND_MESSAGE) {
     var ib = fb.client_message_id;
     if (ib && this._localIdsMap[ib] && fb.status) {
      var jb = la(this, ib), kb = jb.status;
      if (jb.status == n.SUCCESS) continue;
      if (fb.status == n.UNCONFIRMED) {
       if (!db[fb.thread_id]) db[fb.thread_id] = [];
       db[fb.thread_id].push(ib);
      } else if (!cb[fb.thread_id]) cb[fb.thread_id] = [];
      this._updateLocalMessage(fb);
      if (typeof kb !== void 0 || fb.status == n.FAILED_UNKNOWN_REASON || fb.status == n.UNABLE_TO_CONFIRM || fb.status == n.SUCCESS || fb.status == n.ERROR) this._emitUpdatedChange(fb.thread_id, la(this, ib).message_id, za);
     }
     continue;
    } else if (gb == o.DELETE_THREAD) {
     na(this, fb.thread_id).removeAllResources();
     continue;
    } else if (gb == o.DELETE_MESSAGES) {
     this._deleteMessages(fb.thread_id, fb.message_ids, za);
     continue;
    } else if (gb === o.MARK_MESSAGES_SPAM) {
     this._markMessagesSpam(fb, za);
     continue;
    } else if (fb.threading_id && this._localIdsMap[fb.threading_id] || hb && !hb.is_forward) {
     if (hb && fb.ranges && fb.ranges.length > 0) {
      var lb = hb.message_id;
      this._updateMessage(this._localIdsMap[lb] || lb, hb, {
       ranges: xa.ranges
      });
      this._emitUpdatedChange(hb.thread_id, hb.message_id, "link_shim");
     }
     continue;
    } else if (gb === o.CONFIRM_ATTACHMENT_PLACEHOLDER) {
     this._confirmAttachmentPlaceholder(fb.upload_id, fb.upload_data);
     continue;
    } else if (gb === o.CANCEL_ATTACHMENT_PLACEHOLDER) {
     this._cancelAttachmentPlaceholder(fb.upload_id, fb.upload_data);
     continue;
    } else if (gb === o.ADD_SHARE_DATA_TO_EXISTING_MESSAGE) {
     this._addAttachmentData(fb.server_id, fb.attach_key, fb.attach_data);
     continue;
    } else {
     if (za === t.CLIENT_SEND_MESSAGE) {
      this._localIdsMap[fb.message_id] = fb.message_id;
      if (fb.thread_id == "root:" + fb.message_id) na(this, fb.thread_id).setReachedEndOfArray();
     }
     if (gb == o.LOG_MESSAGE && fb.log_message_type == r.SERVER_ERROR) this._failedHistoryFetchThreads[fb.thread_id] = true;
     if (fb.client_state === s.DO_NOT_SEND_TO_SERVER && fb.upload_id) this._uploadMessages[fb.upload_id] = fb;
     if (!cb[fb.thread_id]) cb[fb.thread_id] = [];
     cb[fb.thread_id].push(fb.message_id);
     this._addNewMessage(fb.message_id, fb);
     if (fb.threading_id && fb.threading_id != fb.message_id) w.addServerID(fb.threading_id, fb.message_id);
     if (fb[y.MANUAL_RETRY_CNT] > 0) {
      bb = na(this, fb.thread_id);
      bb.resortResources([ fb.message_id ]);
      this._emitReorderedChange(fb.thread_id, t.CLIENT_SEND_MESSAGE);
     }
     ya = ya || this._shouldSortOutOfOrderMessages(za, fb.thread_id, fb.timestamp);
     if (!ya) this._emitReceivedChange(la(this, fb.message_id));
     continue;
    }
   }
   for (var mb in cb) {
    bb = na(this, mb);
    var nb = bb.getAllResources(), ob = nb.filter(function(qb) {
     var rb = this._messages.get(qb);
     return rb.action_type == o.LOG_MESSAGE && rb.log_message_type == r.SERVER_ERROR;
    }.bind(this));
    bb.removeResources(ob);
    if (ab) ra(this, mb, cb[mb]);
    if (ya) {
     bb.addResources(cb[mb]);
     this._emitReorderedChange(mb, za);
    } else bb.addResourcesWithoutSorting(cb[mb].reverse(), 0);
    this._threadInformer.updatedThread(mb);
   }
   var pb = Object.keys(db);
   if (pb.length) this._serverRequests.requestMessageConfirmation(db);
   ka.debug("handle_updates", {
    localMessageCounts: ia(this._localTitanMessagesCount)
   });
  },
  isFirstMessage: function(xa) {
   var ya = na(this, xa.thread_id);
   if (ya.getCurrentArraySize() === 0) return false;
   var za = ya.getResourceAtIndex(ya.getCurrentArraySize() - 1), ab = la(this, za).message_id, bb = la(this, xa.message_id).message_id;
   return ya.hasReachedEndOfArray() && ab == bb;
  },
  _markMessagesSpam: function(xa, ya) {
   var za = xa, ab = za.thread_id, bb = za.message_ids;
   if (!bb.length) return;
   this._deleteIndividualMessages(ab, bb, ya);
   this._serverRequests.markMessagesSpam(ab, bb);
  },
  _deleteMessages: function(xa, ya, za) {
   if (!ya.length) return;
   this._deleteIndividualMessages(xa, ya, za);
   if (za !== t.CLIENT_CHANNEL_MESSAGE) this._serverRequests.deleteMessages(xa, ya);
  },
  _deleteIndividualMessages: function(xa, ya, za) {
   var ab = ya.map(function(cb) {
    return la(this, cb).message_id;
   }, this), bb = na(this, xa);
   bb.removeResources(ab);
   this._emitReorderedChange(xa, za);
  },
  _updateLocalMessage: function(xa) {
   var ya = la(this, xa.client_message_id), za = {};
   za.status = xa.status;
   if (xa.status === n.SUCCESS || xa.error_data) za.error_data = xa.error_data;
   var ab = xa.message_id, bb = xa.client_message_id;
   if (this._messages.has(ab)) {
    this._updateMessage(ab, ya, za);
    return false;
   }
   if (xa.timestamp) za.timestamp = xa.timestamp;
   if (xa.log_message_data) za.log_message_data = xa.log_message_data;
   if (xa.ranges && xa.ranges.length) {
    ua(xa);
    za.ranges = xa.ranges;
   }
   if (xa.attachments && xa.attachments.length) {
    za.raw_attachments = null;
    za.attachments = xa.attachments;
    ta(this, za, ab);
   }
   this._localIdsMap[bb] = ab;
   w.addServerID(bb, ab);
   var cb = this._updateMessage(ab, ya, za);
   this._messages.set(bb, new k());
   if (sa(cb)) this._localTitanMessagesCount[cb.thread_id]--;
   return true;
  },
  getNumberLocalMessages: function(xa) {
   return this._localTitanMessagesCount[xa] || 0;
  },
  _uploadMessages: {},
  _confirmAttachmentPlaceholder: function(xa, ya) {
   var za = this._popPendingAttachmentMessage(xa, ya);
   this._serverRequests.sendNewMessage(za);
  },
  _cancelAttachmentPlaceholder: function(xa, ya) {
   var za = this._popPendingAttachmentMessage(xa, ya);
   this._deleteIndividualMessages(za.thread_id, [ za.message_id ]);
   if (this._localTitanMessagesCount[za.thread_id]) this._localTitanMessagesCount[za.thread_id]--;
  },
  _popPendingAttachmentMessage: function(xa, ya) {
   var za = this._uploadMessages[xa];
   ga(za);
   za.image_ids = ya.image_ids;
   za.file_ids = ya.file_ids;
   za.audio_ids = ya.audio_ids;
   za.gif_ids = ya.gif_ids;
   za.client_state = s.SEND_TO_SERVER;
   delete this._uploadMessages[xa];
   return za;
  },
  _emitUpdatedChange: function(xa, ya, za) {
   this._didChange = true;
   this._threadInformer.updatedMessage(xa, ya, za);
  },
  _emitReceivedChange: function(xa) {
   this._didChange = true;
   this._threadInformer.receivedMessage(xa);
  },
  _emitReorderedChange: function(xa, ya) {
   this._didChange = true;
   this._threadInformer.reorderedMessages(xa, ya);
  }
 });
 Object.assign(pa, u, {
  addListener: function(xa, ya) {
   return ja.addListener(xa, ya);
  }
 });
 function qa(xa, ya) {
  var za = ya.map(la.bind(null, xa));
  return za.reverse();
 }
 function ra(xa, ya, za) {
  var ab = za.filter(function(bb) {
   return sa(la(xa, bb));
  });
  if (!xa._localTitanMessagesCount[ya]) xa._localTitanMessagesCount[ya] = 0;
  xa._localTitanMessagesCount[ya] += ab.length;
 }
 function sa(xa) {
  var ya = xa.action_type;
  if (ya == o.USER_GENERATED_MESSAGE) return true;
  switch (xa.log_message_type) {
  case r.SUBSCRIBE:
  case r.UNSUBSCRIBE:
  case r.SERVER_ERROR:
  case r.LIVE_LISTEN:
   return false;

  default:
   return true;
  }
 }
 function ta(xa, ya, za) {
  za = za || ya.message_id;
  var ab = xa._attachmentData[za];
  if (ab) {
   ab.forEach(function(bb) {
    var cb = ya.attachments.indexOf(bb.attach_key);
    if (cb !== -1) ya.attachments[cb] = bb.data;
   });
   delete xa._attachmentData[za];
  } else if (!ya.is_forward && va(xa, ya)) {
   xa._messagesNeedingAttachmentData[za] = true;
   wa(xa);
  }
 }
 function ua(xa) {
  if (!xa.ranges) return;
  xa.ranges.forEach(function(ya) {
   if (!ya.entity || ya.entity.external || !ya.entity.url) return;
   var za = new da(ya.entity.url);
   if (ha(da.getRequestURI()) && !za.getDomain()) {
    za.setProtocol("https").setDomain("www.facebook.com");
    ya.entity.url = za.toString();
   }
  });
 }
 function va(xa, ya) {
  if (!ya || !ya.attachments) return false;
  for (var za = 0; za < ya.attachments.length; za++) {
   var ab = ya.attachments[za];
   if (typeof ab === "string" && ab.indexOf(q.SHARE) === 0) return true;
  }
  var bb = ya.forward_message_ids || [];
  for (za = 0; za < bb.length; za++) {
   var cb = la(xa, bb[za]);
   if (va(xa, cb)) return true;
  }
  return false;
 }
 var wa = fa(function(xa) {
  var ya = {};
  for (var za in xa._messagesNeedingAttachmentData) {
   var ab = la(xa, za);
   if (va(xa, ab)) ya[za] = true;
  }
  var bb = Object.keys(ya);
  if (bb.length) {
   var cb = {
    message_ids: bb
   };
   if (xa._fbid != i.getID()) cb.request_user_id = xa._fbid;
   new g("/ajax/mercury/attachments/fetch_shares.php").setData(cb).setAllowCrossPageTransition(true).send();
  }
  xa._messagesNeedingAttachmentData = {};
 }, 0, this);
 e.exports = pa;
}, null);

__d("MercuryViewer", [ "CurrentUser", "MercuryAssert" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var i = "fbid:" + g.getID(), j = {
  getID: function() {
   return i;
  },
  isViewer: function(k) {
   h.isParticipantID(k);
   return k === i;
  }
 };
 e.exports = j;
}, null);

__d("swfobject", [ "AsyncRequest", "Bootloader", "CSS", "copyProperties", "htmlSpecialChars" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 if (typeof l == "undefined") var l = {};
 if (typeof l.util == "undefined") l.util = {};
 if (typeof l.SWFObjectUtil == "undefined") l.SWFObjectUtil = {};
 l.SWFObject = function(n, o, p, q, r, s, t, u, v, w) {
  if (!document.getElementById) return;
  this.DETECT_KEY = w ? w : "detectflash";
  this.skipDetect = l.util.getRequestParameter(this.DETECT_KEY);
  this.params = {};
  this.variables = {};
  this.attributes = [];
  this.fallback_html = "";
  this.fallback_js_fcn = function() {};
  if (n) this.setAttribute("swf", n);
  if (o) this.setAttribute("id", o);
  if (p) this.setAttribute("width", p);
  if (q) this.setAttribute("height", q);
  this.installedVer = l.SWFObjectUtil.getPlayerVersion();
  if (r) {
   if (!(r instanceof Array)) r = [ r ];
   var x;
   r.forEach(function(aa) {
    x = new l.PlayerVersion(aa.toString().split("."));
    if (x.major == this.installedVer.major) {
     this.setAttribute("version", x);
     return;
    } else if (!this.getAttribute("version") || x.major < this.getAttribute("version").major) this.setAttribute("version", x);
   }.bind(this));
  }
  if (!window.opera && document.all && this.installedVer.major > 7) if (!l.unloadSet) {
   l.SWFObjectUtil.prepUnload = function() {
    var aa = function() {}, ba = function() {};
    window.attachEvent("onunload", l.SWFObjectUtil.cleanupSWFs);
   };
   window.attachEvent("onbeforeunload", l.SWFObjectUtil.prepUnload);
   l.unloadSet = true;
  }
  if (s) this.addParam("bgcolor", s);
  var y = t ? t : "high";
  this.addParam("quality", y);
  this.setAttribute("useExpressInstall", false);
  this.setAttribute("doExpressInstall", false);
  var z = u ? u : window.location;
  this.setAttribute("xiRedirectUrl", z);
  this.setAttribute("redirectUrl", "");
  if (v) this.setAttribute("redirectUrl", v);
 };
 l.SWFObject.ieWorkaroundApplied = false;
 l.SWFObject.ensureIEWorkaroundAttached = function() {
  if (!l.SWFObject.ieWorkaroundApplied && document.attachEvent) {
   l.SWFObject.ieWorkaroundApplied = true;
   document.attachEvent("onpropertychange", l.SWFObject.onDocumentPropertyChange);
  }
 };
 l.SWFObject.onDocumentPropertyChange = function(event) {
  if (event.propertyName == "title") {
   var n = document.title;
   if (n != null && n.indexOf("#!") != -1) {
    n = n.substring(0, n.indexOf("#!"));
    document.title = n;
   }
  }
 };
 j(l.SWFObject.prototype, {
  useExpressInstall: function(n) {
   this.xiSWFPath = !n ? "/swf/expressinstall.swf" : n;
   this.setAttribute("useExpressInstall", true);
  },
  setAttribute: function(n, o) {
   this.attributes[n] = o;
  },
  getAttribute: function(n) {
   return this.attributes[n] || "";
  },
  addParam: function(n, o) {
   this.params[n] = o;
  },
  getParams: function() {
   return this.params;
  },
  addVariable: function(n, o) {
   this.variables[n] = o;
  },
  getVariable: function(n) {
   return this.variables[n] || "";
  },
  getVariables: function() {
   return this.variables;
  },
  getVariablePairs: function() {
   var n = [], o, p = this.getVariables();
   for (o in p) n[n.length] = o + "=" + p[o];
   return n.join("&");
  },
  getSWFHTML: function() {
   var n, o, p;
   if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) {
    if (this.getAttribute("doExpressInstall")) {
     this.addVariable("MMplayerType", "PlugIn");
     this.setAttribute("swf", this.xiSWFPath);
    }
    o = {
     type: "application/x-shockwave-flash",
     src: this.getAttribute("swf"),
     width: this.getAttribute("width"),
     height: this.getAttribute("height"),
     style: this.getAttribute("style") || "display: block;",
     id: this.getAttribute("id"),
     name: this.getAttribute("id")
    };
    var q = this.getParams();
    for (var r in q) o[r] = q[r];
    p = this.getVariablePairs();
    if (p) o.flashvars = p;
    n = m("embed", o, null);
   } else {
    if (this.getAttribute("doExpressInstall")) {
     this.addVariable("MMplayerType", "ActiveX");
     this.setAttribute("swf", this.xiSWFPath);
    }
    o = {
     id: this.getAttribute("id"),
     classid: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
     width: this.getAttribute("width"),
     height: this.getAttribute("height"),
     style: this.getAttribute("style") || "display: block;"
    };
    var s = m("param", {
     name: "movie",
     value: this.getAttribute("swf")
    }, null), q = this.getParams();
    for (var r in q) s += m("param", {
     name: r,
     value: q[r]
    }, null);
    p = this.getVariablePairs();
    if (p) s += m("param", {
     name: "flashvars",
     value: p
    }, null);
    n = m("object", o, s);
   }
   return n;
  },
  write: function(n) {
   if (this.getAttribute("useExpressInstall")) {
    var o = new l.PlayerVersion([ 6, 0, 65 ]);
    if (this.installedVer.versionIsValid(o) && !this.installedVer.versionIsValid(this.getAttribute("version"))) {
     this.setAttribute("doExpressInstall", true);
     this.addVariable("MMredirectURL", escape(this.getAttribute("xiRedirectUrl")));
     document.title = document.title.slice(0, 47) + " - Flash Player Installation";
     this.addVariable("MMdoctitle", document.title);
    }
   }
   var p = typeof n == "string" ? document.getElementById(n) : n;
   if (!p) return false;
   i.addClass(p, "swfObject");
   p.setAttribute("data-swfid", this.getAttribute("id"));
   if (this.skipDetect || this.getAttribute("doExpressInstall") || this.installedVer.versionIsValid(this.getAttribute("version"))) {
    l.SWFObject.ensureIEWorkaroundAttached();
    p.innerHTML = this.getSWFHTML();
    return true;
   } else {
    if (this.getAttribute("redirectUrl") != "") document.location.replace(this.getAttribute("redirectUrl"));
    var q = this.getAttribute("version").major + "." + this.getAttribute("version").minor + "." + this.getAttribute("version").release + "." + this.getAttribute("version").build, r = this.installedVer.major + "." + this.installedVer.minor + "." + this.installedVer.release + "." + this.installedVer.build;
    this.fallback_js_fcn(r, q);
    p.innerHTML = this.fallback_html;
   }
   return false;
  }
 });
 l.SWFObjectUtil.getPlayerVersion = function() {
  var n = new l.PlayerVersion([ 0, 0, 0, 0 ]), o;
  if (navigator.plugins && navigator.mimeTypes.length) {
   for (var p = 0; p < navigator.plugins.length; p++) try {
    var r = navigator.plugins[p];
    if (r.name == "Shockwave Flash") {
     o = new l.PlayerVersion(r.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s+(r|d)|\s+b[0-9]+)/, ".").split("."));
     if (typeof n == "undefined" || o.major > n.major || o.major == n.major && (o.minor > n.minor || o.minor == n.minor && (o.release > n.release || o.release == n.release && o.build > n.build))) n = o;
    }
   } catch (q) {}
  } else if (navigator.userAgent && navigator.userAgent.indexOf("Windows CE") >= 0) {
   var s = 1, t = 3;
   while (s) try {
    t++;
    s = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + t);
    n = new l.PlayerVersion([ t, 0, 0 ]);
   } catch (u) {
    s = null;
   }
  } else {
   try {
    var s = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
   } catch (v) {
    try {
     var s = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
     n = new l.PlayerVersion([ 6, 0, 21 ]);
     s.AllowScriptAccess = "always";
    } catch (w) {
     if (n.major == 6) return n;
    }
    try {
     s = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
    } catch (x) {}
   }
   if (s != null) n = new l.PlayerVersion(s.GetVariable("$version").split(" ")[1].split(","));
  }
  return n;
 };
 l.PlayerVersion = function(n) {
  this.major = n[0] != null ? parseInt(n[0], 10) : 0;
  this.minor = n[1] != null ? parseInt(n[1], 10) : 0;
  this.release = n[2] != null ? parseInt(n[2], 10) : 0;
  this.build = n[3] != null ? parseInt(n[3], 10) : 0;
 };
 l.PlayerVersion.prototype.versionIsValid = function(n) {
  if (this.major < n.major) return false;
  if (this.major > n.major) return true;
  if (this.minor < n.minor) return false;
  if (this.minor > n.minor) return true;
  if (this.release < n.release) return false;
  if (this.release > n.release) return true;
  if (this.build < n.build) return false;
  return true;
 };
 l.util = {
  getRequestParameter: function(n) {
   var o = document.location.search || document.location.hash;
   if (n == null) return o;
   if (o) {
    var p = o.substring(1).split("&");
    for (var q = 0; q < p.length; q++) if (p[q].substring(0, p[q].indexOf("=")) == n) return p[q].substring(p[q].indexOf("=") + 1);
   }
   return "";
  }
 };
 l.SWFObjectUtil.cleanupSWFs = function() {
  var n = document.getElementsByTagName("OBJECT");
  for (var o = n.length - 1; o >= 0; o--) {
   n[o].style.display = "none";
   for (var p in n[o]) if (typeof n[o][p] == "function") n[o][p] = function() {};
  }
 };
 if (!document.getElementById && document.all) document.getElementById = function(n) {
  return document.all[n];
 };
 l.spawn_flash_update_dialog = function() {
  new g().setURI("/ajax/flash_update_dialog.php").setMethod("GET").setReadOnly(true).send();
 };
 l.showFlashErrorDialog = function(n, o) {
  h.loadModules([ "ErrorDialog" ], function(p) {
   p.show(n, o);
  });
 };
 function m(n, o, p) {
  var q = /^[A-Za-z0-9\-]+$/;
  if (!n.match(q)) throw new Error("Invalid tag " + n);
  var r = "<" + n;
  for (var s in o) {
   if (!s.match(q)) throw new Error("Invalid attr " + s);
   r += " " + s + '="' + k(o[s]) + '"';
  }
  if (p === null) {
   return r + "/>";
  } else return r + ">" + p + "</" + n + ">";
 }
 e.exports = a.deconcept || l;
}, null);

__d("SoundPlayer", [ "Arbiter", "URI", "createArrayFromMixed", "swfobject" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 var j = b("swfobject").SWFObject, k = {}, l = null, m = false, n = "so_sound_player", o = "/swf/SoundPlayer.swf?v=1", p = "10.0.22.87", q = null;
 function r(z) {
  var aa = h(z);
  if (!aa.getDomain()) return h().setPath(aa.getPath()).toString();
  return z;
 }
 function s(z) {
  var aa = h(z).getPath();
  if (/\.mp3$/.test(aa)) return "audio/mpeg";
  if (/\.og[ga]$/.test(aa)) return "audio/ogg";
  return "";
 }
 function t() {
  if (!q) {
   var z = document.createElement("audio");
   if (!z || !z.canPlayType) return null;
   z.setAttribute("preload", "auto");
   document.body.appendChild(z);
   q = z;
  }
  return q;
 }
 function u() {
  var z = document[n] || window[n];
  if (z) if (!z.playSound && z.length) z = z[0];
  return z && z.playSound && z.loopSound ? z : null;
 }
 function v() {
  return m;
 }
 function w(z, aa, ba) {
  l = {
   path: z,
   sync: aa,
   loop: ba
  };
 }
 function x() {
  m = true;
  if (l) {
   var z = u();
   if (l.loop) {
    z.loopSound(l.path, l.sync);
   } else z.playSound(l.path, l.sync);
  }
 }
 var y = {
  init: function(z) {
   z = i(z);
   var aa;
   for (var ba = 0; ba < z.length; ++ba) {
    aa = z[ba];
    if (k[aa]) return;
   }
   var ca = t();
   for (ba = 0; ca && ba < z.length; ++ba) {
    aa = z[ba];
    if (ca.canPlayType(aa)) {
     k[aa] = true;
     return;
    }
   }
   k["audio/mpeg"] = true;
   if (u()) return;
   try {
    g.registerCallback(x, [ "sound/player_ready", "sound/ready" ]);
    var ea = document.createElement("div");
    ea.id = "sound_player_holder";
    document.body.appendChild(ea);
    var fa = new j(o, n, "1px", "1px", [ p ], "#ffffff");
    fa.addParam("allowscriptaccess", "always");
    fa.addParam("wmode", "transparent");
    fa.addVariable("swf_id", n);
    fa.fallback_html = " ";
    fa.write(ea.id);
    window[n] = fa;
    g.inform("sound/player_ready");
   } catch (da) {}
  },
  play: function(z, aa) {
   z = i(z);
   var ba = t(), ca, da;
   for (var ea = 0; ba && ea < z.length; ++ea) {
    ca = z[ea];
    da = s(ca);
    if (!ba.canPlayType(da)) continue;
    y.init([ da ]);
    ba.src = r(ca);
    if (aa) {
     ba.setAttribute("loop", "");
    } else ba.removeAttribute("loop");
    ba.play();
    return;
   }
   for (ea = 0; ea < z.length; ++ea) {
    ca = r(z[ea]);
    da = s(ca);
    if (da != "audio/mpeg") continue;
    y.init([ da ]);
    var fa = u();
    if (!v()) {
     w(ca, true, aa);
     return;
    } else if (fa) {
     if (aa) {
      fa.loopSound(ca, true);
     } else fa.playSound(ca, true);
     return;
    }
   }
  },
  stop: function(z) {
   z = i(z);
   for (var aa = 0; aa < z.length; ++aa) {
    var ba = r(z[aa]), ca = t(), da = u();
    if (ca && ca.src == ba) {
     ca.pause();
     ca.removeAttribute("src");
    } else da && da.stopSound(ba);
   }
  }
 };
 e.exports = y;
}, null);

__d("SoundSynchronizer", [ "SoundPlayer", "WebStorage", "createArrayFromMixed" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 var j = "fb_sounds_playing3";
 function k() {
  var o = h.getLocalStorage();
  if (o) try {
   var q = o[j];
   if (q) {
    q = JSON.parse(q);
    if (Array.isArray(q)) return q;
   }
  } catch (p) {}
  return [];
 }
 function l(o) {
  var p = h.getLocalStorage();
  if (p) {
   var q = k();
   q.push(o);
   while (q.length > 5) q.shift();
   try {
    p[j] = JSON.stringify(q);
   } catch (r) {}
  }
 }
 function m(o) {
  return k().some(function(p) {
   return p === o;
  });
 }
 var n = {
  play: function(o, p, q) {
   o = i(o);
   p = p || o[0] + Math.floor(Date.now() / 1e3);
   if (m(p)) return;
   g.play(o, q);
   l(p);
  },
  isSupported: function() {
   return !!h.getLocalStorage();
  }
 };
 e.exports = n;
}, null);

__d("SoundRPC", [ "Event", "SoundSynchronizer" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 function i(k, l, m) {
  h.play(k, l, m);
 }
 var j = {
  playLocal: i,
  playRemote: function(k, l, m, n) {
   var o = {
    paths: l,
    sync: m,
    loop: n
   };
   k.postMessage(JSON.stringify(o), "*");
  },
  supportsRPC: function() {
   return !!window.postMessage;
  },
  _listen: function() {
   g.listen(window, "message", function(k) {
    if (!/\.facebook.com$/.test(k.origin)) return;
    var l = JSON.parse(k.data || "{}");
    i(l.paths, l.sync, l.loop);
   });
  }
 };
 e.exports = j;
}, null);

__d("Sound", [ "SoundInitialData", "SoundPlayer", "SoundRPC", "SoundSynchronizer", "URI", "UserAgent_DEPRECATED", "isFacebookURI" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
 b.__markCompiled && b.__markCompiled();
 var n = null, o = {
  init: function(s) {
   if (!n) h.init(s);
  },
  play: function(s, t, u) {
   if (n) {
    i.playRemote(n.contentWindow, s, t, false);
   } else i.playLocal(s, t, u);
  },
  stop: function(s) {
   if (!n) h.stop(s);
  }
 }, p = new k(location.href);
 if (p.getSubdomain() && p.getSubdomain() !== "www") p.setSubdomain("www");
 var q = p.getDomain();
 function r() {
  if (l.ie() < 9) return false;
  if (g.RPC_DISABLED) return false;
  return j.isSupported() && i.supportsRPC();
 }
 if (m(p) && location.host !== q && r()) {
  n = document.createElement("iframe");
  n.setAttribute("src", "//" + q + "/sound_iframe.php");
  n.style.display = "none";
  document.body.appendChild(n);
 }
 e.exports = o;
}, null);

__d("P2PCreditCard", [ "CreditCardFormParam", "CreditCardTypeEnum", "PaymentMethodUtils", "fbt", "ix" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var l = {
  visa: {
   image: k("/images/payments/icons/visa.png"),
   imageLarge: k("/images/payments/icons/visa-lg.png"),
   name: "Visa"
  },
  mc: {
   image: k("/images/payments/icons/mc.png"),
   imageLarge: k("/images/payments/icons/mc-lg.png"),
   name: "MasterCard"
  },
  disc: {
   image: k("/images/payments/icons/disc.png"),
   imageLarge: k("/images/payments/icons/disc-lg.png"),
   name: "Discover"
  },
  jcb: {
   image: k("/images/payments/icons/jcb.png"),
   imageLarge: k("/images/payments/icons/jcb-lg.png"),
   name: "JCB"
  },
  amex: {
   image: k("/images/payments/icons/amex.png"),
   imageLarge: k("/images/payments/icons/amex-lg.png"),
   name: "American Express"
  },
  unknown: {
   image: k("/images/brands/credit_card/credit_32.png"),
   imageLarge: k("/images/brands/credit_card/credit_32.png"),
   name: j._("Unknown Card Type")
  }
 };
 function m(n) {
  this.setCredentialId(n[g.CREDENTIAL_ID]);
  this.setCardType(n[g.CARD_TYPE]);
  this.setCreditCardNumber(n[g.CARD_NUMBER]);
  this.setSelected(n.selected);
  this.setZipCode(n[g.ZIP]);
  this.setCSC(n[g.CSC]);
  this.setExp(n[g.CARD_EXPIRATION]);
  this.setIsPreset(n.isPreset);
  this.setIsVerified(n.isVerified);
  this.setIsMobileVerified(n.isMobileVerified);
 }
 m.prototype.getCreditCardNumber = function() {
  return this[g.CARD_NUMBER];
 };
 m.prototype.setCreditCardNumber = function(n) {
  n = n.replace(/ /g, "");
  this.setCardProviderProps(this[g.CARD_TYPE], n);
  n = n.substr(n.length - 4);
  this[g.CARD_NUMBER] = n;
 };
 m.prototype.setCardProviderProps = function(n, o) {
  var p = this.$P2PCreditCard0(n, o);
  if (l[p]) {
   this.setImage(l[p].image);
   this.setImageLarge(l[p].imageLarge);
   this.setName(l[p].name);
  }
 };
 m.prototype.getExp = function() {
  return this[g.CARD_EXPIRATION];
 };
 m.prototype.getExpFormatted = function() {
  var n = this[g.CARD_EXPIRATION];
  return n ? n[g.MONTH] + "/" + n[g.YEAR] : "";
 };
 m.prototype.getExpFormattedShort = function() {
  var n = this[g.CARD_EXPIRATION], o = "";
  if (n && n[g.MONTH] && n[g.YEAR]) {
   o = n[g.MONTH] + "/";
   if (n[g.YEAR].length === 4) {
    o += n[g.YEAR].substr(2);
   } else o += n[g.YEAR];
  }
  return o;
 };
 m.prototype.setExp = function(n) {
  if (!n) return;
  var o, p, q = {};
  q[g.MONTH] = n[g.MONTH];
  q[g.YEAR] = n[g.YEAR];
  if (q[g.MONTH] && q[g.MONTH].length === 1) q[g.MONTH] = "0" + q[g.MONTH];
  if (q[g.YEAR] && q[g.YEAR].length === 2) {
   o = new Date().getFullYear() + "";
   p = o.substr(0, 2);
   q[g.YEAR] = p + q[g.YEAR];
  }
  this[g.CARD_EXPIRATION] = q;
 };
 m.prototype.getCSC = function() {
  return this[g.CSC];
 };
 m.prototype.setCSC = function(n) {
  this[g.CSC] = n;
 };
 m.prototype.getZipCode = function() {
  return this[g.ZIP];
 };
 m.prototype.setZipCode = function(n) {
  this[g.ZIP] = n;
 };
 m.prototype.getSelected = function() {
  return this.$P2PCreditCard1;
 };
 m.prototype.setSelected = function(n) {
  this.$P2PCreditCard1 = n;
 };
 m.prototype.getCardType = function() {
  return this[g.CARD_TYPE];
 };
 m.prototype.setCardType = function(n) {
  this[g.CARD_TYPE] = n;
  this.setCardProviderProps(n, this[g.CARD_NUMBER]);
 };
 m.prototype.getCredentialId = function() {
  return this[g.CREDENTIAL_ID];
 };
 m.prototype.setCredentialId = function(n) {
  this[g.CREDENTIAL_ID] = n;
 };
 m.prototype.$P2PCreditCard0 = function(n, o) {
  var p = "default", q, r;
  if (n) {
   q = Object.keys(h).filter(function(s) {
    return h[s] === n;
   })[0];
   p = this.$P2PCreditCard2(q);
  } else if (o) {
   r = i.getCardType(o);
   if (r) p = r.name;
  }
  return p;
 };
 m.prototype.getImage = function() {
  return this.$P2PCreditCard3 || l.unknown.image;
 };
 m.prototype.setImage = function(n) {
  this.$P2PCreditCard3 = n;
 };
 m.prototype.getImageLarge = function() {
  return this.$P2PCreditCard4 || l.unknown.imageLarge;
 };
 m.prototype.setImageLarge = function(n) {
  this.$P2PCreditCard4 = n;
 };
 m.prototype.getName = function() {
  return this.$P2PCreditCard5 || l.unknown.name;
 };
 m.prototype.setName = function(n) {
  this.$P2PCreditCard5 = n;
 };
 m.prototype.getIsPreset = function() {
  return this.$P2PCreditCard6;
 };
 m.prototype.setIsPreset = function(n) {
  this.$P2PCreditCard6 = n || false;
 };
 m.prototype.$P2PCreditCard2 = function(n) {
  switch (n) {
  case "VISA":
   n = "visa";
   break;

  case "AMERICANEXPRESS":
   n = "amex";
   break;

  case "MASTERCARD":
   n = "mc";
   break;

  case "DISCOVER":
   n = "disc";
   break;

  case "JCB":
   n = "jcb";
   break;

  default:
   n = "unknown";
   break;
  }
  return n;
 };
 m.prototype.getCreditCardNumberFormatted = function() {
  return "*" + this[g.CARD_NUMBER];
 };
 m.prototype.getCreditCardNumberMask = function() {
  return "**** **** **** " + this[g.CARD_NUMBER];
 };
 m.prototype.getMaxCSCLength = function() {
  var n = this.$P2PCreditCard0(this[g.CARD_TYPE], this[g.CARD_NUMBER]);
  return n === "amex" ? 4 : 3;
 };
 m.prototype.getIsVerified = function() {
  return this.$P2PCreditCard7 || false;
 };
 m.prototype.setIsVerified = function(n) {
  this.$P2PCreditCard7 = n;
 };
 m.prototype.getIsMobileVerified = function() {
  return this.$P2PCreditCard8 || false;
 };
 m.prototype.setIsMobileVerified = function(n) {
  this.$P2PCreditCard8 = n;
 };
 m.prototype.isExpired = function() {
  var n = this.getExp();
  if (!n) return false;
  var o = n, p = o.month, q = o.year, r = new Date(), s = r.getFullYear() + "", t = r.getMonth() + 1 + "";
  t = t.length === 1 ? "0" + t : t;
  return q < s || s === q && p < t;
 };
 e.exports = m;
}, null);

__d("SpotlightViewerBottomBarGroup", [ "React", "cx" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 var i = g.createClass({
  displayName: "SpotlightViewerBottomBarGroup",
  render: function() {
   var j = this.props.itemmargin || "right", k = (j == "left" ? "marginLeft" : "") + (j == "right" ? " " + "marginRight" : "") + (" " + "_4_8i");
   return g.createElement("div", {
    className: k
   }, this.props.children);
  }
 });
 e.exports = i;
}, null);

__d("LayerFadeOnHide", [ "Animation", "Layer", "Style", "UserAgent_DEPRECATED", "copyProperties", "setTimeoutAcrossTransitions" ], function(a, b, c, d, e, f, g, h, i, j, k, l) {
 b.__markCompiled && b.__markCompiled();
 function m(n) {
  "use strict";
  this._layer = n;
 }
 m.prototype.enable = function() {
  "use strict";
  if (j.ie() < 9) return;
  this._subscription = this._layer.subscribe("starthide", this._handleStartHide.bind(this));
 };
 m.prototype.disable = function() {
  "use strict";
  if (this._subscription) {
   this._subscription.unsubscribe();
   this._subscription = null;
  }
 };
 m.prototype._handleStartHide = function() {
  "use strict";
  var n = true, o = h.subscribe("show", function() {
   o.unsubscribe();
   n = false;
  });
  l(function() {
   o.unsubscribe();
   o = null;
   var p = function() {
    this._layer.finishHide();
   }.bind(this);
   if (n) {
    this._animate(p);
   } else p();
  }.bind(this), 0);
  return false;
 };
 m.prototype._animate = function(n) {
  "use strict";
  var o = this._layer.getRoot();
  new g(o).from("opacity", 1).to("opacity", 0).duration(150).ondone(function() {
   i.set(o, "opacity", "");
   n();
  }).go();
 };
 k(m.prototype, {
  _subscription: null
 });
 e.exports = m;
}, null);

__d("LoadingDialogDimensions", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 var g = {
  HEIGHT: 96,
  WIDTH: 300
 };
 e.exports = g;
}, null);

__d("AsyncDialog", [ "AsyncRequest", "CSS", "DialogX", "DOM", "Keys", "LayerFadeOnShow", "LoadingDialogDimensions", "Parent", "React", "URI", "XUISpinner.react", "XUIDialogTitle.react", "copyProperties", "cx", "emptyFunction", "forEachObject" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v) {
 b.__markCompiled && b.__markCompiled();
 var w, x;
 function y(ga) {
  var ha = m.WIDTH, ia;
  if (ga) {
   ha = parseInt(ga.getAttribute("data-dialog-width"), 10) || ha;
   ia = ga.getAttribute("data-dialog-title") || ia;
  }
  if (!w) {
   var ja = j.create("div", {
    className: "_57-x"
   });
   w = new i({
    width: ha,
    addedBehaviors: [ l ],
    xui: true
   }, j.create("div", null, ja));
   x = j.create("div");
   j.insertBefore(ja, x);
   o.render(o.createElement(q, {
    size: "large"
   }), ja);
   w.subscribe([ "key", "blur" ], function(ka, la) {
    if (ka == "blur" || ka == "key" && la.keyCode == k.ESC) {
     ca();
     return false;
    }
   });
  }
  if (ia) {
   o.render(o.createElement(r, {
    showCloseButton: false
   }, ia), x);
  } else j.empty(x);
  w.setWidth(ha);
  return w;
 }
 var z = {}, aa = 1, ba = [];
 function ca() {
  v(z, function(ga, ha) {
   ga.abandon();
   da(ha);
  });
 }
 function da(ga) {
  delete z[ga];
  if (!Object.keys(z).length) y().hide();
 }
 function ea(ga, ha) {
  var ia = aa++;
  ba[ia] = ha;
  z[ia] = ga;
  var ja = da.bind(null, "" + ia);
  s(ga.getData(), {
   __asyncDialog: ia
  });
  var ka = ga.getRelativeTo();
  y(ka).setCausalElement(ka).show();
  var la = ga.finallyHandler;
  ga.setFinallyHandler(function(oa) {
   var pa = oa.getPayload();
   if (pa && pa.asyncURL) fa.send(new g(pa.asyncURL));
   ja();
   la && la(oa);
  });
  var ma = ga.abortHandler || u, na = ga.interceptHandler || u;
  ga.setInterceptHandler(function() {
   try {
    na();
   } finally {
    ja();
   }
  }).setAbortHandler(function() {
   try {
    ma();
   } finally {
    ja();
   }
  });
  ga.send();
 }
 var fa = {
  send: function(ga, ha) {
   ea(ga, ha || u);
  },
  bootstrap: function(ga, ha, ia) {
   if (!ga) return;
   var ja = n.byClass(ha, "stat_elem") || ha;
   if (ja && h.hasClass(ja, "async_saving")) return false;
   var ka = new p(ga).getQueryData(), la = ia === "dialog", ma = new g().setURI(ga).setData(ka).setMethod(la ? "GET" : "POST").setReadOnly(la).setRelativeTo(ha).setStatusElement(ja).setNectarModuleDataSafe(ha);
   fa.send(ma);
  },
  respond: function(ga, ha) {
   var ia = ba[ga];
   if (ia) {
    ia(ha);
    delete ba[ga];
   }
  },
  getLoadingDialog: function() {
   return y();
  }
 };
 e.exports = fa;
}, null);