if (self.CavalryLogger) {
 CavalryLogger.start_js([ "4vv8/" ]);
}

__d("TimeSpentBitArrayLogger", [ "Arbiter", "Banzai", "BanzaiODS", "TimeSpentArray", "TimeSpentConfig", "TimeSpentImmediateActiveSecondsLogger", "UserActivity", "copyProperties", "isInIframe" ], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
 b.__markCompiled && b.__markCompiled();
 var p = {
  delay: h.BASIC.delay,
  retry: true
 };
 function q(r, s) {
  if (h.isEnabled("time_spent_bit_array")) {
   g.inform("timespent/tosbitdataposted", n({}, r));
   if (typeof s == "number") {
    p.delay = s;
   } else p.delay = h.BASIC.delay;
   h.post("time_spent_bit_array", n({}, r), p);
   p.delay = k.delay;
  }
 }
 e.exports = {
  init: function(r) {
   if (o()) return;
   m.subscribe(function(t, u) {
    var v = u.last_inform;
    j.update(v);
    l.maybeReportActiveSecond(v);
   });
   var s = Date.now();
   j.init(q, k, s);
   l.maybeReportActiveSecond(s);
   i.bumpEntityKey("ms.time_spent.qa.www", "time_spent.bits.js_initialized");
  }
 };
}, null);