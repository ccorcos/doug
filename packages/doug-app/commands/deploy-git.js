'use strict'

const resolve = require('doug/resolve')
const R = require('ramda')

const publishGit = (dir, options) => {
  // collections shim conflicts with eslint-loader -> object-hash
  // https://github.com/tschaub/gh-pages/issues/42
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

module.exports = {
  options: (vorpal) => {
    return vorpal
      .option('--repo <url>', 'deploy to a repo other than the current repo')
      .option('--remote <remote>', 'deploy a git remote other than origin')
      .option('--branch <branch>', 'deploy to a branch other than gh-pages')
  },
  action: (config, options) => {
    return publishGit(resolve('dist'), R.filter(Boolean, {
      repo: options.repo,
      remote: options.remote,
      branch: options.branch,
      message: config.package.version,
      logger: console.log,
    }))
  },
}
