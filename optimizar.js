#!/usr/bin/env node

const path = require('path')
const yargs = require('yargs')
const cl = require('ansi-colors')
const imagemin = require('imagemin')
const imageminWebp = require('imagemin-webp')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminPngquant = require('imagemin-pngquant')
const sharp = require('sharp')
const fs = require('fs')

const o = yargs.argv

let comando = o._[0]
let quality = o.q || 70
let destPath = o.path || 'optimizadas/'
let resize = o.w && o.h ? { width: o.w, height: o.h } : false

let p = path.dirname(process.cwd())
let input = o.input || '.'

//console.log(cl.bgWhite.black('optimización en proceso'))

switch (comando) {
  case 'webp':
    console.log(cl.cyan('Optimización tipo:'), cl.bgCyan('WEBP'))
    ;(async () => {
      const files = await imagemin([`${input}/*.{jpg,png,JPG,PNG}`], {
        destination: `${process.cwd()}`,
        plugins: [imageminWebp({ quality: quality, method: 6, resize: resize })]
      })

      files.forEach(({ destinationPath }) => {
        console.log(
          cl.bold.green('Imagen optimizada:'),
          cl.green(destinationPath)
        )
      })
    })()
    break

  case 'normal':
    console.log(cl.green('Optimización tipo:'), cl.bgGreen('regular'))
    ;(async () => {
      const files = await imagemin([`${input}/*.{jpg,png}`], {
        destination: `${process.cwd()}\\${destPath}`,
        plugins: [
          imageminMozjpeg({ quality: quality }),
          imageminPngquant({
            quality: [0.5, 0.6]
          })
        ]
      })

      files.forEach(({ destinationPath }) => {
        console.log(
          cl.bold.green('Imagen optimizada:'),
          cl.green(destinationPath)
        )
      })
    })()
    break

  case 'sharp':
    console.log(cl.green('Sharpeo:'))

    fs.readdir(input, (err, files) => {
      files.forEach((file, i) => {
        sharp(`${input}/${file}`)
          .resize(resize.width, resize.height)
          .toFile(`./sharpeo/${file.split('.')[0]}.${file.split('.')[1]}`)
          .then(data => {
            console.log(data)
          })
          .catch(err => {
            console.error(err)
          })
      })
    })
    break

  case 'thumbnail':
    console.log(cl.green('Sharpeo:'))

    fs.readdir(input, (err, files) => {
      files.forEach((file, i) => {
        sharp(`${input}/${file}`)
          .resize(420, 400)
          .toFile(`./${file.split('.')[0]}_thumb.${file.split('.')[1]}`)
          .then(data => {
            console.log(data)
          })
          .catch(err => {
            console.error(err)
          })
      })
    })
    break
  case 'list':
    console.log(cl.green('Listado:'))
    fs.readdir(input, (err, files) => {
      let filesObj = files.reduce( (list,i)=>{
        const extention = i.split('.')[1]
        if(!list[extention]) {
          list[extention] = [i]
          return list
        }else{
          list[extention].push(i)
          return list
        }
      }, {jpg:[],webp:[]})

      let listado = JSON.stringify(filesObj, null,2)

      fs.writeFile('listado.json', listado, (err)=>{
        if (err) throw err
        console.log("JSON data is saved.")
      })
    })

    
    break

  default:
    console.log(cl.cyan('Elije una opción'))
    break
}

/* if (comando === 'webp')
  console.log(cl.cyan('Optimización tipo:'), cl.bgCyan('WEBP'))

if (comando === 'normal')
  console.log(cl.green('Optimización tipo:'), cl.bgGreen('regular'))

if (comando === 'sharp') console.log(cl.green('Sharpeo:'))

if (comando === 'sharp' && resize) {
  fs.readdir(input, (err, files) => {
    files.forEach((file, i) => {
      sharp(`${input}/${file}`)
        .resize(resize.width, resize.height)
        .toFile(`./sharpeo/${file.split('.')[0]}.${file.split('.')[1]}`)
        .then(data => {
          console.log(data)
        })
        .catch(err => {
          console.error(err)
        })
    })
  })
}

if (comando === 'webp') {
  ;(async () => {
    const files = await imagemin([`${input}/*.{jpg,png,JPG,PNG}`], {
      destination: `${process.cwd()}`,
      plugins: [imageminWebp({ quality: quality, method: 6, resize: resize })]
    })

    files.forEach(({ destinationPath }) => {
      console.log(
        cl.bold.green('Imagen optimizada:'),
        cl.green(destinationPath)
      )
    })
  })()
}

if (comando === 'normal') {
  ;(async () => {
    const files = await imagemin([`${input}/*.{jpg,png}`], {
      destination: `${process.cwd()}\\${destPath}`,
      plugins: [
        imageminMozjpeg({ quality: quality }),
        imageminPngquant({
          quality: [0.5, 0.8]
        })
      ]
    })

    files.forEach(({ destinationPath }) => {
      console.log(
        cl.bold.green('Imagen optimizada:'),
        cl.green(destinationPath)
      )
    })
  })()
}
 */
