<!-- THIS FILE IS GENERATED -->

## Commands

- <a href="#help-command">`help [command...]`</a> Provides help for a given command.
- <a href="#exit">`exit`</a> Exits application.
- <a href="#docs-options">`docs [options]`</a> generate documentation
- <a href="#init-directory">`init [directory]`</a> initialize a new doug-app project
- <a href="#dev-options">`dev [options]`</a> start a development server
- <a href="#test">`test`</a> run unit tests with karma, mocha, and jsdom
- <a href="#build-options">`build [options]`</a> build distribution assets
- <a href="#release-semver">`release <semver>`</a> bump, commit, tag, and push a new release
- <a href="#deploy-options">`deploy [options]`</a> deploy project using git

### `help [command...]`

- `--help` output usage information

### `exit`

- `--help` output usage information

### `docs [options]`

- `--help` output usage information
- `-i, --input <input>` the cli entry point file
- `-d, --defaults <defaults>` the config defaults file
- `-o, --output <output>` the documentation output file

### `init [directory]`

- `--help` output usage information

### `dev [options]`

- `--help` output usage information
- `--build-css` build css files

### `test`

- `--help` output usage information

### `build [options]`

- `--help` output usage information
- `--build-css` build css files
- `--root-url <url>` the base url for the CDN where the assets live
- `--human` do not minify the source files
- `--profile` output the webpack stats.json file for analysis

### `release <semver>`

- `--help` output usage information

### `deploy [options]`

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
