'use strict'

const shell = require('shelljs')

module.exports = (path) => {
  return Boolean(shell.ls(path)[0])
}
