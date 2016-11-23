- modular build system
  - build distribution files
  - deploy to github pages
  - run some tests
  - examples
    - code split + async module loading
    - ssr
  - lib example

  - webpack
    - custom loaders
    - custom plugins
    - pages, code splitting / routing
  - deploy
    - aws
    - github pages
  - code splitting, SSR
  - testing
    - jasmine, jest, webdriver, mocha, ava
  - eslint, stylelint, flowtype
- styleguide
- storybook
- redux


```
/packages
  /styleguide          # stateless UX presentational components, not redux
    /package.json
    /node_modules
    /ui
      /button
      /text-input
      /header
      /nav
      /list      
  /storybook           # stateful reusable redux modules
    /package.json
    /node_modules
    /modules
      /layout
      /login
        /actionTypes   # just constants
        /actions       # action creators
        /api           # http abstractions
        /endpoints     # express middleware for mocking endpoints
        /reducer
        /mutators
        /component     # stateless view, no redux
        /container     # connects component to redux (with assumptions)
        /routes
  /ios
  /android
  /web
```
