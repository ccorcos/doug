'use strict'

const path = require('path')

module.exports = {
  html: path.resolve('.', 'src', 'index.html'),
  entry: {
    index: path.resolve('.', 'src', 'index.js'),
  },
  test: path.resolve('.', 'test.js'),
  api: (app) => {

  },
}
