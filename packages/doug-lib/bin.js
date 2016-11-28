#!/usr/bin/env node
'use strict'

const program = require('doug/commander')
const config = require('doug/config')

require('./cli/test')(program, config)
require('./cli/build')(program, config)
require('./cli/release')(program, config)

program.parse(process.argv)
