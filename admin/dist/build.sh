#!/bin/bash
#
# usage build.sh [-f]
# -f  Force rebuild
#
# Produces:
#   build/{Debug,Release}/App-M.m.r-githash.zip (.app)
#   build/{Debug,Release}/App-M.m.r-githash.dwarf.zip
#
set -e
cd "$(dirname "$0")/../.."

PROJ=Messenger

BUILD_DIR=$(pwd)/build
BUILD_CONFIG=Release
PRODUCT_DIR=${BUILD_DIR}/${BUILD_CONFIG}
APP_NAME=${PROJ}.app
APP_BUNDLE=${PRODUCT_DIR}/${APP_NAME}
VERSION=$($SHELL admin/dist/update-version.sh --quiet)
GIT_HASH=$(git rev-parse --short=16 HEAD)
ARCHIVE=${PROJ}-${VERSION}-${GIT_HASH}.zip

if [ "$1" = "-f" ]; then
  rm -rf "${APP_BUNDLE}" "${BUILD_DIR}/${PROJ}.build/${BUILD_CONFIG}"
fi

xcodebuild -project ${PROJ}.xcodeproj -target ${PROJ} -configuration ${BUILD_CONFIG} \
  CODE_SIGN_IDENTITY="" \
  CODE_SIGNING_REQUIRED=NO \
  GCC_PREPROCESSOR_DEFINITIONS='$(inherited) DISABLE_UNIT_TESTS=1'

echo 'Signing'
# See https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/AppDistributionGuide/DistributingApplicationsOutside/DistributingApplicationsOutside.html
/usr/bin/codesign --force --sign 'Developer ID Application' --deep "${APP_BUNDLE}"

pushd "${PRODUCT_DIR}" >/dev/null
  zip -r -q --symlinks "${ARCHIVE}" "${APP_NAME}"
  pushd "${APP_NAME}.dSYM/Contents/Resources/DWARF" >/dev/null
    mv "${PROJ}" "${PROJ}-${VERSION}.dwarf"
    zip -r -q "../../../../${PROJ}-${VERSION}-${GIT_HASH}.dwarf.zip" "${PROJ}-${VERSION}.dwarf"
  popd >/dev/null
popd >/dev/null

echo "Next step:"
echo "  admin/dist/addchangelog.sh ${BUILD_DIR}/${BUILD_CONFIG}/${ARCHIVE}"
