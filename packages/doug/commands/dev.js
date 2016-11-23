'use strict'

const dev = (options) => {
  const webpackConfig = require('./webpack/dev')(config, options)
  require('./server')(config, webpackConfig)
}

module.exports = (program, config) => {
  program
    .command('dev')
    .description('start a development server')
    .option('--build-css', 'build css files')
    .action(commands.dev)
}
