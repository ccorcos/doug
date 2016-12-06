'use strict'

const build = require('../commands/build-babel')

module.exports = (vorpal, config) => {
  vorpal
    .command('build')
    .description('build distribution assets with babel')
    .use(build.options)
    .action((options) => {
      return build.action(config, options)
    })
}
