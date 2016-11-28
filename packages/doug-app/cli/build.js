'use strict'

const build = require('doug/commands/build')

module.exports = (program, config) => {
  program
    .command('build')
    .description('build distribution assets')
    .pipe(build.options)
    .action((options) => {
      const webpackConfig = require('../webpack/build')(config, options)
      return build.action(config, options, webpackConfig)
    })
}
