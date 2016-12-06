#!/usr/bin/env node
'use strict'

const vorpal = require('doug/vorpal')
const config = Object.assign(require('./defaults'), require('doug/config'))

require('./cli/hello')(vorpal, config)

vorpal
  .delimiter('hello-doug ❯❯❯')
  .parse(process.argv)
