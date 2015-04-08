#!/bin/bash
set -e

S3_HOSTNAME=fbmacmessenger.rsms.me

if ! [ -f "$1" ] || [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
  echo "Publish a release." >&2
  echo "Usage: $0 <archive>" >&2
  exit 1
fi

pushd "$(dirname "$0")/.." >/dev/null
SRCDIR="$(dirname "$(pwd)")"
popd >/dev/null

ARCHIVE=$1
ARCHIVE_BASENAME=$(basename "$ARCHIVE")
PROJ=$(echo "${ARCHIVE_BASENAME}" | sed -E 's/^([^\-]+)\-.+/\1/')
VERSION=$(echo "${ARCHIVE_BASENAME}" | sed -E 's/^.+\-([0-9\.]+)\-[0-9A-Fa-f]+\.zip$/\1/')
RELEASE_VERSION=$(echo "${ARCHIVE_BASENAME}" | sed -E 's/^.+\-([0-9]+\.[0-9]+).+/\1/')
VERSION_TIMESTAMP=$(echo "${ARCHIVE_BASENAME}" | sed -E 's/^.+\-[0-9]+\.[0-9]+\.([0-9]+).+/\1/')
VERSION_DATETIME=$(date -r $VERSION_TIMESTAMP -u "+%Y-%m-%d_%H-%M-%S")
GIT_REV=$(echo "${ARCHIVE_BASENAME}" | sed -E 's/^.+\-([0-9A-Fa-f]+)\.zip$/\1/')
DWARF_BASENAME=$(basename -s .zip "$ARCHIVE_BASENAME").dwarf.zip
DWARF_FILE=$(dirname "$ARCHIVE")/$DWARF_BASENAME

if grep --quiet 'sparkle:version="'"${VERSION}"'"' "changelog.xml"; then

  source admin/aws-credentials.sh

  aws s3 cp "$DWARF_FILE"           "s3://${S3_HOSTNAME}/dsym/${DWARF_BASENAME}"
  aws s3 cp "$ARCHIVE"              "s3://${S3_HOSTNAME}/dist/${ARCHIVE_BASENAME}"
  aws s3 cp "changelog.xml"         "s3://${S3_HOSTNAME}/changelog.xml"
  aws s3 cp "admin/dist/index.html" "s3://${S3_HOSTNAME}/index.html"

else
  echo "Version ${VERSION} not found in changelog.xml — did you run addchangelog?" >&2
  echo "  $(dirname "$0")/addchangelog.sh '$ARCHIVE'" >&2
  exit 1
fi

echo "You should tag the release and commit the modified version:"
echo -n "  git commit -m 'Version ${RELEASE_VERSION} release ${VERSION_DATETIME}' "
echo "changelog.xml version.txt Messenger/Info.plist"
echo "  git tag v${RELEASE_VERSION}.${VERSION_DATETIME} \$(git log -n1 '--format=%H')"
echo "  git push origin master --tags"
