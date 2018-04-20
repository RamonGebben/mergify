# Mergify
A very simple cli to check merge requests on Gitlab.


![npm](http://img.shields.io/npm/v/@pindakaasman/mergify.svg)
![Package Quality](http://npm.packagequality.com/shield/@pindakaasman/mergify.svg)

## Install

```
yarn global add @pindakaasman/mergify
```

## Usage

Just grab up the help menu by using `mergify --help` and you will be presented with the help dialog.
```
  Usage: mergify [options]

  Options:

    -V, --version   output the version number
    -a --assigned   Get all open merge request assigned to you
    -s --submitted  Get all open merge request submitted to you
    -c --configure  Setup or update required config
    -h, --help      output usage information
```

## Configure

To complete setup you will need to run the `configure` command to provide access to the Gitlab API.

```
mergify --configure
```

### Finding your userid

You Gitlab `userid` is **not** your `username`!

You can find your `userid` by going to [the profile page](https://gitlab.com/profile).
It will be located on the right.

![Example of userid](https://user-images.githubusercontent.com/921666/38989234-6d7ff064-43d6-11e8-8758-f90bddf7dbe5.png)

### Getting a Gitlab access token

Complete documentation on how to get a private token can be [found at Gitlab](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html).

You will need to go to you [access tokens page](https://gitlab.com/profile/personal_access_tokens) and provide at least **api** access.

See Screenshot for an example of access token creation  : 

<img width="611" alt="screen shot 2018-04-20 at 1 09 40 pm" src="https://user-images.githubusercontent.com/921666/39047997-4022dfa2-449c-11e8-9bec-12039ad94d94.png">
