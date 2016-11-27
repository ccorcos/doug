#!/usr/bin/env node
'use strict'

const program = require('doug/commander')
const config = require('doug/config')
const dev = require('./commands/dev')
const test = require('doug/commands/test-karma')
const build = require('doug/commands/build')
const deploy = require('doug/commands/deploy-git')
const release = require('doug/commands/release')

program
  .command('dev')
  .description('start a development server')
  .pipe(dev.options)
  .action((options) => {
    const webpackConfig = require('./webpack/dev')(config, options)
    return dev.action(config, options, webpackConfig)
  })

program
  .command('test')
  .description('run unit tests with karma, mocha, and jsdom')
  .pipe(test.options)
  .action((options) => {
    const webpackConfig = require('./webpack/dev')(config, options)
    return test.action(config, options, webpackConfig)
  })

program
  .command('build')
  .description('build distribution assets')
  .pipe(build.options)
  .action((options) => {
    const webpackConfig = require('./webpack/build')(config, options)
    return build.action(config, options, webpackConfig)
  })

program
  .command('deploy')
  .description('deploy project using git')
  .pipe(deploy.options)
  .action((options) => {
    return deploy.action(config, options)
  })

program
  .command('release <semver>')
  .description('bump, commit, tag, and push a new release')
  .pipe(release.options)
  .action((semver, options) => {
    return release.action(config, semver, options)
  })

program.parse(process.argv)
