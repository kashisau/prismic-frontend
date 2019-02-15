import React from 'react'
import styles from './photo.module.css'
import classNames from 'classnames/bind';
import Img from 'gatsby-image'

class Photo extends React.Component {
  state = {
    loaded: false
  }

  async componentDidMount() {
    const { photo } = this.props
    const exif =  await photo.exif

    this.setState({ photo, exif })
  }

  render() {
    const { className } = this.props
    const { photo } = this.state.photo ? this.state : this.props
    const classnames = classNames(styles.photo, className)

    return <div className={styles.boundary}>
      <Img className={classnames} fluid={photo.gatsbyImage.localFile.childImageSharp.fluid} />
    </div>
  }
}

Photo.defaultProps = {
  loadOnIntersection: true,
  targetSize: 'Desktop',
  showPrethumb: true
}

export default Photo