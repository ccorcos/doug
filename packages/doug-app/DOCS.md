<!-- THIS FILE IS GENERATED -->

## Commands

- <a href="#help">`help [command...]`</a> Provides help for a given command.
- <a href="#exit">`exit`</a> Exits application.
- <a href="#docs">`docs [options]`</a> generate documentation
- <a href="#init">`init [directory]`</a> initialize a new doug-app project
- <a href="#dev">`dev [options]`</a> start a development server
- <a href="#test">`test`</a> run unit tests with karma, mocha, and jsdom
- <a href="#build">`build [options]`</a> build distribution assets
- <a href="#release">`release <semver>`</a> bump, commit, tag, and push a new release
- <a href="#deploy">`deploy [options]`</a> deploy project using git

### <a href="#help">`help [command...]`</a>

- `--help` output usage information

### <a href="#exit">`exit`</a>

- `--help` output usage information

### <a href="#docs">`docs [options]`</a>

- `--help` output usage information
- `-i, --input <input>` the cli entry point file
- `-d, --defaults <defaults>` the config defaults file
- `-o, --output <output>` the documentation output file

### <a href="#init">`init [directory]`</a>

- `--help` output usage information

### <a href="#dev">`dev [options]`</a>

- `--help` output usage information
- `--build-css` build css files

### <a href="#test">`test`</a>

- `--help` output usage information

### <a href="#build">`build [options]`</a>

- `--help` output usage information
- `--build-css` build css files
- `--root-url <url>` the base url for the CDN where the assets live
- `--human` do not minify the source files
- `--profile` output the webpack stats.json file for analysis

### <a href="#release">`release <semver>`</a>

- `--help` output usage information

### <a href="#deploy">`deploy [options]`</a>

- `--help` output usage information
- `--repo <url>` deploy to a repo other than the current repo
- `--remote <remote>` deploy a git remote other than origin
- `--branch <branch>` deploy to a branch other than gh-pages

## Defaults

```js
module.exports = {
  html: './src/index.html',
  entry: {
    index: './src/index.js',
  },
  test: './test.js',
}
```
