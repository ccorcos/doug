'use strict'

const ExtendedDefinePlugin = require('extended-define-webpack-plugin')
const R = require('ramda')

const mergeDefs = (defs) => {
  return defs.filter(Boolean).reduce(R.merge, {})
}

module.exports = (...defs) => ({
  plugins: [
    new ExtendedDefinePlugin(mergeDefs(defs)),
  ],
})
