
'use strict'

module.exports = (config) => ({
  module: {
    loaders: [
      // assets get inlined if < 8kB otherwise linked with a url
      {
        test: /\.(svg|png|jpe?g|gif)$/,
        loaders: config.minify
               ? ['url?limit=8182&name=[name]-[hash].[ext]', 'image-webpack?bypassOnDebug&optimizationLevel=7']
               : ['url?limit=8182&name=[name]-[hash].[ext]'],
      },
      // assets get inlined if < 8kB otherwise linked with a url
      {
        test: /\.(ttf|woff2?|eot|otf)$/,
        loader: 'url?limit=8182&name=[name]-[hash].[ext]',
      },
    ],
  },
})
