# Dev administration


## Source dependencies

This project uses *git subtree* for managing dependencies via the porcelain program "admin/dep."

Listing dependencies:

    admin/dep ls

Adding a dependency named "foo" into directory "a/foo", tracking the master branch of some repo:

    admin/dep add foo a/foo git@github.com:bar/foo.git master

Updating a dependency:

    admin/dep update foo

Removing:

    # remove the foo entry in ./deps, then
    git remote remove foo
    git rm a/foo
    git commit ...


## Distribution

The `dist/*` scripts are used to create and publish releases.

**Requirement:**
- Valid Apple developer certificate matching the prefix `Mac Developer` in your keychain.
- Amazon AWS CLI tools (`pip install awscli`)

1. Run `dist/build.sh` and copy the ARCHIVE_PATH printed to on stdout
2. Run `dist/addchangelog.sh ARCHIVE_PATH`
3. Edit dist/changelog.xml to contain suitable release notes
4. Run `dist/publish.sh ARCHIVE_PATH`

Finally you should git tag. The different commands will print "what to do next" instructions when they complete.
