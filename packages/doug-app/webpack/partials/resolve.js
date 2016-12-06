'use strict'

const path = require('path')
const resolve = require('doug/resolve')

module.exports = (config) =>({
  resolve: {
    root: [
      resolve('.'),
    ],
    extensions: [
      '',
      '.js',
    ],
    modulesDirectories: [
      // project
      resolve('node_modules'),
    ],
  },
  resolveLoader: {
    root: [
      resolve('.'),
    ],
    modulesDirectories: [
      // project
      resolve('node_modules'),
    ],
  },
})
