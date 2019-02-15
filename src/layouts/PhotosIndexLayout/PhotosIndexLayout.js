import React from 'react'
import PhotoListItem from '../../components/PhotoListItem'
import styles from './photos-index-layout.css'

const PhotosIndexLayout = ({photos, children}) => {
  return (
    <section className="MainBody">
      {children}
      <ol className={styles.photoList}>
        {photos.map((photo, i) => <PhotoListItem key={i} {...photo} />)}
      </ol>
    </section>
  )
}

export default PhotosIndexLayout
