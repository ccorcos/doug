'use strict'

const hello = require('../commands/hello')

module.exports = (vorpal, config) => {
  vorpal
    .command('hello')
    .description('a friendly greeting')
    .use(hello.options)
    .action(({options}) => {
      return hello.action(config, options)
    })
}
