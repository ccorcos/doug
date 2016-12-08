'use strict'

const docs = require('../commands/docs')

module.exports = (vorpal, config) => {
  vorpal
    .command('docs')
    .description('generate documentation')
    .use(docs.options)
    .action(({options}) => {
      return Promise.resolve(docs.action(config, options))
    })
}
