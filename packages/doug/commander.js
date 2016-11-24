'use strict'

const program = require('commander')

program.Command.prototype.pipe = function(fn) {
  return fn(this)
}

module.exports = program
