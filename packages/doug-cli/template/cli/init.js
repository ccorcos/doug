'use strict'

const path = require('path')
const init = require('doug/commands/init')

module.exports = (vorpal, config) => {
  vorpal
    .command('init [directory]')
    .description('initialize a new hello-doug project')
    .use(init.options)
    .action(({directory}) => {
      return init.action(
        directory,
        {
          name: "hello-doug-template",
          version: "0.0.1",
        },
        path.resolve(__dirname, '../template'),
        [],
        ['doug-cli']
      )
    })
}
