# Doug 🔨

The here is to build a modular build system which you can put together into your own "zero-configuration" build system to use in your projects simply by installing it.

# TODO

- more modular
  - modularize first by commands
  - merge all configs and options together
  - put webpack config inside config that gets passed to command
  - add hooks / webpack overrides

- configs can configure cli args...
- but first build one thing, then break it down in subsequent versions

- configs and options should all be interchangeable

- modular build system
  - test it out
  - boom, publish

  - rip out into smaller packages, use lerna
  - piece together your own package
  - always allow subpackages to extend and add hooks and create commands

  - subpackages
    - cmd-dev
    - cmd-build
    - cmd-test-karma
    - cmd-test-ava
    - cmd-test-webdriver
    - cmd-deploy-git
    - cmd-deploy-aws

  - basic eslint for simple bugs


    config + options => webpackConfig => command

  - minify html with plugin...

  - serve should return a promise since it can exit

  - app vs library
  - webdriver browser tests
  - eslint webpack loader

  - feature flags on process.env


  - deploy
    - git
    - aws
  - tests
    - karma + phantomjs
    - mocha + jsdom
    - ava
    - jest
    - webdriver + chrome
  - linting
  - customize webpack
    - loaders
    - plugins
  - customize commands
    - feature flags
    - generate docs
    - deploy docs
  - plugin system for building zero-config build tools
  - website examples
    - code splitting on pages
    - async module loading
    - SSR with glamor just like Next.js
  - library examples
    - build js and css dist files
    - generate docs
  - make your own build system using inquirer!
- styleguide
- storybook
- redux


- fix coverage?
- test wont exit?
- CI -- travis, circle, browserstack, codeship, jenkins
