import React from 'react'
import styles from './photo.module.css'
import classNames from 'classnames/bind';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'

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
    const { prethumb, title, thumb } = photo
    const classnames = classNames(styles.photo, className)

    return <div className={styles.boundary}>
      <LazyLoadImage
      className={classnames}
      placeholderSrc={prethumb}
      effect="blur"
      alt={title.text}
      src={thumb} />
    </div>
  }
}

Photo.defaultProps = {
  loadOnIntersection: true,
  targetSize: 'Desktop',
  showPrethumb: true
}

export default Photo