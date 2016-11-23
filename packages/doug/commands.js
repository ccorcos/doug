'use strict'

const shell = require('shelljs')
const config = require('./config')

const dev = (options) => {
  const webpackConfig = require('./webpack/dev')(config, options)
  require('./server')(config, webpackConfig)
}

const runWebpack = (webpackConfig) => {
  const webpack = require('webpack')
  return new Promise((resolve, reject) => {
    webpack(webpackConfig)
      .run((err, stats) => {
        if (err) {
          reject(err)
        } else {
          resolve(stats)
        }
      })
  })
}

const write = (file, contents) => {
  new shell.ShellString(contents).to(file)
}

const build = (options) => {
  const webpackConfig = require('./webpack/build')(config, options)
  shell.rm('-rf', config.projectDist)
  return runWebpack(webpackConfig)
    .then((stats) => {
      console.log(stats.toString({
        colors: true,
        children: false
      }))
      if (options.profile) {
        const filename = `${config.projectDist}/stats.json`
        const contents = JSON.stringify(stats.toJson('verbose'))
        write(filename, contents)
        console.log(`Upload ${filename} to http://webpack.github.io/analyse/#modules`)
      }
    })
}

const publishGit = (dir, options) => {
  const ghpages = require('gh-pages')
  return new Promise((resolve, reject) => {
    ghpages.publish(dir, options, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

const deployGit = (options) => {
  return publishGit(config.projectDist, {
    repo: options.repo,
    remote: options.remote,
    branch: options.branch,
    tag: config.projectVersion,
    message: config.projectVersion,
    logger: console.log,
  })
}

const runKarma = (karmaConfig) => {
  // create the karma server for running tests
  const Server = require('karma').Server
  return new Promise((resolve, reject) => {
    const server = new Server(karmaConfig, function(exitCode) {
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

const testKarma = (options) => {
  // generate the karma configuration
  const webpackConfig = require('./webpack/test')(config, options)
  const karmaConfig = require('./karma')(config, webpackConfig)
  return runKarma(karmaConfig)
}

module.exports = {
  dev,
  build,
  deployGit,
  testKarma,
}
