'use strict'

const dev = require('doug/commands/dev')

module.exports = (program, config) => {
  program
    .command('dev')
    .description('start a development server')
    .pipe(dev.options)
    .action((options) => {
      const webpackConfig = require('../webpack/dev')(config, options)
      return dev.action(config, options, webpackConfig)
    })
}
