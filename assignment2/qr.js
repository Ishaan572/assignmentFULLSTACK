const  Jimp  = require("jimp");
const jsQR = require("jsqr");





async function decodeQR(path) {

const image = await Jimp.read(path);

let height = image.bitmap.height;
let width = image.bitmap.width;
let data = image.bitmap.data;

const result = await jsQR(data, width, height);


if (result === null) {
  throw new Error('No QR code found');
}
return result.data;
}

module.exports = { decodeQR };


if (require.main === module) {
    const testImagePath = './test-id.png'; 

    console.log(`Running standalone test on: ${testImagePath}...`);

    decodeQR(testImagePath)
        .then((data) => {
            console.log('--- DECODE SUCCESS ---');
            console.log('Extracted Roll Number String:');
            console.log(data);
        })
        .catch((error) => {
            console.error('--- DECODE FAILED ---');
            console.error(error.message);
        });
}