const imagemin = require('imagemin')
const imageminWebp = require('imagemin-webp')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminPngquant = require('imagemin-pngquant')
/* const ImageminGm = require('imagemin-gm')
const imageminGm = new ImageminGm('C:/Users/Alvise/Documents/setups/GraphicsMagick-1.3.32') */

let img_path = ''
let quality = 70
let destPath = 'opti'
let resize = false

let sizeArg = process.argv.findIndex(e => e == '--size')
if (sizeArg != -1) {
  let tamaño = process.argv[sizeArg + 1]
  resize = { width: tamaño.split('x')[0], height: tamaño.split('x')[1] }
  console.log('resize:', JSON.stringify(resize))
}

let qualityArg = process.argv.findIndex(e => e == '--q')
if (qualityArg != -1) {
  console.log('calidad:', process.argv[qualityArg + 1])
  quality = process.argv[qualityArg + 1]
}

let pathArg = process.argv.findIndex(e => e == '--path')
if (pathArg != -1) {
  console.log('path:', process.argv[pathArg + 1])
  destPath = process.argv[pathArg + 1]
}

// NUEVO
;(async () => {
  const files = await imagemin(['src/*.{jpg,png}'], {
    destination: `build/${destPath}`,
    plugins: [
      imageminMozjpeg({ quality: quality }),
      imageminPngquant({
        quality: [0.5, 0.8]
      })
    ]
  })

  files.forEach(({ destinationPath }) => {
    console.log(destinationPath)
  })

  /* 
    OUTPUT => 
        [{
        data: <Buffer 89 50 4e …>,
        sourcePath: 'src/SEPTIEMBRE.png',
        destinationPath: 'build\\images\\SEPTIEMBRE.png'
        }, …] 
        
    */
})()
