'use strict'

const shell = require('shelljs')
shell.config.fatal = true
const resolve = require('doug/resolve')

module.exports = {
  options: (vorpal) => {
    return vorpal
  },
  action: (config, options) => {
    return shell.exec(`${__dirname}/../node_modules/.bin/ava ${resolve(config.test)}`)
  },
}
