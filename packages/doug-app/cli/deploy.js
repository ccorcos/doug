'use strict'

const deploy = require('doug/commands/deploy-git')

module.exports = (program, config) => {
  program
    .command('deploy')
    .description('deploy project using git')
    .pipe(deploy.options)
    .action((options) => {
      return deploy.action(config, options)
    })
}
