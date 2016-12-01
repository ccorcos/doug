'use strict'

const test = require('doug/commands/test-karma')

module.exports = (vorpal, config) => {
  vorpal
    .command('test')
    .description('run unit tests with karma, mocha, and jsdom')
    .use(test.options)
    .action(({options}) => {
      const webpackConfig = require('../webpack/test')(config, options)
      return Promise.resolve(test.action(config, options, webpackConfig))
    })
}
