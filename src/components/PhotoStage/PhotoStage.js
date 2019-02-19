import React from 'react'
import styles from './photo-stage.module.css'
import Img from 'gatsby-image'
import { ago } from 'time-ago'
import iconCamera from '../../images/icon-camera.svg'
import iconAperture from '../../images/icon-apeture.svg'
import iconFocalLength from '../../images/icon-lens.svg'
import iconShutterSpeed from '../../images/icon-shutter.svg'

const PhotoStage = (photoData) => {
  const { photo } = photoData
  const photoTitle = photo.title.text
  const exif = photo.exif
  const photoDate = new Date(exif.exif.DateTimeOriginal)
  const exposureTime = exif.exif.ExposureTime
  const exposureString = (exposureTime >= 1)? `${exposureTime}s` : `1/${parseInt(1/exposureTime)}s`

  return (<article>
      <header>
        <Img
          className={styles.imageWrapper}
          fluid={photo.file.localFile.childImageSharp.fluid}
          alt={photoTitle} />
        <h1 className={styles.h1}>{photoTitle}</h1>
        <ul className={styles.data}>
          <li className={styles.photoDate}><time dateTime={photoDate.toISOString()}>{ago(photoDate)}</time></li>
          <li className={styles.cameraModel}><img className={styles.infoIcon} src={iconCamera} alt="Camera" />{exif.image.Model}</li>
          <li className={styles.focalLength}><img className={styles.infoIcon} src={iconFocalLength} alt="Focal length" />{exif.exif.FocalLength}mm</li>
          <li className={styles.aperture}><img className={styles.infoIcon} src={iconAperture} alt="Aperture" />f/{exif.exif.FNumber}</li>
          <li className={styles.shutterSeed}><img className={styles.infoIcon} src={iconShutterSpeed} alt="Shutter speed" />{exposureString}</li>
        </ul>
      </header>
      <div className={styles.description} dangerouslySetInnerHTML={{__html: photo.description.html}} />
    </article>)
}

export default PhotoStage
