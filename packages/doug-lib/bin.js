#!/usr/bin/env node
'use strict'

const vorpal = require('doug/vorpal')
const config = require('doug/config')

require('./cli/test')(vorpal, config)
require('./cli/build')(vorpal, config)
require('./cli/release')(vorpal, config)

vorpal.parse(process.argv)
