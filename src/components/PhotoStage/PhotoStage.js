import React from 'react'
import styles from './photo-stage.module.css'
import classNames from 'classnames/bind'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'


const PhotoStage = (photoData) => {
  const { photo } = photoData
  const prethumb = photo.prethumb
  const photoTitle = photo.title.text
  const responsiveImages = photo.file
  const exif = photo.exif
  const photoDate = new Date(exif.tags.DateTimeOriginal*1000)
  const exposureTime = exif.tags.ExposureTime
  const exposureString = (exposureTime >= 1)? `${exposureTime}s` : `1/${parseInt(1/exposureTime)}s`
  const lens = exif.tags.LensModel

  const classnames = classNames(styles.fullPhoto, styles[`ratio${photo.aspectRatio.split(':').join('x')}`])
  return (<article>
      <div className={classNames(styles.boundary)}>
        <LazyLoadImage
        className={classnames}
        placeholderSrc={prethumb}
        effect="blur"
        alt={photoTitle}
        src={responsiveImages.Desktop.url} />
      </div>
      <header>
        <h1>{photoTitle}</h1>
        <ul className={styles.data}>
          <li className={styles.photoDate}><time dateTime={photoDate.toISOString()}>{`${photoDate.toLocaleDateString()} at ${photoDate.toLocaleTimeString()}`}</time></li>
          <li className={styles.cameraModel}><span hidden>Camera: </span>{exif.tags.Model}</li>
          <li className={styles.focalLength}><span hidden>Focal length: </span>{exif.tags.FocalLength}mm</li>
          <li className={styles.apeture}><span hidden>Apeture: </span>f/{exif.tags.FNumber}mm</li>
          <li className={styles.shutterSeed}><span hidden>Shutter speed: </span>{exposureString}</li>
          <li className={styles.lens}><span hidden>Lens: </span>{lens}</li>
        </ul>
      </header>
      <p dangerouslySetInnerHTML={{__html: photo.description.html}} />
    </article>)
}

export default PhotoStage
