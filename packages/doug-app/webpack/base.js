'use strict'

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

module.exports = (config) => {
  return merge(
    require('doug/webpack/partials/babel'),
    require('doug/webpack/partials/json'),
    require('doug/webpack/partials/icons'),
    require('doug/webpack/partials/resolve')({
      projectRoot: config.projectRoot,
      projectName: config.projectName,
    })
  )
}
