# Doug 🔨🔨🔨

Doug is a modular build system that lets you to build your own zero-configuration commandline tools. Doug solves two problems:

- Rather than install `webpack`, `babel`, `karma`, `mocha` and all of the various tools just to get a project up and running, you only need to install one. [`create-react-app`](https://github.com/facebookincubator/create-react-app) is a very popular solution to this problem.

- When you want to take an existing Doug tool and customize or extend it, rather than fork it, you can simply create a new Doug tool depend on the other Doug tool. Thus you never have to deal with upstream merges and you end up with a much more maintainable ecosystem.

At it's core, Doug is just a pattern for building commandline tools using [Vorpal](https://github.com/dthree/vorpal) that is easy to customize and extend.

## List of Doug tools

- [`doug-app`](./packages/doug-app): build React applications with Webpack, Babel, Mocha, Karma, and PhantomJS.
- [`doug-lib`](./packages/doug-lib): build JavaScript libraries with Babel and Ava.

## Tutorial

You don't need to use `doug` to create your own zero-configuration build tool, but `doug` does contain some code that will help you get going faster. That said, the internals are so simple I'm going to explain everything in this tutorial.

**Background:** For those less familiar with NPM or programming in general, you can create a ["bin" property in a project's `package.json`](https://docs.npmjs.com/files/package.json#bin) that let's you specify commandline aliases. If you install a package globally (`npm install --global`) then you have access to these commands from the commandline anywhere. But if you install a package as a dependency of a project, you can access them from `node_modules/.bin`. But these scripts are also accessible through the ["scripts" property of a project's `package.json`](https://docs.npmjs.com/misc/scripts). Thus, a Doug tool should [expose a bin script](./packages/doug-app/package.json#L4-6), then we can [alias commands like `npm start` to that script in our projects](./packages/example-app/package.json#L13).

### Hello Doug

> Doug is a **pattern** for creating commandline build tools that are *extensible*.

In this tutorial, we're going to run through an example of creating your own doug tool, [`hello-doug`](./packages/hello-doug), as a build tool for a project, [`hello-project`](./packages/hello-project). There's just going to be one command that says "hello world" but it should give you and idea of all the pieces.

Any build tool needs to be configured. **It's expected of Doug tools that all configurations are optional with reasonable default values.** One way of configuring a build tool is with a JavaScript file in the root of the project, much like Webpack or ESLint. Some projects like to use the existing `project.json` file for configuration but that limits your amount of expressiveness so I don't like to do that.

So suppose we create a `doug.config.js` file that exports a configuration object at the root of our project:

```js
// project/doug.config.js
module.exports = {
  // configuration options here
}
```

Now, if we create a Doug tool for this project, we can access that configuration file through `process.env.PWD`:

```js
const config = require(`${process.env.PWD}/doug.config.js`)
```

Or an easier way is just to use the `doug`:

```js
const config = require('doug/config')
```

Another way we want configure build tools is with commandline options. Doug uses [Vorpal](https://github.com/dthree/vorpal) for parsing and validating commandline arguments. Commandline options are usually specific to the command and let's define a command. I recommend breaking up commands into separate files so they're easily reusable if someone else wants to extend your Doug tool.

A command should have two properties -- `options` should let you define the commandline options for the command, and `action` is just a function that does whatever you want.

In the following example, we're defining a command that has a `--name` option, and the action accepts the Doug config and the commandline options and will `console.log` an appropriate greeting.

*[`hello-doug/command/hello.js`](./packages/hello-doug/command/hello.js)*
```js
module.exports = {
  options: (vorpal) => {
    return vorpal
      .option('-n, --name <name>', 'name of the person to greet')
  },
  action: (config, options) => {
    console.log(`hello ${options.name || config.name || 'world'}`)
  }
}
```

The `vorpal` argrument passed into the `options` function is going to be a [Vorpal command](https://github.com/dthree/vorpal/wiki/api-%7C-vorpal.command) so it's all the same syntax. The `action` function will be called from the commandline script, but refactoring each command into this format makes it much easier for others to extend with their own tools.

Next thing we want to do is define the Vorpal command and, again, we'll want to separate this in it's own file to make it easier for extension later.

*[`hello-doug/cli/hello.js`](./packages/hello-doug/cli/hello.js)*
```js
const hello = require('../commands/hello')

module.exports = (vorpal, config) => {
  vorpal
    .command('hello')
    .description('a friendly greeting')
    .use(hello.options)
    .action(({options}) => {
      return hello.action(config, options)
    })
}
```

In the exported function, `vorpal` is just a Vorpal instance so we can define a new command on it, and `config` is the `doug.config.js` or some defaults if that file doesn't exist. The `.use` function is a [small addition](./packages/doug/vorpal.js#L5-7) to Vorpal that makes it [a bit more composable](https://github.com/dthree/vorpal/issues/198), applying all the options for the hello command to the Vorpal command. Then in the action, we get the CLI options and pass them on to the `hello.action`.

The last piece of the puzzle is to create the actual commandline script. So let's do that:

*[`hello-doug/bin.js`](./packages/hello-doug/bin.js)*
```js
#!/usr/bin/env node

const vorpal = require('doug/vorpal')
const config = Object.assign(require('./defaults'), require('doug/config'))

require('./cli/hello')(vorpal, config)

vorpal
  .delimiter('hello-doug ❯❯❯')
  .parse(process.argv)
```

The defaults file simply exports any default configuration which, in this case should just be an empty object. It may seem superfluous, but if we ever wanted to create new defaults, this allows other tools that extend this tool to get those changes without having to change their code.

*[`hello-doug/defaults.js`](./packages/hello-doug/defaults.js)*
```js
module.exports = {}
```

The first line is called a [shebang](https://en.wikipedia.org/wiki/Shebang_(Unix)) which lets your shell know which program is used to run this script. Then we're using `doug` to load Vorpal with the `.use` prototype method and the project's `doug.config.js`. Note that the default config is just an empty object. Lastly, we require the hello command and parse the commandline arguments to set everything in motion.

Next, we need to make the script accessible from the outside. First we need to make it executable. This let's us run the script with `./bin.js hello` rather than having to call it with `node bin.js hello`. It's as easy as `chmod +x bin.js`. Then we'll want to create an NPM alias to that file so that we can use this script with `hello-doug hello` rather than `./node_modules/hello-doug/bin.js hello`. And this can be done in the `hello-doug/package.json` file which should look something like this:

*[`hello-doug/package.json`](./packages/hello-doug/package.json)*
```js
{
  "name": "hello-doug",
  "private": true,
  "version": "0.3.0",
  "bin": {
    "hello-doug": "./bin.js"
  },
  "devDependencies": {
    "doug": "^0.3.0"
  }
}
```

So now we have a build tool. It doesn't exactly build anything, but you could image this command [building distribution files](./packages/doug-app/cli/build.js), [deploying](./packages/doug-app/cli/deploy.js), [publishing](./packages/doug-app/cli/release.js), [running tests](./packages/doug-app/cli/test.js) or [starting up a development server](./packages/doug-app/cli/dev.js).

Now let's use this build tool in one of our projects. All we need to do is create the project and add a script to that project's `package.json`.

*[hello-project/package.json](./packages/hello-project/package.json)*
```js
{
  "name": "hello-project",
  "version": "0.3.0",
  "scripts": {
    "hello": "hello-doug hello"
  },
  "devDependencies": {
    "hello-doug": "^0.3.0"
  }
}
```

Now there are a few ways to get this to work:

1.  If you've published your `hello-doug` to NPM, you can just `npm install` and you're good to go.

2. If you're building `hello-doug` locally in your filesystem, you'll need to link the projects together:

  - The easiest way is to put these packages in a `packages` directory and use a tool like [Lerna](https://lernajs.io):

      ```sh
      npm install --global lerna@prerelease
      lerna bootstrap
      ```

  - If you want these packages to remain in different repos or just want to do things manually, you'll have to use [`npm link`](https://docs.npmjs.com/cli/link).

      ```sh
      # create a symlink to hello-doug
      cd path/to/hello-doug
      npm link
      # link hello-doug to this project
      cd path/to/hello-project
      npm link hello-doug
      # install
      npm install
      ```

Once you've figured that out, you should be able to use it:

```
❯❯❯ npm start

> hello-project@0.3.0 start /Users/chetcorcos/code/doug/packages/hello-project
> hello-doug hello

hello-doug ❯❯❯
hello world
```

And we can pass options as well:

```
❯❯❯ npm start -- --name chet

> hello-project@0.3.0 start /Users/chetcorcos/code/doug/packages/hello-project
> hello-doug hello "--name" "chet"

hello-doug ❯❯❯
hello chet
```

And if we want to make some configurations specifically for our `hello-project`, we can create a `doug.config.js` file:

*[hello-project/doug.config.js](./packages/hello-project/doug.config.js)*
```js
module.exports = {
  name: 'doug',
}
```

And now when we run the command without any options, it should say "hello doug" rather than "hello world":

```
❯❯❯ npm start

> hello-project@0.3.0 start /Users/chetcorcos/code/doug/packages/hello-project
> hello-doug hello

hello-doug ❯❯❯
hello doug
```

## Vorpal Shell

By default, `doug` adds a "shell" command to open up a Vorpal shell. In your package.json, you can add the following:

```js
{
  "scripts": {
    "shell": "hello-doug shell"
  }
}
```

Then when you run `npm run-script shell`, you'll end up in the Vorpal shell where you can get some help about how to use the tool.

```
hello-doug ❯❯❯ help

  Commands:

    help [command...]  Provides help for a given command.
    exit               Exits application.
    shell              open up a Vorpal shell
    hello [options]    a friendly greeting

hello-doug ❯❯❯ help hello

  Usage: hello [options]

  a friendly greeting

  Options:

    --help             output usage information
    -n, --name <name>  name of the person to greet
```

You can run `npm run-script shell` to open up a Vorpal shell and run commands like `help` or `help test` to more information about the commandline options.

### Extending A Doug Tool

One of the primary motivations for Doug is to create a tool that can be easily customized, extended, and maintained without foregoing the benefits of a zero-configuration build tool.

So suppose we want to extend our `hello-doug` project to support another language, let's call it `hola-doug`. We can create a new package that depends on both `doug` and `hello-doug`:

*[hola-doug/package.json](./packages/hola-doug/package.json)*
```js
{
  "name": "hola-doug",
  "private": true,
  "version": "0.3.0",
  "bin": {
    "hello-doug": "./bin.js"
  },
  "devDependencies": {
    "doug": "^0.3.0",
    "hello-doug": "^0.3.0"
  }
}
```

Then we can create a command that adds this new functionality, extending the `hello-doug` version:

*[hola-doug/commands/hello.js](./packages/hola-doug/commands/hello.js)*
```js
const hello = require('hello-doug/commands/hello')

module.exports = {
  options: (vorpal) => {
    return vorpal
      .use(hello.options)
      .option('-s, --spanish', 'greet in spanish')
  },
  action: (config, options) => {
    if (options.spanish) {
      console.log(`hola ${options.name || config.name || 'mundo'}`)
    } else {
      return hello.action(config, options)
    }
  }
}
```

Then the `cli/hello.js` file, `defaults.js` file, and the `bin.js` file are going to look very similar:

*[hola-doug/cli/hello.js](./packages/hola-doug/cli/hello.js)*
```js
const hello = require('../commands/hello')

module.exports = (vorpal, config) => {
  vorpal
    .command('hello')
    .description('a friendly greeting')
    .use(hello.options)
    .action(({options}) => {
      return hello.action(config, options)
    })
}
```

*`hola-doug/defaults.js`*
```js
module.exports = {}
```

*[hola-doug/bin.js](./packages/hola-doug/bin.js)*
```js
const vorpal = require('doug/vorpal')
const config = Object.assign(require('./defaults'), require('doug/config'))

require('./cli/hello')(vorpal, config)

vorpal
  .delimiter('hola-doug ❯❯❯')
  .parse(process.argv)
```

Now we can use `npm start -- --name Jose --spanish`, for example. But we can extend these tools in many other ways. We change the default configs such as setting the name to `Jose`.

*[`hola-doug/defaults.js`](./packages/hola-doug/defaults.js)*
```js
module.exports = {
  name: 'Jose',
}
```

We can also import commands from other Doug tools such as `doug-app`:

*[hola-doug/bin.js](./packages/hola-doug/bin.js)*
```js
const vorpal = require('doug/vorpal')
const config = Object.assign(
  require('doug-app/defaults'),
  require('hello-doug/defaults'),
  require('./defaults'),
  require('doug/config')
)

require('./cli/hello')(vorpal, config)
require('doug-app/cli/dev')(vorpal, config)

vorpal
  .delimiter('hola-doug ❯❯❯')
  .parse(process.argv)
```

Notice how we've merged all the default configs together. So there you have it. Fully extensible, zero-configuration build tools. It's really just a pattern.

### Best Practices

In review of everything covered so far, let's talk about some key patterns that enable our tools to be extensible:

- define command as objects with `action` and `options` fields in separate files
- define the cli commands on vorpal in separate files that accept `vorpal` and the `config`
- define the defaults in a separate file so they can be required by tools that extend your tool
  - every tool should have default values so that `doug.config.js` is never required
- use `doug/vorpal` to import `vorpal` with the `Command.use` extension
- use `doug/config` so that this tool can be globally installed once I figure out how the config resolving should work
- use `doug/resolve` so that projects can define relative paths in their `doug.config.js` file
- all async actions should return promises so they can be extended before or after they run

## Development

If you want to play around with the `doug-app` or `doug-lib` locally:

```sh
make install
make link
```

You need Docker to run tests locally:

```sh
make setup-docker
```

Then you can run tests:

```sh
make test-local
```