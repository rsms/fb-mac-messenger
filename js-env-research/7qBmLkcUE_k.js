if (self.CavalryLogger) {
 CavalryLogger.start_js([ "J7lEz" ]);
}

__d("ArtilleryReporting", [ "Artillery", "Banzai" ], function(a, b, c, d, e, f, g, h) {
 b.__markCompiled && b.__markCompiled();
 var i = "artillery_javascript_trace", j = false;
 e.exports.init = function() {
  if (j) return;
  j = true;
  g.addRetroactiveListener("posttrace", function(k) {
   h.post(i, k, {
    retry: true,
    delay: 30 * 1e3
   });
  });
 };
}, null);