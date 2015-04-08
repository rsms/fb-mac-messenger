if (self.CavalryLogger) {
 CavalryLogger.start_js([ "aBV31" ]);
}

__d("MessengerDispatcher", [ "Dispatcher" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 e.exports = new g();
}, null);

__d("MessengerURIConstants", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var g = {
  COMPOSE_SUBPATH: "/new",
  GROUPS_PATH: "/groups",
  PEOPLE_PATH: "/people",
  THREAD_PREFIX: "/t/",
  GROUP_PREFIX: "group-",
  RESERVED_WORDS: [ "groups", "people", "new", "messenger", "t" ]
 };
 e.exports = g;
}, null);

__d("MessengerStateProcessor", [ "MercuryAPIArgsSource", "MercuryIDs", "MercuryParticipantTypes", "MercuryParticipants", "MercuryServerRequests", "MercuryThreads", "MessengerURIConstants" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var n = {
  preprocess: function(q) {
   var r = q.activeThreadID;
   if (r) {
    var s = h.getUserIDFromThreadID(r), t = s && j.getNow(h.getParticipantIDFromUserID(s));
    if (t && t.type !== i.EVENT) {
     q.threadKey = t.vanity || s;
    } else if (s && !t) {
     q.threadKey = s;
    } else {
     var u = k.get(), v = u.getServerThreadIDNow(r);
     q.threadKey = v || r;
    }
   }
   delete q.activeThreadID;
   return q;
  },
  postprocess: function(q) {
   var r = k.get(), s = l.get(), t = p(q.threadKey), u;
   if (o(t) || r.isUser(t)) {
    var v = j.getIDFromVanityOrFBID(t), w = v && s.getCanonicalThreadToParticipant(v, null, g.MESSENGER);
    if (w) u = w.thread_id;
   }
   if (!u) u = h.isValid(t) ? t : r.getClientThreadIDNow(t);
   if (u) {
    q.activeThreadID = u;
    q.serverThreadID = r.getServerThreadIDNow(u);
   }
   delete q.threadKey;
   return q;
  }
 };
 function o(q) {
  return !!(q && isNaN(q));
 }
 function p(q) {
  if (!q) return null;
  return q.startsWith(m.GROUP_PREFIX) ? q.substr(m.GROUP_PREFIX.length) : q;
 }
 e.exports = n;
}, null);

__d("MessengerURISerializer", [ "MessengerStateProcessor", "MessengerURIConstants", "MessengerView", "URI" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var k = "/?$", l = {
  serialize: function(u) {
   var v = new j(window.location.origin);
   u = g.preprocess(u);
   switch (u.masterView) {
   case i.MASTER.GROUPS:
    v.setPath(h.GROUPS_PATH);
    break;

   case i.MASTER.PEOPLE:
    v.setPath(h.PEOPLE_PATH);
    break;
   }
   if (u.detailView === i.DETAIL.COMPOSE) {
    v.setPath(v.getPath() + h.COMPOSE_SUBPATH);
   } else if (u.threadKey) v.setPath(v.getPath() + h.THREAD_PREFIX + s(u.threadKey));
   return v;
  },
  deserialize: function(u) {
   var v = {}, w = u.getPath();
   if (w.match("^" + h.GROUPS_PATH)) {
    v.masterView = i.MASTER.GROUPS;
   } else if (w.match("^" + h.PEOPLE_PATH)) {
    v.masterView = i.MASTER.PEOPLE;
   } else v.masterView = i.MASTER.RECENT;
   if (w.match(h.COMPOSE_SUBPATH + k)) {
    v.detailView = i.DETAIL.COMPOSE;
   } else {
    var x = m(w);
    if (x && !q(x)) {
     v.threadKey = t(x);
     v.detailView = i.DETAIL.THREAD;
    }
   }
   return g.postprocess(v);
  }
 };
 function m(u) {
  var v = u.match(h.THREAD_PREFIX + "([^/]+)" + k);
  return v && v[1];
 }
 var n = h.RESERVED_WORDS.join("|"), o = new RegExp("^(" + n + ")$"), p = new RegExp("^\\.(" + n + ")$");
 function q(u) {
  return !!u.match(o);
 }
 function r(u) {
  return !!u.match(p);
 }
 function s(u) {
  u = q(u) ? "." + u : u;
  return j.encodeComponent(u);
 }
 function t(u) {
  u = j.decodeComponent(u);
  return r(u) ? u.substr(1) : u;
 }
 e.exports = l;
}, null);

__d("MessengerActions", [ "MessengerDispatcher", "MessengerURISerializer", "MessengerView", "URI", "goURI", "keyMirror" ], function(a, b, c, d, e, f, g, h, i, j, k, l) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var m = l({
  REPLACE_STATE: null,
  REPLACE_INFO_PANEL_VISIBILITY: null,
  SHOW_DIALOG: null,
  HIDE_DIALOG: null
 }), n = {
  Types: m,
  changeDetailView: function(p) {
   o(function(q) {
    if (q.detailView !== p) return {
     detailView: p
    };
   });
  },
  changeMasterView: function(p) {
   o(function(q) {
    if (q.masterView !== p) return {
     masterView: p
    };
   });
  },
  selectThread: function(p) {
   o(function(q) {
    if (q.activeThreadID !== p) return {
     activeThreadID: p,
     detailView: i.DETAIL.THREAD
    };
   });
  },
  changeState: function(p) {
   g.dispatch({
    type: m.REPLACE_STATE,
    nextState: p
   });
  },
  changeInfoPanelVisibility: function(p) {
   g.dispatch({
    type: n.Types.REPLACE_INFO_PANEL_VISIBILITY,
    nextState: {
     infoPanelVisibility: p
    }
   });
  },
  showDialog: function(p, q) {
   g.dispatch({
    type: n.Types.SHOW_DIALOG,
    dialogClass: p,
    dialogProps: q
   });
  },
  hideDialog: function() {
   g.dispatch({
    type: n.Types.HIDE_DIALOG
   });
  }
 };
 function o(p) {
  var q = h.deserialize(j(window.location.href)), r = p(q);
  if (r) k(h.serialize(Object.assign(q, r)));
 }
 e.exports = n;
}, null);

__d("MessengerAttachmentImageBlock.react", [ "React", "cx", "joinClasses" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var j = g, k = j.PropTypes, l = g.createClass({
  displayName: "MessengerAttachmentImageBlock",
  propTypes: {
   attachment: k.object.isRequired
  },
  render: function() {
   return g.createElement("div", {
    className: i(this.props.className, this._computeClass())
   }, this._renderImage(), g.createElement("div", {
    className: "_5swm"
   }, this.props.children));
  },
  _renderImage: function() {
   var n = this._getDimensions(), o = n.height, p = n.width;
   if (!o || !p) return null;
   var q = o > p, r = m(o, p), s = o / p * 100, t = q || r ? .2 : 1, u = q || r ? s : 52;
   return g.createElement("div", {
    className: "_3xn1",
    style: {
     backgroundImage: "url(" + this.props.attachment.media.image + ")",
     paddingBottom: q && s > 150 ? "136px" : u * t + "%"
    }
   });
  },
  _computeClass: function() {
   var n = this._getDimensions(), o = n.height, p = n.width;
   if (!o || !p) return "_3xn3 _5swn";
   var q = o > p;
   return "_3xn3" + (m(o, p) && !q ? " " + "_3xn5" : "") + (q ? " " + "_3xn6" : "") + (p >= o ? " " + "_3xn7" : "");
  },
  _getDimensions: function() {
   var n = this.props.attachment.properties || {}, o = n.height, p = n.width;
   if (o && p) {
    o = parseInt(o, 10);
    p = parseInt(p, 10);
    return {
     height: o,
     width: p
    };
   }
   return {
    height: 0,
    width: 0
   };
  }
 });
 function m(n, o) {
  return n <= 300 && o <= 300;
 }
 e.exports = l;
}, null);

__d("MessengerDialogButton.react", [ "MessengerButton.react", "ReactComponentWithPureRenderMixin", "React", "cx", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var l = i, m = l.PropTypes, n = i.createClass({
  displayName: "MessengerDialogButton",
  mixins: [ h ],
  propTypes: {
   action: m.oneOf([ "button", "cancel", "confirm" ])
  },
  render: function() {
   var o = this.props, p = o.action, q = o.className, r = function(s, t) {
    var u = {}, v = Object.prototype.hasOwnProperty;
    if (s == null) throw new TypeError();
    for (var w in s) if (v.call(s, w) && !v.call(t, w)) u[w] = s[w];
    return u;
   }(o, {
    action: 1,
    className: 1
   });
   return i.createElement(g, i.__spread({
    className: k(q, "_5ixy" + (p === "button" ? " " + "layerButton" : "") + (p === "cancel" ? " " + "layerCancel" : "") + (p === "confirm" ? " " + "layerConfirm" : ""))
   }, r));
  }
 });
 e.exports = n;
}, null);

__d("MessengerDialog.react", [ "LayerFadeOnHide", "LayerHideOnEscape", "React", "XUIDialog.react", "cx", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j, k, l) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var m = i, n = m.PropTypes, o = i.createClass({
  displayName: "MessengerDialog",
  propTypes: {
   onToggle: n.func.isRequired,
   repositionOnUpdate: n.bool,
   shown: n.bool,
   width: n.number
  },
  getDefaultProps: function() {
   return {
    repositionOnUpdate: false,
    shown: true,
    width: 400
   };
  },
  componentDidUpdate: function() {
   if (this.props.repositionOnUpdate) setTimeout(function() {
    if (this.isMounted() && this.refs.dialog && this.refs.dialog.layer) this.refs.dialog.layer.updatePosition();
   }.bind(this));
  },
  render: function() {
   return i.createElement(j, i.__spread({
    behaviors: {
     LayerFadeOnHide: g,
     LayerHideOnEscape: h
    }
   }, this.props, {
    className: l("_4ebx", this.props.className),
    ref: "dialog"
   }), i.createElement("div", {
    className: "_4eby"
   }, this.props.children));
  }
 });
 e.exports = o;
}, null);

__d("MessengerDialogBody.react", [ "React", "cx", "joinClasses" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var j = g.createClass({
  displayName: "MessengerDialogBody",
  render: function() {
   return g.createElement("div", {
    className: i("_4eb-", this.props.className)
   }, this.props.children);
  }
 });
 e.exports = j;
}, null);

__d("MessengerDialogFooter.react", [ "LeftRight.react", "React", "cx", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var k = h, l = k.PropTypes, m = h.createClass({
  displayName: "MessengerDialogFooter",
  propTypes: {
   leftContent: l.object
  },
  render: function() {
   return h.createElement("div", {
    className: j("_4eb_", this.props.className)
   }, h.createElement(g, null, h.createElement("div", {
    className: "_2_d1"
   }, this.props.leftContent), h.createElement("div", null, this.props.children)));
  }
 });
 e.exports = m;
}, null);

__d("MessengerDialogHeader.react", [ "React", "cx", "joinClasses" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var j = g.createClass({
  displayName: "MessengerDialogHeader",
  render: function() {
   return g.createElement("h4", {
    className: i("_4ebz", this.props.className)
   }, this.props.children);
  }
 });
 e.exports = j;
}, null);

__d("MessengerText.react", [ "ReactComponentWithPureRenderMixin", "React", "cx", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var k = h, l = k.PropTypes, m = h.createClass({
  displayName: "MessengerText",
  mixins: [ g ],
  propTypes: {
   type: l.oneOf([ "primary", "secondary" ]).isRequired,
   size: l.oneOf([ "small" ])
  },
  render: function() {
   return h.createElement("div", h.__spread({}, this.props, {
    className: j("_39r5" + (this.props.type === "primary" ? " " + "_39r6" : "") + (this.props.type === "secondary" ? " " + "_39r7" : "") + (this.props.size === "small" ? " " + "_39r8" : ""), this.props.className)
   }), this.props.children);
  }
 });
 e.exports = m;
}, null);

__d("MNCommerceActionTypes", [ "keyMirrorRecursive" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var h = g({
  RECEIPT: {
   LOADED: null,
   LOAD_ERROR: null
  },
  SHIPMENT: {
   LOADED: null,
   LOAD_ERROR: null
  },
  DIALOG: {
   SHOW: null,
   HIDE: null
  }
 });
 e.exports = h;
}, null);

__d("MNCommerceDialogStateActions", [ "MessengerDispatcher", "MNCommerceActionTypes" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var i = {
  showDialog: function(j, k) {
   g.dispatch({
    type: h.DIALOG.SHOW,
    dialogContainer: j,
    state: k
   });
  },
  hideDialog: function() {
   g.dispatch({
    type: h.DIALOG.HIDE
   });
  }
 };
 e.exports = i;
}, null);

__d("MNCommerceDialogStateStore", [ "FluxStore", "MessengerDispatcher", "MNCommerceActionTypes" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 for (var j in g) if (g.hasOwnProperty(j)) l[j] = g[j];
 var k = g === null ? null : g.prototype;
 l.prototype = Object.create(k);
 l.prototype.constructor = l;
 l.__superConstructor__ = g;
 function l() {
  g.call(this, h);
  this.$MNCommerceDialogStateStore0 = null;
  this.$MNCommerceDialogStateStore1 = null;
 }
 l.prototype.__onDispatch = function(m) {
  var n = m.type;
  switch (n) {
  case i.DIALOG.SHOW:
   this.$MNCommerceDialogStateStore0 = m.dialogContainer;
   this.$MNCommerceDialogStateStore1 = m.state;
   this.__emitChange();
   break;

  case i.DIALOG.HIDE:
   this.$MNCommerceDialogStateStore0 = null;
   this.$MNCommerceDialogStateStore1 = null;
   this.__emitChange();
   break;
  }
 };
 l.prototype.getDialogContainer = function() {
  return this.$MNCommerceDialogStateStore0;
 };
 l.prototype.getState = function() {
  return this.$MNCommerceDialogStateStore1;
 };
 e.exports = new l();
}, null);

__d("MNCommerceAddress.react", [ "React" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var h = g, i = h.PropTypes, j = g.createClass({
  displayName: "MNCommerceAddress",
  propTypes: {
   address: i.array
  },
  render: function() {
   var k = this.props.address.map(function(l, m) {
    return g.createElement("div", {
     key: "line" + m
    }, l);
   });
   return g.createElement("div", null, k);
  }
 });
 e.exports = j;
}, null);

__d("MNCommerceDetailSection.react", [ "React", "cx" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var i = g, j = i.PropTypes, k = g.createClass({
  displayName: "MNCommerceDetailSection",
  propTypes: {
   headerLabel: j.string.isRequired,
   margin: j.number
  },
  getDefaultProps: function() {
   return {
    margin: 0
   };
  },
  render: function() {
   return g.createElement("div", {
    className: this.props.className
   }, g.createElement("div", {
    className: "_5171",
    style: {
     marginBottom: this.props.margin
    }
   }, this.props.headerLabel), this.props.children);
  }
 });
 e.exports = k;
}, null);

__d("MNCommerceItemText.react", [ "React", "cx", "joinClasses" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var j = g, k = j.PropTypes, l = g.createClass({
  displayName: "MNCommerceItemText",
  propTypes: {
   description: k.string,
   title: k.string,
   width: k.number,
   size: k.oneOf([ "large", "small" ])
  },
  getDefaultProps: function() {
   return {
    size: "small"
   };
  },
  render: function() {
   var m = {
    width: this.props.width
   }, n = this.props, o = n.className, p = function(r, s) {
    var t = {}, u = Object.prototype.hasOwnProperty;
    if (r == null) throw new TypeError();
    for (var v in r) if (u.call(r, v) && !u.call(s, v)) t[v] = r[v];
    return t;
   }(n, {
    className: 1
   }), q = "_swr" + (p.size === "small" ? " " + "_sws" : "");
   return g.createElement("div", g.__spread({
    className: i(o, q)
   }, p), g.createElement("div", {
    className: "_51fw" + (p.size === "large" ? " " + "_swt" : ""),
    style: m
   }, this.props.title), g.createElement("div", {
    className: "_51fx",
    style: m
   }, this.props.description));
  }
 });
 e.exports = l;
}, null);

__d("MNCommerceSingleListItem.react", [ "Image.react", "MNCommerceItemText.react", "React", "cx", "merge" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var l = i, m = l.PropTypes, n = 6, o = i.createClass({
  displayName: "MNCommerceSingleListItem",
  propTypes: {
   description: m.string,
   thumbURL: m.string,
   imageDimension: m.number.isRequired
  },
  render: function() {
   var p = this.props.width - n - this.props.imageDimension, q = k(this.props, {
    width: p
   });
   return i.createElement("div", {
    className: this.props.className
   }, i.createElement("div", {
    className: "_1fld",
    style: {
     marginRight: n
    }
   }, this._renderImage()), i.createElement(h, i.__spread({
    className: "_1flf",
    style: {
     height: this.props.imageDimension
    },
    size: this.props.size
   }, q)));
  },
  _renderImage: function() {
   var p = this.props.imageDimension;
   if (this.props.thumbURL) {
    return i.createElement(g, {
     className: "_1fle",
     height: p,
     src: this.props.thumbURL,
     width: p
    });
   } else return i.createElement("div", {
    className: "_1prr",
    style: {
     height: p,
     width: p
    }
   });
  }
 });
 e.exports = o;
}, null);

__d("MNCommerceItemList.react", [ "List.react", "MNCommerceSingleListItem.react", "React", "cx", "fbt" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var l = i, m = l.PropTypes, n = 3, o = i.createClass({
  displayName: "MNCommerceItemList",
  propTypes: {
   items: m.array,
   imageDimension: m.number.isRequired,
   size: m.oneOf([ "small", "large" ]),
   width: m.number
  },
  render: function() {
   var p = this._getItems(), q = this.props.items.length;
   if (q > n) p.push(i.createElement("li", {
    key: "andMore",
    className: "_24ry"
   }, k._("And {Number of items not visible} more", [ k.param("Number of items not visible", q - n) ])));
   return i.createElement("div", null, i.createElement(g, {
    border: "none",
    spacing: "none"
   }, p));
  },
  _getItems: function() {
   var p = this.props, q = p.imageDimension, r = p.items, s = r.map(function(t) {
    return i.createElement("li", {
     key: t.id,
     className: "_24rx"
    }, i.createElement(h, i.__spread({
     imageDimension: q,
     size: this.props.size,
     width: this.props.width
    }, t)));
   }.bind(this)).slice(0, n);
   return s;
  }
 });
 e.exports = o;
}, null);

__d("MNCommerceLogoHeader.react", [ "Image.react", "React", "cx" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var j = h, k = j.PropTypes, l = h.createClass({
  displayName: "MNCommerceLogoHeader",
  propTypes: {
   logo: k.object,
   label: k.string
  },
  render: function() {
   var m = this._renderLogo();
   if (this.props.label) {
    return h.createElement("div", {
     className: "_56rt"
    }, h.createElement("div", {
     className: "_56ru"
    }, h.createElement("div", {
     className: "_56rv"
    }, this.props.label)), h.createElement("div", {
     className: "_56ru"
    }, m));
   } else return m;
  },
  _renderLogo: function() {
   var m = this.props.logo;
   if (!m) return null;
   return h.createElement(g, {
    className: "_56rs",
    height: m.height,
    src: m.src,
    width: m.width
   });
  }
 });
 e.exports = l;
}, null);

__d("MNCommerceOrderDetailsDialog.react", [ "Link.react", "MNCommerceAddress.react", "MNCommerceAttachmentConstants", "MNCommerceDetailSection.react", "MNCommerceItemList.react", "MNCommerceLogoHeader.react", "React", "XUIDialog.react", "XUIDialogBody.react", "XUIDialogTitle.react", "cx", "fbt", "mergeDeep" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var t = m, u = t.PropTypes, v = [ i.ORDER_DETAIL.SUB_TOTAL, i.ORDER_DETAIL.SHIPPING, i.ORDER_DETAIL.TAX, i.ORDER_DETAIL.TOTAL ], w = {};
 w[i.ORDER_DETAIL.SUB_TOTAL] = r._("Subtotal");
 w[i.ORDER_DETAIL.SHIPPING] = r._("Shipping");
 w[i.ORDER_DETAIL.TAX] = r._("Tax");
 w[i.ORDER_DETAIL.TOTAL] = r._("Total");
 var x = m.createClass({
  displayName: "MNCommerceOrderDetailsDialog",
  propTypes: {
   receipt: u.object
  },
  getDefaultProps: function() {
   return {
    shown: false
   };
  },
  getInitialState: function() {
   return this._calculateState(this.props);
  },
  componentWillReceiveProps: function(y) {
   this.setState(this._calculateState(y));
  },
  _calculateState: function(y) {
   var z = y.receipt;
   return {
    address: z.address ? [ z.address ] : [],
    changeURL: z.order_url,
    items: this._processItems(z.items),
    logo: z.partner_logo ? {
     height: z.partner_logo.height,
     width: z.partner_logo.width,
     src: z.partner_logo.url
    } : null,
    orderDate: z.order_time,
    orderNumber: z.receipt_id,
    orderStatus: z.status,
    payment: z.payment_method,
    shippingCost: z.shipping_cost,
    subTotal: z.subtotal,
    tax: z.total_tax,
    totalCost: z.total_cost
   };
  },
  render: function() {
   var y = this._renderCallToAction();
   return m.createElement(n, {
    className: "_1eio",
    onToggle: this.props.onToggle,
    shown: this.props.shown,
    width: i.DIALOG.WIDTH
   }, m.createElement(p, null, r._("Order Details")), m.createElement(o, {
    useCustomPadding: true
   }, m.createElement("div", {
    className: "_4vx2"
   }, this._renderLogo(), this._renderItems(), y, m.createElement("div", {
    className: "_2hsz" + (!y ? " " + "_2hs-" : "")
   }), m.createElement("div", null, m.createElement("div", null, m.createElement(j, {
    className: "_4vx4 _4vx5",
    headerLabel: r._("ORDERED ON")
   }, this.state.orderDate), this._renderStatus()), m.createElement(j, {
    className: "_4vx4",
    headerLabel: r._("SHIP TO")
   }, m.createElement(h, {
    address: this.state.address
   })), m.createElement(j, {
    className: "_4vx4",
    headerLabel: r._("PAYMENT")
   }, this.state.payment), m.createElement(j, {
    className: "_4vx4",
    headerLabel: r._("ORDER SUMMARY")
   }, this._renderOrderSummary())), m.createElement("div", {
    className: "_4vx6"
   }, r._("Order {order number}", [ r.param("order number", this.state.orderNumber) ])))));
  },
  _processItems: function(y) {
   var z = Object.keys(y).map(function(aa) {
    var ba = y[aa], ca = s({}, ba);
    ca.id = aa;
    ca.thumbURL = ba.thumb_url;
    return ca;
   });
   return z;
  },
  _renderLogo: function() {
   if (!this.state.logo) return null;
   return m.createElement("div", {
    className: "_4vx3"
   }, m.createElement(l, {
    logo: this.state.logo
   }));
  },
  _renderStatus: function() {
   if (!this.state.orderStatus || !this.state.orderStatus.length) return null;
   return m.createElement(j, {
    className: "_4vx4 _4vx5",
    headerLabel: r._("STATUS")
   }, this.state.orderStatus);
  },
  _renderItems: function() {
   var y = i.DIALOG.WIDTH - 2 * i.DIALOG.PADDING;
   return m.createElement(k, {
    imageDimension: i.XLARGE_IMAGE_DIMENSION,
    items: this.state.items,
    size: "large",
    width: y
   });
  },
  _renderCallToAction: function() {
   if (this.state.changeURL) return m.createElement("div", {
    className: "_4vx7"
   }, m.createElement(g, {
    className: "_4vx8",
    href: this.state.changeURL
   }, r._("Modify Order")));
   return null;
  },
  _renderOrderSummary: function() {
   var y = v.map(function(z) {
    var aa = this.state[z];
    return m.createElement("div", {
     className: z === "totalCost" ? "_4vx9" : "",
     key: z
    }, m.createElement("div", {
     className: "_4vx5"
    }, w[z]), m.createElement("div", {
     className: "_4vx5"
    }, aa || "--"));
   }.bind(this));
   return y;
  }
 });
 e.exports = x;
}, null);

__d("MNCommerceCacheTimeoutLimits", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var g = {
  SUCCESS_TIMEOUT: 10,
  ERROR_TIMEOUT: 1
 };
 e.exports = g;
}, null);

__d("MNCommerceReceiptActions", [ "MessengerDispatcher", "MNCommerceActionTypes" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var i = {
  receiptLoaded: function(j) {
   g.dispatch({
    type: h.RECEIPT.LOADED,
    receipt: j
   });
  },
  receiptLoadError: function(j) {
   g.dispatch({
    type: h.RECEIPT.LOAD_ERROR,
    receiptID: j
   });
  }
 };
 e.exports = i;
}, null);

__d("MNCommerceReceiptDataManager", [ "AsyncRequest", "MNCommerceReceiptActions", "XMNCommerceOrderDetailsController" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 function j() {}
 j.prototype.fetchReceipt = function(k) {
  var l = i.getURIBuilder().setString("receipt_id", k).getURI();
  new g().setURI(l).setHandler(this.$MNCommerceReceiptDataManager0).setErrorHandler(this.$MNCommerceReceiptDataManager1).send();
 };
 j.prototype.$MNCommerceReceiptDataManager0 = function(k) {
  h.receiptLoaded(k.payload);
 };
 j.prototype.$MNCommerceReceiptDataManager1 = function(k) {
  var l = k.getRequest().uri.getQueryData(), m = l.receipt_id;
  h.receiptLoadError(m);
 };
 e.exports = new j();
}, null);

__d("MNCommerceReceiptStore", [ "Cache", "FluxStore", "LoadObject", "MessengerDispatcher", "MNCommerceActionTypes", "MNCommerceCacheTimeoutLimits", "MNCommerceReceiptDataManager" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 for (var n in h) if (h.hasOwnProperty(n)) p[n] = h[n];
 var o = h === null ? null : h.prototype;
 p.prototype = Object.create(o);
 p.prototype.constructor = p;
 p.__superConstructor__ = h;
 function p() {
  h.call(this, j);
  this.$MNCommerceReceiptStore0 = new g();
 }
 p.prototype.__onDispatch = function(q) {
  var r = q.type;
  switch (r) {
  case k.RECEIPT.LOADED:
   var s = q.receipt;
   this.$MNCommerceReceiptStore0.set(s.receipt_id, i.done().setValue(s), null, l.SUCCESS_TIMEOUT);
   this.__emitChange();
   break;

  case k.RECEIPT.LOAD_ERROR:
   var t = q.receiptID;
   this.$MNCommerceReceiptStore0.set(t, i.done().setError(new Error("Unable to load receipt: " + t)), null, l.ERROR_TIMEOUT);
   this.__emitChange();
   break;
  }
 };
 p.prototype.getReceipt = function(q) {
  if (q && !this.$MNCommerceReceiptStore0.has(q)) {
   this.$MNCommerceReceiptStore0.set(q, i.loading().setValue({
    receiptID: q
   }));
   m.fetchReceipt(q);
  }
  return this.$MNCommerceReceiptStore0.get(q) || i.done();
 };
 e.exports = new p();
}, null);

__d("MNCommerceOrderDetailsDialogContainer.react", [ "MNCommerceDialogStateActions", "MNCommerceDialogStateStore", "MNCommerceOrderDetailsDialog.react", "MNCommerceReceiptStore", "PureStoreBasedStateMixin", "React" ], function(a, b, c, d, e, f, g, h, i, j, k, l) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var m = l.createClass({
  displayName: "MNCommerceOrderDetailsDialogContainer",
  mixins: [ k(j) ],
  statics: {
   calculateState: function() {
    var n = h.getState(), o = null;
    if (n) o = n.receiptID;
    var p = j.getReceipt(o);
    return {
     shown: !!n && !p.isLoading(),
     receipt: p.getValue()
    };
   }
  },
  render: function() {
   if (!this.state.receipt.receipt_id) return null;
   return l.createElement(i, {
    onToggle: this._onToggle,
    shown: this.state.shown,
    receipt: this.state.receipt
   });
  },
  _onToggle: function(n) {
   if (!n) g.hideDialog();
  }
 });
 e.exports = m;
}, null);

__d("MNCommerceFooterTypes", [ "keyMirror" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 var h = g({
  TOTAL: null,
  REFUND: null
 });
 e.exports = h;
}, null);

__d("MNCommerceTotalCostFooter.react", [ "LeftRight.react", "MNCommerceFooterTypes", "React", "cx", "fbt" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var l = i, m = l.PropTypes, n = i.createClass({
  displayName: "MNCommerceTotalCostFooter",
  propTypes: {
   type: m.oneOf(Object.keys(h)),
   totalCost: m.string
  },
  render: function() {
   var o, p;
   switch (this.props.type) {
   case h.TOTAL:
    o = k._("Total");
    p = "_28k2";
    break;

   case h.REFUND:
    o = k._("Refund");
    p = "_28k3";
    break;

   default:
    o = "";
    p = "";
    break;
   }
   return i.createElement(g, {
    className: p
   }, i.createElement("div", null, o), i.createElement("div", {
    className: "_28k4"
   }, this.props.totalCost));
  }
 });
 e.exports = n;
}, null);

__d("MNCommerceReceiptMercuryAttachment.react", [ "Image.react", "MNCommerceFooterTypes", "MNCommerceItemList.react", "MNCommerceAttachmentConstants", "MNCommerceLogoHeader.react", "MNCommerceItemText.react", "MNCommerceTotalCostFooter.react", "React", "cx" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var p = n, q = p.PropTypes, r = n.createClass({
  displayName: "MNCommerceReceiptMercuryAttachment",
  propTypes: {
   items: q.array.isRequired,
   logo: q.object,
   totalCost: q.string,
   width: q.number,
   onAttachmentClick: q.func
  },
  render: function() {
   var s = this.props.items.length > 1 ? "_abt" : "_abu", t = this.props.logo, u = t ? n.createElement("div", {
    className: s
   }, n.createElement(k, {
    logo: t
   })) : null;
   return n.createElement("div", {
    className: "_1xjh",
    onClick: this.props.onAttachmentClick
   }, this._renderSingleImage(), n.createElement("div", {
    style: {
     padding: j.BUBBLE_PADDING
    }
   }, u, n.createElement("div", {
    className: "_xmt"
   }, this._renderItemDescriptions()), n.createElement("div", {
    className: "_xmx"
   }, n.createElement(m, {
    totalCost: this.props.totalCost,
    type: h.TOTAL
   }))));
  },
  _renderSingleImage: function() {
   if (!this.props.items.length || this.props.items.length > 1) return null;
   var s = this.props.items[0];
   return n.createElement(g, {
    className: "_xm1",
    height: s.imageHeight,
    src: s.thumbURL,
    width: s.imageWidth
   });
  },
  _renderItemDescriptions: function() {
   if (!this.props.items.length) return null;
   var s = this.props.width - 2 * j.BUBBLE_PADDING, t = {
    size: "large",
    width: s
   };
   if (this.props.items.length === 1) {
    var u = this.props.items[0];
    return n.createElement(l, n.__spread({
     description: u.description,
     title: u.title
    }, t));
   }
   return n.createElement(i, n.__spread({
    items: this.props.items,
    imageDimension: j.LARGE_IMAGE_DIMENSION
   }, t));
  }
 });
 e.exports = r;
}, null);

__d("MNCommerceReceiptMercuryShareAttachment.react", [ "MercuryShareAttachmentReactShape", "MNCommerceDialogStateActions", "MNCommerceOrderDetailsDialogContainer.react", "MNCommerceReceiptMercuryAttachment.react", "React", "mergeDeep" ], function(a, b, c, d, e, f, g, h, i, j, k, l) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var m = k, n = m.PropTypes, o = k.createClass({
  displayName: "MNCommerceReceiptMercuryShareAttachment",
  propTypes: {
   attachment: g,
   maxWidth: n.number
  },
  render: function() {
   var p = this.props.attachment, q = [], r = p.target.items;
   Object.keys(r).forEach(function(t) {
    var u = r[t], v = l({}, u);
    v.id = t;
    v.thumbURL = u.thumb_url;
    q.push(v);
   });
   var s = {
    items: q,
    totalCost: p.target.total_cost,
    width: this.props.maxWidth,
    onAttachmentClick: this._onAttachmentClick
   };
   return k.createElement(j, k.__spread({}, s));
  },
  _onAttachmentClick: function() {
   h.showDialog(i, {
    receiptID: this.props.attachment.target.receipt_id
   });
  }
 });
 e.exports = o;
}, null);

__d("MNCommerceHeaderLabels", [ "fbt" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 var h = {
  CANCELED: {
   plural: g._("Canceled Items"),
   single: g._("Canceled Item")
  },
  RETURNED: {
   plural: g._("Returned Items"),
   single: g._("Returned Item")
  }
 };
 e.exports = h;
}, null);

__d("MNCommerceCancelReturnMercuryAttachment.react", [ "MNCommerceHeaderLabels", "MNCommerceItemList.react", "MNCommerceAttachmentConstants", "MNCommerceLogoHeader.react", "React", "StoryAttachmentStyle", "cx" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var n = k, o = n.PropTypes, p = "retail_return", q = k.createClass({
  displayName: "MNCommerceCancelReturnMercuryAttachment",
  propTypes: {
   items: o.array.isRequired,
   logo: o.object,
   type: o.string,
   width: o.number,
   onAttachmentClick: o.func
  },
  render: function() {
   var r = this._getHeaderLabelText();
   return k.createElement("div", {
    onClick: this.props.onAttachmentClick,
    className: "_l4o"
   }, k.createElement("div", {
    className: "_l4p"
   }, k.createElement(j, {
    label: r,
    logo: this.props.logo
   })), k.createElement("div", {
    className: "_l4q"
   }, this._renderItemDescriptions()));
  },
  _getHeaderLabelText: function() {
   var r;
   switch (this.props.type) {
   case l.RETAIL_CANCELLATION:
    r = g.CANCELED;
    break;

   case p:
    r = g.RETURNED;
    break;
   }
   var s;
   if (r) if (this.props.items.length === 1) {
    s = r.single;
   } else s = r.plural;
   return s;
  },
  _renderItemDescriptions: function() {
   if (!this.props.items.length) return null;
   var r = this.props.width - 2 * i.BUBBLE_PADDING;
   return k.createElement(h, {
    items: this.props.items,
    imageDimension: i.LARGE_IMAGE_DIMENSION,
    size: "large",
    width: r
   });
  }
 });
 e.exports = q;
}, null);

__d("MNCommerceCancelReturnMercuryShareAttachment.react", [ "MercuryShareAttachmentReactShape", "MNCommerceCancelReturnMercuryAttachment.react", "MNCommerceDialogStateActions", "MNCommerceOrderDetailsDialogContainer.react", "StoryAttachmentStyle", "React" ], function(a, b, c, d, e, f, g, h, i, j, k, l) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var m = l, n = m.PropTypes, o = l.createClass({
  displayName: "MNCommerceCancelReturnMercuryShareAttachment",
  propTypes: {
   attachment: g,
   maxWidth: n.number
  },
  render: function() {
   var p = this.props.attachment, q = [], r = p.target.items;
   Object.keys(r).forEach(function(t) {
    var u = r[t], v = Object.assign({}, u);
    v.id = t;
    v.thumbURL = u.thumb_url;
    q.push(v);
   });
   var s = {
    items: q,
    onAttachmentClick: this._onAttachmentClick,
    type: k.RETAIL_CANCELLATION,
    width: this.props.maxWidth
   };
   return l.createElement(h, l.__spread({}, s));
  },
  _onAttachmentClick: function() {
   i.showDialog(j, {
    receiptID: this.props.attachment.target.receipt_id
   });
  }
 });
 e.exports = o;
}, null);

__d("MNCommerceShippingMercuryAttachment.react", [ "MNCommerceItemList.react", "MNCommerceAttachmentConstants", "MNCommerceLogoHeader.react", "MNCommerceShipmentTrackingEventTypes", "React", "cx", "fbt" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var n = k, o = n.PropTypes, p = k.createClass({
  displayName: "MNCommerceShippingMercuryAttachment",
  propTypes: {
   carrierName: o.string,
   deliveryDate: o.string,
   deliveryPeriod: o.string,
   hasUnsupportedCarrier: o.bool,
   items: o.array.isRequired,
   logo: o.object,
   shippingDate: o.string,
   type: o.number,
   width: o.number
  },
  render: function() {
   var q = null;
   if (!this.props.hasUnsupportedCarrier && this.props.logo) q = k.createElement("div", {
    className: "_3lx4"
   }, k.createElement(i, {
    logo: this.props.logo
   }));
   var r = this.props.items.length > 1 ? m._("Item") : m._("Items");
   return k.createElement("div", {
    className: "_3lx3"
   }, q, k.createElement("div", {
    className: "_3lx5"
   }, this._renderShippingSection(), this._renderDeliveryOrCarrierSection(), k.createElement("p", {
    className: "_5ry9 _3lxb"
   }, r), this._renderItemDescriptions()));
  },
  _renderDeliveryOrCarrierSection: function() {
   var q, r;
   if (this.props.hasUnsupportedCarrier) {
    q = m._("Carrier");
    r = k.createElement("p", {
     className: "_5rya"
    }, this.props.carrierName);
   } else if (!this.props.deliveryDate) {
    return null;
   } else {
    q = this._getDeliveryLabel();
    var s = this.props.type === j.DELAYED ? k.createElement("span", null, k.createElement("span", {
     className: "_5ryb"
    }, m._("Delayed")), " ", " · ", " ") : "", t = this.props.deliveryDate;
    if (this.props.deliveryPeriod) t += ", " + this.props.deliveryPeriod;
    r = k.createElement("p", {
     className: "_5rya"
    }, s, t);
   }
   return k.createElement("div", {
    className: "_3lx6"
   }, k.createElement("p", {
    className: "_5ry9"
   }, q), r);
  },
  _getDeliveryLabel: function() {
   switch (this.props.type) {
   case j.OUT_FOR_DELIVERY:
    return m._("Out for delivery on");

   case j.DELIVERED:
    return m._("Delivered on");

   default:
    return m._("Delivery on");
   }
  },
  _renderShippingSection: function() {
   if (!this.props.type) return k.createElement("div", {
    className: "_3lx6"
   }, k.createElement("p", {
    className: "_5ry9"
   }, m._("Shipped On")), k.createElement("p", {
    className: "_5rya"
   }, this.props.shippingDate));
   return null;
  },
  _renderItemDescriptions: function() {
   if (!this.props.items.length) return null;
   var q = this.props.width - 2 * h.BUBBLE_PADDING;
   return k.createElement(g, {
    items: this.props.items,
    imageDimension: h.SMALL_IMAGE_DIMENSION,
    size: "small",
    width: q
   });
  }
 });
 e.exports = p;
}, null);

__d("MNCommerceShippingMercuryShareAttachment.react", [ "MercuryShareAttachmentReactShape", "MNCommerceShippingMercuryAttachment.react", "ReactComponentWithPureRenderMixin", "React", "formatDate" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var l = j, m = l.PropTypes, n = j.createClass({
  displayName: "MNCommerceShippingMercuryShareAttachment",
  mixins: [ i ],
  propTypes: {
   attachment: g,
   maxWidth: m.number
  },
  render: function() {
   var o = this.props.attachment, p = [], q = o.target.items;
   Object.keys(q).forEach(function(w) {
    var x = q[w], y = Object.assign({}, x);
    y.id = w;
    y.thumbURL = x.thumb_url;
    p.push(y);
   });
   var r = o.target, s = r.ship_date ? k(r.ship_date, "D M d") + ", " + k(r.ship_date, "g:ia") : null, t = r.estimated_delivery_time || r.timestamp, u = t ? k(t, "D M d") : null, v = {
    carrierName: r.carrier,
    deliveryDate: u,
    items: p,
    width: this.props.maxWidth,
    type: r.tracking_event_type,
    shippingDate: s
   };
   return j.createElement(h, j.__spread({}, v));
  }
 });
 e.exports = n;
}, null);

__d("MessengerFileAttachment.react", [ "Link.react", "ReactComponentWithPureRenderMixin", "React", "cx" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var k = i, l = k.PropTypes, m = i.createClass({
  displayName: "MessengerFileAttachment",
  mixins: [ h ],
  propTypes: {
   attachment: l.object.isRequired
  },
  render: function() {
   return i.createElement(g, {
    className: "_4pcn _2uf4",
    href: this.props.attachment.url
   }, i.createElement("div", {
    className: "_2uf5"
   }), this.props.attachment.name);
  }
 });
 e.exports = m;
}, null);

__d("MessengerStickerActions", [ "MessengerDispatcher", "keyMirror" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var i = h({
  REPLACE_STICKER_STATE: null
 }), j = {
  Types: i,
  handleStickerClick: function(k, l) {
   g.dispatch({
    packID: k,
    stickerID: l,
    type: j.Types.REPLACE_STICKER_STATE
   });
  },
  showStickerTray: function() {
   g.dispatch({
    showTray: true,
    type: j.Types.REPLACE_STICKER_STATE
   });
  },
  hideStickerTray: function() {
   g.dispatch({
    showTray: false,
    type: j.Types.REPLACE_STICKER_STATE
   });
  }
 };
 e.exports = j;
}, null);

__d("MessengerHotLikePreviewEvents", [ "mixInEventEmitter" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var h = {
  START: "start",
  STOP: "stop",
  POP: "pop"
 };
 g(h, {
  start: true,
  stop: true,
  pop: true
 });
 e.exports = h;
}, null);

__d("MessengerHotLikeUtils", [ "StickerAssetType", "StickerConstants", "XStickerAssetController" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var j = {
  SizeTimes: {
   small: 500,
   medium: 1200,
   large: 3e3
  },
  getStickerIDForTime: function(k) {
   var l = null;
   switch (true) {
   case k < this.SizeTimes.small:
    l = h.HOT_LIKE_SMALL_STICKER_ID;
    break;

   case k < this.SizeTimes.medium:
    l = h.HOT_LIKE_MEDIUM_STICKER_ID;
    break;

   case k < this.SizeTimes.large:
    l = h.HOT_LIKE_LARGE_STICKER_ID;
    break;
   }
   return l;
  },
  getGrowCoefficientForSince: function(k) {
   return Math.min(1, (Date.now() - k) / this.SizeTimes.large);
  },
  getMetadataForHotLike: function(k) {
   var l;
   switch (k) {
   case h.HOT_LIKE_LARGE_STICKER_ID:
    l = 120;
    break;

   case h.HOT_LIKE_MEDIUM_STICKER_ID:
    l = 84;
    break;

   case h.HOT_LIKE_SMALL_STICKER_ID:
    l = 35;
    break;
   }
   return l ? {
    height: l,
    width: l
   } : void 0;
  },
  getPreviewURI: function() {
   return i.getURIBuilder().setInt("sticker_id", h.HOT_LIKE_LARGE_STICKER_ID).setEnum("image_type", g.IMAGE).getURI().toString();
  }
 };
 e.exports = j;
}, null);

__d("MessengerHotLikePreview.react", [ "MessengerHotLikePreviewEvents", "MessengerHotLikeUtils", "React", "cx" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var k = i, l = k.PropTypes, m = 3, n = i.createClass({
  displayName: "MessengerHotLikePreview",
  propTypes: {
   since: l.number
  },
  getInitialState: function() {
   return {
    snapped: false
   };
  },
  componentDidMount: function() {
   g.addListener(g.STOP, this._snap);
  },
  getStyle: function() {
   var o = h.getPreviewURI();
   return Object.assign({
    backgroundImage: "url(" + o + ")",
    backgroundSize: "contain"
   }, this._getSize());
  },
  render: function() {
   return i.createElement("div", {
    className: "_3w5x" + (this.state.snapped ? " " + "_3w5y" : ""),
    style: this.state.snapped ? Object.assign({}, this._getSize()) : null
   }, i.createElement("div", i.__spread({
    className: "_3w5-"
   }, this.props, {
    style: Object.assign({}, this.props.style || {}, this.getStyle())
   })));
  },
  _getSize: function() {
   var o = this._getGrowth();
   return this.state.snapped ? h.getMetadataForHotLike(this.state.snapped) : {
    height: o,
    width: o
   };
  },
  _getGrowth: function() {
   var o = h.getGrowCoefficientForSince(this.props.since);
   return 35 * Math.max(1, o * m);
  },
  _snap: function() {
   if (this.state.snapped) return;
   var o = Date.now() - this.props.since, p = h.getStickerIDForTime(o);
   if (p) this.setState({
    snapped: p
   });
  }
 });
 e.exports = n;
}, null);

__d("MessengerPhoto.react", [ "MercuryAttachmentType", "ReactComponentWithPureRenderMixin", "React", "Image.react", "URI", "cx", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var n = i, o = n.PropTypes, p = 206, q = 450;
 function r(u) {
  if (u.metadata) {
   if (u.attach_type === g.VIDEO) return u.metadata.inbox_preview;
   return k("/ajax/mercury/attachments/photo.php").addQueryData({
    fbid: u.metadata.fbid,
    height: p,
    mode: "cover",
    request_user_id: u.metadata.pageid,
    width: p
   }).toString();
  }
  return null;
 }
 function s(u) {
  var v = r(u);
  if (v) return Object.assign({
   src: v
  }, u.metadata.inbox_size);
  if (u.preview_url) return {
   height: u.preview_height,
   src: u.preview_url,
   width: u.preview_width
  };
  if (u.preview_uploading) return {
   height: p,
   src: null,
   width: p
  };
 }
 var t = i.createClass({
  displayName: "MessengerPhoto",
  mixins: [ h ],
  propTypes: {
   attachment: o.object.isRequired,
   isSingle: o.bool,
   onClick: o.func
  },
  render: function() {
   var u = s(this.props.attachment);
   if (!u) return;
   var v = this._getImageFromMetadata(u), w = {};
   if (u.src) w.backgroundImage = "url(" + u.src + ")";
   return i.createElement("div", {
    className: m(this.props.className, "_4tsk" + (this.props.isSingle ? " " + "_52mr" : "") + (!u.src ? " " + "_3etv" : "")),
    style: w,
    onClick: this._onClick
   }, v, i.createElement("a", {
    className: "_4tsl"
   }, this.props.children));
  },
  _onClick: function(u) {
   if (this.props.onClick) this.props.onClick(this.props.attachment);
  },
  _getImageFromMetadata: function(u) {
   if (this.props.attachment.preview_uploading) return null;
   if (this.props.isSingle) return i.createElement(j, {
    src: u.src
   });
   return null;
  }
 });
 Object.assign(t, {
  PREVIEW_THUMBNAIL_SIZE: p,
  MAX_PHOTO_SIZE: q
 });
 e.exports = t;
}, null);

__d("MessengerVideo.react", [ "Image.react", "MessengerPhoto.react", "ReactComponentWithPureRenderMixin", "React", "cx", "ix", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var n = j, o = n.PropTypes, p = j.createClass({
  displayName: "MessengerVideo",
  mixins: [ i ],
  propTypes: {
   attachment: o.object.isRequired,
   onClick: o.func
  },
  render: function() {
   return j.createElement(h, j.__spread({}, this.props, {
    className: m(this.props.className, "_ccq")
   }), j.createElement(g, {
    className: "_ccr",
    src: l("/images/chat/chat_play_icon.png")
   }), j.createElement("span", {
    className: "_ccs"
   }, this._formatDuration(this.props.attachment.metadata.duration)));
  },
  _formatDuration: function(q) {
   var r = q % 60;
   return Math.floor(q / 60) + ":" + (r < 10 ? "0" : "") + r;
  }
 });
 e.exports = p;
}, null);

__d("MessengerPhotosGroup.react", [ "MercuryAttachmentType", "MessengerPhoto.react", "MessengerVideo.react", "MessagesViewer", "MessagingVideoViewer.react", "ReactComponentWithPureRenderMixin", "React", "Vector", "cx", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var q = "empty-spacer", r = m.createClass({
  displayName: "MessengerPhotosGroup",
  mixins: [ l ],
  render: function() {
   var s = this.props.attachments, t = s.length === 1 ? {
    minHeight: s[0].preview_uploading ? h.PREVIEW_THUMBNAIL_SIZE : Math.min(s[0].preview_height * Math.min(1, h.MAX_PHOTO_SIZE / s[0].preview_width), h.MAX_PHOTO_SIZE)
   } : {};
   return m.createElement("div", {
    className: this._getRootClassNameFor(s),
    style: t
   }, this._rowsFor(s));
  },
  _onChildClicked: function(s) {
   if (s.preview_uploading) return false;
   if (s.attach_type === g.VIDEO) {
    j.render(m.createElement(k, {
     disableForward: true,
     rootClassName: "_1j1h",
     videoID: s.metadata.fbid,
     videoSize: new n(s.metadata.dimensions.width, s.metadata.dimensions.height),
     videoURI: s.url
    }));
   } else if (s.attach_type === g.PHOTO || s.attach_type === g.ANIMATED_IMAGE) j.bootstrapWithConfig({
    dimensions: s.metadata.dimensions,
    disablePaging: this.props.attachments.length === 1,
    disableForward: true,
    endpoint: s.url,
    fbid: s.metadata.fbid,
    rootClassName: "_1j1h",
    snapToPhoto: true,
    src: s.preview_url
   });
  },
  _rowsFor: function(s) {
   if (s.length === 1) return [ this._photo(s[0], true) ];
   var t = 3;
   if (s.length === 2 || s.length === 4) t = 2;
   var u = [];
   for (var v = 0, w = s.length; v < w; v += t) {
    var x = s.slice(v, v + t), y = t - x.length;
    while (y > 0) {
     x.push({
      attach_type: q,
      key: "ghost" + y
     });
     y--;
    }
    u.push(m.createElement("div", {
     className: "_2n8g",
     key: v
    }, x.map(function(z) {
     return this._photo(z);
    }.bind(this))));
   }
   return u;
  },
  _photo: function(s, t) {
   var u = {
    attachment: s,
    isSingle: t,
    onClick: this._onChildClicked,
    key: s.metadata ? s.metadata.fbid : s.upload_id
   };
   switch (s.attach_type) {
   case g.PHOTO:
   case g.ANIMATED_IMAGE:
    return m.createElement(h, m.__spread({}, u));

   case g.VIDEO:
    return m.createElement(i, m.__spread({}, u));

   case q:
    return m.createElement("div", {
     key: s.key,
     className: "_4tsk _4rf-"
    });

   default:
    throw s.attach_type + " is not handled by MessengerPhotoGroup";
   }
  },
  _getRootClassNameFor: function(s) {
   var t = s.length === 2 || s.length === 4;
   return p(this.props.className, "_2n8h" + (s.length === 1 ? " " + "_2n8i" : "") + (t ? " " + "_4ksk" : "") + (s.length > 1 && !t ? " " + "_2n8k" : ""));
  }
 });
 e.exports = r;
}, null);

__d("MessengerStickerUtils", [ "MercuryAttachmentType" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 function h(k) {
  return !!(k && k.attach_type === g.STICKER);
 }
 function i(k) {
  var l = k.attachments;
  return !!(k.is_like_preview || k.sticker_id || l && l.length === 1 && h(l[0]));
 }
 function j(k) {
  return k.size === 1 && i(k.first());
 }
 e.exports = {
  isStickerMessageGroup: j,
  isStickerMessage: i,
  isStickerAttachment: h
 };
}, null);

__d("MessengerAttachmentRenderer", [ "MercuryAttachment", "MercuryAttachmentType", "MercuryAttachmentAudioClip.react", "MercuryShareAttachment.react", "MercuryShareAttachmentRenderLocations", "MessengerFileAttachment.react", "MessengerStickerActions", "MessengerHotLikePreview.react", "MessengerHotLikeUtils", "MessengerPhotosGroup.react", "MessengerStickerUtils", "React", "Set", "Sticker.react", "StickerAssetType", "StickerConstants", "StickerImages", "StickerUtils", "StoryAttachmentStyle", "XStickerAssetController", "cx", "isRetina" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var ca = new s([ h.ANIMATED_IMAGE, h.PHOTO, h.VIDEO ]), da = function(fa) {
  return fa === Object(fa);
 }, ea = {
  getAttachmentsInsideBubble: function(fa) {
   var ga = g.get(fa).filter(da).filter(function(ha) {
    return !this.attachmentShouldAppearOutsideBubble(ha);
   }.bind(this));
   return this._getAttachmentComponents(ga, fa);
  },
  getAttachmentsOutsideBubble: function(fa) {
   var ga = g.get(fa).filter(da).filter(function(ha) {
    return this.attachmentShouldAppearOutsideBubble(ha);
   }.bind(this));
   return this._getAttachmentComponents(ga, fa);
  },
  _getAttachmentComponents: function(fa, ga) {
   var ha = this._getPhotosGroup(fa.filter(this.isPhotoAttachment), ga), ia = fa.filter(function(ja) {
    return !this.isPhotoAttachment(ja);
   }.bind(this)).map(function(ja) {
    return this._getAttachmentComponent(ja, ga);
   }.bind(this), this);
   if (ha) ia.push(ha);
   return ia;
  },
  _getAttachmentComponent: function(fa, ga) {
   if (q.isStickerAttachment(fa)) return this._getStickerComponent(fa, ga);
   if (this.isVoiceClip(fa)) return this._getVoiceClip(fa, ga);
   if (this.isFileAttchment(fa)) return this._getFileComponent(fa, ga);
   if (this.isP2PAttachment(fa) || this.isShareAttachment(fa)) return this._getShareAttachment(fa, ga);
  },
  _getStickerComponent: function(fa, ga) {
   if (ga.is_like_preview) return r.createElement(n, {
    key: "hlp:" + ga.like_preview_since,
    since: ga.like_preview_since
   });
   var ha = fa.metadata;
   if (!ha) {
    ha = o.getMetadataForHotLike(ga.sticker_id);
    if (!ha) {
     var ia = w.getSticker(ga.sticker_id);
     ha = Object.assign({}, ia);
     var ja = x.getScaledDimensions(ia.height, ia.width, v.THREAD_SIZE), ka = ja.height, la = ja.width;
     ha.height = ka;
     ha.width = la;
    }
    ha.stickerID = ga.sticker_id;
   }
   var ma = z.getURIBuilder().setInt("sticker_id", ha.stickerID), na = null, oa = null;
   if (ba()) {
    na = ha.paddedSpriteURI2x;
    oa = ha.spriteURI2x;
   } else {
    na = ha.paddedSpriteURI;
    oa = ha.spriteURI;
   }
   return r.createElement(t, {
    className: "_2poz _ui9",
    animationTrigger: "hover",
    frameCount: ha.frameCount || 1,
    frameRate: ha.frameRate || v.DEFAULT_FRAME_RATE,
    framesPerCol: ha.framesPerCol || 1,
    framesPerRow: ha.framesPerRow || 1,
    key: "sticker:" + ga.message_id,
    onStickerClick: m.handleStickerClick,
    packID: ha.packID && ha.packID.toString(),
    paddedSpriteURI: na,
    sourceHeight: ha.height,
    sourceURI: ma.setEnum("image_type", u.IMAGE).getURI().toString(),
    sourceWidth: ha.width,
    spriteURI: oa,
    stickerID: ha.stickerID.toString()
   });
  },
  _getShareAttachment: function(fa, ga) {
   return r.createElement(j, {
    attachment: fa.share,
    location: k.MESSENGER,
    key: "share:" + ga.message_id,
    rootClassName: "_haj _2poz _52mr _ui9"
   });
  },
  _getVoiceClip: function(fa, ga) {
   var ha = fa.metadata.duration / 1e3, ia = 200;
   return r.createElement(i, {
    src: fa.url,
    duration: ha,
    key: "audio:" + ga.message_id,
    showHelp: false,
    width: ia,
    location: k.MESSENGER,
    rootClassName: "_3czg _2poz _52mr"
   });
  },
  _getPhotosGroup: function(fa, ga) {
   return fa.length ? r.createElement(p, {
    attachments: fa,
    className: "_2poz _52mr _ui9",
    key: "photos:" + ga.message_id,
    message: ga
   }) : null;
  },
  _getFileComponent: function(fa, ga) {
   return r.createElement(l, {
    attachment: fa,
    className: "_2poz",
    key: "file:" + fa.url
   });
  },
  attachmentShouldAppearOutsideBubble: function(fa) {
   return q.isStickerAttachment(fa) || this.isPhotoAttachment(fa) || this.isShareAttachment(fa);
  },
  isPhotoAttachment: function(fa) {
   return ca.has(fa.attach_type);
  },
  isFileAttchment: function(fa) {
   return fa.attach_type === h.FILE;
  },
  isShareAttachment: function(fa) {
   return !!(this._isStoryBased(fa) && !this.isP2PAttachment(fa) && (fa.share.style_list.indexOf(y.SHARE) > -1 || fa.share.style_list.indexOf(y.FALLBACK) > -1));
  },
  isP2PAttachment: function(fa) {
   return !!(this._isStoryBased(fa) && fa.share.style_list.indexOf(y.ORION) > -1);
  },
  _isStoryBased: function(fa) {
   return !!(fa.attach_type === h.SHARE && fa.share && fa.share.style_list);
  },
  isVoiceClip: function(fa) {
   return !!fa.metadata && g.isVoiceMessage(fa.metadata.type);
  },
  isVoiceClipAttachment: function(fa) {
   var ga = g.get(fa).filter(da).filter(function(ha) {
    return this.isVoiceClip(ha);
   }.bind(this));
   return !!ga.length;
  },
  isLinkShareAttachment: function(fa) {
   var ga = g.get(fa).filter(da).filter(function(ha) {
    return this.isP2PAttachment(ha);
   }.bind(this));
   return !!ga.length;
  }
 };
 e.exports = ea;
}, null);

__d("MessengerDesktopNotificationPermissions", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 var g = {
  DEFAULT: "default",
  DENIED: "denied",
  GRANTED: "granted"
 };
 e.exports = g;
}, null);

__d("MessengerDesktopNotifications", [ "Map", "MessengerDesktopNotificationPermissions", "Run", "UserAgent" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 var k = [ h.GRANTED, h.DEFAULT, h.DENIED ], l = 5e3, m = new g();
 function n() {
  m.forEach(function(p, q, r) {
   p.close && p.close();
  });
 }
 var o = {
  isSupported: function() {
   return !!window.Notification || !!window.webkitNotifications;
  },
  checkPermission: function() {
   if (window.Notification) {
    return window.Notification.permission;
   } else if (window.webkitNotifications) return k[window.webkitNotifications.checkPermission()];
  },
  hasDefaultSound: function() {
   return j.isBrowser("FireFox") && j.isPlatform("Mac OS X");
  },
  isDenied: function() {
   return this.checkPermission() === h.DENIED;
  },
  requestPermission: function(p) {
   if (window.Notification) {
    window.Notification.requestPermission(p);
   } else if (window.webkitNotifications) window.webkitNotifications.requestPermission(p);
  },
  showNotification: function(p) {
   if (this.checkPermission() === h.GRANTED) {
    var q;
    if (window.Notification) {
     q = new window.Notification(p.title, {
      body: p.body,
      icon: p.icon,
      tag: p.tag
     });
    } else if (window.webkitNotifications) {
     var r = window.webkitNotifications;
     q = r.createNotification(p.icon, p.title, p.body);
     q.show();
    }
    m.set(p.tag, q);
    q.onclick = p.onClick;
    q.onclose = function() {
     m["delete"](p.tag);
    };
    this._closeTimer = setTimeout(function() {
     q.close();
    }, p.closeTime || l);
   }
  }
 };
 i.onUnload(n);
 e.exports = o;
}, null);

__d("MessengerSettingsActions", [ "AsyncRequest", "MessengerDispatcher", "MessengerDesktopNotifications", "MessengerDesktopNotificationPermissions", "XMessengerDotComSettingsEditController", "keyMirror" ], function(a, b, c, d, e, f, g, h, i, j, k, l) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var m = l({
  CHANGE_SETTINGS: null,
  CHANGE_DESKTOP_NOTIFS: null
 }), n = {
  Types: m,
  changeSettings: function(o) {
   new g().setData({
    settings: o
   }).setURI(k.getURIBuilder().getURI()).send();
   h.dispatch({
    type: m.CHANGE_SETTINGS,
    newSettings: o
   });
  },
  changeDesktopNotifs: function(o, p) {
   if (o) {
    i.requestPermission(function(q) {
     if (q !== j.GRANTED) {
      if (i.checkPermission() === j.DENIED) p();
      return;
     }
     h.dispatch({
      type: m.CHANGE_DESKTOP_NOTIFS,
      desktopNotifsEnabled: o
     });
    });
   } else h.dispatch({
    type: m.CHANGE_DESKTOP_NOTIFS,
    desktopNotifsEnabled: o
   });
  }
 };
 e.exports = n;
}, null);

__d("MessengerStore", [ "MessengerDispatcher", "mixInEventEmitter" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 function i() {
  this.$MessengerStore0 = g.register(this.__onDispatch.bind(this));
 }
 i.prototype.getDispatchToken = function() {
  return this.$MessengerStore0;
 };
 i.prototype.emitChange = function() {
  this.emit("change");
 };
 i.prototype.destroy = function() {
  g.unregister(this.$MessengerStore0);
 };
 h(i, {
  change: true
 });
 e.exports = i;
}, null);

__d("MessengerSettingsStore", [ "CacheStorage", "MessengerSettingsActions", "MessengerStore", "MessengerDotComSettingsInitialData" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 var k = new g("localstorage"), l = "desktopNotifsEnabled";
 for (var m in i) if (i.hasOwnProperty(m)) o[m] = i[m];
 var n = i === null ? null : i.prototype;
 o.prototype = Object.create(n);
 o.prototype.constructor = o;
 o.__superConstructor__ = i;
 function o() {
  "use strict";
  i.call(this);
  this.$MessengerSettingsStore0 = {};
  Object.assign(this.$MessengerSettingsStore0, j);
  this.$MessengerSettingsStore0.desktopNotifsEnabled = this.$MessengerSettingsStore1();
 }
 o.prototype.getSettings = function() {
  "use strict";
  return this.$MessengerSettingsStore0;
 };
 o.prototype.$MessengerSettingsStore1 = function() {
  "use strict";
  return k.get(l, false);
 };
 o.prototype.$MessengerSettingsStore2 = function(p) {
  "use strict";
  return k.set(l, p);
 };
 o.prototype.__onDispatch = function(p) {
  "use strict";
  switch (p.type) {
  case h.Types.CHANGE_SETTINGS:
   Object.assign(this.$MessengerSettingsStore0, p.newSettings);
   this.emitChange();
   break;

  case h.Types.CHANGE_DESKTOP_NOTIFS:
   this.$MessengerSettingsStore0.desktopNotifsEnabled = p.desktopNotifsEnabled;
   this.$MessengerSettingsStore2(p.desktopNotifsEnabled);
   this.emitChange();
   break;
  }
 };
 e.exports = new o();
}, null);

__d("MessengerStateStore", [ "MessengerActions", "MessengerStore" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 for (var i in h) if (h.hasOwnProperty(i)) k[i] = h[i];
 var j = h === null ? null : h.prototype;
 k.prototype = Object.create(j);
 k.prototype.constructor = k;
 k.__superConstructor__ = h;
 function k() {
  h.call(this);
  this.$MessengerStateStore0 = {};
  this.$MessengerStateStore1 = {};
 }
 k.prototype.getState = function() {
  return this.$MessengerStateStore0;
 };
 k.prototype.getPrevState = function() {
  return this.$MessengerStateStore1;
 };
 k.prototype.__onDispatch = function(l) {
  switch (l.type) {
  case g.Types.REPLACE_STATE:
   this.$MessengerStateStore1 = this.$MessengerStateStore0;
   this.$MessengerStateStore0 = Object.assign({
    activeThreadID: null,
    detailView: null,
    masterView: null,
    serverThreadID: null,
    infoPanelVisibility: this.$MessengerStateStore1.infoPanelVisibility
   }, l.nextState);
   this.emitChange();
   break;

  case g.Types.REPLACE_INFO_PANEL_VISIBILITY:
   this.$MessengerStateStore1 = this.$MessengerStateStore0;
   this.$MessengerStateStore0 = Object.assign({}, this.$MessengerStateStore0, l.nextState);
   this.emitChange();
   break;
  }
 };
 e.exports = new k();
}, null);

__d("MessengerBrowserAlerts", [ "DocumentTitle", "Event", "ImageSourceRequest", "ImageSourceType", "Map", "MercuryAttachmentSnippetRenderer", "MercuryIDs", "MercuryParticipants", "MercuryThreadInfo", "MercuryThreadInformer", "MercuryThreads", "MercuryUnseenState", "MessagingTag", "MessengerActions", "MessengerConfig", "MessengerDesktopNotifications", "MessengerSettingsStore", "MessengerStateStore", "MercuryNotificationRenderer", "PhotoResizeModeConst", "Sound", "UserActivity", "fbt" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba, ca) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var da = 1e3, ea = 80, fa = null;
 aa.init([ "audio/ogg", "audio/mpeg" ]);
 function ga(ja) {
  if (w.getSettings().sound_enabled) aa.play([ u["sound.notif_ogg_url"], u["sound.notif_mp3_url"] ], ja, false);
 }
 function ha(ja, ka, la) {
  n.get(ja.snippet_sender, function(ma) {
   var na = ja.snippet;
   if (!na && ja.snippet_has_attachment) na = l.renderAttachmentSnippetText(l.getAttachmentSnippetType(ja.snippet_attachments), false, ma.short_name, ja.snippet_attachments);
   var oa = ma.name;
   if (!ja.is_canonical) oa = ja.name ? ca._("{sender's name} to {group name}", [ ca.param("sender's name", ma.short_name), ca.param("group name", ja.name) ]) : ca._("{sender's name} to your group", [ ca.param("sender's name", ma.short_name) ]);
   v.showNotification({
    title: oa,
    body: na,
    icon: ja.image_src || ka || ma.big_image_src || ma.image_src,
    closeTime: null,
    onClick: function() {
     window.focus();
     t.selectThread(ja.thread_id);
    },
    tag: la.message_id
   });
   if (!v.hasDefaultSound()) ga(la.timestamp);
  });
 }
 var ia = {
  init: function(ja) {
   this._viewer = ja;
   this._threadInformer = p.getForFBID(this._viewer);
   this._threads = q.getForFBID(this._viewer);
   this._unseenState = r.getForFBID(this._viewer);
   this._highResImageMap = new k();
   this._threadInformer.subscribe("messages-received", function(ka, la) {
    for (var ma in la) la[ma].forEach(function(na) {
     this.handleMessageReceived(na);
    }.bind(this));
   }.bind(this));
   this._threadInformer.subscribe("unseen-updated", this._handleUnseenUpdated.bind(this));
  },
  handleMessageReceived: function(ja) {
   if (ja.author === this._viewer || !ja.is_unread || ja.thread_id === x.getState().activeThreadID && ba.isActiveOnTab(da) || ja.folder != s.INBOX && ja.folder != s.ARCHIVED) return;
   this._threads.getThreadMeta(ja.thread_id, function(ka) {
    if (o.isMuted(ka)) return;
    if (w.getSettings().desktopNotifsEnabled && !ba.isOnTab() && u.EnableDesktopNotifs) {
     this._attemptDesktopNotification(ka, ja);
    } else ga(ja.timestamp);
    if (!ba.isOnTab() && this._unseenState.getUnseenCount() > 0) y.renderDocumentTitle(ja.thread_id, function(la) {
     if (!fa) fa = g.blink(la);
    });
   }.bind(this));
  },
  _handleUnseenUpdated: function() {
   var ja = this._unseenState.getUnseenCount();
   if (ba.isActiveOnTab(da) && ja > 0) {
    this._unseenState.markAsSeen();
    return;
   }
   var ka = g.get(), la = ja ? "(" + ja + ") " + ka : ka;
   g.set(la, true);
   if (fa && ja === 0) {
    fa.stop();
    fa = null;
   }
   if (!this._focusToken && ja > 0) this._focusToken = h.listen(window, "focus", function() {
    this._focusToken && this._focusToken.remove();
    this._focusToken = null;
    this._unseenState.markAsSeen();
   }.bind(this));
  },
  _attemptDesktopNotification: function(ja, ka) {
   if (!this._highResImageMap.has(ja.snippet_sender)) {
    var la = function(ma, na) {
     this._highResImageMap.set(ja.snippet_sender, na.uri);
     ha(ja, na.uri, ka);
    }.bind(this);
    new i().setFBID(m.getUserIDFromParticipantID(ja.snippet_sender)).setType(j.PROFILE_PICTURE).setDimensions(ea, ea).setResizeMode(z.COVER).setCallback(la.bind(null, ja.snippet_sender)).send();
   } else ha(ja, this._highResImageMap.get(ja.snippet_sender), ka);
  }
 };
 e.exports = ia;
}, null);

__d("MessengerContactActions", [ "keyMirror" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 e.exports = g({
  MESSAGE: null,
  PROFILE: null,
  REMOVE: null,
  SELECT: null
 });
}, null);

__d("MessengerContactAdapters", [ "immutable", "ImmutableObject", "MercuryTypeaheadConstants" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 var j = {
  fromSearchableEntry: function(k) {
   var l = k.getType(), m = {
    uid: k.getUniqueID(),
    photo: k.getPhoto(),
    title: k.getTitle(),
    subtitle: l === i.THREAD_TYPE ? k.getSubtitle() : "",
    type: l,
    isMessengerUser: null
   }, n = k.getAuxiliaryData();
   if (n) if (l === i.THREAD_TYPE) {
    m.thread = new h(n.thread);
    m.participants = g.Map().withMutations(function(o) {
     n.participantsToRender.forEach(function(p) {
      o.set(p.id, p);
     });
    });
   } else m.isMessengerUser = n.isMessengerUser;
   return new h(m);
  },
  fromMercuryParticipant: function(k) {
   return new h({
    uid: k.id,
    photo: k.image_src,
    title: k.name,
    subtitle: "",
    type: k.type,
    isMessengerUser: k.is_messenger_user
   });
  }
 };
 e.exports = j;
}, null);

__d("MessengerEditorStateManager", [ "CacheStorage", "ComposedEntityMutability", "DocumentEntityInstance", "EditorState", "SelectionState", "createContentStateFromBlocks", "createEmptyEditorState", "createInitialEditorState", "decodeBlocks", "encodeBlocks", "mapObject" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var r = new g("localstorage"), s = {
  get: function(t) {
   if (!t) return this._getEmptyEditorState();
   var u = r.get(t, false);
   if (!u) return this._getEmptyEditorState();
   var v = u.encodedBlocks, w = q(v.entityMap, function(z, aa) {
    return new i(z.type, h.IMMUTABLE, z.data);
   }), x = l(o(v.blocks, w)), y = n(x);
   return j.forceSelection(y, new k(u.selection));
  },
  set: function(t, u) {
   var v = p(u.getCurrentContent()), w = u.getSelection().toJS();
   r.set(t, {
    encodedBlocks: v,
    selection: w
   });
  },
  _getEmptyEditorState: function() {
   var t = m();
   return j.forceSelection(t, t.getSelection());
  }
 };
 e.exports = s;
}, null);

__d("MessengerInfoPanelVisibility", [ "MessengerActions", "throttle", "cssVar" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var j = parseInt("920px".replace("px", ""), 10) + 5, k = {
  HIDDEN: 0,
  VISIBLE: 1,
  AUTO: 2
 };
 function l() {
  this.currentState = k.AUTO;
  this.$MessengerInfoPanelVisibility0();
  window.addEventListener("resize", h(this.$MessengerInfoPanelVisibility0, 200, this));
 }
 l.prototype.isOverBreakpoint = function() {
  return window.innerWidth > j;
 };
 l.prototype.toggle = function() {
  this.currentState = this.$MessengerInfoPanelVisibility1 ? k.HIDDEN : this.isOverBreakpoint() ? k.AUTO : k.VISIBLE;
  this.$MessengerInfoPanelVisibility0();
 };
 l.prototype.shouldBeVisible = function() {
  switch (this.currentState) {
  case k.AUTO:
   return this.isOverBreakpoint();

  case k.HIDDEN:
  case k.VISIBLE:
   return !!this.currentState;
  }
 };
 l.prototype.$MessengerInfoPanelVisibility0 = function() {
  var m = this.shouldBeVisible();
  if (this.$MessengerInfoPanelVisibility1 !== m) {
   this.$MessengerInfoPanelVisibility1 = m;
   g.changeInfoPanelVisibility(this.$MessengerInfoPanelVisibility1);
  }
 };
 Object.assign(l, k);
 e.exports = l;
}, null);

__d("MessengerInterstitialBanner.react", [ "CenteredContainer.react", "Image.react", "Link.react", "ReactComponentWithPureRenderMixin", "React", "UserAgentData", "cx", "fbt", "ix" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var p = k, q = p.PropTypes, r = o("/unpublished/images/messenger/banner/messengerPhone-2x.png"), s = k.createClass({
  displayName: "MessengerInterstitialBanner",
  mixins: [ j ],
  propTypes: {
   isBrowserUnsupported: q.bool,
   mobileAppInfo: q.objectOf(q.bool)
  },
  render: function() {
   if (!this.props.isBrowserUnsupported && this.props.mobileAppInfo.hasMessenger && this.props.mobileAppInfo.messengerPushable) return null;
   return k.createElement(g, {
    className: "_s15",
    vertical: true
   }, k.createElement("div", {
    className: "_s16"
   }, k.createElement(h, {
    className: "_s17",
    src: r
   }), this._renderMessage(), this._renderLink()));
  },
  _renderMessage: function() {
   if (this.props.isBrowserUnsupported) {
    return n._("For a better experience on {Messenger}, update your {browser}.", [ n.param("Messenger", "Messenger"), n.param("browser", l.browserName) ]);
   } else if (!this.props.mobileAppInfo.hasMessenger) {
    return n._("Keep the conversation going from your phone.");
   } else if (!this.props.mobileAppInfo.messengerPushable) return n._("See messages instantly on your phone—open the app to learn more.");
  },
  _renderLink: function() {
   if (this.props.isBrowserUnsupported || this.props.mobileAppInfo.hasMessenger) return null;
   return k.createElement(i, {
    target: "_blank",
    className: "_s18",
    href: "https://www.messenger.com/about"
   }, n._("Get App"));
  }
 });
 e.exports = s;
}, null);

__d("MessengerBugNub.react", [ "Image.react", "Link.react", "React", "cx", "ix" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var l = k("/unpublished/images/messenger/bug_nub/bug_nub_dark_grey.png"), m = i.createClass({
  displayName: "MessengerBugNub",
  render: function() {
   return i.createElement("div", {
    className: "_4_xe"
   }, i.createElement(h, {
    href: "#",
    ajaxify: "/ajax/bugs/employee_report",
    className: "fbNubButton",
    rel: "dialog"
   }, i.createElement(g, {
    src: l
   })));
  }
 });
 e.exports = m;
}, null);

__d("MessengerComposerActions", [ "MessengerDispatcher", "keyMirror" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var i = h({
  ADD_TOKEN: null,
  REMOVE_TOKEN: null,
  FOCUS_COMPOSER: null,
  FOCUS_TYPEAHEAD: null
 }), j = {
  Types: i,
  addToken: function(k) {
   g.dispatch({
    type: i.ADD_TOKEN,
    entry: k
   });
  },
  removeToken: function(k) {
   g.dispatch({
    type: i.REMOVE_TOKEN,
    entry: k
   });
  },
  focusComposer: function() {
   g.dispatch({
    type: i.FOCUS_COMPOSER
   });
  },
  focusTypeahead: function() {
   g.dispatch({
    type: i.FOCUS_TYPEAHEAD
   });
  }
 };
 e.exports = j;
}, null);

__d("MessengerComposerState", [ "immutable" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var h = g.Record({
  step: null,
  recipients: g.List()
 });
 e.exports = h;
}, null);

__d("MessengerComposerStore", [ "MessengerActions", "MessengerComposerActions", "MessengerComposerState", "MessengerComposerSteps", "MessengerDispatcher", "MessengerStateStore", "MessengerStore", "MessengerView" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var o = new i({
  step: j.NULL
 });
 for (var p in m) if (m.hasOwnProperty(p)) r[p] = m[p];
 var q = m === null ? null : m.prototype;
 r.prototype = Object.create(q);
 r.prototype.constructor = r;
 r.__superConstructor__ = m;
 function r() {
  m.call(this);
  this.$MessengerComposerStore0 = o;
 }
 r.prototype.getState = function() {
  return this.$MessengerComposerStore0;
 };
 r.prototype.__onDispatch = function(s) {
  k.waitFor([ l.getDispatchToken() ]);
  var t = l.getState().detailView;
  if (t !== n.DETAIL.COMPOSE) {
   if (this.$MessengerComposerStore0 !== o) {
    this.$MessengerComposerStore0 = o;
    this.emitChange();
   }
   return;
  }
  var u = this.$MessengerComposerStore0.recipients, v = this.$MessengerComposerStore0.step, w = null, x = null;
  switch (s.type) {
  case h.Types.ADD_TOKEN:
   w = u.push(s.entry);
   break;

  case h.Types.REMOVE_TOKEN:
   var y = s.entry.getUniqueID(), z = u.findIndex(function(ba) {
    return ba.getUniqueID() === y;
   });
   if (z !== -1) w = u["delete"](z);
   break;

  case h.Types.FOCUS_COMPOSER:
   if (v === j.SELECT_RECIPIENTS) x = j.COMPOSE;
   break;

  case h.Types.FOCUS_TYPEAHEAD:
   if (v === j.COMPOSE) x = j.SELECT_RECIPIENTS;
   break;

  case g.Types.REPLACE_STATE:
   var aa = l.getPrevState().detailView;
   if (aa !== n.DETAIL.COMPOSE) x = j.SELECT_RECIPIENTS;
   break;
  }
  if (w || x) {
   this.$MessengerComposerStore0 = new i({
    step: x || v,
    recipients: w || u
   });
   this.emitChange();
  }
 };
 e.exports = new r();
}, null);

__d("MessengerContextualDialog.react", [ "ReactAbstractContextualDialog", "ReactLayer", "cx" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var j = 12, k = h.createClass(g.createSpec({
  displayName: "MessengerContextualDialog",
  theme: {
   wrapperClassName: "_1r_9",
   arrowDimensions: {
    offset: j,
    length: 16
   }
  }
 }));
 e.exports = k;
}, null);

__d("MessengerStickersFlyoutPackSelector.react", [ "Animation", "ImmutableObject", "Locale", "React", "Image.react", "StickerActions", "StickerConfig", "StickerConstants", "StickerState", "StickerStoreController", "XUIBadge.react", "cx", "emptyFunction", "fbt" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var u = j, v = u.PropTypes, w = 4, x = 200, y = t._("Sticker Store"), z = j.createClass({
  displayName: "MessengerStickersFlyoutPackSelector",
  propTypes: {
   isComments: v.bool,
   isComposer: v.bool,
   numNewPacks: v.number,
   packs: v.arrayOf(v.instanceOf(h)).isRequired,
   onPackClick: v.func,
   selectedPackID: v.string,
   resetTagSelectorFunc: v.func,
   glyphProvider: v.object.isRequired
  },
  getInitialState: function() {
   return {
    animating: false,
    page: 0
   };
  },
  getDefaultProps: function() {
   return {
    isComments: false,
    isComposer: false,
    numNewPacks: 0
   };
  },
  shouldComponentUpdate: function(ba, ca) {
   return !ca.animating;
  },
  onFlyoutShown: function() {
   if (this.props.packs.length > 0) {
    var ba = this._calculatePageForPack(this.props.selectedPackID);
    if (this.state.page !== ba) this._setPage(ba, 0);
   }
  },
  _calculatePageForPack: function(ba) {
   for (var ca = 0; ca < this.props.packs.length; ca++) if (this.props.packs[ca].id == ba) return ca <= w ? 0 : Math.floor((ca - 1) / w);
   return 0;
  },
  _setPage: function(ba, ca) {
   if (this.state.animating) return;
   this.setState({
    animating: true,
    page: ba
   }, function() {
    var da = j.findDOMNode(this.refs.positioner), ea = this._calculatePosition(ba);
    new g(da).to(ea.reference, ea.offset + "px").ondone(function() {
     return this.setState({
      animating: false
     });
    }.bind(this)).duration(ca).go();
   });
  },
  _calculatePosition: function(ba) {
   var ca = j.findDOMNode(this.refs.positioner), da = ca.childNodes[ba].offsetLeft;
   if (i.isRTL()) {
    var ea = ca.offsetWidth, fa = ca.childNodes[ba].offsetWidth;
    return {
     reference: "right",
     offset: da + fa - ea
    };
   }
   return {
    reference: "left",
    offset: -da
   };
  },
  _numPages: function() {
   return Math.max(1, Math.ceil((this.props.packs.length - 1) / w));
  },
  _canGoPrev: function() {
   return this.state.page > 0;
  },
  _canGoNext: function() {
   return this.state.page + 1 < this._numPages();
  },
  _goPrev: function() {
   this._canGoPrev() && this._setPage(this.state.page - 1, x);
  },
  _goNext: function() {
   this._canGoNext() && this._setPage(this.state.page + 1, x);
  },
  _openStore: function() {
   l.resetNumNewPacks();
   p.showStore(null, this.props.isComposer);
  },
  render: function() {
   return j.createElement("div", {
    className: "_5r85"
   }, this._renderStoreButton(), this._renderPrevArrow(), this._renderNextArrow(), j.createElement("div", {
    className: "_5r88"
   }, j.createElement("div", {
    className: "_5r89",
    ref: "positioner"
   }, this._renderPages())));
  },
  _selectPack: function(ba) {
   var ca = o.getPack(ba);
   if (ca && ca.isPromoted) l.addPack(ba);
   if (ba === n.SEARCH_PACK_ID) this.props.resetTagSelectorFunc();
   if (this.props.onPackClick) {
    this.props.onPackClick(ba);
   } else l.selectPack(ba);
  },
  _renderPages: function() {
   var ba = this.props.packs.map(function(fa, ga) {
    return j.createElement(aa, {
     key: fa.id,
     onClick: function() {
      return this._selectPack(fa.id);
     }.bind(this),
     pack: fa,
     selected: this.props.selectedPackID === fa.id,
     index: ga,
     isComments: this.props.isComments,
     glyphProvider: this.props.glyphProvider
    });
   }.bind(this)), ca = [];
   for (var da = 0; da < ba.length; da += w) {
    var ea = da;
    da === 0 && da++;
    ca.push(j.createElement("div", {
     className: "_5r81",
     key: da
    }, ba.slice(ea, da + w)));
   }
   return ca;
  },
  _renderStoreButton: function() {
   return j.createElement("a", {
    "aria-label": y,
    className: "_5r86 _5wqq rfloat",
    "data-hover": "tooltip",
    onClick: this._openStore
   }, j.createElement(k, {
    className: "_5r87",
    src: this.props.glyphProvider.store
   }), this._renderJewel());
  },
  _renderJewel: function() {
   var ba = this.props.numNewPacks;
   if (!ba) return null;
   return j.createElement(q, {
    className: "rfloat _3fhs",
    count: ba,
    maxcount: 9,
    type: "special"
   });
  },
  _renderPrevArrow: function() {
   if (!this._canGoPrev()) return null;
   var ba = i.isRTL() ? this.props.glyphProvider.right : this.props.glyphProvider.left;
   return j.createElement("a", {
    className: "_37wu" + (" " + "_5wqr") + (" " + "lfloat"),
    onClick: this._goPrev
   }, j.createElement(k, {
    className: "_5r84",
    src: ba
   }));
  },
  _renderNextArrow: function() {
   if (!this._canGoNext()) return null;
   var ba = i.isRTL() ? this.props.glyphProvider.left : this.props.glyphProvider.right;
   return j.createElement("a", {
    className: "_37wv" + (" " + "_5wqs") + (" " + "rfloat"),
    onClick: this._goNext
   }, j.createElement(k, {
    className: "_5r84",
    src: ba
   }));
  }
 }), aa = j.createClass({
  displayName: "PackIcon",
  propTypes: {
   index: v.number,
   isComments: v.bool,
   onClick: v.func,
   pack: v.instanceOf(h).isRequired,
   selected: v.bool,
   glyphProvider: v.object
  },
  getDefaultProps: function() {
   return {
    isComments: false,
    onClick: s
   };
  },
  _getPackIcon: function(ba) {
   if (ba.id == n.SEARCH_PACK_ID) return this.props.glyphProvider.search;
   if (ba.id == n.MRU_STICKER_PACK) return this.props.glyphProvider.recent;
   if (ba.id == n.EMOTICON_PACK_ID) return this.props.glyphProvider.emoji;
   return ba.icon;
  },
  render: function() {
   var ba = this.props.pack, ca = m.WebStickerSearch && !m.StickerSearchInRecent ? this.props.index === 1 || this.props.index === 2 : this.props.index === 1, da = "_5r8a" + (" " + "_5wqt") + (this.props.selected ? " " + "_5r8b" : "") + (ba.id == n.MRU_STICKER_PACK ? " " + "_5qcj" : "") + (ba.id == n.MRU_STICKER_PACK ? " " + "_5wqu" : "") + (ba.id == n.SEARCH_PACK_ID ? " " + "_5qck" : "") + (ba.id == n.SEARCH_PACK_ID ? " " + "_5wqv" : "") + (ca ? " " + "_eb3" : "") + (ca ? " " + "_5wqw" : ""), ea = this.props.isComments && !ba.isCommentsCapable, fa = t._("This pack is only available in photos"), ga = t._("This pack is only available in messages"), ha = ea ? s : function() {
    return this.props.onClick(ba.id);
   }.bind(this), ia = ga;
   if (!ba.isMessengerCapable && ba.isComposerCapable) ia = fa;
   return j.createElement("a", {
    "aria-label": ea ? ga : ba.name,
    className: da,
    "data-id": ba.id,
    "data-hover": "tooltip",
    ref: "search_icon",
    onClick: ha,
    tabIndex: "0"
   }, j.createElement(k, {
    className: (ea ? "_2ji6" : "") + (" " + "_5r8c") + (" " + "_5wqx") + (m.WebStickerSearch ? " " + "_1viy" : ""),
    src: this._getPackIcon(ba)
   }));
  }
 });
 e.exports = z;
}, null);

__d("MessengerStickersFlyoutStickerSelector.react", [ "BanzaiLogger", "Grid.react", "Image.react", "ScrollableArea.react", "React", "Sticker.react", "StickerConstants", "StickerConfig", "StickerImages", "StickerSearch", "StickerState", "StickerUtils", "XUISpinner.react", "cx", "debounce", "emptyFunction", "fbt", "ix", "throttle" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var z = h.GridItem, aa = k, ba = aa.PropTypes, ca = 320, da = 278, ea = m.MRU_STICKER_PACK, fa = 44, ga = 112, ha = n.AutoAnimateStickerTray ? "load_and_hover" : "hover", ia = u(function(ka, la) {
  if (!ka) return;
  g.log("StickersLoggerConfig", {
   event: "search_sticker",
   searchtoken: ka,
   numsearchresults: la.length
  });
 }, 1e3), ja = k.createClass({
  displayName: "MessengerStickersFlyoutStickerSelector",
  propTypes: {
   height: ba.number,
   isComments: ba.bool,
   isComposer: ba.bool,
   onQueryResultsFound: ba.func,
   onScroll: ba.func,
   packID: ba.string,
   singleWordTags: ba.array,
   typeaheadTags: ba.array,
   userInput: ba.string
  },
  getDefaultProps: function() {
   return {
    isComments: false,
    isComposer: false,
    onScroll: v,
    shown: false
   };
  },
  getInitialState: function() {
   return {
    loading: false,
    stickers: []
   };
  },
  componentDidMount: function() {
   if (this.props.packID) {
    this.requestStickersForPack(this.props.packID);
    return;
   }
   if (this.props.userInput) this.requestStickersForQuery(this.props.userInput);
  },
  componentWillReceiveProps: function(ka) {
   if (ka.packID && ka.packID !== this.props.packID) {
    this.requestStickersForPack(ka.packID);
   } else if (ka.userInput !== this.props.userInput) this.requestStickersForQuery(ka.userInput);
  },
  requestStickersForQuery: function(ka) {
   this.setState({
    loading: true
   });
   p.requestStickersForQuery(ka, function(la) {
    la.map(function(ma) {
     return o.cacheSticker(ma);
    });
    if (!this.props.tagChosen) ia(ka, la);
    if (this.props.isComposer) la = la.filter(function(ma) {
     return ma.isComposerCapable;
    });
    if (this.props.isComments) la = la.filter(function(ma) {
     return ma.isCommentsCapable;
    });
    if (this.isMounted()) {
     this.setState({
      loading: false,
      stickers: la
     });
     if (n.EnterToSendSticker) this.props.onQueryResultsFound && this.props.onQueryResultsFound(la);
    }
   }.bind(this));
  },
  requestStickersForPack: function(ka) {
   this.setState({
    loading: true
   });
   o.requestStickersForPack(ka, m.TRAY_SIZE, function(la) {
    if (ka == ea) {
     la = q.getMRUStickerPack(la);
     if (this.props.isComposer) la = la.filter(function(ma) {
      return ma.isComposerCapable;
     });
     if (this.props.isComments) la = la.filter(function(ma) {
      return ma.isCommentsCapable;
     });
    }
    this.setState({
     loading: false,
     stickers: la
    });
   }.bind(this));
  },
  renderStickers: function() {
   return this.state.stickers.map(function(ka) {
    var la = r.getScaledDimensions(ka.height, ka.width, m.TRAY_SIZE);
    return k.createElement(z, {
     key: ka.id
    }, k.createElement("div", {
     className: "_5r8h",
     "data-id": ka.id
    }, k.createElement(l, {
     animationTrigger: ha,
     className: "_5r8i",
     frameCount: ka.frameCount,
     frameRate: ka.frameRate || 83,
     framesPerCol: ka.framesPerCol,
     framesPerRow: ka.framesPerRow,
     shown: this.props.shown,
     sourceHeight: la.height,
     sourceURI: ka.sourceURI,
     sourceWidth: la.width,
     spriteURI: ka.spriteURI,
     paddedSpriteURI: ka.paddedSpriteURI,
     stickerID: ka.id,
     style: {
      cursor: "pointer"
     }
    })));
   }.bind(this));
  },
  _onScroll: function() {
   var ka = this.refs.stickerScrollable;
   if (ka) {
    var la = ka.getArea().getScrollTop();
    this.props.onScroll(la);
   }
  },
  render: function() {
   if (this.state.loading) {
    return k.createElement("div", {
     className: "_e0r"
    }, k.createElement(s, {
     size: "large"
    }));
   } else if (this.state.stickers.length === 0) {
    var ka = (ca - fa * 2 - ga) / 2 + "px";
    return k.createElement("div", {
     className: "_5jdt",
     style: {
      marginTop: ka
     }
    }, k.createElement(i, {
     src: x("/images/messaging/stickers/icons/sad_face.png")
    }), k.createElement("p", null, w._("No Stickers to Show")));
   }
   return k.createElement(j, {
    ref: "stickerScrollable",
    height: this.props.height || ca,
    onScroll: y(this._onScroll, 200),
    width: da,
    fade: true
   }, k.createElement("div", {
    className: "_5r8k"
   }, k.createElement(h, {
    cols: 4,
    fixed: true
   }, this.renderStickers())));
  }
 });
 e.exports = ja;
}, null);

__d("MessengerStickersFlyoutGlyphProvider", [ "ix" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var h = {
  store: g("/unpublished/images/messenger/sticker_tab/stickerStoreAddIcon.png"),
  right: g("/unpublished/images/messenger/sticker_tab/rightArrow.png"),
  left: g("/unpublished/images/messenger/sticker_tab/leftArrow.png"),
  search: g("/unpublished/images/messenger/sticker_tab/stickersearch.png"),
  recent: g("/unpublished/images/messenger/sticker_tab/stickers_history.png"),
  emoji: g("/images/messaging/stickers/icons/emoji.png")
 };
 e.exports = h;
}, null);

__d("MessengerSearchInput.react", [ "AbstractTextInput.react", "ReactComponentWithPureRenderMixin", "React", "XUICloseButton.react", "cx", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j, k, l) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var m = i, n = m.PropTypes, o = i.createClass({
  displayName: "MessengerSearchInput",
  mixins: [ h ],
  propTypes: {
   isFocused: n.bool,
   onBlur: n.func,
   onChange: n.func,
   onClear: n.func,
   onEnter: n.func,
   onFocus: n.func,
   placeholder: n.string,
   value: n.string
  },
  render: function() {
   return i.createElement("div", {
    className: l(this.props.className, "_5iwm" + (this.props.isFocused || !!this.props.value ? " " + "_5iwn" : ""))
   }, i.createElement(g, {
    className: "_3deo",
    onBlur: this.props.onBlur,
    onChange: this.props.onChange,
    onEnter: this.props.onEnter,
    onFocus: this.props.onFocus,
    placeholder: this.props.placeholder,
    ref: "inputField",
    value: this.props.value
   }), i.createElement(j, {
    size: "small",
    onMouseDown: this.props.onClear,
    className: (this.props.value.length === 0 ? "hidden_elem" : "") + (" " + "_2xme")
   }));
  },
  focusInput: function() {
   this.refs.inputField.focusInput();
  }
 });
 e.exports = o;
}, null);

__d("MessengerStickersFlyoutTagSelector.react", [ "BanzaiLogger", "Grid.react", "ScrollableArea.react", "Parent", "React", "Image.react", "StickerConfig", "StickerConstants", "MessengerSearchInput.react", "MessengerStickersFlyoutStickerSelector.react", "StickerSearch", "StickerState", "StickerUtils", "Toggler", "XUIButton.react", "cx", "emptyFunction", "fbt" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var y = h.GridItem, z = k, aa = z.PropTypes, ba = 320, ca = 278, da = 44, ea = k.createClass({
  displayName: "MessengerStickersFlyoutTagSelector",
  propTypes: {
   trigger: aa.string,
   isComments: aa.bool,
   isComposer: aa.bool,
   resetTrigger: aa.func,
   shown: aa.bool,
   onSelectSticker: aa.func
  },
  getInitialState: function() {
   return {
    input: "",
    isScrolling: false,
    tagChosen: false,
    isInputFocused: false,
    matchedStickers: []
   };
  },
  getDefaultProps: function() {
   return {
    trigger: null,
    isComments: false,
    isComposer: false,
    resetTrigger: w,
    shown: false,
    onSelectSticker: w
   };
  },
  componentDidMount: function() {
   var fa = j.byClass(k.findDOMNode(this), "uiToggle");
   if (fa) this._togglerSub = t.listen("show", fa, function() {
    this.isMounted() && this.focusInput();
   }.bind(this));
   this.focusInput();
   this.selectTrigger(this.props.trigger);
  },
  componentWillUnmount: function() {
   this._togglerSub && this._togglerSub.unsubscribe();
  },
  componentWillReceiveProps: function(fa) {
   this.selectTrigger(fa.trigger);
  },
  focusInput: function() {
   this.refs.inputField.focusInput && this.refs.inputField.focusInput();
  },
  _setMatchedStickers: function(fa) {
   this.setState({
    matchedStickers: fa ? fa : []
   });
  },
  _onEnter: function(fa) {
   fa.preventDefault();
   fa.stopPropagation();
   if (!m.EnterToSendSticker) return;
   var ga = this.state.matchedStickers;
   if (ga && ga.length === 1) {
    this.props.onSelectSticker(ga[0].id, fa);
    this.setState({
     matchedStickers: []
    });
   }
  },
  _onInputFocused: function() {
   this.setState({
    isInputFocused: true
   });
  },
  _onInputBlurred: function() {
   this.setState({
    isInputFocused: false
   });
  },
  _inputChanged: function(event) {
   var fa = event.target.value;
   if (!fa) this.reset();
   this.setState({
    input: fa,
    tagChosen: false,
    isScrolling: false
   });
  },
  _normalizeInput: function(fa) {
   return fa.trim().replace(/\s+/, " ").toLowerCase();
  },
  reset: function() {
   this.setState({
    input: "",
    isScrolling: false,
    tagChosen: false,
    matchedStickers: []
   });
  },
  renderContentArea: function() {
   if (this.state.tagChosen || this._normalizeInput(this.state.input).length > 1) {
    return this.renderStickers();
   } else return m.StickerSearchInRecent ? this.renderRecentStickers() : this.renderTags();
  },
  render: function() {
   return k.createElement("div", {
    className: "_217a" + (this.state.isScrolling ? " " + "_1hg1" : "") + (this.state.isInputFocused ? " " + "_10cj" : "")
   }, k.createElement(o, {
    isFocused: this.state.isInputFocused,
    onBlur: this._onInputBlurred,
    onChange: this._inputChanged,
    onClear: this.reset,
    onEnter: this._onEnter,
    onFocus: this._onInputFocused,
    placeholder: x._("Search all Stickers"),
    ref: "inputField",
    value: this.state.input
   }), this.renderContentArea());
  },
  selectTag: function(fa) {
   g.log("StickersLoggerConfig", {
    event: "select_tag",
    tagid: fa.id
   });
   this.setState({
    tagChosen: true,
    input: s.capitalizeWords(fa.name)
   });
   this.focusInput();
  },
  selectTrigger: function(fa) {
   if (fa !== null) {
    var ga = q.getTagByName(fa);
    this.setState({
     tagChosen: true,
     input: s.capitalizeWords(ga.name)
    });
    this.props.resetTrigger();
   }
  },
  _onScroll: function(fa) {
   this.setState({
    isScrolling: !!fa
   });
  },
  renderStickers: function() {
   var fa = this._normalizeInput(this.state.input);
   return k.createElement(p, {
    ref: "selector",
    height: ba - da,
    userInput: fa,
    onScroll: this._onScroll,
    isComments: this.props.isComments,
    isComposer: this.props.isComposer,
    tagChosen: this.state.tagChosen,
    shown: this.props.shown,
    onQueryResultsFound: this._setMatchedStickers
   });
  },
  renderRecentStickers: function() {
   if (this._normalizeInput(this.state.input).length === 1) return k.createElement("div", null);
   return k.createElement(p, {
    ref: "selector",
    height: ba - da,
    packID: n.MRU_STICKER_PACK,
    onScroll: this._onScroll,
    isComments: this.props.isComments,
    isComposer: this.props.isComposer,
    shown: this.props.shown
   });
  },
  renderTags: function() {
   var fa = r.getFeaturedTags().filter(function(ga) {
    return ga.sourceURI !== null;
   }).sort(function(ga, ha) {
    return ga.order - ha.order;
   }).map(function(ga, ha) {
    return k.createElement(y, {
     key: ha
    }, k.createElement("div", {
     className: "_t5c" + (" " + "_10m5") + (ha < 2 ? " " + "_1b27" : "") + (ha % 2 === 0 ? " " + "_t5d" : "") + (ha % 2 !== 0 ? " " + "_t5e" : "")
    }, k.createElement(u, {
     image: k.createElement(l, {
      src: ga.sourceURI
     }),
     label: ga.name,
     onClick: this.selectTag.bind(this, ga),
     className: "_5jdu" + (" " + "_10m6"),
     style: {
      background: "#" + ga.color_code
     },
     disabled: this._normalizeInput(this.state.input).length === 1
    })));
   }.bind(this));
   return k.createElement(i, {
    height: ba - da,
    width: ca - 16,
    shadow: true,
    fade: true,
    className: "_5jei _10m7"
   }, k.createElement(h, {
    spacing: "pas",
    cols: 2,
    fixed: true,
    ref: "grid"
   }, fa));
  }
 });
 e.exports = ea;
}, null);

__d("MessengerStickersFlyout.react", [ "BanzaiLogger", "Event", "Keys", "MessagesEmoticons.react", "Parent", "ReactComponentWithPureRenderMixin", "React", "MessengerStickersFlyoutPackSelector.react", "MessengerStickersFlyoutStickerSelector.react", "StickerActions", "StickerConstants", "StickerConfig", "MessengerStickersFlyoutGlyphProvider", "MessengerStickersFlyoutTagSelector.react", "StickerState", "SubscriptionsHandler", "Toggler", "XUISpinner.react", "arrayContains", "cx", "invariant", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var ca = m, da = ca.PropTypes, ea = q.SEARCH_PACK_ID, fa = m.createClass({
  displayName: "MessengerStickersFlyout",
  mixins: [ l ],
  propTypes: {
   isComments: da.bool,
   isComposer: da.bool,
   onStickerSelect: da.func.isRequired,
   onEmoticonSelect: da.func,
   onShown: da.func,
   onHidden: da.func,
   onEscKeyDown: da.func,
   onPackSelect: da.func,
   packID: da.string,
   shown: da.bool,
   trigger: da.string
  },
  getDefaultProps: function() {
   return {
    isComments: false,
    isComposer: false,
    packID: u.getTrayPackID(),
    shown: false,
    trigger: null
   };
  },
  getInitialState: function() {
   return {
    dataReady: false,
    numNewPacks: 0,
    shown: false
   };
  },
  componentDidMount: function() {
   if (r.LoadStickerEarly && !this.state.dataReady) this.loadTrayData();
   this._toggle = k.byClass(m.findDOMNode(this), "uiToggle");
   this._subscriptions = new v();
   if (this._toggle) {
    this._subscriptions.addSubscriptions(w.listen("show", this._toggle, this._onShownWrapper), w.listen("hide", this._toggle, this._onHidden));
   } else if (!r.LoadStickerEarly && this.props.shown && !this.state.dataReady) this.loadTrayData();
   this._subscriptions.addSubscriptions(h.listen(m.findDOMNode(this), "keydown", this._onKeyDown), u.addListener(u.PACKS_CHANGED, this.packsUpdated), u.addListener(u.NUM_NEW_PACKS_CHANGED, function(ga) {
    this.setState({
     numNewPacks: ga
    });
   }.bind(this)));
  },
  _onShownWrapper: function() {
   if (this.props.onShown) {
    this.props.onShown(this._onShown);
   } else this._onShown();
  },
  _onShown: function() {
   g.log("StickersLoggerConfig", {
    event: "open_tray"
   });
   if (!r.LoadStickerEarly && !this.state.dataReady) this.loadTrayData();
   if (this.props.packID === ea) this.refs.tagSelector && this.refs.tagSelector.focusInput();
   this.refs.packSelector.onFlyoutShown();
   this.setState({
    shown: true
   });
  },
  _onHidden: function() {
   this.resetTagSelector();
   this.props.onHidden && this.props.onHidden();
   this.setState({
    shown: false
   });
  },
  componentWillUnmount: function() {
   this._subscriptions.release();
  },
  componentWillReceiveProps: function(ga) {
   if (!this.state.dataReady && ga.shown) this.loadTrayData();
  },
  componentDidUpdate: function(ga) {
   if (!ga.shown && this.props.shown) {
    this._onShown();
   } else if (ga.shown && !this.props.shown) this._onHidden();
  },
  _onKeyDown: function(event) {
   if (event.keyCode === i.ESC && this.props.onEscKeyDown) {
    this.props.onEscKeyDown();
    event.kill();
   }
  },
  resetTagSelector: function() {
   this.refs.tagSelector && this.refs.tagSelector.reset();
  },
  loadTrayData: function() {
   u.onTrayDataReady(function() {
    var ga = u.getNumNewPacks();
    this.setState({
     dataReady: true,
     numNewPacks: ga
    });
    var ha = u.getPacksInTray()[0].id, ia = this.props.packID;
    if (!ia || !y(u.getPackIDsInTray(), ia)) {
     p.selectPack(ha, true);
     this.props.onPackSelect && this.props.onPackSelect(ha);
    }
   }.bind(this));
  },
  _isShown: function() {
   return this._toggle ? this.state.shown : this.props.shown;
  },
  loadPack: function() {
   if (!this.state.dataReady) return m.createElement("div", {
    className: "_e0r"
   }, m.createElement(x, {
    size: "large"
   }));
   if (this.props.packID === q.EMOTICON_PACK_ID) return m.createElement("div", {
    className: "_5r8l",
    "data-id": this.props.packID
   }, m.createElement(j, {
    onEmoticonSelect: this.props.onEmoticonSelect
   }));
   if (this.props.packID === ea && r.WebStickerSearch) return m.createElement("div", {
    className: "_5r8l"
   }, m.createElement(t, {
    ref: "tagSelector",
    className: "fbStickersFlyoutTagSelector",
    trigger: this.props.trigger,
    resetTrigger: function() {
     return this.setProps({
      trigger: null
     });
    }.bind(this),
    isComments: this.props.isComments,
    isComposer: this.props.isComposer,
    shown: this._isShown(),
    onSelectSticker: this.onSelectSticker
   }));
   return m.createElement("div", {
    className: "_5r8l",
    "data-id": this.props.packID
   }, m.createElement(o, {
    ref: "selector",
    packID: this.props.packID,
    isComments: this.props.isComments,
    isComposer: this.props.isComposer,
    shown: this._isShown()
   }));
  },
  packsUpdated: function() {
   var ga = u.getPackIDsInTray();
   if (!y(ga, this.props.packID)) {
    p.selectPack(ga[0]);
    return;
   }
   this.forceUpdate(null);
  },
  onSelectSticker: function(ga, event) {
   if (ga) {
    u.updateRecentlyUsed(ga);
    this.props.onStickerSelect(ga, event);
    if (r.PromotePackFromSearch && this.props.packID === q.SEARCH_PACK_ID) u.promotePackSentFromSearch(ga);
    u.clearShowStickerReplyNUX();
   }
  },
  selectedSticker: function(event) {
   var ga = k.byClass(event.target, "_5r8h");
   if (ga) {
    var ha = ga.getAttribute("data-id");
    this.onSelectSticker(ha, event);
   }
  },
  render: function() {
   aa(!(this.props.isComposer && this.props.isComments));
   var ga;
   if (this.props.isComposer) {
    ga = u.getPacksInComposerTray();
   } else if (this.props.isComments) {
    ga = u.getPacksInCommentsTray();
   } else ga = u.getPacksInTray();
   return m.createElement("div", {
    className: ba(this.props.className, "_5r8f")
   }, m.createElement("div", {
    className: "_5r8e _38ju"
   }, m.createElement(n, {
    ref: "packSelector",
    numNewPacks: this.state.numNewPacks,
    onPackClick: this.props.onPackSelect,
    selectedPackID: this.props.packID,
    packs: ga,
    isComments: this.props.isComments,
    isComposer: this.props.isComposer,
    resetTagSelectorFunc: this.resetTagSelector,
    glyphProvider: s
   })), m.createElement("div", {
    className: "_5r8m _38jv",
    onClick: this.selectedSticker
   }, this.loadPack()));
  }
 });
 e.exports = fa;
}, null);

__d("MessengerStickerStateStore", [ "MessengerStickerActions", "MessengerStore", "StickerActions", "StickerState", "StickerStoreController", "SubscriptionsHandler", "arrayContains" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 for (var n in h) if (h.hasOwnProperty(n)) p[n] = h[n];
 var o = h === null ? null : h.prototype;
 p.prototype = Object.create(o);
 p.prototype.constructor = p;
 p.__superConstructor__ = h;
 function p() {
  h.call(this);
  this.$MessengerStickerStateStore0 = {
   showTray: false,
   packID: j.getTrayPackID()
  };
  this.$MessengerStickerStateStore1 = new l();
  j.onTrayDataReady(function() {
   this.$MessengerStickerStateStore1.addSubscriptions(j.addListener(j.PACK_SELECTED, function(q) {
    this.$MessengerStickerStateStore0 = Object.assign({}, this.$MessengerStickerStateStore0, {
     packID: q
    });
    this.emitChange();
   }.bind(this)));
  }.bind(this));
 }
 p.prototype.getState = function() {
  return this.$MessengerStickerStateStore0;
 };
 p.prototype.__onDispatch = function(q) {
  switch (q.type) {
  case g.Types.REPLACE_STICKER_STATE:
   var r = q.packID, s = !!q.showTray;
   if (r) if (m(j.getPackIDsInTray(), r)) {
    var t = j.getPack(r);
    if (t && t.isPromoted) i.addPack(r);
    i.selectPack(r);
    s = true;
   } else {
    r = this.$MessengerStickerStateStore0.packID;
    s = false;
    k.showStore(q.packID);
   }
   this.$MessengerStickerStateStore0 = Object.assign({}, this.$MessengerStickerStateStore0, {
    packID: r,
    showTray: s
   });
   this.emitChange();
   break;
  }
 };
 e.exports = new p();
}, null);

__d("MessengerStickerButton.react", [ "BanzaiODS", "MessengerContextualDialog.react", "MessengerStickerActions", "MessengerStickersFlyout.react", "MessengerStickerStateStore", "ReactComponentWithPureRenderMixin", "PureStoreBasedStateMixin", "React", "ReactLayeredComponentMixin", "cx", "emptyFunction", "fbt", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var t = n, u = t.PropTypes, v = 278, w = n.createClass({
  displayName: "MessengerStickerButton",
  _clickGuard: false,
  mixins: [ l, o, m(k) ],
  propTypes: {
   className: u.string,
   disabled: u.bool,
   flyoutClassName: u.string,
   flyoutWidth: u.number,
   wrapperClass: u.func,
   onStickerSelect: u.func,
   onEmoticonSelect: u.func,
   onFlyoutShown: u.func,
   onFlyoutHidden: u.func
  },
  statics: {
   calculateState: function() {
    var x = k.getState();
    return {
     shown: x.showTray,
     packID: x.packID
    };
   }
  },
  getDefaultProps: function() {
   return {
    disabled: false,
    flyoutWidth: v,
    onStickerSelect: q,
    onEmoticonSelect: q
   };
  },
  componentDidMount: function() {
   g.bumpEntityKey("chat.web", "sticker_button.mounted");
  },
  render: function() {
   return n.createElement("a", {
    onClick: this.showFlyout,
    onMouseDown: this._prepareForClick,
    title: r._("Choose a sticker or emoticon"),
    ref: "link"
   }, n.createElement("span", {
    className: s(this.props.className, this.state.shown ? "open" : "")
   }));
  },
  renderLayers: function() {
   return {
    contextualDialog: n.createElement(h, {
     alignment: this.props.flyoutAlignment,
     className: "_5e-r",
     contextRef: "link",
     onBlur: this._hideFlyout,
     position: "above",
     shown: this.state.shown,
     width: this.props.flyoutWidth
    }, n.createElement("div", null, n.createElement(j, {
     className: this.props.flyoutClassName,
     onShown: function(x) {
      return this.props.onFlyoutShown && this.props.onFlyoutShown(x);
     }.bind(this),
     onHidden: function() {
      return this.props.onFlyoutHidden && this.props.onFlyoutHidden();
     }.bind(this),
     onEscKeyDown: this._hideFlyout,
     onStickerSelect: this._handleStickerSelected,
     onEmoticonSelect: this._handleEmoticonSelected,
     packID: this.state.packID,
     shown: this.state.shown
    })))
   };
  },
  _prepareForClick: function() {
   this._clickGuard = this.state.shown;
  },
  showFlyout: function() {
   if (!this._clickGuard && !this.props.disabled) i.showStickerTray();
  },
  _hideFlyout: function() {
   i.hideStickerTray();
  },
  _handleStickerSelected: function(x) {
   this.props.onStickerSelect && this.props.onStickerSelect(x);
  },
  _handleEmoticonSelected: function(x) {
   this._hideFlyout();
   this.props.onEmoticonSelect && this.props.onEmoticonSelect(x);
  }
 });
 e.exports = w;
}, null);

__d("MessengerInput.react", [ "AbstractTextEditor.react", "ComposedEntityType", "DocumentCompositeDecorator", "DocumentDecorator", "DOMDimensions", "EditorState", "EmoticonSpan.react", "MercuryIDs", "MercuryServerRequests", "MercurySourceType", "MessengerEditorStateManager", "ReactComponentWithPureRenderMixin", "React", "Run", "TypingDetectorController", "clearImmediate", "createEmptyEditorState", "cx", "fbt", "getEntityMatcher", "getVisibleValueForContentState", "handleBeforeInputForEmoticon", "handleSoftNewlineForEmoticon", "insertEmoticonIntoEditorState", "isSoftNewlineEvent", "setImmediate" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba, ca, da, ea, fa) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var ga = s, ha = ga.PropTypes, ia = h.EMOTICON, ja = s.createClass({
  displayName: "MessengerInput",
  mixins: [ r ],
  propTypes: {
   onResize: ha.func,
   onMessageSend: ha.func,
   threadID: ha.string,
   viewer: ha.string
  },
  getInitialState: function() {
   return {
    editorState: q.get(this.props.threadID)
   };
  },
  componentDidMount: function() {
   this._oldHeight = k.getElementDimensions(s.findDOMNode(this)).height;
   this._handleChangedThread();
   t.onBeforeUnload(this._saveCurrentEditorState);
  },
  componentWillUpdate: function(ka) {
   if (this.props.threadID !== ka.threadID) this._saveCurrentEditorState();
  },
  componentDidUpdate: function(ka) {
   this._resizeHandle = fa(function() {
    var la = k.getElementDimensions(s.findDOMNode(this)).height;
    if (this._oldHeight !== la) this.props.onResize();
    this._oldHeight = la;
   }.bind(this));
   if (this.props.threadID !== ka.threadID) this._handleChangedThread();
  },
  componentWillUnmount: function() {
   this._typingDetector && this._typingDetector.destroy();
   this.props.threadID && this._saveCurrentEditorState();
   this._resizeHandle && v(this._resizeHandle);
  },
  insertEmoticon: function(ka) {
   var la = da(ka, this.state.editorState);
   if (la !== this.state.editorState) this._onChange(la);
  },
  _onChange: function(ka) {
   this.setState({
    editorState: ka
   });
  },
  _handleReturn: function(event) {
   if (ea(event)) {
    var ka = ca(this.state.editorState);
    if (ka === this.state.editorState) return false;
    this.setState({
     editorState: ka
    });
    return true;
   }
   if (this._getValue().trim().length > 0) this._sendMessage();
   return true;
  },
  _handleChangedThread: function() {
   this._initializeTypingDetector();
   this.setState({
    editorState: this._initEditorState(q.get(this.props.threadID))
   });
   if (this.props.threadID) fa(function() {
    this.focus();
   }.bind(this));
  },
  _saveCurrentEditorState: function() {
   if (!this.props.threadID) return;
   q.set(this.props.threadID, this.state.editorState);
  },
  _resetState: function() {
   this.setState({
    editorState: this._initEditorState(w())
   });
  },
  _initializeTypingDetector: function() {
   this._typingDetector && this._typingDetector.destroy();
   this._typingDetector = null;
   if (this.props.threadID) this._typingDetector = new u(n.getUserIDFromThreadID(this.props.threadID), s.findDOMNode(this.refs.input), p.MESSENGER_WEB, null, o.getForFBID(this.props.viewer).getServerThreadIDNow(this.props.threadID), this._getValue);
  },
  _sendMessage: function() {
   if (this.props.onMessageSend && this.props.onMessageSend(this._getValue())) {
    this._typingDetector && this._typingDetector.resetState();
    this._resetState();
   }
  },
  _getValue: function() {
   return aa(this.state.editorState.getCurrentContent());
  },
  focus: function() {
   this.refs.input.focus();
  },
  render: function() {
   return s.createElement("div", {
    className: "_kmc",
    onClick: this.focus
   }, s.createElement(g, {
    editorState: this.state.editorState,
    handleBeforeInput: this._handleBeforeInput,
    handleReturn: this._handleReturn,
    onChange: this._onChange,
    placeholder: y._("Type a message..."),
    ref: "input",
    spellCheck: true
   }));
  },
  _initEditorState: function(ka) {
   var la = this._getDecorator();
   return l.moveFocusToEnd(l.set(ka, {
    decorator: la
   }));
  },
  _getDecorator: function() {
   return new i([ new j(z(function(ka) {
    return ka.getType() === ia;
   }), m) ]);
  },
  _handleBeforeInput: function(ka) {
   var la = ba(this.state.editorState, ka);
   if (la === this.state.editorState) return false;
   this.setState({
    editorState: la
   });
   return true;
  }
 });
 e.exports = ja;
}, null);

__d("MessengerHotLikeButton.react", [ "Link.react", "MercurySourceType", "MessengerHotLikePreviewEvents", "MessengerHotLikeUtils", "ReactComponentWithPureRenderMixin", "React", "StickerConstants", "throttle", "MercuryMessageObject" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var o = b("MercuryMessageObject").get(), p = l, q = p.PropTypes, r = l.createClass({
  displayName: "MessengerHotLikeButton",
  mixins: [ k ],
  propTypes: {
   onClick: q.func.isRequired,
   threadID: q.string,
   disabled: q.bool
  },
  render: function() {
   return l.createElement(g, {
    className: this.props.className,
    disabled: this.props.disabled,
    onMouseDown: n(this._handleMouseDown, 300),
    onMouseUp: n(this._handleMouseUp, 300)
   }, l.createElement("i", {
    style: {
     opacity: 0,
     backgroundImage: "url(" + j.getPreviewURI() + ")"
    }
   }));
  },
  _handleClick: function(s) {
   setTimeout(function() {
    return this.props.onClick(s);
   }.bind(this), 301);
  },
  _handleMouseDown: function(s) {
   if (this.props.disabled || this._pressedSince) {
    s.preventDefault();
    s.stopPropagation();
   }
   if (!this.props.threadID) return;
   this._pressedSince = Date.now();
   this._informPreviewStart();
   this._preparePop();
  },
  _handleMouseUp: function() {
   if (!this.props.threadID) {
    this._handleClick(j.getStickerIDForTime(1));
    return;
   }
   if (!this._pressedSince) return;
   var s = Date.now() - this._pressedSince;
   this._pressedSince = 0;
   var t = j.getStickerIDForTime(s);
   this._cancelPop();
   this._informPreviewStop(s);
   if (t) this._handleClick(t);
  },
  _informPreviewStart: function() {
   i.emit(i.START, this._getFakeMessage());
  },
  _informPreviewStop: function(s) {
   i.emit(i.STOP);
  },
  _informPreviewPop: function() {
   i.emit(i.POP);
  },
  _getFakeMessage: function() {
   var s = o.constructStickerMessageObject(m.HOT_LIKE_SMALL_STICKER_ID, h.MESSENGER_WEB, this.props.threadID);
   o.normalizeNewMessage(s);
   s.is_like_preview = true;
   s.like_preview_since = this._pressedSince;
   return s;
  },
  _preparePop: function() {
   this._cancelPop();
   this._popTimeout = setTimeout(this._informPreviewPop, j.SizeTimes.large);
  },
  _cancelPop: function() {
   clearTimeout(this._popTimeout);
  }
 });
 e.exports = r;
}, null);

__d("MessengerRecorderCommandType", [], function(a, b, c, d, e, f) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var g = {
  INIT: "init",
  RECORD: "record",
  EXPORT_WAV: "export_wav",
  GET_BUFFER: "get_buffer",
  CLEAR: "clear"
 };
 e.exports = g;
}, null);

__d("MessengerRecorder", [ "MessengerRecorderCommandType", "MessengerRecorderWorkerResource", "WebWorker" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 var j = window.AudioContext || window.webkitAudioContext;
 function k(l) {
  "use strict";
  var m = new j(), n = m.createMediaStreamSource(l), o = 4096, p = n.context;
  this.$MessengerRecorder0 = (p.createScriptProcessor || p.createJavaScriptNode).call(p, o, 2, 2);
  this.$MessengerRecorder1 = new i(h).setMessageHandler(function(q) {
   this.$MessengerRecorder2(q);
  }.bind(this)).execute().postMessage({
   command: g.INIT,
   config: {
    sampleRate: p.sampleRate
   }
  });
  this.$MessengerRecorder3 = false, this.$MessengerRecorder0.onaudioprocess = this.$MessengerRecorder4.bind(this);
  n.connect(this.$MessengerRecorder0);
  this.$MessengerRecorder0.connect(p.destination);
 }
 k.prototype.$MessengerRecorder4 = function(l) {
  "use strict";
  if (!this.$MessengerRecorder3) return;
  this.$MessengerRecorder1.postMessage({
   command: g.RECORD,
   buffer: [ l.inputBuffer.getChannelData(0), l.inputBuffer.getChannelData(1) ]
  });
 };
 k.prototype.record = function() {
  "use strict";
  this.$MessengerRecorder3 = true;
 };
 k.prototype.stop = function() {
  "use strict";
  this.$MessengerRecorder3 = false;
 };
 k.prototype.clear = function() {
  "use strict";
  this.$MessengerRecorder1.postMessage({
   command: g.CLEAR
  });
 };
 k.prototype.getBuffer = function() {
  "use strict";
  this.$MessengerRecorder1.postMessage({
   command: g.GET_BUFFER
  });
 };
 k.prototype.exportWAV = function(l) {
  "use strict";
  this.$MessengerRecorder2 = l;
  if (!this.$MessengerRecorder2) throw new Error("Callback not set");
  this.$MessengerRecorder1.postMessage({
   command: g.EXPORT_WAV,
   type: "audio/wav"
  });
 };
 e.exports = k;
}, null);

__d("MessengerVoiceClipButton.react", [ "AsyncUploadRequest", "FBRTCUserMedia", "Link.react", "MercuryAttachmentType", "MercuryConfig", "MercurySendMessageHandler", "MercurySourceType", "MercuryMessageActions", "MessengerRecorder", "PhotosUploadID", "React", "SubscriptionsHandler", "cx" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var t = q.createClass({
  displayName: "MessengerVoiceClipButton",
  getInitialState: function() {
   return {
    recording: false
   };
  },
  componentDidMount: function() {
   this._sendMessageHandler = l.getForFBID(this.props.viewer);
   this._messageActions = n.getForFBID(this.props.viewer);
   this._subscriptionsHandler = new r();
  },
  componentWillUnmount: function() {
   this._subscriptionsHandler.release();
  },
  render: function() {
   return q.createElement(i, {
    className: "_4rv7" + (this.state.recording ? " " + "_5jhb" : ""),
    onClick: this._toggleRecording
   });
  },
  _initializeRecorder: function(u) {
   h.addListener("streamReady", function(v) {
    this._onSuccess(v, u);
   }.bind(this));
   h.addListener("accessDenied", function() {});
   h.addListener("accessFailed", function() {});
   h.requestUserMedia(h.STREAM_TYPE.NO_VIDEO);
  },
  _onSuccess: function(u, v) {
   this._recorder = new o(u);
   this._initialized = true;
   v();
  },
  _record: function() {
   this._recorder.record();
   this.setState({
    recording: true
   });
  },
  _toggleRecording: function() {
   if (!this.state.recording) {
    if (!this._initialized) {
     this._initializeRecorder(this._record.bind(this));
    } else this._record();
   } else {
    this._recorder.stop();
    this._recorder && this._recorder.exportWAV(function(u) {
     return this._sendVoiceClip(u);
    }.bind(this));
    this._recorder.clear();
    this.setState({
     recording: false
    });
   }
  },
  _sendVoiceClip: function(u) {
   var v = "upload_" + p.getNewID();
   this._sendMessageHandler.sendAttachment(this.props.threadID, this._getServerRequestObject(v), m.MESSENGER_WEB);
   var w = {};
   w[v] = u;
   var x = new g(k.upload_url).setAllowCrossOrigin(true).setRelativeTo(q.findDOMNode(this)).setData({
    voice_clip: true
   }).setFiles(w);
   this._subscriptionsHandler.addSubscriptions(x.subscribe("success", function(y, z) {
    return this._onFileUploadSuccess(z);
   }.bind(this)));
   x.send();
  },
  _getServerRequestObject: function(u) {
   return {
    upload_id: u,
    preview_attachments: [ {
     upload_id: u,
     attach_type: j.PHOTO,
     preview_uploading: true
    } ]
   };
  },
  _onFileUploadSuccess: function(u) {
   var v = u.getName(), w = u.getResponse().payload.metadata[0].audio_id;
   this._messageActions.confirmAttachmentPlaceholder(v, {
    upload_id: v,
    audio_ids: [ w ]
   });
  }
 });
 e.exports = t;
}, null);

__d("MessengerComposer.react", [ "MessengerStickerButton.react", "ChatPhotoUploader.react", "DOMDimensions", "EmoticonsList", "ImmutableObject", "Layout.react", "Link.react", "MercuryIDs", "MercuryParticipants", "MessengerConfig", "MessengerInput.react", "MessengerView", "MessengerHotLikeButton.react", "P2PSendMoneyButton.react", "MessengerVoiceClipButton.react", "ReactComponentWithPureRenderMixin", "React", "Style", "cx" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var z = w, aa = z.PropTypes, ba = l.Column, ca = l.FillColumn, da = w.createClass({
  displayName: "MessengerComposer",
  mixins: [ v ],
  propTypes: {
   onMessageSend: aa.func,
   onPhotoUploadComplete: aa.func,
   onPhotoUploadCancel: aa.func,
   onPhotoUploadFail: aa.func,
   onPhotoUploadSubmit: aa.func,
   onResize: aa.func,
   onStickerSelect: aa.func,
   threadID: aa.string,
   view: aa.string,
   viewer: aa.string
  },
  getInitialState: function() {
   return {
    disabled: false,
    participant: null
   };
  },
  componentDidMount: function() {
   this._adjustRightColumnDimensions();
   if (this.props.threadID) this.setParticipant(this.props.threadID);
  },
  componentDidUpdate: function(ea) {
   this._adjustRightColumnDimensions();
  },
  componentWillReceiveProps: function(ea) {
   this.setState({
    disabled: !ea.threadID && ea.view !== r.DETAIL.COMPOSE,
    participant: null
   });
   if (ea.threadID && ea.threadID !== this.props.threadID) this.setParticipant(ea.threadID);
  },
  setParticipant: function(ea) {
   var fa = n.getUserIDFromThreadID(ea);
   if (fa) {
    var ga = n.getParticipantIDFromUserID(fa);
    o.get(ga, function(ha) {
     if (ga === ha.id) {
      ha = k.set(ha, {
       userId: fa
      });
      this.setState({
       participant: ha
      });
     }
    }.bind(this));
   }
  },
  render: function() {
   return w.createElement("div", {
    className: "_4rv3"
   }, w.createElement(l, {
    className: "_5irm"
   }, w.createElement(ca, null, w.createElement(q, {
    ref: "input",
    onResize: this.props.onResize,
    onMessageSend: this.props.onMessageSend,
    threadID: this.props.view === r.DETAIL.COMPOSE ? null : this.props.threadID,
    viewer: this.props.viewer
   })), w.createElement(ba, {
    ref: "buttonsColumn"
   }, w.createElement("ul", {
    ref: "buttonsContainer",
    className: "_4rv4 _5vn4"
   }, this._renderQuickCamTrigger(), w.createElement("li", null, w.createElement(h, {
    disabled: !this.props.threadID,
    imageClassName: "_5vn8",
    imagesOnly: false,
    linkClassName: (!this.props.threadID ? "_5432" : "") + (!this.state.disabled ? " " + "_30yy" : ""),
    onAllUploadsComplete: this.props.onPhotoUploadComplete,
    onLastUploadFail: this.props.onPhotoUploadFail,
    onLastUploadCancel: this.props.onPhotoUploadCancel,
    onSubmit: this.props.onPhotoUploadSubmit
   })), w.createElement("li", null, w.createElement(g, {
    className: (!this.state.disabled ? "_30yy" : "") + (" " + "_4rv6") + (this.state.disabled ? " " + "_5432" : ""),
    disabled: this.state.disabled,
    flyoutAlignment: "right",
    flyoutClassName: "_293j",
    flyoutWidth: 285,
    onStickerSelect: this.props.onStickerSelect,
    onEmoticonSelect: this._handleEmoticonSelect,
    onFlyoutHidden: this._focusInput
   })), this._renderAudioClipTrigger(), this._renderP2PSendMoneyButton(), w.createElement("li", null, w.createElement(s, {
    className: "_4rv9" + (!this.state.disabled ? " " + "_30yy" : "") + (this.state.disabled ? " " + "_5433" : ""),
    disabled: this.state.disabled,
    onClick: this.props.onStickerSelect,
    threadID: this.props.threadID
   }))))));
  },
  _handleEmoticonSelect: function(ea) {
   var fa = j.symbols[ea];
   if (!fa) return;
   this.refs.input.insertEmoticon(fa);
  },
  _focusInput: function() {
   this.refs.input.focus();
  },
  _renderP2PSendMoneyButton: function() {
   var ea = this.state.participant;
   if (p.P2PEnabled && ea) return w.createElement("li", {
    className: "_25pc _30yy"
   }, w.createElement(t, {
    theme: "messenger",
    disabled: !ea.orion_eligible,
    receiver: ea
   }));
   return null;
  },
  _renderQuickCamTrigger: function() {
   if (p.ComposerShowQuickCam) return w.createElement("li", null, w.createElement(m, {
    className: "_4rv5"
   }));
   return null;
  },
  _renderAudioClipTrigger: function() {
   if (p.ComposerShowAudioClip) return w.createElement("li", null, w.createElement(u, {
    threadID: this.props.threadID,
    viewer: this.props.viewer
   }));
   return null;
  },
  _adjustRightColumnDimensions: function() {
   var ea = i.getElementDimensions(w.findDOMNode(this.refs.buttonsContainer)).width;
   x.set(w.findDOMNode(this.refs.buttonsColumn), "width", ea + "px");
  }
 });
 e.exports = da;
}, null);

__d("MessengerComposerContainer.react", [ "immutable", "MercuryIDs", "MercuryLocalIDs", "MercuryMessageActions", "MercuryMessageObject", "MercurySourceType", "MercuryThreads", "MessengerActions", "MessengerComposer.react", "MessengerView", "ReactComponentWithPureRenderMixin", "React" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var s = r, t = s.PropTypes, u = r.createClass({
  displayName: "MessengerComposerContainer",
  mixins: [ q ],
  propTypes: {
   onResize: t.func,
   recipients: t.instanceOf(g.List),
   threadID: t.string,
   view: t.string,
   viewer: t.string
  },
  componentWillMount: function() {
   this._messageActions = j.getForFBID(this.props.viewer);
   this._threads = m.getForFBID(this.props.viewer);
   this._messageBuilder = k.getForFBID(this.props.viewer);
  },
  render: function() {
   return r.createElement(o, {
    onMessageSend: this._handleMessageSend,
    onPhotoUploadComplete: this._handlePhotoUploadComplete,
    onPhotoUploadCancel: this._handlePhotoUploadCancel,
    onPhotoUploadFail: this._handlePhotoUploadFail,
    onPhotoUploadSubmit: this._handlePhotoUploadSubmit,
    onResize: this.props.onResize,
    onStickerSelect: this._handleStickerSelect,
    threadID: this.props.threadID,
    view: this.props.view,
    viewer: this.props.viewer
   });
  },
  _handleMessageSend: function(v) {
   return this._sendMessage(function(w) {
    return this._messageBuilder.constructUserGeneratedMessageObject(v, l.MESSENGER_WEB, w);
   }.bind(this));
  },
  _handlePhotoUploadCancel: function(v, w) {
   this._messageActions.cancelAttachmentPlaceholder(w.upload_id, w);
  },
  _handlePhotoUploadComplete: function(v, w) {
   this._messageActions.confirmAttachmentPlaceholder(w.upload_id, w);
  },
  _handlePhotoUploadFail: function(v, w) {
   this._messageActions.cancelAttachmentPlaceholder(w.upload_id, w);
  },
  _handlePhotoUploadSubmit: function(v, w) {
   return this._sendMessage(function(x) {
    return this._messageBuilder.constructAttachmentMessageObject(l.MESSENGER_WEB, x);
   }.bind(this), function(x) {
    this._messageActions.addAttachmentPlaceholder(x, w.upload_id, w);
   }.bind(this));
  },
  _handleStickerSelect: function(v) {
   return this._sendMessage(function(w) {
    return this._messageBuilder.constructStickerMessageObject(v, l.MESSENGER_WEB, w);
   }.bind(this));
  },
  _sendMessage: function(v, w) {
   var x = this.props.threadID, y = this.props.recipients, z = false;
   if (!x && y && y.size > 1) {
    x = i.generateThreadID();
    z = true;
   }
   if (!x) return false;
   var aa = v(x);
   if (z) {
    var ba = y.map(function(ca) {
     return h.getParticipantIDFromUserID(ca.getUniqueID());
    }).toArray();
    this._threads.createNewLocalThread(x, ba);
    aa.message_id = h.tokenize(x).value;
    aa.specific_to_list = ba;
   }
   if (w) {
    w(aa);
   } else this._messageActions.send(aa);
   if (this.props.view === p.DETAIL.COMPOSE) n.selectThread(x);
   return true;
  }
 });
 e.exports = u;
}, null);

__d("MessengerDateBreak.react", [ "React", "cx", "formatDate", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 var k = g, l = k.PropTypes, m = g.createClass({
  displayName: "MessengerDateBreak",
  propTypes: {
   date: l.instanceOf(Date).isRequired
  },
  shouldComponentUpdate: function(n) {
   return this.props.date.getTime() !== n.date.getTime();
  },
  render: function() {
   var n = i(this.props.date, {
    today: "g:ia",
    withinWeek: "D g:ia",
    thisYear: "M jS, g:ia",
    older: "m/d/Y g:ia"
   });
   return g.createElement("div", {
    className: j(this.props.className, "_497p _2lpt")
   }, n);
  }
 });
 e.exports = m;
}, null);

__d("MessengerLogMessageBody.react", [ "immutable", "ImmutableObject", "MercuryIDs", "MercuryParticipants", "MercuryLogMessageType", "ReactComponentWithPureRenderMixin", "React", "StoreAndPropBasedStateMixin", "fbt" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
 b.__markCompiled && b.__markCompiled();
 var p = m, q = p.PropTypes, r = m.createClass({
  displayName: "MessengerLogMessageBody",
  _viewer: "",
  mixins: [ l, n(j) ],
  propTypes: {
   message: q.instanceOf(h).isRequired,
   viewer: q.string.isRequired
  },
  statics: {
   calculateState: function(s) {
    var t = [];
    if (s.message.log_message_data) t = s.message.log_message_data.added_participants || s.message.log_message_data.removed_participants;
    if (!t || !t.length) return {};
    var u = g.Map().withMutations(function(v) {
     t.forEach(function(w) {
      v.set(w, j.getOrFetch(w) || {});
     });
    });
    return {
     extraParticipants: u
    };
   }
  },
  render: function() {
   this._viewer = i.getParticipantIDFromUserID(this.props.viewer);
   if (this._viewer !== this.props.message.author) return null;
   switch (this.props.message.log_message_type) {
   case k.SUBSCRIBE:
    return m.createElement("span", null, this._renderSubscribeMessage(this.props.message));

   case k.UNSUBSCRIBE:
    return m.createElement("span", null, this._renderUnsubscribeMessage(this.props.message));

   case k.THREAD_NAME:
    var s = this.props.message.log_message_data;
    if (!s.name) return m.createElement("span", null, o._("You removed the group name."));
    return m.createElement("span", null, o._("You named the group {the new name of the group}.", [ o.param("the new name of the group", s.name) ]));

   case k.THREAD_IMAGE:
    return m.createElement("span", null, o._("You changed the group photo."));

   default:
    return null;
   }
  },
  _renderSubscribeMessage: function(s) {
   var t = this._moveCurrentUserToFront(s.log_message_data.added_participants), u = this.state.extraParticipants;
   switch (t.length) {
   case 1:
    return o._("You added {subscriber1}.", [ o.param("subscriber1", u.get(t[0]).name) ]);

   case 2:
    return o._("You added {subscriber1} and {subscriber2}.", [ o.param("subscriber1", u.get(t[0]).name), o.param("subscriber2", u.get(t[1]).name) ]);

   case 3:
    return o._("You added {subscriber1}, {subscriber2} and {subscriber3}.", [ o.param("subscriber1", u.get(t[0]).name), o.param("subscriber2", u.get(t[1]).name), o.param("subscriber3", u.get(t[2]).name) ]);

   default:
    var v = t.map(function(w) {
     return u.get(w);
    });
    return o._("You added {subscriber1}, {subscriber2} and {num} other people.", [ o.param("subscriber1", v[0].name), o.param("subscriber2", v[1].name), o.param("num", v.slice(2).length) ]);
   }
  },
  _renderUnsubscribeMessage: function(s) {
   var t = this.state.extraParticipants, u = s.log_message_data.removed_participants[0], v = t.get(u);
   if (!u || u === s.author) {
    return o._("You left the conversation.");
   } else return o._("You removed {name} from the conversation.", [ o.param("name", v.name) ]);
  },
  _moveCurrentUserToFront: function(s) {
   var t = this._viewer, u = s.indexOf(t);
   if (u > 0) {
    var v = s.filter(function(w) {
     return w !== t;
    });
    return [ t ].concat(v);
   }
   return s;
  }
 });
 e.exports = r;
}, null);

__d("MessengerLogMessage.react", [ "ImmutableObject", "MercuryLogMessageType", "MessengerLogMessageBody.react", "React", "ReactComponentWithPureRenderMixin", "cx", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var n = j, o = n.PropTypes, p = j.createClass({
  displayName: "MessengerLogMessage",
  mixins: [ k ],
  propTypes: {
   message: o.instanceOf(g).isRequired,
   viewer: o.string.isRequired
  },
  render: function() {
   return j.createElement("div", {
    className: this._computeClass()
   }, j.createElement("i", {
    className: "_uwa"
   }), this.props.message.log_message_body || j.createElement(i, {
    message: this.props.message,
    viewer: this.props.viewer
   }));
  },
  _computeClass: function() {
   var q, r = this.props.message, s = r.log_message_type === h.UNSUBSCRIBE && r.log_message_data.removed_participants.indexOf(r.author) !== -1, t = this.props.viewer;
   switch (r.log_message_type) {
   case h.SUBSCRIBE:
    q = "_uwb";
    break;

   case h.UNSUBSCRIBE:
    q = s ? "_uwc" : "_uwe";
    break;

   case h.PHONE_CALL:
    q = r.log_message_data.caller.indexOf(t) !== -1 ? "_uwf" : "_uwg";
    break;

   case h.VIDEO_CALL:
    q = r.log_message_data.caller.indexOf(t) !== -1 ? "_uwh" : "_uwi";
    break;

   case h.THREAD_NAME:
    q = "_uwj";
    break;

   case h.THREAD_IMAGE:
    q = "_uwk";
    break;

   case h.SERVER_ERROR:
    q = "_uwl";
    break;

   case h.LIVE_LISTEN:
    q = "_uwm";
    break;

   case h.WALLPAPER:
    q = "_uwn";
    break;

   case h.ORION:
    q = "_uwo";
    break;

   case h.SWITCH_TO_WORK:
    q = "_uwp";
    break;

   case h.PAGE_REPLY:
    q = "_uwq";
    break;
   }
   return m("_497p" + ((r.log_message_type === h.PHONE_CALL || r.log_message_type === h.VIDEO_CALL) && !r.log_message_data.answered ? " " + "_3no3" : ""), q);
  }
 });
 e.exports = p;
}, null);

__d("MessengerBubble.react", [ "immutable", "MercuryMessageBody.react", "ReactComponentWithPureRenderMixin", "React", "cx", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j, k, l) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var m = j, n = m.PropTypes, o = j.createClass({
  displayName: "MessengerBubble",
  mixins: [ i ],
  propTypes: {
   attachments: n.instanceOf(g.List),
   body: n.string,
   isLinkShareAttachment: n.bool,
   isVoiceClipAttachment: n.bool,
   onClick: n.func,
   ranges: n.array
  },
  render: function() {
   return j.createElement("div", {
    className: l(this.props.className, "_hh7" + (" " + "_52mr") + (this.props.isLinkShareAttachment ? " " + "_5vdi" : "") + (this.props.isVoiceClipAttachment ? " " + "_1fz8" : "")),
    onClick: this.props.onClick
   }, j.createElement(h, {
    body: this.props.body,
    ranges: this.props.ranges
   }), this.props.attachments);
  }
 });
 e.exports = o;
}, null);

__d("MessengerContextualActions.react", [ "ContextualLayerUpdateOnScroll", "LayerHideOnBlur", "Link.react", "React", "ReactAbstractContextualDialog", "ReactLayer", "cx" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var n = j, o = n.PropTypes, p = l.createClass(k.createSpec({
  displayName: "MessengerContextualActionsDialog",
  theme: {
   wrapperClassName: "_hw2",
   arrowDimensions: {
    offset: 12,
    length: 12
   }
  }
 })), q = j.createClass({
  displayName: "MessengerContextualActions",
  propTypes: {
   onToggle: o.func
  },
  render: function() {
   var s = this.props, t = s.children, u = function(v, w) {
    var x = {}, y = Object.prototype.hasOwnProperty;
    if (v == null) throw new TypeError();
    for (var z in v) if (y.call(v, z) && !y.call(w, z)) x[z] = v[z];
    return x;
   }(s, {
    children: 1
   });
   return j.createElement(p, j.__spread({}, u, {
    alignment: "center",
    behaviors: {
     ContextualLayerUpdateOnScroll: g,
     LayerHideOnBlur: h
    },
    onToggle: this.props.onToggle
   }), j.createElement("ul", {
    className: "_hw3"
   }, t));
  }
 }), r = j.createClass({
  displayName: "MessengerContextualActionsItem",
  propTypes: {
   onClick: o.func
  },
  render: function() {
   return j.createElement("li", {
    className: "_hw4"
   }, j.createElement(i, {
    className: "_hw5",
    onClick: this.props.onClick
   }, this.props.children));
  }
 });
 q.Item = r;
 e.exports = q;
}, null);

__d("MessengerDeleteMessageDialog.react", [ "MessengerDialog.react", "MessengerDialogBody.react", "MessengerDialogButton.react", "MessengerDialogFooter.react", "MessengerDialogHeader.react", "ReactComponentWithPureRenderMixin", "React", "fbt" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var o = m, p = o.PropTypes, q = m.createClass({
  displayName: "MessengerDeleteMessageDialog",
  mixins: [ l ],
  propTypes: {
   onDelete: p.func,
   onToggle: p.func
  },
  render: function() {
   return m.createElement(g, {
    onToggle: this.props.onToggle
   }, m.createElement(k, null, n._("Delete Message")), m.createElement(h, null, n._("Are you sure you want to delete this message?")), m.createElement(j, null, m.createElement(i, {
    action: "cancel",
    label: n._("Cancel"),
    type: "secondary"
   }), m.createElement(i, {
    label: n._("Delete"),
    onClick: this._handleDelete,
    type: "primary",
    use: "danger"
   })));
  },
  _handleDelete: function() {
   this.props.onToggle && this.props.onToggle(false);
   this.props.onDelete && this.props.onDelete();
  }
 });
 e.exports = q;
}, null);

__d("MessengerMessageActionsWrapper.react", [ "DOMQuery", "ImmutableObject", "ReactLayeredComponentMixin", "MercuryMessageActions", "MercuryMessageInfo", "MessengerActions", "MessengerContextualActions.react", "MessengerDeleteMessageDialog.react", "Parent", "React", "csx", "cx", "fbt" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var t = m.Item, u = p, v = u.PropTypes, w = "_ui9", x = "._ui9", y = p.createClass({
  displayName: "MessengerMessageActionsWrapper",
  mixins: [ i ],
  propTypes: {
   isActive: v.bool,
   message: v.instanceOf(h).isRequired,
   onDeselect: v.func.isRequired,
   onSelect: v.func.isRequired
  },
  _messageActions: null,
  componentWillMount: function() {
   this._messageActions = j.get();
  },
  render: function() {
   return p.createElement("div", p.__spread({
    onContextMenu: this._handleContextMenu
   }, this.props), this.props.children);
  },
  renderLayers: function() {
   var z = p.findDOMNode(this), aa = z && g.scry(z, x)[0];
   if (!aa) return {};
   return {
    contextualDialog: p.createElement(m, {
     context: aa,
     onToggle: this._handleActionsToggle,
     shown: this.props.isActive
    }, this._renderRetry(), p.createElement(t, {
     onClick: this._handleDelete
    }, s._("Delete")))
   };
  },
  _renderRetry: function() {
   if (!k.hasError(this.props.message)) return null;
   return p.createElement(t, {
    onClick: this._handleRetry
   }, s._("Try Again"));
  },
  _handleActionsToggle: function(z) {
   !z && this._handleDeselect();
  },
  _handleDeselect: function() {
   this.props.onDeselect(this.props.message.message_id);
  },
  _handleDelete: function() {
   var z = this.props.message;
   l.showDialog(n, {
    onDelete: function() {
     this._messageActions && this._messageActions["delete"](z.thread_id, [ z.message_id ]);
    }.bind(this),
    onToggle: this._handleDialogToggle
   });
  },
  _handleDialogToggle: function(z) {
   if (!z) l.hideDialog();
  },
  _handleRetry: function() {
   this._handleDeselect();
   this._messageActions && this._messageActions.resend(this.props.message);
  },
  _handleContextMenu: function(z) {
   if (o.byClass(z.target, w)) {
    z.preventDefault();
    this.props.onSelect(this.props.message.message_id);
   }
  }
 });
 e.exports = y;
}, null);

__d("MessengerMessageSeenHeads.react", [ "Image.react", "immutable", "ImmutableObject", "MercuryMessageInfo", "MessengerConfig", "ReactComponentWithPureRenderMixin", "React", "cx", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var p = m, q = p.PropTypes, r = k.MaxSeenHeadCount || 8, s = m.createClass({
  displayName: "MessengerMessageSeenHeads",
  mixins: [ l ],
  propTypes: {
   message: q.instanceOf(i).isRequired,
   nextTimestamp: q.number.isRequired,
   participants: q.instanceOf(h.Map).isRequired,
   readReceipts: q.instanceOf(h.OrderedMap).isRequired
  },
  render: function() {
   var t = this.props, u = t.message, v = t.nextTimestamp, w = t.participants, x = t.readReceipts;
   if (j.isSending(u) || x.isEmpty()) return null;
   var y = h.Seq(x).filter(function(ca, da) {
    return ca >= u.timestamp && ca < v;
   }), z = y.slice(0, r).map(function(ca, da) {
    var ea = w.get(da);
    if (!ea) return null;
    return m.createElement(g, {
     className: "_jf2",
     key: da,
     src: ea.image_src,
     title: ea.name
    });
   }).toArray(), aa = z.length;
   if (!aa) return null;
   var ba = y.slice(r).count();
   if (ba > 0) z.unshift(m.createElement("span", {
    className: "_jf3",
    key: "overflow"
   }, "+" + ba));
   return m.createElement("span", {
    className: o(this.props.className, "_jf4" + (aa === 1 ? " " + "_jf5" : ""))
   }, z);
  }
 });
 e.exports = s;
}, null);

__d("MessengerMessage.react", [ "immutable", "ImmutableObject", "MercuryErrorInfo", "MercuryMessageInfo", "MessengerAttachmentRenderer", "MessengerBubble.react", "MessengerConfig", "MessengerMessageActionsWrapper.react", "MessengerMessageSeenHeads.react", "React", "cx", "fbt", "isRTL" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var t = p, u = t.PropTypes, v = p.createClass({
  displayName: "MessengerMessage",
  propTypes: {
   isActive: u.bool,
   isFromViewer: u.bool,
   message: u.instanceOf(h).isRequired,
   nextTimestamp: u.number.isRequired,
   onDeselect: u.func.isRequired,
   onSelect: u.func.isRequired,
   participants: u.instanceOf(g.Map).isRequired,
   readReceipts: u.instanceOf(g.OrderedMap).isRequired,
   showDeliveryState: u.bool
  },
  shouldComponentUpdate: function(w, x) {
   return w.isActive !== this.props.isActive || w.isFromViewer !== this.props.isFromViewer || w.message !== this.props.message || w.nextTimestamp !== this.props.nextTimestamp || w.showDeliveryState !== this.props.showDeliveryState || !g.is(w.readReceipts, this.props.readReceipts) || !g.is(w.participants, this.props.participants);
  },
  render: function() {
   var w = s(this.props.message.body || "");
   return p.createElement(n, {
    className: "_o46" + (" " + "_3erg") + (this.props.isActive ? " " + "_-5k" : "") + (this.props.isFromViewer ? " " + "_3i_m" : "") + (this.props.isFromViewer ? " " + "_nd_" : "") + (!this.props.isFromViewer ? " " + "_29_7" : "") + (!w ? " " + "direction_ltr" : "") + (w ? " " + "direction_rtl" : "") + (!w ? " " + "text_align_ltr" : "") + (w ? " " + "text_align_rtl" : ""),
    isActive: this.props.isActive,
    message: this.props.message,
    onDeselect: this.props.onDeselect,
    onSelect: this.props.onSelect
   }, p.createElement("div", {
    className: "clearfix"
   }, this._renderBubble(), this._renderAttachmentsOutsideBubble()), this._renderErrorState(), this._renderDeliveryState(), p.createElement(o, {
    className: "_4jzq",
    message: this.props.message,
    nextTimestamp: this.props.nextTimestamp,
    participants: this.props.participants,
    readReceipts: this.props.readReceipts
   }));
  },
  _renderAttachmentsOutsideBubble: function() {
   var w = k.getAttachmentsOutsideBubble(this.props.message);
   if (!w || !w.length) return null;
   return p.createElement("div", {
    className: "_3058 _15gf"
   }, w);
  },
  _isLinkShareAttachment: function() {
   return k.isLinkShareAttachment(this.props.message);
  },
  _isVoiceClipAttachment: function() {
   return k.isVoiceClipAttachment(this.props.message);
  },
  _renderBubble: function() {
   var w = this.props.message, x = g.List(k.getAttachmentsInsideBubble(w));
   if (w.body || !x.isEmpty()) return p.createElement(l, {
    attachments: x,
    body: w.body,
    className: "_3058 _ui9",
    isLinkShareAttachment: this._isLinkShareAttachment(),
    isVoiceClipAttachment: this._isVoiceClipAttachment(),
    ranges: w.ranges
   });
   return null;
  },
  _renderDeliveryState: function() {
   if (!this.props.isFromViewer || !this.props.showDeliveryState || this.props.message.is_like_preview) return null;
   var w = j.isSending(this.props.message), x = i.hasErrorStatus(this.props.message);
   if (!w && !x && !m.DeliveryStateGK) return null;
   return p.createElement("span", {
    className: "_2her" + (w ? " " + "_4jzp" : "") + (w ? " " + "_3qh2" : "") + (!w && !x ? " " + "_3zzf" : "") + (x ? " " + "_5ei9" : ""),
    onClick: x ? this._handleSelect : null
   });
  },
  _renderErrorState: function() {
   var w = this.props, x = w.message;
   if (!j.hasError(x)) return null;
   return p.createElement("span", {
    className: "_3058 _2ygi",
    onClick: this._handleSelect
   }, r._("Message couldn't send."));
  },
  _handleSelect: function(w) {
   w.stopPropagation();
   this.props.onSelect(this.props.message.message_id);
  }
 });
 e.exports = v;
}, null);

__d("MessengerMessageGroup.react", [ "immutable", "ImmutableObject", "Image.react", "MercuryParticipants", "MessengerDateBreak.react", "MessengerMessage.react", "MessengerProfileImageWrapper.react", "MessengerStickerUtils", "React", "StoreAndPropBasedStateMixin", "cx" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var r = o, s = r.PropTypes, t = 32, u = new h({
  image_src: "",
  is_messenger_user: true
 }), v = o.createClass({
  displayName: "MessengerMessageGroup",
  mixins: [ p(j) ],
  propTypes: {
   activeMessageID: s.string,
   hasDateBreak: s.bool,
   isCanonical: s.bool,
   isFromViewer: s.bool,
   lastReadTimestamp: s.number.isRequired,
   messages: s.instanceOf(g.List).isRequired,
   nextTimestamp: s.number.isRequired,
   onMessageDeselect: s.func.isRequired,
   onMessageSelect: s.func.isRequired,
   readReceipts: s.instanceOf(g.OrderedMap).isRequired
  },
  statics: {
   calculateState: function(x) {
    return {
     participants: w(x)
    };
   }
  },
  shouldComponentUpdate: function(x, y) {
   return this.props.activeMessageID !== x.activeMessageID || this.props.isFromViewer !== x.isFromViewer || !g.is(this.props.messages, x.messages) || !g.is(this.props.readReceipts, x.readReceipts) || !g.is(this.state.participants, y.participants);
  },
  render: function() {
   return o.createElement("div", {
    className: "_1t_p" + (" " + "clearfix") + (n.isStickerMessageGroup(this.props.messages) ? " " + "_5tx1" : "")
   }, this._renderProfileColumn(), this._renderName(), o.createElement("div", {
    className: "_1t_s"
   }, this._renderMessages()));
  },
  _renderProfileColumn: function() {
   if (this.props.isFromViewer) return null;
   var x = this.props.messages.first().author, y = this.state.participants.get(x) || u;
   return o.createElement("div", {
    className: "_1t_q"
   }, o.createElement(m, {
    className: "_1t_r",
    isMessengerUser: y.is_messenger_user,
    size: t,
    showBadge: true
   }, o.createElement(i, {
    src: y.image_src,
    height: t,
    width: t
   })));
  },
  _renderMessages: function() {
   var x = this.props.messages.size, y = [];
   this.props.messages.forEach(function(z, aa, ba) {
    var ca = z.message_id === this.props.activeMessageID;
    if (ca && !(aa === 0 && this.props.hasDateBreak)) y.push(o.createElement(k, {
     className: "_5r8z",
     date: new Date(z.timestamp),
     key: "db:" + z.message_id
    }));
    y.push(o.createElement(l, {
     isActive: ca,
     isFromViewer: this.props.isFromViewer,
     key: z.message_id,
     message: z,
     participants: this.state.participants,
     nextTimestamp: this._getNextTimestamp(ba, x, aa),
     onDeselect: this.props.onMessageDeselect,
     onSelect: this.props.onMessageSelect,
     readReceipts: this.props.readReceipts,
     showDeliveryState: z.timestamp > this.props.lastReadTimestamp
    }));
   }.bind(this));
   return y;
  },
  _renderName: function() {
   if (this.props.isCanonical || this.props.isFromViewer) return null;
   var x = this.state.participants.get(this.props.messages.first().author);
   if (!x) return null;
   return o.createElement("div", {
    className: "_ih3"
   }, x.short_name);
  },
  _getNextTimestamp: function(x, y, z) {
   return z < y - 1 ? x.get(z + 1).timestamp : this.props.nextTimestamp;
  }
 });
 function w(x) {
  var y = x.messages.first().author;
  return g.Map().withMutations(function(z) {
   x.readReceipts.forEach(function(aa, ba) {
    z.set(ba, j.getOrFetch(ba));
   });
   z.set(y, j.getOrFetch(y));
  });
 }
 e.exports = v;
}, null);

__d("MessengerMessageList.react", [ "immutable", "MercuryActionType", "MercuryIDs", "MercuryMessageGroup", "MercuryShareAttachmentRenderLocations", "MessengerDateBreak.react", "MessengerLogMessage.react", "MessengerMessageGroup.react", "ReactComponentWithPureRenderMixin", "React" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var q = p, r = q.PropTypes, s = 1e3 * 60 * 60, t = p.createClass({
  displayName: "MessengerMessageList",
  mixins: [ o ],
  propTypes: {
   isCanonical: r.bool,
   messages: r.instanceOf(g.List).isRequired,
   readReceipts: r.instanceOf(g.OrderedMap).isRequired,
   viewer: r.string.isRequired
  },
  getInitialState: function() {
   return {
    activeMessageID: null,
    messageGroups: j.calculateMessageGroups(this.props.messages, k.MESSENGER)
   };
  },
  componentWillReceiveProps: function(y) {
   if (y.messages !== this.props.messages) this.setState({
    messageGroups: j.calculateMessageGroups(y.messages, k.MESSENGER)
   });
  },
  render: function() {
   var y = [], z = this.state.activeMessageID, aa = this.state.messageGroups, ba = aa.length, ca = this.props.readReceipts, da = ca.last() || 0, ea = i.getParticipantIDFromUserID(this.props.viewer);
   for (var fa = 0; fa < ba; fa++) {
    var ga = fa > 0 ? aa[fa - 1] : null, ha = ga && ga.length > 0 ? ga[ga.length - 1] : null, ia = aa[fa], ja = ia[0], ka = false;
    if (!ha || ja.timestamp - ha.timestamp > s) {
     ka = true;
     y.push(p.createElement(l, {
      date: new Date(ja.timestamp),
      key: "db:" + ja.message_id
     }));
    }
    if (ja.action_type == h.LOG_MESSAGE) {
     y.push(p.createElement(m, {
      key: ja.message_id,
      message: ja,
      viewer: this.props.viewer
     }));
     continue;
    }
    ia = g.List(ia);
    var la = v(aa, ba, fa), ma = !x(ca, ia, la), na = w(da, ja);
    y.push(p.createElement(n, {
     activeMessageID: u(z, ia),
     hasDateBreak: ka,
     isCanonical: this.props.isCanonical,
     isFromViewer: ea === ja.author,
     key: "mg:" + ja.message_id,
     lastReadTimestamp: na,
     messages: ia,
     nextTimestamp: la,
     onMessageDeselect: this._handleMessageDeselect,
     onMessageSelect: this._handleMessageSelect,
     readReceipts: ma ? ca : g.OrderedMap()
    }));
   }
   return p.createElement("div", null, y);
  },
  _handleMessageDeselect: function(y) {
   this.setState(function(z) {
    return {
     activeMessageID: z.activeMessageID === y ? null : z.activeMessageID
    };
   });
  },
  _handleMessageSelect: function(y) {
   this.setState({
    activeMessageID: y
   });
  }
 });
 function u(y, z) {
  return z.find(function(aa) {
   return aa.message_id === y;
  }) ? y : null;
 }
 function v(y, z, aa) {
  return aa < z - 1 ? y[aa + 1][0].timestamp : Infinity;
 }
 function w(y, z) {
  return z.timestamp > y ? y : Infinity;
 }
 function x(y, z, aa) {
  return z.isEmpty() || y.last() < z.first().timestamp || y.first() >= aa;
 }
 e.exports = t;
}, null);

__d("MessengerFlexArea.react", [ "Event", "React", "Vector", "getScrollPosition", "throttle" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var l = h, m = l.PropTypes, n = h.createClass({
  displayName: "MessengerFlexArea",
  propTypes: {
   beforeResize: m.func,
   onResize: m.func
  },
  getInitialState: function() {
   return {
    height: 0
   };
  },
  componentDidMount: function() {
   this._subscription = g.listen(window, "resize", k(this.recalculateHeight, 50));
   this.recalculateHeight();
  },
  componentDidUpdate: function() {
   this.recalculateHeight();
  },
  componentWillUnmount: function() {
   this._subscription && this._subscription.remove();
  },
  render: function() {
   return h.createElement("div", {
    className: this.props.className,
    style: {
     height: this.state.height + "px"
    }
   }, this.props.children);
  },
  recalculateHeight: function() {
   var o = h.findDOMNode(this), p = o.parentNode, q = this.state.height, r = i.getViewportDimensions().y;
   r -= i.getElementPosition(p || o).y;
   var s = j(window);
   r += s.y;
   if (p) {
    Array.from(p.childNodes).forEach(function(t) {
     r -= i.getElementDimensions(t).y;
    });
    r += i.getElementDimensions(o).y;
   }
   if (isNaN(r) || r < 0) r = 0;
   if (r !== q) {
    this.props.beforeResize && this.props.beforeResize();
    this.setState({
     height: r
    }, this.props.onResize);
   }
  }
 });
 e.exports = n;
}, null);

__d("MessengerScrollableArea.react", [ "React", "ScrollableArea.react", "Style", "UserAgent", "clearImmediate", "setImmediate", "throttle" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var n = g, o = n.PropTypes, p = 20, q = g.createClass({
  displayName: "MessengerScrollableArea",
  propTypes: {
   onScroll: o.func,
   width: o.number
  },
  render: function() {
   return g.createElement(h, {
    className: this.props.className,
    onScroll: this.props.onScroll ? m(this.props.onScroll, 50) : null,
    ref: "scrollable",
    shadow: false,
    width: this.props.width
   }, this.props.children);
  },
  componentDidMount: function() {
   this._resizeCallback = l(this._resize);
  },
  componentWillUnmount: function() {
   k(this._resizeCallback);
  },
  _resize: function() {
   if (!j.isBrowser("IE")) return;
   var r = this.refs.scrollable.refs.wrap, s = this.refs.scrollable.refs.body;
   if (!s || !r) return;
   s = g.findDOMNode(s);
   r = g.findDOMNode(r);
   var t = r.offsetWidth - r.clientWidth;
   if (t > 0) i.set(s, "margin-right", -t + "px");
  },
  getArea: function() {
   return this.refs.scrollable.getArea();
  },
  scrollToBottom: function() {
   var r = this.getArea();
   if (r) this.scrollToPosition(r.getScrollHeight());
  },
  scrollToTop: function() {
   var r = this.getArea();
   if (r) this.scrollToPosition(0);
  },
  scrollToPosition: function(r) {
   var s = this.getArea();
   if (!s) return;
   s.setScrollTop(r, false);
  },
  isScrolledToBottom: function() {
   var r = this.getArea();
   if (!r) return false;
   return r.getScrollTop() + r.getClientHeight() >= r.getScrollHeight() - p;
  },
  isScrolledToTop: function() {
   var r = this.getArea();
   if (!r) return true;
   return r.getScrollTop() <= p;
  },
  getScrollTop: function() {
   var r = this.getArea();
   if (!r) return 0;
   return r.getScrollTop();
  }
 });
 e.exports = q;
}, null);

__d("MessengerFlexScrollableArea.react", [ "MessengerFlexArea.react", "MessengerScrollableArea.react", "React" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var j = i, k = j.PropTypes, l = i.createClass({
  displayName: "MessengerFlexScrollableArea",
  propTypes: {
   onScroll: k.func,
   shouldStickToBottom: k.bool
  },
  render: function() {
   return i.createElement(g, {
    beforeResize: this._prepareForResize,
    className: this.props.className,
    onResize: this._handleResize,
    ref: "flexArea"
   }, i.createElement(h, {
    height: "100%",
    onScroll: this.props.onScroll,
    ref: "scrollable"
   }, this.props.children));
  },
  getArea: function() {
   return this.refs.scrollable.getArea();
  },
  _prepareForResize: function() {
   this._wasScrolledToBottom = this.refs.scrollable.isScrolledToBottom();
  },
  _handleResize: function() {
   if (this._wasScrolledToBottom && this.props.shouldStickToBottom) {
    this.refs.scrollable.scrollToBottom();
    delete this._wasScrolledToBottom;
   }
  },
  handleResize: function() {
   this.refs.flexArea && this.refs.flexArea.recalculateHeight();
  },
  scrollToBottom: function() {
   this.refs.scrollable.scrollToBottom();
  },
  scrollToTop: function() {
   this.refs.scrollable.scrollToTop();
  },
  scrollToPosition: function(m) {
   this.refs.scrollable.scrollToPosition(m);
  },
  isScrolledToBottom: function() {
   return this.refs.scrollable.isScrolledToBottom();
  },
  isScrolledToTop: function() {
   return this.refs.scrollable.isScrolledToTop();
  },
  getScrollTop: function() {
   return this.refs.scrollable.getScrollTop();
  }
 });
 e.exports = l;
}, null);

__d("MessengerTypingIndicator.react", [ "Image.react", "immutable", "MercuryParticipants", "MessengerProfileImageWrapper.react", "MessengerBubble.react", "ReactComponentWithPureRenderMixin", "React", "StoreAndPropBasedStateMixin", "cx", "ix" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
 b.__markCompiled && b.__markCompiled();
 var q = m, r = q.PropTypes, s = 32, t = m.createClass({
  displayName: "MessengerTypingIndicator",
  mixins: [ l, n(i) ],
  propTypes: {
   userID: r.string,
   showName: r.bool
  },
  statics: {
   calculateState: function(u) {
    return {
     author: i.getOrFetch(u.userID)
    };
   }
  },
  render: function() {
   if (!this.state.author) return null;
   var u = this.state.author;
   return m.createElement("div", {
    className: "_1t_p _1hbw"
   }, m.createElement("div", {
    className: "_1t_q"
   }, m.createElement(j, {
    className: "_1t_r",
    isMessengerUser: u.is_messenger_user,
    size: s,
    showBadge: true
   }, m.createElement(g, {
    src: u.image_src,
    height: s,
    width: s
   }))), m.createElement("div", {
    className: "_1t_s"
   }, m.createElement("div", {
    className: "_o46 _3erg _29_7"
   }, m.createElement("div", {
    className: "clearfix"
   }, m.createElement(k, {
    attachments: h.List([ m.createElement(g, {
     key: "typingIndicator",
     src: p("/unpublished/images/messenger/typing.png"),
     style: {
      verticalAlign: "text-bottom"
     }
    }) ]),
    body: "",
    className: "_3058",
    ref: "bubble"
   })))));
  },
  getBubble: function() {
   return this.refs.bubble;
  }
 });
 e.exports = t;
}, null);

__d("MessengerConversation.react", [ "ChatTypingIndicators.react", "Event", "immutable", "MercuryIDs", "MercuryRoger", "MessengerMessageList.react", "MessengerFlexArea.react", "MessengerFlexScrollableArea.react", "MessengerSpinner.react", "MessengerTypingIndicator.react", "ReactComponentWithPureRenderMixin", "React", "Set", "SubscriptionsHandler", "UserActivity", "cx", "throttle" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var x = r, y = x.PropTypes, z = 1e3, aa = 20, ba = r.createClass({
  displayName: "MessengerConversation",
  mixins: [ q ],
  propTypes: {
   fetchMessages: y.func.isRequired,
   isCanonical: y.bool,
   isLoaded: y.bool,
   isLoading: y.bool,
   messages: y.instanceOf(i.List).isRequired,
   threadID: y.string,
   viewer: y.string.isRequired
  },
  getInitialState: function() {
   return {
    readReceipts: ca(this.props)
   };
  },
  componentDidMount: function() {
   this._subscriptions = new t();
   this._subscriptions.addSubscriptions(h.listen(window, "resize", w(this._handleResize, 50)), k.subscribe("change", function(ea, fa) {
    fa[this.props.threadID] && this.setState({
     readReceipts: ca(this.props)
    });
   }.bind(this)));
   this._handleResize();
   this._tryMarkAsRead();
  },
  componentWillReceiveProps: function(ea) {
   if (ea.threadID !== this.props.threadID || ea.messages !== this.props.messages) this.setState({
    readReceipts: ca(ea)
   });
  },
  componentWillUnmount: function() {
   this._subscriptions && this._subscriptions.release();
   this._removeFocusToken();
  },
  componentWillUpdate: function() {
   var ea = this._getScrollableArea();
   if (ea) {
    this._wasScrolledToBottomBeforeUpdate = this.refs.scrollable.isScrolledToBottom();
    this._originalScrollHeight = ea.getScrollHeight();
    this._originalScrollTop = ea.getScrollTop();
   } else this._wasScrolledToBottomBeforeUpdate = true;
  },
  componentDidUpdate: function(ea) {
   if (!this.refs.scrollable) return;
   if (this._wasScrolledToBottomBeforeUpdate || this.props.threadID !== ea.threadID || da(ea, this.props)) {
    this.refs.scrollable.scrollToBottom();
    this._removeFocusToken();
   } else {
    var fa = this._getScrollableArea().getScrollHeight() - this._originalScrollHeight + this._originalScrollTop;
    this.refs.scrollable.scrollToPosition(fa);
   }
   if (this.props.messages !== ea.messages) this._tryMarkAsRead();
  },
  render: function() {
   if (this.props.isLoading && this.props.messages.isEmpty()) return this._renderFullPageLoadingIndicator();
   var ea;
   return r.createElement(n, {
    className: this.props.className,
    onScroll: this._handleScroll,
    ref: "scrollable",
    shouldStickToBottom: true
   }, r.createElement("div", {
    className: "__i_"
   }, this._renderLoadingIndicator(), r.createElement(l, {
    isCanonical: this.props.isCanonical,
    messages: this.props.messages,
    readReceipts: this.state.readReceipts,
    viewer: this.props.viewer
   }), r.createElement(g, {
    indicatorClass: p,
    indicatorsWillShow: function() {
     ea = this._wasScrolledToBottomBeforeUpdate;
    }.bind(this),
    indicatorsDidShow: function() {
     ea && this.scrollToBottom();
    }.bind(this),
    rootClassName: "clearfix _17pz",
    threadID: this.props.threadID
   })));
  },
  _renderLoadingIndicator: function() {
   if (this.props.isLoaded) return null;
   return r.createElement("div", {
    className: "_2k8v"
   }, this.props.isLoading ? r.createElement(o, null) : null);
  },
  _renderFullPageLoadingIndicator: function() {
   return r.createElement(m, {
    className: "_4xu0"
   }, r.createElement(o, {
    className: "_4xu1"
   }));
  },
  handleResize: function() {
   this.refs.scrollable && this.refs.scrollable.handleResize();
  },
  scrollToBottom: function() {
   return this.refs.scrollable && this.refs.scrollable.scrollToBottom();
  },
  _handleScroll: function() {
   if (!this.refs.scrollable) return;
   if (this._getScrollableArea().getScrollTop() < aa) this.props.fetchMessages();
   this._tryMarkAsRead();
   this._wasScrolledToBottomBeforeUpdate = this.refs.scrollable.isScrolledToBottom();
  },
  _tryMarkAsRead: function() {
   if (!this.refs.scrollable || !this.refs.scrollable.isScrolledToBottom() || this.props.messages.size === 0) return;
   if (u.isActiveOnTab(z)) {
    this.props.onRead(this.props.threadID);
   } else if (!this._focusToken) {
    var ea = this.props.threadID;
    this._focusToken = h.listen(window, "focus", function() {
     this._removeFocusToken();
     if (ea == this.props.threadID && this._getScrollableArea().isScrolledToBottom()) this.props.onRead(this.props.threadID);
    }.bind(this));
   }
  },
  _handleResize: function() {
   if (this._wasScrolledToBottomBeforeUpdate) this.scrollToBottom();
  },
  _getScrollableArea: function() {
   return this.refs.scrollable && this.refs.scrollable.getArea();
  },
  _removeFocusToken: function() {
   this._focusToken && this._focusToken.remove();
   this._focusToken = null;
  }
 });
 function ca(ea) {
  var fa = k.getSeenTimestamps(ea.threadID), ga = new s(fa.keys());
  return fa.withMutations(function(ha) {
   i.Seq(ea.messages).reverse().forEach(function(ia) {
    if (ga.size === 0) return false;
    if (!ga.has(ia.author)) return;
    ha.update(ia.author, function(ja) {
     return Math.max(ja, ia.timestamp);
    });
    ga["delete"](ia.author);
   });
  });
 }
 function da(ea, fa) {
  var ga = j.getParticipantIDFromUserID(fa.viewer);
  return fa.threadID === ea.threadID && fa.messages !== ea.messages && !fa.messages.isEmpty() && fa.messages.last() !== ea.messages.last() && fa.messages.last().author === ga;
 }
 e.exports = ba;
}, null);

__d("MessengerConversationContainer.react", [ "immutable", "ImmutableObject", "MercuryIDs", "MercuryMessageStore", "MercuryThreadActions", "MessengerConversation.react", "MessengerHotLikePreviewEvents", "ReactComponentWithPureRenderMixin", "React", "SubscriptionsHandler" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var q = o, r = q.PropTypes, s = 40, t = o.createClass({
  displayName: "MessengerConversationContainer",
  mixins: [ n ],
  propTypes: {
   onRead: r.func,
   threadID: r.string,
   viewer: r.string.isRequired
  },
  getInitialState: function() {
   return {
    isLoaded: false,
    isLoading: true,
    messages: g.List()
   };
  },
  componentWillUnmount: function() {
   this._subscriptions && this._subscriptions.release();
  },
  componentDidMount: function() {
   this._threadActions = k.getForFBID(this.props.viewer);
   this._updateStore(this.props.threadID);
  },
  componentWillReceiveProps: function(u) {
   if (this.props.threadID !== u.threadID) {
    this.setState({
     isLoading: true,
     messages: g.List()
    });
    this._updateStore(u.threadID);
   }
  },
  render: function() {
   return o.createElement(l, {
    className: this.props.className,
    fetchMessages: this._fetchMoreMessages,
    isCanonical: i.isCanonical(this.props.threadID),
    isLoading: this.state.isLoading,
    isLoaded: this.state.isLoaded,
    messages: this.state.messages,
    onRead: this._handleRead,
    ref: "conversation",
    threadID: this.props.threadID,
    viewer: this.props.viewer
   });
  },
  handleResize: function() {
   this.refs.conversation.handleResize();
  },
  _handleRead: function(u) {
   this._threadActions.markRead(u);
  },
  _fetchMoreMessages: function() {
   if (this.state.isLoading || this.state.isLoaded) return;
   this.setState({
    isLoading: true
   });
   if (!this._store.fetchMoreMessages()) this.setState({
    isLoading: false,
    isLoaded: true
   });
  },
  _updateStore: function(u) {
   if (!u) return;
   this.setState({
    isLoaded: false
   });
   this._store && this._store.destroy();
   this._store = new j(u, s);
   this._subscriptions && this._subscriptions.release();
   this._subscriptions = new p();
   this._subscriptions.addSubscriptions(this._store.subscribe(function(v) {
    this.setState({
     messages: this._normalizeMessages(g.List(v.messages)),
     isLoading: false
    });
   }.bind(this)), m.addListener(m.START, function(v) {
    this._keepLikePreview = true;
    this._likePreview = new h(v);
    this.setState({
     messages: this._normalizeMessages(this.state.messages)
    });
    this._scrollToBottomInterval = setInterval(this.refs.conversation.scrollToBottom, 50);
   }.bind(this)), m.addListener(m.STOP, function() {
    this._keepLikePreview = false;
    clearInterval(this._scrollToBottomInterval);
   }.bind(this)), m.addListener(m.POP, function() {
    clearInterval(this._scrollToBottomInterval);
    this._keepLikePreview = false;
    this.setState({
     messages: this._normalizeMessages(this.state.messages)
    });
   }.bind(this)));
  },
  _normalizeMessages: function(u) {
   if (this._keepLikePreview) {
    u = u.set(u.size, this._likePreview);
   } else {
    u = u.filterNot(function(v) {
     return v.is_like_preview;
    });
    this._likePreview = null;
   }
   return u;
  }
 });
 e.exports = t;
}, null);

__d("MessengerSearchSource", [ "ChatMiniSidebarSearchSource", "MercuryIDs", "MercuryParticipants", "MercuryParticipantTypes", "MercurySingletonMixin", "MessengerConfig", "OrderedFriendsList", "SearchableEntry", "emptyFunction" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var p = 50;
 for (var q in g) if (g.hasOwnProperty(q)) s[q] = g[q];
 var r = g === null ? null : g.prototype;
 s.prototype = Object.create(r);
 s.prototype.constructor = s;
 s.__superConstructor__ = g;
 function s(t) {
  r.constructor.call(this, {
   queryRequests: [ {
    uri: "/ajax/mercury/composer_query.php"
   } ]
  });
  m.getSearchableEntries(p, function(v) {
   this.$MessengerSearchSource0 = v;
   r.addLocalEntries.call(this, v);
  }.bind(this));
  var u = h.getParticipantIDFromUserID(t);
  i.get(u, function(v) {
   r.addLocalEntries.call(this, [ new n({
    uniqueID: v.fbid.toString(),
    title: v.name,
    type: j.FRIEND,
    photo: v.big_image_src || v.image_src,
    uri: v.href,
    auxiliaryData: {
     isMessengerUser: v.is_messenger_user
    }
   }) ]);
  }.bind(this));
 }
 s.prototype.bootstrapImpl = function(t) {
  r.bootstrapImpl.call(this, o);
  t();
 };
 s.prototype.searchImpl = function(t, u, v) {
  if (t === "" && v.showDefaultEntries) {
   u(this.$MessengerSearchSource0, t);
   var w = v && v.onQueryFinished;
   w && w(t);
   return;
  }
  v.threadLimit = l.MaxThreadResults;
  r.searchImpl.call(this, t, u, v);
 };
 Object.assign(s, k);
 e.exports = s;
}, null);

__d("MessengerTypeaheadUtils", [ "immutable", "MercuryTypeaheadConstants", "React", "fbt" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var k = {
  sortEntries: function(l) {
   var m = [], n = [], o = [], p = [];
   l.forEach(function(q) {
    switch (q.getType()) {
    case h.FRIEND_TYPE:
     m.push(q);
     break;

    case h.FB4C_TYPE:
     n.push(q);
     break;

    case h.THREAD_TYPE:
     o.push(q);
     break;

    case h.NON_FRIEND_TYPE:
     p.push(q);
     break;
    }
   });
   return m.concat(n, o, p);
  },
  sortEntriesWithoutGroupsOrViewer: function(l, m) {
   var n = [], o = [], p = [];
   l.forEach(function(q) {
    if (q.getUniqueID() === m) return;
    switch (q.getType()) {
    case h.FRIEND_TYPE:
     n.push(q);
     break;

    case h.FB4C_TYPE:
     o.push(q);
     break;

    case h.NON_FRIEND_TYPE:
     p.push(q);
     break;
    }
   });
   return n.concat(o, p);
  },
  buildListSections: function(l) {
   if (!l.length) return g.OrderedMap();
   var m = [], n = [], o = [], p = [], q = [];
   l.forEach(function(r) {
    switch (r.getType()) {
    case h.FRIEND_TYPE:
     n.push(r);
     break;

    case h.FB4C_TYPE:
     o.push(r);
     break;

    case h.THREAD_TYPE:
     p.push(r);
     break;

    case h.NON_FRIEND_TYPE:
     q.push(r);
     break;
    }
   });
   if (n.length) m.push([ "", n ]);
   if (o.length) m.push([ j._("Co-workers"), o ]);
   if (p.length) m.push([ j._("Group Conversations"), p ]);
   if (q.length) m.push([ j._("More People"), q ]);
   return g.OrderedMap(m);
  },
  scrollEntryIntoView: function(l, m) {
   var n = i.findDOMNode(m), o = m.getScrollTop(), p = l.offsetTop - o, q = n.offsetHeight - l.offsetHeight;
   if (p >= q) {
    m.scrollToPosition(o + p - q);
   } else if (p < 0) m.scrollToPosition(o + p);
  }
 };
 e.exports = k;
}, null);

__d("MessengerThreadImage.react", [ "immutable", "ImmutableObject", "MercuryIDs", "MercuryThreadImage.react", "MessengerProfileImageWrapper.react", "ReactComponentWithPureRenderMixin", "React" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var n = m, o = n.PropTypes, p = m.createClass({
  displayName: "MessengerThreadImage",
  mixins: [ l ],
  propTypes: {
   participants: o.instanceOf(g.Map).isRequired,
   size: o.number,
   thread: o.instanceOf(h).isRequired,
   viewer: o.string.isRequired
  },
  render: function() {
   return m.createElement(k, {
    className: this.props.className,
    isMessengerUser: this._getIsMessengerUser(),
    size: this.props.size,
    showBadge: i.isCanonical(this.props.thread.thread_id)
   }, m.createElement(j, {
    size: this.props.size,
    thread: this.props.thread,
    viewer: this.props.viewer,
    useBackground: true
   }));
  },
  _getIsMessengerUser: function() {
   if (!i.isCanonical(this.props.thread.thread_id) || this.props.participants.size === 0) return null;
   var q = this.props.thread.canonical_fbid, r = i.getParticipantIDFromUserID(q), s = this.props.participants.get(r);
   return s && s.is_messenger_user;
  }
 });
 e.exports = p;
}, null);

__d("MessengerContactListRow.react", [ "Image.react", "ImageBlock.react", "ImmutableObject", "Link.react", "MercuryTypeaheadConstants", "MessengerContactActions", "MessengerContactImage.react", "MessengerThreadImage.react", "ReactComponentWithPureRenderMixin", "React", "cx", "fbt", "ix" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var t = p, u = t.PropTypes, v = s("/unpublished/images/messenger/core/Checkmark.png"), w = 32, x = p.createClass({
  displayName: "MessengerContactListRow",
  mixins: [ o ],
  propTypes: {
   actionsClass: u.func,
   contact: u.instanceOf(i).isRequired,
   isHighlighted: u.bool,
   isOriginal: u.bool,
   isSelected: u.bool,
   onMouseEnter: u.func,
   onScrollIntoView: u.func,
   onAction: u.func,
   presenceStatus: u.string,
   viewer: u.string.isRequired
  },
  getInitialState: function() {
   return {
    isActionsOpen: false
   };
  },
  componentDidMount: function() {
   if (this.props.isHighlighted && this.props.onScrollIntoView) this.props.onScrollIntoView(p.findDOMNode(this));
  },
  componentDidUpdate: function(y) {
   if (this.props.isHighlighted && !y.isHighlighted && this.props.onScrollIntoView) this.props.onScrollIntoView(p.findDOMNode(this));
  },
  render: function() {
   return p.createElement("li", {
    className: "_5l37" + (this.props.isHighlighted ? " " + "_1k1p" : "") + (this.state.isActionsOpen ? " " + "_rwn" : "")
   }, p.createElement(j, {
    onClick: this._handleClick,
    onMouseDown: this._handleMouseDown,
    onMouseEnter: this.props.onMouseEnter
   }, p.createElement(h, {
    contentClassName: "_5l38",
    spacing: "medium"
   }, this._renderContactImage(), this._renderContactText(), this._renderActions())));
  },
  _handleMouseDown: function(y) {
   y.stopPropagation();
   y.preventDefault();
  },
  _handleClick: function(y) {
   y.stopPropagation();
   this._handleContactAction(l.SELECT, y);
  },
  _renderContactImage: function() {
   if (this.props.contact.photo) {
    return p.createElement(m, {
     className: "_5l39 _5rmm",
     isMessengerUser: this.props.contact.isMessengerUser,
     size: w,
     src: this.props.contact.photo
    });
   } else if (this.props.contact.type === k.THREAD_TYPE) return p.createElement(n, {
    className: "_5l39",
    participants: this.props.contact.participants,
    size: w,
    thread: this.props.contact.thread,
    viewer: this.props.viewer
   });
  },
  _renderContactText: function() {
   if (this.props.contact.subtitle) {
    return p.createElement("div", null, p.createElement("div", {
     className: "_3q34"
    }, this.props.contact.title), p.createElement("div", {
     className: "_3q35"
    }, this.props.contact.subtitle));
   } else return p.createElement("div", {
    className: "_364g"
   }, this.props.contact.title);
  },
  _renderActions: function() {
   if (this.props.isOriginal) return p.createElement("span", {
    className: "_5rh4"
   }, r._("Added"));
   if (this.props.isSelected) return p.createElement(g, {
    className: "_1kqm",
    src: v
   });
   if (!!this.props.presenceStatus) return p.createElement("div", null, p.createElement("div", {
    className: "_jg2"
   }), p.createElement("div", {
    className: "_jg3"
   }, this.props.presenceStatus));
   if (this.props.actionsClass) {
    var y = this.props.actionsClass;
    return p.createElement(y, {
     className: "_rwo",
     contact: this.props.contact,
     isOpen: this.state.isActionsOpen,
     onAction: this._handleContactAction,
     onToggle: this._handleActionsToggle,
     viewer: this.props.viewer
    });
   }
   return null;
  },
  _handleContactAction: function(y, event) {
   this.props.onAction && this.props.onAction(y, event);
  },
  _handleActionsToggle: function(y) {
   this.setState({
    isActionsOpen: y
   });
  }
 });
 e.exports = x;
}, null);

__d("MessengerContactListRowContainer.react", [ "immutable", "MercuryIDs", "MercuryParticipantTypes", "MessengerContactActions", "MessengerContactListRow.react", "PresenceStatus", "ReactComponentWithPureRenderMixin", "React" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var o = n, p = o.PropTypes, q = n.createClass({
  displayName: "MessengerContactListRowContainer",
  mixins: [ m ],
  propTypes: {
   actionsClass: p.func,
   contactAdapter: p.func.isRequired,
   hasHoverState: p.bool,
   isHighlighted: p.bool,
   onAction: p.func,
   onHighlight: p.func,
   onScrollIntoView: p.func,
   onSelect: p.func.isRequired,
   rawContact: p.object.isRequired,
   originalEntryIDs: p.instanceOf(g.Set),
   selectedEntryIDs: p.instanceOf(g.Set),
   showPresence: p.bool,
   viewer: p.string.isRequired
  },
  getInitialState: function() {
   return {
    contact: this.props.contactAdapter(this.props.rawContact)
   };
  },
  componentWillReceiveProps: function(r) {
   if (r.rawContact !== this.props.rawContact) this.setState({
    contact: r.contactAdapter(r.rawContact)
   });
  },
  render: function() {
   return n.createElement(k, {
    actionsClass: this.props.actionsClass,
    contact: this.state.contact,
    isHighlighted: this.props.isHighlighted,
    isOriginal: this.props.originalEntryIDs && this.props.originalEntryIDs.contains(this.state.contact.uid),
    isSelected: this.props.selectedEntryIDs && this.props.selectedEntryIDs.contains(this.state.contact.uid),
    onAction: this._handleAction,
    onScrollIntoView: this.props.onScrollIntoView,
    onMouseEnter: this._handleMouseEnter,
    onSelect: this._handleSelect,
    presenceStatus: this._getPresenceStatus(),
    viewer: this.props.viewer
   });
  },
  _handleMouseEnter: function() {
   if (!this.props.hasHoverState) return;
   this.props.onHighlight && this.props.onHighlight(this.props.rawContact);
  },
  _handleAction: function(r, event) {
   switch (r) {
   case j.SELECT:
    this.props.onSelect(this.props.rawContact, event);
    break;

   default:
    this.props.onAction && this.props.onAction(r, this.props.rawContact);
    break;
   }
  },
  _getPresenceStatus: function() {
   if (!this.props.showPresence || this.state.contact.type !== i.FRIEND) return null;
   var r = h.getUserIDFromParticipantID(this.state.contact.uid);
   return l.getDetailedActivePresence(r);
  }
 });
 e.exports = q;
}, null);

__d("MessengerContactList.react", [ "MessengerContactListRowContainer.react", "ImageBlock.react", "immutable", "MessengerSpinner.react", "ReactComponentWithPureRenderMixin", "React", "cx", "fbt" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var o = l, p = o.PropTypes, q = l.createClass({
  displayName: "MessengerContactList",
  mixins: [ k ],
  propTypes: {
   actionsClass: p.func,
   contactAdapter: p.func.isRequired,
   hasHoverState: p.bool,
   highlightedEntry: p.object,
   isLoading: p.bool,
   listSections: p.instanceOf(i.OrderedMap).isRequired,
   onHighlight: p.func,
   onScrollIntoView: p.func,
   onSelect: p.func.isRequired,
   onAction: p.func,
   originalEntryIDs: p.instanceOf(i.Set),
   selectedEntryIDs: p.instanceOf(i.Set),
   showPresence: p.bool,
   viewer: p.string.isRequired
  },
  render: function() {
   return l.createElement("div", {
    className: this.props.className
   }, this.props.listSections.map(this._renderListSection).toArray(), this._renderSpinner(), this._renderEmptyResult());
  },
  _renderListSection: function(r, s) {
   return l.createElement("div", {
    key: s
   }, l.createElement("ul", null, this._renderHeader(s), r.map(function(t) {
    return l.createElement(g, {
     actionsClass: this.props.actionsClass,
     contactAdapter: this.props.contactAdapter,
     hasHoverState: this.props.hasHoverState,
     isHighlighted: this.props.highlightedEntry === t,
     key: t.id || t.getUniqueID(),
     onHighlight: this.props.onHighlight,
     onAction: this.props.onAction,
     onSelect: this.props.onSelect,
     onScrollIntoView: this.props.onScrollIntoView,
     rawContact: t,
     originalEntryIDs: this.props.originalEntryIDs,
     selectedEntryIDs: this.props.selectedEntryIDs,
     showPresence: this.props.showPresence,
     viewer: this.props.viewer
    });
   }.bind(this))));
  },
  _renderHeader: function(r) {
   if (!r) return null;
   return l.createElement("div", {
    className: "_225b"
   }, r);
  },
  _renderSpinner: function() {
   if (!this.props.isLoading) return null;
   return l.createElement(h, {
    className: "_225c",
    spacing: "medium"
   }, l.createElement(j, {
    className: "_2i59",
    color: "grey"
   }), l.createElement("div", {
    className: "_4g0h"
   }, n._("Searching People and Groups...")));
  },
  _renderEmptyResult: function() {
   if (this.props.isLoading || this.props.listSections.size > 0) return null;
   return l.createElement("div", {
    className: "_3xcx"
   }, n._("No Results Found"));
  }
 });
 e.exports = q;
}, null);

__d("MessengerTypeaheadView.react", [ "immutable", "MessengerContactAdapters", "MessengerContactList.react", "MessengerTypeaheadUtils", "ReactComponentWithPureRenderMixin", "React", "cx", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var o = l, p = o.PropTypes, q = l.createClass({
  displayName: "MessengerTypeaheadView",
  mixins: [ k ],
  propTypes: {
   entries: p.array.isRequired,
   hasHoverState: p.bool,
   highlightedEntry: p.object,
   isLoading: p.bool,
   onHighlight: p.func,
   onScrollIntoView: p.func,
   onSelect: p.func,
   originalEntryIDs: p.instanceOf(g.Set),
   selectedEntryIDs: p.instanceOf(g.Set),
   viewer: p.string.isRequired
  },
  render: function() {
   return l.createElement(i, {
    className: n(this.props.className, "_5t4c"),
    contactAdapter: h.fromSearchableEntry,
    hasHoverState: this.props.hasHoverState,
    highlightedEntry: this.props.highlightedEntry,
    isLoading: this.props.isLoading,
    listSections: j.buildListSections(this.props.entries),
    onHighlight: this.props.onHighlight,
    onScrollIntoView: this.props.onScrollIntoView,
    onSelect: this.props.onSelect,
    originalEntryIDs: this.props.originalEntryIDs,
    selectedEntryIDs: this.props.selectedEntryIDs,
    showPresence: false,
    viewer: this.props.viewer
   });
  }
 });
 e.exports = q;
}, null);

__d("MessengerScrollableTypeaheadView.react", [ "MessengerScrollableArea.react", "MessengerTypeaheadUtils", "MessengerTypeaheadView.react", "ReactComponentWithPureRenderMixin", "React" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var l = k.createClass({
  displayName: "MessengerScrollableTypeaheadView",
  mixins: [ j ],
  render: function() {
   var m = this.props, n = m.className, o = m.width, p = function(q, r) {
    var s = {}, t = Object.prototype.hasOwnProperty;
    if (q == null) throw new TypeError();
    for (var u in q) if (t.call(q, u) && !t.call(r, u)) s[u] = q[u];
    return s;
   }(m, {
    className: 1,
    width: 1
   });
   return k.createElement(g, {
    className: n,
    ref: "scrollable",
    width: o
   }, k.createElement(i, k.__spread({}, p, {
    onScrollIntoView: this._handleScrollIntoView
   })));
  },
  _handleScrollIntoView: function(m) {
   h.scrollEntryIntoView(m, this.refs.scrollable);
  }
 });
 e.exports = l;
}, null);

__d("MessengerTokenizer.react", [ "AbstractTokenizer.react", "immutable", "Keys", "React", "SearchableEntry", "MessengerScrollableTypeaheadView.react", "MessengerTypeaheadUtils", "ReactComponentWithPureRenderMixin", "cx", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var q = j, r = q.PropTypes, s = 30, t = 100, u = j.createClass({
  displayName: "MessengerTokenizer",
  mixins: [ n ],
  propTypes: {
   className: r.string,
   context: r.object,
   entries: r.instanceOf(h.List).isRequired,
   excludeGroups: r.bool,
   extraRendererProps: r.object,
   hasHoverState: r.bool,
   hideViewWithEntries: r.bool,
   onAddEntryAttempt: r.func.isRequired,
   onEntriesFound: r.func,
   onRemoveEntryAttempt: r.func.isRequired,
   onReorderEntryAttempt: r.func,
   originalEntryIDs: r.instanceOf(h.Set),
   placeholder: r.string,
   searchSource: r.object.isRequired,
   useLayer: r.bool,
   viewer: r.string.isRequired
  },
  getDefaultProps: function() {
   return {
    excludeGroups: false,
    hideViewWithEntries: true
   };
  },
  getInitialState: function() {
   return {
    isLoading: false,
    isLoaded: false,
    queryString: ""
   };
  },
  render: function() {
   return j.createElement("div", {
    className: p(this.props.className, "_14-7")
   }, j.createElement(g, {
    autoHighlight: this.props.hasHoverState,
    context: this.props.context,
    entries: this.props.entries.toArray(),
    excludeTokenEntries: !!this.state.queryString,
    hideViewWithEntries: this.props.hideViewWithEntries,
    onAddEntryAttempt: this._handleAddEntryAttempt,
    onEntriesFound: this.props.onEntriesFound,
    onQueryStringChange: this._handleQueryStringChange,
    onRemoveEntryAttempt: this.props.onRemoveEntryAttempt,
    onReorderEntryAttempt: this.props.onReorderEntryAttempt,
    placeholder: this.props.placeholder,
    presenter: {
     ViewRenderer: l,
     TokenRenderer: v,
     alwaysVisibleOnFocus: (this.state.isLoading || this.state.isLoaded) && !!this.state.queryString,
     useLayer: this.props.useLayer,
     extraRendererProps: Object.assign({
      hasHoverState: this.props.hasHoverState,
      isLoading: this.state.isLoading,
      originalEntryIDs: this.props.originalEntryIDs,
      selectedEntryIDs: h.Seq(this.props.entries).map(function(w) {
       return w.getUniqueID();
      }).toSet(),
      viewer: this.props.viewer
     }, this.props.extraRendererProps),
     maxEntries: s,
     sortEntries: this._sortEntries
    },
    queryString: this.state.queryString,
    ref: "tokenizer",
    searchSource: this.props.searchSource,
    searchSourceOptions: {
     onQueryFinished: this._handleQueryFinished,
     onQueryStarted: this._handleQueryStarted,
     showDefaultEntries: this.props.showDefaultEntries
    },
    showEntriesOnFocus: true
   }));
  },
  _handleAddEntryAttempt: function(w) {
   this.setState({
    isLoaded: false,
    queryString: ""
   });
   var x = w.getUniqueID();
   if (this.props.entries.some(function(y) {
    return y.getUniqueID() === x;
   })) {
    this.props.onRemoveEntryAttempt(w);
    return;
   }
   if (this.props.originalEntryIDs && this.props.originalEntryIDs.contains(x)) return;
   this.props.onAddEntryAttempt(w);
  },
  _sortEntries: function(w) {
   if (this.props.entries.size || this.props.excludeGroups) return m.sortEntriesWithoutGroupsOrViewer(w, this.props.viewer);
   return m.sortEntries(w);
  },
  focusInput: function() {
   this.refs.tokenizer && this.refs.tokenizer.focusInput();
  },
  _handleQueryStarted: function(w) {
   if (w === this.state.queryString) this.setState({
    isLoading: true
   });
  },
  _handleQueryFinished: function(w) {
   if (w === this.state.queryString) this.setState({
    isLoaded: true,
    isLoading: false
   });
  },
  _handleQueryStringChange: function(event) {
   this.setState({
    isLoaded: false,
    queryString: event.target.value
   });
  }
 }), v = j.createClass({
  displayName: "MessengerTokenizerToken",
  propTypes: {
   className: r.string,
   entry: r.instanceOf(k),
   index: r.number,
   label: r.string.isRequired,
   onRemove: r.func
  },
  render: function() {
   return j.createElement("span", {
    className: p(this.props.className, "_14-8" + (" " + "_5vn4")),
    label: null,
    onClick: this._handleClick,
    onKeyDown: this._handleKeyDown,
    tabIndex: this.props.index + t
   }, j.createElement("span", {
    "aria-label": this.props.label,
    title: this.props.label,
    className: "_14-9"
   }, this.props.label));
  },
  _handleClick: function(event) {
   event.stopPropagation();
  },
  _handleKeyDown: function(event) {
   if (event.keyCode === i.BACKSPACE) {
    event.preventDefault();
    this.props.onRemove && this.props.onRemove(this.props.entry);
   }
  }
 });
 e.exports = u;
}, null);

__d("MessengerAddToConversationDialog.react", [ "immutable", "ImmutableObject", "Layout.react", "MercuryIDs", "MercuryLogMessageType", "MercurySourceType", "MercuryMessageActions", "MercuryMessageObject", "MessengerActions", "MessengerDialog.react", "MessengerDialogButton.react", "MessengerSearchSource", "MessengerTokenizer.react", "ReactComponentWithPureRenderMixin", "React", "cx", "fbt" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var x = i.Column, y = i.FillColumn, z = u, aa = z.PropTypes, ba = 460, ca = u.createClass({
  displayName: "MessengerAddToConversationDialog",
  mixins: [ t ],
  propTypes: {
   thread: aa.instanceOf(h),
   viewer: aa.string.isRequired
  },
  getInitialState: function() {
   return {
    selectedEntries: g.List()
   };
  },
  componentWillMount: function() {
   this._messageActions = m.getForFBID(this.props.viewer);
   this._messageObject = n.getForFBID(this.props.viewer);
  },
  render: function() {
   return u.createElement(p, {
    className: "_3uhw",
    shown: true,
    onToggle: this._handleToggle,
    ref: "dialog",
    width: ba
   }, u.createElement("div", {
    className: "_4jgp"
   }, u.createElement(i, {
    className: "_4jgq _4eb_"
   }, u.createElement(x, null, u.createElement(q, {
    action: "cancel",
    className: "_4jgr",
    label: w._("Cancel"),
    type: "secondary"
   })), u.createElement(y, {
    className: "_4jgs"
   }, w._("Add More People")), u.createElement(x, null, u.createElement(q, {
    className: "_4jgr",
    label: w._("Done"),
    onClick: this._handleSave,
    type: "primary"
   }))), u.createElement(s, {
    className: "_4jgt",
    entries: this.state.selectedEntries,
    excludeGroups: true,
    extraRendererProps: {
     className: "_4jgu",
     width: ba
    },
    hasHoverState: false,
    hideViewWithEntries: false,
    onAddEntryAttempt: this._handleAddEntryAttempt,
    onRemoveEntryAttempt: this._handleRemoveEntryAttempt,
    originalEntryIDs: g.Set(this.props.thread.participants.map(function(da) {
     return j.getUserIDFromParticipantID(da);
    })),
    placeholder: w._("To:"),
    searchSource: r.getForFBID(this.props.viewer),
    showDefaultEntries: true,
    useLayer: false,
    viewer: this.props.viewer
   })));
  },
  _handleAddEntryAttempt: function(da) {
   this.setState({
    selectedEntries: this.state.selectedEntries.push(da)
   });
  },
  _handleRemoveEntryAttempt: function(da) {
   var ea = da.getUniqueID(), fa = this.state.selectedEntries, ga = fa.findIndex(function(ha) {
    return ha.getUniqueID() === ea;
   });
   if (ga !== -1) this.setState({
    selectedEntries: fa["delete"](ga)
   });
  },
  _handleToggle: function(da) {
   if (!da) o.hideDialog();
  },
  _handleSave: function(event) {
   if (this.state.selectedEntries.size) this._messageActions.send(this._messageObject.constructLogMessageObject(l.MESSENGER_WEB, this.props.thread.thread_id, k.SUBSCRIBE, {
    added_participants: this.state.selectedEntries.map(function(da) {
     return j.getParticipantIDFromUserID(da.getUniqueID());
    }).toArray()
   }));
   event.preventDefault();
   o.hideDialog();
  }
 });
 e.exports = ca;
}, null);

__d("MessengerComposeViewHeader.react", [ "immutable", "Layout.react", "MessengerSearchSource", "MessengerTokenizer.react", "ReactComponentWithPureRenderMixin", "React", "clearImmediate", "cx", "fbt", "setImmediate" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var q = h.Column, r = h.FillColumn, s = l, t = s.PropTypes, u = 320, v = l.createClass({
  displayName: "MessengerComposeViewHeader",
  mixins: [ k ],
  propTypes: {
   onAddRecipient: t.func.isRequired,
   onRemoveRecipient: t.func.isRequired,
   recipients: t.instanceOf(g.List).isRequired,
   viewer: t.string.isRequired
  },
  getInitialState: function() {
   return {
    tokenizerContext: null
   };
  },
  componentDidMount: function() {
   this._focusTokenizer();
   this.setState({
    tokenizerContext: this.refs.tokenizerContext
   });
  },
  componentWillUnmount: function() {
   this._timer && m(this._timer);
  },
  render: function() {
   return l.createElement(h, {
    className: "_2y8y"
   }, l.createElement(q, {
    className: "_2y8z"
   }, o._("To:")), l.createElement(r, null, l.createElement(j, {
    className: "_2y8-",
    context: this.state.tokenizerContext,
    entries: this.props.recipients,
    extraRendererProps: {
     className: "_2y8_",
     width: u
    },
    hasHoverState: true,
    onAddEntryAttempt: this.props.onAddRecipient,
    onRemoveEntryAttempt: this.props.onRemoveRecipient,
    placeholder: o._("Type the name of a person or group"),
    ref: "tokenizer",
    searchSource: i.getForFBID(this.props.viewer),
    useLayer: true,
    viewer: this.props.viewer
   }), l.createElement("div", {
    ref: "tokenizerContext"
   })));
  },
  _focusTokenizer: function() {
   this._timer = p(function() {
    this.refs.tokenizer && this.refs.tokenizer.focusInput();
   }.bind(this));
  }
 });
 e.exports = v;
}, null);

__d("MessengerPresenceStatus.react", [ "React", "ReactComponentWithPureRenderMixin", "fbt" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var j = g, k = j.PropTypes, l = g.createClass({
  displayName: "MessengerPresenceStatus",
  mixins: [ h ],
  propTypes: {
   isUserActive: k.bool.isRequired,
   lastActive: k.string,
   platform: k.string
  },
  render: function() {
   var m;
   if (this.props.isUserActive) {
    m = i._("Active on {platform}", [ i.param("platform", this.props.platform) ]);
   } else if (this.props.lastActive) {
    m = i._("Active {time} ago", [ i.param("time", this.props.lastActive) ]);
   } else m = this.props.platform;
   return g.createElement("span", {
    className: this.props.className
   }, m);
  }
 });
 e.exports = l;
}, null);

__d("MessengerRTCUnavailableDialog.react", [ "MessengerActions", "MessengerDialog.react", "MessengerDialogBody.react", "MessengerDialogButton.react", "MessengerDialogFooter.react", "MessengerDialogHeader.react", "React", "fbt" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var o = m, p = o.PropTypes, q = m.createClass({
  displayName: "MessengerRTCUnavailableDialog",
  propTypes: {
   name: p.string.isRequired
  },
  render: function() {
   return m.createElement(h, {
    onToggle: this._handleToggle
   }, m.createElement(l, null, n._("Can't Make Call")), m.createElement(i, null, this._renderDialogBody()), m.createElement(k, null, m.createElement(j, {
    action: "cancel",
    label: n._("OK"),
    type: "primary"
   })));
  },
  _renderDialogBody: function() {
   return m.createElement("div", null, n._("{name} is not available right now.", [ n.param("name", this.props.name) ]));
  },
  _handleToggle: function(r) {
   if (!r) g.hideDialog();
  }
 });
 e.exports = q;
}, null);

__d("MessengerRTCCallButton.react", [ "Link.react", "MessengerActions", "MessengerRTCUnavailableDialog.react", "ReactComponentWithPureRenderMixin", "React", "cx", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var n = k, o = n.PropTypes, p = k.createClass({
  displayName: "MessengerRTCCallButton",
  mixins: [ j ],
  propTypes: {
   isVideo: o.bool.isRequired,
   isAvailable: o.bool.isRequired,
   calleeID: o.oneOfType([ o.number, o.string ]).isRequired,
   calleeName: o.string.isRequired
  },
  render: function() {
   return k.createElement(g, {
    className: this._className(),
    onClick: this._handleStartCall
   });
  },
  _className: function() {
   var q = this.props, r = q.isVideo, s = q.isAvailable;
   return m("_31tl" + (!r && s ? " " + "_31tm" : "") + (!r && !s ? " " + "_31tn" : "") + (r && s ? " " + "_31to" : "") + (r && !s ? " " + "_31tp" : ""), this.props.className);
  },
  _handleStartCall: function(q) {
   q.preventDefault();
   if (this.props.isAvailable) {
    d([ "FBRTCCore" ], function(r) {
     r.startOutgoingCall(this.props.calleeID, "messenger_dot_com", !this.props.isVideo);
    }.bind(this));
   } else h.showDialog(i, {
    name: this.props.calleeName
   });
  }
 });
 e.exports = p;
}, null);

__d("MessengerDetailViewHeader.react", [ "Event", "immutable", "ImmutableObject", "Link.react", "MercuryThreadTitle.react", "MessengerConfig", "MessengerPresenceStatus.react", "MessengerRTCCallButton.react", "ReactComponentWithPureRenderMixin", "VideoCallSupport", "React", "Style", "cx", "debounce" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var u = q, v = u.PropTypes, w = q.createClass({
  displayName: "MessengerDetailViewHeader",
  mixins: [ o ],
  propTypes: {
   contactData: v.object,
   onAddPeopleClick: v.func.isRequired,
   onThreadInfoToggle: v.func,
   participants: v.instanceOf(h.Map).isRequired,
   thread: v.instanceOf(i),
   viewer: v.string.isRequired
  },
  componentDidMount: function() {
   this._resizeCallback = g.listen(window, "resize", t(this._calculateTruncationState, 20, this));
  },
  componentWillUnmount: function() {
   this._resizeCallback.remove();
  },
  componentDidUpdate: function() {
   this._calculateTruncationState();
  },
  render: function() {
   if (!this.props.thread) return null;
   var x = this._renderPresenceStatus();
   return q.createElement("div", {
    className: "_5742" + (x === null ? " " + "_1_fz" : ""),
    ref: "root"
   }, q.createElement("div", {
    className: "_5743",
    key: "threadTitle",
    ref: "title"
   }, q.createElement(k, {
    ref: "mercuryTitle",
    thread: this.props.thread,
    viewer: this.props.viewer
   }), x), q.createElement("ul", {
    className: "_fl2",
    key: "buttonsContainer",
    ref: "buttons"
   }, q.createElement("li", null, q.createElement(j, {
    className: "_4v _30yy",
    onClick: this.props.onAddPeopleClick
   })), this._renderAudioCallButton(), this._renderVideoCallButton(), q.createElement("li", null, q.createElement(j, {
    className: "_fl3 _30yy",
    onClick: this._handleThreadInfoToggle
   }))));
  },
  _renderAudioCallButton: function() {
   if (this._shouldShowCallButton()) return q.createElement("li", null, q.createElement(n, {
    className: "_30yy",
    isVideo: false,
    isAvailable: this.props.contactData.isRTCCallable,
    calleeID: this.props.thread.canonical_fbid,
    calleeName: this.props.contactData.contact.name
   }));
  },
  _renderVideoCallButton: function() {
   if (this._shouldShowCallButton()) return q.createElement("li", null, q.createElement(n, {
    className: "_30yy",
    isVideo: true,
    isAvailable: this.props.contactData.isRTCCallable,
    calleeID: this.props.thread.canonical_fbid,
    calleeName: this.props.contactData.contact.name
   }));
  },
  _shouldShowCallButton: function() {
   var x = this.props.thread;
   return !!(p.isWebrtcSupported() && p.isOSSupported() && this.props.contactData && l.EnableRtcGK && x && x.is_canonical && x.participants.length > 1);
  },
  _renderPresenceStatus: function() {
   if (!this.props.contactData) return null;
   return q.createElement(m, {
    className: "_2v6o",
    isUserActive: this.props.contactData.isUserActive,
    lastActive: this.props.contactData.lastActive,
    platform: this.props.contactData.platform
   });
  },
  _handleThreadInfoToggle: function(x) {
   x.preventDefault();
   this.props.onThreadInfoToggle && this.props.onThreadInfoToggle();
  },
  _calculateTruncationState: function() {
   var x = q.findDOMNode(this.refs.root), y = q.findDOMNode(this.refs.title), z = q.findDOMNode(this.refs.buttons), aa = q.findDOMNode(this.refs.mercuryTitle);
   if (!aa || !y) return;
   var ba = Math.ceil(.5 * (x.offsetWidth + aa.offsetWidth)), ca = x.offsetWidth - z.offsetWidth - 12;
   if (ba <= ca) {
    r.set(x, "text-align", "center");
    r.set(y, "width", "auto");
   } else {
    r.set(x, "text-align", "left");
    var da = x.offsetWidth - z.offsetWidth - 11;
    r.set(y, "width", da + "px");
   }
  }
 });
 e.exports = w;
}, null);

__d("MessengerPresenceStatusUtils", [ "AvailableListConstants", "FBRTCAvailability", "LastMobileActiveTimes", "MercuryIDs", "PresenceStatus", "fbt" ], function(a, b, c, d, e, f, g, h, i, j, k, l) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var m = {
  getStatusFromCanonicalThread: function(n, o) {
   var p = null;
   if (o.is_canonical) {
    var q = n.get(j.getParticipantIDFromFromThreadID(o.thread_id));
    if (q) {
     var r = k.get(q.fbid), s = h.isCallable(q.fbid), t, u, v = q.is_messenger_user ? l._("Messenger") : l._("Facebook");
     if (r !== g.ACTIVE) {
      t = i.get(q.fbid);
      u = i.getShortDisplay(q.fbid);
     }
     p = {
      contact: q,
      platform: v,
      isRTCCallable: s,
      isUserActive: r === g.ACTIVE,
      lastActiveTS: t,
      lastActive: u
     };
    }
   }
   return p;
  }
 };
 e.exports = m;
}, null);

__d("MessengerDetailViewHeaderContainer.react", [ "immutable", "ImmutableObject", "MercuryIDs", "MercuryServerRequests", "MercuryTypeaheadConstants", "MessengerActions", "MessengerAddToConversationDialog.react", "MessengerComposerActions", "MessengerComposeViewHeader.react", "MessengerDetailViewHeader.react", "MessengerPresenceStatusUtils", "MessengerView", "PresenceStatus", "React", "SearchableEntry", "StoreAndPropBasedStateMixin", "shallowEqual" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var x = t, y = x.PropTypes, z = t.createClass({
  displayName: "MessengerDetailViewHeaderContainer",
  mixins: [ v(s) ],
  propTypes: {
   onThreadInfoToggle: y.func,
   participants: y.instanceOf(g.Map).isRequired,
   recipients: y.instanceOf(g.List).isRequired,
   thread: y.instanceOf(h),
   view: y.string,
   viewer: y.string.isRequired
  },
  statics: {
   calculateState: function(aa) {
    if (!aa.thread) return {
     contactData: null
    };
    return {
     contactData: q.getStatusFromCanonicalThread(aa.participants, aa.thread)
    };
   }
  },
  shouldComponentUpdate: function(aa, ba) {
   return !!(!w(aa, this.props) || ba && !w(ba.contactData, this.state.contactData));
  },
  render: function() {
   return this.props.view === r.DETAIL.COMPOSE ? t.createElement(o, {
    onAddRecipient: this._handleAddRecipient,
    onRemoveRecipient: this._handleRemoveRecipient,
    recipients: this.props.recipients,
    viewer: this.props.viewer
   }) : t.createElement(p, {
    contactData: this.state.contactData,
    onAddPeopleClick: this._handleAddPeopleClick,
    onThreadInfoToggle: this.props.onThreadInfoToggle,
    participants: this.props.participants,
    thread: this.props.thread,
    viewer: this.props.viewer
   });
  },
  _handleAddRecipient: function(aa) {
   if (aa.getType() === k.THREAD_TYPE) {
    var ba = j.getForFBID(this.props.viewer);
    ba.getClientThreadID(aa.getUniqueID(), function(ca) {
     l.selectThread(ca);
    });
   } else n.addToken(aa);
  },
  _handleRemoveRecipient: function(aa) {
   n.removeToken(aa);
  },
  _handleAddPeopleClick: function(event) {
   event.preventDefault();
   var aa = this.props.thread;
   if (aa && aa.is_canonical) {
    var ba = this.props.participants.get(i.getParticipantIDFromFromThreadID(aa.thread_id));
    if (!ba) return;
    l.changeDetailView(r.DETAIL.COMPOSE);
    n.addToken(new u({
     uniqueID: ba.fbid,
     title: ba.name,
     photo: ba.big_image_src || ba.image_src,
     auxiliaryData: {
      isMessengerUser: ba.is_messenger_user
     }
    }));
    return;
   }
   l.showDialog(m, {
    thread: this.props.thread,
    viewer: this.props.viewer
   });
  }
 });
 e.exports = z;
}, null);

__d("MessengerConfirmLeaveGroupDialog.react", [ "MessengerActions", "MessengerDialog.react", "MessengerDialogBody.react", "MessengerDialogButton.react", "MessengerDialogFooter.react", "MessengerDialogHeader.react", "React", "fbt" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var o = m, p = o.PropTypes, q = m.createClass({
  displayName: "MessengerConfirmLeaveGroupDialog",
  propTypes: {
   onCancel: p.func,
   onLeave: p.func.isRequired
  },
  render: function() {
   return m.createElement(h, {
    onToggle: this._handleToggle
   }, m.createElement(l, null, n._("Leave Conversation?")), m.createElement(i, null, n._("You will stop receiving messages from this conversation and people will see that you left.")), m.createElement(k, null, m.createElement(j, {
    action: "cancel",
    label: n._("Cancel"),
    type: "secondary"
   }), m.createElement(j, {
    label: n._("Leave"),
    onClick: this._handleLeaveClick,
    type: "primary",
    use: "danger"
   })));
  },
  _handleLeaveClick: function(r) {
   r.stopPropagation();
   this.props.onLeave();
   g.hideDialog();
  },
  _handleToggle: function(r) {
   if (!r) g.hideDialog();
  }
 });
 e.exports = q;
}, null);

__d("MessengerDropdownMenu.react", [ "ContextualLayerAutoFlip", "ContextualLayerUpdateOnScroll", "Link.react", "ReactComponentWithPureRenderMixin", "React", "XUIContextualDialog.react", "cx" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var n = k, o = n.PropTypes, p = k.createClass({
  displayName: "MessengerDropdownMenu",
  render: function() {
   var r = this.props, s = r.children, t = function(u, v) {
    var w = {}, x = Object.prototype.hasOwnProperty;
    if (u == null) throw new TypeError();
    for (var y in u) if (x.call(u, y) && !x.call(v, y)) w[y] = u[y];
    return w;
   }(r, {
    children: 1
   });
   return k.createElement(l, k.__spread({
    behaviors: {
     ContextualLayerAutoFlip: g,
     ContextualLayerUpdateOnScroll: h
    }
   }, t), k.createElement("ul", {
    className: "_256m"
   }, s));
  }
 }), q = k.createClass({
  displayName: "MessengerDropdownMenuItem",
  mixins: [ j ],
  propTypes: {
   label: o.string,
   onClick: o.func
  },
  render: function() {
   var r = this.props, s = r.label, t = function(u, v) {
    var w = {}, x = Object.prototype.hasOwnProperty;
    if (u == null) throw new TypeError();
    for (var y in u) if (x.call(u, y) && !x.call(v, y)) w[y] = u[y];
    return w;
   }(r, {
    label: 1
   });
   return k.createElement("li", null, k.createElement(i, k.__spread({
    className: "_256n"
   }, t), s));
  }
 });
 p.Item = q;
 p.SEPARATOR = k.createElement("li", {
  className: "_256o"
 });
 e.exports = p;
}, null);

__d("MessengerLayerContext.react", [ "ReactComponentWithPureRenderMixin", "React", "cx", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var k = h, l = k.PropTypes, m = h.createClass({
  displayName: "MessengerLayerContext",
  mixins: [ g ],
  propTypes: {
   className: l.string,
   isActive: l.bool,
   onClick: l.func,
   onGuardedClick: l.func,
   shouldClickGuard: l.bool
  },
  _clickGuard: false,
  getDefaultProps: function() {
   return {
    shouldClickGuard: true
   };
  },
  render: function() {
   var n = this.props, o = n.children, p = n.className, q = function(r, s) {
    var t = {}, u = Object.prototype.hasOwnProperty;
    if (r == null) throw new TypeError();
    for (var v in r) if (u.call(r, v) && !u.call(s, v)) t[v] = r[v];
    return t;
   }(n, {
    children: 1,
    className: 1
   });
   return h.createElement("div", h.__spread({}, q, {
    className: j(p, "_5f0v"),
    onClick: this._handleClick,
    onMouseDown: this._handleMouseDown
   }), o);
  },
  _handleMouseDown: function(n) {
   this._clickGuard = this.props.shouldClickGuard && this.props.isActive;
  },
  _handleClick: function(n) {
   if (this._clickGuard) {
    this.props.onGuardedClick && this.props.onGuardedClick(n);
   } else this.props.onClick && this.props.onClick(n);
  }
 });
 e.exports = m;
}, null);

__d("MessengerRemoveFromGroupDialog.react", [ "MessengerDialog.react", "MessengerDialogBody.react", "MessengerDialogButton.react", "MessengerDialogFooter.react", "MessengerDialogHeader.react", "ReactComponentWithPureRenderMixin", "React", "fbt" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var o = m, p = o.PropTypes, q = m.createClass({
  displayName: "MessengerRemoveFromGroupDialog",
  mixins: [ l ],
  propTypes: {
   onRemove: p.func,
   onToggle: p.func
  },
  render: function() {
   return m.createElement(g, {
    onToggle: this.props.onToggle
   }, m.createElement(k, null, n._("Remove from Group")), m.createElement(h, null, n._("Are you sure you want to remove this person from the group?")), m.createElement(j, null, m.createElement(i, {
    action: "cancel",
    label: n._("Cancel"),
    type: "secondary"
   }), m.createElement(i, {
    label: n._("Remove"),
    onClick: this._handleDelete,
    type: "primary",
    use: "danger"
   })));
  },
  _handleDelete: function(r) {
   this.props.onToggle && this.props.onToggle(false);
   this.props.onRemove && this.props.onRemove(r);
  }
 });
 e.exports = q;
}, null);

__d("MessengerInfoPanelContactActions.react", [ "ImmutableObject", "ReactLayeredComponentMixin", "MercuryIDs", "MessengerActions", "MessengerContactActions", "MessengerDropdownMenu.react", "MessengerLayerContext.react", "MessengerRemoveFromGroupDialog.react", "ReactComponentWithPureRenderMixin", "React", "cx", "fbt", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var t = l.Item, u = p, v = u.PropTypes, w = p.createClass({
  displayName: "MessengerInfoPanelContactActions",
  mixins: [ o, h ],
  propTypes: {
   contact: v.instanceOf(g).isRequired,
   isOpen: v.bool,
   onAction: v.func.isRequired,
   onToggle: v.func.isRequired,
   viewer: v.string.isRequired
  },
  render: function() {
   if (i.getUserIDFromParticipantID(this.props.contact.uid) === this.props.viewer) return null;
   return p.createElement(m, {
    className: s(this.props.className, "_57gs" + (this.props.isOpen ? " " + "_57gt" : "")),
    isActive: this.props.isOpen,
    onClick: this._handleLinkClick,
    onGuardedClick: this._handleGuardedClick,
    ref: "context"
   });
  },
  renderLayers: function() {
   return {
    contextualDialog: p.createElement(l, {
     alignment: "right",
     context: p.findDOMNode(this.refs.context),
     onBlur: this._handleBlur,
     position: "below",
     shown: this.props.isOpen
    }, p.createElement(t, {
     label: r._("Message"),
     onClick: this._makeActionHandler(k.MESSAGE)
    }), p.createElement(t, {
     label: r._("View Profile"),
     onClick: this._makeActionHandler(k.PROFILE)
    }), p.createElement(t, {
     label: r._("Remove from Group"),
     onClick: this._handleRemoveClick
    }))
   };
  },
  _handleLinkClick: function(x) {
   this._handleGuardedClick(x);
   this.props.onToggle && this.props.onToggle(true);
  },
  _handleGuardedClick: function(x) {
   x.stopPropagation();
   x.preventDefault();
  },
  _makeActionHandler: function(x) {
   return function(y) {
    this._handleGuardedClick(y);
    this._handleBlur();
    this.props.onAction(x, y);
   }.bind(this);
  },
  _handleBlur: function() {
   this.props.onToggle && this.props.onToggle(false);
  },
  _handleRemoveClick: function(x) {
   this._handleGuardedClick(x);
   this._handleBlur();
   j.showDialog(n, {
    onToggle: this._handleDialogToggle,
    onRemove: this._handleDialogRemoveClick
   });
  },
  _handleDialogRemoveClick: function(x) {
   this.props.onAction(k.REMOVE, x);
  },
  _handleDialogToggle: function(x) {
   if (!x) j.hideDialog();
  }
 });
 e.exports = w;
}, null);

__d("MessengerMuteDialog.react", [ "MercuryThreadMuter", "MessengerDialog.react", "MessengerDialogBody.react", "MessengerDialogButton.react", "MessengerDialogFooter.react", "MessengerDialogHeader.react", "React", "XUIRadioList.react", "fbt" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var p = n.Item, q = m, r = q.PropTypes, s = m.createClass({
  displayName: "MessengerMuteDialog",
  propTypes: {
   onMute: r.func.isRequired,
   onToggle: r.func
  },
  getInitialState: function() {
   return {
    muteSetting: "30minutes"
   };
  },
  render: function() {
   return m.createElement(h, {
    onToggle: this.props.onToggle
   }, m.createElement(l, null, o._("Mute Conversation")), m.createElement(i, null, m.createElement(n, {
    selectedValue: this.state.muteSetting,
    onValueChange: this._handleMuteSettingChange
   }, m.createElement(p, {
    value: "30minutes"
   }, o._("For 30 minutes")), m.createElement(p, {
    value: "1hour"
   }, o._("For 1 Hour")), m.createElement(p, {
    value: "8hours"
   }, o._("For 8 hours")), m.createElement(p, {
    value: "24hours"
   }, o._("For 24 hours")), m.createElement(p, {
    value: "always"
   }, o._("Indefinitely")))), m.createElement(k, null, m.createElement(j, {
    action: "cancel",
    label: o._("Cancel"),
    type: "secondary"
   }), m.createElement(j, {
    label: o._("Mute"),
    onClick: this._handleMute,
    type: "primary"
   })));
  },
  _handleMute: function() {
   this.props.onMute(g.convertRawMuteSetting(this.state.muteSetting));
   this.props.onToggle && this.props.onToggle(false);
  },
  _handleMuteSettingChange: function(t) {
   this.setState({
    muteSetting: t
   });
  }
 });
 e.exports = s;
}, null);

__d("MessengerInfoPanelMuteSettings.react", [ "LeftRight.react", "MessengerActions", "MessengerMuteDialog.react", "ReactComponentWithPureRenderMixin", "React", "XUICheckboxInput.react", "cx", "fbt", "formatDate" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var p = k, q = p.PropTypes, r = k.createClass({
  displayName: "MessengerInfoPanelMuteSettings",
  mixins: [ j ],
  propTypes: {
   isMuted: q.bool.isRequired,
   mutedUntil: q.number,
   onMuteChange: q.func.isRequired
  },
  render: function() {
   return k.createElement("div", {
    className: "_3x6s",
    ref: "dialogContext"
   }, k.createElement(g, null, this._renderLink(), this._renderMutedUntil()));
  },
  _handleClick: function(s) {
   s.preventDefault();
   s.stopPropagation();
   if (this.props.isMuted) {
    this.props.onMuteChange(0);
   } else h.showDialog(i, {
    onMute: this.props.onMuteChange,
    onToggle: this._handleDialogToggle
   });
  },
  _renderLink: function() {
   return k.createElement("div", {
    className: "_3x6t"
   }, k.createElement(l, {
    checked: this.props.isMuted,
    onChange: this._handleClick
   }), k.createElement("span", {
    onClick: this._handleClick,
    className: "_3x6u"
   }, n._("Mute Notifications")));
  },
  _renderMutedUntil: function() {
   var s = this.props.mutedUntil, t;
   if (!s) return null;
   if (s > 0) {
    if (s < 86401) return null;
    var u = new Date(s * 1e3).getDay() === new Date().getDay();
    if (!u) {
     t = n._("Off until {time} tomorrow", [ n.param("time", o(s, "g:ia")) ]);
    } else t = n._("Off until {time}", [ n.param("time", o(s, "g:ia")) ]);
   } else if (s === -1) t = n._("Off indefinitely");
   return t ? k.createElement("span", {
    className: "_3x6v"
   }, t) : null;
  },
  _handleDialogToggle: function(s) {
   if (!s) h.hideDialog();
  }
 });
 e.exports = r;
}, null);

__d("MessengerInfoPanelMuteSettingsContainer.react", [ "MercuryThreadInfo", "ImmutableObject", "MessengerInfoPanelMuteSettings.react", "React" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 var k = j, l = k.PropTypes, m = j.createClass({
  displayName: "MessengerInfoPanelMuteSettingsContainer",
  propTypes: {
   thread: l.instanceOf(h).isRequired,
   onChange: l.func.isRequired
  },
  render: function() {
   return j.createElement(i, {
    isMuted: g.isMuted(this.props.thread),
    mutedUntil: g.getMuteSetting(this.props.thread),
    onMuteChange: this._handleMuteChange
   });
  },
  _handleMuteChange: function(n) {
   this.props.onChange(n);
  }
 });
 e.exports = m;
}, null);

__d("MessengerInfoPanelContactNameSection.react", [ "ImageBlock.react", "MessengerPresenceStatus.react", "React", "cx" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var k = i, l = k.PropTypes, m = i.createClass({
  displayName: "MessengerInfoPanelContactNameSection",
  propTypes: {
   contact: l.object.isRequired,
   isUserActive: l.bool,
   lastActive: l.string,
   platform: l.string,
   renderedImage: l.element.isRequired
  },
  render: function() {
   return i.createElement(g, {
    className: "_1wnf",
    spacing: "medium"
   }, this.props.renderedImage, i.createElement("div", {
    className: "_3tkw"
   }, i.createElement("div", {
    className: "_3tkx"
   }, this.props.contact.name), i.createElement("div", {
    className: "_3tky"
   }, i.createElement(h, {
    isUserActive: this.props.isUserActive,
    lastActive: this.props.lastActive,
    platform: this.props.platform
   }))));
  }
 });
 e.exports = m;
}, null);

__d("MessengerThreadPhotoUploader.react", [ "FileInput", "FileInputUploader", "Link.react", "MercuryConfig", "React", "SubscriptionsHandler", "cx", "fbt" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var o = k, p = o.PropTypes, q = k.createClass({
  displayName: "MessengerThreadPhotoUploader",
  _fileInput: null,
  _subscriptions: null,
  _uploader: null,
  propTypes: {
   onComplete: p.func.isRequired,
   onFail: p.func,
   onStart: p.func,
   uri: p.string
  },
  getDefaultProps: function() {
   return {
    uri: j.upload_url
   };
  },
  componentDidMount: function() {
   var r = k.findDOMNode(this.refs.input), s = new g(k.findDOMNode(this.refs.form), k.findDOMNode(this.refs.uploadButton), r), t = new h(r).setURI(this.props.uri).setAllowCrossOrigin(true).setData({
    images_only: true
   }), u = new l();
   u.addSubscriptions(t.subscribe("success", this._handleAllUploadsCompleted), t.subscribe("failure", this._handleLastUploadFailed));
   this._subscriptions = u;
   this._uploader = t;
   this._fileInput = s;
  },
  componentWillUnmount: function() {
   this._subscriptions && this._subscriptions.release();
   delete this._subscriptions;
   delete this._uploader;
  },
  render: function() {
   return k.createElement("form", {
    action: this.props.uri,
    method: "post",
    ref: "form"
   }, k.createElement("input", {
    type: "hidden",
    name: "attach_id",
    ref: "attachID"
   }), k.createElement("input", {
    type: "hidden",
    name: "images_only",
    value: "true"
   }), k.createElement("div", {
    className: "_m _4q60 _2bkv"
   }, k.createElement(i, {
    className: "_4q61 _2bkw",
    ref: "uploadButton"
   }, n._("edit")), k.createElement("input", {
    type: "file",
    className: "_n",
    name: "attachment[]",
    accept: "image/*",
    ref: "input",
    onChange: this._handleFileInputChange
   })));
  },
  _handleAllUploadsCompleted: function(r, s) {
   this.props.onComplete && this.props.onComplete(r, s.response.payload);
  },
  _handleLastUploadFailed: function(r, s) {
   this.props.onFail && this.props.onFail(r, s);
  },
  _handleFileInputChange: function(r) {
   if (r.target.value && this._uploader) {
    this._uploader.send();
    this.props.onStart && this.props.onStart();
   }
  }
 });
 e.exports = q;
}, null);

__d("MessengerInfoPanelThreadNameSection.react", [ "AbstractTextInput.react", "immutable", "ImmutableObject", "ImageBlock.react", "LeftRight.react", "MercuryThreadTitle.react", "MessengerButton.react", "MessengerSpinner.react", "MessengerThreadPhotoUploader.react", "React", "cx", "fbt", "setImmediate" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var t = h.Map, u = p, v = u.PropTypes, w = p.createClass({
  displayName: "MessengerInfoPanelThreadNameSection",
  propTypes: {
   onThreadNameChange: v.func.isRequired,
   onThreadPhotoChange: v.func.isRequired,
   participants: v.instanceOf(t).isRequired,
   renderedImage: v.element.isRequired,
   thread: v.instanceOf(i).isRequired,
   viewer: v.string.isRequired
  },
  getInitialState: function() {
   return {
    isEditingName: false,
    isUploadingPhoto: false,
    nameValue: ""
   };
  },
  componentWillReceiveProps: function(x) {
   if (this.props.thread !== x.thread) this.setState(this.getInitialState());
  },
  componentDidUpdate: function(x, y) {
   if (y && this.state.isEditingName && !y.isEditingName) s(function() {
    return this.refs.threadNameInput.focusInput();
   }.bind(this));
  },
  render: function() {
   return p.createElement(j, {
    className: "_1wnf",
    spacing: "medium"
   }, p.createElement("div", {
    className: "_uks" + (this.state.isUploadingPhoto ? " " + "_ukt" : "")
   }, this.props.renderedImage, this.state.isUploadingPhoto ? this._renderSpinner() : null, p.createElement(o, {
    onComplete: this._handleThreadPhotoUploadComplete,
    onFail: this._handleThreadPhotoUploadFail,
    onStart: this._handleThreadPhotoUploadStart
   })), p.createElement("div", {
    className: "_3tkw",
    onClick: this._handleThreadTitleClick
   }, this.state.isEditingName ? this._renderNameInput() : p.createElement(l, {
    className: "_3tkz",
    showUnreadCount: false,
    thread: this.props.thread,
    useShortName: false,
    viewer: this.props.viewer
   })));
  },
  _renderSpinner: function() {
   return p.createElement("div", {
    className: "_ukr"
   }, p.createElement(n, null));
  },
  _handleThreadPhotoUploadComplete: function(x, y) {
   this.setState({
    isUploadingPhoto: false
   });
   this.props.onThreadPhotoChange(y);
  },
  _handleThreadPhotoUploadFail: function(x, y) {
   this.setState({
    isUploadingPhoto: false
   });
  },
  _handleThreadPhotoUploadStart: function() {
   this.setState({
    isUploadingPhoto: true
   });
  },
  _handleNameInputChange: function(x) {
   this.setState({
    nameValue: x.target.value
   });
  },
  _handleNameEdited: function(x) {
   x.stopPropagation();
   var y = this.state.nameValue;
   if (y !== this.props.thread.name) this.props.onThreadNameChange(y);
   this.setState({
    isEditingName: false
   });
  },
  _handleThreadTitleClick: function(x) {
   x.stopPropagation();
   if (!this.state.isEditingName) this.setState({
    isEditingName: true,
    nameValue: this.props.thread.name
   });
  },
  _renderNameInput: function() {
   return p.createElement(k, {
    className: "_kck",
    direction: k.DIRECTION.right
   }, p.createElement("div", {
    className: "_42ef"
   }, p.createElement(g, {
    className: "_kcm",
    onEnter: this._handleNameEdited,
    placeholder: r._("Name This Conversation"),
    ref: "threadNameInput",
    onChange: this._handleNameInputChange,
    value: this.state.nameValue
   })), p.createElement(m, {
    className: "_kcl",
    label: r._("Done"),
    onClick: this._handleNameEdited,
    type: "primary"
   }));
  }
 });
 e.exports = w;
}, null);

__d("MessengerInfoPanelNameSection.react", [ "immutable", "ImmutableObject", "MessengerInfoPanelContactNameSection.react", "MessengerInfoPanelThreadNameSection.react", "MessengerThreadImage.react", "React" ], function(a, b, c, d, e, f, g, h, i, j, k, l) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var m = g.Map, n = l, o = n.PropTypes, p = 50, q = l.createClass({
  displayName: "MessengerInfoPanelNameSection",
  propTypes: {
   contact: o.object,
   isUserActive: o.bool,
   lastActive: o.string,
   onThreadNameChange: o.func.isRequired,
   onThreadPhotoChange: o.func.isRequired,
   participants: o.instanceOf(m).isRequired,
   platform: o.string,
   thread: o.instanceOf(h).isRequired,
   viewer: o.string.isRequired
  },
  render: function() {
   return this.props.contact ? this._renderContactImageBlock() : this._renderThreadImageBlock();
  },
  _renderContactImageBlock: function() {
   return l.createElement(i, {
    contact: this.props.contact,
    isUserActive: this.props.isUserActive,
    lastActive: this.props.lastActive,
    platform: this.props.platform,
    renderedImage: this._renderImage()
   });
  },
  _renderThreadImageBlock: function() {
   return l.createElement(j, {
    onThreadNameChange: this.props.onThreadNameChange,
    onThreadPhotoChange: this.props.onThreadPhotoChange,
    participants: this.props.participants,
    renderedImage: this._renderImage(),
    thread: this.props.thread,
    viewer: this.props.viewer
   });
  },
  _renderImage: function() {
   return l.createElement(k, {
    participants: this.props.participants,
    size: p,
    thread: this.props.thread,
    viewer: this.props.viewer
   });
  }
 });
 e.exports = q;
}, null);

__d("MessengerThreadInfoPanel.react", [ "immutable", "ImmutableObject", "Link.react", "MessengerActions", "MessengerContactAdapters", "MessengerContactList.react", "MessengerConfirmLeaveGroupDialog.react", "MessengerInfoPanelContactActions.react", "MessengerInfoPanelMuteSettingsContainer.react", "MessengerInfoPanelNameSection.react", "ReactComponentWithPureRenderMixin", "React", "cx", "fbt" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var u = g.Map, v = r, w = v.PropTypes, x = r.createClass({
  displayName: "MessengerThreadInfoPanel",
  mixins: [ q ],
  propTypes: {
   contact: w.instanceOf(h),
   isUserActive: w.bool,
   lastActive: w.string,
   onContactSelect: w.func,
   onReportContact: w.func,
   onMuteChange: w.func,
   onLeaveGroup: w.func,
   onThreadNameChange: w.func.isRequired,
   onThreadPhotoChange: w.func.isRequired,
   participants: w.instanceOf(u).isRequired,
   platform: w.string,
   thread: w.instanceOf(h).isRequired,
   viewer: w.string.isRequired
  },
  getInitialState: function() {
   return {
    muteSetting: "1hour"
   };
  },
  componentWillReceiveProps: function(y) {
   if (this.props.thread !== y.thread) this.setState(this.getInitialState());
  },
  render: function() {
   return r.createElement("div", {
    className: "_3tkv _5vn4"
   }, r.createElement(p, {
    contact: this.props.contact,
    isUserActive: this.props.isUserActive,
    lastActive: this.props.lastActive,
    onThreadNameChange: this.props.onThreadNameChange,
    onThreadPhotoChange: this.props.onThreadPhotoChange,
    participants: this.props.participants,
    platform: this.props.platform,
    thread: this.props.thread,
    viewer: this.props.viewer
   }), this._renderOptions(), this.props.contact ? this._renderFacebookProfile() : this._renderMembers(), this._renderMedia(), this._renderActions());
  },
  _renderOptions: function() {
   if (!this.props.thread.is_subscribed) return null;
   return r.createElement("div", {
    className: "_3tk_"
   }, r.createElement("div", {
    className: "_3tl1"
   }, r.createElement(o, {
    thread: this.props.thread,
    onChange: this.props.onMuteChange
   })));
  },
  _renderMembers: function() {
   return r.createElement("div", {
    className: "_3tk_"
   }, r.createElement("h4", {
    className: "_3tl0"
   }, t._("People")), r.createElement("div", {
    className: "_3tl1"
   }, r.createElement(l, {
    actionsClass: n,
    className: "_4wc-",
    contactAdapter: k.fromMercuryParticipant,
    listSections: g.OrderedMap([ [ null, this.props.participants.filter(function(y) {
     return !!y;
    }).toArray() ] ]),
    onSelect: this._handleContactSelect,
    onAction: this._handleContactAction,
    viewer: this.props.viewer
   })));
  },
  _renderFacebookProfile: function() {
   return r.createElement("div", {
    className: "_3tk_"
   }, r.createElement("h4", {
    className: "_3tl0"
   }, t._("Facebook Profile")), r.createElement("div", {
    className: "_3tl1"
   }, r.createElement(i, {
    href: this.props.contact.href,
    target: "_blank"
   }, this.props.contact.href.replace("www.", ""))));
  },
  _renderMedia: function() {
   return r.createElement("div", null);
  },
  _renderActions: function() {
   if (!this.props.thread.is_subscribed || this.props.contact) return null;
   return r.createElement("div", {
    className: "_3tk_"
   }, r.createElement("div", {
    className: "_3tl1"
   }, r.createElement(i, {
    className: "_10w4",
    onClick: this._handleLeaveGroup
   }, t._("Leave Group"))));
  },
  _handleMute: function() {
   this.props.onMuteChange && this.props.onMuteChange(this.state.muteSetting);
  },
  _handleUnmute: function() {
   this.props.onMuteChange && this.props.onMuteChange("0");
  },
  _handleMuteSettingChange: function(y) {
   this.setState({
    muteSetting: y
   });
  },
  _handleContactSelect: function(y) {
   if (!y.href) return;
   this.props.onContactSelect && this.props.onContactSelect(k.fromMercuryParticipant(y));
  },
  _handleLeaveGroup: function() {
   j.showDialog(m, {
    onLeave: this.props.onLeaveGroup
   });
  },
  _handleContactAction: function(y, z) {
   if (!z.href) return;
   this.props.onContactAction && this.props.onContactAction(y, k.fromMercuryParticipant(z));
  }
 });
 e.exports = x;
}, null);

__d("MessengerThreadInfoPanelContainer.react", [ "AsyncDialog", "AsyncRequest", "immutable", "ImmutableObject", "MercuryAPIArgsSource", "MercuryIDs", "MercuryLogMessageType", "MercuryMessageActions", "MercuryMessageObject", "MercurySourceType", "MercuryThreadActions", "MercuryThreads", "MessengerActions", "MessengerContactActions", "MessengerFlexScrollableArea.react", "MessengerPresenceStatusUtils", "MessengerThreadInfoPanel.react", "PresenceStatus", "React", "StoreAndPropBasedStateMixin", "URI", "shallowEqual" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var ca = y, da = ca.PropTypes, ea = y.createClass({
  displayName: "MessengerThreadInfoPanelContainer",
  mixins: [ z(x) ],
  propTypes: {
   participants: da.instanceOf(i.Map).isRequired,
   thread: da.instanceOf(j).isRequired,
   viewer: da.string.isRequired,
   isVisible: da.bool
  },
  statics: {
   calculateState: function(fa) {
    return {
     contactData: v.getStatusFromCanonicalThread(fa.participants, fa.thread)
    };
   }
  },
  componentWillMount: function() {
   this._actions = q.getForFBID(this.props.viewer);
   this._messageActions = n.getForFBID(this.props.viewer);
   this._messageObject = o.getForFBID(this.props.viewer);
   this._threads = r.getForFBID(this.props.viewer);
  },
  shouldComponentUpdate: function(fa, ga) {
   return !ba(fa, this.props) || !ba(ga.contactData, this.state.contactData);
  },
  render: function() {
   if (!this.props.isVisible) return null;
   var fa = this.state.contactData || {};
   return y.createElement(u, {
    className: this.props.className
   }, y.createElement(w, {
    onContactSelect: this._handleContactSelect,
    onContactAction: this._handleContactAction,
    onLeaveGroup: this._handleLeaveGroup,
    onMuteChange: this._handleMuteChange,
    onReportContact: this._handleReportContact,
    onThreadNameChange: this._handleThreadNameChange,
    onThreadPhotoChange: this._handleThreadPhotoChange,
    participants: this.props.participants,
    thread: this.props.thread,
    viewer: this.props.viewer,
    contact: fa.contact,
    isUserActive: fa.isUserActive,
    lastActive: fa.lastActive,
    platform: fa.platform
   }));
  },
  _handleMuteChange: function(fa) {
   this._actions.updateMuteSetting(this.props.thread.thread_id, fa);
  },
  _handleContactSelect: function(fa) {
   if (l.getUserIDFromParticipantID(fa.uid) !== this.props.viewer) {
    var ga = l.getThreadIDFromParticipantID(fa.uid);
    ga && s.selectThread(ga);
   }
  },
  _handleContactAction: function(fa, ga) {
   if (l.getUserIDFromParticipantID(ga.uid) !== this.props.viewer) switch (fa) {
   case t.MESSAGE:
    this._handleContactSelect(ga);
    break;

   case t.PROFILE:
    var ha = this.props.participants.get(ga.uid);
    if (ha) {
     window.open(ha.href);
    } else this._handleContactSelect(ga);
    break;

   case t.REMOVE:
    if (!this._threads.isEmptyLocalThread(this.props.thread.thread_id)) {
     var ia = aa("/chat/remove_participants/");
     ia.addQueryData({
      uid: l.getUserIDFromParticipantID(ga.uid),
      tid: this.props.thread.thread_fbid
     });
     var ja = new h(ia);
     ja.send();
    }
    break;
   }
  },
  _handleReportContact: function() {
   var fa = aa("/ajax/chat/report.php").addQueryData({
    id: this.state.contactData.contact.id,
    src: "messenger.com"
   });
   g.send(new h(fa));
  },
  _handleLeaveGroup: function() {
   if (!this._threads.isEmptyLocalThread(this.props.thread.thread_id)) {
    var fa = this._messageObject.constructLogMessageObject(p.MESSENGER_WEB, this.props.thread.thread_id, m.UNSUBSCRIBE, {
     removed_participants: [ l.getParticipantIDFromUserID(this.props.viewer) ]
    });
    this._messageActions.send(fa);
   }
  },
  _handleThreadNameChange: function(fa) {
   this._messageActions.send(this._messageObject.constructLogMessageObject(p.MESSENGER_WEB, this.props.thread.thread_id, m.THREAD_NAME, {
    name: fa
   }), null, k.MESSENGER);
  },
  _handleThreadPhotoChange: function(fa) {
   this._messageActions.send(this._messageObject.constructLogMessageObject(p.MESSENGER_WEB, this.props.thread.thread_id, m.THREAD_IMAGE, {
    image: fa.metadata[0]
   }));
  }
 });
 e.exports = ea;
}, null);

__d("MessengerDetailView.react", [ "immutable", "Layout.react", "MercuryIDs", "MercuryParticipants", "MercuryThreads", "MessengerComposerStore", "MessengerComposerContainer.react", "MessengerConversationContainer.react", "MessengerDetailViewHeaderContainer.react", "MessengerFlexArea.react", "MessengerInfoPanelVisibility", "MessengerStateStore", "MessengerThreadInfoPanelContainer.react", "MessengerView", "ReactComponentWithPureRenderMixin", "React", "StoreAndPropBasedStateMixin", "cx" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var y = v, z = y.PropTypes, aa = h.Column, ba = h.FillColumn, ca = v.createClass({
  displayName: "MessengerDetailView",
  mixins: [ u, w(l, r, k, j) ],
  propTypes: {
   activeThreadID: z.string,
   view: z.string,
   viewer: z.string.isRequired
  },
  statics: {
   calculateState: function(da) {
    var ea = da.activeThreadID, fa = k.getForFBID(da.viewer), ga = ea ? fa.getOrFetch(ea) : null, ha = g.Map();
    if (ga) ha = ha.withMutations(function(ia) {
     ga.participants.forEach(function(ja) {
      ia.set(ja, j.getOrFetch(ja));
     });
    });
    return {
     composerState: l.getState(),
     messengerState: r.getState(),
     activeThread: ga,
     participants: ha
    };
   }
  },
  componentDidMount: function() {
   this._infoPanelVisibility = new q();
  },
  render: function() {
   var da = this._getThreadID();
   return v.createElement("div", {
    className: "_1q5-"
   }, v.createElement(o, {
    recipients: this.state.composerState.recipients,
    participants: this.state.participants,
    thread: this.state.activeThread,
    view: this.props.view,
    viewer: this.props.viewer,
    onThreadInfoToggle: this._handleThreadInfoToggle
   }), v.createElement(h, {
    className: "_4_j4"
   }, v.createElement(ba, null, this._renderMainView(da), this._renderFooterView(da)), this._renderInfoPanel()));
  },
  _renderMainView: function(da) {
   if (!da) return v.createElement(p, {
    ref: "emptyContainer"
   });
   return v.createElement(n, {
    className: "_1wfr",
    ref: "conversationContainer",
    threadID: da,
    viewer: this.props.viewer
   });
  },
  _renderFooterView: function(da) {
   return v.createElement(m, {
    onResize: this._handleResize,
    recipients: this.state.composerState.recipients,
    threadID: da,
    view: this.props.view,
    viewer: this.props.viewer
   });
  },
  _renderInfoPanel: function() {
   if (!this.state.activeThread || !this.state.participants) return v.createElement(aa, null);
   return v.createElement(aa, {
    className: "_4_j5" + (!this.state.messengerState.infoPanelVisibility ? " " + "hidden_elem" : "")
   }, v.createElement(s, {
    className: "_4_j9",
    participants: this.state.participants,
    thread: this.state.activeThread,
    viewer: this.props.viewer,
    isVisible: this.state.messengerState.infoPanelVisibility
   }));
  },
  _handleResize: function() {
   var da = this.refs.conversationContainer, ea = this.refs.emptyContainer;
   if (da) {
    da.handleResize();
   } else if (ea) ea.recalculateHeight();
  },
  _getThreadID: function() {
   var da = this.state.composerState.recipients;
   if (this.props.view === t.DETAIL.COMPOSE && da.size === 1) return i.getThreadIDFromUserID(da.first().getUniqueID());
   if (this.props.view === t.DETAIL.THREAD) return this.props.activeThreadID;
   return null;
  },
  _handleThreadInfoToggle: function() {
   this._infoPanelVisibility.toggle();
  }
 });
 e.exports = ca;
}, null);

__d("MessengerDialogStore", [ "MessengerActions", "MessengerStore" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 for (var i in h) if (h.hasOwnProperty(i)) k[i] = h[i];
 var j = h === null ? null : h.prototype;
 k.prototype = Object.create(j);
 k.prototype.constructor = k;
 k.__superConstructor__ = h;
 function k() {
  "use strict";
  h.call(this);
  this.$MessengerDialogStore0 = {
   dialogClass: null,
   dialogProps: null
  };
 }
 k.prototype.getState = function() {
  "use strict";
  return this.$MessengerDialogStore0;
 };
 k.prototype.__onDispatch = function(l) {
  "use strict";
  switch (l.type) {
  case g.Types.SHOW_DIALOG:
   this.$MessengerDialogStore0.dialogClass = l.dialogClass;
   this.$MessengerDialogStore0.dialogProps = l.dialogProps;
   this.emitChange();
   break;

  case g.Types.HIDE_DIALOG:
   this.$MessengerDialogStore0.dialogClass = null;
   this.$MessengerDialogStore0.dialogProps = null;
   this.emitChange();
   break;
  }
 };
 e.exports = new k();
}, null);

__d("MessengerDialogContainer.react", [ "MessengerDialogStore", "PureStoreBasedStateMixin", "React", "ReactLayeredComponentMixin" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var k = i.createClass({
  displayName: "MessengerDialogContainer",
  mixins: [ h(g), j ],
  statics: {
   calculateState: function() {
    return g.getState();
   }
  },
  renderLayers: function() {
   if (!this.state.dialogClass) return {};
   var l = this.state.dialogClass;
   return {
    dialog: i.createElement(l, i.__spread({}, this.state.dialogProps))
   };
  },
  render: function() {
   return null;
  }
 });
 e.exports = k;
}, null);

__d("MessengerSettingsDialog.react", [ "ImageBlock.react", "LayerFadeOnHide", "LayerHideOnEscape", "LeftRight.react", "Link.react", "MercuryIDs", "MercuryParticipants", "MessengerActions", "MessengerButton.react", "MessengerConfig", "MessengerContactImage.react", "MessengerDesktopNotifications", "MessengerSettingsActions", "MessengerSettingsStore", "MessengerSpinner.react", "React", "StoreAndPropBasedStateMixin", "XUICheckboxInput.react", "XUIDialog.react", "cx", "fbt" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var ba = v, ca = ba.PropTypes, da = 50, ea = v.createClass({
  displayName: "MessengerSettingsDialog",
  mixins: [ w(m, t) ],
  propTypes: {
   viewer: ca.string.isRequired
  },
  statics: {
   calculateState: function(fa) {
    return {
     viewerParticipant: m.getOrFetch(l.getParticipantIDFromUserID(fa.viewer)),
     settings: t.getSettings()
    };
   }
  },
  getInitialState: function() {
   return {
    shown: true,
    desktopNotifsDenied: r.isDenied()
   };
  },
  render: function() {
   return v.createElement(y, {
    behaviors: {
     LayerFadeOnHide: h,
     LayerHideOnEscape: i
    },
    onToggle: this._handleToggle,
    ref: "dialog",
    shown: this.state.shown,
    width: 544
   }, v.createElement("div", {
    className: "_1pr-"
   }, v.createElement(j, {
    className: "_3748"
   }, v.createElement("span", {
    className: "_3749"
   }, aa._("Settings")), v.createElement(o, {
    className: "_374a",
    label: aa._("Done"),
    onClick: this._handleDone,
    type: "primary"
   })), v.createElement("div", {
    className: "_374b"
   }, v.createElement("div", {
    className: "_374c"
   }, aa._("Account")), v.createElement("div", {
    className: "_374d"
   }, this._renderAccountSection())), v.createElement("div", {
    className: "_374b"
   }, v.createElement("div", {
    className: "_374c"
   }, aa._("Sounds")), v.createElement("div", {
    className: "_374d"
   }, v.createElement(x, {
    checked: this.state.settings.sound_enabled,
    onChange: this._handleSoundChange
   }), v.createElement("span", {
    className: "_1pr_"
   }, this.state.settings.sound_enabled ? aa._("On") : aa._("Off")))), this._renderNotificationsSection(), v.createElement("div", {
    className: "_374b"
   }, v.createElement("div", {
    className: "_374c"
   }, aa._("Blocking")), v.createElement("div", {
    className: "_374d"
   }, v.createElement(k, {
    href: "https://www.facebook.com/settings?tab=blocking",
    target: "_blank"
   }, aa._("Manage on Facebook"))))));
  },
  _renderAccountSection: function() {
   if (!this.state.viewerParticipant) return v.createElement(u, null);
   var fa = this.state.viewerParticipant;
   return v.createElement(g, null, v.createElement(q, {
    isMessengerUser: fa.is_messenger_user,
    size: da,
    src: fa.big_image_src || fa.image_src
   }), v.createElement("div", {
    className: "_1ps0"
   }, fa.name));
  },
  _renderNotificationsSection: function() {
   if (!r.isSupported() || !p.EnableDesktopNotifs) return null;
   return v.createElement("div", {
    className: "_374b" + (this.state.desktopNotifsDenied ? " " + "_2bd0" : "")
   }, v.createElement("div", {
    className: "_374c"
   }, aa._("Notifications")), v.createElement("div", {
    className: "_374d"
   }, this._renderNotificationsContent()));
  },
  _renderNotificationsContent: function() {
   if (this.state.desktopNotifsDenied) {
    return aa._("You can allow Messenger to send you desktop notifications from your browser preferences.");
   } else return v.createElement(o, {
    label: this.state.settings.desktopNotifsEnabled ? aa._("Turn off desktop notifications") : aa._("Turn on desktop notifications"),
    onClick: this._handleNotificationsChange,
    type: "secondary"
   });
  },
  _handleSoundChange: function(event) {
   s.changeSettings({
    sound_enabled: event.target.checked
   });
  },
  _handleNotificationsChange: function() {
   s.changeDesktopNotifs(!this.state.settings.desktopNotifsEnabled, this._handleDenied);
  },
  _handleDenied: function() {
   this.setState({
    desktopNotifsDenied: true
   });
  },
  _handleDone: function(event) {
   event.preventDefault();
   this.setState({
    shown: false
   });
  },
  _handleToggle: function(fa) {
   if (!fa) n.hideDialog();
  }
 });
 e.exports = ea;
}, null);

__d("MessengerSettingsMenu.react", [ "AsyncDialog", "AsyncRequest", "Form", "Image.react", "ReactLayeredComponentMixin", "Link.react", "MessengerActions", "MessengerDropdownMenu.react", "MessengerSettingsDialog.react", "ReactComponentWithPureRenderMixin", "React", "XMessengerDotComLogoutController", "fbt", "cx", "ix" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var v = q, w = v.PropTypes, x = u("/unpublished/images/messenger/header/Settings.png"), y = n.Item, z = q.createClass({
  displayName: "MessengerSettingsMenu",
  mixins: [ p, k ],
  propTypes: {
   viewer: w.string.isRequired
  },
  getInitialState: function() {
   return {
    isShown: false
   };
  },
  render: function() {
   return q.createElement(l, {
    className: "_30yy",
    href: "#",
    onClick: this._handleClick,
    onMouseDown: this._prepareForClick,
    ref: "link",
    title: s._("Settings, privacy policy, help and more")
   }, q.createElement(j, {
    src: x
   }));
  },
  renderLayers: function() {
   return {
    contextualDialog: q.createElement(n, {
     context: q.findDOMNode(this.refs.link),
     onBlur: this._handleBlur,
     position: "below",
     shown: this.state.isShown
    }, q.createElement(y, {
     label: s._("Settings"),
     onClick: this._handleSettingsClick
    }), n.SEPARATOR, q.createElement(y, {
     href: "https://www.messenger.com/about",
     label: s._("About"),
     target: "_blank"
    }), q.createElement(y, {
     href: "https://www.facebook.com/policies",
     label: s._("Terms"),
     target: "_blank"
    }), q.createElement(y, {
     href: "https://www.facebook.com/privacy/explanation",
     label: s._("Privacy Policy"),
     target: "_blank"
    }), q.createElement(y, {
     href: "https://www.facebook.com/help/cookies",
     label: s._("Cookie Policy"),
     target: "_blank"
    }), n.SEPARATOR, q.createElement(y, {
     href: "https://www.facebook.com/help/735006619902401",
     label: s._("Help"),
     target: "_blank"
    }), q.createElement(y, {
     label: s._("Report a Problem"),
     onClick: this._handleReportBugClick
    }), n.SEPARATOR, q.createElement(y, {
     label: s._("Log out"),
     onClick: this._handleLogOut
    }))
   };
  },
  _handleClick: function(aa) {
   aa.preventDefault();
   !this._clickGuard && this.setState({
    isShown: true
   });
  },
  _handleSettingsClick: function(aa) {
   aa.preventDefault();
   m.showDialog(o, {
    viewer: this.props.viewer
   });
   this.setState({
    isShown: false
   });
  },
  _handleReportBugClick: function(aa) {
   aa.preventDefault();
   g.send(new h("/ajax/bugs/report"));
   this.setState({
    isShown: false
   });
  },
  _handleBlur: function() {
   this.setState({
    isShown: false
   });
  },
  _handleLogOut: function() {
   this.setState({
    isShown: false
   }, function() {
    i.post(r.getURIBuilder().getURI(), {});
   });
  },
  _prepareForClick: function() {
   this._clickGuard = this.state.isShown;
  }
 });
 e.exports = z;
}, null);

__d("MessengerMasterViewHeader.react", [ "Image.react", "Layout.react", "Link.react", "MessengerActions", "MessengerSettingsMenu.react", "MessengerURIConstants", "MessengerView", "ReactComponentWithPureRenderMixin", "React", "cx", "fbt", "ix" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var s = h.Column, t = h.FillColumn, u = o, v = u.PropTypes, w = r("/unpublished/images/messenger/header/NewMessage.png"), x = o.createClass({
  displayName: "MessengerMasterViewHeader",
  mixins: [ n ],
  propTypes: {
   viewer: v.string.isRequired
  },
  render: function() {
   return o.createElement(h, {
    className: "_36ic _5vn4"
   }, o.createElement(s, null, o.createElement(k, {
    viewer: this.props.viewer
   })), o.createElement(t, {
    className: "_1tqi"
   }, q._("Messenger")), o.createElement(s, null, o.createElement(i, {
    className: "_30yy",
    href: l.COMPOSE_SUBPATH,
    onClick: this._handleAddClick
   }, o.createElement(g, {
    src: w
   }))));
  },
  _handleAddClick: function(y) {
   y.preventDefault();
   j.changeDetailView(m.DETAIL.COMPOSE);
  }
 });
 e.exports = x;
}, null);

__d("MessengerSearchTypeahead.react", [ "AbstractTypeahead.react", "Image.react", "MercuryIDs", "MercuryTypeaheadConstants", "MessengerActions", "MessengerSearchSource", "MessengerTypeaheadUtils", "MessengerTypeaheadView.react", "React", "cx", "fbt", "ix", "MercuryServerRequests", "MercuryThreads" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var s = b("MercuryServerRequests").get(), t = b("MercuryThreads").get(), u = o, v = u.PropTypes, w = r("/unpublished/images/messenger/threadlist/InboxThreadDismiss.png"), x = 100, y = o.createClass({
  displayName: "MessengerSearchTypeahead",
  propTypes: {
   isFocused: v.bool,
   onBlur: v.func,
   onChange: v.func,
   onClear: v.func,
   onFocus: v.func,
   onScrollIntoView: v.func,
   queryString: v.string,
   viewer: v.string.isRequired
  },
  getInitialState: function() {
   return {
    isLoading: false
   };
  },
  render: function() {
   return o.createElement("div", null, o.createElement(g, {
    autoHighlight: false,
    className: "_5iwm" + (this.props.isFocused || !!this.props.queryString ? " " + "_5iwn" : ""),
    onBlur: this.props.onBlur,
    onChange: this.props.onChange,
    onFocus: this.props.onFocus,
    onSelectAttempt: this._handleSelect,
    placeholder: q._("Search for people and groups"),
    presenter: {
     ViewRenderer: n,
     alwaysVisibleOnFocus: true,
     extraRendererProps: {
      className: "_11_d",
      hasHoverState: false,
      isLoading: this.state.isLoading,
      onScrollIntoView: this.props.onScrollIntoView,
      viewer: this.props.viewer
     },
     maxEntries: x,
     sortEntries: this._sortEntries,
     useLayer: false
    },
    queryString: this.props.queryString,
    searchSource: l.getForFBID(this.props.viewer),
    searchSourceOptions: {
     onQueryFinished: this._handleQueryFinished,
     onQueryStarted: this._handleQueryStarted,
     showDefaultEntries: true
    },
    selectOnTab: true,
    showEntriesOnFocus: true
   }), o.createElement(h, {
    onMouseDown: this.props.onClear,
    className: (!this.props.queryString ? "hidden_elem" : "") + (" " + "_2xme"),
    src: w
   }));
  },
  _handleQueryStarted: function(z) {
   if (z === this.props.queryString) this.setState({
    isLoading: true
   });
  },
  _handleQueryFinished: function(z) {
   if (z === this.props.queryString) this.setState({
    isLoading: false
   });
  },
  _sortEntries: function(z) {
   return m.sortEntries(z);
  },
  _handleSelect: function(z) {
   var aa = z.getUniqueID();
   if (z.getType() === j.THREAD_TYPE) {
    s.getClientThreadID(aa, function(ba) {
     k.selectThread(ba);
    });
   } else t.getThreadMeta(i.getThreadIDFromUserID(aa), function(ba) {
    k.selectThread(ba.thread_id);
   });
  }
 });
 e.exports = y;
}, null);

__d("MessengerThreadlistNewMessageRow.react", [ "Image.react", "ImageBlock.react", "LeftRight.react", "Link.react", "MercuryIDs", "MercuryParticipantListRenderer", "MercuryParticipants", "MercuryParticipantsImage.react", "MessengerComposerStore", "MessengerProfileImageWrapper.react", "ReactComponentWithPureRenderMixin", "PureStoreBasedStateMixin", "React", "cx", "ix" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var v = 50, w = u("/unpublished/images/messenger/threadlist/NewMessage.png"), x = s, y = x.PropTypes, z = s.createClass({
  displayName: "MessengerThreadlistNewMessageRow",
  mixins: [ q, r(m, o) ],
  propTypes: {
   onClose: y.func.isRequired
  },
  statics: {
   calculateState: function() {
    return {
     participants: o.getState().recipients.map(function(aa) {
      return m.getOrFetch(k.getParticipantIDFromUserID(aa.getUniqueID()));
     }).filter(function(aa) {
      return !!aa;
     })
    };
   }
  },
  render: function() {
   return s.createElement("li", {
    className: "_1ht1 _1ht2"
   }, s.createElement(h, {
    className: "_1ht5",
    spacing: "medium"
   }, this._renderImage(), s.createElement("div", {
    className: "_1qt4"
   }, s.createElement(i, {
    className: "_1qt5",
    direction: i.DIRECTION.right
   }, s.createElement("span", {
    className: "_1ht6"
   }, this._renderTitle()), s.createElement(j, {
    className: "_23ct",
    onClick: this.props.onClose
   })))));
  },
  _renderImage: function() {
   var aa = this.state.participants;
   if (!aa.isEmpty()) return s.createElement(p, {
    className: "_1qt3",
    isMessengerUser: aa.size === 1 && aa.first().is_messenger_user,
    size: v,
    showBadge: aa.size === 1
   }, s.createElement(n, {
    participants: aa.map(function(ba) {
     return ba.id;
    }).slice(0, 3).toArray(),
    size: v
   }));
   return s.createElement(g, {
    className: "_1qt3",
    height: v,
    src: w,
    width: v
   });
  },
  _renderTitle: function() {
   return new l().setIsNewThread(true).renderParticipantList(this.state.participants.toArray());
  }
 });
 e.exports = z;
}, null);

__d("MessengerDeleteDialog.react", [ "MessengerDialog.react", "MessengerDialogBody.react", "MessengerDialogButton.react", "MessengerDialogFooter.react", "MessengerDialogHeader.react", "React", "fbt" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var n = l, o = n.PropTypes, p = l.createClass({
  displayName: "MessengerDeleteDialog",
  propTypes: {
   onArchive: o.func,
   onDelete: o.func,
   onToggle: o.func
  },
  render: function() {
   return l.createElement(g, {
    onToggle: this.props.onToggle
   }, l.createElement(k, null, m._("Delete Conversation")), l.createElement(h, null, m._("This will permanently delete the conversation history.")), l.createElement(j, null, l.createElement(i, {
    action: "cancel",
    label: m._("Cancel"),
    type: "secondary"
   }), l.createElement(i, {
    label: m._("Archive"),
    onClick: this._handleArchive,
    type: "secondary"
   }), l.createElement(i, {
    label: m._("Delete"),
    onClick: this._handleDelete,
    type: "primary",
    use: "danger"
   })));
  },
  _handleArchive: function() {
   this.props.onToggle && this.props.onToggle(false);
   this.props.onArchive && this.props.onArchive();
  },
  _handleDelete: function() {
   this.props.onToggle && this.props.onToggle(false);
   this.props.onDelete && this.props.onDelete();
  }
 });
 e.exports = p;
}, null);

__d("MessengerMarkSpamDialog.react", [ "MessengerActions", "MessengerDialog.react", "MessengerDialogBody.react", "MessengerDialogButton.react", "MessengerDialogFooter.react", "MessengerDialogHeader.react", "ReactComponentWithPureRenderMixin", "React", "fbt" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var p = n, q = p.PropTypes, r = n.createClass({
  displayName: "MessengerMarkSpamDialog",
  mixins: [ m ],
  propTypes: {
   onMarkSpam: q.func,
   onToggle: q.func
  },
  render: function() {
   return n.createElement(h, {
    onToggle: this.props.onToggle
   }, n.createElement(l, null, o._("Mark as Spam")), n.createElement(i, null, o._("This conversation will be reported as spam and removed.")), n.createElement(k, null, n.createElement(j, {
    action: "cancel",
    label: o._("Cancel"),
    type: "secondary"
   }), n.createElement(j, {
    label: o._("Mark as Spam"),
    onClick: this._handleMarkSpam,
    type: "primary",
    use: "danger"
   })));
  },
  _handleMarkSpam: function(s) {
   s.stopPropagation();
   this.props.onToggle && this.props.onToggle(false);
   this.props.onMarkSpam && this.props.onMarkSpam();
   g.hideDialog();
  }
 });
 e.exports = r;
}, null);

__d("MessengerThreadlistRowActions.react", [ "ReactLayeredComponentMixin", "MessengerActions", "MessengerDeleteDialog.react", "MessengerDropdownMenu.react", "MessengerLayerContext.react", "MessengerMarkSpamDialog.react", "MessengerMuteDialog.react", "ReactComponentWithPureRenderMixin", "React", "cx", "fbt", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var s = j.Item, t = o, u = t.PropTypes, v = o.createClass({
  displayName: "MessengerThreadlistRowActions",
  mixins: [ n, g ],
  propTypes: {
   isMuted: u.bool,
   isOpen: u.bool,
   isUnread: u.bool,
   onArchive: u.func,
   onDelete: u.func,
   onMarkRead: u.func,
   onMarkSpam: u.func,
   onMarkUnread: u.func,
   onMute: u.func,
   onToggle: u.func,
   onUnmute: u.func
  },
  render: function() {
   return o.createElement(k, {
    className: r(this.props.className, "_4-0h" + (this.props.isOpen ? " " + "_4-0i" : "")),
    isActive: this.props.isOpen,
    onClick: this._handleLinkClick,
    onGuardedClick: this._handleGuardedClick,
    ref: "context"
   });
  },
  renderLayers: function() {
   return {
    contextualDialog: o.createElement(j, {
     alignment: "right",
     context: o.findDOMNode(this.refs.context),
     onBlur: this._handleBlur,
     position: "below",
     shown: this.props.isOpen
    }, o.createElement(s, {
     label: this.props.isMuted ? q._("Unmute") : q._("Mute"),
     onClick: this._handleMuteClick
    }), o.createElement(s, {
     label: q._("Delete"),
     onClick: this._handleDeleteClick
    }), j.SEPARATOR, o.createElement(s, {
     label: this.props.isUnread ? q._("Mark as Read") : q._("Mark as Unread"),
     onClick: this._handleMarkReadClick
    }), o.createElement(s, {
     label: q._("Mark as Spam"),
     onClick: this._handleMarkSpamClick
    }))
   };
  },
  _handleLinkClick: function(w) {
   this._handleGuardedClick(w);
   this.props.onToggle && this.props.onToggle(true);
  },
  _handleGuardedClick: function(w) {
   w.preventDefault();
   w.stopPropagation();
  },
  _handleDeleteClick: function() {
   this._handleBlur();
   h.showDialog(i, {
    onArchive: this.props.onArchive,
    onDelete: this.props.onDelete,
    onToggle: this._handleDialogToggle
   });
  },
  _handleMuteClick: function() {
   this._handleBlur();
   if (this.props.isMuted) {
    this.props.onUnmute && this.props.onUnmute();
   } else h.showDialog(m, {
    onMute: this.props.onMute,
    onToggle: this._handleDialogToggle
   });
  },
  _handleMarkReadClick: function() {
   if (this.props.isUnread) {
    this.props.onMarkRead && this.props.onMarkRead();
   } else this.props.onMarkUnread && this.props.onMarkUnread();
  },
  _handleMarkSpamClick: function() {
   this._handleBlur();
   h.showDialog(l, {
    onMarkSpam: this.props.onMarkSpam,
    onToggle: this._handleDialogToggle
   });
  },
  _handleBlur: function() {
   this.props.onToggle && this.props.onToggle(false);
  },
  _handleDialogToggle: function(w) {
   if (!w) h.hideDialog();
  }
 });
 e.exports = v;
}, null);

__d("MessengerThreadlistRowSeenHead.react", [ "Image.react", "immutable", "ImmutableObject", "MercuryIDs", "MercuryMessageInfo", "ReactComponentWithPureRenderMixin", "React", "cx", "joinClasses" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var p = m, q = p.PropTypes, r = m.createClass({
  displayName: "MessengerThreadlistRowSeenHead",
  mixins: [ l ],
  propTypes: {
   isHidden: q.bool,
   lastMessage: q.instanceOf(i),
   participants: q.instanceOf(h.Map).isRequired,
   readReceipts: q.instanceOf(h.OrderedMap).isRequired,
   thread: q.instanceOf(i).isRequired,
   viewer: q.string.isRequired
  },
  render: function() {
   if (this.props.isHidden || !this.props.thread.is_canonical) return null;
   var t = this.props, u = t.lastMessage, v = t.participants, w = t.readReceipts, x = t.thread, y = t.viewer, z = j.getParticipantIDFromUserID(y), aa = j.getParticipantIDFromUserID(x.canonical_fbid), ba = w.get(aa), ca = v.get(aa);
   if (!ca || !s(z, ba, x, u)) return null;
   return m.createElement(g, {
    className: o(this.props.className, "_2_a2"),
    src: ca.image_src,
    title: ca.name
   });
  }
 });
 function s(t, u, v, w) {
  if (w) {
   return w.author === t && u >= w.timestamp && !k.isSending(w) && !k.hasError(w);
  } else return v.snippet_sender === t && u >= v.timestamp;
 }
 e.exports = r;
}, null);

__d("MessengerThreadlistRow.react", [ "Image.react", "ImageBlock.react", "immutable", "ImmutableObject", "LeftRight.react", "Link.react", "MercuryMessageInfo", "MercuryThreadSnippet.react", "MercuryThreadTimestamp.react", "MercuryThreadTitle.react", "MessengerThreadImage.react", "MessengerThreadlistRowActions.react", "MessengerThreadlistRowSeenHead.react", "ReactComponentWithPureRenderMixin", "React", "cx", "ix" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var x = u, y = x.PropTypes, z = 50, aa = w("/unpublished/images/messenger/message/messageStateFailed.png"), ba = w("/unpublished/images/messenger/message/messageStateSending.png"), ca = u.createClass({
  displayName: "MessengerThreadlistRow",
  mixins: [ t ],
  propTypes: {
   isActive: y.bool,
   isMuted: y.bool,
   lastMessage: y.instanceOf(j),
   onArchive: y.func,
   onDelete: y.func,
   onMarkRead: y.func,
   onMarkSpam: y.func,
   onMarkUnread: y.func,
   onMute: y.func,
   onSelect: y.func,
   onUnmute: y.func,
   participants: y.instanceOf(i.Map).isRequired,
   readReceipts: y.instanceOf(i.OrderedMap).isRequired,
   thread: y.instanceOf(j).isRequired,
   viewer: y.string.isRequired,
   wasSeenByAll: y.bool
  },
  getInitialState: function() {
   return {
    actionsOpen: false
   };
  },
  render: function() {
   var da = this.props, ea = da.participants, fa = da.thread, ga = da.viewer;
   return u.createElement("li", {
    className: "_1ht1" + (this.props.isActive ? " " + "_1ht2" : "") + (fa.unread_count > 0 ? " " + "_1ht3" : "") + (this.state.actionsOpen ? " " + "_13aa" : "") + (this.props.isMuted ? " " + "_569x" : "")
   }, u.createElement(l, {
    onClick: this._handleClick
   }, u.createElement(h, {
    className: "_1ht5",
    spacing: "medium"
   }, u.createElement("div", {
    className: "_1qt3"
   }, u.createElement(q, {
    participants: ea,
    size: z,
    thread: fa,
    viewer: ga
   })), u.createElement("div", {
    className: "_1qt4"
   }, u.createElement(k, {
    className: "_1qt5",
    direction: k.DIRECTION.right
   }, u.createElement(p, {
    className: "_1ht6",
    showUnreadCount: false,
    thread: fa,
    useShortName: false,
    viewer: ga
   }), u.createElement("div", null, u.createElement(o, {
    className: "_1ht7",
    time: fa.timestamp,
    title: fa.timestamp_absolute,
    text: fa.timestamp_relative
   }))), u.createElement(k, {
    className: "_1qt5",
    direction: k.DIRECTION.right
   }, u.createElement(n, {
    className: "_1htf",
    participants: ea,
    shouldRenderYou: true,
    thread: fa,
    viewer: ga
   }), u.createElement("div", null, u.createElement(s, {
    className: "_5bli",
    isHidden: this.state.actionsOpen,
    lastMessage: this.props.lastMessage,
    participants: ea,
    readReceipts: this.props.readReceipts,
    thread: fa,
    viewer: ga
   }), this._renderSendingState(), u.createElement(r, {
    className: "_5blh",
    isMuted: this.props.isMuted,
    isOpen: this.state.actionsOpen,
    isUnread: fa.unread_count > 0,
    onArchive: this.props.onArchive,
    onDelete: this.props.onDelete,
    onMarkRead: this.props.onMarkRead,
    onMarkSpam: this.props.onMarkSpam,
    onMarkUnread: this.props.onMarkUnread,
    onMute: this.props.onMute,
    onToggle: this._handleActionsToggle,
    onUnmute: this.props.onUnmute
   }), u.createElement("div", {
    className: "_56ck"
   })))))));
  },
  _renderSendingState: function() {
   var da = this.props.lastMessage;
   if (this.state.actionsOpen || !da) return null;
   var ea = m.isSending(da), fa = m.hasError(da);
   if (!ea && !fa) return null;
   return u.createElement(g, {
    className: "_wtw" + (ea ? " " + "_3qh2" : ""),
    src: ea ? ba : aa
   });
  },
  _handleClick: function(da) {
   da.preventDefault();
   this.props.onSelect && this.props.onSelect();
  },
  _handleActionsToggle: function(da) {
   this.setState({
    actionsOpen: da
   });
  }
 });
 e.exports = ca;
}, null);

__d("MessengerThreadlistRowContainer.react", [ "ImmutableObject", "MercuryMessages", "MercuryRoger", "MercuryThreadActions", "MercuryThreadInfo", "MercuryThreadlistRowContainer.react", "MessengerActions", "MessengerThreadlistRow.react", "ReactComponentWithPureRenderMixin", "React", "StoreAndPropBasedStateMixin" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var r = p, s = r.PropTypes, t = p.createClass({
  displayName: "MessengerThreadlistRowContainer",
  mixins: [ o, q(h, i) ],
  propTypes: {
   isActive: s.bool,
   thread: s.instanceOf(g).isRequired,
   viewer: s.string.isRequired
  },
  statics: {
   calculateState: function(u) {
    var v = h.getForFBID(u.viewer), w = u.thread.thread_id, x = v.getThreadMessagesRangeNow(w, 0, 1)[0];
    return {
     lastMessage: x || null,
     readReceipts: i.getSeenTimestamps(w)
    };
   }
  },
  componentWillMount: function() {
   this._actions = j.getForFBID(this.props.viewer);
  },
  componentDidUpdate: function(u) {
   if (this.props.isActive && !u.isActive) this.props.onScrollIntoView(p.findDOMNode(this));
  },
  render: function() {
   return p.createElement(l, {
    ChildClass: n,
    isActive: this.props.isActive,
    isMuted: k.isMuted(this.props.thread),
    lastMessage: this.state.lastMessage,
    onArchive: this._handleArchive,
    onDelete: this._handleDelete,
    onMarkRead: this._handleMarkRead,
    onMarkSpam: this._handleMarkSpam,
    onMarkUnread: this._handleMarkUnread,
    onMute: this._handleMute,
    onSelect: this._handleSelect,
    onUnmute: this._handleUnmute,
    readReceipts: this.state.readReceipts,
    thread: this.props.thread,
    viewer: this.props.viewer
   });
  },
  _handleArchive: function() {
   var u = this.props.isActive;
   this._actions.archive(this.props.thread.thread_id);
   u && m.selectThread(null);
  },
  _handleDelete: function() {
   var u = this.props.isActive;
   this._actions["delete"](this.props.thread.thread_id);
   u && m.selectThread(null);
  },
  _handleMarkRead: function() {
   this._actions.markRead(this.props.thread.thread_id);
  },
  _handleMarkSpam: function() {
   var u = this.props.isActive;
   this._actions.markSpam(this.props.thread.thread_id);
   u && m.selectThread(null);
  },
  _handleMarkUnread: function() {
   this._actions.markUnread(this.props.thread.thread_id);
  },
  _handleMute: function(u) {
   this._actions.updateMuteSetting(this.props.thread.thread_id, u);
  },
  _handleSelect: function() {
   m.selectThread(this.props.thread.thread_id);
  },
  _handleUnmute: function() {
   this._actions.unmute(this.props.thread.thread_id);
  }
 });
 e.exports = t;
}, null);

__d("MessengerThreadlist.react", [ "ImmutableObject", "KeyEventController", "Link.react", "MercuryThreadInfo", "MessengerActions", "MessengerConfig", "MessengerDialogStore", "MessengerFlexScrollableArea.react", "MessengerSearchTypeahead.react", "MessengerSpinner.react", "MessengerThreadlistNewMessageRow.react", "MessengerThreadlistRowContainer.react", "MessengerTypeaheadUtils", "PureStoreBasedStateMixin", "React", "SubscriptionsHandler", "cx", "fbt" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var y = u, z = y.PropTypes;
 function aa(ca, da, ea) {
  if (!(ca && da)) return false;
  var fa = ca[0] || 0, ga = da[0] || 0;
  return !!(fa && ga && fa.unread_count && fa.thread_id !== ea && (fa.unread_count !== ga.unread_count || fa !== ga) && !j.isMuted(fa));
 }
 var ba = u.createClass({
  displayName: "MessengerThreadlist",
  mixins: [ t(m) ],
  propTypes: {
   activeThreadID: z.string,
   isComposing: z.bool,
   isLoaded: z.bool,
   isLoading: z.bool,
   onLoadMoreRequest: z.func,
   threads: z.arrayOf(z.instanceOf(g)).isRequired,
   viewer: z.string.isRequired
  },
  statics: {
   calculateState: function() {
    return {
     dialogShown: !!m.getState().dialogClass
    };
   }
  },
  getInitialState: function() {
   return {
    isSearchFocused: false,
    queryString: "",
    searchResults: [],
    showNewMessagesNotice: false
   };
  },
  componentWillMount: function() {
   this._subscriptions = new v();
   this._subscriptions.addSubscriptions(h.registerKey("UP", function() {
    return this._handleArrowKey(-1);
   }.bind(this)), h.registerKey("DOWN", function() {
    return this._handleArrowKey(1);
   }.bind(this)));
  },
  componentWillUnmount: function() {
   this._subscriptions && this._subscriptions.release();
  },
  componentWillReceiveProps: function(ca, da) {
   var ea = this.refs.scrollable.isScrolledToTop();
   if (!l.DisableNewMessagePill) if (!ea && aa(ca.threads, this.props.threads, ca.activeThreadID)) {
    this.setState({
     showNewMessagesNotice: true
    });
   } else this.setState({
    showNewMessagesNotice: this.state.showNewMessagesNotice && !ea
   });
  },
  componentDidUpdate: function(ca, da) {
   if (this.state.isSearchFocused !== da.isSearchFocused || this.props.isComposing && !ca.isComposing) this.refs.scrollable && this.refs.scrollable.scrollToTop();
  },
  render: function() {
   return u.createElement("div", {
    className: "_2xhi _5vn4"
   }, u.createElement("div", {
    className: "_2xhj" + (this.state.showNewMessagesNotice && !this.state.isSearchFocused ? " " + "shown" : "")
   }, u.createElement(i, {
    className: "_2xhl",
    onClick: this._handleNewMessageNoticeClick
   }, x._("New Messages"))), u.createElement(n, {
    onScroll: this._handleScroll,
    ref: "scrollable"
   }, u.createElement(o, {
    isFocused: this.state.isSearchFocused,
    onBlur: this._handleBlur,
    onChange: this._handleChange,
    onClear: this._handleClear,
    onFocus: this._handleFocus,
    onScrollIntoView: this._handleScrollIntoView,
    queryString: this.state.queryString,
    viewer: this.props.viewer
   }), u.createElement("div", {
    className: this.state.isSearchFocused ? "hidden_elem" : ""
   }, u.createElement("ul", null, this.props.isComposing ? u.createElement(q, {
    onClose: this._handleCloseNewMessage
   }) : null, this.props.threads.map(function(ca) {
    return u.createElement(r, {
     isActive: ca.thread_id === this.props.activeThreadID,
     key: ca.thread_id,
     onScrollIntoView: this._handleScrollIntoView,
     thread: ca,
     viewer: this.props.viewer
    });
   }.bind(this))), this._renderLoadMoreLink())));
  },
  _renderLoadMoreLink: function() {
   if (this.props.isLoaded) return null;
   if (this.props.isLoading) return u.createElement("div", {
    className: "_19hf"
   }, u.createElement(p, null));
   return u.createElement("div", {
    className: "_19hf"
   }, u.createElement(i, {
    href: "#",
    onClick: this._handleLoadMoreClick
   }, x._("Show Older")));
  },
  _handleScroll: function() {
   if (this.props.isLoaded || this.state.isSearchFocused) return;
   if (this.refs.scrollable.isScrolledToBottom()) this.props.onLoadMoreRequest && this.props.onLoadMoreRequest();
   if (this.refs.scrollable.isScrolledToTop() && this.state.showNewMessagesNotice) this.setState({
    showNewMessagesNotice: false
   });
  },
  _handleLoadMoreClick: function(ca) {
   ca.preventDefault();
   this.props.onLoadMoreRequest && this.props.onLoadMoreRequest();
  },
  _handleNewMessageNoticeClick: function(ca) {
   ca.preventDefault();
   this.setState({
    showNewMessagesNotice: false
   });
   this.refs.scrollable.scrollToTop();
  },
  _handleArrowKey: function(ca) {
   if (this.state.isSearchFocused || this.state.dialogShown) return;
   var da = this.props.threads.findIndex(function(fa) {
    return fa.thread_id === this.props.activeThreadID;
   }.bind(this));
   if (da === -1) return;
   var ea = this.props.threads[da + ca];
   if (ea) k.selectThread(ea.thread_id);
   if (da === this.props.threads.length - 1) this.props.onLoadMoreRequest && this.props.onLoadMoreRequest();
  },
  _handleFocus: function() {
   this.setState({
    isSearchFocused: true
   });
  },
  _handleBlur: function() {
   this.setState({
    isSearchFocused: false,
    queryString: ""
   });
  },
  _handleChange: function(event) {
   this.setState({
    queryString: event.target.value
   });
  },
  _handleClear: function() {
   this.setState({
    queryString: ""
   });
  },
  _handleScrollIntoView: function(ca) {
   s.scrollEntryIntoView(ca, this.refs.scrollable);
  },
  _handleCloseNewMessage: function() {
   var ca = this.props.threads.find(function(da) {
    return da.unread_count === 0;
   });
   k.selectThread(ca ? ca.thread_id : null);
  }
 });
 e.exports = ba;
}, null);

__d("MessengerRecentContainer.react", [ "MercuryThreadlistContainer.react", "MessagingTag", "MessengerThreadlist.react", "React" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var k = j, l = k.PropTypes, m = j.createClass({
  displayName: "MessengerRecentContainer",
  propTypes: {
   activeThreadID: l.string,
   isComposing: l.bool,
   viewer: l.string.isRequired
  },
  render: function() {
   return j.createElement(g, {
    ChildClass: i,
    activeThreadID: this.props.activeThreadID,
    folder: h.INBOX,
    isComposing: this.props.isComposing,
    viewer: this.props.viewer
   });
  }
 });
 e.exports = m;
}, null);

__d("MessengerMasterView.react", [ "MessengerMasterViewHeader.react", "MessengerRecentContainer.react", "MessengerView", "ReactComponentWithPureRenderMixin", "React" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var l = k, m = l.PropTypes, n = k.createClass({
  displayName: "MessengerMasterView",
  mixins: [ j ],
  propTypes: {
   activeThreadID: m.string,
   detailView: m.string,
   view: m.string.isRequired,
   viewer: m.string.isRequired
  },
  render: function() {
   return k.createElement("div", null, k.createElement(g, {
    viewer: this.props.viewer
   }), this._renderMainView());
  },
  _renderMainView: function() {
   switch (this.props.view) {
   case i.MASTER.RECENT:
    return k.createElement(h, {
     activeThreadID: this.props.activeThreadID,
     isComposing: this.props.detailView === i.DETAIL.COMPOSE,
     viewer: this.props.viewer
    });

   default:
    throw "Unknown master view: " + this.props.view;
   }
  }
 });
 e.exports = n;
}, null);

__d("Messenger.react", [ "CurrentUser", "Layout.react", "MessengerInterstitialBanner.react", "MessengerBugNub.react", "MessengerDetailView.react", "MessengerDialogContainer.react", "MessengerStateStore", "MessengerMasterView.react", "ReactComponentWithPureRenderMixin", "React", "PureStoreBasedStateMixin", "cx" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var s = h.Column, t = h.FillColumn, u = p, v = u.PropTypes, w = p.createClass({
  displayName: "Messenger",
  mixins: [ o, q(m) ],
  propTypes: {
   isBrowserUnsupported: v.bool,
   mobileAppInfo: v.objectOf(v.bool),
   viewer: v.string.isRequired
  },
  statics: {
   calculateState: function() {
    return m.getState();
   }
  },
  componentWillUnmount: function() {
   m.unregister();
  },
  render: function() {
   return p.createElement("div", null, p.createElement(i, {
    isBrowserUnsupported: this.props.isBrowserUnsupported,
    mobileAppInfo: this.props.mobileAppInfo
   }), p.createElement(h, {
    className: "_4sp8 _li"
   }, p.createElement(s, {
    className: "_1enh"
   }, p.createElement(n, {
    activeThreadID: this.state.activeThreadID,
    detailView: this.state.detailView,
    view: this.state.masterView,
    viewer: g.getID()
   }), g.isEmployee() ? p.createElement(j, null) : null), p.createElement(t, null, p.createElement(k, {
    activeThreadID: this.state.activeThreadID,
    view: this.state.detailView,
    viewer: g.getID()
   })), p.createElement(l, null)));
  }
 });
 e.exports = w;
}, null);

__d("MessengerRTCMessageHandler", [ "Bootloader", "FBRTCCallSummaryUploader", "FBRTCMessageListener", "VideoCallSupport" ], function(a, b, c, d, e, f, g, h, i, j) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var k = null, l = {
  init: function() {
   if (j.isReceiveWebrtcSupported()) {
    h.init();
    i.init();
    i.once("messageReceived", function(n) {
     m();
    });
   }
  }
 };
 function m() {
  if (!k) g.loadModules([ "FBRTCIncomingCallController", "MessengerRTCIncomingDialogController", "MessengerRTCMissedCallDialogController", "MessengerRTCUnsupportedBrowserDialogController" ], function(n, o, p, q) {
   k = new n(o, q, p);
   i.setMessageHandler(k.onMessageReceived, k);
  });
 }
 e.exports = l;
}, null);

__d("MessengerURIListener", [ "MessengerActions", "MessengerURISerializer", "PageTransitions" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var j = false, k = {
  start: function() {
   if (!j) i.registerHandler(l, 6);
   j = true;
  },
  stop: function() {
   i.removeHandler(l, 6);
   j = false;
  }
 };
 function l(m) {
  var n = h.deserialize(m);
  i.transitionComplete();
  g.changeState(n);
  return true;
 }
 e.exports = k;
}, null);

__d("MessengerMount", [ "CSS", "ChannelManager", "CurrentUser", "MercuryChannelHandler", "MercuryDelayedRoger", "MercuryDeliveryState", "MercuryOrderedThreadlist", "MercuryParticipants", "MercuryServerRequests", "MercuryStateCheck", "MercuryThreads", "MercuryUnreadState", "MercuryUnseenState", "Messenger.react", "MessengerActions", "MessengerBrowserAlerts", "MessengerComposerStore", "MessengerConfig", "MessengerPage", "MessengerRTCMessageHandler", "MessengerSettingsStore", "MessengerStateStore", "MessengerURIListener", "React", "URI", "goURI", "cx" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, ba, ca, da, ea, fa, ga) {
 b.__markCompiled && b.__markCompiled();
 "use strict";
 var ha = {
  mount: function(la, ma) {
   y.emit(y.Events.JS_LOADED);
   var na = i.getID();
   ia(na);
   ja(na);
   ka(na, ma);
   y.emit(y.Events.DATA_INITIALIZED);
   g.addClass(document.documentElement, "_5s5h");
   g.addClass(document.body, "_5s5h");
   da.render(da.createElement(t, {
    isBrowserUnsupported: ma.isBrowserUnsupported,
    mobileAppInfo: ma.mobileAppInfo,
    viewer: na
   }), la, function() {
    y.emit(y.Events.APP_MOUNTED);
   });
  }
 };
 function ia(la) {
  k;
  l.getForFBID(la);
  m.getForFBID(la);
  n;
  q.getForFBID(la);
  r.getForFBID(la);
  s.getForFBID(la);
  w;
  aa;
  ba;
 }
 function ja(la) {
  ca.start();
  j.getForFBID(la).turnOn();
  h.init();
  v.init(la);
  p.initialize();
  if (x.EnableRtcGK) z.init();
 }
 function ka(la, ma) {
  var na = o.getForFBID(la);
  na.handleUpdate(ma.mercuryPayload);
  fa(ea(window.location.href));
  var oa = na.getClientThreadIDNow(ma.lastReadThreadKey);
  if (oa) u.selectThread(oa);
 }
 e.exports = ha;
}, null);