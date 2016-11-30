'use strict'

const release = require('doug/commands/release')

module.exports = (vorpal, config) => {
  vorpal
    .command('release <semver>')
    .description('bump, commit, tag, and push a new release')
    .use(release.options)
    .action((semver, options) => {
      return release.action(config, semver, options)
    })
}
