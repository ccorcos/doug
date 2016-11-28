# Doug Lib

A zero-configuration build tool for building JavaScript libraries.

## Features

- Babel
- PostCSS
- React
- Mocha
- Karma
- JSDOM

## Getting Started

```sh
npm install --save-dev doug-lib
```

Create a `doug.config.js` file with the following:

```js
module.exports = {
  src: `${__dirname}/path/to/src/directory`,
  test: `${__dirname}/lib/**/*.test.js`,
}
```

Check out the [example lib](https://github.com/ccorcos/doug/tree/master/packages/example-lib) for more details.
