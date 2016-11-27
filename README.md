# Doug 🔨🔨🔨

Doug is a modular build system that allows you to customize and build your own zero-configuration CLI tools that are tuned for your workflow.

At it's core, Doug is just a pattern for building CLI tools using Commander.js that makes it easy to customize and extend into your own tools.

A command looks like this:

```js
// commands/something.js
module.exports = {
  options: (program) => {
    return program
      .option('-f, --force', 'force it')
  },
  action: (args) => {
    return doSomething(args)
  },
}
```

The `options` function lets you customize the command options for a Commander.js command. Then action is just a function that does something. When it comes time to actually build your own tool, you just want define the CLI commands and hook up all the options and the actions.

```js

const program = require('doug/commander')
const config = require('doug/config')
const something = require('./commands/something')
const makeArgs = require('./commands/something/makeArgs')

program
  .command('something')
  .description('do something')
  .pipe(something.options)
  .action((options) => {
    const args = makeArgs(config, options)
    return something.action(args)
  })
```

The beauty of this pattern is you can create commands that extend or configure other commands.

```js
// commands/other-something.js
const something = require('./commands/something')

module.exports = {
  options: (program) => {
    return program
      .pipe(something.options)
      .option('-o, --other', 'other options')
  },
  action: (args) => {
    console.log("do whatever you want before or after")
    return something.action(args)
  },
}
```

Part of the philosophy here is to create un-opinionated building blocks for creating some typical tools. And ideally, these building blocks can all live within Doug so we can ensure that everything works cohesively together (just like prezto).

## Doug App

```sh
yarn add --dev doug-app
```

Create a config file specifying some configurations:

```js
'use strict'

const path = require('path')

module.exports = {
  html: path.resolve('.', 'src', 'index.html'),
  entry: {
    index: path.resolve('.', 'src', 'index.js'),
  },
  test: path.resolve('.', 'test.js'),
  api: (app) => {
    // create some mock express routes
  },
}
```

Then add some scripts to your package.json:

```json
{
  "scripts": {
    "dev": "doug-app dev"
  }
}
```


## Development

```sh
npm install --global lerna@prerelease
git clean -fXd
lerna bootstrap
```
