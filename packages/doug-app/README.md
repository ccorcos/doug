# Doug App

A zero-configuration build tool for creating React applications.

## Features

- Babel
- PostCSS
- Webpack
- React
- Mocha
- Karma
- JSDOM

## Getting Started

```sh
npm install --save-dev doug-app
```

Create a `doug.config.js` file with the following:

```js
module.exports = {
  html: `${__dirname}/path/to/index.html`,
  entry: {
    index: `${__dirname}/path/to/index.js`,
  },
  test: `${__dirname}/test.js`,
}
```

Then create a `test.js` file for compiling all tests into one file:

```js
const context = require.context('./src', true, /test\.js$/)
context.keys().forEach(context)
```

Check out the [example app](https://github.com/ccorcos/doug/tree/master/packages/example-app) for more details.
