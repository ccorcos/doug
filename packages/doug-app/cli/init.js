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
          name: "doug-app-template",
          version: "0.0.1",
          scripts: {
            start: "doug-app dev",
            build: "doug-app build",
            deploy: "doug-app deploy",
            test: "doug-app test",
            release: "doug-app release",
          },
        },
        path.resolve(__dirname, '../template'),
        ['react', 'react-dom'],
        ['doug-app']
      )
    })
}
