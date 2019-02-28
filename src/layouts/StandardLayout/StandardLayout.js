import React, { Component, useState } from 'react'
import SiteHeader from '../../components/SiteHeader'

import styles from './standard-layout.module.css'

class StandardLayout extends Component {

  siteHeader = React.createRef()

  render() {
    const {
      children,
      title,
      subtitle
    } = this.props

    return (
      <div className={styles.page}>
        <SiteHeader
          innerRef={this.siteHeader}
          title={title}
          subtitle={subtitle} />
        <main className={styles.body}>
          {children}
        </main>
      </div>
    )
  }
}
export default StandardLayout
