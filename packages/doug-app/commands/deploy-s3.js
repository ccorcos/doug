'use strict'

// code is adapted from here:
// https://github.com/jpillora/grunt-aws/blob/4f37bf369383722c15f54315b306e6e1ad73530b/tasks/services/s3.js

const AWS = require('aws-sdk')
const glob = require('glob')
const path = require('path')
const fs = require('fs')
const mime = require("mime")
const zlib = require("zlib")

const defaults = {
// path to root of your project
// AWS buckt info
// accessKeyId: REQUIRED,
// secretAccessKey: REQUIRED,
// Bucket: REQUIRED,
ACL: 'public-read',
signatureVersion: 'v4',
// Additional params:
// http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
// CacheControl:
// Expires:
// gzip files if you want
gzip: false,
sslEnabled: true,
maxRetries: 3,
// Define custom mime-type mappings
// https://github.com/broofa/node-mime#mimedefine
// mime: {
//   'text/html': ['html'] // optional
// }
// Define files as an array of { cwd, glob, dest }:
// files: [
//   {
//     pattern: '*.{png,jpg,jpeg,svg,woff,woff2,js,css,ico,xml}',
//     dest: dest,
//     cwd: 'dist',
//   }
// ]
}

// Example:
// deployS3({
//   accessKeyId: auth.key,
//   secretAccessKey: auth.secret,
//   Bucket: auth.bucket,
//   gzip: true,
//   CacheControl: `max-age=${60*60*24*365}, public`,
//   files: [{
//     pattern: '**/*.{png,jpg,jpeg,svg,woff,woff2,js,css,ico,xml}',
//     dest: dest,
//     cwd: path.resolve(config.root, 'dist'),
//   }],
// })

module.exports = (opts) => {

  // merge default options
  const options = Object.assign({}, defaults, opts)

  // get all files we need to deploy
  // {pattern, dest, cwd} => {src, dest}
  const files = []
  options.files.forEach(({pattern, cwd, dest}) => {
    process.chdir(cwd)
    glob.sync(pattern).forEach((src) => {
      const filePath = path.resolve(cwd, src)
      // ignore directories
      if (!fs.lstatSync(filePath).isDirectory()) {
        files.push({
          src: filePath,
          dest: path.join(dest, src),
        })
      }
    })
  })

  // let the user define custom mime-type mappings
  if (options.mime) {
    mime.define(options.mime)
  }

  // setup AWS config
  AWS.config.update(pick([
    'accessKeyId',
    'secretAccessKey',
    'sessionToken',
    'sslEnabled',
    'maxRetries',
  ], options))

  // setup S3
  var S3 = new AWS.S3({
    signatureVersion: options.signatureVersion,
  })

  function putS3(obj) {
    return new Promise((resolve, reject) => {
      S3.putObject(obj, (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  }

  // base object (lacks Body and Key)
  var s3BaseObject = pick([
    'ACL',
    'Bucket',
    'ContentLength',
    'ContentType',
    'ContentDisposition',
    'ContentEncoding',
    'CacheControl',
    'Expires',
    'GrantFullControl',
    'GrantRead',
    'GrantReadACP',
    'GrantWriteACP',
    'ServerSideEncryption',
    'StorageClass',
  ], options)

  // set gzip encoding
  if (options.gzip) {
    s3BaseObject.ContentEncoding = 'gzip';
  }

  return Promise.all(files.map(({src, dest}) =>
    readFile(src)
    .then((contents) => {
      if (options.gzip) {
        return gzipFile(contents)
      } else {
        return contents
      }
    })
    .then((contents) => {
      // extend the base object
      const s3FileObject = Object.assign({
        Key: dest,
        Body: contents,
      }, s3BaseObject)

      // lookup content type
      if (!s3FileObject.ContentType) {
        s3FileObject.ContentType = mime.lookup(dest)
      }

      // Set the charset, default text type mime types to UTF-8
      const charset = mime.charsets.lookup(s3FileObject.ContentType, '')
      if (charset) {
        s3FileObject.ContentType += '; charset=' + charset
      }
      return putS3(s3FileObject)
    })
    .then(() => {
      console.log(`✓ ${src} ➡ ${dest}`)
    })
    .catch((err) => {
      console.log(`✘ ${src} ➡ ${dest}`)
      throw err
    })
  ))
}

// pick keys ignoring null or undefined values
function pick(keys, obj) {
  const result = {}
  keys.forEach((key) => {
    const value = obj[key]
    if (value !== null && value !== undefined) {
      result[key] = value
    }
  })
  return result
}

function readFile(src) {
  return new Promise((resolve, reject) => {
    fs.readFile(src, (err, contents) => {
      if (err) {
        reject(err)
      } else {
        resolve(contents)
      }
    })
  })
}

function gzipFile(contents) {
  return new Promise((resolve, reject) => {
    zlib.gzip(contents, function(err, compressed) {
      if (err) {
        reject(err)
      } else {
        resolve(compressed)
      }
    })
  })
}