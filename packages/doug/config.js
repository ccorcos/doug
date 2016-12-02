'use strict'

const resolve = require('./resolve')

let config = undefined

try {
  config = require(resolve('doug.config.js'))
} catch (e) {
  // no doug config
}

module.exports = config
