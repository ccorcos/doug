'use strict'

module.exports = {
  options: (vorpal) => {
    return vorpal
      .option('--bucket <bucket>', 'aws bucket id')
      .option('--secret <secret>', 'aws bucket secret')
  },
  action: (config, options) => {

  },
}
