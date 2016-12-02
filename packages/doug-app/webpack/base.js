'use strict'

const path = require('path')
const merge = require('webpack-merge')

module.exports = (config) => {
  return merge(
    require('doug/webpack/babel'),
    require('doug/webpack/eslint'),
    require('doug/webpack/json'),
    require('doug/webpack/icons'),
    require('doug/webpack/resolve')({
      projectName: config.projectName,
    })
  )
}
