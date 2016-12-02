#!/usr/bin/env node
'use strict'

const vorpal = require('doug/vorpal')
const resolve = require('doug/resolve')
const config = Object.assign(require('./defaults'), require('doug/config'))

if (config.root) {
  config.package = require(resolve('package.json'))
  require('./cli/test')(vorpal, config)
  require('./cli/build')(vorpal, config)
  require('./cli/release')(vorpal, config)
} else {
  // require('./cli/init')(vorpal, config)
}

vorpal
  .delimiter('doug-lib ❯❯❯')
  .parse(process.argv)
