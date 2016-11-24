'use strict'

const path = require('path')
const merge = require('webpack-merge')

module.exports = (config, options) => {
  return merge(
    require('./base')({
      projectRoot: config.projectRoot,
      projectName: config.projectName,
    }),
    require('doug/webpack/partials/css')({
      projectRoot: config.projectRoot,
      ignore: false,
      buildCss: options.buildCss,
    }),
    require('doug/webpack/partials/assets')({
      compress: false,
    }),
    require('doug/webpack/partials/app')({
      html: config.html,
    }),
    require('doug/webpack/partials/app-dev')({
      entry: config.entry,
      projectRoot: config.projectRoot,
    }),
    require('doug/webpack/partials/hmr'),
    require('doug/webpack/partials/define')(
      { process: { env: { NODE_ENV: 'dev' } } }
    )
  )
}
