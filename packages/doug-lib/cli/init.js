'use strict'

const path = require('path')
const init = require('doug/commands/init')

module.exports = (vorpal, config) => {
  vorpal
    .command('init [directory]')
    .description('initialize a new doug-lib project')
    .use(init.options)
    .action(({directory}) => {
      return init.action(
        directory,
        {
          name: "doug-lib-template",
          version: "0.0.1",
          scripts: {
            build: "doug-lib build",
            test: "doug-lib build && doug-lib test",
            release: "doug-lib release",
          },
        },
        path.resolve(__dirname, '../template'),
        [],
        ['doug-lib']
      )
    })
}
