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
      compress: true,
    }),
    require('doug/webpack/app')({
      html: config.html,
    }),
    require('doug/webpack/app-build')({
      profile: options.profile,
      entry: config.entry,
      rootUrl: options.rootUrl,
    }),
    options.human ? {} : require('doug/webpack/minify'),
    require('doug/webpack/optimize'),
    require('doug/webpack/define')(
      { process: { env: { NODE_ENV: 'production' } } }
    )
  )
}
