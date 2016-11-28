'use strict'

const build = require('doug/commands/build-babel')

module.exports = (program, config) => {
  program
    .command('build')
    .description('build distribution assets with babel')
    .pipe(build.options)
    .action((options) => {
      return build.action(config, options)
    })
}
