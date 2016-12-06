'use strict'

const test = require('../commands/test-ava')

module.exports = (vorpal, config) => {
  vorpal
    .command('test')
    .description('run unit tests with ava')
    .use(test.options)
    .action((options) => {
      return test.action(config, options)
    })
}
