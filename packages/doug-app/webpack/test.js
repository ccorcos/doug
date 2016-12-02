'use strict'

const merge = require('webpack-merge')

module.exports = (config, options) => {
  return merge(
    require('./base')({
      projectName: config.package.name,
    }),
    {eslint: {envs: ['jasmine']}},
    require('doug/webpack/istanbul'),
    require('doug/webpack/css')({
      ignore: true,
    }),
    require('doug/webpack/assets')({
      minify: false,
    }),
    require('doug/webpack/define')(
      { process: { env: { NODE_ENV: 'test' } } }
    ),
    {
      devtool: 'cheap-module-eval-source-map',
    }
  )
}
