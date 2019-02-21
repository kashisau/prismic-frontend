import React from 'react'

import styles from './photo-layout.module.css'

class PhotoLayout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <section className={styles.pageMain}>
      {children}
      </section>
    );
  }
}

export default PhotoLayout
