'use strict'

const path = require('path')
const init = require('doug/commands/init')

module.exports = (vorpal, config) => {
  vorpal
    .command('init [directory]')
    .description('initialize a new doug-app project')
    .use(init.options)
    .action(({directory}) => {
      return init.action(
        directory,
        {
          name: "doug-template",
          version: "0.0.1",
          scripts: {
            // build: "doug build",
            test: "doug test",
            release: "doug release",
          },
        },
        path.resolve(__dirname, '../template'),
        ['doug'],
        []
      )
    })
}
