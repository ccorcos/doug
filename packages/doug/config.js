'use strict'

const resolve = require('./resolve')
const config = require(resolve('doug.config.js'))
config.package = require(resolve('package.json'))

module.exports = config
