'use strict'

const merge = require('webpack-merge')

module.exports = (config, options) => {
  return merge(
    require('./base')({
      projectName: config.package.name,
    }),
    {eslint: {envs: ['jasmine']}},
    require('./partials/istanbul'),
    require('./partials/css')({
      ignore: true,
    }),
    require('./partials/assets')({
      minify: false,
    }),
    require('./partials/define')(
      { process: { env: { NODE_ENV: 'test' } } }
    ),
    {
      devtool: 'cheap-module-eval-source-map',
    }
  )
}
