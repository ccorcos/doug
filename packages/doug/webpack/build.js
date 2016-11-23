'use strict'

const path = require('path')
const merge = require('webpack-merge')

module.exports = (config, options) => {
  return merge(
    require('./base')({
      projectRoot: config.projectRoot,
      projectName: config.projectName,
    }),
    require('./partials/css')({
      projectRoot: config.projectRoot,
      ignore: false,
      buildCss: options.buildCss,
    }),
    require('./partials/assets')({
      compress: true,
    }),
    require('./partials/app')({
      html: config.html,
    }),
    options.human ? {} : require('./partials/minify'),
    require('./partials/optimize'),
    require('./partials/define')(
      { process: { env: { NODE_ENV: 'production' } } }
    ),
    {
      devtool: 'hidden-source-map',
      profile: options.profile,
      entry: config.entry,
      // output to the distribution folder
      output: {
        path: config.projectDist,
        // the public path to all CDN assets that platform will inject
        publicPath: options.rootUrl || '',
        // include the chunkhash for the file for long-term caching
        filename: '[name]-[chunkhash].js',
      },
    }
  )
}
