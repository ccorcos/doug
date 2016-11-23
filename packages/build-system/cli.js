#!/usr/bin/env node
'use strict'

const program = require('commander')
const commands = require('./commands')

program
  .command('dev')
  .description('start a development server')
  .option('--build-css', 'build css files')
  .action(commands.dev)

program
  .command('build')
  .description('build distribution assets')
  .option('--build-css', 'build css files')
  .option('--root-url <url>', 'the base url for the CDN where the assets live')
  .option('--human', 'do not minify the source files')
  .option('--profile', 'output the webpack stats.json file for analysis')
  .action(commands.build)

program
  .command('deploy-git')
  .description('deploy project using git')
  .option('--repo <url>', 'deploy to a repo other than the current repo')
  .option('--remote <remote>', 'deploy a git remote other than origin')
  .option('--branch <branch>', 'deploy to a branch other than gh-pages')
  .action(commands.deployGit)

// program
//   .command('deploy-s3')
//   .description('deploy project to aws s3')
//   .option('--bucket <bucket>', 'aws bucket id')
//   .option('--secret <secret>', 'aws bucket secret')
//   .action(commands.deployS3)

program
  .command('test-karma')
  .description('run unit unit tests with karma and mocha')
  .action(commands.testKarma)

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
