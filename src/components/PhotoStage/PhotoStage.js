import React from 'react'
import Img from 'gatsby-image'
import dms2dec from 'dms2dec'
import Map from '../Map'

import iconCamera from '../../images/icon-camera.svg'
import iconAperture from '../../images/icon-apeture.svg'
import iconFocalLength from '../../images/icon-lens.svg'
import iconShutterSpeed from '../../images/icon-shutter.svg'

import styles from './photo-stage.module.css'

const PhotoStage = (photoData) => {
  const { photo } = photoData
  const photoTitle = photo.title.text
  const exif = photo.exif
  const photoDate = new Date(exif.exif.DateTimeOriginal)
  const exposureTime = exif.exif.ExposureTime
  const exposureString = (exposureTime >= 1)? `${exposureTime}s` : `1/${parseInt(1/exposureTime)}s`
  const { gps : { GPSLatitude, GPSLatitudeRef, GPSLongitude, GPSLongitudeRef } } = exif;
  const [lat, lng] = dms2dec(GPSLatitude, GPSLatitudeRef, GPSLongitude, GPSLongitudeRef);

  return (<article>
      <header>
        <Img
          className={styles.imageWrapper}
          fluid={photo.file.localFile.childImageSharp.fluid}
          alt={photoTitle} />
        <ul className={styles.data}>
          <li className={styles.aperture}><img className={styles.infoIcon} src={iconAperture} alt="Aperture" />f/{exif.exif.FNumber}</li>
          <li className={styles.shutterSeed}><img className={styles.infoIcon} src={iconShutterSpeed} alt="Shutter speed" />{exposureString}</li>
          <li className={styles.focalLength}><img className={styles.infoIcon} src={iconFocalLength} alt="Focal length" />{exif.exif.FocalLength}mm</li>
          <li className={styles.filmSpeed}><img className={styles.infoIcon} src={iconCamera} alt="Film speed" />ISO {exif.exif.ISO}</li>
        </ul>
      </header>
      <div className={styles.description} dangerouslySetInnerHTML={{__html: photo.description.html}} />
      <Map lat={lat} lng={lng} />
    </article>)
}

export default PhotoStage
