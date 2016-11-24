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
      compress: true,
    }),
    require('doug/webpack/partials/app')({
      html: config.html,
    }),
    require('doug/webpack/partials/app-build')({
      profile: options.profile,
      projectDist: config.projectDist,
      entry: config.entry,
      rootUrl: options.rootUrl,
    }),
    options.human ? {} : require('doug/webpack/partials/minify'),
    require('doug/webpack/partials/optimize'),
    require('doug/webpack/partials/define')(
      { process: { env: { NODE_ENV: 'production' } } }
    )
  )
}
