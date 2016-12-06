# Doug Lib

A zero-configuration build tool for building JavaScript libraries.

- [Tutorial](https://github.com/ccorcos/doug)
- [Example](https://github.com/ccorcos/doug/tree/master/packages/example-lib)

## Quick Start

Create a new project and install `doug-lib`.

```sh
npm install -g doug-lib
doug-lib init awesome-lib
cd awesome-lib
npm test
```

You can run `doug-lib help` to display options.

## CLI API

When you run `doug-lib` outside of a project:

```
❯❯❯ doug-app help

  Commands:

    help [command...]  Provides help for a given command.
    exit               Exits application.
    shell              open up a Vorpal shell
    init [directory]   initialize a new doug-app project

~ ❯❯❯ doug-app help init

  Usage: init [options] [directory]

  initialize a new doug-app project

  Options:

    --help  output usage information

```

When you run `doug-lib` inside a project:

```
❯❯❯ doug-lib help

  Commands:

    help [command...]  Provides help for a given command.
    exit               Exits application.
    shell              open up a Vorpal shell
    test               run unit tests with ava
    build              build distribution assets with babel
    release <semver>   bump, commit, tag, and push a new release

❯❯❯ doug-lib help test

  Usage: test [options]

  run unit tests with ava

  Options:

    --help  output usage information

❯❯❯ doug-lib help build

  Usage: build [options]

  build distribution assets with babel

  Options:

    --help  output usage information

❯❯❯ doug-lib help release

  Usage: release [options] <semver>

  bump, commit, tag, and push a new release

  Options:

    --help  output usage information

```

## Config API

#### `src`

Path to the src files which should be transpiled. Defaults to `./src`.

#### `test`

The glob pattern matching all test files. Defaults to `./lib/**/*.test.js`.
