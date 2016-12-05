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
    shell.cd(`${resolve('.')}`)
    const version = shell.exec(`npm version ${semver}`).stdout.trim()
    shell.exec(`git push origin HEAD`)
    shell.exec(`git push origin ${version}`)
  },
}
