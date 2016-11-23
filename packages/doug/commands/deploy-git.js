'use strict'

const ghpages = require('gh-pages')
const config = require('../config')

const publishGit = (dir, options) => {
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

module.exports = (options) => {
  return publishGit(config.projectDist, {
    repo: options.repo,
    remote: options.remote,
    branch: options.branch,
    tag: config.projectVersion,
    message: config.projectVersion,
    logger: console.log,
  })
}
