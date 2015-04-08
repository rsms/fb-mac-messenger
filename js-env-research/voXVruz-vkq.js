if (self.CavalryLogger) {
 CavalryLogger.start_js([ "MVeEp" ]);
}

__d("FBRTCCallConstants", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 e.exports = {
  FBRTCCallConnectionType: {
   MISSED_CALL: 4,
   CONNECTED_CALL: 5
  },
  FBRTCCallType: {
   VOICE_CALL: 1,
   VIDEO_CALL: 2
  }
 };
}, null);

__d("StarsInput.react", [ "React", "TooltipLink.react", "cx", "fbt" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 var k = g, l = k.PropTypes, m = g.createClass({
  displayName: "StarsInput",
  propTypes: {
   allowMultipleSubmissions: l.bool,
   onClick: l.func.isRequired,
   starLabels: l.array
  },
  getDefaultProps: function() {
   return {
    allowMultipleSubmissions: false,
    starLabels: [ j._("Poor"), j._("Fair"), j._("Good"), j._("Very Good"), j._("Excellent") ]
   };
  },
  getInitialState: function() {
   return {
    starRating: 0,
    starsShown: 0,
    canUpdate: true
   };
  },
  _getStarRating: function(n) {
   return parseInt(n.split(".").pop(), 10) + 1;
  },
  onMouseEnter: function(event) {
   if (this.state.canUpdate) this.setState({
    starsShown: this._getStarRating(event.dispatchMarker)
   });
  },
  onMouseLeave: function(event) {
   if (this.state.canUpdate) {
    var n = this.state.starRating;
    this.setState({
     starsShown: n
    });
   }
  },
  onClick: function(event) {
   if (this.state.canUpdate) {
    var n = this._getStarRating(event.dispatchMarker);
    this.setState({
     starRating: n,
     starsShown: n,
     canUpdate: this.props.allowMultipleSubmissions
    });
    this.props.onClick(n);
   }
  },
  getStars: function() {
   var n = this.props.starLabels.length, o = [];
   for (var p = 0; p < n; p++) o.push(g.createElement(h, {
    className: "mls" + (" " + "_22mm") + (p >= this.state.starsShown ? " " + "_22mn" : "") + (p < this.state.starsShown ? " " + "_22mo" : "") + (!this.state.canUpdate ? " " + "_1g87" : ""),
    tooltip: this.props.starLabels[p],
    onMouseEnter: this.onMouseEnter,
    onMouseLeave: this.onMouseLeave,
    onClick: this.onClick,
    position: "above",
    alignH: "center"
   }));
   return o;
  },
  render: function() {
   return g.createElement("div", null, this.getStars());
  }
 });
 e.exports = m;
}, null);

__d("AbstractPopoverButton.react", [ "React", "URI", "cloneWithProps", "cx", "joinClasses", "merge" ], function(a, b, c, d, e, f, g, h, i, j, k, l) {
 b.__markCompiled && b.__markCompiled();
 var m = g, n = m.PropTypes, o = g.createClass({
  displayName: "AbstractPopoverButton",
  propTypes: {
   config: n.object.isRequired,
   haschevron: n.bool,
   maxwidth: n.number
  },
  getDefaultProps: function() {
   return {
    haschevron: true
   };
  },
  render: function() {
   var p = this.props.config, q = {}, r = p.defaultMaxWidth;
   if (typeof this.props.maxwidth !== "undefined") r = this.props.maxwidth;
   var s = null;
   if (r) {
    var t = this.props.haschevron ? r - p.chevronWidth : r;
    if (this.props.label) s = {
     maxWidth: t + "px"
    };
    q.style = l(q.style, {
     maxWidth: r + "px"
    });
   }
   q.image = null;
   var u = null;
   if (this.props.image && this.props.label) {
    u = i(this.props.image, {
     className: "_3-8_"
    });
   } else if (this.props.image) u = this.props.image;
   if (u || this.props.label) q.label = g.createElement("span", {
    className: "_55pe",
    style: s
   }, u, this.props.label);
   if (this.props.haschevron) q.imageRight = p.chevron;
   q.className = k(p.button.props.className, "_2agf");
   q.href = h("#");
   return i(p.button, q);
  }
 });
 e.exports = o;
}, null);

__d("ContextualLayerHideOnScroll", [ "Event", "copyProperties" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 function i(j) {
  "use strict";
  this._layer = j;
 }
 i.prototype.enable = function() {
  "use strict";
  this._subscriptions = [ this._layer.subscribe("contextchange", this._handleContextChange.bind(this)), this._layer.subscribe("show", this.attach.bind(this)), this._layer.subscribe("hide", this.detach.bind(this)) ];
 };
 i.prototype.disable = function() {
  "use strict";
  while (this._subscriptions.length) this._subscriptions.pop().unsubscribe();
  this.detach();
 };
 i.prototype.attach = function() {
  "use strict";
  if (this._listener) return;
  var j = this._layer.getContextScrollParent();
  if (j === window) return;
  this._listener = g.listen(j, "scroll", this._layer.hide.bind(this._layer));
 };
 i.prototype.detach = function() {
  "use strict";
  this._listener && this._listener.remove();
  this._listener = null;
 };
 i.prototype._handleContextChange = function() {
  "use strict";
  this.detach();
  if (this._layer.isShown()) this.attach();
 };
 h(i.prototype, {
  _subscriptions: []
 });
 e.exports = i;
}, null);

__d("curry", [ "bind" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 var h = g(null, g, null);
 e.exports = h;
}, null);

__d("ParameterizedPopover", [ "Arbiter", "ArbiterMixin", "CSS", "DataStore", "Event", "Focus", "Keys", "KeyStatus", "LayerHideOnEscape", "Toggler", "copyProperties", "curry", "mixin" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
 b.__markCompiled && b.__markCompiled();
 p.subscribe([ "show", "hide" ], function(x, y) {
  var z = j.get(y.getActive(), "Popover");
  if (z) if (x === "show") {
   z.showLayer();
  } else z.hideLayer();
 });
 var t = s(h);
 for (var u in t) if (t.hasOwnProperty(u)) w[u] = t[u];
 var v = t === null ? null : t.prototype;
 w.prototype = Object.create(v);
 w.prototype.constructor = w;
 w.__superConstructor__ = t;
 function w(x, y, z, aa) {
  "use strict";
  this._root = x;
  this._triggerElem = y;
  this._behaviors = z;
  this._config = aa || {};
  this._disabled = !!this._config.disabled;
  this._listeners = [];
  if (!this._disabled && (y.nodeName !== "A" || y.rel !== "toggle")) this._setupClickListener();
  this._setupKeyListener();
  y.setAttribute("role", "button");
  j.set(x, "Popover", this);
  if (p.getActive() === x) this.showLayer();
 }
 w.prototype.ensureInit = function() {
  "use strict";
  if (!this._layer) this._init();
 };
 w.prototype.showLayer = function() {
  "use strict";
  this.ensureInit();
  this._layer.show();
  p.show(this._root);
  i.addClass(this._root, "selected");
  this.inform("show");
  this._triggerElem.setAttribute("aria-expanded", "true");
 };
 w.prototype.getContentRoot = function() {
  "use strict";
  return this._root;
 };
 w.prototype.getLayer = function() {
  "use strict";
  return this._layer;
 };
 w.prototype.hideLayer = function() {
  "use strict";
  this._layer.hide();
  this._triggerElem.setAttribute("aria-expanded", "false");
 };
 w.prototype.isShown = function() {
  "use strict";
  return this._layer && this._layer.isShown();
 };
 w.prototype.setLayerContent = function(x) {
  "use strict";
  this.ensureInit();
  if (this._layer.setContent) this._layer.setContent(x);
 };
 w.prototype._init = function() {
  "use strict";
  var x = this._config.layer;
  x.enableBehaviors([ o ]);
  p.createInstance(x.getRoot()).setSticky(false);
  x.subscribe("hide", this._onLayerHide.bind(this));
  this._behaviors && x.enableBehaviors(this._behaviors);
  this._layer = x;
  this.inform("init", null, g.BEHAVIOR_PERSISTENT);
 };
 w.prototype._onLayerHide = function() {
  "use strict";
  p.hide(this._root);
  i.removeClass(this._root, "selected");
  this.inform("hide");
  if (n.getKeyDownCode() === m.ESC) l.set(this._triggerElem);
 };
 w.prototype.enable = function() {
  "use strict";
  if (!this._disabled) return;
  this._setupClickListener();
  this._setupKeyListener();
  this._disabled = false;
 };
 w.prototype.disable = function() {
  "use strict";
  if (this._disabled) return;
  if (this.isShown()) this.hideLayer();
  while (this._listeners.length) this._listeners.pop().remove();
  if (this._triggerElem.getAttribute("rel") === "toggle") this._triggerElem.removeAttribute("rel");
  this._disabled = true;
 };
 w.prototype._setupClickListener = function() {
  "use strict";
  this._listeners.push(k.listen(this._triggerElem, "click", r(p.bootstrap, this._triggerElem)));
 };
 w.prototype._setupKeyListener = function() {
  "use strict";
  this._listeners.push(k.listen(this._triggerElem, "keydown", this._handleKeyEvent.bind(this)));
 };
 w.prototype._handleKeyEvent = function(event) {
  "use strict";
  if (event.getModifiers().any) return;
  var x = k.getKeyCode(event);
  switch (x) {
  case m.SPACE:
  case m.DOWN:
  case m.UP:
   if (x === m.SPACE || !this.isShown()) p.bootstrap(this._triggerElem);
   break;

  default:
   return;
  }
  event.prevent();
 };
 w.prototype.destroy = function() {
  "use strict";
  j.remove(this._root, "Popover");
 };
 q(w.prototype, {
  _layer: null
 });
 e.exports = w;
}, null);

__d("Popover", [ "ContextualLayer", "ContextualLayerHideOnScroll", "DOM", "ParameterizedPopover" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 for (var k in j) if (j.hasOwnProperty(k)) m[k] = j[k];
 var l = j === null ? null : j.prototype;
 m.prototype = Object.create(l);
 m.prototype.constructor = m;
 m.__superConstructor__ = j;
 function m() {
  "use strict";
  if (j !== null) j.apply(this, arguments);
 }
 m.prototype._init = function() {
  "use strict";
  var n = new g({
   context: this._triggerElem,
   position: "below",
   arrowDimensions: {
    offset: 12,
    length: 16
   }
  }, i.create("div"));
  n.enableBehaviors([ h ]);
  this._config.layer = n;
  if (this._config.alignh) n.setAlignment(this._config.alignh);
  if (this._config.layer_content) n.setContent(this._config.layer_content);
  if (this._config.position) n.setPosition(this._config.position);
  l._init.call(this);
 };
 e.exports = m;
}, null);

__d("PopoverMenu", [ "Arbiter", "ArbiterMixin", "ARIA", "BehaviorsMixin", "Event", "Focus", "Keys", "KeyStatus", "copyProperties", "mixin" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
 b.__markCompiled && b.__markCompiled();
 var q = p(h, j);
 for (var r in q) if (q.hasOwnProperty(r)) t[r] = q[r];
 var s = q === null ? null : q.prototype;
 t.prototype = Object.create(s);
 t.prototype.constructor = t;
 t.__superConstructor__ = q;
 function t(u, v, w, x) {
  "use strict";
  this._popover = u;
  this._triggerElem = v;
  this._initialMenu = w;
  u.subscribe("init", this._onLayerInit.bind(this));
  u.subscribe("show", this._onPopoverShow.bind(this));
  u.subscribe("hide", this._onPopoverHide.bind(this));
  k.listen(this._triggerElem, "keydown", this._handleKeyEventOnTrigger.bind(this));
  x && this.enableBehaviors(x);
 }
 t.prototype.getContentRoot = function() {
  "use strict";
  return this._popover.getContentRoot();
 };
 t.prototype.setMenu = function(u) {
  "use strict";
  this._menu = u;
  var v = u.getRoot();
  this._popover.setLayerContent(v);
  u.subscribe("done", this._onMenuDone.bind(this));
  if (this._popoverShown) this._menu.onShow();
  i.owns(this._triggerElem, v);
  this.inform("setMenu", null, g.BEHAVIOR_PERSISTENT);
 };
 t.prototype.getPopover = function() {
  "use strict";
  return this._popover;
 };
 t.prototype.getTriggerElem = function() {
  "use strict";
  return this._triggerElem;
 };
 t.prototype.getInitialMenu = function() {
  "use strict";
  return this._initialMenu;
 };
 t.prototype.getMenu = function() {
  "use strict";
  return this._menu;
 };
 t.prototype._onLayerInit = function() {
  "use strict";
  this.setMenu(this._initialMenu);
  this._popover.getLayer().subscribe("key", this._handleKeyEvent.bind(this));
 };
 t.prototype._onPopoverShow = function() {
  "use strict";
  if (this._menu) this._menu.onShow();
  this._popoverShown = true;
 };
 t.prototype._onPopoverHide = function() {
  "use strict";
  if (this._menu) this._menu.onHide();
  this._popoverShown = false;
 };
 t.prototype._handleKeyEvent = function(u, v) {
  "use strict";
  var w = k.getKeyCode(v);
  if (w === m.TAB) {
   this._popover.hideLayer();
   l.set(this._triggerElem);
   return;
  }
  if (v.getModifiers().any) return;
  switch (w) {
  case m.RETURN:
   return;

  default:
   if (this._menu.handleKeydown(w, v) === false) {
    this._menu.blur();
    this._menu.handleKeydown(w, v);
   }
   break;
  }
  v.prevent();
 };
 t.prototype._handleKeyEventOnTrigger = function(u) {
  "use strict";
  var v = k.getKeyCode(u), w = String.fromCharCode(v).toLowerCase();
  if (/^\w$/.test(w)) {
   this._popover.showLayer();
   this._menu.blur();
   if (this._menu.handleKeydown(v, u) === false) {
    this._popover.hideLayer();
    l.set(this._triggerElem);
   }
  }
 };
 t.prototype._onMenuDone = function(u) {
  "use strict";
  var v = n.isKeyDown();
  setTimeout(function() {
   this._popover.hideLayer();
   if (v) l.set(this._triggerElem);
  }.bind(this), 0);
 };
 t.prototype.enable = function() {
  "use strict";
  this._popover.enable();
 };
 t.prototype.disable = function() {
  "use strict";
  this._popover.disable();
 };
 o(t.prototype, {
  _popoverShown: false
 });
 e.exports = t;
}, null);

__d("PopoverMenu.react", [ "CSS", "InlineBlock.react", "Popover", "PopoverMenu", "React", "ReactElement", "SubscriptionsHandler", "cx", "joinClasses", "areEqual", "setImmediate" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
 b.__markCompiled && b.__markCompiled();
 var r = k, s = r.PropTypes, t = k.createClass({
  displayName: "ReactPopoverMenu",
  statics: {
   getFirstChild: function(u) {
    var v = u.children;
    return Array.isArray(v) ? v[0] : v;
   },
   getButtonSize: function(u) {
    var v = t.getFirstChild(u);
    return v && v.type.getButtonSize(v.props);
   }
  },
  propTypes: {
   alignh: s.oneOf([ "left", "center", "right" ]),
   alignv: s.oneOf([ "baseline", "bottom", "middle", "top" ]),
   position: s.oneOf([ "above", "below", "left", "right" ]),
   layerBehaviors: s.array,
   menu: s.object,
   disabled: s.bool,
   open: s.bool
  },
  getDefaultProps: function() {
   return {
    alignv: "middle"
   };
  },
  _menuSubscriptions: null,
  componentDidMount: function() {
   var u = k.findDOMNode(this.refs.root), v = u.firstChild;
   g.addClass(v, "_p");
   this._popover = new i(u, v, this.props.layerBehaviors, {
    alignh: this.props.alignh,
    position: this.props.position,
    disabled: this.props.disabled
   });
   this._popoverMenu = new j(this._popover, v, this._createMenu(this.props.menu), this.props.behaviors);
  },
  componentDidUpdate: function(u) {
   if (!p(u.menu, this.props.menu)) q(this._recreateMenu);
   if (this.props.alignh !== u.alignh) this._popoverMenu.getPopover().getLayer().setAlignment(this.props.alignh);
   if (this.props.disabled !== u.disabled) if (this.props.disabled) {
    this._popoverMenu.disable();
   } else this._popoverMenu.enable();
  },
  _recreateMenu: function() {
   if (this._menuSubscriptions) {
    this._menuSubscriptions.release();
    this._menuSubscriptions = null;
   }
   this._unmountCurrentMenuItems();
   this._popoverMenu.setMenu(this._createMenu(this.props.menu));
  },
  render: function() {
   var u = k.Children.map(this.props.children, function(v, w) {
    if (w === 0) {
     return l.cloneAndReplaceProps(v, Object.assign({}, v.props, {
      className: o(v.props.className, "_p")
     }));
    } else return v;
   });
   return k.createElement(h, k.__spread({}, this.props, {
    className: o(this.props.className, "uiPopover"),
    ref: "root",
    disabled: null
   }), u);
  },
  componentWillUnmount: function() {
   this.hidePopover();
   if (this._menuSubscriptions) {
    this._menuSubscriptions.release();
    this._menuSubscriptions = null;
   }
  },
  _createMenu: function(u) {
   var v = u.props, w = new u.type(v);
   this._menuSubscriptions = new m();
   if (v.onItemClick) this._menuSubscriptions.addSubscriptions(w.subscribe("itemclick", v.onItemClick));
   if (v.onItemFocus) this._menuSubscriptions.addSubscriptions(w.subscribe("focus", v.onItemFocus));
   if (v.onItemBlur) this._menuSubscriptions.addSubscriptions(w.subscribe("blur", v.onItemBlur));
   if (v.onChange) this._menuSubscriptions.addSubscriptions(w.subscribe("change", v.onChange));
   if (this.props.onShow) this._menuSubscriptions.addSubscriptions(this._popover.subscribe("show", this.props.onShow));
   if (this.props.onHide) this._menuSubscriptions.addSubscriptions(this._popover.subscribe("hide", this.props.onHide));
   return w;
  },
  getMenu: function() {
   return this._popoverMenu.getMenu();
  },
  showPopover: function(u) {
   this._popover.showLayer();
   if (u) {
    var v = this._popoverMenu.getMenu();
    v.blur();
    v.focusAnItem(u);
   }
  },
  hidePopover: function() {
   var u = this._popover;
   if (u && u.isShown()) u.hideLayer();
  },
  getFocusedItem: function() {
   var u = this._popoverMenu.getMenu();
   return u.getFocusedItem();
  },
  _unmountCurrentMenuItems: function() {
   var u = this.getMenu();
   u && u.forEachItem(function(v) {
    var w = v.getRoot().firstElementChild;
    w && k.unmountComponentAtNode(w);
   });
  }
 });
 e.exports = t;
}, null);

__d("PopoverMenuInterface", [ "ArbiterMixin", "copyProperties", "emptyFunction", "mixin" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 var k = j(g);
 for (var l in k) if (k.hasOwnProperty(l)) n[l] = k[l];
 var m = k === null ? null : k.prototype;
 n.prototype = Object.create(m);
 n.prototype.constructor = n;
 n.__superConstructor__ = k;
 function n() {
  "use strict";
 }
 n.prototype.done = function() {
  "use strict";
  this.inform("done");
 };
 h(n.prototype, {
  getRoot: i,
  onShow: i,
  onHide: i,
  focusAnItem: i.thatReturnsFalse,
  blur: i,
  handleKeydown: i.thatReturnsFalse
 });
 e.exports = n;
}, null);

__d("SimpleDrag", [ "Event", "ArbiterMixin", "UserAgent_DEPRECATED", "Vector", "copyProperties", "emptyFunction" ], function(a, b, c, d, e, f, g, h, i, j, k, l) {
 b.__markCompiled && b.__markCompiled();
 function m(n) {
  this.minDragDistance = 0;
  g.listen(n, "mousedown", this._start.bind(this));
 }
 k(m.prototype, h, {
  setMinDragDistance: function(n) {
   this.minDragDistance = n;
  },
  _start: function(event) {
   var n = false, o = true, p = null;
   if (this.inform("mousedown", event)) o = false;
   if (this.minDragDistance) {
    p = j.getEventPosition(event);
   } else {
    n = true;
    var q = this.inform("start", event);
    if (q === true) {
     o = false;
    } else if (q === false) {
     n = false;
     return;
    }
   }
   var r = i.ie() < 9 ? document.documentElement : window, s = g.listen(r, {
    selectstart: o ? g.prevent : l,
    mousemove: function(event) {
     if (!n) {
      var t = j.getEventPosition(event);
      if (p.distanceTo(t) < this.minDragDistance) return;
      n = true;
      if (this.inform("start", event) === false) {
       n = false;
       return;
      }
     }
     this.inform("update", event);
    }.bind(this),
    mouseup: function(event) {
     for (var t in s) s[t].remove();
     if (n) {
      this.inform("end", event);
     } else this.inform("click", event);
    }.bind(this)
   });
   o && event.prevent();
  }
 });
 e.exports = m;
}, null);

__d("ScrollableArea", [ "Animation", "ArbiterMixin", "BrowserSupport", "CSS", "DataStore", "DOM", "Event", "Parent", "Run", "SimpleDrag", "Style", "UserAgent_DEPRECATED", "Vector", "throttle", "mixin" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u) {
 b.__markCompiled && b.__markCompiled();
 var v = 12, w = u(h);
 for (var x in w) if (w.hasOwnProperty(x)) z[x] = w[x];
 var y = w === null ? null : w.prototype;
 z.prototype = Object.create(y);
 z.prototype.constructor = z;
 z.__superConstructor__ = w;
 function z(aa, ba) {
  "use strict";
  if (!aa) return;
  ba = ba || {};
  this._elem = aa;
  this._wrap = l.find(aa, "div.uiScrollableAreaWrap");
  this._body = l.find(this._wrap, "div.uiScrollableAreaBody");
  this._content = l.find(this._body, "div.uiScrollableAreaContent");
  this._track = l.find(aa, "div.uiScrollableAreaTrack");
  this._gripper = l.find(this._track, "div.uiScrollableAreaGripper");
  this._options = ba;
  this._throttledComputeHeights = t.withBlocking(this._computeHeights, 250, this);
  this.throttledAdjustGripper = t.withBlocking(this.adjustGripper, 250, this);
  this._throttledShowGripperAndShadows = t.withBlocking(this._showGripperAndShadows, 250, this);
  this._throttledRespondMouseMove = t(this._respondMouseMove, 250, this);
  setTimeout(this.adjustGripper.bind(this), 0);
  this._listeners = [ m.listen(this._wrap, "scroll", this._handleScroll.bind(this)), m.listen(aa, "mousemove", this._handleMouseMove.bind(this)), m.listen(this._track, "click", this._handleClickOnTrack.bind(this)) ];
  if (i.hasPointerEvents()) this._listeners.push(m.listen(aa, "mousedown", this._handleClickOnTrack.bind(this)));
  if (ba.fade !== false) {
   this._listeners.push(m.listen(aa, "mouseenter", this._handleMouseEnter.bind(this)), m.listen(aa, "mouseleave", this._handleMouseLeave.bind(this)), m.listen(aa, "focusin", this.showScrollbar.bind(this, false)), m.listen(aa, "focusout", this.hideScrollbar.bind(this)));
  } else if (i.hasPointerEvents()) this._listeners.push(m.listen(aa, "mouseleave", j.removeClass.bind(null, aa, "uiScrollableAreaTrackOver")));
  if (r.webkit() || r.chrome()) {
   this._listeners.push(m.listen(aa, "mousedown", function() {
    var ca = m.listen(window, "mouseup", function() {
     if (aa.scrollLeft) aa.scrollLeft = 0;
     ca.remove();
    });
   }));
  } else if (r.firefox()) this._wrap.addEventListener("DOMMouseScroll", function(event) {
   event.axis === event.HORIZONTAL_AXIS && event.preventDefault();
  }, false);
  this.initDrag();
  k.set(this._elem, "ScrollableArea", this);
  if (!ba.persistent) o.onLeave(this.destroy.bind(this));
  if (ba.shadow !== false) j.addClass(this._elem, "uiScrollableAreaWithShadow");
 }
 z.prototype.getElement = function() {
  "use strict";
  return this._elem;
 };
 z.prototype.initDrag = function() {
  "use strict";
  var aa = i.hasPointerEvents(), ba = new p(aa ? this._elem : this._gripper);
  ba.subscribe("start", function(ca, event) {
   if (!(event.which && event.which === 1 || event.button && event.button === 1)) return;
   var da = s.getEventPosition(event, "viewport");
   if (aa) {
    var ea = this._gripper.getBoundingClientRect();
    if (da.x < ea.left || da.x > ea.right || da.y < ea.top || da.y > ea.bottom) return false;
   }
   this.inform("grip_start");
   var fa = da.y, ga = this._gripper.offsetTop;
   j.addClass(this._elem, "uiScrollableAreaDragging");
   var ha = ba.subscribe("update", function(ja, event) {
    var ka = s.getEventPosition(event, "viewport").y - fa;
    this._throttledComputeHeights();
    var la = this._contentHeight - this._containerHeight, ma = ga + ka, na = this._trackHeight - this._gripperHeight;
    ma = Math.max(Math.min(ma, na), 0);
    var oa = ma / na * la;
    this._wrap.scrollTop = oa;
   }.bind(this)), ia = ba.subscribe("end", function() {
    ba.unsubscribe(ha);
    ba.unsubscribe(ia);
    j.removeClass(this._elem, "uiScrollableAreaDragging");
    this.inform("grip_end");
   }.bind(this));
  }.bind(this));
 };
 z.prototype.adjustGripper = function() {
  "use strict";
  if (this._needsGripper()) {
   q.set(this._gripper, "height", this._gripperHeight + "px");
   this._slideGripper();
  }
  this._throttledShowGripperAndShadows();
  return this;
 };
 z.prototype._computeHeights = function() {
  "use strict";
  this._containerHeight = this._elem.clientHeight;
  this._contentHeight = this._content.offsetHeight;
  this._trackHeight = this._track.offsetHeight;
  this._gripperHeight = Math.max(this._containerHeight / this._contentHeight * this._trackHeight, v);
 };
 z.prototype._needsGripper = function() {
  "use strict";
  this._throttledComputeHeights();
  return this._gripperHeight < this._trackHeight;
 };
 z.prototype._slideGripper = function() {
  "use strict";
  var aa = this._wrap.scrollTop / (this._contentHeight - this._containerHeight) * (this._trackHeight - this._gripperHeight);
  q.set(this._gripper, "top", aa + "px");
 };
 z.prototype._showGripperAndShadows = function() {
  "use strict";
  j.conditionShow(this._gripper, this._needsGripper());
  j.conditionClass(this._elem, "contentBefore", this._wrap.scrollTop > 0);
  j.conditionClass(this._elem, "contentAfter", !this.isScrolledToBottom());
 };
 z.prototype.destroy = function() {
  "use strict";
  this._listeners.forEach(function(aa) {
   aa.remove();
  });
  this._listeners.length = 0;
 };
 z.prototype._handleClickOnTrack = function(event) {
  "use strict";
  var aa = s.getEventPosition(event, "viewport"), ba = this._gripper.getBoundingClientRect();
  if (aa.x < ba.right && aa.x > ba.left) {
   if (aa.y < ba.top) {
    this.setScrollTop(this.getScrollTop() - this._elem.clientHeight);
   } else if (aa.y > ba.bottom) this.setScrollTop(this.getScrollTop() + this._elem.clientHeight);
   event.prevent();
  }
 };
 z.prototype._handleMouseMove = function(event) {
  "use strict";
  var aa = this._options.fade !== false;
  if (i.hasPointerEvents() || aa) {
   this._mousePos = s.getEventPosition(event);
   this._throttledRespondMouseMove();
  }
 };
 z.prototype._respondMouseMove = function() {
  "use strict";
  if (!this._mouseOver) return;
  var aa = this._options.fade !== false, ba = this._mousePos, ca = s.getElementPosition(this._track).x, da = s.getElementDimensions(this._track).x, ea = Math.abs(ca + da / 2 - ba.x);
  j.conditionClass(this._elem, "uiScrollableAreaTrackOver", i.hasPointerEvents() && ea <= 10);
  if (aa) if (ea < 25) {
   this.showScrollbar(false);
  } else if (!this._options.no_fade_on_hover) this.hideScrollbar();
 };
 z.prototype._handleScroll = function(event) {
  "use strict";
  if (this._needsGripper()) this._slideGripper();
  this.throttledAdjustGripper();
  if (this._options.fade !== false) this.showScrollbar();
  this.inform("scroll");
 };
 z.prototype._handleMouseLeave = function() {
  "use strict";
  this._mouseOver = false;
  this.hideScrollbar();
 };
 z.prototype._handleMouseEnter = function() {
  "use strict";
  this._mouseOver = true;
  this.showScrollbar();
 };
 z.prototype.hideScrollbar = function(aa) {
  "use strict";
  if (!this._scrollbarVisible) return this;
  this._scrollbarVisible = false;
  if (this._hideTimeout) {
   clearTimeout(this._hideTimeout);
   this._hideTimeout = null;
  }
  if (aa) {
   q.set(this._track, "opacity", 0);
   j.addClass.bind(null, this._track, "invisible_elem");
  } else this._hideTimeout = setTimeout(function() {
   if (this._hideAnimation) {
    this._hideAnimation.stop();
    this._hideAnimation = null;
   }
   this._hideAnimation = new g(this._track).from("opacity", 1).to("opacity", 0).duration(250).ondone(j.addClass.bind(null, this._track, "invisible_elem")).go();
  }.bind(this), 750);
  return this;
 };
 z.prototype.resize = function() {
  "use strict";
  if (this._body.style.width) this._body.style.width = "";
  var aa = this._wrap.offsetWidth - this._wrap.clientWidth;
  if (aa > 0) q.set(this._body, "margin-right", -aa + "px");
  return this;
 };
 z.prototype.showScrollbar = function(aa) {
  "use strict";
  this.throttledAdjustGripper();
  if (this._scrollbarVisible) return this;
  this._scrollbarVisible = true;
  if (this._hideTimeout) {
   clearTimeout(this._hideTimeout);
   this._hideTimeout = null;
  }
  if (this._hideAnimation) {
   this._hideAnimation.stop();
   this._hideAnimation = null;
  }
  q.set(this._track, "opacity", 1);
  j.removeClass(this._track, "invisible_elem");
  if (aa !== false && !this._options.no_fade_on_hover) this.hideScrollbar();
  return this;
 };
 z.prototype.distanceToBottom = function() {
  "use strict";
  this._computeHeights();
  return this._contentHeight - (this._wrap.scrollTop + this._containerHeight);
 };
 z.prototype.isScrolledToBottom = function() {
  "use strict";
  return this.distanceToBottom() <= 0;
 };
 z.prototype.isScrolledToTop = function() {
  "use strict";
  return this._wrap.scrollTop === 0;
 };
 z.prototype.scrollToBottom = function(aa, ba) {
  "use strict";
  this.setScrollTop(this._wrap.scrollHeight, aa, ba);
 };
 z.prototype.scrollToTop = function(aa) {
  "use strict";
  this.setScrollTop(0, aa);
 };
 z.prototype.scrollIntoView = function(aa, ba) {
  "use strict";
  var ca = this._wrap.clientHeight, da = aa.offsetHeight, ea = this._wrap.scrollTop, fa = ea + ca, ga = aa.offsetTop, ha = ga + da;
  if (ga < ea || ca < da) {
   this.setScrollTop(ga, ba);
  } else if (ha > fa) this.setScrollTop(ea + (ha - fa), ba);
 };
 z.prototype.scrollElemToTop = function(aa, ba, ca) {
  "use strict";
  this.setScrollTop(aa.offsetTop, ba, {
   callback: ca
  });
 };
 z.prototype.poke = function() {
  "use strict";
  var aa = this._wrap.scrollTop;
  this._wrap.scrollTop += 1;
  this._wrap.scrollTop -= 1;
  this._wrap.scrollTop = aa;
  return this.showScrollbar(false);
 };
 z.prototype.getClientHeight = function() {
  "use strict";
  return this._wrap.clientHeight;
 };
 z.prototype.getScrollTop = function() {
  "use strict";
  return this._wrap.scrollTop;
 };
 z.prototype.getScrollHeight = function() {
  "use strict";
  return this._wrap.scrollHeight;
 };
 z.prototype.setScrollTop = function(aa, ba, ca) {
  "use strict";
  ca = ca || {};
  if (ba !== false) {
   if (this._scrollTopAnimation) this._scrollTopAnimation.stop();
   var da = ca.duration || 250, ea = ca.ease || g.ease.end;
   this._scrollTopAnimation = new g(this._wrap).to("scrollTop", aa).ease(ea).duration(da).ondone(ca.callback).go();
  } else {
   this._wrap.scrollTop = aa;
   ca.callback && ca.callback();
  }
 };
 z.renderDOM = function() {
  "use strict";
  var aa = l.create("div", {
   className: "uiScrollableAreaContent"
  }), ba = l.create("div", {
   className: "uiScrollableAreaBody"
  }, aa), ca = l.create("div", {
   className: "uiScrollableAreaWrap scrollable"
  }, ba), da = l.create("div", {
   className: "uiScrollableArea native"
  }, ca);
  return {
   root: da,
   wrap: ca,
   body: ba,
   content: aa
  };
 };
 z.fromNative = function(aa, ba) {
  "use strict";
  if (!j.hasClass(aa, "uiScrollableArea") || !j.hasClass(aa, "native")) return;
  ba = ba || {};
  j.removeClass(aa, "native");
  var ca = l.create("div", {
   className: "uiScrollableAreaTrack"
  }, l.create("div", {
   className: "uiScrollableAreaGripper"
  }));
  if (ba.fade !== false) {
   j.addClass(aa, "fade");
   j.addClass(ca, "invisible_elem");
  } else j.addClass(aa, "nofade");
  l.appendContent(aa, ca);
  var da = new z(aa, ba);
  da.resize();
  return da;
 };
 z.getInstance = function(aa) {
  "use strict";
  var ba = n.byClass(aa, "uiScrollableArea");
  return ba ? k.get(ba, "ScrollableArea") : null;
 };
 z.poke = function(aa) {
  "use strict";
  var ba = z.getInstance(aa);
  ba && ba.poke();
 };
 e.exports = z;
}, null);

__d("Menu", [ "BehaviorsMixin", "CSS", "DataStore", "DOM", "Event", "Keys", "KeyStatus", "Parent", "PopoverMenuInterface", "ScrollableArea", "Style", "copyProperties", "cx" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
 b.__markCompiled && b.__markCompiled();
 for (var t in o) if (o.hasOwnProperty(t)) v[t] = o[t];
 var u = o === null ? null : o.prototype;
 v.prototype = Object.create(u);
 v.prototype.constructor = v;
 v.__superConstructor__ = o;
 function v(w, x) {
  "use strict";
  o.call(this);
  this._items = [];
  for (var y = 0; y < w.length; y++) {
   var z = w[y], aa;
   if (z.ctor) {
    aa = new z.ctor(z);
   } else aa = new z.type(z.props);
   this._items[y] = aa;
  }
  this._config = x || {};
  this._theme = x.theme || {};
 }
 v.prototype.addItem = function(w) {
  "use strict";
  this._addItem(w);
 };
 v.prototype.addItemBefore = function(w, x) {
  "use strict";
  this._addItem(w, x, false);
 };
 v.prototype.addItemAfter = function(w, x) {
  "use strict";
  this._addItem(w, x, true);
 };
 v.prototype._addItem = function(w, x, y) {
  "use strict";
  var z = this._items.indexOf(w);
  if (z >= 0) {
   var aa = y ? -1 : 1;
   if (this._items[z + aa] == x) return;
   this._items.splice(z, 1);
  }
  if (x) {
   z = this._items.indexOf(x);
   if (z < 0) throw new Error("reference item must already be in the menu");
   if (y) z++;
   this._items.splice(z, 0, w);
  } else this._items.push(w);
  if (this._root) this._insertItem(w, x, y);
 };
 v.prototype.removeItem = function(w) {
  "use strict";
  var x = this._items.indexOf(w);
  if (x < 0) return;
  this._items.splice(x, 1);
  this._root && j.remove(w.getRoot());
 };
 v.prototype.forEachItem = function(w) {
  "use strict";
  this._items.forEach(w);
 };
 v.prototype.getFocusedItem = function() {
  "use strict";
  return this._focused;
 };
 v.prototype.getItemAt = function(w) {
  "use strict";
  return this._items[w] || null;
 };
 v.prototype.getRoot = function() {
  "use strict";
  if (!this._root) this._render();
  return this._root;
 };
 v.prototype.onShow = function() {
  "use strict";
  if (this._config.maxheight) if (!this._scrollableArea) {
   this._scrollableArea = p.fromNative(this._scrollableElems.root, {
    fade: true
   });
  } else this._scrollableArea.resize();
  if (m.isKeyDown()) this.focusAnItem();
  this.inform("show");
 };
 v.prototype.onHide = function() {
  "use strict";
  this.blur();
 };
 v.prototype.focusAnItem = function(w) {
  "use strict";
  return this._attemptFocus(w || 0, 1);
 };
 v.prototype.blur = function() {
  "use strict";
  if (this._focused) {
   var w = this._focused;
   this._focused.blur();
   this._focused = null;
   this.inform("blur", {
    item: w
   });
  }
 };
 v.prototype.handleKeydown = function(w, x) {
  "use strict";
  var y = this._items.indexOf(this._focused);
  switch (w) {
  case l.UP:
  case l.DOWN:
   var z = w === l.UP, aa = z ? -1 : 1, ba = z ? this._items.length - 1 : 0, ca = z ? 0 : this._items.length - 1;
   if (y === -1) {
    return this._attemptFocus(ba, aa);
   } else if (y !== ca) return this._attemptFocus(y + aa, aa);
   break;

  case l.SPACE:
   if (this._items.indexOf(this._focused) !== -1) {
    this._handleItemClick(this._focused, x);
    return true;
   }
   return false;

  default:
   var da = String.fromCharCode(w).toLowerCase(), ea;
   for (var fa = y + 1; fa < this._items.length; fa++) {
    ea = this._items[fa].getAccessKey();
    if (ea && ea.charAt(0).toLowerCase() === da) if (this._focusItem(this._items[fa])) return true;
   }
   return false;
  }
 };
 v.prototype._render = function() {
  "use strict";
  this._ul = j.create("ul", {
   className: "_54nf"
  });
  this._ul.setAttribute("role", "menu");
  this._items.forEach(function(y) {
   this._insertItem(y, null);
  }.bind(this));
  k.listen(this._ul, "click", this._handleClick.bind(this));
  k.listen(this._ul, "mouseover", this._handleMouseOver.bind(this));
  k.listen(this._ul, "mouseout", this._handleMouseOut.bind(this));
  var w = this._ul;
  if (this._config.maxheight) {
   this._scrollableElems = p.renderDOM();
   j.setContent(this._scrollableElems.content, this._ul);
   w = this._scrollableElems.root;
   q.set(this._scrollableElems.wrap, "max-height", this._config.maxheight + "px");
  }
  var x = "_54nq" + (this._config.className ? " " + this._config.className : "") + (this._theme.className ? " " + this._theme.className : "");
  this._root = j.create("div", {
   className: x
  }, j.create("div", {
   className: "_54ng"
  }, w));
  this._config.id && this._root.setAttribute("id", this._config.id);
  if (this._config.behaviors) this.enableBehaviors(this._config.behaviors);
  this.inform("rendered", this._root);
 };
 v.prototype._needsDefaultBehavior = function(w) {
  "use strict";
  if (w.isDefaultRequested && w.isDefaultRequested()) {
   var x = n.byTag(w.getTarget(), "a"), y = x && x.getAttribute("href");
   return y && y[0] !== "#";
  }
  return false;
 };
 v.prototype._handleClick = function(w) {
  "use strict";
  if (!this._needsDefaultBehavior(w)) {
   var x = this._getItemInstance(w.getTarget());
   if (x) return this._handleItemClick(x, w);
  }
 };
 v.prototype._handleItemClick = function(w, x) {
  "use strict";
  this.inform("itemclick", {
   item: w,
   event: x
  });
  if (w.hasAction()) this.done();
  return w.handleClick(x);
 };
 v.prototype._handleMouseOver = function(w) {
  "use strict";
  var x = this._getItemInstance(w.getTarget());
  x && this._focusItem(x, true);
 };
 v.prototype._handleMouseOut = function(w) {
  "use strict";
  var x = this._getItemInstance(w.getTarget());
  if (x && this._focused === x) this.blur();
 };
 v.prototype._insertItem = function(w, x, y) {
  "use strict";
  var z = w.getRoot();
  h.addClass(z, "__MenuItem");
  i.set(z, "MenuItem", w);
  if (x) {
   var aa = y ? j.insertAfter : j.insertBefore;
   aa(x.getRoot(), z);
  } else j.appendContent(this._ul, z);
 };
 v.prototype._attemptFocus = function(w, x) {
  "use strict";
  var y = this.getItemAt(w);
  if (y) if (this._focusItem(y)) {
   return true;
  } else return this._attemptFocus(w + x, x);
  return false;
 };
 v.prototype._focusItem = function(w, x) {
  "use strict";
  if (w.focus(x) !== false) {
   if (this._focused !== w) {
    this.blur();
    this._focused = w;
    this.inform("focus", {
     item: w,
     from_mouse_over: x
    });
   }
   return true;
  }
  return false;
 };
 v.prototype._getItemInstance = function(w) {
  "use strict";
  var x = n.byClass(w, "__MenuItem");
  return x ? i.get(x, "MenuItem") : null;
 };
 v.prototype.destroy = function() {
  "use strict";
  this._items.forEach(function(w) {
   var x = w.getRoot();
   i.remove(x, "MenuItem");
   w.destroy();
  });
  this.destroyBehaviors();
 };
 r(v.prototype, g, {
  _focused: null,
  _root: null
 });
 e.exports = v;
}, null);

__d("MenuItemInterface", [ "copyProperties", "emptyFunction" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 function i() {
  "use strict";
 }
 i.prototype.getRoot = function() {
  "use strict";
  if (!this._root) this._root = this.render();
  return this._root;
 };
 g(i.prototype, {
  _root: null,
  render: h,
  getAccessKey: h,
  hasAction: h.thatReturnsFalse,
  focus: h.thatReturnsFalse,
  blur: h.thatReturnsFalse,
  onShow: h.thatReturnsFalse,
  handleClick: h.thatReturnsFalse,
  destroy: h
 });
 e.exports = i;
}, null);

__d("MenuItemBase", [ "DOM", "HTML", "MenuItemInterface", "cx" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 for (var k in i) if (i.hasOwnProperty(k)) m[k] = i[k];
 var l = i === null ? null : i.prototype;
 m.prototype = Object.create(l);
 m.prototype.constructor = m;
 m.__superConstructor__ = i;
 function m(n) {
  "use strict";
  i.call(this);
  this._data = n;
 }
 m.prototype.render = function() {
  "use strict";
  var n = "_54ni";
  if (this._data.className) n += " " + this._data.className;
  var o = {
   className: n,
   role: "presentation"
  };
  Object.assign(o, this.__getAttributesFromData());
  return g.create("li", o, this._renderItemContent());
 };
 m.prototype._renderItemContent = function() {
  "use strict";
  return h(this._data.markup).getNodes();
 };
 m.prototype.__getAttributesFromData = function() {
  "use strict";
  var n = {};
  for (var o in this._data) if (o.indexOf("data-") === 0 || o.indexOf("aria-") === 0) n[o] = this._data[o];
  return n;
 };
 e.exports = m;
}, null);

__d("MenuItem", [ "CSS", "DOM", "MenuItemBase", "React", "cloneWithProps", "copyProperties", "cx", "emptyFunction" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
 b.__markCompiled && b.__markCompiled();
 var o = [ "href", "rel", "ajaxify", "target", "accesskey" ];
 function p(u, v) {
  var w = {};
  o.forEach(function(x) {
   if (v[x]) w[x] = v[x];
  });
  h.setAttributes(u, w);
 }
 function q(u) {
  o.forEach(function(v) {
   u.removeAttribute(v);
  });
 }
 for (var r in i) if (i.hasOwnProperty(r)) t[r] = i[r];
 var s = i === null ? null : i.prototype;
 t.prototype = Object.create(s);
 t.prototype.constructor = t;
 t.__superConstructor__ = i;
 function t(u) {
  "use strict";
  i.call(this, u);
  this._disabled = !!this._data.disabled;
  this._onclickHandler = this._data.onclick;
 }
 t.prototype.getValue = function() {
  "use strict";
  return this._data.value;
 };
 t.prototype.getLabel = function() {
  "use strict";
  return this._data.label;
 };
 t.prototype.getAccessKey = function() {
  "use strict";
  return this._data.label && this._data.label.charAt(0);
 };
 t.prototype.focus = function(u) {
  "use strict";
  if (this.isDisabled() || !this._root.offsetParent) return false;
  g.addClass(this._root, "_54ne");
  g.addClass(this._root, "selected");
  u || this._anchor.focus();
 };
 t.prototype.blur = function() {
  "use strict";
  g.removeClass(this._root, "_54ne");
  g.removeClass(this._root, "selected");
 };
 t.prototype.handleClick = function(u) {
  "use strict";
  if (this.isDisabled()) return false;
  if (typeof this._onclickHandler === "function") return this._onclickHandler(u);
  return true;
 };
 t.prototype.setOnClickHandler = function(u) {
  "use strict";
  this._onclickHandler = u;
 };
 t.prototype._renderItemContent = function() {
  "use strict";
  this._anchor = h.create(this._data.renderas === "label" ? "label" : "a", {
   className: "_54nc" + (this._data.icon ? " " + "_54nu" : "")
  });
  if (this._data.children) {
   var u = null;
   if (this._data.icon) u = k(this._data.icon, {
    className: "mrs"
   });
   j.render(j.createElement("span", null, u, j.createElement("span", {
    className: "_54nh"
   }, this._data.children)), this._anchor);
   this._data.label = this._anchor.innerText || this._anchor.textContent;
  } else {
   var v = h.create("span", null, h.create("span", {
    className: "_54nh"
   }, this._data.markup || this._data.label));
   if (this._data.icon) h.prependContent(v, this._data.icon);
   h.setContent(this._anchor, v);
  }
  if (!this._data.href) this._data.href = "#";
  if (!this.isDisabled()) p(this._anchor, this._data);
  h.setAttributes(this._anchor, this.__getAttributesFromData());
  this._anchor.setAttribute("role", "menuitem");
  var w = this._data.title;
  w && this._anchor.setAttribute("title", w);
  return this._anchor;
 };
 t.prototype.isDisabled = function() {
  "use strict";
  return this._disabled;
 };
 t.prototype.enable = function() {
  "use strict";
  p(this._anchor, this._data);
  g.removeClass(this._root, "_5arm");
  this._disabled = false;
 };
 t.prototype.disable = function() {
  "use strict";
  q(this._anchor);
  g.addClass(this._root, "_5arm");
  this._disabled = true;
 };
 t.prototype.render = function() {
  "use strict";
  var u = s.render.call(this);
  if (this._data.disabled) g.addClass(u, "_5arm");
  return u;
 };
 t.prototype.destroy = function() {
  "use strict";
  if (this._anchor) j.unmountComponentAtNode(this._anchor);
 };
 l(t.prototype, {
  hasAction: n.thatReturnsTrue
 });
 e.exports = t;
}, null);

__d("MenuSelectableItem", [ "CSS", "MenuItem", "copyProperties", "cx" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 for (var k in h) if (h.hasOwnProperty(k)) m[k] = h[k];
 var l = h === null ? null : h.prototype;
 m.prototype = Object.create(l);
 m.prototype.constructor = m;
 m.__superConstructor__ = h;
 function m(n) {
  "use strict";
  h.call(this, n);
  this._selected = !!this._data.selected;
 }
 m.prototype.getLabel = function() {
  "use strict";
  return this._data.label;
 };
 m.prototype.getIcon = function() {
  "use strict";
  return this._data.icon;
 };
 m.prototype.isSelected = function() {
  "use strict";
  return this._selected;
 };
 m.prototype.select = function() {
  "use strict";
  if (this.isDisabled()) return false;
  g.addClass(this._root, "_54nd");
  this._anchor.setAttribute("aria-selected", "true");
  this._selected = true;
 };
 m.prototype.deselect = function() {
  "use strict";
  g.removeClass(this._root, "_54nd");
  this._anchor.setAttribute("aria-selected", "false");
  this._selected = false;
 };
 m.prototype.render = function() {
  "use strict";
  var n = l.render.call(this);
  if (this._data.selected) {
   g.addClass(n, "_54nd");
   this._anchor.setAttribute("aria-selected", "true");
  }
  return n;
 };
 i(m.prototype, {
  _selected: false
 });
 e.exports = m;
}, null);

__d("MenuTheme", [ "cx" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 e.exports = {
  className: "_569t"
 };
}, null);

__d("SelectableMenuUtils", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 var g = {
  doesItemSupportSelect: function(i) {
   return h(i);
  },
  isSelected: function(i) {
   return h(i) && i.isSelected();
  }
 };
 function h(i) {
  return i.select && i.deselect && i.isSelected;
 }
 e.exports = g;
}, null);

__d("SelectableMenu", [ "Menu", "arrayContains", "createArrayFromMixed", "SelectableMenuUtils" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 for (var k in g) if (g.hasOwnProperty(k)) m[k] = g[k];
 var l = g === null ? null : g.prototype;
 m.prototype = Object.create(l);
 m.prototype.constructor = m;
 m.__superConstructor__ = g;
 function m() {
  "use strict";
  if (g !== null) g.apply(this, arguments);
 }
 m.prototype.focusAnItem = function() {
  "use strict";
  for (var n = 0; n < this._items.length; n++) if (j.isSelected(this._items[n])) if (this._focusItem(this._items[n]) !== false) return true;
  return l.focusAnItem.call(this);
 };
 m.prototype.setValue = function(n) {
  "use strict";
  if (!this._root) this._render();
  var o = i(n);
  this._items.forEach(function(p) {
   if (j.doesItemSupportSelect(p)) if (h(o, p.getValue())) {
    p.select();
   } else if (j.isSelected(p)) p.deselect();
  });
  this.inform("change", this.getSelection());
 };
 m.prototype._handleItemClick = function(n, o) {
  "use strict";
  if (!j.doesItemSupportSelect(n)) return l._handleItemClick.call(this, n, o);
  var p = this.inform("itemclick", {
   item: n,
   event: o
  });
  if (p) return;
  if (this._config.multiple) {
   var q = j.isSelected(n) ? n.deselect() : n.select();
   if (q !== false) this.inform("change", this.getSelection());
  } else {
   if (!j.isSelected(n)) if (n.select() !== false) {
    this._items.forEach(function(r) {
     if (j.isSelected(r) && r !== n) r.deselect();
    });
    this.inform("change", this.getSelection());
   }
   this.done();
  }
  return n.handleClick();
 };
 m.prototype.getSelection = function() {
  "use strict";
  var n = [];
  this._items.forEach(function(o) {
   if (j.isSelected(o)) n.push({
    label: o.getLabel(),
    value: o.getValue(),
    item: o
   });
  });
  if (!this._config.multiple) n = n[0];
  return n;
 };
 e.exports = m;
}, null);

__d("ReactMenu", [ "Menu", "MenuItem", "MenuSelectableItem", "MenuTheme", "ReactChildren", "SelectableMenu", "cx", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
 b.__markCompiled && b.__markCompiled();
 function o(w) {
  var x = [];
  k.forEach(w, function(y) {
   if (y) x.push(y);
  });
  return x;
 }
 function p(w) {
  w.isReactLegacyFactory = {};
  w.type = w;
 }
 for (var q in g) if (g.hasOwnProperty(q)) s[q] = g[q];
 var r = g === null ? null : g.prototype;
 s.prototype = Object.create(r);
 s.prototype.constructor = s;
 s.__superConstructor__ = g;
 function s(w, x) {
  "use strict";
  var y = Object.assign({
   theme: j,
   maxheight: w ? w.maxheight : null,
   className: w ? w.className : null
  }, x);
  g.call(this, o(w.children), y);
 }
 p(s);
 for (var t in l) if (l.hasOwnProperty(t)) v[t] = l[t];
 var u = l === null ? null : l.prototype;
 v.prototype = Object.create(u);
 v.prototype.constructor = v;
 v.__superConstructor__ = l;
 function v(w, x) {
  "use strict";
  var y = Object.assign({
   className: n("_57di", w ? w.className : null),
   theme: j,
   multiple: w && w.multiple,
   maxheight: w ? w.maxheight : null
  }, x);
  l.call(this, o(w.children), y);
 }
 p(v);
 s.SelectableMenu = v;
 p(h);
 s.Item = h;
 p(i);
 s.SelectableItem = i;
 e.exports = s;
}, null);

__d("ReactSelectorUtils", [ "ReactChildren" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 var h = {
  processAndMutateMenuItems: function(i, j) {
   var k;
   g.forEach(i, function(l) {
    if (l) {
     var m = l.props.value === j;
     l.props.selected = m;
     if (m) k = l;
    }
   });
   return k;
  },
  processAndMutateMultiMenuItems: function(i, j) {
   var k = [];
   if (j) g.forEach(i, function(l) {
    if (l) {
     var m = j.some(function(n) {
      return n === l.props.value;
     });
     l.props.selected = m;
     if (m) k.push(l);
    }
   });
   return k;
  }
 };
 e.exports = h;
}, null);

__d("PopoverMenuContextMinWidth", [ "CSS", "Style", "copyProperties", "cx", "shield" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 function l(m) {
  "use strict";
  this._popoverMenu = m;
  this._popover = m.getPopover();
 }
 l.prototype.enable = function() {
  "use strict";
  this._setMenuSubscription = this._popoverMenu.subscribe("setMenu", k(this._onSetMenu, this));
 };
 l.prototype.disable = function() {
  "use strict";
  this._setMenuSubscription.unsubscribe();
  this._setMenuSubscription = null;
  if (this._showSubscription) {
   this._showSubscription.unsubscribe();
   this._showSubscription = null;
  }
  if (this._menuSubscription) {
   this._menuSubscription.unsubscribe();
   this._menuSubscription = null;
  }
 };
 l.prototype._onSetMenu = function() {
  "use strict";
  this._menu = this._popoverMenu.getMenu();
  this._showSubscription = this._popover.subscribe("show", k(this._updateWidth, this));
  var m = this._updateWidth.bind(this);
  this._menuSubscription = this._menu.subscribe([ "change", "resize" ], function() {
   setTimeout(m, 0);
  });
  this._updateWidth();
 };
 l.prototype._updateWidth = function() {
  "use strict";
  var m = this._menu.getRoot(), n = this._popoverMenu.getTriggerElem(), o = n.offsetWidth;
  h.set(m, "min-width", o + "px");
  g.conditionClass(m, "_575s", o >= m.offsetWidth);
 };
 i(l.prototype, {
  _setMenuSubscription: null,
  _showSubscription: null,
  _menuSubscription: null
 });
 e.exports = l;
}, null);

__d("PopoverMenuOverlappingBorder", [ "CSS", "DOM", "Style", "copyProperties", "cx", "shield" ], function(a, b, c, d, e, f, g, h, i, j, k, l) {
 b.__markCompiled && b.__markCompiled();
 function m(n) {
  "use strict";
  this._popoverMenu = n;
  this._popover = n.getPopover();
  this._triggerElem = n.getTriggerElem();
 }
 m.prototype.enable = function() {
  "use strict";
  this._setMenuSubscription = this._popoverMenu.subscribe("setMenu", l(this._onSetMenu, this));
 };
 m.prototype.disable = function() {
  "use strict";
  this._popoverMenu.unsubscribe(this._setMenuSubscription);
  this._setMenuSubscription = null;
  this._removeBorderSubscriptions();
  this._removeShortBorder();
 };
 m.prototype._onSetMenu = function() {
  "use strict";
  this._removeBorderSubscriptions();
  this._menu = this._popoverMenu.getMenu();
  this._renderShortBorder(this._menu.getRoot());
  this._showSubscription = this._popover.subscribe("show", l(this._updateBorder, this));
  var n = this._updateBorder.bind(this);
  this._menuSubscription = this._menu.subscribe([ "change", "resize" ], function() {
   setTimeout(n, 0);
  });
  this._updateBorder();
 };
 m.prototype._updateBorder = function() {
  "use strict";
  var n = this._menu.getRoot(), o = this._triggerElem.offsetWidth, p = Math.max(n.offsetWidth - o, 0);
  i.set(this._shortBorder, "width", p + "px");
 };
 m.prototype._renderShortBorder = function(n) {
  "use strict";
  this._shortBorder = h.create("div", {
   className: "_54hx"
  });
  h.appendContent(n, this._shortBorder);
  g.addClass(n, "_54hy");
 };
 m.prototype._removeShortBorder = function() {
  "use strict";
  if (this._shortBorder) {
   h.remove(this._shortBorder);
   this._shortBorder = null;
   g.removeClass(this._popoverMenu.getMenu().getRoot(), "_54hy");
  }
 };
 m.prototype._removeBorderSubscriptions = function() {
  "use strict";
  if (this._showSubscription) {
   this._popover.unsubscribe(this._showSubscription);
   this._showSubscription = null;
  }
  if (this._menuSubscription) {
   this._menu.unsubscribe(this._menuSubscription);
   this._menuSubscription = null;
  }
 };
 j(m.prototype, {
  _shortBorder: null,
  _setMenuSubscription: null,
  _showSubscription: null,
  _menuSubscription: null
 });
 e.exports = m;
}, null);

__d("intlList", [ "React", "fbt", "invariant", "keyMirror" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var k = function(m, n) {
  n = n || k.CONJUNCTIONS.AND;
  var o = m.length;
  if (o === 0) {
   return "";
  } else if (o === 1) return m[0];
  var p = m[o - 1], q = m[0];
  for (var r = 1; r < o - 1; ++r) q = h._("{previous items}, {following items}", [ h.param("previous items", q), h.param("following items", m[r]) ]);
  return l(q, p, n);
 };
 function l(m, n, o) {
  switch (o) {
  case k.CONJUNCTIONS.AND:
   return h._("{list of items} and {last item}", [ h.param("list of items", m), h.param("last item", n) ]);

  case k.CONJUNCTIONS.OR:
   return h._("{list of items} or {last item}", [ h.param("list of items", m), h.param("last item", n) ]);

  case k.CONJUNCTIONS.NONE:
   return h._("{list of items}, {last item}", [ h.param("list of items", m), h.param("last item", n) ]);

  default:
   i(false);
  }
 }
 k.CONJUNCTIONS = j({
  AND: null,
  NONE: null,
  OR: null
 });
 e.exports = k;
}, null);

__d("AbstractSelector.react", [ "InlineBlock.react", "React", "PopoverMenu.react", "ReactSelectorUtils", "ContextualLayerAutoFlip", "PopoverMenuContextMinWidth", "PopoverMenuOverlappingBorder", "cloneWithProps", "cx", "invariant", "joinClasses", "intlList" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
 b.__markCompiled && b.__markCompiled();
 var s = h, t = s.PropTypes;
 function u(w, x, y) {
  if (w[x] == null) return;
  var z = Array.isArray(w[x]);
  if (w.multiple) {
   if (!z) return new Error("You are trying to set a single value for `" + x + "` " + "but the menu has `multiple` set to true, so it should be an " + "array of values.");
  } else if (z) return new Error("You are trying to set an array of values for `" + x + "` " + "but the menu has `multiple` set to false, so it should be a " + "single value.");
 }
 var v = h.createClass({
  displayName: "AbstractSelector",
  propTypes: {
   config: t.object.isRequired,
   alignh: t.oneOf([ "left", "center", "right" ]),
   name: t.string,
   overlappingborder: t.bool,
   onChange: t.func,
   disabled: t.bool,
   maxheight: t.number,
   multiple: t.bool,
   defaultLabel: t.string,
   defaultValue: u,
   value: u,
   initialValue: u
  },
  getInitialState: function() {
   return {
    value: this.props.value != null ? this.props.value : this.props.defaultValue != null ? this.props.defaultValue : this.props.initialValue
   };
  },
  setMenuValue: function(w) {
   p(this.refs && this.refs.popover);
   this._internalChange = true;
   this.refs.popover.getMenu().setValue(w);
   this._internalChange = false;
  },
  onChange: function(w, x) {
   if (this._internalChange) return;
   if (this.props.value == null) {
    var y = null;
    if (this.props.multiple) {
     y = x.map(function(z) {
      return z.value;
     });
    } else y = x.value;
    this.setState({
     value: y
    });
   } else this.setMenuValue(this.props.value);
   if (this.props.onChange) this.props.onChange(x);
  },
  componentWillReceiveProps: function(w) {
   if (w.value != null) {
    this.setState({
     value: w.value
    });
   } else if (this.props.multiple !== w.multiple) this.setState({
    value: w.multiple ? [ this.state.value ] : this.state.value[0]
   });
  },
  render: function() {
   var w = this.props.config, x = n(w.menu, {
    children: this.props.children,
    className: q("_575t", w.menu.props.className),
    maxheight: this.props.maxheight,
    onChange: this.onChange
   }), y = !this.props.multiple ? j.processAndMutateMenuItems(this.props.children, this.state.value) : j.processAndMutateMultiMenuItems(this.props.children, this.state.value), z = "", aa = null;
   if (!this.props.multiple) {
    z = y.props.label || y.props.children;
    if (y.props.icon) aa = n(y.props.icon, {});
   } else if (!y.length) {
    z = this.props.defaultLabel;
   } else z = r(y.map(function(ia) {
    return ia.props.children;
   }), r.CONJUNCTIONS.NONE);
   var ba = {
    label: z,
    disabled: this.props.disabled
   };
   if (aa) ba.image = aa;
   var ca = n(w.button, ba), da = [ k ];
   if (w.layerBehaviors) da = da.concat(w.layerBehaviors);
   var ea = [ l ];
   if (this.props.overlappingborder) ea.push(m);
   var fa = null;
   if (this.props.multiple) {
    var ga = this.props.name + "[]", ha;
    if (this.state.value) ha = this.state.value.map(function(ia) {
     return h.createElement("input", {
      key: ia,
      type: "hidden",
      name: ga,
      value: ia
     });
    });
    fa = h.createElement("div", null, ha);
   } else fa = h.createElement("input", {
    type: "hidden",
    name: this.props.name,
    value: this.state.value
   });
   return h.createElement(g, h.__spread({}, this.props, {
    alignv: "middle",
    name: null
   }), h.createElement(i, {
    ref: "popover",
    menu: x,
    alignh: this.props.alignh,
    layerBehaviors: da,
    behaviors: ea,
    disabled: this.props.disabled
   }, ca), fa);
  },
  showMenu: function() {
   p(this.isMounted());
   this.refs.popover.showPopover();
  },
  hideMenu: function() {
   p(this.isMounted());
   this.refs.popover.hidePopover();
  }
 });
 e.exports = v;
}, null);

__d("XUIOverlayButton.react", [ "AbstractButton.react", "React", "cx", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 var k = h.createClass({
  displayName: "XUIOverlayButton",
  render: function() {
   var l = "_51tl selected";
   return h.createElement(g, h.__spread({}, this.props, {
    className: j(this.props.className, l)
   }));
  }
 });
 e.exports = k;
}, null);

__d("XUIDialogSaveButton.react", [ "React", "XUIDialogButton.react", "fbt" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 var j = g.createClass({
  displayName: "XUIDialogSaveButton",
  render: function() {
   return g.createElement(h, g.__spread({}, this.props, {
    action: "confirm",
    label: i._("Save")
   }));
  }
 });
 e.exports = j;
}, null);

__d("XUIMenuTheme", [ "cx" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 e.exports = {
  className: "_558b"
 };
}, null);

__d("XUIMenuWithSquareCorner", [ "CSS", "cx" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 function i(j) {
  "use strict";
  this.$XUIMenuWithSquareCorner0 = j;
 }
 i.prototype.enable = function() {
  "use strict";
  g.addClass(this.$XUIMenuWithSquareCorner0.getRoot(), "_2n_z");
 };
 i.prototype.disable = function() {
  "use strict";
  g.removeClass(this.$XUIMenuWithSquareCorner0.getRoot(), "_2n_z");
 };
 e.exports = i;
}, null);

__d("ReactXUIMenu", [ "ReactMenu", "XUIMenuTheme", "XUIMenuWithSquareCorner" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 function j(r) {
  r.isReactLegacyFactory = {};
  r.type = r;
 }
 for (var k in g) if (g.hasOwnProperty(k)) m[k] = g[k];
 var l = g === null ? null : g.prototype;
 m.prototype = Object.create(l);
 m.prototype.constructor = m;
 m.__superConstructor__ = g;
 function m(r) {
  "use strict";
  var s = {
   theme: h
  };
  if (!r || r.withsquarecorner !== false) s.behaviors = [ i ];
  g.call(this, r, s);
 }
 j(m);
 var n = g.SelectableMenu;
 for (var o in n) if (n.hasOwnProperty(o)) q[o] = n[o];
 var p = n === null ? null : n.prototype;
 q.prototype = Object.create(p);
 q.prototype.constructor = q;
 q.__superConstructor__ = n;
 function q(r) {
  "use strict";
  var s = {
   theme: h
  };
  if (!r || r.withsquarecorner !== false) s.behaviors = [ i ];
  n.call(this, r, s);
 }
 j(q);
 m.SelectableMenu = q;
 m.Item = g.Item;
 m.SelectableItem = g.SelectableItem;
 e.exports = m;
}, null);

__d("XUIPopoverButton.react", [ "AbstractPopoverButton.react", "Image.react", "React", "XUIButton.react", "cx", "ix", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
 b.__markCompiled && b.__markCompiled();
 var n = i, o = n.PropTypes, p = i.createClass({
  displayName: "ReactXUIPopoverButton",
  propTypes: {
   haschevron: o.bool,
   maxwidth: o.number
  },
  statics: {
   getButtonSize: function(q) {
    return q.size || "medium";
   }
  },
  render: function() {
   var q = p.getButtonSize(this.props), r = "_55pi";
   if (this.props.theme === "dark") r = m(r, "_5vto" + (q === "small" ? " " + "_55_o" : "") + (q === "medium" ? " " + "_55_p" : "") + (q === "large" ? " " + "_55_q" : "") + (q === "xlarge" ? " " + "_55_r" : "") + (q === "xxlarge" ? " " + "_55_s" : ""));
   var s = this.props.chevron;
   if (!s) {
    var t = this.props.theme === "dark" || this.props.use === "confirm" || this.props.use === "special" ? l("/images/ui/x/button/dark/chevron.png") : l("/images/ui/x/button/normal/chevron.png");
    s = i.createElement(h, {
     src: t
    });
   }
   var u = {
    button: i.createElement(j, i.__spread({}, this.props, {
     className: m(this.props.className, r),
     size: q
    })),
    chevron: s,
    chevronWidth: 14,
    defaultMaxWidth: this.props.maxwidth || 200
   };
   return i.createElement(g, {
    config: u,
    haschevron: this.props.haschevron,
    image: this.props.image,
    label: this.props.label,
    maxwidth: this.props.maxwidth
   });
  }
 });
 e.exports = p;
}, null);

__d("ContextualLayerPositionClassOnContext", [ "CSS", "copyProperties", "cx" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 function j(l) {
  "use strict";
  this._layer = l;
 }
 j.prototype.enable = function() {
  "use strict";
  this._subscription = this._layer.subscribe("reposition", this._updateClassName.bind(this));
  if (this._layer.isShown()) this._updateClassName();
 };
 j.prototype.disable = function() {
  "use strict";
  this._subscription.unsubscribe();
  this._subscription = null;
  if (this._prevClassName) {
   g.removeClass(this._layer.getContext(), this._prevClassName);
   this._prevClassName = null;
  }
 };
 j.prototype._updateClassName = function(l, m) {
  "use strict";
  var n = this._layer.getContext(), o = k(m);
  if (this._prevClassName) {
   if (this._prevClassName === o) return;
   g.removeClass(n, this._prevClassName);
  }
  g.addClass(n, o);
  this._prevClassName = o;
 };
 function k(l) {
  var m = l.getAlignment(), n = l.getPosition();
  if (n === "below") {
   if (m === "left") {
    return "_nk";
   } else if (m === "right") {
    return "_nl";
   } else return "_nm";
  } else if (n === "above") {
   if (m === "left") {
    return "_nn";
   } else if (m === "right") {
    return "_no";
   } else return "_np";
  } else if (n === "left") {
   return "_nq";
  } else return "_nr";
 }
 h(j.prototype, {
  _subscription: null,
  _prevClassName: null
 });
 e.exports = j;
}, null);

__d("XUISelectorButton.react", [ "React", "XUIPopoverButton.react", "invariant" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 var j = g.createClass({
  displayName: "XUISelectorButton",
  render: function() {
   i(!this.props.theme);
   return g.createElement(h, g.__spread({}, this.props, {
    theme: "dark"
   }));
  }
 });
 e.exports = j;
}, null);

__d("XUISelector.react", [ "AbstractSelector.react", "ContextualLayerPositionClassOnContext", "React", "ReactChildren", "ReactXUIMenu", "XUISelectorButton.react", "invariant" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
 b.__markCompiled && b.__markCompiled();
 var n = k.SelectableMenu, o = k.SelectableItem, p = i, q = p.PropTypes, r = i.createClass({
  displayName: "ReactXUISelector",
  propTypes: {
   layerBehaviors: q.array,
   maxheight: q.number,
   multiple: q.bool,
   disabled: q.bool,
   haschevron: q.bool,
   maxwidth: q.number,
   size: q.oneOf([ "small", "medium", "large", "xlarge", "xxlarge" ]),
   suppressed: q.bool,
   use: q.oneOf([ "default", "special", "confirm" ])
  },
  statics: {
   getButtonSize: function(s) {
    return s.size || "medium";
   }
  },
  getDefaultProps: function() {
   return {
    haschevron: true,
    layerBehaviors: [],
    multiple: false
   };
  },
  render: function() {
   var s, t = [];
   j.forEach(this.props.children, function(v) {
    if (v) t.push(v);
   });
   if (t[0] && t[0].type === l) {
    s = t[0];
    t = t.slice(1);
   } else s = i.createElement(l, {
    haschevron: this.props.haschevron,
    disabled: this.props.disabled,
    use: this.props.use,
    size: this.props.size,
    suppressed: this.props.suppressed,
    maxwidth: this.props.maxwidth
   });
   var u = {
    button: s,
    menu: i.createElement(n, {
     maxheight: this.props.maxheight,
     multiple: this.props.multiple
    }),
    layerBehaviors: this.props.layerBehaviors.concat([ h ])
   };
   return i.createElement(g, i.__spread({}, this.props, {
    ref: "abstractSelector",
    config: u
   }), t);
  },
  showMenu: function() {
   m(this.isMounted());
   this.refs.abstractSelector.showMenu();
  },
  hideMenu: function() {
   m(this.isMounted());
   this.refs.abstractSelector.hideMenu();
  }
 });
 r.Option = o;
 e.exports = r;
}, null);

__d("Alea", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 function g() {
  var i = 4022871197, j = function(k) {
   k = k.toString();
   for (var l = 0; l < k.length; l++) {
    i += k.charCodeAt(l);
    var m = .02519603282416938 * i;
    i = m >>> 0;
    m -= i;
    m *= i;
    i = m >>> 0;
    m -= i;
    i += m * 4294967296;
   }
   return (i >>> 0) * 2.3283064365386963e-10;
  };
  j.version = "Mash 0.9";
  return j;
 }
 function h() {
  return function(i) {
   var j = 0, k = 0, l = 0, m = 1;
   if (i.length === 0) i = [ new Date() ];
   var n = new g();
   j = n(" ");
   k = n(" ");
   l = n(" ");
   for (var o = 0; o < i.length; o++) {
    j -= n(i[o]);
    if (j < 0) j += 1;
    k -= n(i[o]);
    if (k < 0) k += 1;
    l -= n(i[o]);
    if (l < 0) l += 1;
   }
   n = null;
   var p = function() {
    var q = 2091639 * j + m * 2.3283064365386963e-10;
    j = k;
    k = l;
    l = q - (m = q | 0);
    return l;
   };
   p.version = "Alea 0.9";
   p.args = i;
   return p;
  }(Array.prototype.slice.call(arguments));
 }
 e.exports = h;
}, null);

__d("BanzaiScribe", [ "Banzai" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 function h(j) {
  return {
   log: function(k, l, m) {
    var n = [ l ];
    if (m != null) n.push(m);
    g.post("scribe:" + k, n, j);
   }
  };
 }
 var i = h({});
 i.create = h;
 e.exports = i;
}, null);

__d("FBRTCAdminMessage", [ "FBRTCCallConstants", "FBRTCLogger", "FBRTCUtils", "XVideoCallAdminMessageController", "emptyFunction", "performanceNow" ], function(a, b, c, d, e, f, g, h, i, j, k, l) {
 b.__markCompiled && b.__markCompiled();
 function m(n, o) {
  "use strict";
  this.$FBRTCAdminMessage0 = n;
  this.$FBRTCAdminMessage1 = o;
  this.$FBRTCAdminMessage2 = Date.now();
  this.$FBRTCAdminMessage3 = null;
  this.$FBRTCAdminMessage4 = null;
 }
 m.prototype.onCallConnected = function() {
  "use strict";
  if (!this.$FBRTCAdminMessage3) this.$FBRTCAdminMessage3 = l();
 };
 m.prototype.onCallEnded = function() {
  "use strict";
  if (!this.$FBRTCAdminMessage4) this.$FBRTCAdminMessage4 = l();
 };
 m.prototype.submit = function(n) {
  "use strict";
  if (!this.$FBRTCAdminMessage4) this.onCallEnded();
  var o = 0, p = g.FBRTCCallConnectionType.MISSED_CALL;
  if (this.$FBRTCAdminMessage3) {
   o = Math.ceil(this.$FBRTCAdminMessage4 - this.$FBRTCAdminMessage3);
   p = g.FBRTCCallConnectionType.CONNECTED_CALL;
  }
  this.$FBRTCAdminMessage5({
   peer_id: this.$FBRTCAdminMessage0,
   call_id: this.$FBRTCAdminMessage1,
   start_time: this.$FBRTCAdminMessage2,
   call_duration: o,
   message_type: p,
   call_category: n
  });
 };
 m.prototype.$FBRTCAdminMessage5 = function(n) {
  "use strict";
  var o = j.getURIBuilder().getURI();
  i.sendServerRequest(o, k, this.$FBRTCAdminMessage6.bind(this, n.peer_id, n.call_id), false, null, n);
 };
 m.prototype.$FBRTCAdminMessage6 = function(n, o, p) {
  "use strict";
  var q;
  if (p) {
   q = "Fail to log admin message, error " + p.error;
  } else q = "Server timed out on logging admin message";
  h.getInstance().logError(n, o, q);
 };
 e.exports = m;
}, null);

__d("FBRTCVersionDetection", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 var g = {
  isChrome: function() {
   return !!navigator.webkitGetUserMedia;
  },
  isFirefox: function() {
   return !!navigator.mozGetUserMedia;
  },
  webrtcVersion: function() {
   if (this.isFirefox()) return parseInt(navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1], 10);
   if (this.isChrome()) {
    var h = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
    if (h !== null) {
     return parseInt(h[2], 10);
    } else return 999;
   }
   return 0;
  }
 };
 e.exports = g;
}, null);

__d("FBRTCPCConfig", [ "FBRTCVersionDetection" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 var h = "stun:stun.fbsbx.com:3478", i = function(k, l, m) {
  if (g.isChrome() && g.webrtcVersion() >= 34) {
   var n = {
    urls: k
   };
   if (l && m) {
    n.username = l;
    n.credential = m;
   }
   return [ n ];
  }
  var o = [];
  for (var p = 0; p < k.length; p++) if (l && m) {
   o.push({
    url: k[p],
    username: l,
    credential: m
   });
  } else o.push({
   url: k[p]
  });
  return o;
 }, j = {
  setTurnCredentials: function(k) {
   this.turnIP = k.ip;
   this.udpPort = k.udp_port;
   this.tcpPort = k.tcp_port;
   this.sslPort = k.ssl_tcp_port;
   this.turnUsername = k.username;
   this.turnPassword = k.password;
  },
  getConfig: function() {
   var k = i([ h ]).concat(i(this._turnUrls(), this.turnUsername, this.turnPassword));
   return {
    iceServers: k
   };
  },
  getConstraints: function() {
   return {
    mandatory: {},
    optional: [ {
     DtlsSrtpKeyAgreement: "true"
    } ]
   };
  },
  _turnUrls: function() {
   if (g.isFirefox() && g.webrtcVersion() < 27) {
    return [ "turn:" + this.turnIP + ":" + this.udpPort ];
   } else return [ "turn:" + this.turnIP + ":" + this.udpPort + "?transport=udp", "turn:" + this.turnIP + ":" + this.tcpPort + "?transport=tcp", "turn:" + this.turnIP + ":" + this.sslPort + "?transport=tcp" ];
  }
 };
 e.exports = j;
}, null);

__d("FBRTCSdpUtils", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 var g = "m=video 0", h = function(k) {
  return k.match(/^a=rtpmap:(\d+)\s/)[1];
 }, i = function(k, l, m) {
  var n = h(k[l]), o = k[m].split("RTP/SAVPF"), p = o[1].split(/\s+/), q = p.indexOf(n);
  p.splice(q, 1);
  o[1] = p.join(" ");
  k[m] = o.join("RTP/SAVPF");
  k.splice(l, 1);
 }, j = {
  addIceOptionToSdp: function(k, l) {
   "use strict";
   var m = "a=ice-options:", n = k.indexOf(m);
   if (n >= 0) {
    var o = k.indexOf("\r", n);
    return [ k.slice(0, o), " ", l, k.slice(o) ].join("");
   }
   var p = m + l, q = k.split("\r\n"), r = false, s = -1;
   for (var t = 0; t < q.length; t++) {
    var u = q[t].slice(0, 2);
    if (u == "s=") {
     r = true;
     continue;
    }
    if (r && u == "a=") {
     s = t;
     break;
    }
   }
   if (s >= 0) {
    q.splice(s, 0, p);
    return q.join("\r\n");
   }
   return [ k, p, "\r\n" ].join("");
  },
  preferIsac: function(k) {
   var l = k.split("\r\n"), m = -1, n = -1, o = -1, p = -1;
   for (var q = 0; q < l.length; q++) {
    var r = l[q];
    if (r.match(/m=audio\s+\d+\s+RTP\/SAVPF(\s+\d+)+/)) m = q;
    if (p === -1 && m > -1 && r.match(/^a=rtpmap:/)) p = q;
    if (r.match(/^a=rtpmap:\d+\s+ISAC\/16000/)) n = q;
    if (r.match(/^a=rtpmap:\d+\s+ISAC\/32000/)) o = q;
   }
   if (m === -1 || n === -1 || p === -1) return l.join("\r\n");
   var s = l[n];
   i(l, n, m);
   l.splice(p, 0, s);
   l[m] = l[m].replace("RTP/SAVPF", "RTP/SAVPF " + h(s));
   if (o > -1) i(l, o, m);
   return l.join("\r\n");
  },
  disableVideo: function(k) {
   var l = /m=video\s+\S+/;
   k = k.replace(l, g);
   return k;
  },
  removeBadCodecLines: function(k) {
   var l = k.split("\r\n"), m = -1, n = [], o;
   for (o = 0; o < l.length; o++) {
    var p = l[o];
    if (p.match(/m=audio\s+\d+\s+RTP\/SAVPF(\s+\d+)+/)) {
     m = o;
     continue;
    }
    if (p.match(/^a=rtpmap:\d+\s+\/\d+/)) n.push(o);
   }
   if (m === -1 || !n) return l.join("\r\n");
   n.sort(function(q, r) {
    return r - q;
   });
   if (n) for (o = 0; o < n.length; o++) i(l, n[o], m);
   return l.join("\r\n");
  },
  fixMobileIceSdp: function(k) {
   k = k.replace(/^a=/, "");
   k = k.split(/\s+username\s+.+password.+/)[0];
   var l = k.match(/\s+relay\s+|\s+srflx\s+/), m = k.match(/raddr.+rport.+/);
   if (l && !m) {
    l = l[0];
    var n = k.split(l), o = n[1].match(/^(\d+\.\d+\.\d+\.\d+)\s+(\d+)\s+/), p, q;
    if (o) {
     p = o[1];
     q = o[2];
     n[1] = n[1].replace(o[0], "");
    } else {
     o = n[0].split(/\s+/);
     p = o[4];
     q = o[5];
    }
    k = n[0] + l + "raddr " + p + " rport " + q + " " + n[1];
   }
   return k;
  },
  isVideoSupported: function(k) {
   return k && k.indexOf("m=video") > -1 && k.indexOf(g) === -1;
  },
  setDtlsRole: function(k, l) {
   if (!k.match(/setup:(active|passive|actpass)/)) {
    return k.replace(/(a=fingerprint:.+)/g, "$1\r\na=setup:" + l);
   } else return k.replace(/setup:actpass/g, "setup:" + l);
  },
  removeSdparta: function(k) {
   var l = k.split("\r\n"), m = "audio", n = false, o = -1;
   for (var p = 0; p < l.length; p++) {
    var q = l[p];
    if (q.indexOf("m=audio") === 0) m = "audio";
    if (q.indexOf("m=video") === 0) {
     n = true;
     m = "video";
    }
    if (q.indexOf("a=mid:sdparta_") === 0) l[p] = "a=mid:" + m;
    if (q.indexOf("a=group:BUNDLE sdparta_") === 0) o = p;
   }
   if (o > -1) if (n) {
    l[o] = "a=group:BUNDLE audio video";
   } else l[o] = "a=group:BUNDLE audio";
   return l.join("\r\n");
  }
 };
 e.exports = j;
}, null);

__d("FBRTCStatsHelpers", [ "FBRTCLogger" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 var h = function(j) {
  if (j === "host" || j === "local") return "local";
  if (j === "serverreflexive") return "srflx";
  if (j === "peerreflexive") return "prflx";
  if (j === "relayed" || j === "relay") return "relay";
  return "unknown";
 }, i = {
  connectionType: function(j, k, l, m) {
   return [ "l:", h(j), "-", k, ";", "r:", h(l), "-", m ].join("");
  },
  logReport: function(j) {
   var k = g.getInstance(), l = [ "connectionType", "audioCodec", "videoCodec", "audioRtt", "videoRtt", "audioPacketsLost", "videoPacketsLost", "audioBytesSent", "videoBytesSent", "audioPacketsSent", "videoPacketsSent" ];
   for (var m = 0; m < l.length; m++) {
    var n = j[l[m]].call(j);
    k.logToConsole(l[m] + " => " + n);
   }
  }
 };
 e.exports = i;
}, null);

__d("FBRTCMozStatsReport", [ "Map", "FBRTCLogger", "FBRTCStatsHelpers" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 function j() {
  "use strict";
  this.$FBRTCMozStatsReport0 = null;
  this.$FBRTCMozStatsReport1 = null;
  this.$FBRTCMozStatsReport2 = null;
  this.$FBRTCMozStatsReport3 = null;
  this.candidates = new g();
  this.candidatePairs = new g();
  this.$FBRTCMozStatsReport4 = h.getInstance();
 }
 j.prototype.parseReport = function(k) {
  "use strict";
  k.forEach(function(l) {
   switch (l.type) {
   case "inboundrtp":
    if (!l.remoteId) break;
    var m = {
     inbound: l,
     outbound: k[l.remoteId]
    };
    if (l.isRemote) {
     if (m.outbound.hasOwnProperty("framerateMean")) {
      this.$FBRTCMozStatsReport1 = m;
     } else this.$FBRTCMozStatsReport0 = m;
    } else if (m.outbound.hasOwnProperty("framerateMean")) {
     this.$FBRTCMozStatsReport3 = m;
    } else this.$FBRTCMozStatsReport2 = m;
    break;

   case "outboundrtp":
    break;

   case "candidatepair":
    if (l.state === "succeeded") this.candidatePairs.set(l.id, l);
    break;

   case "localcandidate":
    this.candidates.set(l.id, l);
    break;

   case "remotecandidate":
    this.candidates.set(l.id, l);
    break;

   default:
    this.$FBRTCMozStatsReport4.logToConsole("unrecognized webrtc stats type " + l.type);
    break;
   }
  }.bind(this));
 };
 j.prototype.isConnected = function() {
  "use strict";
  return !!this.$FBRTCMozStatsReport0;
 };
 j.prototype.audioRtt = function() {
  "use strict";
  if (!this.$FBRTCMozStatsReport0) return 0;
  return this.$FBRTCMozStatsReport0.inbound.mozRtt;
 };
 j.prototype.videoRtt = function() {
  "use strict";
  if (!this.$FBRTCMozStatsReport1) return 0;
  return this.$FBRTCMozStatsReport1.inbound.mozRtt;
 };
 j.prototype.audioCodec = function() {
  "use strict";
  return "opus";
 };
 j.prototype.videoCodec = function() {
  "use strict";
  return "VP8";
 };
 j.prototype.audioPacketsLost = function() {
  "use strict";
  if (!this.$FBRTCMozStatsReport0) return 0;
  return this.$FBRTCMozStatsReport0.inbound.packetsLost;
 };
 j.prototype.setVideoPacketsLost = function(k) {
  "use strict";
 };
 j.prototype.videoPacketsLost = function() {
  "use strict";
  if (!this.$FBRTCMozStatsReport1) return 0;
  return this.$FBRTCMozStatsReport1.inbound.packetsLost;
 };
 j.prototype.audioBytesSent = function() {
  "use strict";
  if (!this.$FBRTCMozStatsReport0) return 0;
  return this.$FBRTCMozStatsReport0.outbound.bytesSent;
 };
 j.prototype.videoBytesSent = function() {
  "use strict";
  if (!this.$FBRTCMozStatsReport1) return 0;
  return this.$FBRTCMozStatsReport1.outbound.bytesSent;
 };
 j.prototype.audioPacketsSent = function() {
  "use strict";
  if (!this.$FBRTCMozStatsReport0) return 0;
  return this.$FBRTCMozStatsReport0.outbound.packetsSent;
 };
 j.prototype.videoPacketsSent = function() {
  "use strict";
  if (!this.$FBRTCMozStatsReport1) return 0;
  return this.$FBRTCMozStatsReport1.outbound.packetsSent;
 };
 j.prototype.videoFrameRateSent = function() {
  "use strict";
  if (!this.$FBRTCMozStatsReport1) return 0;
  return this.$FBRTCMozStatsReport1.outbound.framerateMean;
 };
 j.prototype.videoFrameRateCaptured = function() {
  "use strict";
  if (!this.$FBRTCMozStatsReport1) return 0;
  return 30;
 };
 j.prototype.connectionType = function() {
  "use strict";
  var k = "unknown", l = "unknown", m = "unknown", n = "unknown";
  this.candidatePairs.forEach(function(o) {
   var p = this.candidates.get(o.localCandidateId), q = this.candidates.get(o.remoteCandidateId);
   k = p.transport;
   m = q.transport;
   l = p.candidateType;
   n = q.candidateType;
  }.bind(this));
  return i.connectionType(l, k, n, m);
 };
 e.exports = j;
}, null);

__d("FBRTCChromeStatsReport", [ "FBRTCStatsHelpers" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 var h = function(j, k) {
  return parseInt(j.stat(k), 10);
 };
 function i() {
  "use strict";
  this.$FBRTCChromeStatsReport0 = [];
  this.$FBRTCChromeStatsReport1 = null;
  this.$FBRTCChromeStatsReport2 = null;
  this.$FBRTCChromeStatsReport3 = null;
  this.$FBRTCChromeStatsReport4 = null;
  this.$FBRTCChromeStatsReport5 = null;
 }
 i.prototype.parseReport = function(j) {
  "use strict";
  j.result().forEach(function(k) {
   if (k.type === "googCandidatePair" && k.stat("googActiveConnection") === "true") this.$FBRTCChromeStatsReport0.push(k);
   if (this.$FBRTCChromeStatsReport6(k)) this.$FBRTCChromeStatsReport1 = k;
   if (this.$FBRTCChromeStatsReport7(k)) this.$FBRTCChromeStatsReport2 = k;
   if (this.$FBRTCChromeStatsReport8(k)) this.$FBRTCChromeStatsReport3 = k;
   if (this.$FBRTCChromeStatsReport9(k)) this.$FBRTCChromeStatsReport4 = k;
   if (k.type === "VideoBwe") this.$FBRTCChromeStatsReport5 = k;
  }.bind(this));
 };
 i.prototype.isConnected = function() {
  "use strict";
  return true;
 };
 i.prototype.audioRtt = function() {
  "use strict";
  if (!this.$FBRTCChromeStatsReport1) return 0;
  return h(this.$FBRTCChromeStatsReport1, "googRtt");
 };
 i.prototype.videoRtt = function() {
  "use strict";
  if (!this.$FBRTCChromeStatsReport2) return 0;
  return h(this.$FBRTCChromeStatsReport2, "googRtt");
 };
 i.prototype.audioCodec = function() {
  "use strict";
  if (!this.$FBRTCChromeStatsReport1) return "unknown";
  return this.$FBRTCChromeStatsReport1.stat("googCodecName");
 };
 i.prototype.videoCodec = function() {
  "use strict";
  if (!this.$FBRTCChromeStatsReport2) return "unknown";
  return this.$FBRTCChromeStatsReport2.stat("googCodecName");
 };
 i.prototype.audioPacketsLost = function() {
  "use strict";
  if (!this.$FBRTCChromeStatsReport1) return 0;
  return h(this.$FBRTCChromeStatsReport1, "packetsLost");
 };
 i.prototype.setVideoPacketsLost = function(j) {
  "use strict";
  this.$FBRTCChromeStatsReporta = j;
 };
 i.prototype.videoPacketsLost = function() {
  "use strict";
  if (!this.$FBRTCChromeStatsReport2) return 0;
  if (this.$FBRTCChromeStatsReporta) return this.$FBRTCChromeStatsReporta;
  return h(this.$FBRTCChromeStatsReport2, "packetsLost");
 };
 i.prototype.audioBytesSent = function() {
  "use strict";
  if (!this.$FBRTCChromeStatsReport1) return 0;
  return h(this.$FBRTCChromeStatsReport1, "bytesSent");
 };
 i.prototype.videoBytesSent = function() {
  "use strict";
  if (!this.$FBRTCChromeStatsReport2) return 0;
  return h(this.$FBRTCChromeStatsReport2, "bytesSent");
 };
 i.prototype.audioPacketsSent = function() {
  "use strict";
  if (!this.$FBRTCChromeStatsReport1) return 0;
  return h(this.$FBRTCChromeStatsReport1, "packetsSent");
 };
 i.prototype.videoPacketsSent = function() {
  "use strict";
  if (!this.$FBRTCChromeStatsReport2) return 0;
  return h(this.$FBRTCChromeStatsReport2, "packetsSent");
 };
 i.prototype.videoFrameRateSent = function() {
  "use strict";
  if (!this.$FBRTCChromeStatsReport2) return 0;
  return h(this.$FBRTCChromeStatsReport2, "googFrameRateSent");
 };
 i.prototype.videoFrameRateCaptured = function() {
  "use strict";
  if (!this.$FBRTCChromeStatsReport2) return 0;
  return h(this.$FBRTCChromeStatsReport2, "googFrameRateInput");
 };
 i.prototype.connectionType = function() {
  "use strict";
  var j = "unknown", k = "unknown", l = "unknown";
  for (var m = 0; m < this.$FBRTCChromeStatsReport0.length; m++) {
   var n = this.$FBRTCChromeStatsReport0[m];
   k = n.stat("googLocalCandidateType");
   l = n.stat("googRemoteCandidateType");
   j = n.stat("googTransportType");
  }
  return g.connectionType(k, j, l, j);
 };
 i.prototype.$FBRTCChromeStatsReport6 = function(j) {
  "use strict";
  return j.type === "ssrc" && j.names().indexOf("audioInputLevel") > -1;
 };
 i.prototype.$FBRTCChromeStatsReport7 = function(j) {
  "use strict";
  return j.type === "ssrc" && j.names().indexOf("googFrameHeightInput") > -1;
 };
 i.prototype.$FBRTCChromeStatsReport8 = function(j) {
  "use strict";
  return j.type === "ssrc" && j.names().indexOf("audioOutputLevel") > -1;
 };
 i.prototype.$FBRTCChromeStatsReport9 = function(j) {
  "use strict";
  return j.type === "ssrc" && j.names().indexOf("googFrameHeightReceived") > -1;
 };
 e.exports = i;
}, null);

__d("FBRTCStatsReportFactory", [ "FBRTCMozStatsReport", "FBRTCChromeStatsReport", "FBRTCLogger", "FBRTCVersionDetection" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 var k = function(n, o) {
  n.getStats(null, function(p) {
   var q = new g();
   q.parseReport(p);
   o(q);
  }, function() {
   i.getInstance().logToConsole("Firefox stats collection failed");
  });
 }, l = function(n, o) {
  n.getStats(function(p) {
   var q = new h();
   q.parseReport(p);
   o(q);
  });
 }, m = {
  getStats: function(n, o) {
   if (j.isFirefox()) k(n, o);
   if (j.isChrome()) l(n, o);
  }
 };
 e.exports = m;
}, null);

__d("FBRTCCallConnection", [ "mixInEventEmitter", "FBRTCLogger", "FBRTCPCConfig", "FBRTCSdpUtils", "FBRTCStatsReportFactory" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 var l = 3e5, m = 12e3, n = 1e4;
 function o() {
  "use strict";
  this.$FBRTCCallConnection0 = h.getInstance();
  this.$FBRTCCallConnection1();
  this.$FBRTCCallConnection2 = null;
  this.$FBRTCCallConnection3 = null;
  this.$FBRTCCallConnection4 = null;
  this.$FBRTCCallConnection5 = false;
  this.$FBRTCCallConnection6 = 0;
  this.$FBRTCCallConnection7 = [];
  this.$FBRTCCallConnection8 = false;
  this.$FBRTCCallConnection9 = "passive";
  this.$FBRTCCallConnectiona = true;
 }
 o.prototype.init = function(p) {
  "use strict";
  this.$FBRTCCallConnection0.logToConsole("Creating a new peer connection with: " + JSON.stringify(i.getConfig()) + ", " + JSON.stringify(i.getConstraints()));
  this.$FBRTCCallConnectionb = p;
 };
 o.prototype.setStream = function(p) {
  "use strict";
  this.$FBRTCCallConnectionb = p;
 };
 o.prototype.setPeerSupportsVideo = function(p) {
  "use strict";
  this.$FBRTCCallConnectiona = p;
 };
 o.prototype.$FBRTCCallConnectionc = function(p, q) {
  "use strict";
  p.onaddstream = null;
  p.onremovestream = null;
  p.onicecandidate = null;
  p.oniceconnectionstatechange = null;
  this.$FBRTCCallConnection7 = [];
  var r = q ? 5e3 : 1;
  setTimeout(function() {
   if (p.iceConnectionState !== "closed") p.close();
  }, r);
 };
 o.prototype.$FBRTCCallConnectiond = function() {
  "use strict";
  if (this.$FBRTCCallConnection2) this.$FBRTCCallConnectionc(this.$FBRTCCallConnection2, true);
  var p = new this.nativePeerConnection(i.getConfig(), i.getConstraints());
  this.$FBRTCCallConnection9 = "passive";
  p.onaddstream = this.$FBRTCCallConnectione.bind(this);
  p.onremovestream = this.$FBRTCCallConnectionf.bind(this);
  p.onicecandidate = this.$FBRTCCallConnectiong.bind(this);
  p.oniceconnectionstatechange = this.$FBRTCCallConnectionh.bind(this);
  p.addStream(this.$FBRTCCallConnectionb.getStream());
  return p;
 };
 o.prototype.createOffer = function() {
  "use strict";
  this.$FBRTCCallConnection2 = this.$FBRTCCallConnectiond();
  this.$FBRTCCallConnectioni("offer");
  this.$FBRTCCallConnection9 = "active";
 };
 o.prototype.createSdpUpdate = function() {
  "use strict";
  var p = this.$FBRTCCallConnection2.getLocalStreams();
  for (var q = 0; q < p.length; q++) this.$FBRTCCallConnection2.removeStream(p[q]);
  this.$FBRTCCallConnection2.addStream(this.$FBRTCCallConnectionb.getStream());
  this.$FBRTCCallConnectioni("sdp_update");
 };
 o.prototype.$FBRTCCallConnectioni = function(p) {
  "use strict";
  this.$FBRTCCallConnection8 = true;
  this.$FBRTCCallConnection2.createOffer(this.$FBRTCCallConnectionj.bind(this, p), this.$FBRTCCallConnectionk.bind(this, "CreateOfferFailed"), this.$FBRTCCallConnectionl());
 };
 o.prototype.$FBRTCCallConnectionl = function() {
  "use strict";
  return {
   mandatory: {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: this.$FBRTCCallConnectiona
   }
  };
 };
 o.prototype.end = function() {
  "use strict";
  this.$FBRTCCallConnection0.logToConsole("Ending connection...");
  if (this.$FBRTCCallConnection2) {
   this.emit("isEnding");
   this.$FBRTCCallConnectionc(this.$FBRTCCallConnection2, false);
   this.$FBRTCCallConnection2 = null;
  }
 };
 o.prototype.onReceivedOfferSDP = function(p) {
  "use strict";
  this.$FBRTCCallConnection2 = this.$FBRTCCallConnectiond();
  var q = new this.nativeSessionDescription({
   type: "offer",
   sdp: p
  });
  this.$FBRTCCallConnection2.setRemoteDescription(q, this.$FBRTCCallConnectionm.bind(this, q), this.$FBRTCCallConnectionk.bind(this, "SetRemoteOfferFailed"));
 };
 o.prototype.onReceivedAnswerSDP = function(p) {
  "use strict";
  var q = new this.nativeSessionDescription({
   type: "answer",
   sdp: p
  });
  this.$FBRTCCallConnection2.setRemoteDescription(q, this.$FBRTCCallConnectionm.bind(this, q), this.$FBRTCCallConnectionk.bind(this, "SetRemoteAnswerFailed"));
 };
 o.prototype.onReceivedSdpUpdate = function(p) {
  "use strict";
  if (this.$FBRTCCallConnection8) setTimeout(function() {
   this.onReceivedSdpUpdate(p);
  }.bind(this), 200);
  switch (this.$FBRTCCallConnection2.signalingState) {
  case "stable":
   this.$FBRTCCallConnectionn(p, "offer");
   break;

  case "have-local-offer":
   p = j.setDtlsRole(p, this.$FBRTCCallConnection9);
   this.$FBRTCCallConnectionn(p, "answer");
   break;

  case "have-remote-offer":
   setTimeout(function() {
    this.onReceivedSdpUpdate(p);
   }.bind(this), 1e3);
   break;

  case "have-local-pranswer":
  case "have-remote-pranswer":
   break;

  case "closed":
   break;
  }
 };
 o.prototype.$FBRTCCallConnectionn = function(p, q) {
  "use strict";
  var r = new this.nativeSessionDescription({
   type: q,
   sdp: p
  });
  this.$FBRTCCallConnection8 = true;
  this.$FBRTCCallConnection2.setRemoteDescription(r, function() {
   this.$FBRTCCallConnection0.logToConsole("sdp update " + r.type + " set");
   if (this.$FBRTCCallConnection2 && r.type === "offer") {
    this.$FBRTCCallConnection2.createAnswer(this.$FBRTCCallConnectionj.bind(this, "sdp_update"), this.$FBRTCCallConnectionk.bind(this, "CreateSdpUpdateFailed"));
   } else this.$FBRTCCallConnection8 = false;
  }.bind(this), this.$FBRTCCallConnectionk.bind(this, "SetRemoteSdpUpdateFailed"));
 };
 o.prototype.onReceivedRemoteIceCandidate = function(p) {
  "use strict";
  p.sdp = j.fixMobileIceSdp(p.sdp);
  var q = new this.nativeIceCandidate({
   sdpMLineIndex: p.label,
   candidate: p.sdp,
   sdpMid: p.sdp_mid
  });
  this.$FBRTCCallConnection2.addIceCandidate(q);
 };
 o.prototype.getStats = function(p) {
  "use strict";
  k.getStats(this.$FBRTCCallConnection2, p);
 };
 o.prototype.getCreatedIceCandidates = function() {
  "use strict";
  return this.$FBRTCCallConnection7;
 };
 o.prototype.$FBRTCCallConnectionj = function(p, q) {
  "use strict";
  this.$FBRTCCallConnection0.logToConsole("Created " + p + " sdp");
  if (!this.$FBRTCCallConnection2) {
   this.$FBRTCCallConnection0.logToConsole("_onSDPCreated: pc has been deallocated");
   return;
  }
  if (!this.$FBRTCCallConnectiona && p === "sdp_update") q.sdp = j.disableVideo(q.sdp);
  q.sdp = j.addIceOptionToSdp(q.sdp, "fb-force-5245");
  q.sdp = j.preferIsac(q.sdp);
  q.sdp = j.removeSdparta(q.sdp);
  this.$FBRTCCallConnection2.setLocalDescription(q, function() {
   this.$FBRTCCallConnection8 = false;
   this.$FBRTCCallConnection0.logToConsole("Local " + p + " set");
   this.emit("sdpCreated", {
    type: p,
    sdp: q.sdp
   });
  }.bind(this), this.$FBRTCCallConnectionk.bind(this, "SetLocalDescriptionFailed:" + p));
 };
 o.prototype.$FBRTCCallConnectionm = function(p) {
  "use strict";
  this.$FBRTCCallConnection0.logToConsole("Remote " + p.type + " set");
  if (!this.$FBRTCCallConnection2) {
   this.$FBRTCCallConnection0.logToConsole("_onRemoteDescriptionSet: pc has been deallocated");
   return;
  }
  if (p.type === "offer") this.$FBRTCCallConnection2.createAnswer(this.$FBRTCCallConnectionj.bind(this, "answer"), this.$FBRTCCallConnectionk.bind(this, "CreateAnswerFailed"));
  this.emit("remoteDescriptionSet");
 };
 o.prototype.$FBRTCCallConnectione = function(event) {
  "use strict";
  this.$FBRTCCallConnection0.logToConsole("Remote stream added");
  this.emit("remoteStreamAdded", {
   stream: event.stream
  });
 };
 o.prototype.$FBRTCCallConnectionf = function(event) {
  "use strict";
  this.$FBRTCCallConnection0.logToConsole("Remote stream removed");
 };
 o.prototype.$FBRTCCallConnectiong = function(event) {
  "use strict";
  if (event.candidate) {
   this.$FBRTCCallConnection7.push(event.candidate);
   this.emit("localIceCandidateCreated", event.candidate);
  }
 };
 o.prototype.$FBRTCCallConnectionh = function(event) {
  "use strict";
  var p = event.target.iceConnectionState;
  this.$FBRTCCallConnection0.logToConsole("Ice candidate state changed from " + this.$FBRTCCallConnection3 + " to " + p);
  if (p === this.$FBRTCCallConnection3) return;
  this.$FBRTCCallConnectiono();
  if (this.$FBRTCCallConnectionp(p)) {
   if (!this.$FBRTCCallConnection5) {
    this.emit("connected");
    this.$FBRTCCallConnection5 = true;
   }
  } else if (p === "disconnected") {
   this.$FBRTCCallConnectionq();
  } else if (p === "failed") this.$FBRTCCallConnectionr();
  this.$FBRTCCallConnection3 = p;
 };
 o.prototype.$FBRTCCallConnectionp = function(p) {
  "use strict";
  return p === "completed" || p === "connected";
 };
 o.prototype.$FBRTCCallConnectionq = function() {
  "use strict";
  if (this.$FBRTCCallConnectionp(this.$FBRTCCallConnection3)) {
   var p = Date.now();
   if (this.$FBRTCCallConnections - p >= l) this.$FBRTCCallConnection6 = 0;
   this.$FBRTCCallConnection6 = this.$FBRTCCallConnection6 + 1;
   this.$FBRTCCallConnections = p;
   if (this.$FBRTCCallConnection6 >= 2) this.emit("connectionUnstable");
  }
  var q = this;
  this.$FBRTCCallConnection4 = setTimeout(function() {
   q.emit("disconnected");
  }, m);
 };
 o.prototype.$FBRTCCallConnectionr = function() {
  "use strict";
  var p = this;
  this.$FBRTCCallConnection4 = setTimeout(function() {
   var q = {
    details: "Ice candidate state failed",
    endCallSubreason: "IceFailed"
   };
   p.emit("connectionError", q);
  }, n);
 };
 o.prototype.$FBRTCCallConnectiono = function() {
  "use strict";
  if (this.$FBRTCCallConnection4) clearTimeout(this.$FBRTCCallConnection4);
  this.$FBRTCCallConnection4 = null;
 };
 o.prototype.$FBRTCCallConnectionk = function(p, q) {
  "use strict";
  var r = {
   details: q,
   endCallSubreason: p
  };
  this.emit("connectionError", r);
 };
 o.prototype.$FBRTCCallConnection1 = function() {
  "use strict";
  if (window.webkitRTCPeerConnection) {
   this.$FBRTCCallConnection0.logToConsole("Using Chrome WebRTC APIs...");
   this.nativePeerConnection = window.webkitRTCPeerConnection;
   this.nativeIceCandidate = window.RTCIceCandidate;
   this.nativeSessionDescription = window.RTCSessionDescription;
  } else {
   this.$FBRTCCallConnection0.logToConsole("Using Firefox WebRTC APIs...");
   this.nativePeerConnection = window.mozRTCPeerConnection;
   this.nativeIceCandidate = window.mozRTCIceCandidate;
   this.nativeSessionDescription = window.mozRTCSessionDescription;
  }
 };
 g(o, {
  remoteStreamAdded: true,
  sdpCreated: true,
  localIceCandidateCreated: true,
  remoteDescriptionSet: true,
  connected: true,
  disconnected: true,
  connectionUnstable: true,
  connectionError: true,
  isEnding: true
 });
 e.exports = o;
}, null);

__d("RingBuffer", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 function g(h) {
  "use strict";
  this.$RingBuffer0 = h;
  this.$RingBuffer1 = -1;
  this.$RingBuffer2 = [];
 }
 g.prototype.add = function(h) {
  "use strict";
  this.$RingBuffer1 = (this.$RingBuffer1 + 1) % this.$RingBuffer0;
  this.$RingBuffer2[this.$RingBuffer1] = h;
 };
 g.prototype.size = function() {
  "use strict";
  return this.$RingBuffer2.length;
 };
 g.prototype.head = function() {
  "use strict";
  if (this.$RingBuffer1 === -1) return null;
  return this.$RingBuffer2[this.$RingBuffer1];
 };
 g.prototype.tail = function() {
  "use strict";
  if (this.$RingBuffer1 === -1) return null;
  return this.$RingBuffer2[this.$RingBuffer3()];
 };
 g.prototype.forEach = function(h) {
  "use strict";
  for (var i = 0; i < this.$RingBuffer2.length; i++) {
   var j = (this.$RingBuffer1 + 1 + i) % this.$RingBuffer2.length;
   h(this.$RingBuffer2[j]);
  }
 };
 g.prototype.$RingBuffer3 = function() {
  "use strict";
  return (this.$RingBuffer1 + 1) % this.$RingBuffer2.length;
 };
 e.exports = g;
}, null);

__d("FBRTCRttAggregator", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 function g() {
  "use strict";
  this.$FBRTCRttAggregator0 = [ {
   count: 0,
   ave: 0
  }, {
   count: 0,
   ave: 0
  }, {
   count: 0,
   ave: 0
  }, {
   count: 0,
   ave: 0
  } ];
 }
 g.prototype.addRtt = function(h) {
  "use strict";
  var i = this.$FBRTCRttAggregator0[this.$FBRTCRttAggregator1(h)];
  i.ave = this.$FBRTCRttAggregator2(i.ave, i.count, h);
  i.count += 1;
 };
 g.prototype.toString = function() {
  "use strict";
  return [ this.$FBRTCRttAggregator3("50", this.$FBRTCRttAggregator0[0]), this.$FBRTCRttAggregator3("100", this.$FBRTCRttAggregator0[1]), this.$FBRTCRttAggregator3("200", this.$FBRTCRttAggregator0[2]), this.$FBRTCRttAggregator3("0", this.$FBRTCRttAggregator0[3]) ].join("|");
 };
 g.prototype.$FBRTCRttAggregator3 = function(h, i) {
  "use strict";
  return h + "=" + i.count + "," + Math.round(i.ave);
 };
 g.prototype.$FBRTCRttAggregator1 = function(h) {
  "use strict";
  if (h < 50) return 0;
  if (h < 100) return 1;
  if (h < 200) return 2;
  return 3;
 };
 g.prototype.$FBRTCRttAggregator2 = function(h, i, j) {
  "use strict";
  return (h * i + j) / (i + 1);
 };
 e.exports = g;
}, null);

__d("FBRTCStatsInterpreter", [ "FBRTCLogger" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 var h = {
  rtt_weight: 2,
  frr_weight: 800,
  plr_weight: 500,
  score_threshold: 1e3,
  bad_score_count: 3
 };
 function i(j) {
  "use strict";
  this.$FBRTCStatsInterpreter0 = Object.assign({}, h, j || {});
  this.$FBRTCStatsInterpreter1 = g.getInstance();
  this.$FBRTCStatsInterpreter2 = 0;
 }
 i.prototype.interpretStats = function(j, k) {
  "use strict";
  var l = j.videoRtt(), m = this.$FBRTCStatsInterpreter3(j), n = this.$FBRTCStatsInterpreter4(j, k), o = this.$FBRTCStatsInterpreter5(l, m, n);
  if (o >= this.$FBRTCStatsInterpreter0.score_threshold && !this.isNetworkPoor()) this.$FBRTCStatsInterpreter2 += 1;
  if (o < this.$FBRTCStatsInterpreter0.score_threshold && this.$FBRTCStatsInterpreter2 > 0) this.$FBRTCStatsInterpreter2 -= 1;
 };
 i.prototype.isNetworkPoor = function() {
  "use strict";
  return this.$FBRTCStatsInterpreter2 >= this.$FBRTCStatsInterpreter0.bad_score_count;
 };
 i.prototype.$FBRTCStatsInterpreter5 = function(j, k, l) {
  "use strict";
  return j * this.$FBRTCStatsInterpreter0.rtt_weight + k * this.$FBRTCStatsInterpreter0.frr_weight + l * this.$FBRTCStatsInterpreter0.plr_weight;
 };
 i.prototype.$FBRTCStatsInterpreter4 = function(j, k) {
  "use strict";
  var l, m;
  if (k) {
   l = j.videoPacketsLost() - k.videoPacketsLost();
   m = j.videoPacketsSent() - k.videoPacketsSent();
  } else {
   l = j.videoPacketsLost();
   m = j.videoPacketsSent();
  }
  if (l < 0 || m === 0) return 0;
  return l / m;
 };
 i.prototype.$FBRTCStatsInterpreter3 = function(j) {
  "use strict";
  if (j.videoFrameRateCaptured() === 0) return 0;
  return 1 - j.videoFrameRateSent() / j.videoFrameRateCaptured();
 };
 e.exports = i;
}, null);

__d("FBRTCCallConnectionMonitor", [ "RingBuffer", "FBRTCRttAggregator", "FBRTCStatsInterpreter", "FBRTCConfig", "mixInEventEmitter" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 var l = 3e3, m = 1, n = 0, o = 3;
 function p(q, r) {
  "use strict";
  this.$FBRTCCallConnectionMonitor0 = new i(j.statsInterpreterConfig());
  this.$FBRTCCallConnectionMonitor1 = new h();
  this.$FBRTCCallConnectionMonitor2 = new h();
  this.$FBRTCCallConnectionMonitor3 = q;
  this.$FBRTCCallConnectionMonitor4 = r;
  this.$FBRTCCallConnectionMonitor5 = null;
  this.$FBRTCCallConnectionMonitor6 = [];
  this.$FBRTCCallConnectionMonitor7 = new g(m);
  this.$FBRTCCallConnectionMonitor8 = 0;
  this.$FBRTCCallConnectionMonitor3.addListener("connected", this.$FBRTCCallConnectionMonitor9, this);
  this.$FBRTCCallConnectionMonitor3.addListener("isEnding", this.$FBRTCCallConnectionMonitora, this);
 }
 p.prototype.$FBRTCCallConnectionMonitor9 = function() {
  "use strict";
  var q = this.$FBRTCCallConnectionMonitorb.bind(this);
  this.$FBRTCCallConnectionMonitor5 = setInterval(q, l);
  this.$FBRTCCallConnectionMonitorb();
 };
 p.prototype.$FBRTCCallConnectionMonitora = function() {
  "use strict";
  if (this.$FBRTCCallConnectionMonitor5 !== null) {
   this.$FBRTCCallConnectionMonitorb();
   clearInterval(this.$FBRTCCallConnectionMonitor5);
   this.$FBRTCCallConnectionMonitor5 = null;
  }
 };
 p.prototype.$FBRTCCallConnectionMonitorb = function() {
  "use strict";
  this.$FBRTCCallConnectionMonitor3.getStats(function(q) {
   var r;
   if (this.$FBRTCCallConnectionMonitor7.size() > 0) {
    r = this.$FBRTCCallConnectionMonitor7.head();
    this.$FBRTCCallConnectionMonitorc(q, r);
   }
   if (this.$FBRTCCallConnectionMonitor6.length < n) this.$FBRTCCallConnectionMonitor6.push(q);
   if (r && r.isConnected() && !q.isConnected()) this.$FBRTCCallConnectionMonitor8 += 1;
   if (this.$FBRTCCallConnectionMonitor8 >= o) this.$FBRTCCallConnectionMonitor3.emit("disconnected");
   if (q.isConnected()) {
    this.$FBRTCCallConnectionMonitor8 = 0;
    this.$FBRTCCallConnectionMonitor7.add(q);
    this.$FBRTCCallConnectionMonitor1.addRtt(q.audioRtt());
    this.$FBRTCCallConnectionMonitor2.addRtt(q.videoRtt());
    this.$FBRTCCallConnectionMonitor4.setPcStats(this.$FBRTCCallConnectionMonitord());
    this.$FBRTCCallConnectionMonitore(q, r);
   }
  }.bind(this));
 };
 p.prototype.$FBRTCCallConnectionMonitord = function() {
  "use strict";
  var q = this.$FBRTCCallConnectionMonitor7.head();
  return {
   end: {
    conn_type: q.connectionType()
   },
   sender: {
    bytes: q.audioBytesSent(),
    codec: {
     "0": q.audioCodec()
    },
    plost: q.audioPacketsLost(),
    psent: q.audioPacketsSent(),
    rtt: this.$FBRTCCallConnectionMonitor1.toString()
   },
   video: {
    sender: {
     bytes: q.videoBytesSent(),
     codec: {
      "0": q.videoCodec()
     },
     plost: q.videoPacketsLost(),
     psent: q.videoPacketsSent(),
     rtt: this.$FBRTCCallConnectionMonitor2.toString()
    }
   }
  };
 };
 p.prototype.$FBRTCCallConnectionMonitorc = function(q, r) {
  "use strict";
  if (r.videoPacketsLost() > q.videoPacketsLost()) q.setVideoPacketsLost(r.videoPacketsLost());
 };
 p.prototype.$FBRTCCallConnectionMonitore = function(q, r) {
  "use strict";
  this.$FBRTCCallConnectionMonitor0.interpretStats(q, r);
  if (this.$FBRTCCallConnectionMonitor0.isNetworkPoor()) this.emit("connectionPoor");
 };
 k(p, {
  connectionPoor: true
 });
 e.exports = p;
}, null);

__d("FBRTCFullScreenController", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 var g, h, i = document.documentElement;
 if (i.requestFullscreen) {
  g = i.requestFullscreen.bind(i);
  h = "fullscreenchange";
 } else if (i.msRequestFullscreen) {
  g = i.msRequestFullscreen.bind(i);
  h = "msfullscreenchange";
 } else if (i.mozRequestFullScreen) {
  g = i.mozRequestFullScreen.bind(i);
  h = "mozfullscreenchange";
 } else if (i.webkitRequestFullscreen) {
  g = i.webkitRequestFullscreen.bind(i, Element.ALLOW_KEYBOARD_INPUT);
  h = "webkitfullscreenchange";
 }
 var j;
 if (document.exitFullscreen) {
  j = document.exitFullscreen.bind(document);
 } else if (document.msExitFullscreen) {
  j = document.msExitFullscreen.bind(document);
 } else if (document.mozCancelFullScreen) {
  j = document.mozCancelFullScreen.bind(document);
 } else if (document.webkitExitFullscreen) j = document.webkitExitFullscreen.bind(document);
 var k = {
  supportsFullScreen: function() {
   return g && j;
  },
  isFullScreen: function() {
   return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
  },
  toggleFullScreen: function() {
   if (this.isFullScreen()) {
    j();
   } else g();
  },
  onFullScreenChange: function(l) {
   document.addEventListener(h, l);
  }
 };
 e.exports = k;
}, null);

__d("XVideoCallUserInfoController", [ "XController" ], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 e.exports = b("XController").create("/videocall/userinfo/", {
  user_id: {
   type: "Int",
   required: true
  }
 });
}, null);

__d("FBRTCPeerInfo", [ "ix", "XVideoCallUserInfoController", "FBRTCUtils" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 function j(k) {
  "use strict";
  this.peerID = k;
  this.peerPicUrl = null;
  this.selfPicUrl = g("/images/chat/webrtc/no_profile_pic.png");
  this.backgroundUrl = null;
  this.peerName = "";
  this.peerShortName = null;
 }
 j.prototype.fetch = function(k, l) {
  "use strict";
  var m = h.getURIBuilder().setInt("user_id", this.peerID).getURI(), n = this;
  i.sendServerRequest(m, function(o) {
   n.peerPicUrl = o.payload.profile_pic_url;
   n.backgroundUrl = o.payload.cover_pic_url;
   n.peerName = o.payload.name;
   n.peerShortName = o.payload.peer_short_name;
   if (o.payload.self_profile_pic_url) n.selfPicUrl = o.payload.self_profile_pic_url;
   if (k) k();
  }, l);
 };
 e.exports = j;
}, null);

__d("FBRTCStreamWrapper", [ "mixInEventEmitter", "FBRTCUtils" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 var i = 100, j = window.AudioContext || window.webkitAudioContext || window.mozAudioContext, k;
 function l() {
  "use strict";
  this.$FBRTCStreamWrapper0 = true;
  this.$FBRTCStreamWrapper1 = true;
  this.$FBRTCStreamWrapper2 = null;
  this.$FBRTCStreamWrapper3 = null;
  this.aspectRatio = l.aspectRatios.other;
  this.videoWidth = 0;
  this.videoHeight = 0;
 }
 l.prototype.setStream = function(m) {
  "use strict";
  var n = this.hasStream();
  this.stopStream();
  this.$FBRTCStreamWrapper2 = m;
  this.$FBRTCStreamWrapper4();
  this.$FBRTCStreamWrapper2.onaddtrack = this.$FBRTCStreamWrapper5.bind(this);
  this.$FBRTCStreamWrapper2.onremovetrack = this.$FBRTCStreamWrapper5.bind(this);
  this.$FBRTCStreamWrapper2.onended = this.$FBRTCStreamWrapper6.bind(this);
  if (n) this.emit("tracksChanged");
 };
 l.prototype.getStream = function() {
  "use strict";
  return this.$FBRTCStreamWrapper2;
 };
 l.prototype.hasStream = function() {
  "use strict";
  return !!this.$FBRTCStreamWrapper2;
 };
 l.prototype.stopStream = function() {
  "use strict";
  if (this.$FBRTCStreamWrapper2) {
   if (this.$FBRTCStreamWrapper2.stop) this.$FBRTCStreamWrapper2.stop();
   this.$FBRTCStreamWrapper2 = null;
  }
 };
 l.prototype.hasVideoTracks = function() {
  "use strict";
  if (this.$FBRTCStreamWrapper2) return this.$FBRTCStreamWrapper2.getVideoTracks().length > 0;
  return true;
 };
 l.prototype.hasVideo = function() {
  "use strict";
  return this.$FBRTCStreamWrapper1 && this.hasVideoTracks();
 };
 l.prototype.hasAudio = function() {
  "use strict";
  return this.$FBRTCStreamWrapper0;
 };
 l.prototype.attachToVideoTag = function(m) {
  "use strict";
  if (this.$FBRTCStreamWrapper2) {
   this.$FBRTCStreamWrapper3 = m;
   h.attachMediaStream(m, this.$FBRTCStreamWrapper2);
   this.$FBRTCStreamWrapper7(m);
  }
 };
 l.prototype.getAudioAnalyser = function() {
  "use strict";
  if (this.$FBRTCStreamWrapper2) {
   var m = this.$FBRTCStreamWrapper8(), n = m.createMediaStreamSource(this.$FBRTCStreamWrapper2), o = m.createAnalyser();
   o.fftSize = 2048;
   n.connect(o);
   return o;
  }
 };
 l.prototype.$FBRTCStreamWrapper8 = function() {
  "use strict";
  if (!k) k = new j();
  return k;
 };
 l.prototype.toggleMuteAudio = function() {
  "use strict";
  var m = this.$FBRTCStreamWrapper2.getAudioTracks();
  this.$FBRTCStreamWrapper0 = !this.$FBRTCStreamWrapper0;
  for (var n = 0; n < m.length; n++) m[n].enabled = this.$FBRTCStreamWrapper0;
 };
 l.prototype.toggleMuteVideo = function() {
  "use strict";
  this.$FBRTCStreamWrapper1 = !this.$FBRTCStreamWrapper1;
  if (this.$FBRTCStreamWrapper1) {
   this.$FBRTCStreamWrapper4();
  } else setTimeout(this.$FBRTCStreamWrapper4.bind(this), 500);
  this.$FBRTCStreamWrapper5();
 };
 l.prototype.$FBRTCStreamWrapper4 = function() {
  "use strict";
  if (this.$FBRTCStreamWrapper2) {
   var m = this.$FBRTCStreamWrapper2.getVideoTracks();
   for (var n = 0; n < m.length; n++) m[n].enabled = this.$FBRTCStreamWrapper1;
  }
 };
 l.prototype.setVideoEnabled = function(m) {
  "use strict";
  this.$FBRTCStreamWrapper1 = m;
  this.$FBRTCStreamWrapper4();
  this.$FBRTCStreamWrapper5();
 };
 l.prototype.$FBRTCStreamWrapper7 = function(m) {
  "use strict";
  if (!this.hasVideo() || m.currentTime > 0) {
   this.$FBRTCStreamWrapper9(m);
  } else setTimeout(this.$FBRTCStreamWrapper7.bind(this, m), i);
 };
 l.prototype.$FBRTCStreamWrappera = function(m) {
  "use strict";
  this.videoWidth = m.videoWidth;
  this.videoHeight = m.videoHeight;
  var n = m.videoWidth / m.videoHeight;
  if (h.aboutEqual(n, 16 / 9)) return l.aspectRatios["16:9"];
  if (h.aboutEqual(n, 4 / 3)) return l.aspectRatios["4:3"];
  return l.aspectRatios.other;
 };
 l.prototype.$FBRTCStreamWrapper9 = function(m) {
  "use strict";
  if (this.hasVideo()) {
   this.aspectRatio = this.$FBRTCStreamWrappera(m);
  } else this.aspectRatio = l.aspectRatios.other;
  this.emit("streamStarted");
 };
 l.prototype.$FBRTCStreamWrapper6 = function() {
  "use strict";
  this.emit("streamEnded");
 };
 l.prototype.$FBRTCStreamWrapper5 = function(event) {
  "use strict";
  if (this.$FBRTCStreamWrapperb(event)) this.attachToVideoTag(this.$FBRTCStreamWrapper3);
  this.emit("tracksChanged");
 };
 l.prototype.$FBRTCStreamWrapperb = function(m) {
  "use strict";
  return this.$FBRTCStreamWrapper3 && m && m.type === "addtrack" && m.track.kind === "video";
 };
 l.aspectRatios = {
  "16:9": 1,
  "4:3": 2,
  other: 3
 };
 g(l, {
  streamStarted: true,
  streamEnded: true,
  tracksChanged: true
 });
 e.exports = l;
}, null);

__d("FBRTCCallModel", [ "mixInEventEmitter", "FBRTCAdminMessage", "FBRTCCallConstants", "FBRTCConfig", "FBRTCFullScreenController", "FBRTCLogger", "FBRTCPCConfig", "FBRTCPeerInfo", "FBRTCStreamWrapper", "FBRTCStruct" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
 b.__markCompiled && b.__markCompiled();
 function q(r) {
  "use strict";
  this.$FBRTCCallModel0 = l.getInstance();
  this.isCaller = r.isCaller;
  this.peerID = r.peerID;
  this.$FBRTCCallModel1 = new n(r.peerID);
  this.$FBRTCCallModel2(r.callID);
  this.$FBRTCCallModel3(true);
 }
 q.prototype.resetForReconnect = function(r) {
  "use strict";
  this.isCaller = false;
  this.$FBRTCCallModel2(r);
  this.$FBRTCCallModel3(false);
 };
 q.prototype.fetchPeerInfo = function() {
  "use strict";
  var r = this, s = function() {
   r.emit("changed");
  }, t = function() {
   r.$FBRTCCallModel0.logError(r.peerID, r.callID, "Failed to get remote photos");
  };
  this.$FBRTCCallModel1.fetch(s, t);
 };
 q.prototype.setSignalingExperiments = function(r) {
  "use strict";
  if (r || r === []) this.$FBRTCCallModel4 = r;
 };
 q.prototype.supportsSdpUpdate = function() {
  "use strict";
  return this.$FBRTCCallModel4.indexOf("sdp_update") > -1 && j.supportedSignalingExperiments().indexOf("sdp_update") > -1;
 };
 q.prototype.$FBRTCCallModel2 = function(r) {
  "use strict";
  this.callID = r;
  this.$FBRTCCallModel5 = new h(this.peerID, r);
  this.startTime = new Date();
  this.endCallReason = null;
  this.isRemoteEnded = null;
  this.wasConnected = false;
  this.receivedNack = false;
  this.isRemoteVideoSupported = true;
  this.$FBRTCCallModel6 = true;
  this.$FBRTCCallModel7 = false;
  this.$FBRTCCallModel4 = [];
 };
 q.prototype.$FBRTCCallModel3 = function(r) {
  "use strict";
  if (r) {
   this.localStream = new o();
   this.localStream.addListener("tracksChanged", function() {
    if (!this.$FBRTCCallModel6 && this.localStream.hasVideo()) this.$FBRTCCallModel7 = true;
    this.emit("changed");
   }.bind(this));
  }
  this.remoteStream = new o();
  this.selfViewOpen = true;
  this.uiState = q.UIState.INIT;
  this.emit("changed");
 };
 q.prototype.setLocalStream = function(r) {
  "use strict";
  this.localStream.setStream(r);
 };
 q.prototype.setRemoteStream = function(r) {
  "use strict";
  this.remoteStream.setStream(r);
 };
 q.prototype.canStartCall = function() {
  "use strict";
  return this.localStream.hasStream() && m.turnIP;
 };
 q.prototype.isAwaitingUserStart = function() {
  "use strict";
  return this.uiState === q.UIState.AWAITING_USER_START;
 };
 q.prototype.isInProgress = function() {
  "use strict";
  return this.uiState >= q.UIState.CONTACTING && this.uiState < q.UIState.CALL_ENDED;
 };
 q.prototype.isUserMediaPending = function() {
  "use strict";
  return this.uiState === q.UIState.PENDING_LOCAL_MEDIA;
 };
 q.prototype.isUserMediaDenied = function() {
  "use strict";
  return this.uiState === q.UIState.USER_MEDIA_DENIED;
 };
 q.prototype.isRemoteVideoActive = function() {
  "use strict";
  return this.uiState === q.UIState.CALL_CONNECTED && this.remoteStream.hasVideo();
 };
 q.prototype.isEnded = function() {
  "use strict";
  return this.uiState >= q.UIState.CALL_ENDED;
 };
 q.prototype.isAwaitingAnswer = function() {
  "use strict";
  return this.uiState == q.UIState.CONTACTING || this.uiState == q.UIState.RINGING;
 };
 q.prototype.isFullScreen = function() {
  "use strict";
  return k.isFullScreen();
 };
 q.prototype.peerPicUrl = function() {
  "use strict";
  return this.$FBRTCCallModel1.peerPicUrl;
 };
 q.prototype.selfPicUrl = function() {
  "use strict";
  return this.$FBRTCCallModel1.selfPicUrl;
 };
 q.prototype.backgroundUrl = function() {
  "use strict";
  return this.$FBRTCCallModel1.backgroundUrl;
 };
 q.prototype.peerName = function() {
  "use strict";
  return this.$FBRTCCallModel1.peerName;
 };
 q.prototype.peerShortName = function() {
  "use strict";
  if (this.$FBRTCCallModel1.peerShortName) return this.$FBRTCCallModel1.peerShortName;
  return this.$FBRTCCallModel1.peerName;
 };
 q.prototype.autoDisableVideo = function() {
  "use strict";
  if (this.$FBRTCCallModel6) {
   this.$FBRTCCallModel6 = false;
   this.$FBRTCCallModel0.logCallAction(this.peerID, this.callID, l.CallAction.AUTO_DISABLE_VIDEO);
   this.localStream.setVideoEnabled(false);
  }
 };
 q.prototype.videoIsAutoDisabled = function() {
  "use strict";
  return !this.$FBRTCCallModel6 && !this.$FBRTCCallModel7 && !this.localStream.hasVideo();
 };
 q.prototype.setState = function(r) {
  "use strict";
  if (r === this.uiState) return;
  var s = this.uiState;
  this.uiState = r;
  switch (r) {
  case q.UIState.CALL_CONNECTED:
   this.wasConnected = true;
   this.$FBRTCCallModel5.onCallConnected();
   break;

  case q.UIState.CALL_ENDED:
   this.$FBRTCCallModel5.onCallEnded();
   if (this.isCaller) {
    var t = this.isRemoteVideoSupported ? i.FBRTCCallType.VIDEO_CALL : i.FBRTCCallType.VOICE_CALL;
    this.$FBRTCCallModel5.submit(t);
   }
   break;
  }
  this.$FBRTCCallModel0.logInfo(this.peerID, this.callID, 'UI: state change - "' + q.UIState.strNames[s] + '" to "' + q.UIState.strNames[r] + '"');
  this.emit("changed", this.uiState);
 };
 q.prototype.setStateFrom = function(r, s) {
  "use strict";
  if (this.uiState === r) {
   this.setState(s);
  } else this.$FBRTCCallModel0.logInfo(this.peerID, this.callID, 'UI: Not at "' + q.UIState.strNames[r] + '", not moving to "' + q.UIState.strNames[s] + '"');
 };
 q.UIState = new p([ "INIT", "AWAITING_USER_START", "PENDING_LOCAL_MEDIA", "USER_MEDIA_DENIED", "MORE_INIT", "CONTACTING", "RINGING", "CALL_CONNECTING", "CALL_CONNECTED", "CALL_ENDED", "COLLECT_RATING" ]);
 g(q, {
  changed: true
 });
 e.exports = q;
}, null);

__d("FBRTCCallMonitor", [ "FBRTCCallSummaryStore" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 var h = 1e4, i = 3e3;
 function j(k) {
  "use strict";
  this.$FBRTCCallMonitor0 = k;
  this.$FBRTCCallMonitor1 = null;
  this.$FBRTCCallMonitor2 = g.getInstance();
 }
 j.prototype.startHeartbeat = function(k) {
  "use strict";
  if (this.$FBRTCCallMonitor0.isEnded()) return;
  var l = k();
  if (l) this.onCallHeartbeat(l);
  var m = this;
  setTimeout(function() {
   m.startHeartbeat(k);
  }, h);
 };
 j.prototype.onCallHeartbeat = function(k) {
  "use strict";
  var l = new Date().valueOf();
  if (!this.$FBRTCCallMonitor1 || l - this.$FBRTCCallMonitor1 > i) k.save(this.$FBRTCCallMonitor2);
 };
 e.exports = j;
}, null);

__d("FBRTCIceCache", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 function g() {
  "use strict";
  this.$FBRTCIceCache0 = {};
 }
 g.prototype.reset = function(h, i) {
  "use strict";
  if (!this.$FBRTCIceCache0[h]) this.$FBRTCIceCache0[h] = {};
  this.$FBRTCIceCache0[h][i] = [];
 };
 g.prototype.cacheCandidate = function(h, i, j) {
  "use strict";
  if (!this.$FBRTCIceCache0[h]) this.$FBRTCIceCache0[h] = {};
  if (!this.$FBRTCIceCache0[h][i]) this.$FBRTCIceCache0[h][i] = [];
  this.$FBRTCIceCache0[h][i].unshift(j);
 };
 g.prototype.drainCandidates = function(h, i, j) {
  "use strict";
  if (this.$FBRTCIceCache0[h] && this.$FBRTCIceCache0[h][i]) {
   var k;
   while (this.$FBRTCIceCache0[h][i].length > 0) {
    k = this.$FBRTCIceCache0[h][i].pop();
    j(k);
   }
  }
 };
 e.exports = g;
}, null);

__d("FBRTCLocalMessageQueue", [ "CacheStorage", "FBRTCLogger" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 var i = "localstorage", j = "RTC_", k = "offer", l = "offer_msg", m = "data_", n = 30 * 1e3, o = 15 * 1e3, p = 500;
 function q() {
  "use strict";
  this.$FBRTCLocalMessageQueue0 = h.getInstance();
 }
 q.prototype.enqueueOffer = function(r, s) {
  "use strict";
  var t = this.$FBRTCLocalMessageQueue1(r, l);
  this.$FBRTCLocalMessageQueue2(t, k, s);
 };
 q.prototype.getOffer = function(r) {
  "use strict";
  var s = this.$FBRTCLocalMessageQueue1(r, l);
  return this.$FBRTCLocalMessageQueue3(s, k);
 };
 q.prototype.removeOffer = function(r) {
  "use strict";
  var s = this.$FBRTCLocalMessageQueue1(r, l);
  s.remove(k);
 };
 q.prototype.enqueueMessage = function(r, s, t, u) {
  "use strict";
  var v = this.$FBRTCLocalMessageQueue1(r, s), w = m + t.toString();
  this.$FBRTCLocalMessageQueue2(v, w, u);
  this.$FBRTCLocalMessageQueue0.logToConsole("Queued " + w);
 };
 q.prototype.enableDequeuing = function(r, s, t, u) {
  "use strict";
  if (u === void 0) u = o;
  this.$FBRTCLocalMessageQueue4(r, s, t, u);
 };
 q.prototype.$FBRTCLocalMessageQueue4 = function(r, s, t, u) {
  "use strict";
  var v = this.$FBRTCLocalMessageQueue1(r, s), w = v.keys(), x = w.length;
  for (var y = 0; y < x; y++) {
   var z = this.$FBRTCLocalMessageQueue5(v, w[y]);
   if (z && t) t(z);
  }
  this.$FBRTCLocalMessageQueue0.logToConsole("Dequeued " + x + " (" + r + ") with " + u + " left)");
  if (u > 0) {
   u -= p;
   setTimeout(function() {
    this.$FBRTCLocalMessageQueue4(r, s, t, u);
   }.bind(this), p);
  }
 };
 q.prototype.$FBRTCLocalMessageQueue2 = function(r, s, t) {
  "use strict";
  var u = {
   __t: Date.now(),
   __d: t
  };
  r.set(s, u);
 };
 q.prototype.$FBRTCLocalMessageQueue3 = function(r, s) {
  "use strict";
  var t = r.get(s);
  if (t && this.$FBRTCLocalMessageQueue6(t)) {
   return t.__d;
  } else if (t) r.remove(s);
  return null;
 };
 q.prototype.$FBRTCLocalMessageQueue5 = function(r, s) {
  "use strict";
  var t = this.$FBRTCLocalMessageQueue3(r, s);
  if (t !== null) {
   r.remove(s);
   return t;
  }
  return null;
 };
 q.prototype.$FBRTCLocalMessageQueue6 = function(r) {
  "use strict";
  return Date.now() - r.__t < n;
 };
 q.prototype.$FBRTCLocalMessageQueue1 = function(r, s) {
  "use strict";
  return new g(i, j + r + "_" + s + "_");
 };
 e.exports = q;
}, null);

__d("FBRTCMessage", [ "CurrentUser", "FBRTCConstants", "FBRTCSdpUtils", "PresencePrivacy", "VideoCallSupport" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 var l = "mobile";
 function m(n) {
  "use strict";
  if (!this.$FBRTCMessage0(n)) throw "invalid webrtc message";
  this.peerID = n.from;
  this.callID = parseInt(n.call_id, 10);
  this.msg = JSON.parse(n.payload);
  this.msgType = this.msg.type;
  this.msgID = this.msg.msg_id;
  this.source = n.source;
  this.$FBRTCMessage1();
  this.$FBRTCMessage2();
 }
 m.prototype.$FBRTCMessage0 = function(n) {
  "use strict";
  return n.from && n.call_id && n.payload;
 };
 m.prototype.$FBRTCMessage2 = function() {
  "use strict";
  if (k.isVideoInteropSupported()) return;
  if (this.isFromMobile()) {
   if (this.msg.sdp) this.msg.sdp = i.disableVideo(this.msg.sdp);
   if (this.msgType === h.PayloadType.SET_VIDEO || this.msgType === h.PayloadType.OFFER || this.msgType === h.PayloadType.ICERESTART_OFFER || this.msgType === h.PayloadType.ANSWER || this.msgType === h.PayloadType.ICERESTART_ANSWER) this.msg.videoon = false;
  }
 };
 m.prototype.$FBRTCMessage1 = function() {
  "use strict";
  if (this.isFromMobile() && this.msg.sdp) this.msg.sdp = i.removeBadCodecLines(this.msg.sdp);
 };
 m.prototype.isOffer = function() {
  "use strict";
  return this.msgType === h.PayloadType.OFFER;
 };
 m.prototype.isFromMobile = function() {
  "use strict";
  return this.source === l;
 };
 m.prototype.isForCall = function(n) {
  "use strict";
  return !n.callID || n.callID === this.callID || this.msgType === h.PayloadType.OFFER || this.msgType === h.PayloadType.ICERESTART_OFFER || this.msgType === h.PayloadType.PCRESTART_OFFER || this.msgType === h.PayloadType.ICE_CANDIDATE;
 };
 m.prototype.isFromVisiblePeer = function() {
  "use strict";
  return g.getID() === this.peerID || j.allows(this.peerID);
 };
 m.prototype.getSignalingExperiments = function() {
  "use strict";
  if (this.isFromMobile() && !this.msg.experiments) return [ "sdp_update" ];
  return this.msg.experiments;
 };
 e.exports = m;
}, null);

__d("FBRTCMessageDedup", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 var g = {}, h = {
  check: function(i, j, k) {
   if (!g[i]) g[i] = {};
   if (!g[i][j]) g[i][j] = {};
   if (g[i][j][k]) return false;
   g[i][j][k] = true;
   return true;
  }
 };
 e.exports = h;
}, null);

__d("XVideoCallSendMessageController", [ "XController" ], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 e.exports = b("XController").create("/videocall/sendmessage/", {
  recipient_id: {
   type: "Int",
   required: true
  },
  msg_id: {
   type: "Int",
   required: true
  },
  message_info: {
   type: "String",
   required: true
  },
  webrtc_fbtrace: {
   type: "Int"
  }
 });
}, null);

__d("SamplingPolicyBase", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 function g() {
  "use strict";
  throw "Tried to instantiate SamplingPolicyBase";
 }
 g.prototype.getName = function() {
  "use strict";
  return this.name;
 };
 g.prototype.isSampled = function() {
  "use strict";
  if (typeof this.sampled == "undefined") this.sampled = this.decideIfSampled();
  return this.sampled;
 };
 e.exports = g;
}, null);

__d("FbtraceForcedByServerPolicy", [ "FbtraceForcedByServer", "SamplingPolicyBase", "copyProperties" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var j;
 function k() {
  this.name = "FbtraceForcedByServerPolicy";
 }
 k.get = function() {
  if (typeof j == "undefined") j = new k();
  return j;
 };
 function l() {
  return g.forced;
 }
 i(k.prototype, h.prototype, {
  decideIfSampled: l
 });
 e.exports = k;
}, null);

__d("Random", [ "Alea", "ServerNonce" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var h = b("ServerNonce").ServerNonce, i = g(h), j = {
  random: i,
  uint32: function() {
   return Math.floor(i() * 4294967296);
  }
 };
 e.exports = j;
}, null);

__d("guardFunction", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 function g(h, i, j) {
  return function() {
   if (h.apply(j || this, arguments)) i.apply(j || this, arguments);
  };
 }
 e.exports = g;
}, null);

__d("Fbtrace", [ "Arbiter", "BanzaiScribe", "ErrorUtils", "FbtraceForcedByServer", "FbtraceForcedByServerPolicy", "Random", "SiteData", "copyProperties", "guardFunction" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", q = "AAAAAAAAAAA";
 for (var r in Error) if (Error.hasOwnProperty(r)) t[r] = Error[r];
 var s = Error === null ? null : Error.prototype;
 t.prototype = Object.create(s);
 t.prototype.constructor = t;
 t.__superConstructor__ = Error;
 function t(ia) {
  Error.call(this, ia);
 }
 function u(ia) {
  i.reportError(new t(ia));
 }
 function v() {
  var ia = function() {
   var la = 0, ma = 0, na = "";
   for (var oa = 10; oa >= 0; oa--) {
    if (la < 6) {
     ma = l.uint32();
     la = 32;
    }
    if (oa === 0) ma = ma & 7;
    na = p.charAt(ma & 63) + na;
    ma >>= 6;
    la -= 6;
   }
   return na;
  }, ja, ka;
  for (ja = 3; ja > 0; ja--) {
   ka = ia();
   if (ka != q) return ka;
  }
  u("failed to generate valid Fbtrace id");
  return q;
 }
 function w() {
  n(this, w);
 }
 n(w, {
  isOn: function() {
   return false;
  },
  replySend: function(ia, ja) {},
  requestSend: function(ia, ja, ka) {
   ca(ia, ja);
   return {
    metadata: function() {
     return void 0;
    },
    replyReceive: function(la) {}
   };
  }
 });
 var x = new w();
 function y(ia, ja, ka) {
  if (!ia) throw {
   name: "ArgumentError",
   message: "no valid service name specified"
  };
  if (!ja) throw {
   name: "ArgumentError",
   message: "no valid version specified"
  };
  var la = h, ma = 0, na = v(), oa = v(), pa = ba(na), qa = {
   service: ia,
   version: ja
  }, ra = function(wa) {
   if (typeof wa == "undefined") return "undefined";
   if (typeof wa != "string") wa = ra(JSON.stringify(wa));
   return wa;
  }, sa = function(wa) {
   var xa = "";
   for (var ya in wa) {
    if (xa.length > 0) xa += "";
    xa += ra(ya) + "" + ra(wa[ya]);
   }
   return xa;
  }, ta = function(wa, xa, event, ya, za) {
   ma++;
   return [ za, ma, na, wa, xa, ra(event), sa(ya) ].join("");
  }, ua = function(wa, xa, event, ya, za) {
   if (!za && typeof za == "undefined") za = Date.now() * 1e3;
   var ab = ta(wa, xa, event, ya, za);
   la.log("fbtrace", ab, pa);
  }, va = function() {
   return oa;
  };
  ua(q, oa, "#rqrecv", n(ka, qa));
  n(this, y);
  n(this, {
   replySend: function(wa, xa) {
    xa = n(xa, qa, {
     success: wa ? "true" : "false"
    });
    ua(q, oa, "#rpsend", xa);
   },
   requestSend: function(wa, xa, ya) {
    ca(wa, xa);
    var za = va(), ab = v();
    ya = n(ya, qa, {
     op: wa,
     "remote:service": xa
    });
    ua(za, ab, "#rqsend", ya);
    return {
     metadata: function() {
      return na + ab;
     },
     replyReceive: function(bb) {
      ua(za, ab, "#rprecv", n(bb, qa));
     },
     parentNode: this
    };
   }
  });
 }
 n(y, {
  isOn: function() {
   return true;
  }
 });
 function z() {
  return x;
 }
 function aa(ia, ja, ka) {
  ka = ka || {};
  ka.init = true;
  var la = k.get();
  if (la.isSampled()) {
   return new y(ia, ja, ka);
  } else return new w();
 }
 function ba(ia) {
  var ja = ia.charAt(ia.length - 1);
  return p.indexOf(ja) % 32;
 }
 function ca(ia, ja) {
  if (!ia) throw {
   name: "ArgumentError",
   message: "no valid operation specified"
  };
  if (!ja) throw {
   name: "ArgumentError",
   message: "no valid remote:service specified"
  };
 }
 function da(ia, ja) {
  var ka = x, la;
  x = ia;
  try {
   la = ja();
  } finally {
   x = ka;
  }
  return la;
 }
 var ea = function(ia, ja) {
  var ka = z(), la = ja.request, ma = false;
  if (!ka.isOn() && j.forced && /\/upload\/(?:composer|photos)\/|\/ajax\/composerx\/attachment\/media\//.test(la.uri.toString())) {
   ka = aa("photo_upload_kludge", String(m.revision || "dev"), {
    policy: "PhotoUpload"
   });
   ma = true;
  }
  if (ka.isOn()) {
   var na = ma ? {
    policy: "PhotoUpload"
   } : {};
   if (la.userActionId) na.user_action_id = la.userActionId;
   var oa = ka.requestSend(la.uri.toString(), "www", na);
   la.fbtraceRemoteNode = oa;
   la.transport.setRequestHeader("X-Fbtrace-Meta", oa.metadata());
  }
 }, fa = function(ia, ja) {
  ja.request.fbtraceRemoteNode.replyReceive({
   is_last: ja.response.is_last,
   success: true
  });
  setTimeout(function() {
   ja.request.fbtraceRemoteNode.parentNode.replySend(true, {});
  }, 0);
 }, ga = function(ia, ja) {
  ja.request.fbtraceRemoteNode.replyReceive({
   is_last: ja.response.is_last,
   success: false,
   error_code: ja.response.error,
   error_summary: ja.response.errorSummary,
   error_description: ja.response.errorDescription
  });
  setTimeout(function() {
   ja.request.fbtraceRemoteNode.parentNode.replySend(false, {});
  }, 0);
 }, ha = function(ia, ja) {
  return ja.request.fbtraceRemoteNode;
 };
 g.subscribe("AsyncRequest/will_send", ea);
 g.subscribe("AsyncRequest/response", o(ha, fa));
 g.subscribe("AsyncRequest/error", o(ha, ga));
 e.exports = {
  defaultNode: z,
  requestReceive: aa,
  withDefaultNode: da
 };
}, null);

__d("FBRTCMessageSender", [ "CurrentUser", "XVideoCallSendMessageController", "FBRTCConfig", "FBRTCConstants", "FBRTCLogger", "FBRTCUtils", "SiteData", "Fbtrace" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
 b.__markCompiled && b.__markCompiled();
 var o = 0;
 function p() {
  "use strict";
  this.onSendFailure = null;
  this.$FBRTCMessageSender0 = k.getInstance();
 }
 p.prototype.sendOffer = function(q, r, s, t) {
  "use strict";
  return this.$FBRTCMessageSender1(j.PayloadType.OFFER, q, r, s, t);
 };
 p.prototype.sendAnswer = function(q, r, s, t) {
  "use strict";
  return this.$FBRTCMessageSender1(j.PayloadType.ANSWER, q, r, s, t);
 };
 p.prototype.sendPCRestartOffer = function(q, r, s, t) {
  "use strict";
  return this.$FBRTCMessageSender1(j.PayloadType.PCRESTART_OFFER, q, r, s, t);
 };
 p.prototype.sendSdpUpdate = function(q, r, s, t) {
  "use strict";
  return this.$FBRTCMessageSender1(j.PayloadType.SDP_UPDATE, q, r, s, t);
 };
 p.prototype.resendSdpMessage = function(q, r) {
  "use strict";
  r.flag = 1;
  this.$FBRTCMessageSender2(q, r);
 };
 p.prototype.$FBRTCMessageSender1 = function(q, r, s, t, u) {
  "use strict";
  var v = this.$FBRTCMessageSender3(s, q);
  v.sdp = t;
  if (q === j.PayloadType.OFFER) {
   v.handlescollision = true;
   v.pranswer = false;
  }
  if (q === j.PayloadType.OFFER || q === j.PayloadType.ANSWER) {
   v.icerestart = false;
   v.experiments = i.supportedSignalingExperiments();
  }
  v.videoon = u;
  this.$FBRTCMessageSender2(r, v);
  return v;
 };
 p.prototype.sendIceCandidate = function(q, r, s) {
  "use strict";
  var t = this.$FBRTCMessageSender3(r, j.PayloadType.ICE_CANDIDATE);
  t.sdp_mid = s.sdpMid;
  t.label = s.sdpMLineIndex;
  t.sdp = s.candidate;
  this.$FBRTCMessageSender4(q, t);
 };
 p.prototype.sendHangup = function(q, r, s, t) {
  "use strict";
  var u = this.$FBRTCMessageSender3(r, j.PayloadType.HANGUP);
  u.reason = j.callEndReasonString(s);
  this.$FBRTCMessageSender4(q, u, t);
 };
 p.prototype.sendOtherDismiss = function(q) {
  "use strict";
  var r = this.$FBRTCMessageSender3(q, j.PayloadType.OTHER_DISMISS);
  this.$FBRTCMessageSender4(g.getID(), r);
 };
 p.prototype.sendOfferAck = function(q, r, s) {
  "use strict";
  this.$FBRTCMessageSender5(q, r, s, j.PayloadType.OFFER_ACK);
 };
 p.prototype.sendOfferNack = function(q, r, s) {
  "use strict";
  this.$FBRTCMessageSender5(q, r, s, j.PayloadType.OFFER_NACK, 1356043);
 };
 p.prototype.sendAnswerAck = function(q, r, s) {
  "use strict";
  this.$FBRTCMessageSender5(q, r, s, j.PayloadType.ANSWER_ACK);
 };
 p.prototype.sendMuteStateUpdate = function(q, r, s) {
  "use strict";
  var t = this.$FBRTCMessageSender3(r, j.PayloadType.SET_VIDEO);
  t.videoon = s;
  this.$FBRTCMessageSender4(q, t);
 };
 p.prototype.sendMsgAck = function() {
  "use strict";
 };
 p.prototype.sendOk = function() {
  "use strict";
 };
 p.prototype.sendPranswer = function() {
  "use strict";
 };
 p.prototype.sendIcerestartAnswer = function() {
  "use strict";
 };
 p.prototype.$FBRTCMessageSender3 = function(q, r) {
  "use strict";
  var s = l.generateRandomInt(), t = {
   version: o,
   type: r,
   call_id: q,
   msg_id: s
  };
  return t;
 };
 p.prototype.$FBRTCMessageSender2 = function(q, r) {
  "use strict";
  this.$FBRTCMessageSender4(q, r, false, true, true);
 };
 p.prototype.$FBRTCMessageSender5 = function(q, r, s, t, u) {
  "use strict";
  var v = this.$FBRTCMessageSender3(r, t);
  v.ack_id = s.msg_id;
  if (s.flag === 1) v.flag = 1;
  if (u !== void 0) s.errorCode = u;
  this.$FBRTCMessageSender4(q, v);
 };
 p.prototype.$FBRTCMessageSender4 = function(q, r, s, t, u) {
  "use strict";
  var v = r.msg_id, w = {
   peer_id: q,
   call_id: r.call_id,
   msg_id: v,
   msg_type: r.type
  }, x = {
   call_id: r.call_id,
   msg_id: v,
   user_id: g.getID(),
   recipient_id: q,
   msg_type: r.type,
   app_id: 256281040558,
   app_version: String(m.revision || "dev"),
   op: "sendServerRequest:" + r.type,
   policy: "WebRTC"
  }, y = n.requestReceive("browser", String(m.revision || "dev"), x), z = h.getURIBuilder().setInt("recipient_id", q).setInt("msg_id", v).setString("message_info", JSON.stringify(r)).setInt("webrtc_fbtrace", y.isOn() ? 1 : 0).getURI();
  if (t) var aa = this.$FBRTCMessageSender4.bind(this, q, r, s, false, u);
  var ba = this.$FBRTCMessageSender6.bind(this, w), ca = this.$FBRTCMessageSender7.bind(this, w, aa, u);
  n.withDefaultNode(y, function() {
   l.sendServerRequest(z, ba, ca, s);
  });
  if (this.onMessageSent) this.onMessageSent(q, r);
  this.$FBRTCMessageSender0.logSentMessage(q, r.call_id, r);
 };
 p.prototype.$FBRTCMessageSender6 = function(q) {
  "use strict";
  this.$FBRTCMessageSender0.logSentMessageSuccess(q.peer_id, q.call_id, q.msg_type, q.msg_id);
 };
 p.prototype.$FBRTCMessageSender7 = function(q, r, s, t) {
  "use strict";
  if (t) var u = t.getError ? t.getError() : t;
  this.$FBRTCMessageSender0.logSentMessageFailure(q.peer_id, q.call_id, q.msg_type, q.msg_id, u);
  if (this.onSendFailure) {
   var v = null;
   if (u === 1356001 || u === 1356049) {
    v = j.CallEndReason.NO_PERMISSION;
   } else if (u === 1356046 || u === 1356045) {
    v = j.CallEndReason.CALLER_NOT_VISIBLE;
   } else if (u === 1356003 || u === 1356002 || u === 1356044 || u === 1356048) {
    v = j.CallEndReason.OTHER_NOT_CAPABLE;
   } else if (r) {
    r();
    return;
   } else if (s) v = j.CallEndReason.SIGNALING_MESSAGE_FAILED;
   if (v) this.onSendFailure(v, u);
  }
 };
 e.exports = p;
}, null);

__d("XVideoCallTurnDiscoveryController", [ "XController" ], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 e.exports = b("XController").create("/videocall/turndiscovery/", {
  version: {
   type: "Int",
   required: true
  }
 });
}, null);

__d("FBRTCTurnDiscovery", [ "FBRTCLogger", "FBRTCUtils", "XVideoCallTurnDiscoveryController", "mixInEventEmitter" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 var k = 3, l = {
  requestTurnCreds: function(m, n) {
   if (this._turnCreds) this.emit("receivedTurnCreds", this._turnCreds);
   if (n === void 0) n = k;
   var o = 1, p = i.getURIBuilder().setInt("version", o).getURI();
   h.sendServerRequest(p, this._onServerRequestSuccess.bind(this), this._onServerRequestFailure.bind(this, m, n));
  },
  _onServerRequestSuccess: function(m) {
   this._turnCreds = m.payload;
   this.emit("receivedTurnCreds", this._turnCreds);
  },
  _onServerRequestFailure: function(m, n, o) {
   if (n > 0) {
    g.getInstance().logError(m.peerID, m.callID, "Failed turn; going to retry");
    this.requestTurnCreds(m, n - 1);
   } else this.emit("failed");
  }
 };
 j(l, {
  receivedTurnCreds: true,
  failed: true
 });
 e.exports = l;
}, null);

__d("FBRTCAudioSpectrumAnalyser.react", [ "React", "cancelAnimationFrame", "requestAnimationFrame" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 var j = 7, k = 3, l = 9, m = "#3B5998", n = "#CCCCCC", o = function(r, s, t, u) {
  var v = u ? n : m;
  s += k;
  t -= k;
  r.beginPath();
  r.arc(s, t, k, 0, 2 * Math.PI, false);
  r.fillStyle = v;
  r.strokeStyle = v;
  r.fill();
 }, p = function(r, s, t) {
  var u, v, w = s.width / l, x = Math.floor(s.height / j), y = new Uint8Array(2048);
  r.getByteFrequencyData(y);
  t.clearRect(0, 0, s.width, s.height);
  var z = Math.floor(y.length / (l * 3));
  for (var aa = 0; aa < l; aa += 1) {
   u = 0;
   for (var ba = 0; ba < z; ba += 1) u += y[aa * z + ba];
   v = u * j / (z * 256);
   if (v < 1) v = .6;
   for (var ca = 0; ca < Math.floor(v); ca++) o(t, aa * w, s.height - ca * x);
   if (v - Math.floor(v) >= .5) o(t, aa * w, s.height - ca * x, true);
  }
 }, q = g.createClass({
  displayName: "FBRTCAudioSpectrumAnalyser",
  _isAnimating: false,
  _animationLoop: null,
  componentDidMount: function() {
   this._startAnimation();
  },
  componentWillUnmount: function() {
   this._stopAnimation();
  },
  shouldComponentUpdate: function(r, s) {
   return this._streamDidChange();
  },
  componentDidUpdate: function(r, s) {
   this._stopAnimation();
   this._startAnimation();
  },
  _streamDidChange: function() {
   var r = this.props.stream ? this.props.stream.getStream() : null;
   return r !== this._currentStream;
  },
  _stopAnimation: function() {
   this._isAnimating = false;
   h(this._animationLoop);
  },
  _startAnimation: function() {
   var r = this.props.stream.getAudioAnalyser();
   if (!this._isAnimating && r) {
    this._isAnimating = true;
    var s = g.findDOMNode(this), t = s.getContext("2d");
    this._animate(r, s, t);
   }
  },
  render: function() {
   return g.createElement("canvas", {
    width: "106",
    height: "80"
   });
  },
  _animate: function(r, s, t) {
   this._animationLoop = i(function() {
    if (!this._isAnimating) return;
    p(r, s, t);
    this._animate(r, s, t);
   }.bind(this));
  }
 });
 e.exports = q;
}, null);

__d("FBRTCUserSettings", [ "mixInEventEmitter", "FBRTCConfig", "FBRTCUserMediaRequest", "FBRTCStreamWrapper" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 var k = window.MediaStreamTrack, l = null, m = {
  stream: new j(),
  audioSources: [],
  videoSources: [],
  selectedCamera: null,
  savedCamera: null,
  selectedMic: null,
  savedMic: null,
  isLoading: false,
  isEnabled: function() {
   return h.settingsEnabled() && k && !!k.getSources;
  },
  isDirty: function() {
   return this.savedCamera !== this.selectedCamera || this.savedMic !== this.selectedMic;
  },
  refresh: function() {
   if (k && k.getSources) {
    k.getSources(function(n) {
     for (var o = 0; o < n.length; o++) {
      var p = n[o];
      if (p.kind === "audio") this.audioSources.push(p);
      if (p.kind === "video") this.videoSources.push(p);
     }
     this._refreshSelectedOptions();
     this._getUserMedia();
     this.isLoading = false;
     this._scheduleChangeEvent();
    }.bind(this));
    this.isLoading = true;
    this.audioSources = [];
    this.videoSources = [];
   }
   this._scheduleChangeEvent();
  },
  cleanUp: function() {
   this.stream.stopStream();
  },
  _refreshSelectedOptions: function() {
   if (this.selectedMic === null) if (this.savedMic) {
    this.selectedMic = this.savedMic;
   } else if (this.audioSources.length > 0) {
    this.selectedMic = this.audioSources[0].id;
    this.savedMic = this.selectedMic;
   }
   if (this.selectedCamera === null) if (this.savedCamera) {
    this.selectedCamera = this.savedCamera;
   } else if (this.videoSources.length > 0) {
    this.selectedCamera = this.videoSources[0].id;
    this.savedCamera = this.selectedCamera;
   }
  },
  save: function() {
   this.cleanUp();
   this.savedMic = this.selectedMic;
   this.savedCamera = this.selectedCamera;
   this.emit("saved");
  },
  selectCameraOption: function(n) {
   this.selectedCamera = n;
   this._scheduleChangeEvent();
   this._getUserMedia();
  },
  selectMicOption: function(n) {
   this.selectedMic = n;
   this._scheduleChangeEvent();
   this._getUserMedia();
  },
  updateForLocalStream: function(n) {
   if (n.videoMediaSourceId) this.savedCamera = n.videoMediaSourceId;
   if (n.audioMediaSourceId) this.savedMic = n.audioMediaSourceId;
  },
  _scheduleChangeEvent: function() {
   if (l !== null) clearTimeout(l);
   l = setTimeout(function() {
    this.emit("changed");
    l = null;
   }.bind(this), 50);
  },
  _getUserMedia: function() {
   var n = new i();
   n.videoSource = this.selectedCamera;
   n.audioSource = this.selectedMic;
   n.addListener("success", this._gumSuccess, this);
   n.addListener("failed", this._gumFailed, this);
   n.request();
  },
  _gumSuccess: function(n) {
   this.stream.setStream(n);
   this._scheduleChangeEvent();
  },
  _gumFailed: function(n) {}
 };
 g(m, {
  changed: true,
  saved: true
 });
 e.exports = m;
}, null);

__d("FBRTCVideo.react", [ "React", "cx", "joinClasses" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 var j = g.createClass({
  displayName: "FBRTCVideo",
  hideContextMenu: function(k) {
   k.preventDefault();
  },
  componentDidMount: function() {
   this._attachStream();
  },
  shouldComponentUpdate: function(k, l) {
   return this._streamDidChange();
  },
  componentDidUpdate: function(k, l) {
   this._attachStream();
  },
  _attachStream: function() {
   if (this.props.stream) {
    var k = g.findDOMNode(this);
    this.props.stream.attachToVideoTag(k);
    this._currentStream = this.props.stream.getStream();
   }
  },
  _streamDidChange: function() {
   var k = this.props.stream ? this.props.stream.getStream() : null;
   return k !== this._currentStream;
  },
  render: function() {
   return g.createElement("video", {
    className: i(this.props.className, "_3vsh"),
    autoPlay: "true",
    muted: this.props.muted,
    onContextMenu: this.hideContextMenu
   });
  }
 });
 e.exports = j;
}, null);

__d("FBRTCSettingsDialog.react", [ "React", "cx", "fbt", "Link.react", "XUIDialog.react", "XUIDialogBody.react", "XUIDialogFooter.react", "XUIDialogTitle.react", "XUIDialogSaveButton.react", "XUIDialogCancelButton.react", "XUIGrayText.react", "XUISelector.react", "FBRTCAudioSpectrumAnalyser.react", "FBRTCConfig", "FBRTCUserSettings", "FBRTCVideo.react" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v) {
 b.__markCompiled && b.__markCompiled();
 var w = r.Option, x = function(z) {
  var aa = [], ba = 0;
  for (var ca = 0; ca < z.length; ca++) {
   var da = z[ca], ea = da.label;
   if (!ea) {
    var fa = da.kind === "audio" ? "Microphone" : "Camera";
    ea = i._({
     Camera: "Camera{number}",
     Microphone: "Microphone{number}"
    }, [ i["enum"](fa, {
     Camera: "Camera",
     Microphone: "Microphone"
    }), i.param("number", ++ba) ]);
   }
   aa.push(g.createElement(w, {
    value: da.id,
    key: da.id
   }, ea));
  }
  return aa;
 }, y = g.createClass({
  displayName: "FBRTCSettingsDialog",
  componentDidMount: function() {
   this._renderSubscription = u.addListener("changed", function() {
    this.forceUpdate();
   }.bind(this));
   u.refresh();
  },
  componentWillUnmount: function() {
   this._renderSubscription.remove();
   u.cleanUp();
  },
  render: function() {
   return g.createElement(k, {
    width: 365,
    shown: true,
    onToggle: this.props.onToggle
   }, g.createElement(n, {
    showCloseButton: true
   }, g.createElement("span", null, i._("Settings"))), g.createElement(l, null, this._dialogBody()), g.createElement(m, {
    leftContent: this._helpLink()
   }, g.createElement(p, null), g.createElement(o, {
    use: "confirm",
    disabled: !u.isDirty(),
    onClick: this._onConfirmClicked
   })));
  },
  _dialogBody: function() {
   if (u.isLoading) return g.createElement("div", {
    className: "_48fc"
   });
   return g.createElement("div", {
    className: "_48fc"
   }, this._cameraOptions(), this._microphoneOptions());
  },
  _cameraOptions: function() {
   if (u.videoSources.length < 1) return null;
   return g.createElement("div", {
    className: "_48fd"
   }, g.createElement(q, {
    display: "block",
    size: "medium",
    shade: "medium",
    className: "_48fe"
   }, i._("Camera")), g.createElement(r, {
    name: "camera_selection",
    onChange: this._onCamSelectionChanged,
    defaultValue: u.selectedCamera,
    width: "200px"
   }, x(u.videoSources)), g.createElement("div", {
    className: "_48ff"
   }, g.createElement(v, {
    stream: u.stream,
    muted: true,
    className: "_48fg"
   })));
  },
  _microphoneOptions: function() {
   if (u.audioSources.length < 1) return null;
   return g.createElement("div", {
    className: "_48fd"
   }, g.createElement(q, {
    display: "block",
    size: "medium",
    shade: "medium",
    className: "_48fe"
   }, i._("Microphone")), g.createElement(r, {
    name: "microphone_selection",
    onChange: this._onMicSelectionChanged,
    defaultValue: u.selectedMic,
    width: "200px"
   }, x(u.audioSources)), g.createElement("div", {
    className: "_48fh"
   }, g.createElement(s, {
    stream: u.stream
   })));
  },
  _onCamSelectionChanged: function(z) {
   u.selectCameraOption(z.value);
  },
  _onMicSelectionChanged: function(z) {
   u.selectMicOption(z.value);
  },
  _onConfirmClicked: function(z) {
   u.save();
  },
  _helpLink: function() {
   return g.createElement("div", null, g.createElement(q, {
    shade: "light"
   }, i._("Having Trouble? {troubleShootingGuideLink}", [ i.param("troubleShootingGuideLink", g.createElement(j, {
    href: t.userMediaErrorUrl(),
    target: "_blank"
   }, i._("Get help"))) ])));
  }
 });
 e.exports = y;
}, null);

__d("FBRTCMediaAccessErrorDialog.react", [ "React", "fbt", "Link.react", "XUIDialog.react", "XUIDialogBody.react", "XUIDialogFooter.react", "XUIDialogTitle.react", "FBRTCConfig" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
 b.__markCompiled && b.__markCompiled();
 var o = g.createClass({
  displayName: "FBRTCMediaAccessErrorDialog",
  render: function() {
   return g.createElement(j, {
    shown: true,
    width: 440,
    layerHideOnBlur: false
   }, g.createElement(m, {
    showCloseButton: false
   }, g.createElement("span", null, h._("Can't Make Call"))), g.createElement(k, null, this._dialogBody()), g.createElement(l, {
    leftContent: this._footerContent()
   }));
  },
  _dialogBody: function() {
   return g.createElement("p", null, h._("Connect a camera and a microphone to make a call. If they're already connected, try restarting your browser and closing any other applications that use a camera or microphone."));
  },
  _footerContent: function() {
   return g.createElement("span", null, h._("Still need help? See our {troubleShootingGuideLink}", [ h.param("troubleShootingGuideLink", g.createElement(i, {
    href: n.userMediaErrorUrl(),
    target: "_blank"
   }, h._("Troubleshooting Guide"))) ]));
  }
 });
 e.exports = o;
}, null);

__d("FBRTCPeerBrowserUnsupportedDialog.react", [ "React", "fbt", "Link.react", "XUIDialog.react", "XUIDialogBody.react", "XUIDialogFooter.react", "XUIDialogTitle.react", "FBRTCConfig" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
 b.__markCompiled && b.__markCompiled();
 var o = g.createClass({
  displayName: "FBRTCPeerBrowserUnsupportedDialog",
  render: function() {
   return g.createElement(j, {
    shown: true,
    width: 440
   }, g.createElement(m, {
    showCloseButton: false
   }, g.createElement("span", null, h._("Can't Connect Call"))), g.createElement(k, null, this._dialogBody()), g.createElement(l, {
    leftContent: this._footerContent()
   }));
  },
  _dialogBody: function() {
   var p = this.props.peerName;
   return g.createElement("p", null, h._("{name} isn't using a browser that supports video calling yet.", [ h.param("name", p) ]));
  },
  _footerContent: function() {
   return g.createElement("span", null, h._("Still need help? See our {troubleShootingGuideLink}", [ h.param("troubleShootingGuideLink", g.createElement(i, {
    href: n.unsupportedBrowserUrl(),
    target: "_blank"
   }, h._("Troubleshooting Guide"))) ]));
  }
 });
 e.exports = o;
}, null);

__d("FBRTCCallDialogController", [ "FBRTCSettingsDialog.react", "FBRTCStruct", "FBRTCMediaAccessErrorDialog.react", "FBRTCPeerBrowserUnsupportedDialog.react", "FBRTCUserSettings", "React", "ReactLayeredComponentMixin" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
 b.__markCompiled && b.__markCompiled();
 var n = new h([ "ERROR_ACCESSING_MEDIA", "PEER_BROWSER_UNSUPPORTED", "SETTINGS" ]), o = l.createClass({
  displayName: "DialogOwner",
  mixins: [ m ],
  renderLayers: function() {
   if (this.props.dialogType === n.ERROR_ACCESSING_MEDIA) return {
    dialog: l.createElement(i, null)
   };
   if (this.props.dialogType === n.PEER_BROWSER_UNSUPPORTED) {
    var q = this.props.callModel.peerName();
    return {
     dialog: l.createElement(j, {
      peerName: q
     })
    };
   }
   if (this.props.dialogType === n.SETTINGS) return {
    dialog: l.createElement(g, {
     onToggle: this._onToggle
    })
   };
   return {};
  },
  _onToggle: function(q) {
   setTimeout(function() {
    if (!q) p.hideDialog();
   }, 0);
  },
  render: function() {
   return l.createElement("div", null);
  }
 }), p = {
  dialogTypes: n,
  setDialogContainer: function(q) {
   this.container = q;
   this.currentDialogType = null;
   this.callModel = null;
   this._render();
  },
  showDialog: function(q, r) {
   this.currentDialogType = q;
   this._setCallModel(r);
   this._render();
  },
  hideDialog: function() {
   this.currentDialogType = null;
   this._render();
  },
  _render: function() {
   l.render(l.createElement(o, {
    dialogType: this.currentDialogType,
    callModel: this.callModel
   }), this.container);
  },
  _setCallModel: function(q) {
   if (q !== this.callModel) {
    this.callModel = q;
    if (this.callModel) this.callModel.addListener("changed", this._onCallModelChanged, this);
   }
  },
  _onCallModelChanged: function() {
   if (this.callModel.isEnded() && this.currentDialogType === n.SETTINGS) this.hideDialog();
  }
 };
 k.addListener("saved", p.hideDialog, p);
 e.exports = p;
}, null);

__d("FBRTCRingback", [ "RTCConfig", "Sound", "FBRTCCallModel" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 var j = [ g.ringback_mp3_url, g.ringback_ogg_url ], k = {
  monitorCallModel: function(l) {
   if (this._subscription) this._subscription.remove();
   this._callModel = l;
   this._subscription = l.addListener("changed", this._onChange.bind(this));
  },
  _soundIsPlaying: false,
  _onChange: function() {
   if (this._callModel.uiState === i.UIState.RINGING) {
    this._startSound();
   } else this._stopSound();
  },
  _startSound: function() {
   if (!this._soundIsPlaying) {
    h.play(j, this._syncToken(), true);
    this._soundIsPlaying = true;
   }
  },
  _syncToken: function() {
   return "ring_back_" + this._callModel.callID.toString();
  },
  _stopSound: function() {
   if (this._soundIsPlaying) {
    h.stop(j);
    this._soundIsPlaying = false;
   }
  }
 };
 e.exports = k;
}, null);

__d("FBRTCVideoMuteOverlay.react", [ "React", "cx", "Image.react" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 var j = g.createClass({
  displayName: "FBRTCVideoMuteOverlay",
  _className: function(k) {
   var l = !k.localStream.hasVideo();
   return "_3nx7" + (l ? " " + "_3nx8" : "");
  },
  render: function() {
   var k = this.props.callModel;
   return g.createElement("div", {
    className: this._className(k)
   }, g.createElement(i, {
    src: k.selfPicUrl(),
    alt: "video muted"
   }));
  }
 });
 e.exports = j;
}, null);

__d("FBRTCSelfView.react", [ "cx", "React", "FBRTCConstants", "FBRTCVideo.react", "FBRTCStreamWrapper", "FBRTCVideoMuteOverlay.react" ], function(a, b, c, d, e, f, g, h, i, j, k, l) {
 b.__markCompiled && b.__markCompiled();
 var m = h.createClass({
  displayName: "FBRTCSelfView",
  toggleSelfView: function(n) {
   this.props.publishFn(i.UIEventType.TOGGLE_SELF_VIEW);
  },
  toggleIconClass: function(n, o) {
   return "_2y66" + (n ? " " + "_2y67" : "") + (!n ? " " + "_2y68" : "") + (!o ? " " + "_hgl" : "");
  },
  outerClasses: function(n) {
   var o = n.localStream.aspectRatio === k.aspectRatios["16:9"];
   return "_1qmr" + (o ? " " + "_yse" : "");
  },
  wrapperClasses: function(n) {
   return "_1qmn" + (!n.selfViewOpen ? " " + "_1qmo" : "");
  },
  overlayClasses: function(n) {
   var o = n.localStream.hasAudio();
   return "_1qmp" + (o ? " " + "_1qmq" : "");
  },
  render: function() {
   var n = this.props.callModel, o = n.selfViewOpen;
   return h.createElement("div", {
    className: this.outerClasses(n)
   }, h.createElement("button", {
    onClick: this.toggleSelfView,
    className: "_1qms"
   }, h.createElement("i", {
    className: this.toggleIconClass(true, !o)
   }), h.createElement("i", {
    className: this.toggleIconClass(false, o)
   })), h.createElement("div", {
    className: this.wrapperClasses(n)
   }, h.createElement(l, {
    callModel: n
   }), h.createElement("div", {
    className: this.overlayClasses(n)
   }, h.createElement("i", {
    className: "_2y69"
   })), h.createElement(j, {
    muted: true,
    stream: n.localStream
   })));
  }
 });
 e.exports = m;
}, null);

__d("FBRTCInCallView.react", [ "React", "cx", "FBRTCSelfView.react", "FBRTCVideo.react", "FBRTCCallModel" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 var l = g.createClass({
  displayName: "FBRTCInCallView",
  _videoIsMuted: function() {
   var m = this.props.callModel.remoteStream;
   return m && !m.hasVideo();
  },
  _containerClasses: function(m) {
   var n = m === k.UIState.CALL_CONNECTED, o = m === k.UIState.CALL_ENDED;
   return "_mdl" + (n || o ? " " + "_mdm" : "") + (n ? " " + "_mdn" : "") + (o ? " " + "_2m5f" : "");
  },
  _wrapperClasses: function() {
   var m = this._videoIsMuted();
   return "_2tvg" + (m ? " " + "_mdo" : "");
  },
  render: function() {
   var m = this.props.callModel, n = this.props.publishFn;
   if (m.remoteStream.hasStream()) {
    var o = m.uiState;
    return g.createElement("div", {
     className: this._containerClasses(o)
    }, g.createElement("div", {
     className: this._wrapperClasses()
    }, g.createElement("div", {
     className: "_mdt"
    }, g.createElement(j, {
     stream: m.remoteStream
    }))), this._renderSelfView(m, n));
   } else return g.createElement("div", {
    className: "_hgl"
   });
  },
  _renderSelfView: function(m, n) {
   if (m.isRemoteVideoSupported) return g.createElement(i, {
    callModel: m,
    publishFn: n
   });
  }
 });
 e.exports = l;
}, null);

__d("FBRTCButton.react", [ "MessengerButton.react", "ReactComponentWithPureRenderMixin", "React", "XUIOverlayButton.react", "cx", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j, k, l) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var m = i, n = m.PropTypes, o = i.createClass({
  displayName: "FBRTCButton",
  mixins: [ h ],
  propTypes: {
   label: n.string.isRequired,
   messengerUI: n.bool.isRequired,
   type: n.string.isRequired
  },
  render: function() {
   var p = this.props, q = p.className, r = p.messengerUI, s = p.type, t = function(u, v) {
    var w = {}, x = Object.prototype.hasOwnProperty;
    if (u == null) throw new TypeError();
    for (var y in u) if (x.call(u, y) && !x.call(v, y)) w[y] = u[y];
    return w;
   }(p, {
    className: 1,
    messengerUI: 1,
    type: 1
   });
   if (r) return i.createElement(g, i.__spread({
    className: q,
    type: s
   }, t));
   return i.createElement(j, i.__spread({
    className: l("_1-7l", q)
   }, t));
  }
 });
 e.exports = o;
}, null);

__d("FBRTCCallTimer.react", [ "React" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 var h = g.createClass({
  displayName: "FBRTCCallTimer",
  getInitialState: function() {
   return {
    secondsElapsed: 0
   };
  },
  tick: function() {
   this.setState({
    secondsElapsed: this.state.secondsElapsed + 1
   });
  },
  componentDidMount: function() {
   this.interval = setInterval(this.tick, 1e3);
  },
  componentWillUnmount: function() {
   clearInterval(this.interval);
  },
  render: function() {
   var i = this.state.secondsElapsed;
   return g.createElement("span", null, i >= 3600 ? ("0" + Math.floor(i / 3600)).slice(-2) + ":" : "", ("0" + Math.floor(i % 3600 / 60)).slice(-2), ":", ("0" + i % 60).slice(-2));
  }
 });
 e.exports = h;
}, null);

__d("FBRTCSpinner.react", [ "MessengerSpinner.react", "ReactComponentWithPureRenderMixin", "React", "XUISpinner.react" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var k = i, l = k.PropTypes, m = i.createClass({
  displayName: "FBRTCSpinner",
  mixins: [ h ],
  propTypes: {
   messengerUI: l.bool.isRequired
  },
  render: function() {
   if (this.props.messengerUI) return i.createElement(g, {
    color: "blue"
   });
   return i.createElement(j, {
    background: "dark",
    size: "large"
   });
  }
 });
 e.exports = m;
}, null);

__d("FBRTCCallStateInfo.react", [ "FBRTCButton.react", "FBRTCCallModel", "FBRTCCallTimer.react", "FBRTCConstants", "FBRTCSpinner.react", "Image.react", "MessengerContactImage.react", "React", "cx", "fbt" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
 b.__markCompiled && b.__markCompiled();
 var q = function(t, u) {
  switch (t) {
  case j.CallEndReason.NO_ANSWER_TIMEOUT:
  case j.CallEndReason.IGNORE_CALL:
   return p._("No Answer");

  case j.CallEndReason.INCOMING_TIMEOUT:
  case j.CallEndReason.NO_PERMISSION:
  case j.CallEndReason.OTHER_NOT_CAPABLE:
  case j.CallEndReason.OTHER_CARRIER_BLOCKED:
   return p._("Not Reachable");

  case j.CallEndReason.SIGNALING_MESSAGE_FAILED:
  case j.CallEndReason.WEBRTC_ERROR:
  case j.CallEndReason.NO_UI_ERROR:
  case j.CallEndReason.CALLER_NOT_VISIBLE:
  case j.CallEndReason.CLIENT_ERROR:
   return p._("Call Failed");

  case j.CallEndReason.UNSUPPORTED_VERSION:
   return p._("Can't Connect Call");

  case j.CallEndReason.IN_ANOTHER_CALL:
   return p._("In Another Call");

  case j.CallEndReason.CARRIER_BLOCKED:
   return p._("Switch to Wi-Fi to complete your call");

  case j.CallEndReason.CLIENT_INTERRUPTED:
   return p._("Call Interrupted");

  case j.CallEndReason.HANGUP_CALL:
  case j.CallEndReason.ACCEPT_AFTER_HANGUP:
   return p._("Call Ended");

  case j.CallEndReason.CONNECTION_DROPPED:
   return p._("Connection Lost");

  case j.CallEndReason.OTHER_INSTANCE_HANDLED:
   return "";

  default:
   return "";
  }
 }, r = function(t, u) {
  switch (t.uiState) {
  case h.UIState.INIT:
  case h.UIState.PENDING_LOCAL_MEDIA:
  case h.UIState.MORE_INIT:
  case h.UIState.USER_MEDIA_DENIED:
   return n.createElement(k, {
    messengerUI: u
   });

  case h.UIState.CONTACTING:
   return n.createElement("p", {
    className: "_2ze8"
   }, p._("Contacting..."));

  case h.UIState.RINGING:
   return n.createElement("p", {
    className: "_2ze8"
   }, p._("Ringing..."));

  case h.UIState.CALL_CONNECTING:
   return n.createElement("p", {
    className: "_2ze8"
   }, p._("Connecting..."));

  case h.UIState.CALL_CONNECTED:
   return n.createElement("p", {
    className: "_2ze8"
   }, n.createElement(i, null));

  case h.UIState.CALL_ENDED:
   return n.createElement("p", {
    className: "_2ze8"
   }, q(t.endCallReason, t.isRemoteEnded));

  default:
   return "";
  }
 }, s = n.createClass({
  displayName: "FBRTCCallStateInfo",
  revealContainer: function() {
   var t = "_4j_h", u = document.getElementsByClassName(t)[0];
   if (u) u.className = t;
  },
  onCloseButtonClicked: function(t) {
   window.close();
   return;
  },
  onStartCallButtonClicked: function(t) {
   this.props.publishFn(j.UIEventType.START_CALL, t);
  },
  componentDidMount: function() {
   setTimeout(function() {
    this.revealContainer();
   }.bind(this), 2e3);
  },
  render: function() {
   var t = this.props.callModel;
   return n.createElement("div", {
    className: "_4j_i"
   }, this.renderPeerImage(t), this.renderMessage(), this.renderSubMessage(), this.renderCloseWindowButton(), this.renderStartCallButton());
  },
  renderMessage: function() {
   var t = this.props.callModel;
   if (t.uiState === h.UIState.AWAITING_USER_START) return n.createElement("p", {
    className: "_4j_k"
   }, p._("Ready to call {name}?", [ p.param("name", t.peerShortName()) ]));
   return n.createElement("p", {
    className: "_4j_k"
   }, this.props.callModel.peerName());
  },
  renderSubMessage: function() {
   return r(this.props.callModel, this.props.messengerUI);
  },
  renderPeerImage: function(t) {
   if (t.peerPicUrl()) {
    if (this.props.messengerUI) return n.createElement(m, {
     className: "_3z3i",
     isMessengerUser: true,
     size: 75,
     src: t.peerPicUrl()
    });
    return n.createElement(l, {
     className: "_4j_j",
     src: t.peerPicUrl(),
     alt: "profile pic",
     onLoad: this.revealContainer,
     onError: this.revealContainer
    });
   }
   return "";
  },
  shouldRenderCloseButton: function() {
   var t = this.props.callModel;
   return t.uiState === h.UIState.CALL_ENDED && (!t.wasConnected || t.endCallReason !== j.CallEndReason.HANGUP_CALL);
  },
  renderCloseWindowButton: function() {
   if (this.shouldRenderCloseButton()) {
    return n.createElement(g, {
     label: p._("Close Window"),
     messengerUI: this.props.messengerUI,
     onClick: this.onCloseButtonClicked,
     type: "primary"
    });
   } else return "";
  },
  renderStartCallButton: function() {
   var t = this.props.callModel;
   if (t.uiState === h.UIState.AWAITING_USER_START) {
    return n.createElement(g, {
     label: p._("Start Call"),
     messengerUI: this.props.messengerUI,
     onClick: this.onStartCallButtonClicked,
     type: "primary"
    });
   } else return "";
  }
 });
 e.exports = s;
}, null);

__d("FBRTCCallControls.react", [ "cx", "fbt", "React", "ReactLayeredComponentMixin", "XUIContextualDialog.react", "XUIContextualDialogBody.react", "XUIContextualDialogTitle.react", "LayerFadeOnHide", "LayerFadeOnShow", "FBRTCCallModel", "FBRTCUserSettings", "FBRTCConstants", "FBRTCStruct" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
 b.__markCompiled && b.__markCompiled();
 var t = 1e4, u = new s([ "READY", "SHOWN", "COMPLETE" ]), v = function(y, z, aa, ba) {
  var ca = !z || y === p.UIState.CALL_ENDED;
  return "_hgk" + (ba ? " " + "_urf" : "") + (ca ? " " + "_hgl" : "") + (aa === u.SHOWN ? " " + "_2727" : "");
 }, w = function(y, z) {
  return (y ? "_hgm" : "") + (" " + "_hgn") + (z ? " " + "_hgr" : "");
 }, x = i.createClass({
  displayName: "FBRTCCallControls",
  mixins: [ j ],
  getInitialState: function() {
   return {
    forceVisible: u.READY
   };
  },
  _shouldForceVisible: function(y) {
   var z = y.localStream;
   return y.videoIsAutoDisabled() || z.hasStream() && !z.hasVideoTracks();
  },
  componentWillReceiveProps: function(y) {
   if (this._shouldForceVisible(y.callModel)) {
    if (this.state.forceVisible === u.READY) {
     this.setState({
      forceVisible: u.SHOWN
     });
     setTimeout(function() {
      this.setState({
       forceVisible: u.COMPLETE
      });
     }.bind(this), t);
    }
   } else if (this.state.forceVisible === u.SHOWN) this.setState({
    forceVisible: u.COMPLETE
   });
  },
  _popoverProps: function() {
   var y = {
    contextRef: "videoButton",
    position: "above",
    alignment: "left",
    width: q.isEnabled() ? 320 : 255,
    hoverContext: i.findDOMNode(this.refs.videoButton),
    behaviors: {
     LayerFadeOnHide: n,
     LayerFadeOnShow: o
    }
   };
   if (this.state.forceVisible === u.SHOWN) y.shown = true;
   return y;
  },
  renderLayers: function() {
   var y, z, aa = {};
   if (!this.props.callModel.isRemoteVideoSupported) {
    z = this.props.callModel.peerShortName();
    y = i.createElement(k, i.__spread({}, this._popoverProps()), i.createElement(l, null, h._("Video is disabled for this call because {name}'s device does not support video.", [ h.param("name", z) ])));
   } else if (!this.props.callModel.localStream.hasVideoTracks()) {
    y = i.createElement(k, i.__spread({}, this._popoverProps()), i.createElement(m, null, h._("Can't Find Camera")), i.createElement(l, null, h._("Connect your camera and refresh the page to turn on video. If your camera is already connected, try restarting your browser.")));
   } else if (this.props.callModel.videoIsAutoDisabled()) y = i.createElement(k, i.__spread({}, this._popoverProps()), i.createElement(l, null, h._("Video is paused because the connection is slow.")));
   if (y) aa.videoPopover = y;
   return aa;
  },
  toggleMuteAudio: function(y) {
   this.props.publishFn(r.UIEventType.TOGGLE_MUTE_AUDIO, y);
  },
  toggleMuteVideo: function(y) {
   this.props.publishFn(r.UIEventType.TOGGLE_MUTE_VIDEO, y);
  },
  toggleFullScreen: function(y) {
   this.props.publishFn(r.UIEventType.TOGGLE_FULL_SCREEN, y);
  },
  endCall: function(y) {
   this.props.publishFn(r.UIEventType.HANG_UP, y);
  },
  showSettings: function(y) {
   if (q.isEnabled()) this.props.publishFn(r.UIEventType.SHOW_SETTINGS, y);
  },
  render: function() {
   var y = q.isEnabled(), z = this.props.callModel.uiState, aa = this.props.callModel.localStream.hasStream(), ba = !this.props.callModel.localStream.hasVideo() || !this.props.callModel.isRemoteVideoSupported, ca = !this.props.callModel.localStream.hasAudio(), da = this.props.callModel.isFullScreen(), ea = w(ba, false), fa = w(ca, false), ga = w(false, true), ha = w(false, false), ia = v(z, aa, this.state.forceVisible, y);
   return i.createElement("div", {
    className: ia
   }, i.createElement("button", {
    onClick: this.toggleMuteVideo,
    className: ea,
    ref: "videoButton"
   }, i.createElement("i", {
    className: "_qor" + (!ba ? " " + "_qos" : "") + (ba ? " " + "_qot" : "")
   })), i.createElement("button", {
    onClick: this.toggleMuteAudio,
    className: fa
   }, i.createElement("i", {
    className: "_qor" + (!ca ? " " + "_qou" : "") + (ca ? " " + "_qov" : "")
   })), i.createElement("button", {
    onClick: this.endCall,
    className: ga
   }, i.createElement("i", {
    className: "_qor _hgs"
   }), i.createElement("i", {
    className: "_qor _hgt"
   })), this._settingsButton(y), i.createElement("button", {
    onClick: this.toggleFullScreen,
    className: ha
   }, i.createElement("i", {
    className: "_qor" + (!da ? " " + "_qow" : "") + (da ? " " + "_qox" : "")
   })));
  },
  _settingsButton: function(y) {
   if (y) {
    var z = w(false, false);
    return i.createElement("button", {
     onClick: this.showSettings,
     className: z
    }, i.createElement("i", {
     className: "_qor _urg"
    }));
   }
  }
 });
 e.exports = x;
}, null);

__d("FBRTCFadeInMixin", [ "React", "cx", "joinClasses" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 var j = {
  componentDidMount: function() {
   var k = g.findDOMNode(this);
   k.style.opacity = 0;
   k.className = i(k.className, "_2hy");
   setTimeout(function() {
    k.style.opacity = 1;
   }, 1);
  }
 };
 e.exports = j;
}, null);

__d("FBRTCFeedbackCompleteView.react", [ "FBRTCButton.react", "FBRTCFadeInMixin", "React", "cx", "fbt" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 var l = i.createClass({
  displayName: "FBRTCFeedbackCompleteView",
  mixins: [ h ],
  onCallBackButtonClicked: function() {
   return;
  },
  onCloseButtonClicked: function() {
   window.close();
   return;
  },
  messageString: function() {
   if (this.props.skipped) return k._("Your call has ended");
   return k._("Thank you for your feedback!");
  },
  render: function() {
   return i.createElement("div", {
    className: "_1-7k"
   }, i.createElement("p", {
    className: "_4j_k"
   }, this.messageString()), i.createElement("div", null, i.createElement(g, {
    label: k._("Close Window"),
    messengerUI: this.props.messengerUI,
    onClick: this.onCloseButtonClicked,
    type: "primary"
   })));
  }
 });
 e.exports = l;
}, null);

__d("FBRTCFeedbackView.react", [ "cx", "fbt", "React", "FBRTCButton.react", "FBRTCConstants", "FBRTCFadeInMixin", "FBRTCFeedbackCompleteView.react" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
 b.__markCompiled && b.__markCompiled();
 var n = i.createClass({
  displayName: "FBRTCFeedbackView",
  mixins: [ l ],
  getInitialState: function() {
   return {
    submitted: false,
    skipped: false,
    feedbackText: ""
   };
  },
  onSubmitButtonClicked: function() {
   if (this.canSubmitFeedback()) {
    this.setState({
     submitted: true
    });
    this.props.publishFn(k.UIEventType.SUBMIT_FEEDBACK, this.state.feedbackText);
   }
  },
  onNotNowClicked: function() {
   this.setState({
    skipped: true,
    submitted: true
   });
   return;
  },
  canSubmitFeedback: function() {
   return this.state.feedbackText !== "";
  },
  feedbackChanged: function(o) {
   this.setState({
    feedbackText: o.target.value
   });
   o.preventDefault();
  },
  render: function() {
   if (this.state.submitted) return i.createElement(m, {
    messengerUI: this.props.messengerUI,
    skipped: this.state.skipped
   });
   return i.createElement("div", {
    className: "_1-7k"
   }, i.createElement("p", {
    className: "_4j_k"
   }, h._("Give Feedback")), i.createElement("div", {
    className: "_4ru1"
   }, i.createElement("label", {
    htmlFor: "fbwebrtcfeedback",
    className: "_4j_k _4ru2"
   }, h._("What was the worst problem you experienced?")), i.createElement("textarea", {
    className: "_4ru3",
    id: "fbwebrtcfeedback",
    rows: "4",
    onChange: this.feedbackChanged,
    placeholder: h._("Enter your feedback")
   }), i.createElement("div", {
    className: "_s97"
   }, i.createElement(j, {
    className: "_g6b",
    label: h._("Not Now"),
    messengerUI: this.props.messengerUI,
    onClick: this.onNotNowClicked,
    type: "secondary"
   }), i.createElement(j, {
    className: "_g6b",
    disabled: !this.canSubmitFeedback(),
    label: h._("Submit"),
    messengerUI: this.props.messengerUI,
    onClick: this.onSubmitButtonClicked,
    type: "primary"
   }))));
  }
 });
 e.exports = n;
}, null);

__d("FBRTCStarRatingView.react", [ "cx", "fbt", "FBRTCConstants", "FBRTCFadeInMixin", "React", "StarsInput.react", "FBRTCButton.react", "FBRTCFeedbackCompleteView.react", "FBRTCFeedbackView.react" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
 b.__markCompiled && b.__markCompiled();
 var p = k.createClass({
  displayName: "FBRTCStarRatingView",
  mixins: [ j ],
  getInitialState: function() {
   return {
    rating: 0,
    submitted: false,
    skipped: false,
    feedbackText: ""
   };
  },
  onCallBackButtonClicked: function() {
   return;
  },
  onCloseButtonClicked: function() {
   window.close();
   return;
  },
  onStarClicked: function(q) {
   this.setState({
    rating: q
   });
  },
  onSubmitButtonClicked: function() {
   if (this.state.rating > 0) {
    this.setState({
     submitted: true
    });
    this.props.publishFn(i.UIEventType.SUBMIT_STAR_RATING, this.state.rating);
   }
  },
  onNotNowClicked: function() {
   this.setState({
    skipped: true,
    submitted: true
   });
   return;
  },
  getRatingString: function() {
   switch (this.state.rating) {
   case 1:
    return h._("Poor");

   case 2:
    return h._("Fair");

   case 3:
    return h._("Good");

   case 4:
    return h._("Very Good");

   case 5:
    return h._("Excellent");

   default:
    return "---";
   }
  },
  shouldAskForFeedback: function() {
   return this.state.rating === 1 && this.state.submitted && !this.state.skipped;
  },
  render: function() {
   if (this.shouldAskForFeedback()) {
    return k.createElement(o, {
     publishFn: this.props.publishFn,
     messengerUI: this.props.messengerUI
    });
   } else if (this.state.submitted) return k.createElement(n, {
    skipped: this.state.skipped,
    messengerUI: this.props.messengerUI
   });
   var q = this.getRatingString();
   return k.createElement("div", {
    className: "_1-7k"
   }, k.createElement("p", {
    className: "_4j_k"
   }, h._("Please rate the quality of your video call.")), k.createElement("p", {
    className: "_4j_k _a16"
   }, q), k.createElement(l, {
    allowMultipleSubmissions: true,
    onClick: this.onStarClicked
   }), k.createElement("div", {
    className: "_s97"
   }, k.createElement(m, {
    className: "_g6b",
    label: h._("Not Now"),
    messengerUI: this.props.messengerUI,
    onClick: this.onNotNowClicked,
    type: "secondary"
   }), k.createElement(m, {
    className: "_g6b",
    label: h._("Submit"),
    disabled: this.state.rating === 0,
    messengerUI: this.props.messengerUI,
    onClick: this.onSubmitButtonClicked,
    type: "primary"
   })));
  }
 });
 e.exports = p;
}, null);

__d("FBRTCMediaAccessPrompt.react", [ "React", "cx", "fbt", "UserAgent", "Link.react", "XUIText.react", "FBRTCCallModel", "FBRTCConfig" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
 b.__markCompiled && b.__markCompiled();
 var o = g.createClass({
  displayName: "FBRTCMediaAccessPrompt",
  isVisible: function(p) {
   return (j.isBrowser("Chrome") || j.isBrowser("Firefox")) && p === m.UIState.PENDING_LOCAL_MEDIA;
  },
  componentWillUpdate: function(p, q) {
   var r = p.callModel.uiState;
   if (this.isVisible(r)) {
    clearTimeout(this.timeout);
    g.findDOMNode(this).style.display = "block";
   }
  },
  componentDidUpdate: function(p, q) {
   var r = this.props.callModel.uiState;
   if (!this.isVisible(r)) this.timeout = setTimeout(function() {
    g.findDOMNode(this).style.display = "none";
   }.bind(this), 500);
  },
  componentWillUnmount: function() {
   clearTimeout(this.timeout);
  },
  dialogTitle: function() {
   if (j.isBrowser("Chrome")) {
    return i._('Click "Allow" to Make a Call');
   } else return i._('Click the camera and choose "Share Selected Devices"');
  },
  dialogBody: function() {
   return i._("To make a video call on Facebook, you need to turn on your camera and microphone. This will let your friend see and hear you during the call.");
  },
  dialogLowerBody: function() {
   return i._("You can always turn these off later.");
  },
  learnMoreLink: function() {
   return g.createElement(k, {
    href: n.userMediaPermissionErrorUrl(),
    target: "_blank"
   }, i._("Learn more"));
  },
  render: function() {
   var p = this.props.callModel.uiState;
   return g.createElement("div", {
    className: "_250-" + (!this.isVisible(p) ? " " + "_250_" : "")
   }, g.createElement("i", {
    className: "_2510"
   }), g.createElement("i", {
    className: "_2511"
   }), g.createElement("div", {
    className: "_2514"
   }, g.createElement("h1", {
    className: "_2515"
   }, this.dialogTitle()), g.createElement(l, {
    className: "_4vd1",
    display: "block",
    size: "small"
   }, this.dialogBody()), g.createElement(l, {
    className: "_4vd1",
    display: "block",
    size: "small"
   }, this.dialogLowerBody(), " ", this.learnMoreLink())));
  }
 });
 e.exports = o;
}, null);

__d("FBRTCMediaDeniedPrompt.react", [ "React", "cx", "fbt", "UserAgent", "XUIContextualDialog.react", "XUIContextualDialogBody.react", "XUIContextualDialogTitle.react", "ReactLayeredComponentMixin", "FBRTCCallModel" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
 b.__markCompiled && b.__markCompiled();
 var p = g.createClass({
  displayName: "FBRTCMediaDeniedPrompt",
  mixins: [ n ],
  showDialog: function() {
   var q = this.props.callModel;
   return q.uiState === o.UIState.USER_MEDIA_DENIED;
  },
  arrowAlignment: function() {
   return j.isBrowser("Chrome") ? "right" : "left";
  },
  dialogTitle: function() {
   return i._("Click to Turn on Camera/Microphone");
  },
  dialogBody: function() {
   return i._("To use video calling, you need to turn on your camera and microphone during the call.");
  },
  renderLayers: function() {
   return {
    popover: g.createElement(k, {
     contextRef: "mpTarget",
     shown: this.showDialog(),
     position: "below",
     alignment: this.arrowAlignment(),
     width: k.WIDTH.NORMAL
    }, g.createElement(m, null, this.dialogTitle()), g.createElement(l, null, this.dialogBody()))
   };
  },
  render: function() {
   return g.createElement("div", {
    className: "_3wrz",
    ref: "mpTarget"
   });
  }
 });
 e.exports = p;
}, null);

__d("FBRTCBackgroundView.react", [ "React", "Image.react", "cx" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 var j = g.createClass({
  displayName: "FBRTCBackgroundView",
  getInitialState: function() {
   return {
    showCoverPhoto: true
   };
  },
  imageError: function() {
   this.setState({
    showCoverPhoto: false
   });
  },
  render: function() {
   var k = this.props.callModel.backgroundUrl();
   if (this.state.showCoverPhoto && k) {
    return g.createElement("div", {
     className: "_6qv"
    }, g.createElement("div", {
     className: "_6qw"
    }), g.createElement(h, {
     src: k,
     className: "_6q_",
     alt: "",
     onError: this.imageError
    }));
   } else return g.createElement("div", {
    className: "_6qv"
   });
  }
 });
 e.exports = j;
}, null);

__d("FBRTCView.react", [ "FBRTCConfig", "FBRTCInCallView.react", "FBRTCCallStateInfo.react", "FBRTCCallControls.react", "FBRTCStarRatingView.react", "FBRTCStreamWrapper", "FBRTCMediaAccessPrompt.react", "FBRTCMediaDeniedPrompt.react", "FBRTCCallModel", "FBRTCBackgroundView.react", "React", "cx" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
 b.__markCompiled && b.__markCompiled();
 var s = q.createClass({
  displayName: "FBRTCView",
  render: function() {
   var t = this.props.callModel, u = this.props.publishFn;
   if (t.uiState === o.UIState.COLLECT_RATING) {
    return q.createElement("div", {
     className: this._wrapperClass()
    }, q.createElement("div", {
     className: this._aspectRatioClass(t)
    }, this._renderBackground(), this._renderLogo(), q.createElement(k, {
     messengerUI: this.props.messengerUI,
     publishFn: u
    })));
   } else return q.createElement("div", {
    className: this._wrapperClass()
   }, q.createElement(m, {
    callModel: t
   }), q.createElement(n, {
    callModel: t
   }), q.createElement(i, {
    callModel: t,
    messengerUI: this.props.messengerUI,
    publishFn: u
   }), this._renderBackdrop(), q.createElement("div", {
    className: this._aspectRatioClass(t)
   }, this._renderBackground(), this._renderLogo(), q.createElement(h, {
    callModel: t,
    publishFn: u
   }), q.createElement(j, {
    callModel: t,
    publishFn: u
   })));
  },
  _aspectRatioClass: function(t) {
   var u = t.remoteStream.aspectRatio === l.aspectRatios["16:9"];
   return "_mdp" + (!u ? " " + "_mdq" : "") + (u ? " " + "_mds" : "");
  },
  _renderLogo: function() {
   if (!this.props.messengerUI) {
    var t = "_263g" + (!g.isMessengerDotCom() ? " " + "_56us" : "") + (g.isMessengerDotCom() ? " " + "_56ut" : "");
    return q.createElement("i", {
     className: t
    });
   }
  },
  _renderBackground: function() {
   if (!this.props.messengerUI) return q.createElement(p, {
    callModel: this.props.callModel
   });
  },
  _renderBackdrop: function() {
   if (this.props.messengerUI) {
    var t = this.props.callModel, u = "_2tvh" + (t.isRemoteVideoActive() ? " " + "_3apf" : "");
    return q.createElement("div", {
     className: u
    });
   }
  },
  _wrapperClass: function() {
   return "_3ref" + (this.props.messengerUI ? " " + "_3apg" : "");
  }
 });
 e.exports = s;
}, null);

__d("FBRTCViewController", [ "React", "FBRTCCallModel", "FBRTCConfig", "FBRTCConstants", "FBRTCCallDialogController", "FBRTCFullScreenController", "FBRTCLogger", "FBRTCRingback", "FBRTCView.react" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
 b.__markCompiled && b.__markCompiled();
 var p = 500;
 function q(r, s, t) {
  "use strict";
  this.$FBRTCViewController0 = r;
  this.$FBRTCViewController1 = s;
  this.$FBRTCViewController2 = t;
  this.$FBRTCViewController3 = false;
  this.$FBRTCViewController4 = m.getInstance();
 }
 q.prototype.init = function() {
  "use strict";
  var r = this;
  this.$FBRTCViewController0.addListener("changed", function(t) {
   if (t === h.UIState.COLLECT_RATING) r.$FBRTCViewController5();
   r.$FBRTCViewController6();
  });
  n.monitorCallModel(this.$FBRTCViewController0);
  var s = this.$FBRTCViewController6.bind(this);
  l.onFullScreenChange(s);
  this.$FBRTCViewController0.fetchPeerInfo();
  this.$FBRTCViewController6();
 };
 q.prototype.onLocalStreamReady = function(r) {
  "use strict";
  this.$FBRTCViewController0.setLocalStream(r);
  if (this.$FBRTCViewController0.uiState > h.UIState.MORE_INIT) {
   this.$FBRTCViewController4.logInfo(this.$FBRTCViewController0.peerID, this.$FBRTCViewController0.callID, "UI: Already @ MORE_INIT, no update");
  } else if (this.$FBRTCViewController0.canStartCall() && !this.$FBRTCViewController0.isCaller) {
   this.$FBRTCViewController0.setState(h.UIState.CALL_CONNECTING);
  } else this.$FBRTCViewController0.setState(h.UIState.MORE_INIT);
 };
 q.prototype.waitForUserInput = function() {
  "use strict";
  this.$FBRTCViewController0.setStateFrom(h.UIState.INIT, h.UIState.AWAITING_USER_START);
 };
 q.prototype.userMediaRequested = function() {
  "use strict";
  setTimeout(function() {
   this.$FBRTCViewController0.setStateFrom(h.UIState.INIT, h.UIState.PENDING_LOCAL_MEDIA);
  }.bind(this), p);
 };
 q.prototype.userMediaGranted = function() {
  "use strict";
  this.$FBRTCViewController0.setState(h.UIState.MORE_INIT);
 };
 q.prototype.userMediaDenied = function() {
  "use strict";
  this.$FBRTCViewController0.setState(h.UIState.USER_MEDIA_DENIED);
 };
 q.prototype.onTurnCredentialsReady = function(r) {
  "use strict";
  if (!this.$FBRTCViewController0.isCaller) this.$FBRTCViewController0.setStateFrom(h.UIState.MORE_INIT, h.UIState.CALL_CONNECTING);
 };
 q.prototype.onMessageTypeSent = function(r) {
  "use strict";
  if (r !== j.PayloadType.OFFER && r !== j.PayloadType.PCRESTART_OFFER) return;
  if (r === j.PayloadType.PCRESTART_OFFER) this.$FBRTCViewController3 = true;
  if (r === j.PayloadType.OFFER) this.$FBRTCViewController0.setState(h.UIState.CONTACTING);
 };
 q.prototype.onMessageTypeReceived = function(r) {
  "use strict";
  if (this.$FBRTCViewController3) {
   if (r === j.PayloadType.ANSWER) this.$FBRTCViewController0.setStateFrom(h.UIState.CONTACTING, h.UIState.CALL_CONNECTING);
  } else if (r === j.PayloadType.OFFER_ACK) {
   this.$FBRTCViewController0.setStateFrom(h.UIState.CONTACTING, h.UIState.RINGING);
  } else if (r === j.PayloadType.ANSWER) if (this.$FBRTCViewController0.uiState === h.UIState.CONTACTING || this.$FBRTCViewController0.uiState === h.UIState.RINGING) this.$FBRTCViewController0.setState(h.UIState.CALL_CONNECTING);
 };
 q.prototype.onRemoteStreamAdded = function(event) {
  "use strict";
  this.$FBRTCViewController0.setRemoteStream(event.stream);
  var r = this;
  this.$FBRTCViewController0.remoteStream.once("streamStarted", function() {
   r.$FBRTCViewController0.setStateFrom(h.UIState.CALL_CONNECTING, h.UIState.CALL_CONNECTED);
  });
  this.$FBRTCViewController0.remoteStream.addListener("tracksChanged", function() {
   r.$FBRTCViewController6();
  });
  this.$FBRTCViewController6();
 };
 q.prototype.end = function(r, s) {
  "use strict";
  this.$FBRTCViewController0.endCallReason = r;
  this.$FBRTCViewController0.isRemoteEnded = s;
  this.$FBRTCViewController0.setState(h.UIState.CALL_ENDED);
 };
 q.prototype.reset = function(r, s) {
  "use strict";
  this.$FBRTCViewController0.resetForReconnect(r);
  this.$FBRTCViewController1 = s;
  this.$FBRTCViewController0.setState(h.UIState.CALL_CONNECTING);
 };
 q.prototype.$FBRTCViewController7 = function(r, s) {
  "use strict";
  switch (r) {
  case j.UIEventType.HANG_UP:
   this.$FBRTCViewController8(s);
   break;

  case j.UIEventType.TOGGLE_MUTE_AUDIO:
   this.$FBRTCViewController9(s);
   break;

  case j.UIEventType.TOGGLE_MUTE_VIDEO:
   this.$FBRTCViewControllera(s);
   break;

  case j.UIEventType.TOGGLE_FULL_SCREEN:
   this.$FBRTCViewControllerb(s);
   break;

  case j.UIEventType.TOGGLE_SELF_VIEW:
   this.$FBRTCViewControllerc(s);
   break;

  case j.UIEventType.SUBMIT_STAR_RATING:
   this.$FBRTCViewControllerd(s);
   break;

  case j.UIEventType.SUBMIT_FEEDBACK:
   this.$FBRTCViewControllere(s);
   break;

  case j.UIEventType.SHOW_SETTINGS:
   this.$FBRTCViewControllerf(s);
   break;

  case j.UIEventType.START_CALL:
   if (this.onStartCall) this.onStartCall(m.Trigger.POPUP_CALL_START_BUTTON);
   break;

  default:
   break;
  }
 };
 q.prototype.$FBRTCViewControllerf = function(r) {
  "use strict";
  k.showDialog(k.dialogTypes.SETTINGS, this.$FBRTCViewController0);
 };
 q.prototype.$FBRTCViewController8 = function(r) {
  "use strict";
  if (this.onHangup) this.onHangup();
 };
 q.prototype.$FBRTCViewController9 = function(r) {
  "use strict";
  this.$FBRTCViewController0.localStream.toggleMuteAudio();
  this.$FBRTCViewController6();
  this.$FBRTCViewControllerg(m.CallAction.SET_MUTE, !this.$FBRTCViewController0.localStream.hasAudio());
 };
 q.prototype.$FBRTCViewControllera = function(r) {
  "use strict";
  this.$FBRTCViewController0.localStream.toggleMuteVideo();
  this.$FBRTCViewControllerg(m.CallAction.SET_VIDEO_ON, this.$FBRTCViewController0.localStream.hasVideo());
 };
 q.prototype.$FBRTCViewControllerb = function(r) {
  "use strict";
  l.toggleFullScreen();
  this.$FBRTCViewControllerg(m.CallAction.SET_FULLSCREEN_ON, l.isFullScreen());
 };
 q.prototype.$FBRTCViewControllerc = function(r) {
  "use strict";
  this.$FBRTCViewController0.selfViewOpen = !this.$FBRTCViewController0.selfViewOpen;
  this.$FBRTCViewController6();
  this.$FBRTCViewControllerg(m.CallAction.SET_SELF_VIEW_ON, this.$FBRTCViewController0.selfViewOpen);
 };
 q.prototype.$FBRTCViewController5 = function() {
  "use strict";
  this.$FBRTCViewController1.addExtraInfo(m.Key.RATING_SHOWN, "1");
  this.$FBRTCViewController1.save(this.$FBRTCViewController2);
 };
 q.prototype.$FBRTCViewControllerd = function(r) {
  "use strict";
  if (r < 1 || r > 5) {
   this.$FBRTCViewControllerh(this.$FBRTCViewController0.peerID, this.$FBRTCViewController0.callID, "Bad rating: " + r);
   return;
  }
  this.$FBRTCViewController1.addExtraInfo(m.Key.RATING, r);
  this.$FBRTCViewController1.save(this.$FBRTCViewController2);
 };
 q.prototype.$FBRTCViewControllere = function(r) {
  "use strict";
  this.$FBRTCViewController1.addExtraInfo(m.Key.SURVEY_DETAILS, r);
  this.$FBRTCViewController1.save(this.$FBRTCViewController2);
 };
 q.prototype.$FBRTCViewControllerg = function(r, s) {
  "use strict";
  this.$FBRTCViewController4.logCallAction(this.$FBRTCViewController0.peerID, this.$FBRTCViewController0.callID, r, s ? "true" : "false");
 };
 q.prototype.$FBRTCViewController6 = function() {
  "use strict";
  if (this.$FBRTCViewController0.invalidated) return;
  var r = document.getElementById("fbRTC/container");
  g.render(g.createElement(o, {
   callModel: this.$FBRTCViewController0,
   messengerUI: i.useMessengerCallUI(),
   publishFn: this.$FBRTCViewController7.bind(this)
  }), r);
 };
 e.exports = q;
}, null);

__d("FBRTCCallModelStatePusher", [ "FBRTCCallModel", "FBRTCConstants" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 var i = 3e4, j = 1e4;
 function k(l) {
  "use strict";
  this.$FBRTCCallModelStatePusher0 = l;
  this.$FBRTCCallModelStatePusher0.addListener("changed", this.$FBRTCCallModelStatePusher1.bind(this));
 }
 k.prototype.$FBRTCCallModelStatePusher2 = function() {
  "use strict";
  return this.$FBRTCCallModelStatePusher0.uiState === g.UIState.CALL_ENDED && this.$FBRTCCallModelStatePusher0.wasConnected && this.$FBRTCCallModelStatePusher0.endCallReason === h.CallEndReason.HANGUP_CALL;
 };
 k.prototype.$FBRTCCallModelStatePusher1 = function() {
  "use strict";
  if (this.$FBRTCCallModelStatePusher0.uiState === g.UIState.CALL_ENDED) {
   if (this.$FBRTCCallModelStatePusher2()) {
    this.$FBRTCCallModelStatePusher3(3e3, g.UIState.CALL_ENDED, g.UIState.COLLECT_RATING);
   } else this.$FBRTCCallModelStatePusher4(j);
  } else if (this.$FBRTCCallModelStatePusher0.uiState === g.UIState.COLLECT_RATING) this.$FBRTCCallModelStatePusher4(i);
 };
 k.prototype.$FBRTCCallModelStatePusher4 = function(l) {
  "use strict";
  setTimeout(function() {
   window.close();
  }, l);
 };
 k.prototype.$FBRTCCallModelStatePusher3 = function(l, m, n) {
  "use strict";
  var o = this.$FBRTCCallModelStatePusher0;
  setTimeout(function() {
   o.setStateFrom(m, n);
  }, l);
 };
 e.exports = k;
}, null);

__d("FBRTCRetriableMessage", [ "mixInEventEmitter", "FBRTCConstants" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 var i = 1e4, j = 7e3, k = 1;
 function l(m) {
  "use strict";
  this.$FBRTCRetriableMessage0 = m;
  this.$FBRTCRetriableMessage1 = i;
  this.$FBRTCRetriableMessage2 = k;
  this.$FBRTCRetriableMessage3 = null;
  this.$FBRTCRetriableMessage4 = null;
  this.$FBRTCRetriableMessage5 = null;
 }
 l.prototype.sendMessage = function(m, n, o, p, q) {
  "use strict";
  this.$FBRTCRetriableMessage3 = n;
  switch (m) {
  case h.PayloadType.PCRESTART_OFFER:
   this.$FBRTCRetriableMessage4 = this.$FBRTCRetriableMessage0.sendPCRestartOffer(n, o, p, q);
   break;

  case h.PayloadType.OFFER:
   this.$FBRTCRetriableMessage4 = this.$FBRTCRetriableMessage0.sendOffer(n, o, p, q);
   break;

  case h.PayloadType.ANSWER:
   this.$FBRTCRetriableMessage1 = j;
   this.$FBRTCRetriableMessage4 = this.$FBRTCRetriableMessage0.sendAnswer(n, o, p, q);
   break;
  }
  this.$FBRTCRetriableMessage6();
 };
 l.prototype.isAckMsg = function(m) {
  "use strict";
  return this.$FBRTCRetriableMessage4 && this.$FBRTCRetriableMessage4.msg_id === m.ack_id;
 };
 l.prototype.stopRetrying = function() {
  "use strict";
  if (this.$FBRTCRetriableMessage5) {
   clearTimeout(this.$FBRTCRetriableMessage5);
   this.$FBRTCRetriableMessage3 = null;
   this.$FBRTCRetriableMessage4 = null;
   this.$FBRTCRetriableMessage5 = null;
  }
 };
 l.prototype.$FBRTCRetriableMessage6 = function() {
  "use strict";
  this.$FBRTCRetriableMessage5 = setTimeout(this.$FBRTCRetriableMessage7.bind(this), this.$FBRTCRetriableMessage1);
 };
 l.prototype.$FBRTCRetriableMessage7 = function() {
  "use strict";
  if (this.$FBRTCRetriableMessage2 < 1) {
   this.emit("timeoutFailure");
  } else {
   this.emit("sendingRetry");
   this.$FBRTCRetriableMessage0.resendSdpMessage(this.$FBRTCRetriableMessage3, this.$FBRTCRetriableMessage4);
   this.$FBRTCRetriableMessage6();
   this.$FBRTCRetriableMessage2 -= 1;
  }
 };
 g(l, {
  sendingRetry: true,
  timeoutFailure: true
 });
 e.exports = l;
}, null);

__d("FBRTCWindowManager", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 var g = {
  init: function(h, i) {
   this._window = h;
   this._callModel = i;
   i.addListener("changed", this._setProgressIndicator, this);
   this._setProgressIndicator();
   this._monitorOpenerForChanges();
  },
  _setProgressIndicator: function() {
   if (this._callModel.isEnded()) {
    this._window.rtcCallInProgessWith = null;
   } else this._window.rtcCallInProgessWith = this._callModel.peerID.toString();
  },
  _monitorOpenerForChanges: function() {
   if (this._window.opener) try {
    this._window.opener.addEventListener("unload", function(event) {
     this._passWindowToOpener(10);
    }.bind(this));
   } catch (h) {}
  },
  _passWindowToOpener: function(h) {
   setTimeout(function() {
    setTimeout(function() {
     if (this._window.opener && !this._window.opener.closed) this._window.opener.rtcCallChildWindow = this._window;
    }.bind(this), 1);
    if (h > 1) this._passWindowToOpener(h - 1);
   }.bind(this), 1e3);
  }
 };
 e.exports = g;
}, null);

__d("FBRTCCallController", [ "ErrorUtils", "Run", "FBRTCCallConnection", "FBRTCCallConnectionMonitor", "FBRTCCallModel", "FBRTCCallMonitor", "FBRTCCallSummary", "FBRTCCallSummaryStore", "FBRTCConfig", "FBRTCConstants", "FBRTCExperiments", "FBRTCIceCache", "FBRTCLocalMessageQueue", "FBRTCLogger", "FBRTCMessage", "FBRTCMessageDedup", "FBRTCMessageListener", "FBRTCMessageSender", "FBRTCPCConfig", "FBRTCTurnDiscovery", "FBRTCSdpUtils", "FBRTCUserMedia", "FBRTCViewController", "FBRTCCallModelStatePusher", "FBRTCCallDialogController", "FBRTCRetriableMessage", "FBRTCUserMediaRequest", "FBRTCUserSettings", "FBRTCUrlManager", "FBRTCWindowManager", "fbt", "randomInt", "AvailableList" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba, ca, da, ea, fa, ga, ha, ia, ja, ka, la) {
 b.__markCompiled && b.__markCompiled();
 b("AvailableList");
 var ma = 6e4;
 function na() {
  return la(0, 4294967295);
 }
 function oa(pa, qa, ra, sa) {
  "use strict";
  this.$FBRTCCallController0 = t.getInstance();
  this.$FBRTCCallController1 = new s();
  this.$FBRTCCallController2 = n.getInstance();
  this.$FBRTCCallController3 = null;
  this.$FBRTCCallController4 = false;
  if (!ra) {
   this.$FBRTCCallController3 = this.$FBRTCCallController1.getOffer(pa);
   if (this.$FBRTCCallController3) {
    v.check(pa, this.$FBRTCCallController3.call_id, this.$FBRTCCallController3.msg_id);
   } else ra = true;
  }
  if (!qa) qa = this.$FBRTCCallController3 ? this.$FBRTCCallController3.call_id : na();
  this.$FBRTCCallController0.logCallAction(pa, qa, t.CallAction.POPUP_OPENED);
  this.$FBRTCCallController5 = new k({
   peerID: pa,
   callID: qa,
   isCaller: ra
  });
  if (this.$FBRTCCallController3 && !aa.isVideoSupported(this.$FBRTCCallController3.sdp)) this.$FBRTCCallController5.isRemoteVideoSupported = false;
  this.$FBRTCCallController5.localStream.setVideoEnabled(!sa);
  this.$FBRTCCallController6 = new da(this.$FBRTCCallController5);
  this.$FBRTCCallController7 = m.restoreOrInitialize(this.$FBRTCCallController2, pa, qa, ra, this.$FBRTCCallController3);
  this.$FBRTCCallController7.onPopupOpened();
  ia.init(this.$FBRTCCallController5.peerID);
  ja.init(window, this.$FBRTCCallController5);
  this.$FBRTCCallController8 = new ca(this.$FBRTCCallController5, this.$FBRTCCallController7, this.$FBRTCCallController2);
  this.$FBRTCCallController8.onHangup = this.$FBRTCCallController9.bind(this, p.CallEndReason.HANGUP_CALL, false, true, false);
  this.$FBRTCCallController8.onStartCall = this.$FBRTCCallControllera.bind(this);
  this.$FBRTCCallController8.init();
  this.$FBRTCCallControllerb = new i();
  this.$FBRTCCallControllerb.addListener("remoteStreamAdded", this.$FBRTCCallController8.onRemoteStreamAdded, this.$FBRTCCallController8);
  this.$FBRTCCallControllerb.addListener("sdpCreated", this.$FBRTCCallControllerc, this);
  this.$FBRTCCallControllerb.addListener("localIceCandidateCreated", this.$FBRTCCallControllerd, this);
  this.$FBRTCCallControllerb.addListener("remoteDescriptionSet", this.$FBRTCCallControllere, this);
  this.$FBRTCCallControllerb.addListener("connected", this.$FBRTCCallControllerf, this);
  this.$FBRTCCallControllerb.addListener("disconnected", this.$FBRTCCallControllerg, this);
  this.$FBRTCCallControllerb.addListener("connectionUnstable", this.$FBRTCCallControllerh, this);
  this.$FBRTCCallControllerb.addListener("connectionError", this.$FBRTCCallControlleri, this);
  this.$FBRTCCallControllerj = false;
  this.$FBRTCCallControllerk = false;
  this.$FBRTCCallControllerl = new j(this.$FBRTCCallControllerb, this.$FBRTCCallController7);
  this.$FBRTCCallControllerl.addListener("connectionPoor", this.$FBRTCCallControllerm, this);
  this.$FBRTCCallControllern = new x();
  this.$FBRTCCallControllern.onMessageSent = this.$FBRTCCallControllero.bind(this);
  this.$FBRTCCallControllern.onSendFailure = this.$FBRTCCallControllerp.bind(this);
  this.$FBRTCCallControllerq = null;
  this.$FBRTCCallControllerr = null;
  this.$FBRTCCallControllers = new r();
  this.$FBRTCCallControllert = false;
  h.onBeforeUnload(this.$FBRTCCallControlleru.bind(this), false);
  h.onUnload(this.$FBRTCCallControllerv.bind(this));
  g.addListener(this.$FBRTCCallControllerw.bind(this), true);
  w.init();
  w.setMessageHandler(this.$FBRTCCallControllerx, this);
  var ta = this;
  this.$FBRTCCallControllery = new l(this.$FBRTCCallController5);
  this.$FBRTCCallControllery.startHeartbeat(function() {
   return ta.$FBRTCCallController7;
  });
  this.$FBRTCCallControllerz = null;
  ha.addListener("saved", this.$FBRTCCallControllerA, this);
  z.addListener("receivedTurnCreds", this.$FBRTCCallControllerB, this);
  z.addListener("failed", this.$FBRTCCallControllerC, this);
  z.requestTurnCreds(this.$FBRTCCallController5);
 }
 oa.prototype.$FBRTCCallControllera = function(pa) {
  "use strict";
  this.$FBRTCCallController7.onCallStarted(pa);
  this.startCallProcess();
 };
 oa.prototype.startCallProcess = function() {
  "use strict";
  this.$FBRTCCallControllerD();
  this.$FBRTCCallController8.userMediaRequested();
 };
 oa.prototype.waitForUserInput = function() {
  "use strict";
  this.$FBRTCCallController8.waitForUserInput();
 };
 oa.prototype.$FBRTCCallControllerD = function() {
  "use strict";
  ba.once("streamReady", this.$FBRTCCallControllerE, this);
  ba.addListener("accessDenied", this.$FBRTCCallControllerF, this);
  ba.addListener("accessFailed", this.$FBRTCCallControllerG, this);
  ba.addListener("accessGranted", this.$FBRTCCallControllerH, this);
  this.$FBRTCCallController5.localStream.addListener("streamStarted", function() {
   var pa = this.$FBRTCCallController5.localStream.videoWidth, qa = this.$FBRTCCallController5.localStream.videoHeight;
   this.$FBRTCCallController7.setVideoCaptureStats(pa, qa);
   var ra = o.shouldUseHdVideo(), sa = this.$FBRTCCallController5.isRemoteVideoSupported;
   if (ra && sa && pa === ga.HD_WIDTH || !ra && sa && pa === ga.SD_WIDTH) q.logExposure(q.QE.VIDEO_QUALITY);
  }.bind(this));
  this.$FBRTCCallControllerI();
 };
 oa.prototype.$FBRTCCallControllerI = function() {
  "use strict";
  var pa;
  if (!this.$FBRTCCallController5.isRemoteVideoSupported) {
   pa = ba.STREAM_TYPE.NO_VIDEO;
  } else if (o.shouldUseHdVideo()) {
   pa = ba.STREAM_TYPE.HD_VIDEO;
  } else pa = ba.STREAM_TYPE.SD_VIDEO;
  ba.requestUserMedia(pa, ha.savedMic, ha.savedCamera);
 };
 oa.prototype.$FBRTCCallControllerA = function() {
  "use strict";
  this.$FBRTCCallController0.logCallAction(this.$FBRTCCallController5.peerID, this.$FBRTCCallController5.callID, t.CallAction.USER_SETTINGS_CHANGED);
  ba.once("streamReady", function(pa) {
   ha.updateForLocalStream(pa);
   this.$FBRTCCallController5.setLocalStream(pa);
   this.$FBRTCCallControllerJ();
  }.bind(this));
  this.$FBRTCCallControllerI();
 };
 oa.prototype.$FBRTCCallControllerh = function() {
  "use strict";
  this.$FBRTCCallController0.logInfo(this.$FBRTCCallController5.peerID, this.$FBRTCCallController5.callID, "Network unstable");
 };
 oa.prototype.$FBRTCCallControllerm = function() {
  "use strict";
  this.$FBRTCCallController0.logInfo(this.$FBRTCCallController5.peerID, this.$FBRTCCallController5.callID, "Network poor");
  q.logExposure(q.QE.AUTO_DISABLE);
  if (o.shouldAutoDisableVideo()) this.$FBRTCCallController5.autoDisableVideo();
 };
 oa.prototype.$FBRTCCallControllerw = function(pa) {
  "use strict";
  var qa = pa.message + "; " + pa.stackFrames[0].identifier;
  this.$FBRTCCallController0.logError(this.$FBRTCCallController5.peerID, this.$FBRTCCallController5.callID, "JSError: " + qa);
 };
 oa.prototype.$FBRTCCallControlleru = function() {
  "use strict";
  if (this.$FBRTCCallController5.isInProgress()) return ka._("Leaving this page will end your call.");
 };
 oa.prototype.$FBRTCCallControllerv = function() {
  "use strict";
  if (this.$FBRTCCallController5.isEnded()) return;
  var pa = this.$FBRTCCallController5.isUserMediaPending(), qa = this.$FBRTCCallController5.isUserMediaDenied(), ra = p.CallEndReason.HANGUP_CALL, sa = "BrowserClosed";
  if (pa || qa) {
   ra = p.CallEndReason.CLIENT_ERROR;
   sa = pa ? "MediaPending" : "MediaDenied";
  } else if (this.$FBRTCCallController5.isAwaitingUserStart()) sa = "AwaitingUserStart";
  this.$FBRTCCallController9(ra, false, true, true, sa);
 };
 oa.prototype.$FBRTCCallControllerB = function(pa) {
  "use strict";
  this.$FBRTCCallController0.logInfo(this.$FBRTCCallController5.peerID, this.$FBRTCCallController5.callID, "Received Turn Creds");
  y.setTurnCredentials(pa);
  this.$FBRTCCallController8.onTurnCredentialsReady(pa);
  this.$FBRTCCallControllerK();
 };
 oa.prototype.$FBRTCCallControllerC = function() {
  "use strict";
  this.$FBRTCCallController0.logError(this.$FBRTCCallController5.peerID, this.$FBRTCCallController5.callID, "Failed to get turn creds");
  this.$FBRTCCallController9(p.CallEndReason.CLIENT_ERROR, false, !this.$FBRTCCallController5.isCaller, false, "NoTurnCreds");
 };
 oa.prototype.$FBRTCCallControllerK = function() {
  "use strict";
  if (this.$FBRTCCallController5.canStartCall()) {
   ia.onCallStarted();
   this.$FBRTCCallControllerb.init(this.$FBRTCCallController5.localStream);
   if (!this.$FBRTCCallController3) {
    this.$FBRTCCallControllerb.createOffer();
   } else {
    if (this.$FBRTCCallController3.hasOwnProperty("videoon")) this.$FBRTCCallControllerL(this.$FBRTCCallController3.videoon);
    this.$FBRTCCallControllerM(this.$FBRTCCallController3.sdp, true);
    this.$FBRTCCallController1.removeOffer(this.$FBRTCCallController5.peerID);
    this.$FBRTCCallController3 = null;
   }
   this.$FBRTCCallController1.enableDequeuing(this.$FBRTCCallController5.peerID, this.$FBRTCCallController5.callID, this.$FBRTCCallControllerx.bind(this));
  }
 };
 oa.prototype.$FBRTCCallControllerJ = function() {
  "use strict";
  if (this.$FBRTCCallController5.isAwaitingAnswer()) {
   this.$FBRTCCallControllerj = true;
  } else {
   this.$FBRTCCallControllerj = false;
   this.$FBRTCCallControllerk = false;
   if (this.$FBRTCCallController5.supportsSdpUpdate()) {
    this.$FBRTCCallControllerb.createSdpUpdate();
   } else {
    this.$FBRTCCallController4 = true;
    this.$FBRTCCallControllers.reset(this.$FBRTCCallController5.peerID, this.$FBRTCCallController5.callID);
    this.$FBRTCCallControllert = false;
    this.$FBRTCCallControllerb.createOffer();
   }
  }
 };
 oa.prototype.$FBRTCCallControllerE = function(pa) {
  "use strict";
  ha.updateForLocalStream(pa);
  this.$FBRTCCallController8.onLocalStreamReady(pa);
  this.$FBRTCCallController5.localStream.addListener("tracksChanged", this.$FBRTCCallControllerN.bind(this));
  this.$FBRTCCallControllerK();
 };
 oa.prototype.$FBRTCCallControllerF = function() {
  "use strict";
  this.$FBRTCCallController0.logCallAction(this.$FBRTCCallController5.peerID, this.$FBRTCCallController5.callID, t.CallAction.DENIED_PERMISSION);
  this.$FBRTCCallController8.userMediaDenied();
 };
 oa.prototype.$FBRTCCallControllerG = function(pa) {
  "use strict";
  this.$FBRTCCallController9(p.CallEndReason.CLIENT_ERROR, false, true, false, pa);
  ea.showDialog(ea.dialogTypes.ERROR_ACCESSING_MEDIA, this.$FBRTCCallController5);
 };
 oa.prototype.$FBRTCCallControllerH = function() {
  "use strict";
  this.$FBRTCCallController8.userMediaGranted();
 };
 oa.prototype.$FBRTCCallControllerc = function(pa) {
  "use strict";
  switch (pa.type) {
  case "offer":
   this.$FBRTCCallControllerO(pa.sdp);
   break;

  case "answer":
   this.$FBRTCCallControllerP(pa.sdp);
   break;

  case "sdp_update":
   this.$FBRTCCallControllerQ(pa.sdp);
   break;

  default:
   break;
  }
 };
 oa.prototype.$FBRTCCallControllerQ = function(pa) {
  "use strict";
  this.$FBRTCCallControllern.sendSdpUpdate(this.$FBRTCCallController5.peerID, this.$FBRTCCallController5.callID, pa, this.$FBRTCCallController5.localStream.hasVideo());
 };
 oa.prototype.$FBRTCCallControllerO = function(pa) {
  "use strict";
  var qa;
  if (!this.$FBRTCCallController4) {
   qa = p.PayloadType.OFFER;
  } else {
   qa = p.PayloadType.PCRESTART_OFFER;
   this.$FBRTCCallController4 = false;
  }
  this.$FBRTCCallControllerq = new fa(this.$FBRTCCallControllern);
  this.$FBRTCCallControllerq.addListener("sendingRetry", this.$FBRTCCallControllerR.bind(this));
  this.$FBRTCCallControllerq.addListener("timeoutFailure", this.$FBRTCCallControllerS.bind(this));
  this.$FBRTCCallControllerq.sendMessage(qa, this.$FBRTCCallController5.peerID, this.$FBRTCCallController5.callID, pa, this.$FBRTCCallController5.localStream.hasVideo());
  this.$FBRTCCallControllerz = setTimeout(function() {
   this.$FBRTCCallController9(p.CallEndReason.NO_ANSWER_TIMEOUT, false, true, false);
  }.bind(this), ma);
 };
 oa.prototype.$FBRTCCallControllerS = function() {
  "use strict";
  var pa;
  if (this.$FBRTCCallController5.receivedNack) {
   pa = p.CallEndReason.UNSUPPORTED_VERSION;
   ea.showDialog(ea.dialogTypes.PEER_BROWSER_UNSUPPORTED, this.$FBRTCCallController5);
  } else pa = p.CallEndReason.OTHER_NOT_CAPABLE;
  this.$FBRTCCallController9(pa, false, true, false, "TimedOut");
 };
 oa.prototype.$FBRTCCallControllerN = function() {
  "use strict";
  this.$FBRTCCallControllerk = this.$FBRTCCallController5.isAwaitingAnswer();
  if (!this.$FBRTCCallController5.isRemoteVideoSupported) return;
  this.$FBRTCCallControllern.sendMuteStateUpdate(this.$FBRTCCallController5.peerID, this.$FBRTCCallController5.callID, this.$FBRTCCallController5.localStream.hasVideo());
 };
 oa.prototype.$FBRTCCallControllerL = function(pa) {
  "use strict";
  this.$FBRTCCallController5.remoteStream.setVideoEnabled(pa);
 };
 oa.prototype.$FBRTCCallControllerP = function(pa) {
  "use strict";
  var qa = this.$FBRTCCallController5.localStream.hasVideo() && this.$FBRTCCallController5.isRemoteVideoSupported;
  this.$FBRTCCallControllerr = new fa(this.$FBRTCCallControllern);
  this.$FBRTCCallControllerr.addListener("sendingRetry", this.$FBRTCCallControllerR.bind(this));
  this.$FBRTCCallControllerr.sendMessage(p.PayloadType.ANSWER, this.$FBRTCCallController5.peerID, this.$FBRTCCallController5.callID, pa, qa);
 };
 oa.prototype.$FBRTCCallControllerR = function() {
  "use strict";
  var pa = this.$FBRTCCallControllerb.getCreatedIceCandidates();
  for (var qa = 0; qa < pa.length; qa++) this.$FBRTCCallControllerT(pa[qa]);
 };
 oa.prototype.$FBRTCCallControllerT = function(pa) {
  "use strict";
  this.$FBRTCCallControllern.sendIceCandidate(this.$FBRTCCallController5.peerID, this.$FBRTCCallController5.callID, pa);
 };
 oa.prototype.$FBRTCCallControllerM = function(pa, qa) {
  "use strict";
  var ra = aa.isVideoSupported(pa);
  this.$FBRTCCallController5.isRemoteVideoSupported = ra;
  this.$FBRTCCallControllerb.setPeerSupportsVideo(ra);
  if (qa) {
   this.$FBRTCCallControllerb.onReceivedOfferSDP(pa);
  } else this.$FBRTCCallControllerb.onReceivedAnswerSDP(pa);
 };
 oa.prototype.$FBRTCCallControllerd = function(pa) {
  "use strict";
  this.$FBRTCCallControllerT(pa);
 };
 oa.prototype.$FBRTCCallControllere = function() {
  "use strict";
  this.$FBRTCCallControllert = true;
  var pa = this;
  this.$FBRTCCallControllers.drainCandidates(this.$FBRTCCallController5.peerID, this.$FBRTCCallController5.callID, function(qa) {
   pa.$FBRTCCallControllerb.onReceivedRemoteIceCandidate(qa);
  });
 };
 oa.prototype.$FBRTCCallControllerf = function() {
  "use strict";
  this.$FBRTCCallControllerU();
  this.$FBRTCCallController7.onCallConnected();
  this.$FBRTCCallControllery.onCallHeartbeat(this.$FBRTCCallController7);
  this.$FBRTCCallController0.logInfo(this.$FBRTCCallController5.peerID, this.$FBRTCCallController5.callID, "Call Connected");
 };
 oa.prototype.$FBRTCCallControllerg = function() {
  "use strict";
  this.$FBRTCCallController9(p.CallEndReason.CONNECTION_DROPPED, false, true, false);
 };
 oa.prototype.$FBRTCCallControlleri = function(pa) {
  "use strict";
  this.$FBRTCCallController9(p.CallEndReason.WEBRTC_ERROR, false, true, false, pa.endCallSubreason);
  this.$FBRTCCallController0.logError(this.$FBRTCCallController5.peerID, this.$FBRTCCallController5.callID, "webrtc error: " + JSON.stringify(pa.details));
 };
 oa.prototype.$FBRTCCallControllerp = function(pa, qa) {
  "use strict";
  this.$FBRTCCallController9(pa, false, false, false, qa);
 };
 oa.prototype.$FBRTCCallControllero = function(pa, qa) {
  "use strict";
  var ra = qa.call_id, sa = qa.type;
  if (this.$FBRTCCallController5.isEnded()) {
   this.$FBRTCCallController0.logError(this.$FBRTCCallController5.peerID, this.$FBRTCCallController5.callID, "Message sent after call ended: " + sa);
   return;
  }
  if (this.$FBRTCCallController5.peerID !== pa || this.$FBRTCCallController5.callID !== ra) return;
  this.$FBRTCCallController8.onMessageTypeSent(sa);
  this.$FBRTCCallController7.onMessageSent(qa);
 };
 oa.prototype.$FBRTCCallControllerx = function(pa) {
  "use strict";
  var qa;
  try {
   qa = new u(pa);
  } catch (ra) {
   this.$FBRTCCallController0.logError(this.$FBRTCCallController5.peerID, this.$FBRTCCallController5.callID, "Unknown data: " + JSON.stringify(pa));
   return;
  }
  this.$FBRTCCallController0.logReceivedMessage(qa.peerID, qa.callID, qa.msg);
  if (this.$FBRTCCallController5.isEnded()) {
   this.$FBRTCCallController0.logInfo(this.$FBRTCCallController5.peerID, this.$FBRTCCallController5.callID, "Ignoring message (call ended): " + qa.msgID);
   return;
  }
  if (!v.check(qa.peerID, qa.callID, qa.msgID)) {
   this.$FBRTCCallController0.logInfo(this.$FBRTCCallController5.peerID, this.$FBRTCCallController5.callID, "Ignoring message (duplicate): " + qa.msgID);
   return;
  }
  if (this.$FBRTCCallController5.peerID && this.$FBRTCCallController5.peerID !== qa.peerID) {
   if (qa.isOffer()) this.$FBRTCCallControllerV(qa);
   this.$FBRTCCallController0.logInfo(this.$FBRTCCallController5.peerID, this.$FBRTCCallController5.callID, "Ignoring message (different peer): " + qa.msgID);
   return;
  }
  if (!qa.isForCall(this.$FBRTCCallController5)) {
   this.$FBRTCCallController0.logInfo(this.$FBRTCCallController5.peerID, this.$FBRTCCallController5.callID, "Ignoring message (different call): " + qa.msgID);
   return;
  }
  this.$FBRTCCallController8.onMessageTypeReceived(qa.msgType);
  if (this.$FBRTCCallController5.callID && this.$FBRTCCallController5.callID === qa.callID) this.$FBRTCCallController7.onFullMessageReceived(qa);
  this.$FBRTCCallController5.setSignalingExperiments(qa.getSignalingExperiments());
  switch (qa.msgType) {
  case p.PayloadType.OFFER:
  case p.PayloadType.ICERESTART_OFFER:
  case p.PayloadType.PCRESTART_OFFER:
   this.$FBRTCCallControllerW(qa);
   break;

  case p.PayloadType.ANSWER:
  case p.PayloadType.ICERESTART_ANSWER:
  case p.PayloadType.PCRESTART_ANSWER:
   this.$FBRTCCallControllerX(qa);
   this.$FBRTCCallControllery.onCallHeartbeat(this.$FBRTCCallController7);
   break;

  case p.PayloadType.SDP_UPDATE:
   this.$FBRTCCallControllerY(qa);
   break;

  case p.PayloadType.ICE_CANDIDATE:
   this.$FBRTCCallControllerZ(qa);
   break;

  case p.PayloadType.HANGUP:
   this.$FBRTCCallController10(qa);
   break;

  case p.PayloadType.OFFER_ACK:
   this.$FBRTCCallController11();
   break;

  case p.PayloadType.OFFER_NACK:
   this.$FBRTCCallController5.receivedNack = true;
   break;

  case p.PayloadType.ANSWER_ACK:
   this.$FBRTCCallController12();
   break;

  case p.PayloadType.MSG_ACK:
   this.$FBRTCCallController13(qa);
   break;

  case p.PayloadType.SET_VIDEO:
   if (this.$FBRTCCallController5.isRemoteVideoSupported) this.$FBRTCCallControllerL(qa.msg.videoon);
   break;

  case p.PayloadType.OK:
  case p.PayloadType.PING:
  case p.PayloadType.OTHER_DISMISS:
  case p.PayloadType.PRANSWER:
   break;

  default:
   break;
  }
 };
 oa.prototype.$FBRTCCallControllerV = function(pa) {
  "use strict";
  var qa = pa.peerID, ra = pa.callID, sa = pa.msg, ta = new m({
   peerID: qa,
   callID: ra,
   isCaller: false
  });
  ta.onFullMessageReceived(pa);
  this.$FBRTCCallControllern.sendOfferAck(qa, ra, sa);
  ta.onOfferAckSent(sa);
  var ua = p.CallEndReason.IN_ANOTHER_CALL;
  this.$FBRTCCallController14(qa, ra, ua);
  ta.onCallEnded(ua, false);
  ta.save(this.$FBRTCCallController2);
 };
 oa.prototype.$FBRTCCallControllerW = function(pa) {
  "use strict";
  var qa = pa.msg;
  this.$FBRTCCallControllern.sendOfferAck(this.$FBRTCCallController5.peerID, qa.call_id, qa);
  this.$FBRTCCallControllern.sendOtherDismiss(qa.call_id);
  if (this.$FBRTCCallController15(qa)) {
   this.$FBRTCCallController16(pa);
  } else this.$FBRTCCallController17();
 };
 oa.prototype.$FBRTCCallControllerY = function(pa) {
  "use strict";
  var qa = pa.msg;
  if (qa.hasOwnProperty("videoon")) this.$FBRTCCallControllerL(qa.videoon);
  this.$FBRTCCallControllerb.onReceivedSdpUpdate(qa.sdp);
 };
 oa.prototype.$FBRTCCallController15 = function(pa) {
  "use strict";
  if (pa.call_id === this.$FBRTCCallController5.callID) return true;
  return (this.$FBRTCCallControllerz || !this.$FBRTCCallController3) && (!this.$FBRTCCallController5.callID || pa.call_id !== this.$FBRTCCallController5.callID) && this.$FBRTCCallController5.isCaller && (!pa.handlescollision || pa.call_id < this.$FBRTCCallController5.callID);
 };
 oa.prototype.$FBRTCCallController16 = function(pa) {
  "use strict";
  var qa = pa.msg;
  if (qa.hasOwnProperty("videoon")) this.$FBRTCCallControllerL(qa.videoon);
  this.$FBRTCCallController18();
  this.$FBRTCCallController19();
  this.$FBRTCCallControllerU();
  if (this.$FBRTCCallController5.callID !== qa.call_id) {
   var ra = p.CallEndReason.OTHER_INSTANCE_HANDLED;
   this.$FBRTCCallController14(this.$FBRTCCallController5.peerID, this.$FBRTCCallController5.callID, ra);
   this.$FBRTCCallController7.onCallEnded(ra, false);
   this.$FBRTCCallController7.save(this.$FBRTCCallController2);
   this.$FBRTCCallController7 = new m({
    peerID: this.$FBRTCCallController5.peerID,
    callID: qa.call_id,
    isCaller: false
   });
   this.$FBRTCCallController7.onFullMessageReceived(pa);
   this.$FBRTCCallController7.onOfferAckSent(qa);
   this.$FBRTCCallController0.logEvent(this.$FBRTCCallController5.peerID, this.$FBRTCCallController5.callID, "Handling offer collision");
  } else this.$FBRTCCallController0.logEvent(this.$FBRTCCallController5.peerID, this.$FBRTCCallController5.callID, "Handling offer refresh");
  this.$FBRTCCallControllerb.end();
  this.$FBRTCCallControllert = false;
  this.$FBRTCCallController8.reset(qa.call_id, this.$FBRTCCallController7);
  if (this.$FBRTCCallController5.canStartCall()) {
   this.$FBRTCCallControllerM(qa.sdp, true);
   ia.onCallStarted();
   this.$FBRTCCallControllerN();
  } else this.$FBRTCCallController3 = qa;
 };
 oa.prototype.$FBRTCCallController17 = function() {
  "use strict";
  this.$FBRTCCallController0.logEvent(this.$FBRTCCallController5.peerID, this.$FBRTCCallController5.callID, "Ignoring offer");
 };
 oa.prototype.$FBRTCCallControllerX = function(pa) {
  "use strict";
  var qa = pa.msg;
  this.$FBRTCCallController18();
  this.$FBRTCCallController19();
  this.$FBRTCCallControllern.sendAnswerAck(this.$FBRTCCallController5.peerID, this.$FBRTCCallController5.callID, qa);
  if (this.$FBRTCCallControllerj) {
   this.$FBRTCCallControllerJ();
  } else {
   this.$FBRTCCallControllerM(qa.sdp, false);
   if (qa.hasOwnProperty("videoon")) this.$FBRTCCallControllerL(qa.videoon);
   if (this.$FBRTCCallControllerk) this.$FBRTCCallControllerN();
  }
 };
 oa.prototype.$FBRTCCallController13 = function(pa) {
  "use strict";
  var qa = pa.msg;
  if (this.$FBRTCCallControllerq && this.$FBRTCCallControllerq.isAckMsg(qa)) {
   this.$FBRTCCallController7.onMsgAckReceived(pa, true);
   this.$FBRTCCallController8.onMessageTypeReceived(p.PayloadType.OFFER_ACK);
   this.$FBRTCCallController11();
  } else if (this.$FBRTCCallControllerr && this.$FBRTCCallControllerr.isAckMsg(qa)) {
   this.$FBRTCCallController7.onMsgAckReceived(pa, false);
   this.$FBRTCCallController12();
  }
 };
 oa.prototype.$FBRTCCallController11 = function() {
  "use strict";
  this.$FBRTCCallController18();
  this.$FBRTCCallControllery.onCallHeartbeat(this.$FBRTCCallController7);
 };
 oa.prototype.$FBRTCCallController12 = function() {
  "use strict";
  this.$FBRTCCallControllerU();
 };
 oa.prototype.$FBRTCCallControllerZ = function(pa) {
  "use strict";
  var qa = pa.msg;
  if (qa.call_id === this.$FBRTCCallController5.callID && this.$FBRTCCallControllert) {
   this.$FBRTCCallControllerb.onReceivedRemoteIceCandidate(qa);
  } else this.$FBRTCCallControllers.cacheCandidate(this.$FBRTCCallController5.peerID, qa.call_id, qa);
 };
 oa.prototype.$FBRTCCallController10 = function(pa) {
  "use strict";
  var qa = pa.msg;
  if (qa.call_id === this.$FBRTCCallController5.callID) {
   this.$FBRTCCallController9(qa.reason, true, false);
  } else this.$FBRTCCallController0.logError(this.$FBRTCCallController1a.peerID, this.$FBRTCCallController1a.callID, "Reciving hangup for a different call: " + qa.call_id.toString());
 };
 oa.prototype.$FBRTCCallController9 = function(pa, qa, ra, sa, ta) {
  "use strict";
  if (typeof pa == "string" || pa instanceof String) pa = p.endCallReasonFromString(pa);
  var ua = p.fullCallEndReasonString(pa, qa);
  this.$FBRTCCallController0.logCallAction(this.$FBRTCCallController5.peerID, this.$FBRTCCallController5.callID, t.CallAction.END_CALL, ua);
  this.$FBRTCCallController18();
  this.$FBRTCCallController19();
  this.$FBRTCCallControllerU();
  if (this.$FBRTCCallController5.isEnded()) {
   this.$FBRTCCallController0.logError(this.$FBRTCCallController5.peerID, this.$FBRTCCallController5.callID, "Ending an already-ended call");
   return;
  }
  if (ra) this.$FBRTCCallController14(this.$FBRTCCallController5.peerID, this.$FBRTCCallController5.callID, pa, sa);
  this.$FBRTCCallControllerb.end();
  ba.end();
  this.$FBRTCCallController8.end(pa, qa);
  this.$FBRTCCallController7.onCallEnded(pa, qa, null, ta);
  this.$FBRTCCallController7.save(this.$FBRTCCallController2);
 };
 oa.prototype.$FBRTCCallController14 = function(pa, qa, ra, sa) {
  "use strict";
  this.$FBRTCCallControllern.sendHangup(pa, qa, ra, sa);
  this.$FBRTCCallControllern.sendOtherDismiss(qa);
 };
 oa.prototype.$FBRTCCallController18 = function() {
  "use strict";
  if (this.$FBRTCCallControllerq) this.$FBRTCCallControllerq.stopRetrying();
 };
 oa.prototype.$FBRTCCallControllerU = function() {
  "use strict";
  if (this.$FBRTCCallControllerr) this.$FBRTCCallControllerr.stopRetrying();
 };
 oa.prototype.$FBRTCCallController19 = function() {
  "use strict";
  if (this.$FBRTCCallControllerz) clearTimeout(this.$FBRTCCallControllerz);
  this.$FBRTCCallControllerz = null;
 };
 e.exports = oa;
}, null);

__d("FBRTCApplication", [ "FBRTCLogger", "FBRTCCallController", "VideoCallSupport" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 var j = {
  init: function(k, l, m, n, o) {
   var p = g.getInstance();
   p.logInfo(k, l, "Starting Call Controller");
   document.documentElement.style.overflow = "hidden";
   if (!i.isWebrtcSupported()) {
    p.logError(k, l, "Webrtc not supported");
   } else {
    var q = new h(k, l, m, o);
    if (n) {
     q.startCallProcess();
    } else q.waitForUserInput();
   }
  }
 };
 e.exports = j;
}, null);