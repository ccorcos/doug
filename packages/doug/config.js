'use strict'

const resolve = require('./resolve')

let config = undefined

try {
  config = require(resolve('doug.config.js'))
} catch (e) {
  console.log('doug.config.js not found. using defaults')
}

module.exports = config
