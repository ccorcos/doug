# Doug App

A zero-configuration build tool for creating React applications.

- [Tutorial](https://github.com/ccorcos/doug)

## Quick Start

Create a new project and install `doug-app`.

```sh
npm install -g doug-app
doug-app init awesome-app
cd awesome-app
npm start
```

You can run `doug-app help` to display options.

## CLI API

When using `doug-app` outside of an application:

```
❯❯❯ doug-app help

  Commands:

    help [command...]  Provides help for a given command.
    exit               Exits application.
    shell              open up a Vorpal shell
    init [directory]   initialize a new doug-app project

❯❯❯ doug-app help init

  Usage: init [options] [directory]

  initialize a new doug-app project

  Options:

    --help  output usage information

```

When using `doug-app` inside a project:

```
❯❯❯ doug-app help

  Commands:

    help [command...]  Provides help for a given command.
    exit               Exits application.
    shell              open up a Vorpal shell
    dev [options]      start a development server
    build [options]    build distribution assets
    deploy [options]   deploy project using git
    release <semver>   bump, commit, tag, and push a new release
    test               run unit tests with karma, mocha, and jsdom

❯❯❯ doug-app help dev

  Usage: dev [options]

  start a development server

  Options:

    --help       output usage information
    --build-css  build css files

❯❯❯ doug-app help build

  Usage: build [options]

  build distribution assets

  Options:

    --help            output usage information
    --build-css       build css files
    --root-url <url>  the base url for the CDN where the assets live
    --human           do not minify the source files
    --profile         output the webpack stats.json file for analysis

❯❯❯ doug-app help deploy

  Usage: deploy [options]

  deploy project using git

  Options:

    --help             output usage information
    --repo <url>       deploy to a repo other than the current repo
    --remote <remote>  deploy a git remote other than origin
    --branch <branch>  deploy to a branch other than gh-pages

❯❯❯ doug-app help release

  Usage: release [options] <semver>

  bump, commit, tag, and push a new release

  Options:

    --help  output usage information

❯❯❯ doug-app help test

  Usage: test [options]

  run unit tests with karma, mocha, and jsdom

  Options:

    --help  output usage information

```

## Config API

#### `html`

Path to the index html file. Defaults to `./src/index.html`

#### `entry`

A map of webpack entry points. Defaults to `{index: './src/index.js'}`

#### `test`

Path to a test file which imports all tests. Defaults to `./test.js`. Make sure you create this file. For example:

```js
const context = require.context('./src', true, /test\.js$/)
context.keys().forEach(context)
```
