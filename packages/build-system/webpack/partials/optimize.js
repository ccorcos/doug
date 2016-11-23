'use strict'

const webpack = require('webpack')

module.exports = {
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
  ],
}
