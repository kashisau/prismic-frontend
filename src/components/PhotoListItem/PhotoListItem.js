import React from 'react'
import { Link } from 'gatsby'
import styles from './photo-list-item.module.css'
import Photo from '../Photo/Photo';

const PhotoListItem = (photo) => {
  const { title, slug } = photo
  return (
    <li className={styles.photoListItem}>
      <article>
        <Link to={`/${slug}`} className={styles.link}>
          <Photo photo={photo} />
          <h2 className={styles.title}>{title.text}</h2>
        </Link>
      </article>
    </li>
  )
}

export default PhotoListItem
