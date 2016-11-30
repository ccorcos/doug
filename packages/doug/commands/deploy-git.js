'use strict'

const ghpages = require('gh-pages')

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

module.exports = {
  options: (vorpal) => {
    return vorpal
      .option('--repo <url>', 'deploy to a repo other than the current repo')
      .option('--remote <remote>', 'deploy a git remote other than origin')
      .option('--branch <branch>', 'deploy to a branch other than gh-pages')
  },
  action: (config, options) => {
    return publishGit(config.projectDist, {
      repo: options.repo,
      remote: options.remote,
      branch: options.branch,
      tag: config.projectVersion,
      message: config.projectVersion,
      logger: console.log,
    })
  },
}
