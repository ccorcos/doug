'use strict'

module.exports = (config, webpackConfig) => {
  return {
    basePath: '',
    frameworks: ['mocha'],
    browsers: ['jsdom'],
    files: [
      config.test,
    ],
    preprocessors: {
      [config.test]: ['webpack', 'sourcemap'],
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
      'karma-sourcemap-loader',
      'karma-jsdom-launcher',
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
