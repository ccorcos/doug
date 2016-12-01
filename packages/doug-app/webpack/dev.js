'use strict'

const path = require('path')
const merge = require('webpack-merge')

module.exports = (config, options) => {
  return merge(
    require('./base')({
      projectName: config.package.name,
    }),
    require('doug/webpack/css')({
      ignore: false,
      buildCss: options.buildCss,
    }),
    require('doug/webpack/assets')({
      compress: false,
    }),
    require('doug/webpack/app')({
      html: config.html,
    }),
    require('doug/webpack/app-dev')({
      entry: config.entry,
    }),
    require('doug/webpack/hmr'),
    require('doug/webpack/define')(
      { process: { env: { NODE_ENV: 'dev' } } }
    )
  )
}
