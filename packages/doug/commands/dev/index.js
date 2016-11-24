'use strict'

module.exports = {
  options: (program) => {
    return program
      .option('--build-css', 'build css files')
  },
  action: (config, options, webpackConfig) => {
    return require('./server')(config, options, webpackConfig)
  },
}
