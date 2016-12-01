# Doug App

A zero-configuration build tool for creating React applications.

- [Tutorial](https://github.com/ccorcos/doug)
- [Example](https://github.com/ccorcos/doug/tree/master/packages/example-app)

## Quick Start

Create a new project and install `doug-app`.

```sh
npm init -y
npm install --save-dev doug-app
```

Create a few files:

```js
// src/index.js
import React from 'react'
import ReactDOM from 'react-dom'

const root = document.getElementById('root')
ReactDOM.render(<div>Hello World</div>, root)
```

```html
<!-- src/index.html -->
<html>
  <head>
    <title>Website</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

```js
// src/demo.test.js
import assert from 'assert'

describe('Test', () => {
  describe('addition', () => {
    it('1 + 1 = 2', () => {
      assert.equal(1 + 1, 2)
    })
  })
})
```

```js
// src/demo.text.js
import assert from 'assert'

describe('Test', () => {
  describe('addition', () => {
    it('1 + 1 = 2', () => {
      assert.equal(1 + 1, 2)
    })
  })
})
```

```js
// package.json
{
  "scripts": {
    "start": "doug-app dev",
    "build": "doug-app build",
    "deploy": "doug-app deploy",
    "test": "doug-app test",
    "release": "doug-app release",
    "shell": "doug-app shell"
  }
}
```

You can run `npm run-script shell` to open up a Vorpal shell and run commands like `help` or `help test` to more information about the commandline options.

## Configs

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
