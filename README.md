# Build System

The here is to build a modular build system which you can put together into your own "zero-configuration" build system to use in your projects simply by installing it.

# TODO

- serve should return a promise since it can exit
- configs should be name-spaced more


- more modular
- choose your features
- build your commands
- configs can configure cli args...
- but first build one thing, then break it down in subsequent versions

- configs and options should all be interchangeable

- fix coverage?
- test wont exit?

- modular build system
  - testing: karma + whatever
  - linting: eslint with opinions
  - boom, publish

  - rip out into smaller packages, use lerna
  - piece together your own package
  - always allow subpackages to extend and add hooks and create commands

  - app vs library
  - webdriver browser tests



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
