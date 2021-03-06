'use strict'

const path = require('path')
const write = require('../utils/write')
const resolve = require('../resolve')
const shell = require('shelljs')

const trim = str => str.trim()
const empty = str => str !== ''
const h1 = str => `# ${str}`
const h2 = str => `## ${str}`
const h3 = str => `### ${str}`
const li = str => `- ${str}`
const code = str => `\`${str}\``
const href = (link, str) => `<a href="#${link}">${str}</a>`
const clean = str => str.replace(' ', '-').replace(/[\[\]\/\\\.\<\>]/g, '')

module.exports = {
  options: (vorpal) => {
    return vorpal
      .option('-i, --input <input>', 'the cli entry point file')
      .option('-d, --defaults <defaults>', 'the config defaults file')
      .option('-o, --output <output>', 'the documentation output file')
  },
  action: (config, options) => {
    require(resolve(options.input || config.input))
    const v = require('../vorpal')

    const [title, ...rest] = v._commandHelp()
      .split('\n')
      .map(trim)
      .filter(empty)

    const cmds = rest
      .map(str => str.split(/\s{2,}/))
      .map(([left, right]) => {
        const [name, ...args] = left.split(' ')
        return {
          name,
          args: args.join(' '),
          usage: left,
          description: right,
        }
      })

    const TOC = [
      h2(title.replace(':', '')),
      cmds.map(({name, usage, description}) => {
        return [
          li(href(clean(usage), code(usage))),
          description
        ].join(' ')
      }).join('\n')
    ].join('\n\n')

    const CONTENT = cmds.map(({name, usage, description}) => {
      const [___, optstr] = v.find(name)
        .helpInformation()
        .split('\n')
        .map(trim)
        .filter(empty)
        .join('\n')
        .split('Options:')

      const options = optstr.split('\n')
        .filter(empty)
        .map(str => str.split(/\s{2,}/))
        .map(([left, right]) => {
          const [name, ...args] = left.split(' ')
          return {
            name,
            args: args.join(' '),
            usage: left,
            description: right,
          }
        })

      return [
        h3(code(usage)),
        options.map(({name, usage, description}) => {
          return [
            li(code(usage)),
            description
          ].join(' ')
        }).join('\n')
      ].join('\n\n')
    }).join('\n\n')

    const CONFIG = [
      h2('Defaults'),
      [
        '```js',
        shell.cat(resolve(options.defaults || config.defaults)).stdout
          .replace("'use strict'", '')
          .trim(),
        '```',
      ].join('\n')
    ].join('\n\n')

    write(
      resolve(options.output || config.output),
      [
        '<!-- THIS FILE IS GENERATED -->',
        TOC,
        CONTENT,
        CONFIG,
      ].join('\n\n') + '\n'
    )
  }
}

