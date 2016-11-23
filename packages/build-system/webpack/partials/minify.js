'use strict'

const webpack = require('webpack')

module.exports = (config) => ({
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        except: config.except || [],
      },
      output: {
        comments: false,
      },
    }),
  ],
})
