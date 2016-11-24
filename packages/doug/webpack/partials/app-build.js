'use strict'

module.exports = (config) => ({
  devtool: 'hidden-source-map',
  profile: config.profile,
  entry: config.entry,
  // output to the distribution folder
  output: {
    path: config.projectDist,
    // the public path to all CDN assets that platform will inject
    publicPath: config.rootUrl || '',
    // include the chunkhash for the file for long-term caching
    filename: '[name]-[chunkhash].js',
  },
})
