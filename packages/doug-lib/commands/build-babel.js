'use strict'

const shell = require('shelljs')
shell.config.fatal = true
const resolve = require('doug/resolve')
const resolveBin = require('resolve-bin')

module.exports = {
  options: (vorpal) => {
    return vorpal
  },
  action: (config, options) => {
    return shell.exec([
      `${resolveBin('babel-cli', {executable:'babel'})} ${config.src}`,
      `--out-dir ${resolve('lib')}`,
      `--presets=${require.resolve('babel-preset-es2015')},${require.resolve('babel-preset-react')},${require.resolve('babel-preset-stage-0')}`
    ].join(' '))
  },
}
