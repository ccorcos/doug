'use strict'

const test = require('doug/commands/test-ava')

module.exports = (program, config) => {
  program
    .command('test')
    .description('run unit tests with ava')
    .pipe(test.options)
    .action((options) => {
      return test.action(config, options)
    })
}
