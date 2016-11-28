#!/usr/bin/env node
'use strict'

const program = require('doug/commander')
const config = require('doug/config')

require('./cli/dev')(program, config)
require('./cli/build')(program, config)
require('./cli/deploy')(program, config)
require('./cli/release')(program, config)
require('./cli/test')(program, config)

program.parse(process.argv)
