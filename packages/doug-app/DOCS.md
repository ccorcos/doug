## Commands

- [`help [command...]`][#help] Provides help for a given command.
- [`exit`][#exit] Exits application.
- [`docs [options]`][#docs] generate documentation
- [`init [directory]`][#init] initialize a new doug-app project
- [`dev [options]`][#dev] start a development server
- [`test`][#test] run unit tests with karma, mocha, and jsdom
- [`build [options]`][#build] build distribution assets
- [`release <semver>`][#release] bump, commit, tag, and push a new release
- [`deploy [options]`][#deploy] deploy project using git

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
