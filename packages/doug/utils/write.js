'use strict'

const shell = require('shelljs')
shell.config.fatal = true

module.exports = (file, contents) => {
  new shell.ShellString(contents).to(file)
}
