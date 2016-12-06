'use strict'

const path = require('path')
const merge = require('webpack-merge')

module.exports = (config) => {
  return merge(
    require('./partials/babel'),
    require('./partials/eslint'),
    require('./partials/json'),
    require('./partials/icons'),
    require('./partials/resolve')({
      projectName: config.projectName,
    })
  )
}
