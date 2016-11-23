'use strict'

const karma = require('karma')
const config = require('../../config')
const makeWebpackConfig = require('../../webpack/test')
const makeKarmaConfig = require('./karma')

const runKarma = (karmaConfig) => {
  // create the karma server for running tests
  const KarmaServer = karma.Server
  return new Promise((resolve, reject) => {
    const server = new KarmaServer(karmaConfig, function(exitCode) {
      console.log('Karma has exited with ' + exitCode)
      if (exitCode === 1) {
        reject(exitCode)
      } else {
        resolve(exitCode)
      }
      // TODO: fix this
      process.exit(exitCode)
    })
    server.start()
  })
}

module.exports = (options) => {
  // generate the karma configuration
  const webpackConfig = makeWebpackConfig(config, options)
  const karmaConfig = makeKarmaConfig(config, options, webpackConfig)
  return runKarma(karmaConfig)
}
