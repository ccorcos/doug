'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (config) => ({
  plugins: [
    new HtmlWebpackPlugin({
      template: `!html!${config.html}`,
      inject: 'body',
    }),
  ]
})
