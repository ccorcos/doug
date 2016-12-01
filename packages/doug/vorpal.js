'use strict'

const Command = require('vorpal/dist/command')

Command.prototype.use = function(fn) {
  return fn(this)
}

const vorpal = require('vorpal')()

vorpal
  .command('shell')
  .action(() => {
    vorpal.show()
    return Promise.resolve()
  })

// TODO: remove this to gracefully close the Node.js server
process.on('SIGINT', () => process.exit(2))

module.exports = vorpal
