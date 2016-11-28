'use strict'

const test = require('doug/commands/test-karma')

module.exports = (program, config) => {
  program
    .command('test')
    .description('run unit tests with karma, mocha, and jsdom')
    .pipe(test.options)
    .action((options) => {
      const webpackConfig = require('../webpack/dev')(config, options)
      return test.action(config, options, webpackConfig)
    })
}
