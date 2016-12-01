#!/usr/bin/env node
'use strict'

const vorpal = require('doug/vorpal')
const config = require('doug/config')

require('./cli/hello')(vorpal, config)

vorpal
  .delimiter('hello-doug ❯❯❯')
  .parse(process.argv)
