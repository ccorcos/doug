'use strict'

const path = require('path')

// find the project config file
const projectRoot = process.env.PWD
const config = require(path.join(projectRoot, 'config'))
const packageJson = require(path.join(projectRoot, 'package.json'))
config.packageJson = packageJson
config.projectRoot = projectRoot
config.projectName = packageJson.name
config.projectVersion = packageJson.version
config.projectDist = path.join(projectRoot, 'dist')

module.exports = config
