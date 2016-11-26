'use strict'

const path = require('path')
const buildSystemRoot = path.resolve(__dirname, '..')

module.exports = (config) =>({
  resolve: {
    root: [
      config.projectRoot,
    ],
    extensions: [
      '',
      '.js',
    ],
    modulesDirectories: [
      // project
      path.resolve(config.projectRoot, 'node_modules'),
      // build-system
      path.join(buildSystemRoot, 'node_modules'),
    ],
  },
  resolveLoader: {
    root: [
      config.projectRoot,
    ],
    modulesDirectories: [
      // build-system
      path.join(buildSystemRoot, 'node_modules'),
    ],
  },
})
