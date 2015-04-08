if (self.CavalryLogger) {
 CavalryLogger.start_js([ "ONkCB" ]);
}

__d("MessengerProfileImageWrapper.react", [ "ReactComponentWithPureRenderMixin", "React", "cx", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var k = h, l = k.PropTypes, m = h.createClass({
  displayName: "MessengerProfileImageWrapper",
  mixins: [ g ],
  propTypes: {
   isMessengerUser: l.bool,
   showBadge: l.bool,
   size: l.number
  },
  render: function() {
   return h.createElement("div", {
    className: j("_4ldz", this.props.className),
    style: {
     width: this.props.size + "px",
     height: this.props.size + "px"
    }
   }, h.createElement("div", {
    className: "_4ld-",
    style: {
     width: this.props.size + "px",
     height: this.props.size + "px"
    }
   }, this.props.children), this._renderBadge());
  },
  _renderBadge: function() {
   if (!this.props.showBadge || this.props.isMessengerUser == null) return null;
   return h.createElement(n, {
    className: "_4ld_",
    isMessengerUser: this.props.isMessengerUser
   });
  }
 }), n = h.createClass({
  displayName: "MessengerBadge",
  mixins: [ g ],
  propTypes: {
   isMessengerUser: l.bool,
   size: l.number
  },
  render: function() {
   return h.createElement("div", {
    className: j(this.props.className, "_2pom")
   }, h.createElement("div", {
    className: "_2pon" + (this.props.isMessengerUser ? " " + "_2poo" : "") + (!this.props.isMessengerUser ? " " + "_2pop" : "")
   }));
  }
 });
 e.exports = m;
}, null);

__d("MessengerContactImage.react", [ "Image.react", "MessengerProfileImageWrapper.react", "ReactComponentWithPureRenderMixin", "React" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 var k = j, l = k.PropTypes, m = j.createClass({
  displayName: "MessengerContactImage",
  mixins: [ i ],
  propTypes: {
   isMessengerUser: l.bool,
   size: l.number.isRequired,
   src: l.string.isRequired
  },
  render: function() {
   return j.createElement("div", {
    className: this.props.className
   }, j.createElement(h, {
    isMessengerUser: this.props.isMessengerUser,
    size: this.props.size,
    showBadge: true
   }, j.createElement(g, {
    height: this.props.size,
    src: this.props.src,
    width: this.props.size
   })));
  }
 });
 e.exports = m;
}, null);

__d("MessengerButton.react", [ "ReactComponentWithPureRenderMixin", "React", "cx", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var k = h, l = k.PropTypes, m = h.createClass({
  displayName: "MessengerButton",
  mixins: [ g ],
  propTypes: {
   label: l.string.isRequired,
   type: l.oneOf([ "primary", "secondary" ]).isRequired,
   use: l.oneOf([ "default", "danger" ]).isRequired
  },
  getDefaultProps: function() {
   return {
    use: "default"
   };
  },
  handleLinkClick: function(n) {
   if (this.props.disabled) {
    n.preventDefault();
   } else if (this.props.onClick) this.props.onClick(n);
  },
  render: function() {
   var n = this.props, o = n.className, p = n.label, q = function(r, s) {
    var t = {}, u = Object.prototype.hasOwnProperty;
    if (r == null) throw new TypeError();
    for (var v in r) if (u.call(r, v) && !u.call(s, v)) t[v] = r[v];
    return t;
   }(n, {
    className: 1,
    label: 1
   });
   return h.createElement("a", h.__spread({
    className: j("_3quh" + (" " + "_5vn4") + (" " + "_30yy") + (this.props.type === "primary" ? " " + "_3qui" : "") + (this.props.type === "secondary" ? " " + "_3quj" : "") + (this.props.use === "danger" ? " " + "_3ay_" : "") + (this.props.disabled ? " " + "_4zab" : ""), o),
    href: "#"
   }, q, {
    onClick: this.handleLinkClick
   }), p);
  }
 });
 e.exports = m;
}, null);

__d("MessengerSpinner.react", [ "Image.react", "ReactComponentWithPureRenderMixin", "React", "cx", "fbt", "ix", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var n = i, o = n.PropTypes, p = l("/unpublished/images/messenger/core/LoadingSpinner.png"), q = l("/unpublished/images/messenger/core/LoadingSpinnerGrey.png"), r = 24, s = i.createClass({
  displayName: "MessengerSpinner",
  mixins: [ h ],
  propTypes: {
   color: o.oneOf([ "blue", "grey" ])
  },
  getDefaultProps: function() {
   return {
    color: "blue"
   };
  },
  render: function() {
   return i.createElement(g, {
    "aria-label": k._("Loading..."),
    "aria-busy": true,
    className: m(this.props.className, "_3u55 _3qh2"),
    height: r,
    src: this.props.color === "blue" ? p : q,
    width: r
   });
  }
 });
 e.exports = s;
}, null);

__d("MNCommerceAttachmentConstants", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 var g = {
  XLARGE_IMAGE_DIMENSION: 72,
  LARGE_IMAGE_DIMENSION: 60,
  SMALL_IMAGE_DIMENSION: 32,
  BUBBLE_PADDING: 6,
  DIALOG: {
   WIDTH: 445,
   PADDING: 12
  },
  ORDER_DETAIL: {
   SUB_TOTAL: "subTotal",
   SHIPPING: "shippingCost",
   TAX: "tax",
   TOTAL: "totalCost"
  }
 };
 e.exports = g;
}, null);

__d("isRetina", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 e.exports = function() {
  return (window.devicePixelRatio || 1) > 1;
 };
}, null);

__d("MessengerPage", [ "EventEmitter", "EventEmitterWithHolding", "EventHolder", "keyMirror", "performanceAbsoluteNow" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var l = {
  Events: j({
   APP_MOUNTED: null,
   DATA_INITIALIZED: null,
   JS_LOADED: null
  }),
  addRetroactiveListener: function(n, o) {
   return m.addRetroactiveListener(n, o);
  },
  emit: function(n) {
   m.emitAndHold(n, k());
  },
  removeCurrentListener: function() {
   m.removeCurrentListener();
  }
 }, m = new h(new g(), new i());
 e.exports = l;
}, null);

__d("MessengerArtilleryClient", [ "Artillery", "ArtilleryCategory", "ArtillerySequenceType", "Banzai", "MessengerPage", "NavigationConfiguration", "Promise", "TimingSegmentBuilder", "performance" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var p = {
  start: function() {
   if (!g.isEnabled() || !o.timing || !window._cstart) return;
   var t = g.getPageTrace();
   q(t);
   r(k.Events.JS_LOADED, k.Events.DATA_INITIALIZED, k.Events.APP_MOUNTED).then(function(u) {
    var v = u[0], w = u[1], x = u[2], y = t.createSegment({
     category: h.CLIENT,
     description: "requiring_modules",
     begin: window._cstart,
     end: v
    }), z = t.createSegment({
     category: h.CLIENT,
     description: "initializing_data",
     begin: v,
     end: w
    }), aa = t.createSegment({
     category: h.CLIENT,
     description: "mounting_app",
     begin: w,
     end: x
    }), ba = t.createSequence({
     description: "initialization",
     category: i.SEQUENCE_CLIENT
    });
    ba.addSegment(y, z, aa);
    t.markSegment(aa, "e2e");
    t.post();
   });
   j.subscribe(j.SHUTDOWN, function() {
    return g.postAll();
   });
  }
 };
 function q(t) {
  var u = n.build(t, o.timing, l), v = t.createSequence({
   description: "browser_navigation",
   category: i.SEQUENCE_CLIENT
  });
  u.list.forEach(function(w) {
   return v.addSegment(w);
  });
 }
 function r() {
  for (var t = [], u = 0, v = arguments.length; u < v; u++) t.push(arguments[u]);
  return m.all(t.map(s));
 }
 function s(t) {
  return new m(function(u) {
   k.addRetroactiveListener(t, function(v) {
    k.removeCurrentListener();
    u(v);
   });
  });
 }
 e.exports = p;
}, null);

__d("MessengerComposerSteps", [ "keyMirror" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var h = g({
  NULL: null,
  SELECT_RECIPIENTS: null,
  COMPOSE: null
 });
 e.exports = h;
}, null);