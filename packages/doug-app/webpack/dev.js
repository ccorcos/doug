'use strict'

const path = require('path')
const merge = require('webpack-merge')

module.exports = (config, options) => {
  return merge(
    require('./base')({
      projectName: config.package.name,
    }),
    require('./partials/css')({
      ignore: false,
      buildCss: options.buildCss,
    }),
    require('./partials/assets')({
      compress: false,
    }),
    require('./partials/app')({
      html: config.html,
    }),
    require('./partials/app-dev')({
      entry: config.entry,
    }),
    require('./partials/hmr'),
    require('./partials/define')(
      { process: { env: { NODE_ENV: 'dev' } } }
    )
  )
}
