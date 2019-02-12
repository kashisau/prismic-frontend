/**
 * Photo EXIF service
 *
 * Takes a JPEG image with EXIF data and returns all the relevant
 * information.
 */
import ExifParser from 'exif-parser'
import fetch from 'node-fetch'

async function getExifFromUrl(jpegUrl) {
  return fetchImageHeaderFromUrl(jpegUrl)
    .then(getRawExif);
}

async function fetchImageHeaderFromUrl(jpegUrl) {
  const requestSettings = {
    redirect: "follow",
    cache: "no-cache",
    headers: {
      "Content-Type": "image/jpeg",
      "Range": "bytes=0-65536"
    }
  }
  return fetch(jpegUrl, requestSettings)
    .then(res => {
      const buffer = ('buffer' in res)? res.buffer() : res.arrayBuffer();
      return buffer;
    });
}

async function getRawExif(imagePartialArrayBuffer) {
  return new Promise((resolve, reject) => {
    try {
      const imagePartial = ExifParser.create(imagePartialArrayBuffer);
      const imageExif = imagePartial.parse();
      resolve(imageExif);
    } catch (error) {
      reject(error);
    }
  })
}

const PhotoExif = {
  getExifFromUrl
}

export default PhotoExif