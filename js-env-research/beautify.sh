#!/bin/bash
set -e
for f in *.js; do
  uglifyjs --beautify 'indent_level:2,beautify:true' -o $f $f
done
