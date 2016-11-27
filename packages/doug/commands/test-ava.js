'use strict'

const shell = require('shelljs')

module.exports = {
  options: (program) => {
    return program
  },
  action: (config, options) => {
    return shell.exec(`${__dirname}/../node_modules/.bin/ava ${config.test}`)
  },
}
