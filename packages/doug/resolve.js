'use strict'

const path = require('path')
const projectRoot = process.env.PWD
module.exports = (...args) => path.resolve(projectRoot, ...args)
