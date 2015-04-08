if (self.CavalryLogger) {
 CavalryLogger.start_js([ "plqFk" ]);
}

__d("getMarkupWrap", [ "ExecutionEnvironment", "invariant" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 var i = g.canUseDOM ? document.createElement("div") : null, j = {
  circle: true,
  defs: true,
  ellipse: true,
  g: true,
  line: true,
  linearGradient: true,
  path: true,
  polygon: true,
  polyline: true,
  radialGradient: true,
  rect: true,
  stop: true,
  text: true
 }, k = [ 1, '<select multiple="true">', "</select>" ], l = [ 1, "<table>", "</table>" ], m = [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ], n = [ 1, "<svg>", "</svg>" ], o = {
  "*": [ 1, "?<div>", "</div>" ],
  area: [ 1, "<map>", "</map>" ],
  col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
  legend: [ 1, "<fieldset>", "</fieldset>" ],
  param: [ 1, "<object>", "</object>" ],
  tr: [ 2, "<table><tbody>", "</tbody></table>" ],
  optgroup: k,
  option: k,
  caption: l,
  colgroup: l,
  tbody: l,
  tfoot: l,
  thead: l,
  td: m,
  th: m,
  circle: n,
  defs: n,
  ellipse: n,
  g: n,
  line: n,
  linearGradient: n,
  path: n,
  polygon: n,
  polyline: n,
  radialGradient: n,
  rect: n,
  stop: n,
  text: n
 };
 function p(q) {
  h(!!i);
  if (!o.hasOwnProperty(q)) q = "*";
  if (!j.hasOwnProperty(q)) {
   if (q === "*") {
    i.innerHTML = "<link />";
   } else i.innerHTML = "<" + q + "></" + q + ">";
   j[q] = !i.firstChild;
  }
  return j[q] ? o[q] : null;
 }
 e.exports = p;
}, null);

__d("createNodesFromMarkup", [ "ExecutionEnvironment", "createArrayFromMixed", "getMarkupWrap", "invariant" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 var k = g.canUseDOM ? document.createElement("div") : null, l = /^\s*<(\w+)/;
 function m(o) {
  var p = o.match(l);
  return p && p[1].toLowerCase();
 }
 function n(o, p) {
  var q = k;
  j(!!k);
  var r = m(o), s = r && i(r);
  if (s) {
   q.innerHTML = s[1] + o + s[2];
   var t = s[0];
   while (t--) q = q.lastChild;
  } else q.innerHTML = o;
  var u = q.getElementsByTagName("script");
  if (u.length) {
   j(p);
   h(u).forEach(p);
  }
  var v = h(q.childNodes);
  while (q.lastChild) q.removeChild(q.lastChild);
  return v;
 }
 e.exports = n;
}, null);

__d("evalGlobal", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 function g(h) {
  if (typeof h != "string") throw new TypeError("JS sent to evalGlobal is not a string. Only strings are permitted.");
  if (!h) return;
  var i = document.createElement("script");
  try {
   i.appendChild(document.createTextNode(h));
  } catch (j) {
   i.text = h;
  }
  var k = document.getElementsByTagName("head")[0] || document.documentElement;
  k.appendChild(i);
  k.removeChild(i);
 }
 e.exports = g;
}, null);

__d("FbtLoggerImpl", [ "BanzaiLogger" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 var h = {
  logImpression: function(i) {
   g.log("FbtImpressionsLoggerConfig", {
    hash: i,
    sample_rate: 100
   });
  }
 };
 e.exports = h;
}, null);

__d("HTML", [ "Bootloader", "createNodesFromMarkup", "emptyFunction", "evalGlobal", "invariant" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 var l = /(<(\w+)[^>]*?)\/>/g, m = {
  abbr: true,
  area: true,
  br: true,
  col: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  link: true,
  meta: true,
  param: true
 };
 function n(o) {
  "use strict";
  if (o && typeof o.__html === "string") o = o.__html;
  if (!(this instanceof n)) {
   if (o instanceof n) return o;
   return new n(o);
  }
  if (o) {
   var p = typeof o;
   k(p === "string");
  }
  this._markup = o || "";
  this._defer = false;
  this._extraAction = "";
  this._nodes = null;
  this._inlineJS = i;
  this._rootNode = null;
 }
 n.prototype.toString = function() {
  "use strict";
  var o = this._markup;
  if (this._extraAction) o += '<script type="text/javascript">' + this._extraAction + "</scr" + "ipt>";
  return o;
 };
 n.prototype.getContent = function() {
  "use strict";
  return this._markup;
 };
 n.prototype.getNodes = function() {
  "use strict";
  this._fillCache();
  return this._nodes;
 };
 n.prototype.getRootNode = function() {
  "use strict";
  k(!this._rootNode);
  var o = this.getNodes();
  if (o.length === 1) {
   this._rootNode = o[0];
  } else {
   var p = document.createDocumentFragment();
   for (var q = 0; q < o.length; q++) p.appendChild(o[q]);
   this._rootNode = p;
  }
  return this._rootNode;
 };
 n.prototype.getAction = function() {
  "use strict";
  this._fillCache();
  var o = function() {
   this._inlineJS();
   j(this._extraAction);
  }.bind(this);
  return this._defer ? function() {
   setTimeout(o, 0);
  } : o;
 };
 n.prototype._fillCache = function() {
  "use strict";
  if (this._nodes !== null) return;
  if (!this._markup) {
   this._nodes = [];
   return;
  }
  var o = this._markup.replace(l, function(r, s, t) {
   return m[t.toLowerCase()] ? r : s + "></" + t + ">";
  }), p = null, q = h(o, function(r) {
   p = p || [];
   p.push(r.src ? g.requestJSResource.bind(g, r.src) : j.bind(null, r.innerHTML));
   r.parentNode.removeChild(r);
  });
  if (p) this._inlineJS = function() {
   for (var r = 0; r < p.length; r++) p[r]();
  };
  this._nodes = q;
 };
 n.prototype.setAction = function(o) {
  "use strict";
  this._extraAction = o;
  return this;
 };
 n.prototype.setDeferred = function(o) {
  "use strict";
  this._defer = !!o;
  return this;
 };
 n.isHTML = function(o) {
  "use strict";
  return !!o && (o instanceof n || o.__html !== void 0);
 };
 n.replaceJSONWrapper = function(o) {
  "use strict";
  return o && o.__html !== void 0 ? new n(o.__html) : o;
 };
 e.exports = n;
}, null);

__d("ImageFailLoggerOnload", [ "Banzai" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 var h = "image_fail_load", i = false;
 function j(m) {
  k({
   image_uri: m.src
  });
 }
 function k(m) {
  g.post(h, m);
 }
 var l = {
  init: function() {
   if (!a.ImageFailLogger) return;
   if (i) return;
   i = true;
   for (var m = 0; m < a.ImageFailLogger.entries.length; m++) k(a.ImageFailLogger.entries[m]);
   a.ImageFailLogger.entries = null;
   a.ImageFailLogger.logImageFail = j;
  }
 };
 e.exports = l;
}, null);