'use strict'

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const webpack = require('webpack')
const app = express()
const resolve = require('doug/resolve')

// parse json all request body
app.use(bodyParser.json({limit: '50mb'}))

// some basic logging for the dev server
app.use(morgan('dev'))

module.exports = (config, options, webpackConfig) => {

  const compiler = webpack(webpackConfig)

  // webpack dev server
  const middleware = require('webpack-dev-middleware')(compiler, {
    noInfo: false,
  })
  app.use(middleware)

  // allow additional configuration mocking backend routes or proxying
  config.api && config.api(app)

  // hot module replacement
  app.use(require('webpack-hot-middleware')(compiler))

  // serve the distribution assets
  app.use(express.static(resolve('dev')))

  // HTML5 History
  // app.get('*', function(req, res) {
  //   const indexPath = path.join(config.projectRoot, 'dev', 'index.html')
  //   res.end(middleware.fileSystem.readFileSync(indexPath))
  // })

  app.disable('etag');
  const PORT = process.env.PORT || 3000

  // start up the development server
  const server = app.listen(PORT, 'localhost', (err) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('Listening at http://localhost:' + PORT)
  })

  return new Promise((resolve) => {
    // graceful shutdown
    const shutdown = () => server.close(resolve)
    // listen for TERM signal .e.g. kill
    process.on('SIGTERM', shutdown)
    // listen for INT signal e.g. Ctrl-C
    process.on('SIGINT', shutdown)
  })
}
