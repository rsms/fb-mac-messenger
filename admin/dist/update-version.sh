#!/bin/bash
set -e
cd "$(dirname "$0")/../.."

if [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
  echo "Usage: $0 [--quiet | --help]" >&2
  exit 1
fi

INFO_PLIST=Messenger/Info.plist
RELEASE_VERSION=$(cat version.txt)
SOURCE_VERSION=$(git rev-parse HEAD)
SOURCE_MTIME=$(git log '--format=%ct' -n1)
VERSION="${RELEASE_VERSION}.${SOURCE_MTIME}"

plistb=/usr/libexec/PlistBuddy

CURR_VERSION=$($plistb -c 'Print :CFBundleVersion' $INFO_PLIST)

if [ "$CURR_VERSION" = "${VERSION}" ]; then
  if [ "$1" != "--quiet" ]; then
    echo 'Version info in Info.plist is already up-to date.'
  fi
else
  $plistb -c "Set :CFBundleShortVersionString '${RELEASE_VERSION}'" $INFO_PLIST
  $plistb -c "Set :CFBundleVersion '${VERSION}'" $INFO_PLIST
  $plistb -c "Set :GitRev '${SOURCE_VERSION}'" $INFO_PLIST

  if [ "$1" != "--quiet" ]; then
    echo -n 'M  GitRev='
    $plistb -c 'Print :GitRev' $INFO_PLIST
    echo -n 'M  CFBundleVersion='
    $plistb -c 'Print :CFBundleVersion' $INFO_PLIST
    echo -n 'M  CFBundleShortVersionString='
  fi
fi

$plistb -c 'Print :CFBundleVersion' $INFO_PLIST
