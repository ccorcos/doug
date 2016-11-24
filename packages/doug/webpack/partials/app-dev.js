'use strict'

const path = require('path')
const merge = require('webpack-merge')
const R = require('ramda')

module.exports = (config) => ({
  devtool: 'cheap-module-eval-source-map',
  // inject  webpack-hot-middleware into the entry points
  entry: R.map(
    jsFile => [
      require.resolve('webpack-hot-middleware/client'),
      jsFile,
    ],
    config.entry
  ),
  // output to a dev folder we can serve static from
  output: {
    path: path.join(config.projectRoot, 'dev'),
    filename: '[name].js',
    publicPath: '/',
  },
})
