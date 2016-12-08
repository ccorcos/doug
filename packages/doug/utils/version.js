'use strict'

const shell = require('shelljs')
shell.config.fatal = true
const path = require('path')

module.exports = (p) => {
  return shell.cat(path.join(p, 'package.json')).grep(/"version"/).match(/(version": ?")([^"]+)/)[2]
}
