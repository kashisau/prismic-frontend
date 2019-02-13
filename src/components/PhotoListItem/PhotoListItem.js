import React from 'react'
import { Link } from 'gatsby'
import PhotoThumb from '../PhotoThumb'
import styles from './photo-list-item.module.css'

const PhotoListItem = (photo) => {
  const { title, slug } = photo
  return (
    <li className={styles.photoListItem}>
      <article>
        <Link to={`/${slug}`} className={styles.link}>
          <PhotoThumb className={styles.thumb} {...photo} />
          <h2 className={styles.title}>{title.text}</h2>
        </Link>
      </article>
    </li>
  )
}

export default PhotoListItem
