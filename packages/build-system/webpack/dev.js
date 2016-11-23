'use strict'

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const R = require('ramda')

// takes a project config and returns a webpack config
module.exports = (config, options) => {
  return merge(
    require('./base')({
      projectRoot: config.projectRoot,
      projectName: config.projectName,
    }),
    require('./partials/css')({
      projectRoot: config.projectRoot,
      ignore: false,
      'build-css': options['build-css'],
    }),
    require('./partials/assets')({
      minify: false,
    }),
    require('./partials/app')({
      html: config.html,
    }),
    require('./partials/hmr'),
    require('./partials/define')(
      { process: { env: { NODE_ENV: 'dev' } } }
    ),
    {
      devtool: 'cheap-module-eval-source-map',
      // inject  webpack-hot-middleware into the entry points
      entry: R.map(
        jsFile => [
          require.resolve('webpack-hot-middleware/client'),
          require.resolve('babel-polyfill'),
          require.resolve('whatwg-fetch'),
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
    }
  )
}
