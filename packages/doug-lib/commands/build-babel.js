'use strict'

const shell = require('shelljs')
shell.config.fatal = true
const resolve = require('doug/resolve')
const modulesDir = `${__dirname}/../node_modules`

module.exports = {
  options: (vorpal) => {
    return vorpal
  },
  action: (config, options) => {
    return shell.exec([
      `${modulesDir}/.bin/babel ${config.src}`,
      `--out-dir ${resolve('lib')}`,
      `--presets=${modulesDir}/babel-preset-es2015,${modulesDir}/babel-preset-react,${modulesDir}/babel-preset-stage-0`
    ].join(' '))
  },
}
