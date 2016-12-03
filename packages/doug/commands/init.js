'use strict'

const path = require('path')
const shell = require('shelljs')
const write = require('../utils/write')

module.exports = {
  options: (vorpal) => {
    return vorpal
  },
  action: (directory, packageJsonDefaults, templateDir, dependencies, devDependencies) => {

    // resolve the directory
    const dir = directory
              ? path.resolve(process.env.PWD, directory)
              : process.env.PWD


    // make the directory if it doesn't exist
    shell.mkdir('-p', dir)
    shell.cd(dir)

    // get the package json file
    const packageJsonPath = path.join(dir, 'package.json')
    let packageJsonContents = packageJsonDefaults
    try {
      Object.assign(packageJsonContents, require(packageJsonPath))
    } catch (e) {
      // doesnt exist
    }
    // make sure to keep the scripts
    Object.assign(packageJsonContents.scripts, packageJsonDefaults.scripts)
    write(packageJsonPath, JSON.stringify(packageJsonContents, undefined, 2))

    // install the latest dependencies
    shell.exec(`npm install --save ${(dependencies || []).join(' ')}`)
    shell.exec(`npm install --save-dev ${(devDependencies || []).join(' ')}`)

    // copy over the template files
    shell.cp('-rf', path.join(templateDir, '*'), dir)
    shell.cp(path.join(templateDir, '.gitignore'), dir)
    return
  }
}