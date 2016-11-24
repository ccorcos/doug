'use strict'

const merge = require('webpack-merge')

module.exports = (config, options) => {
  return merge(
    require('./base')({
      projectRoot: config.projectRoot,
      projectName: config.projectName,
    }),
    require('doug/webpack/partials/istanbul'),
    require('doug/webpack/partials/css')({
      ignore: true,
    }),
    require('doug/webpack/partials/assets')({
      minify: false,
    }),
    require('doug/webpack/partials/define')(
      { process: { env: { NODE_ENV: 'test' } } }
    ),
    {
      devtool: 'cheap-module-eval-source-map',
    }
  )
}
