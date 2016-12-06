# To Do

- doug-app
  - fix deploy-git
- doug-cli
  - init hello doug
  - build docs
  - test
  - release
  - travis config

  - shell utils for testing
  - docker integration
  - travis ci integration
  - build documentation
  - use doug-cli for doug-app and doug-lib


- write
  - how to set up end to end tests inside a docker container
  - how to create your own zero-configuration build tools

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


## Docker on Mac Quickstart

```sh
brew install docker
brew install boot2docker
# boot2docker upgrade
boot2docker init
boot2docker up
eval "$(boot2docker shellinit)"
docker run ubuntu /bin/echo 'Hello world'
docker run -t -i ubuntu /bin/bash
docker run -t -i node /bin/bash
```

docker run -v `pwd`:/root/doug node /bin/bash /root/doug/test/run.sh
docker run -v `pwd`:/root/doug -t -i node /bin/bash
