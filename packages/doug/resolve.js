'use strict'

const path = require('path')
const findRoot = require('find-root')

let projectRoot = undefined
try {
  projectRoot = findRoot(process.env.PWD)
} catch (e) {
  // not inside a project
}

const resolve = (...args) => {
  if (projectRoot) {
    return path.resolve(projectRoot, ...args)
  } else {
    throw new Error('Could not resolve project root')
  }
}

resolve.root = projectRoot

module.exports = resolve
