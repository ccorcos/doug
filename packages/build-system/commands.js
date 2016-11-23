'use strict'

const shell = require('shelljs')
const config = require('./config')

const dev = (options) => {
  const webpackConfig = require('./webpack/dev')(config, options)
  require('./webpack/server')(config, webpackConfig)
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
    messge: config.projectVersion,
  })
}

module.exports = {
  dev,
  build,
  deployGit,
}
