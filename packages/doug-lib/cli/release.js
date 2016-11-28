'use strict'

const release = require('doug/commands/release')

module.exports = (program, config) => {
  program
    .command('release <semver>')
    .description('bump, commit, tag, and push a new release')
    .pipe(release.options)
    .action((semver, options) => {
      return release.action(config, semver, options)
    })
}
