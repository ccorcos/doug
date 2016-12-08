'use strict'

const path = require('path')
const write = require('../utils/write')
const resolve = require('../resolve')

const trim = str => str.trim()
const empty = str => str !== ''
const h1 = str => `# ${str}`
const h2 = str => `## ${str}`
const h3 = str => `### ${str}`
const li = str => `- ${str}`
const anchor = (link, str) => `[${str}][#${link}]`
const code = str => `\`${str}\``
const href = (link, str) => `<a href="#${link}">${str}</a>`

module.exports = {
  options: (vorpal) => {
    return vorpal
      .option('-i, --input <input>', 'the cli entry point file')
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
      h1(title.replace(':', '')),
      cmds.map(({name, usage, description}) => {
        return [
          li(anchor(name, code(usage))),
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
        h3(href(name, code(usage))),
        options.map(({name, usage, description}) => {
          return [
            li(code(usage)),
            description
          ].join(' ')
        }).join('\n')
      ].join('\n\n')
    }).join('\n\n')

    write(
      resolve(options.output || config.output),
      [
        TOC,
        h2('CLI API'),
        CONTENT,
      ].join('\n\n')
    )
  }
}

