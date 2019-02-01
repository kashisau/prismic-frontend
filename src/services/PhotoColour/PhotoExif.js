/**
 * Photo Colour service
 *
 * Takes a JPEG image and crops it in half vertically before using
 * the ColorTheif library to determine the dominant colour.
 */
import sharp from 'sharp'
import fetch from 'node-fetch'

async function getDominantColour(jpegUrl) {
  return fetchImageFromUrl(jpegUrl)
    .then(cropImage);
}

async function fetchImageFromUrl(jpegUrl) {
  const requestSettings = {
    redirect: "follow",
    cache: "no-cache",
    headers: {
      "Content-Type": "image/jpeg"
    }
  }
  return fetch(jpegUrl, requestSettings)
    .then(res => res.buffer() || res.arrayBuffer());
}

async function cropImage(imageArrayBuffer) {
  return new Promise((resolve, reject) => {
    try {
      const sharpImage = sharp(imageArrayBuffer);
      console.log(sharpImage);
    } catch (error) {
      reject(error);
    }
  })
}

const PhotoColour = {
  getDominantColour
}

export default PhotoColour