#!/bin/bash
set -e
if [ "$1" = "" ]; then echo "Usage: $0 <archive>" >&2; exit 1; fi

pushd "$(dirname "$0")/.." >/dev/null
SRCDIR="$(dirname "$(pwd)")"
popd >/dev/null

ARCHIVE=$1

python "${SRCDIR}/admin/dist/addchangelog.py" "$ARCHIVE"

if (which subl) >/dev/null; then
  subl "${SRCDIR}"/website/changelog.xml:12:15
else
  echo "A new entry has been added to the changelog."
  echo "You should add/update release notes:"
  echo "  $EDITOR '${SRCDIR}/website/changelog.xml'"
fi


echo "Next step:"
echo "  admin/dist/publish.sh ${ARCHIVE}"
