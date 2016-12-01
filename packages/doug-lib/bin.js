#!/usr/bin/env node
'use strict'

const vorpal = require('doug/vorpal')
const resolve = require('doug/resolve')

const config = require('doug/config') || {
  src: './src',
  test: './lib/**/*.test.js',
}

config.package = require(resolve('package.json'))

require('./cli/test')(vorpal, config)
require('./cli/build')(vorpal, config)
require('./cli/release')(vorpal, config)

vorpal
  .delimiter('doug-lib ❯❯❯')
  .parse(process.argv)
