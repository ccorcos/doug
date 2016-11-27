# Doug 🔨🔨🔨

Doug is a modular build system that lets you to build your own zero-configuration commandline tools. What that means is you should only ever have one devDependency every again and that's the Doug tool you're using to build your project.

At it's core, Doug is just a pattern for building commandline tools using [Commander.js](https://github.com/tj/commander.js) that is easy to customize and extend.

## How it works

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

Now inside your project, you should be able to run `npm run something` and see it log "do something now". You can pass options as well: `npm run something -- --force` should log "force something now". And any project can specify the `when` property in the `doug.config.js` file.

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
