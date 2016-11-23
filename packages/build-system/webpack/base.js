'use strict'

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

module.exports = (config) => {
  return merge(
    require('./partials/babel'),
    require('./partials/json'),
    require('./partials/icons'),
    require('./partials/resolve')({
      projectRoot: config.projectRoot,
      projectName: config.projectName,
    })
  )
}
