'use strict'

const shell = require('shelljs')
const resolve = require('../resolve')

module.exports = {
  options: (vorpal) => {
    return vorpal
  },
  action: (config, semver, options) => {
    if (!semver.match(/(patch|minor|major)/)) {
      throw new Error(`invalid sematic version: "${semver}". please use "patch", "minor", or "major".`)
    }
    shell.cd(`cd ${resolve('.')}`)
    const version = shell.exec(`npm version ${semver}`).stdout.trim()
    shell.exec('git add . --all')
    const tag = `${config.package.name}-release-${version}`
    shell.exec(`git commit -m "${tag}"`)
    shell.exec(`git tag ${tag}`)
    shell.exec(`git push`)
    shell.exec(`git push origin ${tag}`)
  },
}
