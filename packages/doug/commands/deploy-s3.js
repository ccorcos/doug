'use strict'

module.exports = {
  options: (program) => {
    return program
      .option('--bucket <bucket>', 'aws bucket id')
      .option('--secret <secret>', 'aws bucket secret')
  },
  action: (config, options) => {

  },
}
