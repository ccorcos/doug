'use strict'

const Command = require('vorpal/dist/command')

Command.prototype.use = function(fn) {
  return fn(this)
}

const vorpal = require('vorpal')()

module.exports = vorpal
