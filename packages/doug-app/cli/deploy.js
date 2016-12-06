'use strict'

const deploy = require('../commands/deploy-git')

module.exports = (vorpal, config) => {
  vorpal
    .command('deploy')
    .description('deploy project using git')
    .use(deploy.options)
    .action(({options}) => {
      return Promise.resolve(deploy.action(config, options))
    })
}
