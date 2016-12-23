'use strict'

const shell = require('shelljs')
shell.config.fatal = true
const resolve = require('doug/resolve')
const resolveBin = require('resolve-bin')

module.exports = {
  options: (vorpal) => {
    return vorpal
  },
  action: (config, options) => {
    return shell.exec(`${resolveBin('ava')} ${resolve(config.test)}`)
  },
}
