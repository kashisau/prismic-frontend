import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import styles from './photo-list-item.module.css'

const PhotoListItem = (photo) => {
  const { title, slug } = photo
  return (
    <li className={styles.photoListItem}>
      <Link to={`/${slug}`} className={styles.link}>
        <div className={styles.photoFrame}>
          <Img className={styles.photo} fluid={photo.file.localFile.childImageSharp.fluid} />
        </div>
        <h2 className={styles.title}>{title.text}</h2>
      </Link>
    </li>
  )
}

export default PhotoListItem
