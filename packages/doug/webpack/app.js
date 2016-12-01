'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin')
const resolve = require('../resolve')

module.exports = (config) => ({
  plugins: [
    new HtmlWebpackPlugin({
      template: `!html!${resolve(config.html)}`,
      inject: 'body',
    }),
  ]
})
