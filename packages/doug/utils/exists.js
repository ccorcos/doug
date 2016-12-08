'use strict'

const shell = require('shelljs')
shell.config.fatal = true

module.exports = (path) => {
  return Boolean(shell.ls(path)[0])
}
