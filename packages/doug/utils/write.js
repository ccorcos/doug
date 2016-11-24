'use strict'

const shell = require('shelljs')

module.exports = (file, contents) => {
  new shell.ShellString(contents).to(file)
}
