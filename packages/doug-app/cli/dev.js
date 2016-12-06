'use strict'

const dev = require('../commands/dev')

module.exports = (vorpal, config) => {
  vorpal
    .command('dev')
    .description('start a development server')
    .use(dev.options)
    .action(({options}) => {
      const webpackConfig = require('../webpack/dev')(config, options)
      return Promise.resolve(dev.action(config, options, webpackConfig))
    })
}
