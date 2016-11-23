'use strict'

const shell = require('shelljs')
const webpack = require('webpack')
const config = require('../config')
const makeWebpackConfig = require('../webpack/build')

const write = (file, contents) => {
  new shell.ShellString(contents).to(file)
}

const runWebpack = (webpackConfig) => {
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

module.exports = (options) => {
  const webpackConfig = makeWebpackConfig(config, options)
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
