#!/usr/bin/env node
'use strict'

const vorpal = require('./vorpal')
const resolve = require('./resolve')
const config = Object.assign(require('./defaults'), require('doug/config'))

try {
  config.package = require(resolve('package.json'))
} catch (e) {

}

// require('./cli/init')(vorpal, config)
// require('./cli/test')(vorpal, config)
require('./cli/docs')(vorpal, config)
// require('./cli/release')(vorpal, config)

if (require.main === module) {
  // if run through the commandline
  vorpal
    .delimiter('doug ❯❯❯')
    .parse(process.argv)
}