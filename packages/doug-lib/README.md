# Doug Lib

A zero-configuration build tool for building JavaScript libraries.

- [Tutorial](https://github.com/ccorcos/doug)
- [Example](https://github.com/ccorcos/doug/tree/master/packages/example-lib)

## Quick Start

Create a new project and install `doug-lib`.

```sh
npm init -y
npm install --save-dev doug-lib
```

Create a few files:

```js
// src/math.js
export const add = a => b => a + b
```

```js
// src/math.test.js
import test from 'ava'
import * as math from './math'

test('add', t => {
  t.is(math.add(1)(2), 3)
})
```

```js
// package.json
{
  "scripts": {
    "build": "doug-lib build",
    "test": "doug-lib build && doug-lib test",
    "release": "doug-lib release"
  }
}
```

You can run `npm run-script shell` to open up a Vorpal shell and run commands like `help` or `help test` to more information about the commandline options.

## Configs

#### `src`

Path to the src files which should be transpiled. Defaults to `./src`.

#### `test`

The glob pattern matching all test files. Defaults to `./lib/**/*.test.js`.
