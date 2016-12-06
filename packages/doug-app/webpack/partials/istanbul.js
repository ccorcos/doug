'use strict'

module.exports = {
  babel: {
    plugins: [
      [require.resolve('babel-plugin-istanbul'), {
        exclude: [
          '**/*spec*',
          '**/*test**',
        ],
      }],
    ],
  },
}
