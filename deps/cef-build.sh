#!/bin/bash
set -e
cd "$(dirname "$0")/cef"
mkdir build
cd build
cmake -G "Ninja" -DPROJECT_ARCH="x86_64" -DCMAKE_BUILD_TYPE=Debug ..
ninja libcef_dll_wrapper.a

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
