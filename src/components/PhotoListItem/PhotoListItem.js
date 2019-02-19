import React from 'react'
import { Link } from 'gatsby'
import Photo from '../Photo/Photo';

import styles from './photo-list-item.module.css'

const PhotoListItem = (photo) => {
  const { title, slug } = photo
  return (
    <li className={styles.photoListItem}>
      <article>
        <Link to={`/${slug}`} className={styles.link}>
          <Photo photo={photo}>
          <h2 className={styles.title}>{title.text}</h2>
          </Photo>
        </Link>
      </article>
    </li>
  )
}

export default PhotoListItem
