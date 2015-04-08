# Releasing versions

The `release-*` scripts are used to create and publish releases.

**Requirement:** Valid Apple developer certificate matching the prefix `Mac Developer:` in your keychain.

Step-by step:

1. Run `release-build.sh` and copy the ARCHIVE_PATH printed to on stdout
2. Run `release-addchangelog.sh ARCHIVE_PATH`
3. Edit changelog.xml to contain suitable release notes
4. Run `release-publish.sh ARCHIVE_PATH`
