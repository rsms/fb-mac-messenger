#!/bin/bash

res="./Messenger/EmbeddedResources.m"

> $res # clean the output file
echo "// AUTO-GENERATED DO NOT MODIFY" >> $res
echo '#import "EmbeddedResources.h"' >> $res

injection=$(cat "./Messenger/injection.js" | sed 's/"/\\"/g' | sed 's/.*/"&\\n"/')
resources=$(cat "./Messenger/resources.js" | sed 's/"/\\"/g' | sed 's/.*/"&\\n"/')

echo 'NSString* kInjectedScript = @""' >> $res
echo "${injection}" >> $res
echo "${resources};" >> $res
