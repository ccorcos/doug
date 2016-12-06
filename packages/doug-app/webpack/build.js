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
      compress: true,
    }),
    require('./partials/app')({
      html: config.html,
    }),
    require('./partials/app-build')({
      profile: options.profile,
      entry: config.entry,
      rootUrl: options.rootUrl,
    }),
    options.human ? {} : require('./partials/minify'),
    require('./partials/optimize'),
    require('./partials/define')(
      { process: { env: { NODE_ENV: 'production' } } }
    )
  )
}
