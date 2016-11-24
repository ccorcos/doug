'use strict'

const karma = require('karma')
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

module.exports = {
  options: (program) => {
    return program
  },
  action: (config, options, webpackConfig) => {
    const karmaConfig = makeKarmaConfig(config, options, webpackConfig)
    return runKarma(karmaConfig)
  },
}
