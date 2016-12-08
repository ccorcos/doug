#!/usr/bin/env node
'use strict'

const vorpal = require('doug/vorpal')
const resolve = require('doug/resolve')
const config = Object.assign(require('./defaults'), require('doug/config'))

try {
  config.package = require(resolve('package.json'))
} catch(e) {

}

require('./cli/init')(vorpal, config)
require('./cli/test')(vorpal, config)
require('./cli/build')(vorpal, config)
require('doug/cli/release')(vorpal, config)

if (require.main === module) {
  // if run through the commandline
  vorpal
    .delimiter('doug-lib ❯❯❯')
    .parse(process.argv)
}