# Building a custom zero-configuration build tool

Getting set up with modern JavaScript stack is a pain. There are so many tools that do specific things with their own way of configuring them. You'll often find that just to create a "hello world" React app, you're going to have dozens of dev dependencies and hundreds of lines of code just setting up your build system.

While there are a bunch of boilerplates out there to get you started, it's hard to maintain your project against an upstream fork of the boilerplate when new versions of these build tools become available.

Then there are tools like create-react-app. All you have to do was install a single dependency and everything is a piece of cake. But if you want to extend create-react-app with some custom configurations and hooks to fit your workflow, you're only real option is to eject and we're left with the same problem as before.

So this is why I created Doug. Doug is merely a pattern for building commandline tools with Commander.js in a way that's customizable and extendable. It's basically like create-react-app except if you want to have your custom eslint rules baked in or hooks to notify Slack when there's a deploy, you can simply create a new NPM package that extends the previous tool.

## Building an app with doug-app

I've created a pretty straightforward tool called doug-app for building frontend React applications. It gives you all the typical stuff like Webpack, Babel, PostCSS, Mocha, Karma, and JSDOM.

First you need to install doug-app in your project:

```sh
npm install --save-dev doug-app
```

Then you need to create a doug.config.js file. Let's set up the entry points to the application:

```js
// project/doug.config.js
module.exports = {
  html: `${__dirname}/index.html`,
  entry: {
    index: `${__dirname}/index.js`
  },
}
```

Then in your project you can set up some NPM scripts to run the development server:

```js
// project/package.json
{
  "scripts": {
    "start": "doug-app dev"
  }
}
```

Now when you run `npm start`, you should be able to open up your application on localhost:3000. Check out the example-app and the documentation to learn more about setting up testing and other features, but for now, let's move on and discuss how we can create a custom tool that extends doug-app.

## Building a custom doug tool

Suppose we're using Relay and want to add a babel plugin to transform our code. We could do this by leaving a `.babelrc` in our project but that's going to start to dirty up our project. Especially in a company with lots of projects, this can make your codebase much harder to maintain. So let's create a custom Doug tool that does this for us.

First let's create a new NPM package:

```sh
mkdir doug-relay-app
cd doug-relay-app
npm init -y
npm install --save-dev doug-app webpack-merge babel-relay-plugin
```

Now let's simply extend the doug-app webpack configuration with our babel plugin:

```js
// doug-relay-app/webpack/dev.js

const merge = require('webpack-merge')

module.exports = (config, options) => {
  return merge(
    require('doug-app/webpack/dev'),
    {
      babel: {
        plugins: config.schema ? [
          require('babel-relay-plugin')(
            require(config.schema)
          ),
        ] : [],
      },
    }
  )
}
```

We'll need to do this for test and build webpack configurations if we want to use those commands. But for the sake of brevity, I'll skip that for now.

Next, we want to wire up the commands:

```js
// doug-relay-app/cli.js
#!/usr/bin/env node
'use strict'

const program = require('doug/commander')
const config = require('doug/config')
const dev = require('doug-app/commands/dev')

program
  .command('dev')
  .description('start a development server')
  .pipe(dev.options)
  .action((options) => {
    const webpackConfig = require('./webpack/dev')(config, options)
    return dev.action(config, options, webpackConfig)
  })
```

It's easy to see how we could add before or after hooks anywhere in this command. Lastly, we'll need to specify the bin script so NPM can link it:

```js
{
  "name": "doug-relay-app",
  // ...
  "bin": {
    "doug-relay-app": "./cli.js"
  }
}
```

And that's about it. You can publish this package, or link it locally in your filesystem, and use it just as we demonstrated earlier with the basic doug-app.

## Conclusion

The real benefit we've demonstrated here is that if we build our CLI tools in an extensible fashion, we can get rid of all the boilerplate and messy build system code from out projects, and when we want to customize things to the needs of our project or organization, we can do so without giving up the maintainability of the project.

The one issue I've run into while developing this project is using tools that make strong assumptions about the file structure of your project. Since we want to keep all the dev dependencies inside the doug tool and generate webpack configurations on the fly based on cli options, it's hard to use tools like Ava or Jest that look inside the project's package.json file for additional configurations without allowing you to point the tool to a different configuration file inside the Doug tool. However, these are surmountable issues and many tools have been inching towards being used primarily through a Node.js API rather than a CLI API.
