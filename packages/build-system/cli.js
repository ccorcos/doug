#!/usr/bin/env node
'use strict'

const path = require('path')
const program = require('commander')

// find the project config file
const projectRoot = process.env.PWD
const config = require(path.join(projectRoot, 'config'))
config.projectRoot = projectRoot
config.projectName = require(path.join(projectRoot, 'package.json')).name

const commands = {
  dev: (options) => {
    require('./webpack/server')(
      config,
      require('./webpack/dev')(config, options)
    )
  },
}

program
  .command('dev')
  .description('start a development server')
  .option('--build-css', 'build css files')
  .action(commands.dev)

// program
//   .command('test')
//   .description('')
//   .action(() => {
//
//   })

// program
//   .command('build')
//   .description('')
//   .action(() => {
//
//   })

// program
//   .command('release <semver>')
//   .description('')
//   .action(() => {
//
//   })

// program
//   .command('deploy <environment>')
//   .description('')
//   .action(() => {
//
//   })

program.parse(process.argv)
