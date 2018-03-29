# Mergify
A very *very* simple cli to check merge requests on Gitlab.

> NOTE: Only works for hosted Gitlab

## Install

```
yarn add @pindakaasman/mergify --global
```

Add `GITLAB_USER_ID` and `GITLAB_PRIVATE_TOKEN` to your `.profile` or `.bashrc` and `source` it.
Documentation on how to get a private token can be [found at Gitlab](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html).

```
export GITLAB_PRIVATE_TOKEN=TOKEN_HERE
export GITLAB_ID=USER_ID
```

## Usage

Just grab up the help menu by using `mergify --help` and you will be presented with the help dialog.
```
  Usage: mergify [options]

  Options:

    -V, --version   output the version number
    -a --all        Get all merge request
    -m --me         Get all open merge request assigned to you
    -s --submitted  Get all open merge request submitted to you
    -h, --help      output usage information
```
