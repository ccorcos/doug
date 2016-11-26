'use strict'

module.exports = {
  module: {
    loaders: [
      // use react-hot for hot module replacement
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
    ],
  },
  babel: {
    presets: [
      'babel-preset-es2015',
      'babel-preset-stage-0',
      'babel-preset-react',
    ].map(require.resolve),
  },
}
