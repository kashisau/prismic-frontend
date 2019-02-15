import React from 'react'
import styles from './photo-stage.module.css'
import classNames from 'classnames/bind'
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
  const photoDate = new Date(exif.tags.DateTimeOriginal*1000)
  const exposureTime = exif.tags.ExposureTime
  const exposureString = (exposureTime >= 1)? `${exposureTime}s` : `1/${parseInt(1/exposureTime)}s`

  return (<article>
      <div className={classNames(styles.boundary)}>
        <Img
          fluid={photo.file.localFile.childImageSharp.fluid}
          alt={photoTitle} />
      </div>
      <header>
        <h1 className={styles.h1}>{photoTitle}</h1>
        <ul className={styles.data}>
          <li className={styles.photoDate}><time dateTime={photoDate.toISOString()}>{ago(photoDate)}</time></li>
          <li className={styles.cameraModel}><img className={styles.infoIcon} src={iconCamera} alt="Camera" />{exif.tags.Model}</li>
          <li className={styles.focalLength}><img className={styles.infoIcon} src={iconFocalLength} alt="Focal length" />{exif.tags.FocalLength}mm</li>
          <li className={styles.aperture}><img className={styles.infoIcon} src={iconAperture} alt="Aperture" />f/{exif.tags.FNumber}</li>
          <li className={styles.shutterSeed}><img className={styles.infoIcon} src={iconShutterSpeed} alt="Shutter speed" />{exposureString}</li>
        </ul>
      </header>
      <p dangerouslySetInnerHTML={{__html: photo.description.html}} />
    </article>)
}

export default PhotoStage
