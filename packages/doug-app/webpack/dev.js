'use strict'

const path = require('path')
const merge = require('webpack-merge')

module.exports = (config, options) => {
  return merge(
    require('./base')({
      projectRoot: config.projectRoot,
      projectName: config.projectName,
    }),
    require('doug/webpack/css')({
      projectRoot: config.projectRoot,
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
      projectRoot: config.projectRoot,
    }),
    require('doug/webpack/hmr'),
    require('doug/webpack/define')(
      { process: { env: { NODE_ENV: 'dev' } } }
    )
  )
}
