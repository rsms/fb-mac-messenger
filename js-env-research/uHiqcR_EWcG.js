if (self.CavalryLogger) {
 CavalryLogger.start_js([ "kwpJJ" ]);
}

__d("areSameOrigin", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 function g(h, i) {
  if (h.isEmpty() || i.isEmpty()) return false;
  if (h.getProtocol() && h.getProtocol() != i.getProtocol()) return false;
  if (h.getDomain() && h.getDomain() != i.getDomain()) return false;
  if (h.getPort() && h.getPort() != i.getPort()) return false;
  return true;
 }
 e.exports = g;
}, null);

__d("memoize", [ "invariant" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 function h(i) {
  var j;
  return function() {
   for (var k = [], l = 0, m = arguments.length; l < m; l++) k.push(arguments[l]);
   g(!k.length);
   if (i) {
    j = i();
    i = null;
   }
   return j;
  };
 }
 e.exports = h;
}, null);

__d("isFacebookURI", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 var g = null, h = [ "http", "https" ];
 function i(j) {
  if (!g) g = new RegExp("(^|\\.)facebook\\.com$", "i");
  if (j.isEmpty() && j.toString() !== "#") return false;
  if (!j.getDomain() && !j.getProtocol()) return true;
  return h.indexOf(j.getProtocol()) !== -1 && g.test(j.getDomain());
 }
 i.setRegex = function(j) {
  g = j;
 };
 e.exports = i;
}, null);

__d("unqualifyURI", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 function g(h) {
  h.setProtocol(null).setDomain(null).setPort(null);
 }
 e.exports = g;
}, null);

__d("URI", [ "PHPQuerySerializer", "URIBase", "isFacebookURI", "unqualifyURI", "areSameOrigin", "copyProperties", "goURI" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
 b.__markCompiled && b.__markCompiled();
 for (var n in h) if (h.hasOwnProperty(n)) p[n] = h[n];
 var o = h === null ? null : h.prototype;
 p.prototype = Object.create(o);
 p.prototype.constructor = p;
 p.__superConstructor__ = h;
 function p(q) {
  "use strict";
  if (!(this instanceof p)) return new p(q || window.location.href);
  h.call(this, q || "", g);
 }
 p.prototype.setPath = function(q) {
  "use strict";
  this.path = q;
  return o.setPath.call(this, q);
 };
 p.prototype.getPath = function() {
  "use strict";
  var q = o.getPath.call(this);
  if (q) return q.replace(/^\/+/, "/");
  return q;
 };
 p.prototype.setProtocol = function(q) {
  "use strict";
  this.protocol = q;
  return o.setProtocol.call(this, q);
 };
 p.prototype.setDomain = function(q) {
  "use strict";
  this.domain = q;
  return o.setDomain.call(this, q);
 };
 p.prototype.setPort = function(q) {
  "use strict";
  this.port = q;
  return o.setPort.call(this, q);
 };
 p.prototype.setFragment = function(q) {
  "use strict";
  this.fragment = q;
  return o.setFragment.call(this, q);
 };
 p.prototype.valueOf = function() {
  "use strict";
  return this.toString();
 };
 p.prototype.isFacebookURI = function() {
  "use strict";
  return i(this);
 };
 p.prototype.isLinkshimURI = function() {
  "use strict";
  if (i(this) && (this.getPath() === "/l.php" || this.getPath().indexOf("/si/ajax/l/") === 0 || this.getPath().indexOf("/l/") === 0 || this.getPath().indexOf("l/") === 0)) return true;
  return false;
 };
 p.prototype.getRegisteredDomain = function() {
  "use strict";
  if (!this.getDomain()) return "";
  if (!i(this)) return null;
  var q = this.getDomain().split("."), r = q.indexOf("facebook");
  return q.slice(r).join(".");
 };
 p.prototype.getUnqualifiedURI = function() {
  "use strict";
  var q = new p(this);
  j(q);
  return q;
 };
 p.prototype.getQualifiedURI = function() {
  "use strict";
  return new p(this).$URI0();
 };
 p.prototype.$URI0 = function() {
  "use strict";
  if (!this.getDomain()) {
   var q = p();
   this.setProtocol(q.getProtocol()).setDomain(q.getDomain()).setPort(q.getPort());
  }
  return this;
 };
 p.prototype.isSameOrigin = function(q) {
  "use strict";
  var r = q || window.location.href;
  if (!(r instanceof p)) r = new p(r.toString());
  return k(this, r);
 };
 p.prototype.go = function(q) {
  "use strict";
  m(this, q);
 };
 p.prototype.setSubdomain = function(q) {
  "use strict";
  var r = this.$URI0().getDomain().split(".");
  if (r.length <= 2) {
   r.unshift(q);
  } else r[0] = q;
  return this.setDomain(r.join("."));
 };
 p.prototype.getSubdomain = function() {
  "use strict";
  if (!this.getDomain()) return "";
  var q = this.getDomain().split(".");
  if (q.length <= 2) {
   return "";
  } else return q[0];
 };
 p.isValidURI = function(q) {
  "use strict";
  return h.isValidURI(q, g);
 };
 l(p, {
  getRequestURI: function(q, r) {
   q = q === void 0 || q;
   var s = a.PageTransitions;
   if (q && s && s.isInitialized()) {
    return s.getCurrentURI(!!r).getQualifiedURI();
   } else return new p(window.location.href);
  },
  getMostRecentURI: function() {
   var q = a.PageTransitions;
   if (q && q.isInitialized()) {
    return q.getMostRecentURI().getQualifiedURI();
   } else return new p(window.location.href);
  },
  getNextURI: function() {
   var q = a.PageTransitions;
   if (q && q.isInitialized()) {
    return q._next_uri.getQualifiedURI();
   } else return new p(window.location.href);
  },
  expression: /(((\w+):\/\/)([^\/:]*)(:(\d+))?)?([^#?]*)(\?([^#]*))?(#(.*))?/,
  arrayQueryExpression: /^(\w+)((?:\[\w*\])+)=?(.*)/,
  encodeComponent: function(q) {
   return encodeURIComponent(q).replace(/%5D/g, "]").replace(/%5B/g, "[");
  },
  decodeComponent: function(q) {
   return decodeURIComponent(q.replace(/\+/g, " "));
  }
 });
 e.exports = p;
}, null);

__d("NavigationTimingRecorder", [ "Banzai", "BanzaiScuba", "URI", "performance" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 var k = "navigation_timing";
 if (j.timing) {
  var l = j.timing, m = false, n = new h(k, null, {
   addBrowserFields: true,
   addGeoFields: true,
   addPredictedGeographyFields: true,
   addMobileDeviceFields: true
  }), o = function() {
   var r = {};
   return function(s, t) {
    if (!(s in l || s in r)) {
     r[s] = t;
     n.addInteger(s, t);
    }
   };
  }, p = function() {
   if (m) return;
   var r = Object.keys(l);
   if (r.length === 0) if (typeof l.toJSON === "function") {
    r = Object.keys(l.toJSON());
   } else r = Object.keys(Object.getPrototypeOf(l));
   r.forEach(function(w) {
    if (l[w]) n.addInteger(w, l[w]);
   });
   var s = o();
   if (a.MCustomTimingRecorder) {
    var t = a.MCustomTimingRecorder.getMarks();
    t.forEach(function(w) {
     s(w.name, w.date);
    });
   }
   if (j.getEntriesByType) {
    var u = j.getEntriesByType("mark");
    u.forEach(function(w) {
     s(w.name, Math.round(w.startTime) + j.timing.navigationStart);
    });
   }
   var v = new i(a.location.href);
   n.addNormal("protocol", v.getProtocol());
   n.addNormal("domain", v.getDomain());
   n.addNormal("port", v.getPort());
   n.addNormal("path", v.getPath());
   n.post();
   m = true;
  }, q = function() {
   g.subscribe(g.SEND, p);
  };
  if (a.document.readyState === "complete") {
   q();
  } else a.addEventListener("load", q);
 }
}, null);

__d("EventListener", [ "Event", "emptyFunction" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 var i = {
  listen: g.listen,
  capture: function(j, k, l) {
   if (!j.addEventListener) {
    return {
     remove: h
    };
   } else {
    j.addEventListener(k, l, true);
    return {
     remove: function() {
      j.removeEventListener(k, l, true);
     }
    };
   }
  },
  registerDefault: function(j, k) {
   return g.listen(document.documentElement, j, k, 10);
  }
 };
 e.exports = i;
}, null);

__d("XControllerURIBuilder", [ "URI", "invariant" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 function i(j, k) {
  "use strict";
  this.$XControllerURIBuilder0 = j;
  this.$XControllerURIBuilder1 = k;
  this.$XControllerURIBuilder2 = {};
 }
 i.prototype.setInt = function(j, k) {
  "use strict";
  return this.__setParam(j, "Int", k);
 };
 i.prototype.setFloat = function(j, k) {
  "use strict";
  return this.__setParam(j, "Float", k);
 };
 i.prototype.setString = function(j, k) {
  "use strict";
  return this.__setParam(j, "String", k);
 };
 i.prototype.setExists = function(j, k) {
  "use strict";
  if (k === false) k = void 0;
  return this.__setParam(j, "Exists", k);
 };
 i.prototype.setBool = function(j, k) {
  "use strict";
  return this.__setParam(j, "Bool", k);
 };
 i.prototype.setEnum = function(j, k) {
  "use strict";
  return this.__setParam(j, "Enum", k);
 };
 i.prototype.setIntVector = function(j, k) {
  "use strict";
  return this.__setParam(j, "IntVector", k);
 };
 i.prototype.setFloatVector = function(j, k) {
  "use strict";
  return this.__setParam(j, "FloatVector", k);
 };
 i.prototype.setStringVector = function(j, k) {
  "use strict";
  return this.__setParam(j, "StringVector", k);
 };
 i.prototype.setEnumVector = function(j, k) {
  "use strict";
  return this.__setParam(j, "EnumVector", k);
 };
 i.prototype.setIntToIntMap = function(j, k) {
  "use strict";
  return this.__setParam(j, "IntToIntMap", k);
 };
 i.prototype.setIntToFloatMap = function(j, k) {
  "use strict";
  return this.__setParam(j, "IntToFloatMap", k);
 };
 i.prototype.setIntToStringMap = function(j, k) {
  "use strict";
  return this.__setParam(j, "IntToStringMap", k);
 };
 i.prototype.setIntToBoolMap = function(j, k) {
  "use strict";
  return this.__setParam(j, "IntToBoolMap", k);
 };
 i.prototype.setStringToIntMap = function(j, k) {
  "use strict";
  return this.__setParam(j, "StringToIntMap", k);
 };
 i.prototype.setStringToFloatMap = function(j, k) {
  "use strict";
  return this.__setParam(j, "StringToFloatMap", k);
 };
 i.prototype.setStringToStringMap = function(j, k) {
  "use strict";
  return this.__setParam(j, "StringToStringMap", k);
 };
 i.prototype.setStringToBoolMap = function(j, k) {
  "use strict";
  return this.__setParam(j, "StringToBoolMap", k);
 };
 i.prototype.setHackType = function(j, k) {
  "use strict";
  return this.__setParam(j, "HackType", k);
 };
 i.prototype.__validateRequiredParamsExistence = function() {
  "use strict";
  for (var j in this.$XControllerURIBuilder1) h(!this.$XControllerURIBuilder1[j].required || this.$XControllerURIBuilder2.hasOwnProperty(j));
 };
 i.prototype.__setParam = function(j, k, l) {
  "use strict";
  h(j in this.$XControllerURIBuilder1);
  var m = this.$XControllerURIBuilder1[j].type;
  h(m === k);
  this.__setParamInt(j, l);
  return this;
 };
 i.prototype.__setParamInt = function(j, k) {
  "use strict";
  this.$XControllerURIBuilder2[j] = k;
 };
 i.prototype.getURI = function() {
  "use strict";
  this.__validateRequiredParamsExistence();
  var j = {}, k = "", l = /^\{(\?)?(\*)?(.+?)\}$/, m = this.$XControllerURIBuilder0.split("/"), n = false;
  for (var o = 0; o < m.length; o++) {
   var p = m[o];
   if (p === "") continue;
   var q = l.exec(p);
   if (!q) {
    k += "/" + p;
   } else {
    var r = q[1] === "?", s = q[3], t = this.$XControllerURIBuilder1[s];
    h(t);
    if (r && n) continue;
    var u = this.$XControllerURIBuilder2[s];
    if (u == null && r) {
     n = true;
     continue;
    }
    h(u != null);
    k += "/" + u;
    j[s] = true;
   }
  }
  if (this.$XControllerURIBuilder0.slice(-1) === "/") k += "/";
  var v = new g();
  v.setPath(k);
  for (t in this.$XControllerURIBuilder2) {
   u = this.$XControllerURIBuilder2[t];
   if (!j[t] && u != null) {
    var w = this.$XControllerURIBuilder1[t];
    v.addQueryData(t, w && w.type === "Exists" ? null : u);
   }
  }
  return v;
 };
 i.create = function(j, k) {
  return i.bind(null, j, k);
 };
 e.exports = i;
}, null);

__d("XRequest", [ "invariant" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 var h = function(j, k, l) {
  var m;
  switch (j) {
  case "Bool":
   m = k && k !== "false" || false;
   break;

  case "Int":
   m = parseInt(k, 10);
   g(!isNaN(m));
   break;

  case "Float":
   m = parseFloat(k, 10);
   g(!isNaN(m));
   break;

  case "String":
   m = k.toString();
   break;

  case "Enum":
   if (l === 0) {
    m = h("Int", k, null);
   } else if (l === 1) {
    m = h("String", k, null);
   } else if (l === 2) {
    m = k;
   } else g(false);
   break;

  default:
   var n, o, p, q;
   if (n = /^Nullable(\w+)$/.exec(j)) {
    if (k === null) {
     m = null;
    } else m = h(n[1], k, l);
   } else if (o = /^(\w+)Vector$/.exec(j)) {
    if (!Array.isArray(k)) {
     m = k.toString();
     m = m === "" ? [] : m.split(",");
    } else m = k;
    var r = o[1];
    g(typeof r === "string");
    m = m.map(function(u) {
     return h(r, u, l && l.member);
    });
   } else if (p = /^(\w+)Set$/.exec(j)) {
    if (!Array.isArray(k)) {
     m = k.toString();
     m = m === "" ? [] : m.split(",");
    } else m = k;
    m = m.reduce(function(u, v) {
     u[v] = v;
     return u;
    }, {});
    r = p[1];
    g(typeof r === "string");
    m = Object.keys(m).map(function(u) {
     return h(r, m[u], l && l.member);
    });
   } else if (q = /^(\w+)To(\w+)Map$/.exec(j)) {
    m = {};
    var s = q[1], t = q[2];
    g(typeof s === "string" && typeof t === "string");
    Object.keys(k).forEach(function(u) {
     m[h(s, u, l && l.key)] = h(t, k[u], l && l.value);
    });
   } else g(false);
  }
  return m;
 };
 function i(j, k, l) {
  "use strict";
  this.$XRequest0 = k;
  this.$XRequest1 = Object.assign({}, l.getQueryData());
  var m = j.split("/").filter(function(s) {
   return s;
  }), n = l.getPath().split("/").filter(function(s) {
   return s;
  });
  for (var o = 0; o < m.length; ++o) {
   var p = /^\{(\?)?(\w+)\}$/.exec(m[o]);
   if (!p) {
    g(m[o] === n[o]);
    continue;
   }
   var q = !!p[1], r = p[2];
   g(this.$XRequest0.hasOwnProperty(r));
   if (this.$XRequest0[r].required) {
    g(!q);
    this.$XRequest1[r] = n[o];
   } else {
    g(q);
    if (n[o]) this.$XRequest1[r] = n[o];
   }
  }
  Object.keys(this.$XRequest0).forEach(function(s) {
   g(!this.$XRequest0[s].required || this.$XRequest1.hasOwnProperty(s));
  }, this);
 }
 i.prototype.getExists = function(j) {
  "use strict";
  return this.$XRequest1[j] !== void 0;
 };
 i.prototype.getBool = function(j) {
  "use strict";
  return this.$XRequest2(j, "Bool");
 };
 i.prototype.getInt = function(j) {
  "use strict";
  return this.$XRequest2(j, "Int");
 };
 i.prototype.getFloat = function(j) {
  "use strict";
  return this.$XRequest2(j, "Float");
 };
 i.prototype.getString = function(j) {
  "use strict";
  return this.$XRequest2(j, "String");
 };
 i.prototype.getEnum = function(j) {
  "use strict";
  return this.$XRequest2(j, "Enum");
 };
 i.prototype.getOptionalInt = function(j) {
  "use strict";
  return this.$XRequest3(j, "Int");
 };
 i.prototype.getOptionalFloat = function(j) {
  "use strict";
  return this.$XRequest3(j, "Float");
 };
 i.prototype.getOptionalString = function(j) {
  "use strict";
  return this.$XRequest3(j, "String");
 };
 i.prototype.getOptionalEnum = function(j) {
  "use strict";
  return this.$XRequest3(j, "Enum");
 };
 i.prototype.getIntVector = function(j) {
  "use strict";
  return this.$XRequest2(j, "IntVector");
 };
 i.prototype.getFloatVector = function(j) {
  "use strict";
  return this.$XRequest2(j, "FloatVector");
 };
 i.prototype.getStringVector = function(j) {
  "use strict";
  return this.$XRequest2(j, "StringVector");
 };
 i.prototype.getEnumVector = function(j) {
  "use strict";
  return this.$XRequest2(j, "EnumVector");
 };
 i.prototype.getOptionalIntVector = function(j) {
  "use strict";
  return this.$XRequest3(j, "IntVector");
 };
 i.prototype.getOptionalFloatVector = function(j) {
  "use strict";
  return this.$XRequest3(j, "FloatVector");
 };
 i.prototype.getOptionalStringVector = function(j) {
  "use strict";
  return this.$XRequest3(j, "StringVector");
 };
 i.prototype.getOptionalEnumVector = function(j) {
  "use strict";
  return this.$XRequest3(j, "EnumVector");
 };
 i.prototype.getIntSet = function(j) {
  "use strict";
  return this.$XRequest2(j, "IntSet");
 };
 i.prototype.getStringSet = function(j) {
  "use strict";
  return this.$XRequest2(j, "StringSet");
 };
 i.prototype.getOptionalIntSet = function(j) {
  "use strict";
  return this.$XRequest3(j, "IntSet");
 };
 i.prototype.getOptionalStringSet = function(j) {
  "use strict";
  return this.$XRequest3(j, "StringSet");
 };
 i.prototype.getEnumToBoolMap = function(j) {
  "use strict";
  return this.$XRequest2(j, "EnumToBoolMap");
 };
 i.prototype.getEnumToEnumMap = function(j) {
  "use strict";
  return this.$XRequest2(j, "EnumToEnumMap");
 };
 i.prototype.getEnumToFloatMap = function(j) {
  "use strict";
  return this.$XRequest2(j, "EnumToFloatMap");
 };
 i.prototype.getEnumToIntMap = function(j) {
  "use strict";
  return this.$XRequest2(j, "EnumToIntMap");
 };
 i.prototype.getEnumToStringMap = function(j) {
  "use strict";
  return this.$XRequest2(j, "EnumToStringMap");
 };
 i.prototype.getIntToBoolMap = function(j) {
  "use strict";
  return this.$XRequest2(j, "IntToBoolMap");
 };
 i.prototype.getIntToEnumMap = function(j) {
  "use strict";
  return this.$XRequest2(j, "IntToEnumMap");
 };
 i.prototype.getIntToFloatMap = function(j) {
  "use strict";
  return this.$XRequest2(j, "IntToFloatMap");
 };
 i.prototype.getIntToIntMap = function(j) {
  "use strict";
  return this.$XRequest2(j, "IntToIntMap");
 };
 i.prototype.getIntToStringMap = function(j) {
  "use strict";
  return this.$XRequest2(j, "IntToStringMap");
 };
 i.prototype.getStringToBoolMap = function(j) {
  "use strict";
  return this.$XRequest2(j, "StringToBoolMap");
 };
 i.prototype.getStringToEnumMap = function(j) {
  "use strict";
  return this.$XRequest2(j, "StringToEnumMap");
 };
 i.prototype.getStringToFloatMap = function(j) {
  "use strict";
  return this.$XRequest2(j, "StringToFloatMap");
 };
 i.prototype.getStringToIntMap = function(j) {
  "use strict";
  return this.$XRequest2(j, "StringToIntMap");
 };
 i.prototype.getStringToStringMap = function(j) {
  "use strict";
  return this.$XRequest2(j, "StringToStringMap");
 };
 i.prototype.getOptionalEnumToBoolMap = function(j) {
  "use strict";
  return this.$XRequest3(j, "EnumToBoolMap");
 };
 i.prototype.getOptionalEnumToEnumMap = function(j) {
  "use strict";
  return this.$XRequest3(j, "EnumToEnumMap");
 };
 i.prototype.getOptionalEnumToFloatMap = function(j) {
  "use strict";
  return this.$XRequest3(j, "EnumToFloatMap");
 };
 i.prototype.getOptionalEnumToIntMap = function(j) {
  "use strict";
  return this.$XRequest3(j, "EnumToIntMap");
 };
 i.prototype.getOptionalEnumToStringMap = function(j) {
  "use strict";
  return this.$XRequest3(j, "EnumToStringMap");
 };
 i.prototype.getOptionalIntToBoolMap = function(j) {
  "use strict";
  return this.$XRequest3(j, "IntToBoolMap");
 };
 i.prototype.getOptionalIntToEnumMap = function(j) {
  "use strict";
  return this.$XRequest3(j, "IntToEnumMap");
 };
 i.prototype.getOptionalIntToFloatMap = function(j) {
  "use strict";
  return this.$XRequest3(j, "IntToFloatMap");
 };
 i.prototype.getOptionalIntToIntMap = function(j) {
  "use strict";
  return this.$XRequest3(j, "IntToIntMap");
 };
 i.prototype.getOptionalIntToStringMap = function(j) {
  "use strict";
  return this.$XRequest3(j, "IntToStringMap");
 };
 i.prototype.getOptionalStringToBoolMap = function(j) {
  "use strict";
  return this.$XRequest3(j, "StringToBoolMap");
 };
 i.prototype.getOptionalStringToEnumMap = function(j) {
  "use strict";
  return this.$XRequest3(j, "StringToEnumMap");
 };
 i.prototype.getOptionalStringToFloatMap = function(j) {
  "use strict";
  return this.$XRequest3(j, "StringToFloatMap");
 };
 i.prototype.getOptionalStringToIntMap = function(j) {
  "use strict";
  return this.$XRequest3(j, "StringToIntMap");
 };
 i.prototype.getOptionalStringToStringMap = function(j) {
  "use strict";
  return this.$XRequest3(j, "StringToStringMap");
 };
 i.prototype.getEnumToNullableEnumMap = function(j) {
  "use strict";
  return this.$XRequest2(j, "EnumToNullableEnumMap");
 };
 i.prototype.getEnumToNullableFloatMap = function(j) {
  "use strict";
  return this.$XRequest2(j, "EnumToNullableFloatMap");
 };
 i.prototype.getEnumToNullableIntMap = function(j) {
  "use strict";
  return this.$XRequest2(j, "EnumToNullableIntMap");
 };
 i.prototype.getEnumToNullableStringMap = function(j) {
  "use strict";
  return this.$XRequest2(j, "EnumToNullableStringMap");
 };
 i.prototype.getIntToNullableEnumMap = function(j) {
  "use strict";
  return this.$XRequest2(j, "IntToNullableEnumMap");
 };
 i.prototype.getIntToNullableFloatMap = function(j) {
  "use strict";
  return this.$XRequest2(j, "IntToNullableFloatMap");
 };
 i.prototype.getIntToNullableIntMap = function(j) {
  "use strict";
  return this.$XRequest2(j, "IntToNullableIntMap");
 };
 i.prototype.getIntToNullableStringMap = function(j) {
  "use strict";
  return this.$XRequest2(j, "IntToNullableStringMap");
 };
 i.prototype.getStringToNullableEnumMap = function(j) {
  "use strict";
  return this.$XRequest2(j, "StringToNullableEnumMap");
 };
 i.prototype.getStringToNullableFloatMap = function(j) {
  "use strict";
  return this.$XRequest2(j, "StringToNullableFloatMap");
 };
 i.prototype.getStringToNullableIntMap = function(j) {
  "use strict";
  return this.$XRequest2(j, "StringToNullableIntMap");
 };
 i.prototype.getStringToNullableStringMap = function(j) {
  "use strict";
  return this.$XRequest2(j, "StringToNullableStringMap");
 };
 i.prototype.getOptionalEnumToNullableEnumMap = function(j) {
  "use strict";
  return this.$XRequest3(j, "EnumToNullableEnumMap");
 };
 i.prototype.getOptionalEnumToNullableFloatMap = function(j) {
  "use strict";
  return this.$XRequest3(j, "EnumToNullableFloatMap");
 };
 i.prototype.getOptionalEnumToNullableIntMap = function(j) {
  "use strict";
  return this.$XRequest3(j, "EnumToNullableIntMap");
 };
 i.prototype.getOptionalEnumToNullableStringMap = function(j) {
  "use strict";
  return this.$XRequest3(j, "EnumToNullableStringMap");
 };
 i.prototype.getOptionalIntToNullableEnumMap = function(j) {
  "use strict";
  return this.$XRequest3(j, "IntToNullableEnumMap");
 };
 i.prototype.getOptionalIntToNullableFloatMap = function(j) {
  "use strict";
  return this.$XRequest3(j, "IntToNullableFloatMap");
 };
 i.prototype.getOptionalIntToNullableIntMap = function(j) {
  "use strict";
  return this.$XRequest3(j, "IntToNullableIntMap");
 };
 i.prototype.getOptionalIntToNullableStringMap = function(j) {
  "use strict";
  return this.$XRequest3(j, "IntToNullableStringMap");
 };
 i.prototype.getOptionalStringToNullableEnumMap = function(j) {
  "use strict";
  return this.$XRequest3(j, "StringToNullableEnumMap");
 };
 i.prototype.getOptionalStringToNullableFloatMap = function(j) {
  "use strict";
  return this.$XRequest3(j, "StringToNullableFloatMap");
 };
 i.prototype.getOptionalStringToNullableIntMap = function(j) {
  "use strict";
  return this.$XRequest3(j, "StringToNullableIntMap");
 };
 i.prototype.getOptionalStringToNullableStringMap = function(j) {
  "use strict";
  return this.$XRequest3(j, "StringToNullableStringMap");
 };
 i.prototype.$XRequest2 = function(j, k) {
  "use strict";
  this.$XRequest4(j, k);
  var l = this.$XRequest0[j];
  if (!this.$XRequest1.hasOwnProperty(j) && l.defaultValue) {
   g(!l.required);
   return h(k, l.defaultValue, l.enumType);
  }
  g(l.required || k === "Bool" || l.defaultValue != null);
  return h(k, this.$XRequest1[j], l.enumType);
 };
 i.prototype.$XRequest3 = function(j, k) {
  "use strict";
  this.$XRequest4(j, k);
  var l = this.$XRequest0[j];
  g(!l.required);
  g(!l.defaultValue);
  if (this.$XRequest1.hasOwnProperty(j)) return h(k, this.$XRequest1[j], l.enumType);
  return null;
 };
 i.prototype.$XRequest4 = function(j, k) {
  "use strict";
  g(this.$XRequest0.hasOwnProperty(j));
  g(this.$XRequest0[j].type === k);
 };
 e.exports = i;
}, null);

__d("XController", [ "XControllerURIBuilder", "XRequest" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 function i(j, k) {
  "use strict";
  this.$XController0 = j;
  this.$XController1 = k;
 }
 i.prototype.getURIBuilder = function(j) {
  "use strict";
  var k = new g(this.$XController0, this.$XController1);
  if (j) {
   var l = this.getRequest(j);
   Object.keys(this.$XController1).forEach(function(m) {
    var n = this.$XController1[m], o = "";
    if (!n.required && !n.hasOwnProperty("defaultValue")) o = "Optional";
    var p = "get" + o + n.type, q = l[p](m);
    if (q == null || n.hasOwnProperty("defaultValue") && q === n.defaultValue) return;
    var r = "set" + n.type;
    k[r](m, q);
   }, this);
  }
  return k;
 };
 i.prototype.getRequest = function(j) {
  "use strict";
  return new h(this.$XController0, this.$XController1, j);
 };
 i.create = function(j, k) {
  return new i(j, k);
 };
 e.exports = i;
}, null);

__d("XSICopyPasteController", [ "XController" ], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 e.exports = b("XController").create("/si/content-matcher/", {
  text: {
   type: "String",
   required: true
  }
 });
}, null);

__d("SICopyPasteUtility", [ "EventListener", "XSICopyPasteController" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 var i = {
  getSelectedText: function() {
   var j = null;
   if (window.getSelection) {
    j = window.getSelection().toString();
   } else if (document.selection) j = document.selection.createRange().text;
   return String(j);
  },
  setBodyCopyCallback: function(j) {
   g.listen(document.body, "copy", j);
  },
  getLoggingURI: function() {
   return h.getURIBuilder().setString("text", i.getSelectedText()).getURI().toString();
  }
 };
 e.exports = i;
}, null);

__d("isAtlassolutionsDotComURI", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 var g = new RegExp("(^|\\.)atlassolutions\\.com$", "i"), h = [ "https" ];
 function i(j) {
  if (j.isEmpty() && j.toString() !== "#") return false;
  if (!j.getDomain() && !j.getProtocol()) return true;
  return h.indexOf(j.getProtocol()) !== -1 && g.test(j.getDomain());
 }
 e.exports = i;
}, null);

__d("isMessengerDotComURI", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 var g = new RegExp("(^|\\.)messenger\\.com$", "i"), h = [ "https" ];
 function i(j) {
  if (j.isEmpty() && j.toString() !== "#") return false;
  if (!j.getDomain() && !j.getProtocol()) return false;
  return h.indexOf(j.getProtocol()) !== -1 && g.test(j.getDomain());
 }
 e.exports = i;
}, null);

__d("AsyncSignal", [ "ErrorUtils", "QueryString", "TrackingConfig", "URI", "isAtlassolutionsDotComURI", "isFacebookURI", "isMessengerDotComURI", "copyProperties", "getAsyncParams", "memoize" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
 b.__markCompiled && b.__markCompiled();
 function q(r, s) {
  this.data = s || {};
  this.uri = r.toString();
  if (i.domain && this.uri.charAt(0) == "/") this.uri = i.domain + this.uri;
 }
 q.prototype.setHandler = function(r) {
  this.handler = r;
  return this;
 };
 q.prototype.setTimeout = function(r) {
  this.timeout = r;
  return this;
 };
 q.prototype.send = function() {
  var r = this.handler, s = this.data, t = new Image();
  if (r) {
   var u = p(function() {
    g.applyWithGuard(r, null, [ t.height == 1 ]);
   });
   t.onload = t.onerror = function() {
    u();
   };
   if (this.timeout) setTimeout(u, this.timeout);
  }
  s.asyncSignal = (Math.random() * 1e4 | 0) + 1;
  var v = new j(this.uri), w = l(v) || m(v) || k(v);
  if (w) {
   n(s, o("POST"));
  } else throw new Error("'" + this.uri + "' " + "is an external URL, you should not send async signals to offsite links.");
  t.src = h.appendToUrl(this.uri, s);
  return this;
 };
 e.exports = q;
}, null);

__d("SICopyPaste", [ "AsyncSignal", "SICopyPasteUtility" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 e.exports = {
  init: function() {
   h.setBodyCopyCallback(function() {
    new g(h.getLoggingURI()).send();
   });
  }
 };
}, null);