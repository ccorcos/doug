'use strict'

const build = require('doug/commands/build')

module.exports = (vorpal, config) => {
  vorpal
    .command('build')
    .description('build distribution assets')
    .use(build.options)
    .action(({options}) => {
      const webpackConfig = require('../webpack/build')(config, options)
      return Promise.resolve(build.action(config, options, webpackConfig))
    })
}
