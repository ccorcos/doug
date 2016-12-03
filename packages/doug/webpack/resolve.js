'use strict'

const path = require('path')
const buildSystemRoot = path.resolve(__dirname, '..')
const resolve = require('../resolve')

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
      // build-system
      path.join(buildSystemRoot, 'node_modules'),
    ],
  },
  resolveLoader: {
    root: [
      resolve('.'),
    ],
    modulesDirectories: [
      // project
      resolve('node_modules'),
      // build-system
      path.join(buildSystemRoot, 'node_modules'),
    ],
  },
})
