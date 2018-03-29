# Mergify
A very *very* simple cli to check merge requests on Gitlab.

> NOTE: Only works for hosted Gitlab

## Install

```
yarn global add @pindakaasman/mergify
```

To complete setup you will need to run the `configure` command to provide access to the Gitlab API.
Documentation on how to get a private token can be [found at Gitlab](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html).

```
mergify --configure
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
