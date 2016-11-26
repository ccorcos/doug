'use strict'

module.exports = {
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: "eslint",
        exclude: /node_modules/,
      },
    ],
  },
  eslint: {
    fix: true,
    cache: true,
  },
}
