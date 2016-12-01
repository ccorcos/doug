# Doug 🔨🔨🔨

Doug is a modular build system that lets you to build your own zero-configuration commandline tools. Doug solves two problems:

- Rather than install `webpack`, `babel`, `karma`, `mocha` and all of the various tools just to get a project up and running, you only need to install one. [`create-react-app`](https://github.com/facebookincubator/create-react-app) is a very popular solution to this problem.

- When you want to take an existing Doug tool and customize or extend it, rather than fork it, you can simply create a new Doug tool depend on the other Doug tool. Thus you never have to deal with upstream merges and you end up with a much more maintainable ecosystem.

At it's core, Doug is just a pattern for building commandline tools using [Vorpal](https://github.com/dthree/vorpal) that is easy to customize and extend. I've created two tools so far:

- [`doug-app`](./packages/doug-app) helps you build React applications with Webpack, Babel, Mocha, Karma, and PhantomJS.
- [`doug-lib`](./packages/doug-lib) helps you build JS libraries with Babel and Ava.

For specifics on getting setup using either of those tools, please check out the README files in those projects.









## Table Of Contents

- [create an JavaScript app using `doug-app`](./packages/doug-app/README.md)
- [create an JavaScript library using `doug-lib`](./packages/doug-lib/README.md)
- [create your own doug tool from scratch](#create-your-own-doug-tool-from-scratch)

## Create Your Own Doug Tool From Scratch

You don't need to use `doug` to create your own zero-configuration build tool. But the whole point of the `doug` package is to create a set of useful functions for building Doug tools.

**Background:** For those less familiar with NPM or programming in general, you can create a [`bin` property in a project's `package.json`](https://docs.npmjs.com/files/package.json#bin) that let's you specify commandline aliases. If you install a package globally (`npm install --global`) then you have access to these commands from the commandline anywhere. But if you install a package as a dependency of a project, you can access them from `node_modules/.bin`. But these bin scripts are also accessible through the [`scripts` property of a projects `package.json`](https://docs.npmjs.com/misc/scripts). Thus, if a Doug tool exposes a bin script, then we can alias commands to that script through commands like `npm start`, `npm test`, or `npm run-script build`.

> Doug is a pattern for creating commandline build tools that are *extensible*.

Any build tool needs to be configured. Ideally, these configurations should be optional with reasonable default values. One way of configuring a build tool is with a JavaScript file in the root of the project, much like Webpack or ESLint. Some projects like to use the existing `project.json` file for configuration but that limits your amount of expressiveness so I don't like to do that.

So suppose we create a `doug.config.js` file that exports a configuration object at the root of our project.

```js
// project/doug.config.js
module.exports = {
  // configuration options here
}
```

Now, if we create a Doug tool for this project, we can access that configuration file through `process.env.PWD`:

```js
const dougConfig = require(`${process.env.PWD}/doug.config.js`)
```

Or an easier way is just to use the `doug` package:

```js
const dougConfig = require('doug/config')
```

Another way we can configure build tools is with commandline options. Commandline options are usually specific to the command and Doug uses [Commander.js](https://github.com/tj/commander.js) for parsing and validating commandline arguments. To define a command, I recommend breaking up commands into separate files so they're easily reusable if someone else wants to extend your Doug tool.

A command should have two properties -- `options` should let you define the commandline options for the command, and `action` is just a function that does whatever you want.

In the following example, we're defining a command that has a `--name` option, and the action accepts the Doug config and the commandline options and will `console.log` an appropriate greeting.

```js
// doug-tool/command/hello.js
module.exports = {
  options: (program) => {
    return program
      .option('-n, --name', 'name of the person to greet')
  },
  action: (dougConfig, cliOptions) => {
    console.log(`hello ${cliOptions.name || dougConfig.name || 'world'}`)
  }
}
```

The `program` passed into the `options` function is going to be a Commander.js program so it's all the same syntax. The `action` function will be called from the actual commandline script, but refactoring each command into this format makes it much easier for others to extend with their own tools. You'll see how that's done later.

Next thing we want to do is define the Commander.js command and, again, we'll want to separate this in it's own file to make it easier for extension later.

```js
// doug-tool/cli/hello.js
const hello = require('../commands/hello')
module.exports = (program, dougConfig) => {
  program
    .command('hello')
    .description('a friendly greeting')
    .pipe(hello.options)
    .action((cliOptions) => {
      return hello.action(dougConfig, cliOptions)
    })
}
```

The `.pipe` function will wire up the options for you and in the `action` callback, we call the `hello.action` with all the appropriate arguments. **Note:** the `.pipe` prototype function is an extention of Commander.js that's available through `doug` using by `const program = require('doug/commander')` rather than `const program = require('commander')`.

The last piece of the puzzle is to create the actual commandline bin script. So let's do that:

```js
// doug-tool/bin.js
#!/usr/bin/env node
const program = require('doug/commander')
const config = require('doug/config')
require('./cli/hello')(program, config)
program.parse(process.argv)
```

The first line is called a [shebang](https://en.wikipedia.org/wiki/Shebang_(Unix)) which lets your shell know which program is used to run this script. Then we're using the `doug` helpers to load Commander.js (with the `.pipe` prototype method) and the project's `doug.config.js` file. Lastly, we wire up the hello command and parse the commandline arguments to set everything in motion.

Next we need to make the script executable. This lets us run the script with `./bin.js hello` rather than having to pass it to call it with `node bin.js hello`. It's as easy as `chmod +x bin.js`. Then we'll want to create an NPM alias to that file so that we can use this script with `doug-tool hello` rather than `./bin.js hello`. And this can be done in the `doug-tool/package.json` file which should look something like this:

```js
// doug-tool/package.json
{
  "name": "doug-tool",
  "version": "0.0.1",
  "bin": {
    "doug-tool": "./bin.js"
  },
  "devDependencies": {
    "doug": "^0.1.0"
  }
}
```

Now we can't use `doug-tool` from the commandline yet because the script is not on our `$PATH`. But that doesn't matter because we want to make sure we use it through `npm run-script` otherwise `process.env.PWD` might not be the right directory to find the `doug.config.js` file. So back in the project we're working on, we can use `doug-tool` through the `package.json` scripts property.


```js
// project/package.json
{
  "name": "project",
  "version": "0.0.1",
  "scripts": {
    "hello": "doug-tool hello"
  },
  "devDependencies": {
    "doug-tool": "^0.0.1"
  }
}
```

Now, if you publish `doug-tool` you should be able to `npm install` inside your project and run `npm run-script hello` to see "hello world" log out in the console. And if you run `npm run-script hello -- --name=chet`, you should see "hello chet" log out in the console.

If you don't want to publish `doug-tool` on NPM and simply want to use it locally, you can simply link them together in your filesystem using [`npm link`](https://docs.npmjs.com/cli/link).

```sh
cd doug-tool
npm link
cd ../project
npm link doug-tool
npm install
```

And now the commands should work. If you're working on a larger project or just want to create a simple tool that separates all of your build tools from your actual source code, I'd recommend using [Lerna](https://lernajs.io) and putting all of your projects in a `packages` directory. Then you



---

- publish new version with dependencies, etc.
- rename to hello doug
- setup hello-doug so it works
- extending hello-doug
- better project readme
- medium articles










- cli options
- project config options

- commands
- hooks

- CLI



## Best Practices

- always have default configs
- separate things out so they're extensible
- make not of the way things can be overridden
- actions should return promises



















> Please submit a PR if you have a better way of explaining how this all works.

There are three pieces that all come together to make up a Doug tool: the executable script, a set of commands, and the Doug config file. Here's simple example that shows how all the pieces work together.

Suppose you want to create your own tool called `my-doug-tool`:

```js
// my-doug-tool/package.json
{
  "name": "my-doug-tool",
  "version": "0.0.1",
  "bin": {
    "my-doug-tool": "./cli.js"
  }
}
```

And you want to use this tool for your project:

```js
// my-project/package.json
{
  "name": "my-project",
  "version": "0.0.1",
  "devDependencies": {
    "my-doug-tool": "^0.0.1"
  },
  "script": {
    "something": "my-doug-tool something"
  }
}
```

Now let's create a command. Every command should be abstracted into two pieces.

- `options` lets you specify commandline options using [Commander.js `.option`](https://github.com/tj/commander.js#option-parsing) and returning the command.
- `action` is just a function that does something. The arguments are typically the Doug config, the cli options, and anything else that's relevant like a webpack configuration. If this function is async, it should return a promise so it can be extended easily.

This command simply logs some stuff:

```js
// my-doug-tool/commands/something.js
module.exports = {
  options: (program) => {
    return program
      .option('-f, --force', 'a force option')
  },
  action: (config, options) => {
    const verb = options.force ? 'force' : 'do'
    console.log(`${verb} something ${config.when}`)
  },
}
```

We want the project to be able to specify `when` inside a config file so lets do that:

```js
// my-project/doug.config.js
module.exports = {
  when: 'now',
}
```

The last piece is putting everything together in the cli script. We can access the Doug config file using `const config = require('doug/config')`. We also want to use `doug/commander` because we add a `.pipe` convenience function for wiring up the command options.

```js
// my-doug-tool/cli.js
#!/usr/bin/env node
const program = require('doug/commander')
const config = require('doug/config')
const dev = require('./commands/dev')

program
  .command('something')
  .description('does something')
  .pipe(dev.options)
  .action((options) => {
    return dev.action(config, options)
  })
```

Now inside your project, you should be able to run `npm run-script something` and see it log "do something now". You can pass options as well: `npm run-script something -- --force` should log "force something now". And any project can specify the `when` property in the `doug.config.js` file.

Now the real benefit of this pattern is that we can extend these tools easily to create new tools. Suppose we want to create a new Doug tool:


```js
// other-doug-tool/commands/something.js
const something = require('my-doug-tool/commands/something')
module.exports = {
  options: (program) => {
    return program
      .pipe(something.options)
      // we can specify extra options here
      .option('-t, --today', 'do it today')
      .option('-y, --yesterday', 'do it yesterday')
  },
  action: (config, options) => {
    const when = options.today ? 'today'
               : options.yesterday ? 'yesterday'
               : config.when ? config.when
               : 'never'
    return something.action({when}, options)
  },
}
```

What we've done is added some custom pre-configurations with this new command but reused all of the code from before without having to fork that tool. The only legwork we need to do is write out the whole cli script again to wire everything up.

**The idea here is that you can extend or configure any Doug tool by creating a new Doug tool and calling into those other commands.** There's no need for fancy abstractions for configuring and adding hooks -- everything is explicit.

### Philosophy / Best Practices:

- All commands should be extensible so that other tools can reuse them.
- As much as possible, use Node.js API's instead of CLI API's.

## Using `doug-app`

```sh
npm install --save-dev doug-app
```

See `packages/example-app` to see an example `doug.config.js` and the `package.json` scripts.

## Using `doug-lib`

```sh
npm install --save-dev doug-lib
```

See `packages/example-lib` to see an example `doug.config.js` and the `package.json` scripts.

## Development

```sh
npm install --global lerna@prerelease
git clean -fXd
lerna bootstrap
```
