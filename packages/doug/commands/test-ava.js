'use strict'

const shell = require('shelljs')
const resolve = require('../resolve')

module.exports = {
  options: (vorpal) => {
    return vorpal
  },
  action: (config, options) => {
    return shell.exec(`${__dirname}/../node_modules/.bin/ava ${resolve(config.test)}`)
  },
}
