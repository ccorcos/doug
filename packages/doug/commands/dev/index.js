'use strict'

const config = require('../../config')
const makeWebpackConfig = require('../../webpack/dev')

module.exports = (options) => {
  const webpackConfig = makeWebpackConfig(config, options)
  require('./server')(config, webpackConfig)
}
