import React from 'react'
import classNames from 'classnames/bind';
import Img from 'gatsby-image'

import styles from './photo.module.css'

const Photo = ({className, photo, children}) => {
  const classnames = classNames(styles.photo, className)
  return <>
    {children}
    <Img className={classnames} fluid={photo.file.localFile.childImageSharp.fluid} />
  </>
}

export default Photo