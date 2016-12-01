'use strict'

module.exports = {
  options: (vorpal) => {
    return vorpal
      .option('-n, --name', 'name of the person to greet')
  },
  action: (config, options) => {
    console.log(`hello ${options.name || config.name || 'world'}`)
  }
}
