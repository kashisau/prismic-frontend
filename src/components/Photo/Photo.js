import React from 'react'
import classNames from 'classnames/bind';
import Img from 'gatsby-image'

import styles from './photo.module.css'

const Photo = ({className, photo}) => {
  const classnames = classNames(styles.photo, className)
  return <div className={styles.boundary}>
    <Img className={classnames} fluid={photo.file.localFile.childImageSharp.fluid} />
  </div>
}

export default Photo