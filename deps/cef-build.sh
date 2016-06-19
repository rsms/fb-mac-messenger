#!/bin/bash
set -e
cd "$(dirname "$0")/cef"

# we need to patch the cmake config to build with clang's libc++
python << END
import re

f = open('cmake/FindCEF.cmake', 'r')
s = f.read()
f.close()

addition = '''
include("../cef_variables_messenger.cmake")
'''

if s.find(addition) == -1:
  s += addition
  print 'patching cmake/FindCEF.cmake'
  f = open('cmake/FindCEF.cmake', 'w')
  f.write(s)
  f.close()

END

rm -rf build
mkdir build
cd build

# cmake -G "Ninja" -DPROJECT_ARCH="x86_64" -DCMAKE_BUILD_TYPE=Debug ..
CXX=clang CC=clang cmake -G "Ninja" -DPROJECT_ARCH="x86_64" ..
CXX=clang CC=clang ninja libcef_dll_wrapper.a

# Make .framework
rm -rf "Chromium Embedded Framework.framework"
mkdir -p "Chromium Embedded Framework.framework/Versions/A"
cp -a "../Release/Chromium Embedded Framework.framework/Resources" \
      "Chromium Embedded Framework.framework/Versions/A/Resources"
cp -a "../Release/Chromium Embedded Framework.framework/Chromium Embedded Framework" \
      "Chromium Embedded Framework.framework/Versions/A/Chromium Embedded Framework"
ln -s A                                              "Chromium Embedded Framework.framework/Versions/Current"
ln -s Versions/Current/Resources                     "Chromium Embedded Framework.framework/Resources"
ln -s "Versions/Current/Chromium Embedded Framework" "Chromium Embedded Framework.framework/Chromium Embedded Framework"

install_name_tool \
  -id "@rpath/Chromium Embedded Framework.framework/Versions/A/Chromium Embedded Framework" \
  "Chromium Embedded Framework.framework/Chromium Embedded Framework"
