'use strict'

const Command = require('vorpal/dist/command')

Command.prototype.use = function(fn) {
  return fn(this)
}

const vorpal = require('vorpal')()

process.on('SIGINT', () => process.exit(2))

module.exports = vorpal
