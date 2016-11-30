'use strict'

const shell = require('shelljs')

const modulesDir = `${__dirname}/../node_modules`

module.exports = {
  options: (vorpal) => {
    return vorpal
  },
  action: (config, options) => {
    return shell.exec([
      `${modulesDir}/.bin/babel ${config.src}`,
      `--out-dir ${config.projectRoot}/lib`,
      `--presets=${modulesDir}/babel-preset-es2015,${modulesDir}/babel-preset-react,${modulesDir}/babel-preset-stage-0`
    ].join(' '))
  },
}
