if (self.CavalryLogger) {
 CavalryLogger.start_js([ "v7moV" ]);
}

__d("IntlVariations", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 e.exports = {
  BITMASK_NUMBER: 805306368,
  NUMBER_SINGULAR: 268435456,
  NUMBER_DUAL: 536870912,
  NUMBER_PLURAL: 805306368,
  BITMASK_GENDER: 50331648,
  GENDER_MALE: 16777216,
  GENDER_FEMALE: 33554432,
  GENDER_UNKNOWN: 50331648
 };
}, null);

__d("PixelRatioConst", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 e.exports = {
  cookieName: "dpr"
 };
}, null);

__d("ModuleDependencies", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 function g(k, l, m) {
  var n = b.__debug.modules[m], o = b.__debug.deps;
  if (l[m]) return;
  l[m] = true;
  if (!n) {
   o[m] && (k[m] = true);
   return;
  }
  if (!n.dependencies || !n.dependencies.length) {
   if (n.waiting) k[m] = true;
   return;
  }
  n.dependencies.forEach(function(p) {
   g(k, l, p);
  });
 }
 function h(k) {
  if (b.__debug) {
   var l = {};
   g(l, {}, k);
   var m = Object.keys(l);
   m.sort();
   return m;
  }
  return null;
 }
 function i() {
  var k = {
   loading: {},
   missing: []
  };
  if (!b.__debug) return k;
  var l = {}, m = b.__debug.modules, n = b.__debug.deps;
  for (var o in m) {
   var p = m[o];
   if (p.waiting) {
    var q = {};
    g(q, {}, p.id);
    delete q[p.id];
    k.loading[p.id] = Object.keys(q);
    k.loading[p.id].sort();
    k.loading[p.id].forEach(function(r) {
     if (!(r in m) && n[r]) l[r] = 1;
    });
   }
  }
  k.missing = Object.keys(l);
  k.missing.sort();
  return k;
 }
 var j = {
  setRequireDebug: function(k) {
   b.__debug = k;
  },
  getMissing: h,
  getNotLoadedModules: i
 };
 e.exports = j;
}, null);

__d("CurrentUser", [ "Cookie", "CurrentUserInitialData" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 var i = {
  getID: function() {
   return h.USER_ID;
  },
  getAccountID: function() {
   return h.ACCOUNT_ID;
  },
  isLoggedIn: function() {
   return h.USER_ID && h.USER_ID !== "0";
  },
  isLoggedInNow: function() {
   if (!i.isLoggedIn()) return false;
   if (h.IS_INTERN_SITE) return true;
   if (h.ORIGINAL_USER_ID) return h.ORIGINAL_USER_ID === g.get("c_user");
   return h.USER_ID === g.get("c_user");
  },
  isEmployee: function() {
   return !!h.IS_EMPLOYEE;
  },
  hasWorkUser: function() {
   return !!h.HAS_WORK_USER;
  },
  isGray: function() {
   return !!h.IS_GRAY;
  }
 };
 e.exports = i;
}, null);

__d("Miny", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 var g = "Miny1", h = {
  encode: [],
  decode: {}
 }, i = "wxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_".split("");
 function j(n) {
  for (var o = h.encode.length; o < n; o++) {
   var p = o.toString(32).split("");
   p[p.length - 1] = i[parseInt(p[p.length - 1], 32)];
   p = p.join("");
   h.encode[o] = p;
   h.decode[p] = o;
  }
  return h;
 }
 function k(n) {
  if (/^$|[~\\]|__proto__/.test(n)) return n;
  var o = n.match(/\w+|\W+/g), p = {};
  for (var q = 0; q < o.length; q++) p[o[q]] = (p[o[q]] || 0) + 1;
  var r = Object.keys(p);
  r.sort(function(u, v) {
   return p[u] < p[v] ? 1 : p[v] < p[u] ? -1 : 0;
  });
  var s = j(r.length).encode;
  for (q = 0; q < r.length; q++) p[r[q]] = s[q];
  var t = [];
  for (q = 0; q < o.length; q++) t[q] = p[o[q]];
  return [ g, r.length ].concat(r).concat(t.join("")).join("~");
 }
 function l(n) {
  var o = n.split("~");
  if (o.shift() != g) return n;
  var p = parseInt(o.shift(), 10), q = o.pop();
  q = q.match(/[0-9a-v]*[\-w-zA-Z_]/g);
  var r = o, s = j(p).decode, t = [];
  for (var u = 0; u < q.length; u++) t[u] = r[s[q[u]]];
  return t.join("");
 }
 var m = {
  encode: k,
  decode: l
 };
 e.exports = m;
}, null);

__d("QueryString", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 function g(k) {
  var l = [];
  Object.keys(k).sort().forEach(function(m) {
   var n = k[m];
   if (typeof n === "undefined") return;
   if (n === null) {
    l.push(m);
    return;
   }
   l.push(encodeURIComponent(m) + "=" + encodeURIComponent(n));
  });
  return l.join("&");
 }
 function h(k, l) {
  var m = {};
  if (k === "") return m;
  var n = k.split("&");
  for (var o = 0; o < n.length; o++) {
   var p = n[o].split("=", 2), q = decodeURIComponent(p[0]);
   if (l && m.hasOwnProperty(q)) throw new URIError("Duplicate key: " + q);
   m[q] = p.length === 2 ? decodeURIComponent(p[1]) : null;
  }
  return m;
 }
 function i(k, l) {
  return k + (~k.indexOf("?") ? "&" : "?") + (typeof l === "string" ? l : j.encode(l));
 }
 var j = {
  encode: g,
  decode: h,
  appendToUrl: i
 };
 e.exports = j;
}, null);

__d("VersionRange", [ "invariant" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var h = /\./, i = /\|\|/, j = /\s+\-\s+/, k = /^(<=|<|=|>=|~>|~|>|)?\s*(.+)/, l = /^(\d*)(.*)/;
 function m(ea, fa) {
  var ga = ea.split(i);
  if (ga.length > 1) {
   return ga.some(function(ha) {
    return da.contains(ha, fa);
   });
  } else {
   ea = ga[0].trim();
   return n(ea, fa);
  }
 }
 function n(ea, fa) {
  var ga = ea.split(j);
  g(ga.length > 0 && ga.length <= 2);
  if (ga.length === 1) {
   return o(ga[0], fa);
  } else {
   var ha = ga, ia = ha[0], ja = ha[1];
   g(x(ia) && x(ja));
   return o(">=" + ia, fa) && o("<=" + ja, fa);
  }
 }
 function o(ea, fa) {
  ea = ea.trim();
  if (ea === "") return true;
  var ga = fa.split(h), ha = v(ea), ia = ha.modifier, ja = ha.rangeComponents;
  switch (ia) {
  case "<":
   return p(ga, ja);

  case "<=":
   return q(ga, ja);

  case ">=":
   return s(ga, ja);

  case ">":
   return t(ga, ja);

  case "~":
  case "~>":
   return u(ga, ja);

  default:
   return r(ga, ja);
  }
 }
 function p(ea, fa) {
  return ca(ea, fa) === -1;
 }
 function q(ea, fa) {
  var ga = ca(ea, fa);
  return ga === -1 || ga === 0;
 }
 function r(ea, fa) {
  return ca(ea, fa) === 0;
 }
 function s(ea, fa) {
  var ga = ca(ea, fa);
  return ga === 1 || ga === 0;
 }
 function t(ea, fa) {
  return ca(ea, fa) === 1;
 }
 function u(ea, fa) {
  var ga = fa.slice(), ha = fa.slice();
  if (ha.length > 1) ha.pop();
  var ia = ha.length - 1, ja = parseInt(ha[ia], 10);
  if (w(ja)) ha[ia] = ja + 1 + "";
  return s(ea, ga) && p(ea, ha);
 }
 function v(ea) {
  var fa = ea.split(h), ga = fa[0].match(k);
  g(ga);
  return {
   modifier: ga[1],
   rangeComponents: [ ga[2] ].concat(fa.slice(1))
  };
 }
 function w(ea) {
  return !isNaN(ea) && isFinite(ea);
 }
 function x(ea) {
  return !v(ea).modifier;
 }
 function y(ea, fa) {
  for (var ga = ea.length; ga < fa; ga++) ea[ga] = "0";
 }
 function z(ea, fa) {
  ea = ea.slice();
  fa = fa.slice();
  y(ea, fa.length);
  for (var ga = 0; ga < fa.length; ga++) {
   var ha = fa[ga].match(/^[x*]$/i);
   if (ha) {
    fa[ga] = ea[ga] = "0";
    if (ha[0] === "*" && ga === fa.length - 1) for (var ia = ga; ia < ea.length; ia++) ea[ia] = "0";
   }
  }
  y(fa, ea.length);
  return [ ea, fa ];
 }
 function aa(ea, fa) {
  var ga = ea.match(l)[1], ha = fa.match(l)[1], ia = parseInt(ga, 10), ja = parseInt(ha, 10);
  if (w(ia) && w(ja) && ia !== ja) {
   return ba(ia, ja);
  } else return ba(ea, fa);
 }
 function ba(ea, fa) {
  g(typeof ea === typeof fa);
  if (ea > fa) {
   return 1;
  } else if (ea < fa) {
   return -1;
  } else return 0;
 }
 function ca(ea, fa) {
  var ga = z(ea, fa), ha = ga[0], ia = ga[1];
  for (var ja = 0; ja < ia.length; ja++) {
   var ka = aa(ha[ja], ia[ja]);
   if (ka) return ka;
  }
  return 0;
 }
 var da = {
  contains: function(ea, fa) {
   return m(ea.trim(), fa.trim());
  }
 };
 e.exports = da;
}, null);

__d("mapObject", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var g = Object.prototype.hasOwnProperty;
 function h(i, j, k) {
  if (!i) return null;
  var l = {};
  for (var m in i) if (g.call(i, m)) l[m] = j.call(k, i[m], m, i);
  return l;
 }
 e.exports = h;
}, null);

__d("memoizeStringOnly", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 function g(h) {
  var i = {};
  return function(j) {
   if (!i.hasOwnProperty(j)) i[j] = h.call(this, j);
   return i[j];
  };
 }
 e.exports = g;
}, null);

__d("UserAgent", [ "UserAgentData", "VersionRange", "mapObject", "memoizeStringOnly" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 function k(n, o, p, q) {
  if (n === p) return true;
  if (!p.startsWith(n)) return false;
  var r = p.slice(n.length);
  if (o) {
   r = q ? q(r) : r;
   return h.contains(r, o);
  }
  return false;
 }
 function l(n) {
  if (g.platformName === "Windows") return n.replace(/^\s*NT/, "");
  return n;
 }
 var m = {
  isBrowser: function(n) {
   return k(g.browserName, g.browserFullVersion, n);
  },
  isBrowserArchitecture: function(n) {
   return k(g.browserArchitecture, null, n);
  },
  isDevice: function(n) {
   return k(g.deviceName, null, n);
  },
  isEngine: function(n) {
   return k(g.engineName, g.engineVersion, n);
  },
  isPlatform: function(n) {
   return k(g.platformName, g.platformFullVersion, n, l);
  },
  isPlatformArchitecture: function(n) {
   return k(g.platformArchitecture, null, n);
  }
 };
 e.exports = i(m, j);
}, null);

__d("CurrentCommunity", [ "CurrentCommunityInitialData" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 var h = {
  getID: function() {
   return g.COMMUNITY_ID || "0";
  }
 };
 e.exports = h;
}, null);

__d("DTSG", [ "DTSGInitialData" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 var h = g.token || null, i = {
  setToken: function(j) {
   h = j;
  },
  getToken: function() {
   return h;
  }
 };
 e.exports = i;
}, null);

__d("URIRFC3986", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 var g = new RegExp("^" + "([^:/?#]+:)?" + "(//" + "([^\\\\/?#@]*@)?" + "(" + "\\[[A-Fa-f0-9:.]+\\]|" + "[^\\/?#:]*" + ")" + "(:[0-9]*)?" + ")?" + "([^?#]*)" + "(\\?[^#]*)?" + "(#.*)?"), h = {
  parse: function(i) {
   if (i.trim() === "") return null;
   var j = i.match(g), k = {};
   k.uri = j[0] ? j[0] : null;
   k.scheme = j[1] ? j[1].substr(0, j[1].length - 1) : null;
   k.authority = j[2] ? j[2].substr(2) : null;
   k.userinfo = j[3] ? j[3].substr(0, j[3].length - 1) : null;
   k.host = j[2] ? j[4] : null;
   k.port = j[5] ? j[5].substr(1) ? parseInt(j[5].substr(1), 10) : null : null;
   k.path = j[6] ? j[6] : null;
   k.query = j[7] ? j[7].substr(1) : null;
   k.fragment = j[8] ? j[8].substr(1) : null;
   k.isGenericURI = k.authority === null && !!k.scheme;
   return k;
  }
 };
 e.exports = h;
}, null);

__d("URIBase", [ "URIRFC3986", "URISchemes", "copyProperties", "ex", "invariant" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 var l = new RegExp("[\\x00-\\x2c\\x2f\\x3b-\\x40\\x5c\\x5e\\x60\\x7b-\\x7f" + "\\uFDD0-\\uFDEF\\uFFF0-\\uFFFF" + "\\u2047\\u2048\\uFE56\\uFE5F\\uFF03\\uFF0F\\uFF1F]"), m = new RegExp("^(?:[^/]*:|" + "[\\x00-\\x1f]*/[\\x00-\\x1f]*/)");
 function n(q, r, s, t) {
  if (!r) return true;
  if (r instanceof p) {
   q.setProtocol(r.getProtocol());
   q.setDomain(r.getDomain());
   q.setPort(r.getPort());
   q.setPath(r.getPath());
   q.setQueryData(t.deserialize(t.serialize(r.getQueryData())));
   q.setFragment(r.getFragment());
   q.setForceFragmentSeparator(r.getForceFragmentSeparator());
   return true;
  }
  r = r.toString().trim();
  var u = g.parse(r) || {};
  if (!s && !h.isAllowed(u.scheme)) return false;
  q.setProtocol(u.scheme || "");
  if (!s && l.test(u.host)) return false;
  q.setDomain(u.host || "");
  q.setPort(u.port || "");
  q.setPath(u.path || "");
  if (s) {
   q.setQueryData(t.deserialize(u.query) || {});
  } else try {
   q.setQueryData(t.deserialize(u.query) || {});
  } catch (v) {
   return false;
  }
  q.setFragment(u.fragment || "");
  if (u.fragment === "") q.setForceFragmentSeparator(true);
  if (u.userinfo !== null) if (s) {
   throw new Error(j("URI.parse: invalid URI (userinfo is not allowed in a URI): %s", q.toString()));
  } else return false;
  if (!q.getDomain() && q.getPath().indexOf("\\") !== -1) if (s) {
   throw new Error(j("URI.parse: invalid URI (no domain but multiple back-slashes): %s", q.toString()));
  } else return false;
  if (!q.getProtocol() && m.test(r)) if (s) {
   throw new Error(j("URI.parse: invalid URI (unsafe protocol-relative URLs): %s", q.toString()));
  } else return false;
  return true;
 }
 var o = [];
 function p(q, r) {
  "use strict";
  k(r);
  this.$URIBase0 = r;
  this.$URIBase1 = "";
  this.$URIBase2 = "";
  this.$URIBase3 = "";
  this.$URIBase4 = "";
  this.$URIBase5 = "";
  this.$URIBase6 = {};
  this.$URIBase7 = false;
  n(this, q, true, r);
 }
 p.prototype.setProtocol = function(q) {
  "use strict";
  k(h.isAllowed(q));
  this.$URIBase1 = q;
  return this;
 };
 p.prototype.getProtocol = function(q) {
  "use strict";
  return this.$URIBase1;
 };
 p.prototype.setSecure = function(q) {
  "use strict";
  return this.setProtocol(q ? "https" : "http");
 };
 p.prototype.isSecure = function() {
  "use strict";
  return this.getProtocol() === "https";
 };
 p.prototype.setDomain = function(q) {
  "use strict";
  if (l.test(q)) throw new Error(j("URI.setDomain: unsafe domain specified: %s for url %s", q, this.toString()));
  this.$URIBase2 = q;
  return this;
 };
 p.prototype.getDomain = function() {
  "use strict";
  return this.$URIBase2;
 };
 p.prototype.setPort = function(q) {
  "use strict";
  this.$URIBase3 = q;
  return this;
 };
 p.prototype.getPort = function() {
  "use strict";
  return this.$URIBase3;
 };
 p.prototype.setPath = function(q) {
  "use strict";
  this.$URIBase4 = q;
  return this;
 };
 p.prototype.getPath = function() {
  "use strict";
  return this.$URIBase4;
 };
 p.prototype.addQueryData = function(q, r) {
  "use strict";
  if (Object.prototype.toString.call(q) === "[object Object]") {
   i(this.$URIBase6, q);
  } else this.$URIBase6[q] = r;
  return this;
 };
 p.prototype.setQueryData = function(q) {
  "use strict";
  this.$URIBase6 = q;
  return this;
 };
 p.prototype.getQueryData = function() {
  "use strict";
  return this.$URIBase6;
 };
 p.prototype.removeQueryData = function(q) {
  "use strict";
  if (!Array.isArray(q)) q = [ q ];
  for (var r = 0, s = q.length; r < s; ++r) delete this.$URIBase6[q[r]];
  return this;
 };
 p.prototype.setFragment = function(q) {
  "use strict";
  this.$URIBase5 = q;
  this.setForceFragmentSeparator(false);
  return this;
 };
 p.prototype.getFragment = function() {
  "use strict";
  return this.$URIBase5;
 };
 p.prototype.setForceFragmentSeparator = function(q) {
  "use strict";
  this.$URIBase7 = q;
  return this;
 };
 p.prototype.getForceFragmentSeparator = function() {
  "use strict";
  return this.$URIBase7;
 };
 p.prototype.isEmpty = function() {
  "use strict";
  return !(this.getPath() || this.getProtocol() || this.getDomain() || this.getPort() || Object.keys(this.getQueryData()).length > 0 || this.getFragment());
 };
 p.prototype.toString = function() {
  "use strict";
  var q = this;
  for (var r = 0; r < o.length; r++) q = o[r](q);
  return q.$URIBase8();
 };
 p.prototype.$URIBase8 = function() {
  "use strict";
  var q = "", r = this.getProtocol();
  if (r) q += r + "://";
  var s = this.getDomain();
  if (s) q += s;
  var t = this.getPort();
  if (t) q += ":" + t;
  var u = this.getPath();
  if (u) {
   q += u;
  } else if (q) q += "/";
  var v = this.$URIBase0.serialize(this.getQueryData());
  if (v) q += "?" + v;
  var w = this.getFragment();
  if (w) {
   q += "#" + w;
  } else if (this.getForceFragmentSeparator()) q += "#";
  return q;
 };
 p.registerFilter = function(q) {
  "use strict";
  o.push(q);
 };
 p.prototype.getOrigin = function() {
  "use strict";
  var q = this.getPort();
  return this.getProtocol() + "://" + this.getDomain() + (q ? ":" + q : "");
 };
 p.isValidURI = function(q, r) {
  return n(new p(null, r), q, false, r);
 };
 e.exports = p;
}, null);

__d("PHPQuerySerializer", [ "invariant" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 function h(o) {
  return i(o, null);
 }
 function i(o, p) {
  p = p || "";
  var q = [];
  if (o === null || o === void 0) {
   q.push(j(p));
  } else if (typeof o == "object") {
   g(!("nodeName" in o || "nodeType" in o));
   for (var r in o) if (o.hasOwnProperty(r) && o[r] !== void 0) q.push(i(o[r], p ? p + "[" + r + "]" : r));
  } else q.push(j(p) + "=" + j(o));
  return q.join("&");
 }
 function j(o) {
  return encodeURIComponent(o).replace(/%5D/g, "]").replace(/%5B/g, "[");
 }
 var k = /^([-_\w]+)((?:\[[-_\w]*\])+)=?(.*)/;
 function l(o) {
  if (!o) return {};
  var p = {};
  o = o.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  o = o.split("&");
  var q = Object.prototype.hasOwnProperty;
  for (var r = 0, s = o.length; r < s; r++) {
   var t = o[r].match(k);
   if (!t) {
    var u = o[r].split("=");
    p[m(u[0])] = u[1] === void 0 ? null : m(u[1]);
   } else {
    var v = t[2].split(/\]\[|\[|\]/).slice(0, -1), w = t[1], x = m(t[3] || "");
    v[0] = w;
    var y = p;
    for (var z = 0; z < v.length - 1; z++) if (v[z]) {
     if (!q.call(y, v[z])) {
      var aa = v[z + 1] && !v[z + 1].match(/^\d{1,3}$/) ? {} : [];
      y[v[z]] = aa;
      if (y[v[z]] !== aa) return p;
     }
     y = y[v[z]];
    } else {
     if (v[z + 1] && !v[z + 1].match(/^\d{1,3}$/)) {
      y.push({});
     } else y.push([]);
     y = y[y.length - 1];
    }
    if (y instanceof Array && v[v.length - 1] === "") {
     y.push(x);
    } else y[v[v.length - 1]] = x;
   }
  }
  return p;
 }
 function m(o) {
  return decodeURIComponent(o.replace(/\+/g, " "));
 }
 var n = {
  serialize: h,
  encodeComponent: j,
  deserialize: l,
  decodeComponent: m
 };
 e.exports = n;
}, null);

__d("getAsyncParams", [ "CurrentCommunity", "CurrentUser", "DTSG", "ISB", "LSD", "ServerJSDefine", "SiteData", "URIBase", "PHPQuerySerializer" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
 b.__markCompiled && b.__markCompiled();
 var p = 1;
 function q(r) {
  var s = {
   __user: h.getID(),
   __a: 1,
   __dyn: l.getLoadedModuleHash(),
   __req: (p++).toString(36)
  }, t = new n(window.location.href, o).getQueryData();
  for (var u in t) if (t.hasOwnProperty(u)) if (u === "locale" || u.substr(0, 3) === "mh_") s[u] = t[u];
  if (r == "POST") {
   if (i.getToken()) {
    s.fb_dtsg = i.getToken();
    var v = "";
    for (var w = 0; w < s.fb_dtsg.length; w++) v += s.fb_dtsg.charCodeAt(w);
    s.ttstamp = "2" + v;
   }
   if (k.token) s.lsd = k.token;
  }
  if (j.token) s.fb_isb = j.token;
  if (m.revision) s.__rev = m.revision;
  if (g.getID() !== "0") s.__cid = g.getID();
  return s;
 }
 e.exports = q;
}, null);

__d("getSameOriginTransport", [ "ex" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 function h() {
  try {
   return a.XMLHttpRequest ? new a.XMLHttpRequest() : new ActiveXObject("MSXML2.XMLHTTP.3.0");
  } catch (i) {
   throw new Error(g("getSameOriginTransport: %s", i.message));
  }
 }
 e.exports = h;
}, null);

__d("BanzaiAdapter", [ "Arbiter", "CurrentUser", "Miny", "QueryString", "Run", "SiteData", "UserAgent", "getAsyncParams", "getSameOriginTransport", "setTimeoutAcrossTransitions", "BanzaiConfig" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
 b.__markCompiled && b.__markCompiled();
 var r = [], s = new g(), t = "/ajax/bz", u = {}, v = u.adapter = {
  config: q,
  getUserID: function() {
   return h.getID();
  },
  inform: function(w) {
   s.inform(w);
  },
  subscribe: function(w, x) {
   s.subscribe(w, x);
  },
  cleanup: function() {
   var w = r;
   r = [];
   w.forEach(function(x) {
    if (x.readyState < 4) x.abort();
   });
  },
  readyToSend: function() {
   return m.isBrowser("IE <= 8") || navigator.onLine;
  },
  send: function(w, x, y, z) {
   var aa = "POST", ba = o();
   ba.open(aa, t, true);
   ba.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
   ba.onreadystatechange = function() {
    if (ba.readyState >= 4) {
     var fa;
     try {
      fa = ba.status;
     } catch (ga) {
      fa = 0;
     }
     if (fa == 200) {
      if (x) x();
      if (!z) v.inform(u.OK);
     } else {
      if (y) y(fa);
      if (!z) v.inform(u.ERROR);
     }
    }
   };
   p(function() {
    if (ba.readyState < 4) ba.abort();
   }, u.SEND_TIMEOUT);
   r.push(ba);
   var ca = n(aa);
   ca.q = JSON.stringify(w);
   ca.ts = Date.now();
   ca.ph = l.push_phase;
   if (u.FBTRACE) ca.fbtrace = u.FBTRACE;
   if (u.isEnabled("miny_compression")) {
    var da = Date.now(), ea = i.encode(ca.q);
    if (ea.length < ca.q.length) {
     ca.q = ea;
     ca.miny_encode_ms = Date.now() - da;
    }
   }
   ba.send(j.encode(ca));
  },
  setHooks: function() {
   k.onAfterUnload(u._unload);
  },
  onUnload: function(w) {
   k.onAfterUnload(w);
  }
 };
 e.exports = u;
}, null);

__d("FBJSON", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 e.exports = {
  parse: JSON.parse,
  stringify: JSON.stringify
 };
}, null);

__d("EventEmitterWithValidation", [ "EventEmitter" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 for (var h in g) if (g.hasOwnProperty(h)) j[h] = g[h];
 var i = g === null ? null : g.prototype;
 j.prototype = Object.create(i);
 j.prototype.constructor = j;
 j.__superConstructor__ = g;
 function j(m) {
  g.call(this);
  this.$EventEmitterWithValidation0 = Object.keys(m);
 }
 j.prototype.emit = function(m) {
  k(m, this.$EventEmitterWithValidation0);
  return i.emit.apply(this, arguments);
 };
 function k(m, n) {
  if (n.indexOf(m) === -1) throw new TypeError(l(m, n));
 }
 function l(m, n) {
  var o = 'Unknown event type "' + m + '". ';
  o += "Known event types: " + n.join(", ") + ".";
  return o;
 }
 e.exports = j;
}, null);

__d("mixInEventEmitter", [ "EventEmitterWithHolding", "EventEmitterWithValidation", "EventHolder", "invariant" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 function k(m, n) {
  j(n);
  var o = m.prototype || m;
  j(!o.__eventEmitter);
  var p = m.constructor;
  if (p) j(p === Object || p === Function);
  o.__types = Object.assign({}, o.__types, n);
  Object.assign(o, l);
 }
 var l = {
  emit: function(m, n, o, p, q, r, s) {
   return this.__getEventEmitter().emit(m, n, o, p, q, r, s);
  },
  emitAndHold: function(m, n, o, p, q, r, s) {
   return this.__getEventEmitter().emitAndHold(m, n, o, p, q, r, s);
  },
  addListener: function(m, n, o) {
   return this.__getEventEmitter().addListener(m, n, o);
  },
  once: function(m, n, o) {
   return this.__getEventEmitter().once(m, n, o);
  },
  addRetroactiveListener: function(m, n, o) {
   return this.__getEventEmitter().addRetroactiveListener(m, n, o);
  },
  addListenerMap: function(m, n) {
   return this.__getEventEmitter().addListenerMap(m, n);
  },
  addRetroactiveListenerMap: function(m, n) {
   return this.__getEventEmitter().addListenerMap(m, n);
  },
  listeners: function(m) {
   return this.__getEventEmitter().listeners(m);
  },
  removeAllListeners: function() {
   this.__getEventEmitter().removeAllListeners();
  },
  removeCurrentListener: function() {
   this.__getEventEmitter().removeCurrentListener();
  },
  releaseHeldEventType: function(m) {
   this.__getEventEmitter().releaseHeldEventType(m);
  },
  __getEventEmitter: function() {
   if (!this.__eventEmitter) {
    var m = new h(this.__types), n = new i();
    this.__eventEmitter = new g(m, n);
   }
   return this.__eventEmitter;
  }
 };
 e.exports = k;
}, null);

__d("pageID", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 e.exports = Math.floor(2147483648 * Math.random()).toString(36);
}, null);

__d("NavigationMetrics-upstream", [ "mixInEventEmitter", "pageID", "performance" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 var j = false, k = 0, l, m = {
  NAVIGATION_DONE: "NAVIGATION_DONE"
 }, n = i.timing && i.timing.navigationStart || 0, o = 0, p = 0, q, r, s;
 function t() {
  l = h + ":" + k;
 }
 var u = {
  setTTI: function(w) {
   o = w;
   return this;
  },
  setE2E: function(w) {
   p = w;
   return this;
  },
  doneNavigation: function() {
   k++;
   t();
   v.emitAndHold(m.NAVIGATION_DONE, l, {
    page: q,
    pageType: r,
    pageURI: s,
    start: n,
    tti: o,
    e2e: p
   });
   n = 0;
   o = 0;
   p = 0;
  },
  setStart: function(w) {
   n = w;
   return this;
  }
 }, v = {
  Events: m,
  init: function(w) {
   throw new Error("NavigationMetrics.init should be overridden by shim");
  },
  setPage: function(w) {
   if (!j) {
    j = true;
    v.init(u);
   }
   q = w.page;
   r = w.page_type;
   s = w.page_uri;
  }
 };
 g(v, m);
 e.exports = v;
}, null);

__d("NavigationMetrics", [ "Arbiter", "BigPipe", "NavigationMetrics-upstream", "PageEvents" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 var k = {};
 i.init = function(l) {
  g.subscribe(h.Events.init, function(m, n) {
   var o = n.arbiter;
   o.subscribe(h.Events.tti, function(p, q) {
    if (q.ajax) {
     var r = k[q.rid];
     if (r) r.tti = q.ts;
    } else l.setTTI(q.ts);
   });
   o.subscribe(j.AJAXPIPE_SEND, function(p, q) {
    if (q.quickling) k[q.rid] = {
     start: q.ts
    };
   });
   o.subscribe(j.AJAXPIPE_ONLOAD, function(p, q) {
    var r = k[q.rid];
    if (r) {
     l.setStart(r.start);
     l.setTTI(r.tti);
     l.setE2E(q.ts);
     l.doneNavigation();
    }
   });
  });
  g.subscribe(j.BIGPIPE_ONLOAD, function(m, n) {
   l.setE2E(n.ts);
   l.doneNavigation();
  });
 };
 e.exports = i;
}, null);

__d("WebStorage", [ "ErrorUtils", "ex" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 var i = {};
 function j(q) {
  if (!i.hasOwnProperty(q)) i[q] = k(q);
  return i[q];
 }
 function k(q) {
  try {
   var s = window[q];
   if (s) {
    var t = "__test__" + Date.now();
    s.setItem(t, "");
    s.removeItem(t);
   }
   return s;
  } catch (r) {}
 }
 function l() {
  return j("localStorage");
 }
 function m() {
  return j("sessionStorage");
 }
 function n(q) {
  var r = [];
  for (var s = 0; s < q.length; s++) r.push(q.key(s));
  return r;
 }
 function o(q, r, s) {
  var t = null;
  try {
   q.setItem(r, s);
  } catch (u) {
   var v = n(q).map(function(w) {
    var x = q.getItem(w).length;
    return w + "(" + x + ")";
   });
   t = new Error(h("Storage quota exceeded while setting %s(%s). Items(length) follows: %s", r, s.length, v.join()));
   g.reportError(t);
  }
  return t;
 }
 var p = {
  getLocalStorage: l,
  getSessionStorage: m,
  setItemGuarded: o
 };
 e.exports = p;
}, null);

__d("isInIframe", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 var g = window != window.top;
 function h() {
  return g;
 }
 e.exports = h;
}, null);

__d("WebStorageMutex", [ "WebStorage", "setTimeoutAcrossTransitions", "pageID" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 var j = g.getLocalStorage(), k = i;
 function l(m) {
  "use strict";
  this.name = m;
 }
 l.testSetPageID = function(m) {
  "use strict";
  k = m;
 };
 l.prototype.$WebStorageMutex0 = function() {
  "use strict";
  if (!j) return k;
  var m = j.getItem("mutex_" + this.name);
  m = m ? m.split(":") : null;
  return m && m[1] >= Date.now() ? m[0] : null;
 };
 l.prototype.$WebStorageMutex1 = function(m) {
  "use strict";
  if (!j) return;
  var n = Date.now() + (m || 1e4);
  g.setItemGuarded(j, "mutex_" + this.name, k + ":" + n);
 };
 l.prototype.hasLock = function() {
  "use strict";
  return this.$WebStorageMutex0() == k;
 };
 l.prototype.lock = function(m, n, o) {
  "use strict";
  if (this.$WebStorageMutex2) clearTimeout(this.$WebStorageMutex2);
  if (k == (this.$WebStorageMutex0() || k)) this.$WebStorageMutex1(o);
  this.$WebStorageMutex2 = h(function() {
   this.$WebStorageMutex2 = null;
   var p = this.hasLock() ? m : n;
   if (p) p(this);
  }.bind(this), 0);
 };
 l.prototype.unlock = function() {
  "use strict";
  if (this.$WebStorageMutex2) clearTimeout(this.$WebStorageMutex2);
  if (j && this.hasLock()) j.removeItem("mutex_" + this.name);
 };
 e.exports = l;
}, null);

__d("Banzai", [ "BanzaiAdapter", "CurrentUser", "ErrorUtils", "ExecutionEnvironment", "FBJSON", "ModulePerformanceGating", "NavigationMetrics", "WebStorage", "emptyFunction", "isInIframe", "pageID", "setTimeoutAcrossTransitions", "WebStorageMutex" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
 b.__markCompiled && b.__markCompiled();
 var s = g.adapter, t = p(), u = "bz:", v = 0, w = 1, x = 2, y, z, aa = [], ba = null;
 function ca(ja) {
  return ja[2] >= Date.now() - (s.config.EXPIRY || g.EXPIRY);
 }
 function da(ja, ka) {
  ja.__meta.status = v;
  ja[3] = (ja[3] || 0) + 1;
  if (!ja.__meta.retry && ka >= 400 && ka < 600) aa.push(ja);
 }
 function ea(ja) {
  var ka = Date.now() + ja;
  if (!z || ka < z) {
   z = ka;
   clearTimeout(y);
   y = r(fa, ja);
   return true;
  }
 }
 function fa() {
  ga(null, null);
 }
 function ga(ja, ka) {
  z = null;
  ea(g.BASIC.delay);
  if (!s.readyToSend()) {
   if (ka) ka();
   return;
  }
  s.inform(g.SEND);
  var la = [], ma = [], na = {};
  aa = aa.filter(function(oa) {
   var pa = oa.__meta;
   if (pa.status >= x || !ca(oa)) return false;
   if (pa.status >= w) return true;
   var qa = pa.pageID + pa.userID, ra = na[qa];
   if (!ra) {
    ra = {
     user: pa.userID,
     page_id: pa.pageID,
     posts: []
    };
    na[qa] = ra;
    la.push(ra);
   }
   pa.status = w;
   ra.posts.push(oa);
   ma.push(oa);
   return pa.retry;
  });
  if (la.length <= 0) {
   s.inform(g.OK);
   if (ja) ja();
   return;
  }
  la[0].trigger = ba;
  ba = null;
  s.send(la, function() {
   ma.forEach(function(oa) {
    oa.__meta.status = x;
   });
   if (ja) ja();
  }, function(oa) {
   ma.forEach(function(pa) {
    da(pa, oa);
   });
   if (ka) ka();
  });
 }
 var ha;
 function ia() {
  if (!ha) {
   var ja = n.getLocalStorage();
   if (ja && !t) {
    ha = {
     store: function ka() {
      if (aa.length <= 0) return;
      var la = aa.map(function(ma) {
       return [ ma[0], ma[1], ma[2], ma[3] || 0, ma.__meta ];
      });
      aa = [];
      ja.setItem(u + q + "." + Date.now(), k.stringify(la));
     },
     restore: function ka() {
      var la = b("WebStorageMutex");
      new la("banzai").lock(function(ma) {
       var na = [];
       for (var oa = 0; oa < ja.length; oa++) {
        var pa = ja.key(oa);
        if (pa.indexOf(u) === 0 && pa.indexOf("bz:__") !== 0) na.push(pa);
       }
       na.forEach(function(qa) {
        var ra = ja.getItem(qa);
        ja.removeItem(qa);
        if (!ra) return;
        var sa = k.parse(ra, e.id);
        sa.forEach(function(ta) {
         if (!ta) return;
         var ua = ta.__meta = ta.pop(), va = ca(ta);
         if (!va) return;
         var wa = h.getID(), xa = ua.userID === wa, ya = g.isEnabled("allow_userid_mismatch") && wa === "0";
         if (xa || ya) {
          ua.status = v;
          aa.push(ta);
         }
        });
       });
       ma.unlock();
      });
     }
    };
   } else ha = {
    store: o,
    restore: o
   };
  }
 }
 g.SEND = "Banzai:SEND";
 g.OK = "Banzai:OK";
 g.ERROR = "Banzai:ERROR";
 g.SHUTDOWN = "Banzai:SHUTDOWN";
 g.SEND_TIMEOUT = 15e3;
 g.VITAL_WAIT = 1e3;
 g.BASIC_WAIT = 6e4;
 g.EXPIRY = 30 * 6e4;
 g.VITAL = {
  delay: s.config.MIN_WAIT || g.VITAL_WAIT
 };
 g.BASIC = {
  delay: s.config.MAX_WAIT || g.BASIC_WAIT
 };
 g.FBTRACE = s.config.fbtrace, g.isEnabled = function(ja) {
  return s.config.gks && s.config.gks[ja];
 };
 g.post = function(ja, ka, la) {
  if (!ja) i.reportError(new Error("Banzai.post called without specifying a route"));
  la = la || {};
  var ma = la.retry;
  if (s.config.disabled) return;
  if (!j.canUseDOM) return;
  var na = s.config.blacklist;
  if (na) if (na.indexOf) if (typeof na.indexOf == "function") if (na.indexOf(ja) != -1) return;
  if (t && document.domain == "facebook.com") {
   var oa;
   try {
    oa = a.top.require("Banzai");
   } catch (pa) {
    oa = null;
   }
   if (oa) {
    oa.post.apply(oa, arguments);
    return;
   }
  }
  var qa = [ ja, ka, Date.now(), 0 ];
  qa.__meta = {
   retry: ma === true,
   pageID: q,
   userID: h.getID(),
   status: v
  };
  if (la.signal) {
   qa.__meta.status = w;
   var ra = [ {
    user: h.getID(),
    page_id: q,
    posts: [ qa ],
    trigger: ja
   } ];
   s.send(ra, function() {
    qa.__meta.status = x;
   }, function(ta) {
    da(qa, ta);
   }, true);
   if (!ma) return;
  }
  aa.push(qa);
  var sa = la.delay;
  if (sa == null) sa = g.BASIC_WAIT;
  if (ea(sa) || !ba) ba = ja;
 };
 g.flush = function(ja, ka) {
  clearTimeout(y);
  y = 0;
  ga(ja, ka);
 };
 g.subscribe = s.subscribe;
 g._schedule = ea;
 g._store = function(ja) {
  ia();
  i.applyWithGuard(ha.store, ha);
 };
 g._restore = function(ja) {
  ia();
  i.applyWithGuard(ha.restore, ha);
  ea(s.config.RESTORE_WAIT || g.VITAL_WAIT);
 };
 g._unload = function() {
  s.cleanup();
  s.inform(g.SHUTDOWN);
  ia();
  i.applyWithGuard(ha.store, ha);
 };
 g._testState = function() {
  return {
   postBuffer: aa,
   triggerRoute: ba
  };
 };
 if (j.canUseDOM) {
  s.setHooks();
  if (l.js_module_defer_banzai_restoration) {
   m.addListener(m.Events.NAVIGATION_DONE, function() {
    g._restore();
    m.removeCurrentListener();
   });
  } else g._restore();
 }
 e.exports = g;
}, null);

__d("BanzaiScuba", [ "Banzai", "copyProperties" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 var i = "scuba_sample";
 function j(m, n, o) {
  this.fields = {};
  this.post = function(p) {
   if (!m) return;
   var q = {};
   h(q, this.fields);
   q._ds = m;
   if (n) q._lid = n;
   q._options = o;
   g.post(i, q, p);
   this.post = function() {};
   this.posted = true;
  };
  this.lid = n;
  return this;
 }
 function k(m, n, o) {
  if (!this.fields[m]) this.fields[m] = {};
  this.fields[m][n] = o;
  return this;
 }
 function l(m) {
  return function(n, o) {
   if (this.posted) return this;
   return k.call(this, m, n, o);
  };
 }
 h(j.prototype, {
  post: function() {},
  addNormal: l("normal"),
  addInteger: l("int"),
  addDenorm: l("denorm"),
  addTagset: l("tags"),
  addNormVector: l("normvector")
 });
 e.exports = j;
}, null);

__d("ModuleErrorLogger", [ "Bootloader", "ErrorUtils", "ModuleDependencies", "BanzaiScuba" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 function k(n) {
  if (!n || !n.length) return 0;
  return n.reduce(function(o, p) {
   return o + p;
  }) / n.length;
 }
 function l(n) {
  if (!n) return [];
  var o = [];
  for (var p in n) o.push(n[p]);
  return o;
 }
 var m = {
  init: function() {
   h.addListener(function(n) {
    if (n.name !== "ModuleError") return;
    var o = i.getNotLoadedModules(), p = Object.keys(o.loading), q = l(g.getLoadingUrls()), r = l(g.getLoadedUrlTimes()), s = {};
    o.missing.forEach(function(v) {
     s[v] = 1;
    });
    var t = {};
    p.forEach(function(v) {
     t[v] = 1;
    });
    var u = new j("module_errors", null, {
     addAsnFields: true,
     addPredictedGeographyFields: true,
     addBrowserFields: true,
     addMobileDeviceFields: true,
     addPageFields: true,
     addUserFields: true
    });
    u.addInteger("missing_count", o.missing.length).addInteger("loading_count", p.length).addInteger("error_url_count", g.getErrorUrls().length).addTagset("missing_modules", s).addTagset("loading_modules", t).addInteger("mean_url_loading_time", Math.floor(k(q))).addInteger("mean_url_loaded_time", Math.floor(k(r))).post();
   }, true);
  }
 };
 e.exports = m;
}, null);

__d("keyOf", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 var g = function(h) {
  var i;
  for (i in h) {
   if (!h.hasOwnProperty(i)) continue;
   return i;
  }
  return null;
 };
 e.exports = g;
}, null);

__d("ImmutableValue", [ "invariant", "isNode", "keyOf" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var j = i({
  _DONT_EVER_TYPE_THIS_SECRET_KEY: null
 });
 function k(l) {
  g(l === k[j]);
 }
 k.mergeAllPropertiesInto = function(l, m) {
  var n = m.length;
  for (var o = 0; o < n; o++) Object.assign(l, m[o]);
 };
 k.deepFreezeRootNode = function(l) {
  if (h(l)) return;
  Object.freeze(l);
  for (var m in l) if (l.hasOwnProperty(m)) k.recurseDeepFreeze(l[m]);
  Object.seal(l);
 };
 k.recurseDeepFreeze = function(l) {
  if (h(l) || !k.shouldRecurseFreeze(l)) return;
  Object.freeze(l);
  for (var m in l) if (l.hasOwnProperty(m)) k.recurseDeepFreeze(l[m]);
  Object.seal(l);
 };
 k.shouldRecurseFreeze = function(l) {
  return typeof l === "object" && !(l instanceof k) && l !== null;
 };
 k._DONT_EVER_TYPE_THIS_SECRET_KEY = Math.random();
 e.exports = k;
}, null);

__d("keyMirror", [ "invariant" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var h = function(i) {
  var j = {}, k;
  g(i instanceof Object && !Array.isArray(i));
  for (k in i) {
   if (!i.hasOwnProperty(k)) continue;
   j[k] = k;
  }
  return j;
 };
 e.exports = h;
}, null);

__d("mergeHelpers", [ "invariant", "keyMirror" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var i = 36, j = function(l) {
  return typeof l !== "object" || l instanceof Date || l === null;
 }, k = {
  MAX_MERGE_DEPTH: i,
  isTerminal: j,
  normalizeMergeArg: function(l) {
   return l === void 0 || l === null ? {} : l;
  },
  checkMergeArrayArgs: function(l, m) {
   g(Array.isArray(l) && Array.isArray(m));
  },
  checkMergeObjectArgs: function(l, m) {
   k.checkMergeObjectArg(l);
   k.checkMergeObjectArg(m);
  },
  checkMergeObjectArg: function(l) {
   g(!j(l) && !Array.isArray(l));
  },
  checkMergeIntoObjectArg: function(l) {
   g((!j(l) || typeof l === "function") && !Array.isArray(l));
  },
  checkMergeLevel: function(l) {
   g(l < i);
  },
  checkArrayStrategy: function(l) {
   g(l === void 0 || l in k.ArrayStrategies);
  },
  ArrayStrategies: h({
   Clobber: true,
   IndexByIndex: true
  })
 };
 e.exports = k;
}, null);

__d("ImmutableObject", [ "ImmutableValue", "invariant", "keyOf", "mergeHelpers" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var k = j.checkMergeObjectArgs, l = j.isTerminal, m = i({
  _DONT_EVER_TYPE_THIS_SECRET_KEY: null
 });
 function n(s) {
  h(s instanceof g);
 }
 for (var o in g) if (g.hasOwnProperty(o)) q[o] = g[o];
 var p = g === null ? null : g.prototype;
 q.prototype = Object.create(p);
 q.prototype.constructor = q;
 q.__superConstructor__ = g;
 function q() {
  g.call(this, g[m]);
  g.mergeAllPropertiesInto(this, arguments);
 }
 q.create = function() {
  var s = Object.create(q.prototype);
  q.apply(s, arguments);
  return s;
 };
 q.set = function(s, t) {
  n(s);
  h(typeof t === "object" && t !== void 0 && !Array.isArray(t));
  return new q(s, t);
 };
 q.setProperty = function(s, t, u) {
  var v = {};
  v[t] = u;
  return q.set(s, v);
 };
 q.deleteProperty = function(s, t) {
  var u = {};
  for (var v in s) if (v !== t && s.hasOwnProperty(v)) u[v] = s[v];
  return new q(u);
 };
 q.setDeep = function(s, t) {
  n(s);
  return r(s, t);
 };
 q.values = function(s) {
  return Object.keys(s).map(function(t) {
   return s[t];
  });
 };
 function r(s, t) {
  k(s, t);
  var u = {}, v = Object.keys(s);
  for (var w = 0; w < v.length; w++) {
   var x = v[w];
   if (!t.hasOwnProperty(x)) {
    u[x] = s[x];
   } else if (l(s[x]) || l(t[x])) {
    u[x] = t[x];
   } else u[x] = r(s[x], t[x]);
  }
  var y = Object.keys(t);
  for (w = 0; w < y.length; w++) {
   var z = y[w];
   if (s.hasOwnProperty(z)) continue;
   u[z] = t[z];
  }
  return s instanceof g ? new q(u) : t instanceof g ? new q(u) : u;
 }
 e.exports = q;
}, null);

__d("ArtillerySegment", [ "ImmutableObject", "invariant", "performanceAbsoluteNow" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 var j = 0;
 function k(l) {
  "use strict";
  h(l);
  h("category" in l && "description" in l);
  this.$ArtillerySegment0 = false;
  this.$ArtillerySegment1 = Object.assign({}, l, {
   id: (j++).toString(36)
  });
  this.$ArtillerySegment2 = [];
 }
 k.prototype.getID = function() {
  "use strict";
  return this.$ArtillerySegment1.id;
 };
 k.prototype.begin = function() {
  "use strict";
  this.$ArtillerySegment1.begin = i();
  return this;
 };
 k.prototype.end = function() {
  "use strict";
  this.$ArtillerySegment1.end = i();
  return this;
 };
 k.prototype.appendChild = function() {
  "use strict";
  for (var l = [], m = 0, n = arguments.length; m < n; m++) l.push(arguments[m]);
  h(!this.$ArtillerySegment0);
  l.forEach(function(o) {
   this.$ArtillerySegment2.push(o.getID());
  }.bind(this));
  return this;
 };
 k.prototype.setPosted = function() {
  "use strict";
  this.$ArtillerySegment0 = true;
  return this;
 };
 k.prototype.getPostData = function() {
  "use strict";
  return new g(this.$ArtillerySegment1, {
   children: this.$ArtillerySegment2.slice()
  });
 };
 e.exports = k;
}, null);

__d("ArtillerySequence", [ "ImmutableObject", "invariant" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 var i = 0;
 function j(k) {
  "use strict";
  h(k);
  h("description" in k);
  this.$ArtillerySequence0 = false;
  this.$ArtillerySequence1 = Object.assign({}, k, {
   id: (i++).toString(36)
  });
  this.$ArtillerySequence2 = [];
 }
 j.prototype.getID = function() {
  "use strict";
  return this.$ArtillerySequence1.id;
 };
 j.prototype.addSegment = function() {
  "use strict";
  for (var k = [], l = 0, m = arguments.length; l < m; l++) k.push(arguments[l]);
  h(!this.$ArtillerySequence0);
  k.forEach(function(n) {
   this.$ArtillerySequence2.push(n.getID());
  }.bind(this));
  return this;
 };
 j.prototype.setPosted = function() {
  "use strict";
  this.$ArtillerySequence0 = true;
  return this;
 };
 j.prototype.getPostData = function() {
  "use strict";
  return new g(this.$ArtillerySequence1, {
   segments: this.$ArtillerySequence2.slice()
  });
 };
 e.exports = j;
}, null);

__d("ArtilleryTrace", [ "ArtillerySegment", "ArtillerySequence", "ImmutableObject", "invariant", "mixInEventEmitter" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 function l() {
  "use strict";
  this.$ArtilleryTrace0 = false;
  this.$ArtilleryTrace1 = void 0;
  this.$ArtilleryTrace2 = {};
  this.$ArtilleryTrace3 = [];
  this.$ArtilleryTrace4 = [];
  this.$ArtilleryTrace5 = {};
  this.$ArtilleryTrace6 = [];
 }
 l.prototype.createSequence = function(m) {
  "use strict";
  j(!this.$ArtilleryTrace0);
  var n = new h(m);
  this.$ArtilleryTrace3.push(n);
  return n;
 };
 l.prototype.createSegment = function(m) {
  "use strict";
  j(!this.$ArtilleryTrace0);
  var n = new g(m);
  this.$ArtilleryTrace4.push(n);
  return n;
 };
 l.prototype.markSegment = function(m, n) {
  "use strict";
  j(!this.$ArtilleryTrace0);
  this.$ArtilleryTrace5[n] = m.getID();
  return this;
 };
 l.prototype.connectTrace = function(m, n) {
  "use strict";
  j(!this.$ArtilleryTrace0);
  n = n || this.$ArtilleryTrace1;
  j(n);
  this.$ArtilleryTrace6.push({
   segment: m.getID(),
   trace: n
  });
  return this;
 };
 l.prototype.setID = function(m) {
  "use strict";
  j(!this.$ArtilleryTrace1);
  this.$ArtilleryTrace1 = m;
  return this;
 };
 l.prototype.getID = function() {
  "use strict";
  return this.$ArtilleryTrace1;
 };
 l.prototype.addProperty = function(m, n) {
  "use strict";
  this.$ArtilleryTrace2[m] = n;
 };
 l.prototype.post = function() {
  "use strict";
  j(!this.$ArtilleryTrace0);
  this.$ArtilleryTrace0 = true;
  var m = new i({
   id: this.$ArtilleryTrace1,
   properties: this.$ArtilleryTrace2,
   sequences: this.$ArtilleryTrace3.map(function(n) {
    return n.setPosted().getPostData();
   }),
   segments: this.$ArtilleryTrace4.map(function(n) {
    return n.setPosted().getPostData();
   }),
   marks: Object.assign({}, this.$ArtilleryTrace5),
   connections: this.$ArtilleryTrace6.slice()
  });
  this.emitAndHold("post", m);
 };
 l.prototype.isPosted = function() {
  "use strict";
  return this.$ArtilleryTrace0;
 };
 k(l, {
  post: true
 });
 e.exports = l;
}, null);

__d("forEachObject", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var g = Object.prototype.hasOwnProperty;
 function h(i, j, k) {
  for (var l in i) if (g.call(i, l)) j.call(k, i[l], l, i);
 }
 e.exports = h;
}, null);

__d("Artillery", [ "ArtilleryTrace", "Banzai", "forEachObject", "invariant", "mixInEventEmitter" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 var l = false, m = false, n = [], o, p, q;
 function r() {
  if (l) return;
  l = true;
  h.subscribe(h.SHUTDOWN, function() {
   s.postAll();
  });
 }
 var s = {
  isEnabled: function() {
   return m;
  },
  createTrace: function() {
   r();
   var t = new g();
   n.push(t);
   t.addListener("post", s.emitAndHold.bind(s, "posttrace"));
   return t;
  },
  getPageTrace: function() {
   j(o);
   if (p) return p;
   p = s.createTrace().setID(o);
   i(q, function(t, u, v) {
    p.addProperty(u, t);
   });
   return p;
  },
  postAll: function() {
   n.forEach(function(t) {
    return !t.isPosted() && t.post();
   });
  },
  enable: function() {
   m = true;
  },
  setPageTraceID: function(t) {
   j(!o);
   o = t;
  },
  setPageProperties: function(t) {
   q = t;
  },
  getPageProperty: function(t) {
   return q[t];
  }
 };
 k(s, {
  posttrace: true
 });
 e.exports = s;
}, null);

__d("BanzaiLogger", [ "Banzai" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 var h = "logger";
 function i(k) {
  return {
   log: function(l, m) {
    g.post(h + ":" + l, m, k);
   }
  };
 }
 var j = i();
 j.create = i;
 e.exports = j;
}, null);

__d("BanzaiODS", [ "Banzai", "invariant" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 function i() {
  var k = {}, l = {};
  function m(n, o, p, q) {
   if (p === void 0) p = 1;
   if (q === void 0) q = 1;
   if (n in l) if (l[n] <= 0) {
    return;
   } else p /= l[n];
   var r = k[n] || (k[n] = {}), s = r[o] || (r[o] = [ 0 ]);
   p = Number(p);
   q = Number(q);
   if (!isFinite(p) || !isFinite(q)) return;
   s[0] += p;
   if (arguments.length >= 4) {
    if (!s[1]) s[1] = 0;
    s[1] += q;
   }
  }
  return {
   setEntitySample: function(n, o) {
    l[n] = Math.random() < o ? o : 0;
   },
   bumpEntityKey: function(n, o, p) {
    m(n, o, p);
   },
   bumpFraction: function(n, o, p, q) {
    m(n, o, p, q);
   },
   flush: function(n) {
    for (var o in k) g.post("ods:" + o, k[o], n);
    k = {};
   }
  };
 }
 var j = i();
 j.create = i;
 g.subscribe(g.SEND, j.flush.bind(j, null));
 e.exports = j;
}, null);

__d("BasicVector", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 function g(h, i) {
  "use strict";
  this.x = h;
  this.y = i;
 }
 g.prototype.derive = function(h, i) {
  "use strict";
  return new g(h, i);
 };
 g.prototype.toString = function() {
  "use strict";
  return "(" + this.x + ", " + this.y + ")";
 };
 g.prototype.add = function(h, i) {
  "use strict";
  if (h instanceof g) {
   i = h.y;
   h = h.x;
  }
  var j = parseFloat(h), k = parseFloat(i);
  return this.derive(this.x + j, this.y + k);
 };
 g.prototype.mul = function(h, i) {
  "use strict";
  if (i === void 0) i = h;
  return this.derive(this.x * h, this.y * i);
 };
 g.prototype.div = function(h, i) {
  "use strict";
  if (i === void 0) i = h;
  return this.derive(this.x * 1 / h, this.y * 1 / i);
 };
 g.prototype.sub = function(h, i) {
  "use strict";
  if (arguments.length === 1) {
   return this.add(h.mul(-1));
  } else return this.add(-h, -i);
 };
 g.prototype.distanceTo = function(h) {
  "use strict";
  return this.sub(h).magnitude();
 };
 g.prototype.magnitude = function() {
  "use strict";
  return Math.sqrt(this.x * this.x + this.y * this.y);
 };
 g.prototype.rotate = function(h) {
  "use strict";
  return this.derive(this.x * Math.cos(h) - this.y * Math.sin(h), this.x * Math.sin(h) + this.y * Math.cos(h));
 };
 e.exports = g;
}, null);

__d("camelize", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 var g = /-(.)/g;
 function h(i) {
  return i.replace(g, function(j, k) {
   return k.toUpperCase();
  });
 }
 e.exports = h;
}, null);

__d("getOpacityStyleName", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 var g = false, h = null;
 function i() {
  if (!g) {
   if ("opacity" in document.body.style) {
    h = "opacity";
   } else {
    var j = document.createElement("div");
    j.style.filter = "alpha(opacity=100)";
    if (j.style.filter) h = "filter";
    j = null;
   }
   g = true;
  }
  return h;
 }
 e.exports = i;
}, null);

__d("hyphenate", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 var g = /([A-Z])/g;
 function h(i) {
  return i.replace(g, "-$1").toLowerCase();
 }
 e.exports = h;
}, null);

__d("getStyleProperty", [ "camelize", "hyphenate" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 function i(k) {
  return k == null ? k : String(k);
 }
 function j(k, l) {
  var m;
  if (window.getComputedStyle) {
   m = window.getComputedStyle(k, null);
   if (m) return i(m.getPropertyValue(h(l)));
  }
  if (document.defaultView && document.defaultView.getComputedStyle) {
   m = document.defaultView.getComputedStyle(k, null);
   if (m) return i(m.getPropertyValue(h(l)));
   if (l === "display") return "none";
  }
  if (k.currentStyle) {
   if (l === "float") return i(k.currentStyle.cssFloat || k.currentStyle.styleFloat);
   return i(k.currentStyle[g(l)]);
  }
  return i(k.style && k.style[g(l)]);
 }
 e.exports = j;
}, null);

__d("Style-upstream", [ "camelize", "containsNode", "ex", "getOpacityStyleName", "getStyleProperty", "hyphenate", "invariant" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
 b.__markCompiled && b.__markCompiled();
 function n(u, v) {
  var w = t.get(u, v);
  return w === "auto" || w === "scroll";
 }
 var o = new RegExp("\\s*" + "([^\\s:]+)" + "\\s*:\\s*" + "([^;('\"]*(?:(?:\\([^)]*\\)|\"[^\"]*\"|'[^']*')[^;(?:'\"]*)*)" + "(?:;|$)", "g");
 function p(u) {
  var v = {};
  u.replace(o, function(w, x, y) {
   v[x] = y;
  });
  return v;
 }
 function q(u) {
  var v = "";
  for (var w in u) if (u[w]) v += w + ":" + u[w] + ";";
  return v;
 }
 function r(u) {
  return u !== "" ? "alpha(opacity=" + u * 100 + ")" : "";
 }
 function s(u, v, w) {
  switch (l(v)) {
  case "font-weight":
  case "line-height":
  case "opacity":
  case "z-index":
   break;

  case "width":
  case "height":
   var x = parseInt(w, 10) < 0;
   m(!x);

  default:
   m(isNaN(w) || !w || w === "0");
   break;
  }
 }
 var t = {
  set: function(u, v, w) {
   s("Style.set", v, w);
   var x = u.style;
   switch (v) {
   case "opacity":
    if (j() === "filter") {
     x.filter = r(w);
    } else x.opacity = w;
    break;

   case "float":
    x.cssFloat = x.styleFloat = w || "";
    break;

   default:
    try {
     x[g(v)] = w;
    } catch (y) {
     throw new Error(i('Style.set: "%s" argument is invalid: %s', v, w));
    }
   }
  },
  apply: function(u, v) {
   var w;
   for (w in v) s("Style.apply", w, v[w]);
   if ("opacity" in v && j() === "filter") {
    v.filter = r(v.opacity);
    delete v.opacity;
   }
   var x = p(u.style.cssText);
   for (w in v) {
    var y = v[w];
    delete v[w];
    var z = l(w);
    for (var aa in x) if (aa === z || aa.indexOf(z + "-") === 0) delete x[aa];
    v[z] = y;
   }
   Object.assign(x, v);
   u.style.cssText = q(x);
  },
  get: k,
  getFloat: function(u, v) {
   return parseFloat(t.get(u, v), 10);
  },
  getOpacity: function(u) {
   if (j() === "filter") {
    var v = t.get(u, "filter");
    if (v) {
     var w = /(\d+(?:\.\d+)?)/.exec(v);
     if (w) return parseFloat(w.pop()) / 100;
    }
   }
   return t.getFloat(u, "opacity") || 1;
  },
  isFixed: function(u) {
   while (h(document.body, u)) {
    if (t.get(u, "position") === "fixed") return true;
    u = u.parentNode;
   }
   return false;
  },
  getScrollParent: function(u) {
   if (!u) return null;
   while (u && u !== document.body) {
    if (n(u, "overflow") || n(u, "overflowY") || n(u, "overflowX")) return u;
    u = u.parentNode;
   }
   return window;
  }
 };
 e.exports = t;
}, null);

__d("merge", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var g = function(h, i) {
  return Object.assign({}, h, i);
 };
 e.exports = g;
}, null);

__d("Style", [ "Style-upstream", "$", "merge" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 var j = i(g, {
  get: function(k, l) {
   typeof k === "string";
   return g.get(h(k), l);
  },
  getFloat: function(k, l) {
   typeof k === "string";
   return g.getFloat(h(k), l);
  }
 });
 e.exports = j;
}, null);

__d("getElementRect", [ "containsNode" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 function h(i) {
  var j = document.documentElement;
  if (!("getBoundingClientRect" in i) || !g(j, i)) return {
   left: 0,
   right: 0,
   top: 0,
   bottom: 0
  };
  var k = i.getBoundingClientRect();
  return {
   left: Math.round(k.left) - j.clientLeft,
   right: Math.round(k.right) - j.clientLeft,
   top: Math.round(k.top) - j.clientTop,
   bottom: Math.round(k.bottom) - j.clientTop
  };
 }
 e.exports = h;
}, null);

__d("getElementPosition", [ "getElementRect" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 function h(i) {
  var j = g(i);
  return {
   x: j.left,
   y: j.top,
   width: j.right - j.left,
   height: j.bottom - j.top
  };
 }
 e.exports = h;
}, null);

__d("getUnboundedScrollPosition", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 function g(h) {
  if (h === window) return {
   x: window.pageXOffset || document.documentElement.scrollLeft,
   y: window.pageYOffset || document.documentElement.scrollTop
  };
  return {
   x: h.scrollLeft,
   y: h.scrollTop
  };
 }
 e.exports = g;
}, null);

__d("getScrollPosition", [ "getDocumentScrollElement", "getUnboundedScrollPosition" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 function i(j) {
  var k = g();
  if (j === window) j = k;
  var l = h(j), m = j === k ? document.documentElement : j, n = j.scrollWidth - m.clientWidth, o = j.scrollHeight - m.clientHeight;
  l.x = Math.max(0, Math.min(l.x, n));
  l.y = Math.max(0, Math.min(l.y, o));
  return l;
 }
 e.exports = i;
}, null);

__d("getViewportDimensions", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 function g() {
  return document.documentElement && document.documentElement.clientWidth || document.body && document.body.clientWidth || 0;
 }
 function h() {
  return document.documentElement && document.documentElement.clientHeight || document.body && document.body.clientHeight || 0;
 }
 function i() {
  return {
   width: window.innerWidth || g(),
   height: window.innerHeight || h()
  };
 }
 i.withoutScrollbars = function() {
  return {
   width: g(),
   height: h()
  };
 };
 e.exports = i;
}, null);

__d("DOMVector", [ "BasicVector", "getDocumentScrollElement", "getElementPosition", "getUnboundedScrollPosition", "getViewportDimensions" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 for (var l in g) if (g.hasOwnProperty(l)) n[l] = g[l];
 var m = g === null ? null : g.prototype;
 n.prototype = Object.create(m);
 n.prototype.constructor = n;
 n.__superConstructor__ = g;
 function n(o, p, q) {
  "use strict";
  g.call(this, o, p);
  this.domain = q || "pure";
 }
 n.prototype.derive = function(o, p, q) {
  "use strict";
  return new n(o, p, q || this.domain);
 };
 n.prototype.add = function(o, p) {
  "use strict";
  if (o instanceof n && o.getDomain() !== "pure") o = o.convertTo(this.domain);
  return m.add.call(this, o, p);
 };
 n.prototype.convertTo = function(o) {
  "use strict";
  if (o != "pure" && o != "viewport" && o != "document") return this.derive(0, 0);
  if (o == this.domain) return this.derive(this.x, this.y, this.domain);
  if (o == "pure") return this.derive(this.x, this.y);
  if (this.domain == "pure") return this.derive(0, 0);
  var p = n.getScrollPosition("document"), q = this.x, r = this.y;
  if (this.domain == "document") {
   q -= p.x;
   r -= p.y;
  } else {
   q += p.x;
   r += p.y;
  }
  return this.derive(q, r, o);
 };
 n.prototype.getDomain = function() {
  "use strict";
  return this.domain;
 };
 n.from = function(o, p, q) {
  "use strict";
  return new n(o, p, q);
 };
 n.getScrollPosition = function(o) {
  "use strict";
  o = o || "document";
  var p = j(window);
  return this.from(p.x, p.y, "document").convertTo(o);
 };
 n.getElementPosition = function(o, p) {
  "use strict";
  p = p || "document";
  var q = i(o);
  return this.from(q.x, q.y, "viewport").convertTo(p);
 };
 n.getElementDimensions = function(o) {
  "use strict";
  return this.from(o.offsetWidth || 0, o.offsetHeight || 0);
 };
 n.getViewportDimensions = function() {
  "use strict";
  var o = k();
  return this.from(o.width, o.height, "viewport");
 };
 n.getViewportWithoutScrollbarDimensions = function() {
  "use strict";
  var o = k.withoutScrollbars();
  return this.from(o.width, o.height, "viewport");
 };
 n.getDocumentDimensions = function(o) {
  "use strict";
  var p = h(o);
  return this.from(p.scrollWidth, p.scrollHeight, "document");
 };
 e.exports = n;
}, null);

__d("IntlCzechSlovakNumberType", [ "IntlVariations" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 var h = {
  getNumberVariationType: function(i) {
   return i === 1 ? g.NUMBER_SINGULAR : i >= 2 && i <= 4 ? g.NUMBER_DUAL : g.NUMBER_PLURAL;
  }
 };
 e.exports = h;
}, null);

__d("IntlEnglishNumberType", [ "IntlVariations" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 var h = {
  getNumberVariationType: function(i) {
   return i === 1 ? g.NUMBER_SINGULAR : g.NUMBER_PLURAL;
  }
 };
 e.exports = h;
}, null);

__d("IntlNoVariationsNumberType", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 var g = {
  getNumberVariationType: function(h) {
   return "*";
  }
 };
 e.exports = g;
}, null);

__d("IntlRomanicNumberType", [ "IntlVariations" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 var h = {
  getNumberVariationType: function(i) {
   if (i === 0 || i === 1) {
    return g.NUMBER_SINGULAR;
   } else return g.NUMBER_PLURAL;
  }
 };
 e.exports = h;
}, null);

__d("IntlSlavicNumberType", [ "IntlVariations" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 var h = {
  getNumberVariationType: function(i) {
   var j = i % 100, k = j % 10;
   return k === 1 && j !== 11 ? g.NUMBER_SINGULAR : k >= 2 && k <= 4 && !(j >= 12 && j <= 14) ? g.NUMBER_DUAL : g.NUMBER_PLURAL;
  }
 };
 e.exports = h;
}, null);

__d("Intl", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 var g;
 function h(j) {
  if (typeof j != "string") return false;
  return j.match(new RegExp(h.punct_char_class + "[" + ')"' + "'" + "»" + "༻" + "༽" + "’" + "”" + "›" + "〉" + "》" + "」" + "』" + "】" + "〕" + "〗" + "〙" + "〛" + "〞" + "〟" + "﴿" + "＇" + "）" + "］" + "\\s" + "]*$"));
 }
 h.punct_char_class = "[" + ".!?" + "。" + "！" + "？" + "।" + "…" + "ຯ" + "᠁" + "ฯ" + "．" + "]";
 function i(j) {
  if (g) {
   var k = [], l = [];
   for (var m in g.patterns) {
    var n = g.patterns[m];
    for (var o in g.meta) {
     var p = new RegExp(o.slice(1, -1), "g"), q = g.meta[o];
     m = m.replace(p, q);
     n = n.replace(p, q);
    }
    k.push(m);
    l.push(n);
   }
   for (var r = 0; r < k.length; r++) {
    var s = new RegExp(k[r].slice(1, -1), "g");
    if (l[r] == "javascript") {
     j.replace(s, function(t) {
      return t.slice(1).toLowerCase();
     });
    } else j = j.replace(s, l[r]);
   }
  }
  return j.replace(/\x01/g, "");
 }
 e.exports = {
  endsInPunct: h,
  applyPhonologicalRules: i,
  setPhonologicalRules: function(j) {
   g = j;
  }
 };
}, null);

__d("substituteTokens", [ "invariant", "Intl" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 function i(k) {
  return k;
 }
 function j(k, l) {
  if (!l) return k;
  g(typeof l === "object");
  var m = "\\{([^}]+)\\}(" + h.endsInPunct.punct_char_class + "*)", n = new RegExp(m, "g"), o = [], p = [], q = k.replace(n, function(t, u, v) {
   var w = l[u];
   if (w && typeof w === "object") {
    o.push(w);
    p.push(u);
    return "" + v;
   } else if (w === null) return "";
   return w + (h.endsInPunct(w) ? "" : v);
  }).split("").map(h.applyPhonologicalRules);
  if (q.length === 1) return q[0];
  var r = [ q[0] ];
  for (var s = 0; s < o.length; s++) r.push(i(o[s]), q[s + 1]);
  return r;
 }
 e.exports = j;
}, null);

__d("fbt", [ "IntlVariations", "IntlViewerContext", "copyProperties", "invariant", "substituteTokens", "FbtNumber", "FbtLogger", "FbtQTOverrides" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 var l = b("FbtNumber").impl, m = b("FbtLogger").logger, n = b("FbtQTOverrides").overrides, o = {
  INDEX: 0,
  SUBSTITUTION: 1
 }, p = {
  NUMBER: 0,
  GENDER: 1
 }, q = function() {};
 q._ = function(r, s) {
  var t = {}, u = r;
  if (r.__vcg) {
   s = s || [];
   s.unshift([ h.GENDER, null ]);
  }
  if (s !== void 0) for (var v = 0; v < s.length; v++) {
   var w = s[v][o.INDEX];
   if (w !== null) {
    j(w in u || "*" in u);
    u = u[w] || u["*"];
   }
   i(t, s[v][o.SUBSTITUTION]);
  }
  if (typeof u === "string") {
   return k(u, t);
  } else if (Array.isArray(u)) {
   var x = u[0], y = u[1];
   x = n["1_" + y] || x;
   q.logImpression(y);
   return k(x, t);
  } else j(false);
 };
 q["enum"] = function(r, s) {
  return [ r, null ];
 };
 q.param = function(r, s, t) {
  var u = null;
  if (t) if (t[0] === p.NUMBER) {
   var v = t.length > 1 ? t[1] : s;
   j(typeof v === "number");
   u = l.getNumberVariationType(v);
  } else if (t[0] === p.GENDER) {
   j(t.length > 1 && t[1] & g.GENDER_BITMASK);
   u = t[1];
  } else j(false);
  var w = {};
  w[r] = s;
  return [ u, w ];
 };
 q.logImpression = function(r) {
  if (m) m.logImpression(r);
  return r;
 };
 e.exports = q;
}, null);

__d("ScriptPathLogger", [ "Banzai", "ScriptPath", "isInIframe" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 var j = "script_path_change", k = {
  scriptPath: null,
  categoryToken: null,
  extraInfoFromServer: {}
 }, l = false;
 function m(s, t, u) {
  if (!l || i()) return;
  var v = g.isEnabled("vital_navigations") ? g.VITAL : g.BASIC, w = {
   source_path: s.scriptPath,
   source_token: s.categoryToken,
   dest_path: t.scriptPath,
   dest_token: t.categoryToken,
   impression_id: t.extraInfoFromServer.imp_id,
   cause: u
  };
  if (s.scriptPath === null) w.referrer = document.referrer;
  var x = h.getClickPointInfo();
  if (x) w.click_point_info = x;
  if (s.extraInfoFromServer.entity_id) w.source_owning_entity_id = s.extraInfoFromServer.entity_id;
  if (t.extraInfoFromServer.entity_id) w.dest_owning_entity_id = t.extraInfoFromServer.entity_id;
  if (s.topViewEndpoint) w.source_endpoint = s.topViewEndpoint;
  if (t.topViewEndpoint) w.dest_endpoint = t.topViewEndpoint;
  if (t.extraInfoFromServer.search_sid) w.dest_search_sid = t.extraInfoFromServer.search_sid;
  if (s.extraInfoFromServer.search_sid) w.source_search_sid = s.extraInfoFromServer.search_sid;
  g.post(j, w, v);
 }
 function n() {
  m(k, h.getPageInfo(), h.CAUSE.PAGE_LOAD);
 }
 function o(s, t) {
  m(s, t, h.CAUSE.TRANSITION);
 }
 function p() {
  m(h.getPageInfo(), k, h.CAUSE.PAGE_UNLOAD);
 }
 var q = h.subscribe(function(s) {
  if (l) {
   var t = s.source, u = s.dest, v = s.cause;
   if (v) {
    m(t || k, u || k, v);
   } else if (t) {
    o(t, u);
   } else n();
  }
 });
 g.subscribe(g.SHUTDOWN, p);
 var r = {
  startLogging: function() {
   l = true;
   if (h.getPageInfo()) n();
  },
  stopLogging: function() {
   l = false;
   h.unsubscribe(q);
  }
 };
 r.BANZAI_LOGGING_ROUTE = j;
 e.exports = r;
}, null);

__d("MarketingLogger", [ "BanzaiLogger", "copyProperties" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 var i, j = [];
 function k(l, m) {
  "use strict";
  i = this;
  this.$MarketingLogger0 = m || {};
  this.$MarketingLogger1 = {};
  this.$MarketingLogger2 = g.create(l);
  this.$MarketingLogger3("page_load");
  this.$MarketingLogger4();
 }
 k.prototype.$MarketingLogger3 = function(l, m) {
  "use strict";
  m = m || {};
  var n = h({
   event: l
  }, m, this.$MarketingLogger0);
  this.$MarketingLogger2.log("MarketingLoggerConfig", n);
 };
 k.prototype.$MarketingLogger5 = function(l, m) {
  "use strict";
  if (this.$MarketingLogger1[l]) return;
  this.$MarketingLogger3(l, m);
  this.$MarketingLogger1[l] = true;
 };
 k.prototype.$MarketingLogger4 = function() {
  "use strict";
  for (var l = 0; l < j.length; l++) j[l]();
  j = [];
 };
 k.log = function(l, m) {
  "use strict";
  if (!i) {
   j.push(function() {
    k.log(l, m);
   });
   return;
  }
  i.$MarketingLogger3(l, m);
 };
 k.logOnce = function(l, m) {
  "use strict";
  if (!i) {
   j.push(function() {
    k.logOnce(l, m);
   });
   return;
  }
  i.$MarketingLogger5(l, m);
 };
 e.exports = k;
}, null);

__d("TimeSpentArray", [ "Banzai", "pageID", "setTimeoutAcrossTransitions" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 var j = 2, k = j * 32, l, m, n, o, p, q, r, s, t, u = {}, v;
 function w() {
  return {
   timeoutDelayMap: u,
   nextDelay: v,
   timeoutInSeconds: n
  };
 }
 function x() {
  if (l) {
   var fa = Date.now();
   if (fa > p) r = Math.min(k, Math.ceil(fa / 1e3 - o));
   var ga = ca();
   if (ga) l(ga, v);
  }
  ba();
 }
 function y() {
  z();
  m = i(x, n * 1e3);
 }
 function z() {
  if (m) {
   clearTimeout(m);
   m = null;
  }
 }
 function aa(fa) {
  o = fa;
  p = o * 1e3;
  q = [ 1 ];
  for (var ga = 1; ga < j; ga++) q.push(0);
  r = 1;
  s += 1;
  t += 1;
  var ha = t.toString() + "_delay";
  v = u[ha];
  if (typeof v == "undefined") v = u.delay;
  var ia = t.toString() + "_timeout", ja = u[ia];
  if (typeof ja == "undefined") ja = u.timeout;
  ja = Math.min(ja, k);
  n = ja || k;
  y();
 }
 function ba() {
  z();
  q = null;
 }
 function ca() {
  if (!q) return null;
  return {
   tos_id: h,
   start_time: o,
   tos_array: q.slice(0),
   tos_len: r,
   tos_seq: t,
   tos_cum: s
  };
 }
 function da(fa) {
  if (fa >= p && fa - p < 1e3) return;
  ea(Math.floor(fa / 1e3));
 }
 function ea(fa) {
  var ga = fa - o;
  if (ga < 0 || ga >= k) x();
  if (!q) {
   aa(fa);
  } else {
   q[ga >> 5] |= 1 << (ga & 31);
   r = ga + 1;
   s += 1;
   p = fa * 1e3;
  }
 }
 e.exports = {
  init: function(fa, ga, ha) {
   s = 0;
   t = -1;
   l = fa;
   if (typeof ga == "object" && ga !== null) {
    u = ga;
   } else u = {};
   if (!ha) ha = Date.now();
   aa(Math.floor(ha / 1e3));
   g.subscribe(g.SHUTDOWN, x);
  },
  update: function(fa) {
   da(fa);
  },
  get: function() {
   return ca();
  },
  ship: function() {
   x();
  },
  reset: function() {
   ba();
  },
  testState: function() {
   return w();
  }
 };
}, null);

__d("TimeSpentImmediateActiveSecondsLogger", [ "Banzai", "ImmediateActiveSecondsConfig", "ScriptPath" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 var j = "immediate_active_seconds", k = {
  signal: true,
  retry: true
 }, l = h.sampling_rate, m = h.ias_bucket, n = 0;
 function o(s) {
  if (l <= 0) return false;
  var t = Math.floor(s / 1e3) % l;
  return t === m;
 }
 function p(s) {
  if (s >= n && s - n < 1e3) return;
  if (o(s)) {
   var t = {
    activity_time_ms: s,
    last_activity_time_ms: n,
    script_path: i.getTopViewEndpoint()
   };
   try {
    g.post(j, t, k);
   } catch (u) {}
  }
  n = Math.floor(s / 1e3) * 1e3;
 }
 function q(event, s, t) {
  if (u < 0 || v < 0 || u > v) return;
  var u = Math.floor(s / 1e3), v = Math.floor(t / 1e3);
  if (!r(u, v)) return;
  var w = {
   event: event,
   start_time_ms: s,
   end_time_ms: t
  };
  g.post(j, w, k);
 }
 function r(s, t) {
  if (l <= 0) return false;
  if (t - s >= l) return true;
  var u = s + (m - s % l + l) % l;
  return u <= t;
 }
 e.exports = {
  maybeReportActiveSecond: p,
  maybeReportActiveInterval: q
 };
}, null);

__d("getContextualParent", [ "ge" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 function h(i, j) {
  var k, l = false;
  do {
   if (i.getAttribute && (k = i.getAttribute("data-ownerid"))) {
    i = g(k);
    l = true;
   } else i = i.parentNode;
  } while (j && i && !l);
  return i;
 }
 e.exports = h;
}, null);

__d("collectDataAttributes", [ "getContextualParent" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 var h = "normal";
 function i(j, k, l) {
  var m = {}, n = [], o = k.length, p;
  for (p = 0; p < o; ++p) {
   m[k[p]] = {};
   n.push("data-" + k[p]);
  }
  if (l) {
   m[h] = {};
   for (p = 0; p < (l || []).length; ++p) n.push(l[p]);
  }
  var q = {
   tn: "",
   "tn-debug": ","
  };
  while (j) {
   if (j.getAttribute) for (p = 0; p < n.length; ++p) {
    var r = n[p], s = j.getAttribute(r);
    if (s) {
     if (p >= o) {
      if (m[h][r] === void 0) m[h][r] = s;
      continue;
     }
     var t = JSON.parse(s);
     for (var u in t) if (q[u] !== void 0) {
      if (m[k[p]][u] === void 0) m[k[p]][u] = [];
      m[k[p]][u].push(t[u]);
     } else if (m[k[p]][u] === void 0) m[k[p]][u] = t[u];
    }
   }
   j = g(j);
  }
  for (var v in m) for (var w in q) if (m[v][w] !== void 0) m[v][w] = m[v][w].join(q[w]);
  return m;
 }
 e.exports = i;
}, null);

__d("throttle", [ "copyProperties" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 function h(j, k, l) {
  return i(j, k, l, false, false);
 }
 g(h, {
  acrossTransitions: function(j, k, l) {
   return i(j, k, l, true, false);
  },
  withBlocking: function(j, k, l) {
   return i(j, k, l, false, true);
  },
  acrossTransitionsWithBlocking: function(j, k, l) {
   return i(j, k, l, true, true);
  }
 });
 function i(j, k, l, m, n) {
  if (k == null) k = 100;
  var o, p, q = null, r = function() {
   p = Date.now();
   if (o) {
    j.apply(l, o);
    o = null;
    q = setTimeout(r, k, !m);
   } else q = null;
  };
  return function s() {
   o = arguments;
   if (q === null || Date.now() - p > k) if (n) {
    r();
   } else q = setTimeout(r, 0, !m);
  };
 }
 e.exports = h;
}, null);

__d("cx", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 function g(h) {
  throw new Error("cx: Unexpected class transformation.");
 }
 e.exports = g;
}, null);

__d("MessengerMarketingStickyHeader", [ "CSS", "Event", "Run", "Style", "cx", "getScrollPosition" ], function(a, b, c, d, e, f, g, h, i, j, k, l) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var m = 60;
 function n(o, p, q) {
  "use strict";
  this.$MessengerMarketingStickyHeader0 = o;
  this.$MessengerMarketingStickyHeader1 = p;
  this.$MessengerMarketingStickyHeader2 = q;
  this.$MessengerMarketingStickyHeader3 = false;
  this.$MessengerMarketingStickyHeader4 = false;
  this.$MessengerMarketingStickyHeader5();
  this.$MessengerMarketingStickyHeader6 = h.listen(window, "scroll", function() {
   return this.$MessengerMarketingStickyHeader5();
  }.bind(this));
  i.onLeave(function() {
   return this.destroy();
  }.bind(this));
 }
 n.prototype.$MessengerMarketingStickyHeader5 = function() {
  "use strict";
  var o = l(window).y;
  if (o < this.$MessengerMarketingStickyHeader2) {
   if (this.$MessengerMarketingStickyHeader3) {
    this.$MessengerMarketingStickyHeader3 = false;
    g.removeClass(this.$MessengerMarketingStickyHeader0, "_31rc");
    j.set(this.$MessengerMarketingStickyHeader0, "top", this.$MessengerMarketingStickyHeader2 + "px");
   }
   this.$MessengerMarketingStickyHeader4 = false;
   j.set(this.$MessengerMarketingStickyHeader1, "opacity", 0);
  } else {
   if (!this.$MessengerMarketingStickyHeader3) {
    this.$MessengerMarketingStickyHeader3 = true;
    g.addClass(this.$MessengerMarketingStickyHeader0, "_31rc");
    j.set(this.$MessengerMarketingStickyHeader0, "top", 0);
   }
   if (o - this.$MessengerMarketingStickyHeader2 < m) {
    this.$MessengerMarketingStickyHeader4 = false;
    j.set(this.$MessengerMarketingStickyHeader1, "opacity", (o - this.$MessengerMarketingStickyHeader2) / m);
   } else if (!this.$MessengerMarketingStickyHeader4) {
    this.$MessengerMarketingStickyHeader4 = true;
    j.set(this.$MessengerMarketingStickyHeader1, "opacity", 1);
   }
  }
 };
 n.prototype.destroy = function() {
  "use strict";
  this.$MessengerMarketingStickyHeader6 && this.$MessengerMarketingStickyHeader6.remove();
  this.$MessengerMarketingStickyHeader6 = null;
 };
 e.exports = n;
}, null);

__d("ClickRefUtils", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 var g = {
  get_intern_ref: function(h) {
   if (!!h) {
    var i = {
     profile_minifeed: 1,
     gb_content_and_toolbar: 1,
     gb_muffin_area: 1,
     ego: 1,
     bookmarks_menu: 1,
     jewelBoxNotif: 1,
     jewelNotif: 1,
     BeeperBox: 1,
     searchBarClickRef: 1
    };
    for (var j = h; j && j != document.body; j = j.parentNode) {
     if (!j.id || typeof j.id !== "string") continue;
     if (j.id.substr(0, 8) == "pagelet_") return j.id.substr(8);
     if (j.id.substr(0, 8) == "box_app_") return j.id;
     if (i[j.id]) return j.id;
    }
   }
   return "-";
  },
  get_href: function(h) {
   var i = h.getAttribute && (h.getAttribute("ajaxify") || h.getAttribute("data-endpoint")) || h.action || h.href || h.name;
   return typeof i === "string" ? i : null;
  },
  should_report: function(h, i) {
   if (i == "FORCE") return true;
   if (i == "INDIRECT") return false;
   return h && (g.get_href(h) || h.getAttribute && h.getAttribute("data-ft"));
  }
 };
 e.exports = g;
}, null);

__d("SessionName", [ "SessionNameConfig", "isInIframe" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 var i = "_e_", j = (window.name || "").toString();
 if (j.length == 7 && j.substr(0, 3) == i) {
  j = j.substr(3);
 } else {
  j = g.seed || "";
  if (!h()) window.name = i + j;
 }
 var k = {
  TOKEN: i,
  getName: function() {
   return j;
  }
 };
 a.SessionName = k;
 e.exports = k;
}, 3);

__d("Vector", [ "DOMVector", "Event" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 for (var i in g) if (g.hasOwnProperty(i)) k[i] = g[i];
 var j = g === null ? null : g.prototype;
 k.prototype = Object.create(j);
 k.prototype.constructor = k;
 k.__superConstructor__ = g;
 function k(l, m, n) {
  "use strict";
  g.call(this, parseFloat(l), parseFloat(m), n);
 }
 k.prototype.derive = function(l, m, n) {
  "use strict";
  return new k(l, m, n || this.domain);
 };
 k.prototype.setElementPosition = function(l) {
  "use strict";
  var m = this.convertTo("document");
  l.style.left = parseInt(m.x, 10) + "px";
  l.style.top = parseInt(m.y, 10) + "px";
  return this;
 };
 k.prototype.setElementDimensions = function(l) {
  "use strict";
  return this.setElementWidth(l).setElementHeight(l);
 };
 k.prototype.setElementWidth = function(l) {
  "use strict";
  l.style.width = parseInt(this.x, 10) + "px";
  return this;
 };
 k.prototype.setElementHeight = function(l) {
  "use strict";
  l.style.height = parseInt(this.y, 10) + "px";
  return this;
 };
 k.prototype.scrollElementBy = function(l) {
  "use strict";
  if (l == document.body) {
   window.scrollBy(this.x, this.y);
  } else {
   l.scrollLeft += this.x;
   l.scrollTop += this.y;
  }
  return this;
 };
 k.from = function(l, m, n) {
  "use strict";
  return new k(l, m, n);
 };
 k.getEventPosition = function(l, m) {
  "use strict";
  m = m || "document";
  var n = h.getPosition(l), o = this.from(n.x, n.y, "document");
  return o.convertTo(m);
 };
 k.deserialize = function(l) {
  "use strict";
  var m = l.split(",");
  return this.from(m[0], m[1]);
 };
 e.exports = k;
}, null);

__d("setUECookie", [ "Env" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 function h(i) {
  if (!g.no_cookies) document.cookie = "act=" + encodeURIComponent(i) + "; path=/; domain=" + window.location.hostname.replace(/^.*(\.facebook\..*)$/i, "$1");
 }
 e.exports = h;
}, null);

__d("ClickRefLogger", [ "Arbiter", "Banzai", "ClickRefUtils", "Env", "ScriptPath", "SessionName", "Vector", "$", "collectDataAttributes", "copyProperties", "ge", "pageID", "setUECookie" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
 b.__markCompiled && b.__markCompiled();
 var t = {
  delay: 0,
  retry: true
 };
 function u(y) {
  if (!q("content")) return [ 0, 0, 0, 0 ];
  var z = n("content"), aa = m.getEventPosition(y);
  return [ aa.x, aa.y, z.offsetLeft, z.clientWidth ];
 }
 function v(y, z, event, aa) {
  var ba = "r", ca = [ 0, 0, 0, 0 ], da, ea;
  if (!!event) {
   da = event.type;
   if (da == "click" && q("content")) ca = u(event);
   var fa = 0;
   event.ctrlKey && (fa += 1);
   event.shiftKey && (fa += 2);
   event.altKey && (fa += 4);
   event.metaKey && (fa += 8);
   if (fa) da += fa;
  }
  if (!!z) ea = i.get_href(z);
  var ga = o(!!event ? event.target || event.srcElement : z, [ "ft", "gt" ]);
  p(ga.ft, aa.ft || {});
  p(ga.gt, aa.gt || {});
  if (typeof ga.ft.ei === "string") delete ga.ft.ei;
  var ha = [ y._ue_ts, y._ue_count, ea || "-", y._context, da || "-", i.get_intern_ref(z), ba, a.URI ? a.URI.getRequestURI(true, true).getUnqualifiedURI().toString() : location.pathname + location.search + location.hash, ga ].concat(ca).concat(r).concat(k.getScriptPath());
  return ha;
 }
 g.subscribe("ClickRefAction/new", function(y, z) {
  if (i.should_report(z.node, z.mode)) {
   var aa = v(z.cfa, z.node, z.event, z.extra_data);
   s(z.cfa.ue);
   var ba = [ l.getName(), Date.now(), "act" ];
   h.post("click_ref_logger", Array.prototype.concat(ba, aa), t);
  }
 });
 function w(y) {
  function z(ha) {
   var ia = "";
   for (var ja = 0; ja < ha.length; ja++) ia += String.fromCharCode(1 ^ ha.charCodeAt(ja));
   return ia;
  }
  function aa(ha, ia, ja, ka) {
   var la = ia[ja];
   if (la && ha && la in ha) if (ja + 1 < ia.length) {
    aa(ha[la], ia, ja + 1, ka);
   } else {
    var ma = ha[la], na = function() {
     setTimeout(ka.bind(null, arguments));
     return ma.apply(this, arguments);
    };
    na.toString = ma.toString.bind(ma);
    Object.defineProperty(ha, la, {
     configurable: false,
     writable: true,
     value: na
    });
   }
  }
  var ba = {}, ca = {}, da = false;
  function ea(ha, ia) {
   if (ca[ha]) return;
   ca[ha] = ba[ha] = 1;
  }
  var fa = y[z("jiri")];
  if (fa) {
   var ga = [];
   z(fa).split(",").map(function(ha, ia) {
    var ja = ha.substring(1).split(":"), ka;
    switch (ha.charAt(0)) {
    case "1":
     ka = new RegExp("\\b(" + ja[0] + ")\\b", "i");
     ga.push(function(la) {
      var ma = ka.exec(Object.keys(window));
      if (ma) ea(ia, "" + ma);
     });
     break;

    case "2":
     ka = new RegExp(ja[0]);
     aa(window, ja, 2, function(la) {
      var ma = la[ja[1]];
      if (typeof ma === "string" && ka.test(ma)) ea(ia, ha);
     });
     break;

    case "3":
     aa(window, ja, 0, function() {
      for (var la = ga.length; la--; ) ga[la]();
      var ma = Object.keys(ba);
      if (ma.length) {
       ba = {};
       setTimeout(h[z("qnru")].bind(h, z("islg"), {
        m: "" + ma
       }), 5e3);
      }
     });
     break;

    case "4":
     da = true;
     break;
    }
   });
  }
 }
 try {
  w(j);
 } catch (x) {}
}, null);

__d("PixelRatio", [ "Arbiter", "Cookie", "PixelRatioConst", "Run" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 var k = i.cookieName, l, m;
 function n() {
  return window.devicePixelRatio || 1;
 }
 function o() {
  h.set(k, n());
 }
 function p() {
  h.clear(k);
 }
 function q() {
  var s = n();
  if (s !== l) {
   o();
  } else p();
 }
 var r = {
  startDetecting: function(s) {
   l = s || 1;
   p();
   if (m) return;
   m = [ g.subscribe("pre_page_transition", q) ];
   j.onBeforeUnload(q);
  }
 };
 e.exports = r;
}, null);

__d("PostLoadJS", [ "Bootloader", "Run", "emptyFunction" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 function j(l, m) {
  h.onAfterLoad(function() {
   g.loadModules.call(g, [ l ], m);
  });
 }
 var k = {
  loadAndRequire: function(l) {
   j(l, i);
  },
  loadAndCall: function(l, m, n) {
   j(l, function(o) {
    o[m].apply(o, n);
   });
  }
 };
 e.exports = k;
}, null);

__d("UserActionHistory", [ "Arbiter", "ClickRefUtils", "ScriptPath", "throttle", "WebStorage" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 var l = {
  click: 1,
  submit: 1
 }, m = false, n = {
  log: [],
  len: 0
 }, o = j.acrossTransitions(function() {
  try {
   m._ua_log = JSON.stringify(n);
  } catch (r) {
   m = false;
  }
 }, 1e3);
 function p() {
  var r = k.getSessionStorage();
  if (r) {
   m = r;
   m._ua_log && (n = JSON.parse(m._ua_log));
  } else m = false;
  n.log[n.len % 10] = {
   ts: Date.now(),
   path: "-",
   index: n.len,
   type: "init",
   iref: "-"
  };
  n.len++;
  g.subscribe("UserAction/new", function(s, t) {
   var u = t.ua, v = t.node, event = t.event;
   if (!event || !(event.type in l)) return;
   var w = {
    path: i.getScriptPath(),
    type: event.type,
    ts: u._ue_ts,
    iref: h.get_intern_ref(v) || "-",
    index: n.len
   };
   n.log[n.len++ % 10] = w;
   m && o();
  });
 }
 function q() {
  return n.log.sort(function(r, s) {
   return s.ts != r.ts ? s.ts - r.ts : s.index - r.index;
  });
 }
 p();
 e.exports = {
  getHistory: q
 };
}, null);

__d("UserActivity", [ "Arbiter", "Event" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 var i = 5e3, j = 500, k = -5, l = Date.now(), m = l, n = false, o = Date.now(), p = true, q = 0, r = {
  subscribeOnce: function(v) {
   var w = r.subscribe(function() {
    r.unsubscribe(w);
    v();
   });
   return w;
  },
  subscribe: function(v) {
   return g.subscribe("useractivity/activity", v);
  },
  unsubscribe: function(v) {
   v.unsubscribe();
  },
  isActive: function(v) {
   return new Date() - l < (v || i);
  },
  isOnTab: function() {
   return p;
  },
  isActiveOnTab: function(v) {
   return this.isActive(v) && this.isOnTab();
  },
  hasBeenInactive: function() {
   return n;
  },
  resetActiveStatus: function() {
   p = true;
   n = false;
  },
  getLastInActiveEnds: function() {
   return o;
  },
  getLastActive: function() {
   return l;
  },
  setIdleTime: function(v) {
   q = v;
  },
  getLastInformTime: function() {
   return m;
  }
 };
 function s(event) {
  l = Date.now();
  var v = l - m;
  if (v > j) {
   m = l;
   if (v >= (q || i)) {
    n = true;
    o = l;
   }
   g.inform("useractivity/activity", {
    event: event,
    idleness: v,
    last_inform: m
   });
  } else if (v < k) m = l;
 }
 function t(event) {
  p = true;
  o = Date.now();
  s(event);
 }
 function u(event) {
  p = false;
  n = true;
 }
 h.listen(window, "scroll", s);
 h.listen(window, "focus", t);
 h.listen(window, "blur", u);
 h.listen(document.documentElement, {
  DOMMouseScroll: s,
  mousewheel: s,
  keydown: s,
  mouseover: s,
  mousemove: s,
  click: s
 });
 g.subscribe("Event/stop", function(v, w) {
  s(w.event);
 });
 e.exports = r;
}, null);

__d("Chromedome", [ "fbt" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 f.start = function(h) {
  if (h.off || top !== window || !/(^|\.)facebook\.com$/.test(document.domain)) return;
  var i = h.stop || g._("Stop!"), j = h.text || g._('This is a browser feature intended for developers. If someone told you to copy-paste something here to enable a Facebook feature or "hack" someone\'s account, it is a scam and will give them access to your Facebook account.'), k = h.more || g._("For more information, see {url}.", [ g.param("url", "https://www.facebook.com/selfxss") ]);
  if ((window.chrome || window.safari) && !h.textonly) {
   var l = "font-family:helvetica; font-size:20px; ";
   [ [ i, h.c1 || l + "font-size:50px; font-weight:bold; " + "color:red; -webkit-text-stroke:1px black;" ], [ j, h.c2 || l ], [ k, h.c3 || l ], [ "", "" ] ].map(function(r) {
    setTimeout(console.log.bind(console, "\n%c" + r[0], r[1]));
   });
  } else {
   var m = [ "", " .d8888b.  888                       888", "d88P  Y88b 888                       888", "Y88b.      888                       888", ' "Y888b.   888888  .d88b.  88888b.   888', '    "Y88b. 888    d88""88b 888 "88b  888', '      "888 888    888  888 888  888  Y8P', "Y88b  d88P Y88b.  Y88..88P 888 d88P", ' "Y8888P"   "Y888  "Y88P"  88888P"   888', "                           888", "                           888", "                           888" ], n = ("" + j).match(/.{35}.+?\s+|.+$/g), o = Math.floor(Math.max(0, (m.length - n.length) / 2));
   for (var p = 0; p < m.length || p < n.length; p++) {
    var q = m[p];
    m[p] = q + new Array(45 - q.length).join(" ") + (n[p - o] || "");
   }
   console.log("\n\n\n" + m.join("\n") + "\n\n" + k + "\n");
   return;
  }
 };
}, null);

__d("NavigationClickPointHandler", [ "Event", "ScriptPath", "collectDataAttributes" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 var j = null;
 function k(m) {
  var n = i(m, [ "ft" ], [ "href", "data-click" ]), o = n.normal.href;
  if (!o || o === "#") return false;
  var p = n.ft.tn;
  if (p) {
   j = {
    tn: p
   };
   return true;
  }
  var q = n.normal["data-click"];
  if (q) {
   j = {
    click: q
   };
   return true;
  }
  if (m.getAttribute) {
   var r = m.getAttribute("class");
   if (r) {
    j = {
     "class": r
    };
    return true;
   }
  }
  j = null;
  return true;
 }
 function l(event) {
  var m = event.target || event.srcElement;
  if (k(m)) h.setClickPointInfo(j);
 }
 g.listen(document.documentElement, {
  click: l
 });
 e.exports = null;
}, null);