#!/bin/bash

res=./Messenger/resources.js

> $res # clean the output file
echo "// AUTO-GENERATED DO NOT MODIFY" >> $res
echo "FBM.resources = {};" >> $res

for f in ./Messenger/Resources/*
do
  filename=$(basename "$f")
  name=${filename%%.*}
  extension="${filename##*.}"
  content=$(base64 "$f")

  echo "FBM.resources['${name}'] = 'data:image/${extension};base64,${content}';" >> $res
done
