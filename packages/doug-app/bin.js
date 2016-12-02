#!/usr/bin/env node
'use strict'

const vorpal = require('doug/vorpal')
const resolve = require('doug/resolve')
const config = Object.assign(require('./defaults'), require('doug/config'))

if (resolve.root) {
  config.package = require(resolve('package.json'))

  require('./cli/dev')(vorpal, config)
  require('./cli/build')(vorpal, config)
  require('./cli/deploy')(vorpal, config)
  require('./cli/release')(vorpal, config)
  require('./cli/test')(vorpal, config)
} else {
  // require('./cli/init')(vorpal, config)
}

vorpal
  .delimiter('doug-app ❯❯❯')
  .parse(process.argv)