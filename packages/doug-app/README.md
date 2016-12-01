# Doug App

A zero-configuration build tool for creating React applications.

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
