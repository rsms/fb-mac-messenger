# Releasing versions

The `release-*` scripts are used to create and publish releases.

Requirements:

- Valid Apple developer certificate matching the prefix `Developer ID Application` in your keychain.
- [AWS command line tools](https://aws.amazon.com/cli/) (`brew install awscli` or `pip install awscli`)

Steps for publishing a new release:

1. Run `dist/build.sh` and copy the ARCHIVE_PATH printed to on stdout
2. Run `dist/addchangelog.sh ARCHIVE_PATH`
3. Edit `website/changelog.xml` to contain suitable release notes
4. Run `dist/publish.sh ARCHIVE_PATH`

Finally you should git tag. The different commands will print "what to do next" instructions when they complete.
