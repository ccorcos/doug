'use strict'

const hello = require('hello-doug/commands/hello')

module.exports = {
  options: (vorpal) => {
    return vorpal
      .use(hello.options)
      .option('-s, --spanish', 'greet in spanish')
  },
  action: (config, options) => {
    if (options.spanish) {
      console.log(`hola ${options.name || config.name || 'mundo'}`)
    } else {
      return hello.action(config, options)
    }
  }
}
