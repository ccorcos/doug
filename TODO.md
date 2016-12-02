# To Do

- doug init commands
  - move examples inside as templates
- end to end unit test

- documentation and examples
  - doug-app
  - doug-lib
  - tutorials
    - hello-doug
    - hello-project

- automated tests using docker like yarn does
- continuous integration with Travis CI
- flow static typing

- lerna with yarn https://github.com/lerna/lerna/issues/371

- more support
  - gracefully close HTTP server: Error: read EIO?
  - eslint loader: Sha1 error?
  - minify html
  - webdriver browser tests
  - jest examples
  - custom feature flags
  - deploy s3
  - generate docs + deploy docs

- feathers
  - tooling?
  - doug middleware
  - SSR / next.js

- examples
  - code splitting on pages directory
  - async module loading with client-side router
  - SSR with glamor just like Next.js
  - app with feathers.js backend / chat application
    - styleguide, storybook, redux
    - react native
  - js/css library module

- extra
  - choose your own build system features using inquirer!

- CI integrations
  - travis, circle, browserstack, codeship, jenkins



## End To End unit tests

```sh
# setup
git clean -fXd
sudo pip install virtualenv
virtualenv env
source env/bin/activate
pip install nodeenv
nodeenv -p -j8 --prebuilt -n "7.0.0" --with-npm --npm "4.0.1"
source env/bin/activate
npm install -g lerna@prerelease
lerna bootstrap
```

```sh
mkdir test
doug-app init
doug-app build
```

```sh
mkdir test
doug-app init origin
cd origin
git init --bare
git add .
git commit -m "first"
cd ..
git clone origin local
cd local
# npm start / doug-app dev check for localhost:3000
```