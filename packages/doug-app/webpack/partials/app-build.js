'use strict'

const resolve = require('doug/resolve')
const R = require('ramda')

module.exports = (config) => ({
  devtool: 'hidden-source-map',
  profile: config.profile,
  entry: R.map(resolve, config.entry),
  // output to the distribution folder
  output: {
    path: resolve('dist'),
    // the public path to all CDN assets that platform will inject
    publicPath: config.rootUrl || '',
    // include the chunkhash for the file for long-term caching
    filename: '[name]-[chunkhash].js',
  },
})
