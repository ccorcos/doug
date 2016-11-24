'use strict'

const shell = require('shelljs')
const webpack = require('webpack')
const write = require('../utils/write')

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

module.exports = {
  options: (program) => {
    return program
      .option('--build-css', 'build css files')
      .option('--root-url <url>', 'the base url for the CDN where the assets live')
      .option('--human', 'do not minify the source files')
      .option('--profile', 'output the webpack stats.json file for analysis')
  },
  action: (config, options, webpackConfig) => {
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
