'use strict'

const shell = require('shelljs')
const config = require('./config')

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

module.exports = {
  dev: (options) => {
    const webpackConfig = require('./webpack/dev')(config, options)
    require('./webpack/server')(config, webpackConfig)
  },
  build: (options) => {
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
}
