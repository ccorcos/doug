'use strict'

module.exports = {
  options: (vorpal) => {
    return vorpal
      .option('--build-css', 'build css files')
  },
  action: (config, options, webpackConfig) => {
    return require('./server')(config, options, webpackConfig)
  },
}
