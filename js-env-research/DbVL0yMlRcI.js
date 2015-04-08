if (self.CavalryLogger) {
 CavalryLogger.start_js([ "d7V4X" ]);
}

__d("DetectBrokenProxyCache", [ "AsyncSignal", "Cookie", "URI" ], function(a, b, c, d, e, f, g, h, i) {
 b.__markCompiled && b.__markCompiled();
 function j(k, l) {
  var m = h.get(l);
  if (m != k && m != null && k != "0") {
   var n = {
    c: "si_detect_broken_proxy_cache",
    m: l + " " + k + " " + m
   }, o = new i("/common/scribe_endpoint.php").getQualifiedURI().toString();
   new g(o, n).send();
  }
 }
 e.exports = {
  run: j
 };
}, null);

__d("DimensionLogging", [ "BanzaiNectar", "DOMDimensions" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 var i = h.getViewportDimensions();
 g.log("browser_dimension", "homeload", {
  x: i.width,
  y: i.height,
  sw: window.screen.width,
  sh: window.screen.height,
  aw: window.screen.availWidth,
  ah: window.screen.availHeight,
  at: window.screen.availTop,
  al: window.screen.availLeft
 });
}, null);

__d("DimensionTracking", [ "Cookie", "DOMDimensions", "Event", "debounce", "isInIframe" ], function(a, b, c, d, e, f, g, h, i, j, k) {
 b.__markCompiled && b.__markCompiled();
 function l() {
  var m = h.getViewportDimensions();
  g.set("wd", m.width + "x" + m.height);
 }
 if (!k()) {
  setTimeout(l, 100);
  i.listen(window, "resize", j(l, 250));
  i.listen(window, "focus", l);
 }
}, null);

__d("HighContrastMode", [ "AccessibilityLogger", "CSS", "CurrentUser", "DOM", "Style", "emptyFunction" ], function(a, b, c, d, e, f, g, h, i, j, k, l) {
 b.__markCompiled && b.__markCompiled();
 var m = {
  init: function(n) {
   if (window.top !== window.self) return;
   var o = j.create("div");
   j.appendContent(document.body, o);
   o.style.cssText = "border: 1px solid;" + "border-color: red green;" + "position: fixed;" + "height: 5px;" + "top: -999px;" + "background-image: url(" + n.spacerImage + ");";
   var p = k.get(o, "background-image"), q = k.get(o, "border-top-color"), r = k.get(o, "border-right-color"), s = q == r && (p && (p == "none" || p == "url(invalid-url:)"));
   if (s) {
    h.conditionClass(document.documentElement, "highContrast", s);
    if (i.getID()) g.logHCM();
   }
   j.remove(o);
   m.init = l;
  }
 };
 e.exports = m;
}, null);

__d("Live", [ "Arbiter", "AsyncDOM", "AsyncSignal", "ChannelConstants", "DataStore", "DOM", "ServerJS", "createArrayFromMixed", "emptyFunction" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
 b.__markCompiled && b.__markCompiled();
 function p(r, s) {
  s = JSON.parse(JSON.stringify(s));
  new m().setRelativeTo(r).handle(s);
 }
 var q = {
  logAll: false,
  startup: function(r) {
   q.logAll = r;
   q.startup = o;
   g.subscribe(j.getArbiterType("live"), q.handleMessage.bind(q));
  },
  lookupLiveNode: function(r, s) {
   var t = l.scry(document.body, ".live_" + r + "_" + s);
   t.forEach(function(u) {
    if (k.get(u, "seqnum") === void 0) {
     var v = JSON.parse(u.getAttribute("data-live"));
     k.set(u, "seqnum", v.seq);
    }
   });
   return t;
  },
  handleMessage: function(r, s) {
   var t = s.obj, u = t.fbid, v = t.assoc, w = this.lookupLiveNode(u, v);
   if (!w) return false;
   w.forEach(function(x) {
    h.invoke(t.updates, x);
    if (t.js) p(x, t.js);
   });
  },
  log: function() {
   if (q.logAll) {
    var r = n(arguments).join(":");
    new i("/common/scribe_endpoint.php", {
     c: "live_sequence",
     m: r
    }).send();
   }
  }
 };
 e.exports = q;
}, null);

__d("UFITracking", [ "Bootloader" ], function(a, b, c, d, e, f, g) {
 b.__markCompiled && b.__markCompiled();
 function h(j) {
  g.loadModules([ "DOM", "collectDataAttributes" ], function(k, l) {
   j.forEach(function(m) {
    var n = k.scry(document.body, m);
    if (!n || n.link_data) return;
    var o = l(n, [ "ft" ]).ft;
    if (Object.keys(o).length) {
     var p = k.create("input", {
      type: "hidden",
      name: "link_data",
      value: JSON.stringify(o)
     });
     n.appendChild(p);
    }
   });
  });
 }
 var i = {
  addAllLinkData: function() {
   h([ "form.commentable_item" ]);
  },
  addAllLinkDataForQuestion: function() {
   h([ "form.fbEigenpollForm", "form.fbQuestionPollForm" ]);
  }
 };
 e.exports = i;
}, null);