if (self.CavalryLogger) {
 CavalryLogger.start_js([ "3xxa5" ]);
}

__d("BanzaiNectar", [ "Banzai" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 function h(j) {
  return {
   log: function(k, l, m) {
    var n = {
     e: l,
     a: m
    };
    g.post("nectar:" + k, n, j);
   }
  };
 }
 var i = h();
 i.create = h;
 e.exports = i;
}, null);

__d("transferTextStyles", [ "Style" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 var h = {
  fontFamily: null,
  fontSize: null,
  fontStyle: null,
  fontWeight: null,
  lineHeight: null,
  wordWrap: null
 };
 function i(j, k) {
  for (var l in h) if (h.hasOwnProperty(l)) h[l] = g.get(j, l);
  g.apply(k, h);
 }
 e.exports = i;
}, null);

__d("TextMetrics", [ "DOM", "Style", "UserAgent_DEPRECATED", "transferTextStyles" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 function k(m) {
  var n = m.clientWidth, o = h.get(m, "-moz-box-sizing") == "border-box";
  if (o && i.firefox() < 29) return n;
  var p = h.getFloat(m, "paddingLeft") + h.getFloat(m, "paddingRight");
  return n - p;
 }
 function l(m, n) {
  this._node = m;
  this._flexible = !!n;
  var o = "textarea", p = "textMetrics";
  if (this._flexible) {
   o = "div";
   p += " textMetricsInline";
  }
  this._shadow = g.create(o, {
   className: p
  });
  j(m, this._shadow);
  document.body.appendChild(this._shadow);
 }
 l.prototype.measure = function(m) {
  var n = this._node, o = this._shadow;
  m = (m || n.value) + "...";
  if (!this._flexible) {
   var p = k(n);
   h.set(o, "width", Math.max(p, 0) + "px");
  }
  if (n.nodeName === "TEXTAREA") {
   o.value = m;
  } else g.setContent(o, m);
  return {
   width: o.scrollWidth,
   height: o.scrollHeight
  };
 };
 l.prototype.destroy = function() {
  g.remove(this._shadow);
 };
 e.exports = l;
}, null);

__d("FlexibleBlock.react", [ "LeftRight.react", "React", "cx", "invariant", "keyMirror" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 var l = k({
  left: true,
  right: true
 });
 function m(o) {
  j(o.flex && o.flex in n.FLEX);
  j(o.children && o.children.length === 2);
 }
 var n = h.createClass({
  displayName: "FlexibleBlock",
  render: function() {
   m(this.props);
   var o, p = this.props.children[0], q = this.props.children[1], r = this.props.flex == l.left, s;
   if (r) {
    s = p;
    o = g.DIRECTION.right;
   } else {
    s = q;
    o = g.DIRECTION.left;
   }
   var t = h.createElement("div", {
    className: "_42ef"
   }, s);
   return h.createElement(g, h.__spread({}, this.props, {
    direction: o
   }), r ? t : this.props.children[0], r ? this.props.children[1] : t);
  }
 });
 n.FLEX = l;
 e.exports = n;
}, null);

__d("CurrentLocale", [ "LocaleInitialData" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 var h = {};
 h.get = function() {
  return g.locale;
 };
 e.exports = h;
}, null);

__d("createIxElement", [ "DOM", "invariant", "joinClasses" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 function j(k, l) {
  var m = "img", n;
  h(k.sprited || k.uri);
  if (k.sprited) {
   m = i(m, k.spriteMapCssClass, k.spriteCssClass);
   n = g.create("i", {
    className: m
   });
   if (l != null) g.setContent(n, g.create("u", null, l));
  } else if (k.uri) {
   n = g.create("img", {
    className: m,
    src: k.uri
   });
   if (l != null) n.setAttribute("alt", l);
   if (k.width) n.setAttribute("width", k.width);
   if (k.height) n.setAttribute("height", k.height);
  }
  return n;
 }
 e.exports = j;
}, null);

__d("TypeaheadFacepile", [ "DOM" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 function h() {}
 h.render = function(i) {
  var j = [ g.create("span", {
   className: "splitpic leftpic"
  }, [ g.create("img", {
   alt: "",
   src: i[0]
  }) ]), g.create("span", {
   className: "splitpic" + (i[2] ? " toppic" : "")
  }, [ g.create("img", {
   alt: "",
   src: i[1]
  }) ]) ];
  if (i[2]) j.push(g.create("span", {
   className: "splitpic bottompic"
  }, [ g.create("img", {
   alt: "",
   src: i[2]
  }) ]));
  return g.create("span", {
   className: "splitpics clearfix"
  }, j);
 };
 e.exports = h;
}, null);

__d("AccessibilityLogger", [ "AsyncSignal", "Cookie" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 var i = {
  COOKIE: "a11y",
  DECAY_MS: 6 * 60 * 60 * 1e3,
  DEFAULT: {
   sr: 0,
   "sr-ts": Date.now(),
   jk: 0,
   "jk-ts": Date.now(),
   kb: 0,
   "kb-ts": Date.now(),
   hcm: 0,
   "hcm-ts": Date.now()
  },
  getCookie: function() {
   var j = i.DEFAULT, k = h.get(i.COOKIE);
   if (k) {
    k = JSON.parse(k);
    for (var l in j) if (l in k) j[l] = k[l];
   }
   return j;
  },
  logKey: function(j, k) {
   var l = i.getCookie();
   l[j]++;
   var m = Date.now();
   if (m - l[j + "-ts"] > i.DECAY_MS) {
    new g("/ajax/accessibilitylogging", {
     eventName: k,
     times_pressed: l[j]
    }).send();
    l[j + "-ts"] = m;
    l[j] = 0;
   }
   h.set(i.COOKIE, JSON.stringify(l));
  },
  logHCM: function() {
   i.logKey("hcm", "hcm_users");
  },
  logSRKey: function() {
   i.logKey("sr", "sr_users");
  },
  logJKKey: function() {
   i.logKey("jk", "jk_users");
  },
  logFocusIn: function() {
   i.logKey("kb", "kb_users");
  }
 };
 e.exports = i;
}, null);

__d("BasicTypeaheadRenderer", [ "BadgeHelper", "DOM" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 var i = " · ";
 function j(k, l) {
  var m = [];
  if (k.icon) m.push(h.create("img", {
   alt: "",
   src: k.icon
  }));
  var n = k.debug_info;
  if (n) m.push(h.create("span", {
   className: "debugInfo"
  }, n));
  if (k.text) {
   var o = [ k.text ];
   if (k.is_verified) o.push(g.renderBadge("xsmall", "verified"));
   m.push(h.create("span", {
    className: "text"
   }, o));
  }
  if (k.subtext) {
   var p = [ k.subtext ];
   if (k.saved_context) {
    var q = h.create("span", {
     className: "saved"
    }, [ k.saved_context ]);
    p.unshift(q, i);
   }
   m.push(h.create("span", {
    className: "subtext"
   }, p));
  }
  var r = h.create("li", {
   className: k.type || ""
  }, m);
  if (k.text) {
   r.setAttribute("title", k.text);
   r.setAttribute("aria-label", k.text);
  }
  return r;
 }
 j.className = "basic";
 e.exports = j;
}, null);

__d("TypeaheadView", [ "ArbiterMixin", "BasicTypeaheadRenderer", "createIxElement", "CSS", "DOM", "Event", "ix", "Parent", "$", "copyProperties", "emptyFunction", "getElementText", "mixin" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
 b.__markCompiled && b.__markCompiled();
 var t = s(g);
 for (var u in t) if (t.hasOwnProperty(u)) w[u] = t[u];
 var v = t === null ? null : t.prototype;
 w.prototype = Object.create(v);
 w.prototype.constructor = w;
 w.__superConstructor__ = t;
 function w(x, y) {
  "use strict";
  this.element = this.content = o(x);
  p(this, y);
 }
 w.prototype.init = function() {
  "use strict";
  this.init = q;
  this.initializeEvents();
  this.reset();
 };
 w.prototype.initializeEvents = function() {
  "use strict";
  l.listen(this.element, {
   mouseup: this.mouseup.bind(this),
   mouseover: this.mouseover.bind(this)
  });
 };
 w.prototype.setTypeahead = function(x) {
  "use strict";
  this.typeahead = x;
 };
 w.prototype.setAccessibilityControlElement = function(x) {
  "use strict";
  this.accessibilityElement = x;
 };
 w.prototype.getElement = function() {
  "use strict";
  return this.element;
 };
 w.prototype.mouseup = function(event) {
  "use strict";
  if (event.button != 2) {
   this.select(true);
   event.prevent();
  }
 };
 w.prototype.mouseover = function(event) {
  "use strict";
  if (this.ignoreMouseover) {
   this.ignoreMouseover = false;
   return;
  }
  if (this.visible) this.highlight(this.getIndex(event));
 };
 w.prototype.reset = function(x) {
  "use strict";
  if (!x) this.disableAutoSelect = false;
  this.index = -1;
  this.items = [];
  this.results = [];
  this.value = "";
  this.content.innerHTML = "";
  this.inform("reset");
  return this;
 };
 w.prototype.getIndex = function(event) {
  "use strict";
  return this.items.indexOf(n.byTag(event.getTarget(), "li"));
 };
 w.prototype.getSelection = function() {
  "use strict";
  var x = this.results[this.index] || null;
  return this.visible ? x : null;
 };
 w.prototype.isEmpty = function() {
  "use strict";
  return !this.results.length;
 };
 w.prototype.isVisible = function() {
  "use strict";
  return !!this.visible;
 };
 w.prototype.show = function() {
  "use strict";
  j.show(this.element);
  if (this.results && this.results.length) if (this.autoSelect && this.accessibilityElement && this.selected) this.accessibilityElement.setAttribute("aria-activedescendant", k.getID(this.selected));
  this.accessibilityElement && this.accessibilityElement.setAttribute("aria-expanded", "true");
  this.visible = true;
  return this;
 };
 w.prototype.hide = function() {
  "use strict";
  j.hide(this.element);
  if (this.accessibilityElement) {
   this.accessibilityElement.setAttribute("aria-expanded", "false");
   this.accessibilityElement.removeAttribute("aria-activedescendant");
  }
  this.visible = false;
  return this;
 };
 w.prototype.render = function(x, y) {
  "use strict";
  this.value = x;
  if (!y.length) {
   this.accessibilityElement && this.accessibilityElement.removeAttribute("aria-activedescendant");
   this.reset(true);
   return;
  }
  var z = {
   results: y,
   value: x
  };
  this.inform("beforeRender", z);
  y = z.results;
  var aa = this.getDefaultIndex(y);
  if (this.index > 0 && this.index !== this.getDefaultIndex(this.results) && this.index < this.results.length) {
   var ba = this.results[this.index];
   for (var ca = 0, da = y.length; ca < da; ++ca) if (ba.uid == y[ca].uid) {
    aa = ca;
    break;
   }
  }
  this.results = y;
  k.setContent(this.content, this.buildResults(y));
  this.items = this.getItems();
  this.highlight(aa, false);
  this.inform("render", y);
 };
 w.prototype.getItems = function() {
  "use strict";
  return k.scry(this.content, "li");
 };
 w.prototype.buildResults = function(x) {
  "use strict";
  var y, z = null;
  if (typeof this.renderer == "function") {
   y = this.renderer;
   z = this.renderer.className || "";
  } else {
   y = a.TypeaheadRenderers[this.renderer];
   z = this.renderer;
  }
  y = y.bind(this);
  var aa = x.map(function(ca, da) {
   var ea = ca.node || y(ca, da);
   ea.setAttribute("role", "option");
   return ea;
  }), ba = k.create("ul", {
   className: z,
   id: "typeahead_list_" + (this.typeahead ? k.getID(this.typeahead) : k.getID(this.element))
  }, aa);
  ba.setAttribute("role", "listbox");
  return ba;
 };
 w.prototype.showLoadingIndicator = function() {
  "use strict";
  var x = i(m("/images/loaders/indicator_blue_small.gif")), y = k.create("li", {
   className: "typeaheadViewInternalLoading"
  }, x), z = k.create("ul", {
   role: "listbox"
  }, y);
  k.setContent(this.content, z);
 };
 w.prototype.getDefaultIndex = function() {
  "use strict";
  var x = this.autoSelect && !this.disableAutoSelect;
  return this.index < 0 && !x ? -1 : 0;
 };
 w.prototype.next = function() {
  "use strict";
  this.highlight(this.index + 1);
  this.inform("next", this.selected);
 };
 w.prototype.prev = function() {
  "use strict";
  this.highlight(this.index - 1);
  this.inform("prev", this.selected);
 };
 w.prototype.getItemText = function(x) {
  "use strict";
  var y = "";
  if (x) {
   y = x.getAttribute("aria-label");
   if (!y) {
    y = r(x);
    x.setAttribute("aria-label", y);
   }
  }
  return y;
 };
 w.prototype.setIsViewingSelectedItems = function(x) {
  "use strict";
  this.viewingSelected = x;
  return this;
 };
 w.prototype.getIsViewingSelectedItems = function() {
  "use strict";
  return !!this.viewingSelected;
 };
 w.prototype.highlight = function(x, y) {
  "use strict";
  if (this.selected) {
   j.removeClass(this.selected, "selected");
   this.selected.setAttribute("aria-selected", "false");
  }
  if (x > this.items.length - 1) {
   x = -1;
  } else if (x < -1) x = this.items.length - 1;
  if (x >= 0 && x < this.items.length) {
   this.selected = this.items[x];
   j.addClass(this.selected, "selected");
   this.selected.setAttribute("aria-selected", "true");
   if (this.accessibilityElement) setTimeout(function() {
    this.accessibilityElement.setAttribute("aria-activedescendant", k.getID(this.selected));
   }.bind(this), 0);
  } else this.accessibilityElement && this.accessibilityElement.removeAttribute("aria-activedescendant");
  this.index = x;
  this.disableAutoSelect = x == -1;
  if (y !== false) this.inform("highlight", {
   index: x,
   selected: this.results[x],
   element: this.selected
  });
 };
 w.prototype.select = function(x) {
  "use strict";
  if (this.headerIndex && x) return;
  var y = this.index, z = this.results[y], aa = this.element.getAttribute("id");
  if (z) {
   var ba = function(ca) {
    this.inform("select", {
     index: y,
     clicked: !!x,
     selected: ca,
     id: aa,
     query: this.value
    });
    this.inform("afterSelect");
   }.bind(this);
   if (this.shouldValidateTypeaheadSelection(z)) {
    this.validateTypeaheadSelection(z, ba);
   } else ba(z);
  }
 };
 w.prototype.shouldValidateTypeaheadSelection = function(x) {
  "use strict";
  return false;
 };
 w.prototype.validateTypeaheadSelection = function(x, y) {
  "use strict";
 };
 p(w.prototype, {
  events: [ "highlight", "render", "reset", "select", "beforeRender", "next", "prev" ],
  renderer: h,
  autoSelect: false,
  ignoreMouseover: false
 });
 e.exports = w;
}, null);

__d("BucketedTypeaheadView", [ "DOM", "TypeaheadView", "fbt" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 for (var j in h) if (h.hasOwnProperty(j)) l[j] = h[j];
 var k = h === null ? null : h.prototype;
 l.prototype = Object.create(k);
 l.prototype.constructor = l;
 l.__superConstructor__ = h;
 function l() {
  "use strict";
  if (h !== null) h.apply(this, arguments);
 }
 l.prototype.render = function(m, n, o) {
  "use strict";
  n = this.buildBuckets(m, n);
  return k.render.call(this, m, n, o);
 };
 l.prototype.highlight = function(m, n) {
  "use strict";
  this.headerIndex = false;
  if (m == -1 && this.index !== 0) m = this.index;
  while (m >= 0 && m < this.items.length && !this.isHighlightable(this.results[m])) {
   m = m + 1;
   this.headerIndex = true;
  }
  k.highlight.call(this, m, n);
 };
 l.prototype.buildBuckets = function(m, n) {
  "use strict";
  if (!this.typeObjects || !n || !n.length) return n;
  var o = [], p = {};
  for (var q = 0; q < n.length; ++q) {
   var r = n[q], s = r.render_type || r.type;
   if (!p.hasOwnProperty(s)) {
    p[s] = o.length;
    o.push([ this.buildBucketHeader(s) ]);
   }
   r.classNames = r.classNames || s;
   r.groupIndex = p[s];
   r.indexInGroup = o[r.groupIndex].length - 1;
   r.globalIndex = q;
   o[r.groupIndex].push(r);
  }
  for (s in this.typeObjects) if (!p.hasOwnProperty(s) && this.typeObjects[s].show_always) {
   p[s] = o.length;
   o.push([ this.buildBucketHeader(s) ]);
   r = this.buildNoResultsEntry();
   r.classNames = r.type;
   r.groupIndex = p[s];
   r.indexInGroup = o[r.groupIndex].length - 1;
   o[r.groupIndex].push(r);
  }
  var t = [];
  if (this.typeObjectsOrder) {
   for (var u = 0; u < this.typeObjectsOrder.length; ++u) {
    var v = this.typeObjectsOrder[u];
    if (p.hasOwnProperty(v)) t = t.concat(o[p[v]]);
   }
  } else for (var w = 0; w < o.length; ++w) t = t.concat(o[w]);
  return t;
 };
 l.prototype.buildNoResultsEntry = function() {
  "use strict";
  return {
   uid: "disabled_result",
   type: "disabled_result",
   text: i._("No Results")
  };
 };
 l.prototype.buildBucketHeader = function(m) {
  "use strict";
  var n = this.typeObjects[m];
  if (n === void 0) throw new Error(m + " is undefined in " + JSON.stringify(this.typeObjects));
  if (n.markup) {
   n.text = n.markup;
   delete n.markup;
  }
  return this.typeObjects[m];
 };
 l.prototype.buildResults = function(m) {
  "use strict";
  var n = k.buildResults.call(this, m);
  if (this.typeObjects) {
   return g.create("div", {
    className: "bucketed"
   }, [ n ]);
  } else return n;
 };
 l.prototype.isHighlightable = function(m) {
  "use strict";
  return m.type != "header" && m.type != "disabled_result";
 };
 l.prototype.select = function(m) {
  "use strict";
  var n = this.results[this.index];
  if (n && this.isHighlightable(n)) k.select.call(this, m);
 };
 l.prototype.updateResults = function(m) {
  "use strict";
  this.results = m;
 };
 l.prototype.normalizeIndex = function(m) {
  "use strict";
  var n = this.results.length;
  if (n === 0) {
   return -1;
  } else if (m < -1) {
   return m % n + n + 1;
  } else if (m >= n) {
   return m % n - 1;
  } else return m;
 };
 l.prototype.getDefaultIndex = function(m) {
  "use strict";
  var n = this.autoSelect && !this.disableAutoSelect;
  if (this.index < 0 && !n) return -1;
  if (m.length === 0) return -1;
  var o = 0;
  while (!this.isHighlightable(m) && o < m.length) o++;
  return o;
 };
 l.prototype.prev = function() {
  "use strict";
  var m = this.results[this.normalizeIndex(this.index - 1)];
  while (m && !this.isHighlightable(m)) {
   this.index = this.normalizeIndex(this.index - 1);
   m = this.results[this.normalizeIndex(this.index - 1)];
  }
  return k.prev.call(this);
 };
 l.prototype.next = function() {
  "use strict";
  var m = this.results[this.normalizeIndex(this.index + 1)];
  while (m && !this.isHighlightable(m)) {
   this.index = this.normalizeIndex(this.index + 1);
   m = this.results[this.normalizeIndex(this.index + 1)];
  }
  return k.next.call(this);
 };
 e.exports = l;
}, null);

__d("ContextualTypeaheadView", [ "BucketedTypeaheadView", "CSS", "ContextualLayer", "ContextualLayerAutoFlip", "ContextualLayerHideOnScroll", "DOM", "DOMDimensions", "Style" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
 b.__markCompiled && b.__markCompiled();
 for (var o in g) if (g.hasOwnProperty(o)) q[o] = g[o];
 var p = g === null ? null : g.prototype;
 q.prototype = Object.create(p);
 q.prototype.constructor = q;
 q.__superConstructor__ = g;
 function q() {
  "use strict";
  if (g !== null) g.apply(this, arguments);
 }
 q.prototype.init = function() {
  "use strict";
  this.initializeLayer();
  p.init.call(this);
 };
 q.prototype.initializeLayer = function() {
  "use strict";
  this.context = this.getContext();
  this.wrapper = l.create("div");
  l.appendContent(this.wrapper, this.element);
  h.addClass(this.element, "uiContextualTypeaheadView");
  this.layer = new i({
   context: this.context,
   position: "below",
   alignment: this.alignment,
   causalElement: this.causalElement,
   permanent: true,
   shouldSetARIAProperties: false
  }, this.wrapper);
  this.layer.enableBehavior(k);
  if (n.isFixed(this.context) || this.autoflip) this.layer.enableBehavior(j);
  this.subscribe("render", this.renderLayer.bind(this));
 };
 q.prototype.show = function() {
  "use strict";
  if (this.minWidth) {
   n.set(this.wrapper, "min-width", this.minWidth + "px");
  } else if (this.width) {
   n.set(this.wrapper, "width", this.width + "px");
  } else n.set(this.wrapper, "width", m.getElementDimensions(this.context).width + "px");
  var r = p.show.call(this);
  this.layer.show();
  this.inform("show");
  return r;
 };
 q.prototype.hide = function() {
  "use strict";
  this.layer.hide();
  this.inform("hide");
  return p.hide.call(this);
 };
 q.prototype.renderLayer = function() {
  "use strict";
  if (!this.isVisible()) return;
  if (this.layer.isShown()) {
   this.layer.updatePosition();
  } else this.layer.show();
 };
 q.prototype.clearText = function() {
  "use strict";
  this.layer.getCausalElement().value = "";
 };
 q.prototype.getContext = function() {
  "use strict";
  return this.element.parentNode;
 };
 e.exports = q;
}, null);

__d("TextInputControl", [ "DOMControl", "Event", "Input", "debounce" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 for (var k in g) if (g.hasOwnProperty(k)) m[k] = g[k];
 var l = g === null ? null : g.prototype;
 m.prototype = Object.create(l);
 m.prototype.constructor = m;
 m.__superConstructor__ = g;
 function m(n) {
  "use strict";
  g.call(this, n);
  var o = this.getRoot(), p = j(this.update.bind(this), 0);
  h.listen(o, {
   input: p,
   keydown: p,
   paste: p
  });
 }
 m.prototype.setMaxLength = function(n) {
  "use strict";
  i.setMaxLength(this.getRoot(), n);
  return this;
 };
 m.prototype.getValue = function() {
  "use strict";
  return i.getValue(this.getRoot());
 };
 m.prototype.isEmpty = function() {
  "use strict";
  return i.isEmpty(this.getRoot());
 };
 m.prototype.setValue = function(n) {
  "use strict";
  i.setValue(this.getRoot(), n);
  this.update();
  return this;
 };
 m.prototype.clear = function() {
  "use strict";
  return this.setValue("");
 };
 m.prototype.setPlaceholderText = function(n) {
  "use strict";
  i.setPlaceholder(this.getRoot(), n);
  return this;
 };
 e.exports = m;
}, null);

__d("TextAreaControl", [ "Arbiter", "ArbiterMixin", "CSS", "DOMControl", "Event", "Style", "TextInputControl", "TextMetrics", "classWithMixins", "mixin" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
 b.__markCompiled && b.__markCompiled();
 function q(v, w) {
  return l.getFloat(v, w) || 0;
 }
 var r = o(m, p(h));
 for (var s in r) if (r.hasOwnProperty(s)) u[s] = r[s];
 var t = r === null ? null : r.prototype;
 u.prototype = Object.create(t);
 u.prototype.constructor = u;
 u.__superConstructor__ = r;
 function u(v) {
  "use strict";
  this.autogrow = i.hasClass(v, "uiTextareaAutogrow");
  r.call(this, v);
  this.width = null;
  k.listen(v, "focus", this._handleFocus.bind(this));
 }
 u.prototype.setAutogrow = function(v) {
  "use strict";
  this.autogrow = v;
  return this;
 };
 u.prototype.onupdate = function() {
  "use strict";
  t.onupdate.call(this);
  this.updateHeight();
 };
 u.prototype.updateHeight = function() {
  "use strict";
  if (this.autogrow) {
   var v = this.getRoot();
   if (!this.metrics) this.metrics = new n(v);
   if (typeof this.initialHeight === "undefined") {
    this.isBorderBox = l.get(v, "box-sizing") === "border-box" || l.get(v, "-moz-box-sizing") === "border-box" || l.get(v, "-webkit-box-sizing") === "border-box";
    this.borderBoxOffset = q(v, "padding-top") + q(v, "padding-bottom") + q(v, "border-top-width") + q(v, "border-bottom-width");
    this.initialHeight = v.offsetHeight - this.borderBoxOffset;
   }
   var w = this.metrics.measure(), x = Math.max(this.initialHeight, w.height);
   if (this.isBorderBox) x += this.borderBoxOffset;
   if (x !== this.height) {
    this.height = x;
    l.set(v, "height", x + "px");
    g.inform("reflow");
    this.inform("resize");
   }
  } else if (this.metrics) {
   this.metrics.destroy();
   this.metrics = null;
  }
 };
 u.prototype.resetHeight = function() {
  "use strict";
  this.height = -1;
  this.update();
 };
 u.prototype._handleFocus = function() {
  "use strict";
  this.width = null;
 };
 u.getInstance = function(v) {
  "use strict";
  return j.getInstance(v) || new u(v);
 };
 e.exports = u;
}, null);

__d("StickyPlaceholderInput", [ "Event", "CSS", "DOM", "Input", "Parent", "emptyFunction", "getElementText" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
 b.__markCompiled && b.__markCompiled();
 function n(r) {
  return k.byClass(r, "uiStickyPlaceholderInput");
 }
 function o(r) {
  return i.scry(r, ".placeholder")[0];
 }
 function p(r) {
  r = r || window.event;
  var s = r.target || r.srcElement;
  if (i.isNodeOfType(s, [ "input", "textarea" ])) {
   var t = n(s);
   if (t) setTimeout(function() {
    h.conditionClass(t, "uiStickyPlaceholderEmptyInput", !s.value.length);
   }, 0);
  }
 }
 var q = {
  init: function() {
   q.init = l;
   g.listen(document.documentElement, {
    keydown: p,
    paste: p,
    focusout: p
   });
  },
  registerInput: function(r) {
   q.init();
   var s = r.getAttribute("placeholder") || "";
   if (s.length) if (document.activeElement === r) {
    var t = g.listen(r, "blur", function() {
     q.manipulateInput(r, s);
     t.remove();
    });
   } else q.manipulateInput(r, s);
  },
  manipulateInput: function(r, s) {
   var t = i.create("div", {
    className: "placeholder",
    "aria-hidden": "true"
   }, s), u = i.create("div", {
    className: "uiStickyPlaceholderInput"
   }, t);
   if (i.isNodeOfType(r, "textarea")) h.addClass(u, "uiStickyPlaceholderTextarea");
   g.listen(t, "click", function() {
    r.focus();
   });
   if (r.value === s) r.value = "";
   r.setAttribute("placeholder", "");
   i.replace(r, u);
   i.appendContent(u, r);
   h.conditionClass(u, "uiStickyPlaceholderEmptyInput", !r.value.length);
  },
  setPlaceholderText: function(r, s) {
   var t = n(r);
   if (!t) {
    j.setPlaceholder(r, s);
   } else {
    var u = o(t);
    u && i.setContent(u, s);
   }
  },
  getPlaceholderText: function(r) {
   var s = n(r), t = o(s);
   return t && m(t);
  },
  update: function(r) {
   var s = n(r);
   if (s) h.conditionClass(s, "uiStickyPlaceholderEmptyInput", !r.value.length);
  },
  getVisibleText: function(r) {
   var s = n(r);
   if (h.hasClass(s, "uiStickyPlaceholderEmptyInput")) {
    var t = o(s);
    return t && m(t);
   } else return r.value;
  }
 };
 e.exports = q;
}, null);

__d("TypeaheadCore", [ "Arbiter", "ArbiterMixin", "CSS", "DOM", "Event", "Focus", "Input", "InputSelection", "Keys", "StickyPlaceholderInput", "UserAgent_DEPRECATED", "bind", "copyProperties", "emptyFunction", "mixin" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u) {
 b.__markCompiled && b.__markCompiled();
 var v = u(h);
 for (var w in v) if (v.hasOwnProperty(w)) y[w] = v[w];
 var x = v === null ? null : v.prototype;
 y.prototype = Object.create(x);
 y.prototype.constructor = y;
 y.__superConstructor__ = v;
 function y(z) {
  "use strict";
  s(this, z);
 }
 y.prototype.init = function(z, aa, ba) {
  "use strict";
  this.init = t;
  this.data = z;
  this.view = aa;
  this.root = ba;
  this.initInput();
  this.inputWrap = j.find(ba, "div.wrap");
  this.hiddenInput = j.find(ba, "input.hiddenInput");
  this.value = "";
  this.nextQuery = null;
  this.selectedText = null;
  if (this.setValueOnSelect && i.hasClass(this.inputWrap, "selected")) this.selectedText = this.getValue();
  this.initView();
  this.initData();
  this.initEvents();
  this.initToggle();
  this._exclusions = [];
 };
 y.prototype.initInput = function() {
  "use strict";
  this.element = j.find(this.root, ".textInput");
  var z = j.scry(this.element, "input")[0];
  if (z) this.element = z;
 };
 y.prototype.initView = function() {
  "use strict";
  this.view.subscribe("highlight", l.set.bind(null, this.element));
  this.view.subscribe("select", function(z, aa) {
   this.select(aa.selected);
  }.bind(this));
  this.view.subscribe("afterSelect", function() {
   this.afterSelect();
  }.bind(this));
 };
 y.prototype.initData = function() {
  "use strict";
  this.data.subscribe("notify", function(z, aa) {
   if (this.root.id == aa.rootid && !this.element.disabled && aa.value == this.getValue()) this.view.render(aa.value, aa.results, aa.isAsync);
  }.bind(this));
  this.data.subscribe("respond", function(z, aa) {
   if (aa.forceDisplay || aa.value == this.getValue() && !this.element.disabled && (this.element.getAttribute("singlestate") !== "true" || aa.nullState)) this.view.render(aa.value, aa.results, aa.isAsync);
  }.bind(this));
  this.data.subscribe("activity", function(z, aa) {
   this.fetching = aa.activity;
   if (!this.fetching) this.nextQuery && this.performQuery();
   if (this.loading != this.fetching) {
    this.loading = this.fetching;
    this.inform("loading", {
     loading: this.loading
    });
   }
  }.bind(this));
 };
 y.prototype.initEvents = function() {
  "use strict";
  k.listen(this.view.getElement(), {
   mouseup: this.viewMouseup.bind(this),
   mousedown: this.viewMousedown.bind(this)
  });
  var z = {
   blur: r(this, "blur"),
   focus: r(this, "focus"),
   click: r(this, "click"),
   keyup: r(this, "keyup"),
   keydown: r(this, "keydown"),
   keypress: r(this, "keypress")
  };
  if (q.firefox()) z.input = z.keyup;
  k.listen(this.element, z);
 };
 y.prototype.initToggle = function() {
  "use strict";
  this.subscribe("blur", this.view.hide.bind(this.view));
  this.subscribe("focus", this.view.show.bind(this.view));
 };
 y.prototype.viewMousedown = function() {
  "use strict";
  this.selecting = true;
 };
 y.prototype.viewMouseup = function() {
  "use strict";
  this.selecting = false;
 };
 y.prototype.blur = function() {
  "use strict";
  if (this.selecting) {
   this.selecting = false;
   return;
  }
  this.inform("blur");
 };
 y.prototype.click = function() {
  "use strict";
  var z = n.get(this.element);
  if (z.start == z.end) this.element.select();
  this.inform("click");
 };
 y.prototype.focus = function() {
  "use strict";
  this.checkValue();
  this.inform("focus");
 };
 y.prototype.keyup = function() {
  "use strict";
  if (this.resetOnKeyup && !this.getValue()) this.view.reset();
  this.checkValue();
  if (this.getValue().length === 0) this.inform("change", null);
 };
 y.prototype.keydown = function(event) {
  "use strict";
  if (!this.view.isVisible() || this.view.isEmpty()) {
   setTimeout(this.checkValue.bind(this), 0);
   return;
  }
  switch (k.getKeyCode(event)) {
  case o.TAB:
   this.handleTab(event);
   return;

  case o.UP:
   this.view.prev();
   break;

  case o.DOWN:
   this.view.next();
   break;

  case o.ESC:
   this.view.reset();
   break;

  default:
   setTimeout(this.checkValue.bind(this), 0);
   return;
  }
  event.kill();
 };
 y.prototype.keypress = function(event) {
  "use strict";
  if (this.view.getSelection() && k.getKeyCode(event) == o.RETURN) {
   this.view.select();
   event.kill();
  }
 };
 y.prototype.handleTab = function(event) {
  "use strict";
  if (this.preventFocusChangeOnTab) if (this.view.getSelection()) {
   event.kill();
  } else event.prevent();
  this.view.select();
 };
 y.prototype.select = function(z) {
  "use strict";
  if (z && this.setValueOnSelect) {
   var aa = z.orig_text || z.text;
   this.setValue(aa);
   this.setHiddenValue(z.uid);
   this.selectedText = aa;
   i.addClass(this.inputWrap, "selected");
  }
 };
 y.prototype.afterSelect = function() {
  "use strict";
  this.keepFocused ? l.set(this.element) : this.element.blur();
  this.resetOnSelect ? this.reset() : this.view.reset();
 };
 y.prototype.unselect = function() {
  "use strict";
  if (this.setValueOnSelect) {
   this.selectedText = null;
   i.removeClass(this.inputWrap, "selected");
  }
  this.setHiddenValue();
  this.inform("unselect", this);
 };
 y.prototype.setEnabled = function(z) {
  "use strict";
  var aa = z === false;
  this.element.disabled = aa;
  i.conditionClass(this.root, "uiTypeaheadDisabled", aa);
 };
 y.prototype.reset = function() {
  "use strict";
  this.unselect();
  this.setValue();
  !this.keepFocused && m.reset(this.element);
  this.view.reset();
  this.inform("reset");
 };
 y.prototype.getElement = function() {
  "use strict";
  return this.element;
 };
 y.prototype.setExclusions = function(z) {
  "use strict";
  this._exclusions = z.map(String);
 };
 y.prototype.getExclusions = function() {
  "use strict";
  return this._exclusions;
 };
 y.prototype.setValue = function(z) {
  "use strict";
  this.value = this.nextQuery = z || "";
  m.setValue(this.element, this.value);
  p.update(this.element);
  this.inform("change", z);
 };
 y.prototype.setHiddenValue = function(z) {
  "use strict";
  this.hiddenInput.value = z || z === 0 ? z : "";
  g.inform("Form/change", {
   node: this.hiddenInput
  });
 };
 y.prototype.getValue = function() {
  "use strict";
  return m.getValue(this.element);
 };
 y.prototype.getHiddenValue = function() {
  "use strict";
  return this.hiddenInput.value || "";
 };
 y.prototype.checkValue = function() {
  "use strict";
  var z = this.getValue();
  if (z == this.value) return;
  if (this.selectedText && this.selectedText != z) this.unselect();
  var aa = Date.now(), ba = aa - this.time;
  this.time = aa;
  this.value = this.nextQuery = z;
  this.performQuery(ba);
 };
 y.prototype.performQuery = function(z) {
  "use strict";
  if (this.selectedText) return;
  z = z || 0;
  if (this.fetching && z < this.queryTimeout) {
   this.data.query(this.nextQuery, true, this._exclusions, z);
  } else {
   this.data.query(this.nextQuery, false, this._exclusions, z);
   this.nextQuery = null;
  }
 };
 y.prototype.updateHeight = function() {
  "use strict";
 };
 s(y.prototype, {
  events: [ "blur", "focus", "click", "unselect", "loading" ],
  keepFocused: true,
  resetOnSelect: false,
  resetOnKeyup: true,
  setValueOnSelect: false,
  queryTimeout: 250,
  preventFocusChangeOnTab: false
 });
 e.exports = y;
}, null);

__d("PagesBanzaiLogger", [ "Banzai", "Event", "Run" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 var j = "pages_client_logging", k = "pages_client_logging", l = {
  VITAL_WAIT: g.VITAL_WAIT,
  registerLogEvent: function(m, n, o) {
   var p = h.listen(m, "click", function(event) {
    l.logData(n, o);
   });
   i.onLeave(function() {
    p.remove();
   });
  },
  logData: function(m, n) {
   if (g.isEnabled(k)) {
    var o = {};
    if (n) o.delay = n;
    g.post(j, m, o);
   }
  }
 };
 e.exports = l;
}, null);

__d("TypeaheadBestName", [ "FamilyMentionsData", "TokenizeUtil", "copyProperties" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 function j(k) {
  "use strict";
  this._typeahead = k;
 }
 j.prototype.enable = function() {
  "use strict";
  var k = this._typeahead.getView(), l = this._getAvailableAlternateNameFields();
  this._subscription = k.subscribe("beforeRender", function(m, n) {
   var o = n.value;
   for (var p = 0; p < n.results.length; ++p) {
    var q = n.results[p], r = this._getNameToDisplay(q, o, l);
    if (r !== null) {
     q.text = r;
     if (q.hasOwnProperty("default_name") && q.text !== q.default_name) {
      q.subtext = q.default_name;
     } else q.subtext = null;
    }
   }
  }.bind(this));
 };
 j.prototype.disable = function() {
  "use strict";
  this._typeahead.getView().unsubscribe(this._subscription);
  this._subscription = null;
 };
 j.prototype._getNameToDisplay = function(k, l, m) {
  "use strict";
  if (k.hasOwnProperty("default_name") && h.isQueryMatch(l, k.default_name)) return k.default_name;
  for (var n = 0; n < m.length; n++) {
   var o = k[m[n]];
   if (o == void 0) continue;
   for (var p = 0; p < o.length; p++) {
    var q = o[p];
    if (h.isQueryMatch(l, q)) return q;
   }
  }
  if (k.hasOwnProperty("default_name")) return k.default_name;
  return null;
 };
 j.prototype._getAvailableAlternateNameFields = function() {
  "use strict";
  var k = [ "alternate_names" ];
  if (g.allowFamilyNames) k.push("family_names");
  return k;
 };
 i(j.prototype, {
  _subscription: null
 });
 e.exports = j;
}, null);

__d("legacy:BestNameTypeaheadBehavior", [ "TypeaheadBestName" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 if (!a.TypeaheadBehaviors) a.TypeaheadBehaviors = {};
 a.TypeaheadBehaviors.buildBestAvailableNames = function(h) {
  h.enableBehavior(g);
 };
}, 3);

__d("CompactTypeaheadRenderer", [ "BadgeHelper", "DOM", "TypeaheadFacepile" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 function j(k, l) {
  var m = [];
  if (k.xhp) return h.create("li", {
   className: "raw"
  }, k.xhp);
  var n = k.photos || k.photo;
  if (n) {
   if (n instanceof Array) {
    n = i.render(n);
   } else n = h.create("img", {
    alt: "",
    src: n
   });
   m.push(n);
  }
  var o = k.debug_info;
  if (o) m.push(h.create("span", {
   className: "debugInfo"
  }, o));
  if (k.text) {
   var p = [ k.text ];
   if (k.is_verified) {
    p.push(g.renderBadge("xsmall", "verified"));
   } else if (k.is_work_user) p.push(g.renderBadge("xsmall", "work"));
   m.push(h.create("span", {
    className: "text"
   }, p));
  }
  var q = k.subtext, r = k.category;
  if (q || r) {
   var s = [];
   q && s.push(q);
   q && r && s.push(" · ");
   r && s.push(r);
   m.push(h.create("span", {
    className: "subtext"
   }, s));
  }
  var t = h.create("li", {
   className: k.type || ""
  }, m);
  if (k.text) {
   t.setAttribute("title", k.text);
   t.setAttribute("aria-label", k.text);
  }
  return t;
 }
 j.className = "compact";
 e.exports = j;
}, null);