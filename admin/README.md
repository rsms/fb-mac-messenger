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

