'use strict'

const shell = require('shelljs')

module.exports = {
  options: (vorpal) => {
    return vorpal
  },
  action: (config, options) => {
    return shell.exec(`${__dirname}/../node_modules/.bin/ava ${config.test}`)
  },
}
