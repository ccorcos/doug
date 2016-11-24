'use strict'

const dev = require('doug/commands/dev')

module.exports = {
  options: (program) => {
    return program
      .pipe(dev.options)
      .option('--custom', 'a custom argument')
  },
  action: (config, options, webpackConfig) => {
    console.log('do whatever you want here!')
    return dev.action(config, options, webpackConfig)
  },
}
