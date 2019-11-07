const sharp = require('sharp');
const fs = require('fs');



/*  +++++++  UNA SOLA IMAGEN  +++++++++  */

sharp(`originales/portada_temp.jpg`)
   .resize(1920, 1080)
   .toFile(`sharpeo/portada_temp.jpg`)
   .then( data => { console.log(data) })
   .catch( err => { console.error(err)});  
  



/*  +++++++  Multiples  Imagenes +++++++++  */
/* let path = 'originales/calendarios/'
fs.readdir(path, (err, files) => {
   files.forEach( (file,i) => {
      sharp(`${path}/${file}`)
         .resize(1920,1080)
         .toFile(`sharpeo/${file.split(' ')[1]}.png`)
         .then( data => { console.log(data) })
         .catch( err => { console.error(err)}); 
   });
}); */
