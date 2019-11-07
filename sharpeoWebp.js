const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

let path = 'sharpeo'
imagemin([`${path}/*.{jpg,png}`], `${path}/`, {
    use: [
        imageminWebp({quality: 80, method: 6,})
    ]
}).then(() => {
    console.log('Images optimized');
});