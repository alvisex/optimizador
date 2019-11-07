#!/usr/bin/env node

const imagemin = require('imagemin')
const imageminWebp = require('imagemin-webp')
const yargs = require('yargs')
const cl = require('ansi-colors')
const path = require('path')

const o = yargs.argv

let quality = o.q || 70
let destPath = o.path || 'optimizadas/'
let resize = o.w && o.h ? { width: args.w, height: args.h } : false

let p = path.dirname(process.cwd())
let input = `./*.{jpg,png}`

console.log(cl.bgWhite.black('optimización en proceso'))

;(async () => {
  const files = await imagemin([input], {
    destination: `${process.cwd()}\\${destPath}`,
    plugins: [imageminWebp({ quality: quality, method: 6, resize: resize })]
  })

  files.forEach(({ destinationPath }) => {
    console.log(cl.bold.green('Imagen optimizada:'), cl.green(destinationPath))
  })
})()
