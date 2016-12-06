'use strict'

const resolve = require('doug/resolve')

module.exports = (config, options, webpackConfig) => {
  return {
    basePath: '',
    frameworks: ['mocha'],
    browsers: ['PhantomJS'],
    files: [
      resolve(config.test),
    ],
    preprocessors: {
      [resolve(config.test)]: ['webpack'],
    },
    webpack: webpackConfig,
    webpackServer: {
      noInfo: false,
    },
    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-coverage',
      'karma-spec-reporter',
      'karma-junit-reporter',
      'karma-phantomjs-launcher',
    ],
    reporters: [
      // 'progress',
      // 'dots',
      'spec',
      'junit',
      'coverage',
    ],
    coverageReporter: {
      reporters: [
        {
          type: 'cobertura',
          dir: '.',
          subdir: '.',
          file: 'test-coverage.xml',
        },
        {
          type: 'text',
        },
        // {
        //   type: 'summary',
        // },
      ]
    },
    junitReporter: {
      outputDir: '.',
      useBrowserName: false,
      outputFile: 'test-results.xml',
      suite: 'unit',
    },
    port: 9876,
    colors: true,
    logLevel: 'info',
    singleRun: true,
  }
}
