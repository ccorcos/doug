'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin')
const resolve = require('doug/resolve')

module.exports = (config) => ({
  plugins: [
    new HtmlWebpackPlugin({
      template: `!html!${resolve(config.html)}`,
      inject: 'body',
    }),
  ]
})
