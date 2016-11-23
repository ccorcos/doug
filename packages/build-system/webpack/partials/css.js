'use strict'

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const Css = new ExtractTextPlugin('[name]-[contenthash].css')

module.exports = (config) => {
  if (config.ignore) {
    return {
      module: {
        // we may want to ignore css compilation to speed up unit tests
        loaders: [
          {
            test: /\.css$/,
            loader: 'ignore',
          },
        ],
      },
    }
  }
  return {
    module: {
      // use the style loader unless we want to build css into a static file
      loaders: [
        config['build-css'] ? {
          test: /\.css$/,
          loader: Css.extract(['css','postcss']),
        } : {
          test: /\.css$/,
          loaders: ['style', 'css','postcss'],
        },
      ]
    },
    plugins: config['build-css'] ? [Css] : [],
    postcss: function(webpack) {
      return [
        // order matters!
        require('postcss-import')({
          path: config.projectRoot,
          addDependencyTo: webpack,
        }),
        require('postcss-mixins'),
        require('postcss-cssnext')({
          browser: '> 1%, last 2 versions, Firefox ESR, Opera 12.1',
        }),
      ]
    },
  }
}
