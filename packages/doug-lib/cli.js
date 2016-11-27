#!/usr/bin/env node
'use strict'

const program = require('doug/commander')
const config = require('doug/config')
const test = require('doug/commands/test-ava')
const build = require('doug/commands/build-babel')
const release = require('doug/commands/release')

program
  .command('test')
  .description('run unit tests with ava')
  .pipe(test.options)
  .action((options) => {
    return test.action(config, options)
  })

program
  .command('build')
  .description('build distribution assets with babel')
  .pipe(build.options)
  .action((options) => {
    return build.action(config, options)
  })

program
  .command('release <semver>')
  .description('bump, commit, tag, and push a new release')
  .pipe(release.options)
  .action((semver, options) => {
    return release.action(config, semver, options)
  })

program.parse(process.argv)
