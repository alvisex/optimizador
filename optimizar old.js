const imagemin = require('imagemin')
const imageminWebp = require('imagemin-webp')
const yargs = require('yargs')

let img_path = ''
let quality = 70
let destPath = 'webp'
let resize = false

console.log(yargs.argv)

/* 
let sizeArg = process.argv.findIndex(e => e == '--size')
if (sizeArg != -1) {
  let tamaño = process.argv[sizeArg + 1]
  resize = { width: tamaño.split('x')[0], height: tamaño.split('x')[1] }
  console.log('resize:', JSON.stringify(resize))
}

let qualityArg = process.argv.findIndex(e => e == '-q')
if (qualityArg != -1) {
  console.log('calidad:', process.argv[qualityArg + 1])
  quality = process.argv[qualityArg + 1]
}

let pathArg = process.argv.findIndex(e => e == '--path')
if (pathArg != -1) {
  console.log('path:', process.argv[pathArg + 1])
  destPath = process.argv[pathArg + 1]
}

;(async () => {
  const files = await imagemin(['src/*.{jpg,png}'], {
    destination: `build/${destPath}`,
    plugins: [imageminWebp({ quality: quality, method: 6, resize: resize })]
  })

  files.forEach(({ destinationPath }) => {
    console.log(`Imagen optimizada: ${destinationPath}`)
  })
})()
 */
