import React from 'react'
import PhotoListItem from '../../components/PhotoListItem'
import Header from '../../components/Header'

import styles from './photos-index-layout.module.css'

const PhotosIndexLayout = ({photos, children}) => {
  return (
    <section className="PhotosBody">
      <Header siteTitle="Photos" className={styles.Header} />
      <p className={styles.intro}>A selection of photos taken by Kashi Samaraweera</p>
      {children}
      <ol className={styles.photoList}>
        {photos.map((photo, i) => <PhotoListItem key={i} {...photo} />)}
      </ol>
    </section>
  )
}

export default PhotosIndexLayout
