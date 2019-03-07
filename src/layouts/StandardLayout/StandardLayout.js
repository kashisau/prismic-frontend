import React, { Component, useState } from 'react'
import SiteHeader from '../../components/SiteHeader'

import styles from './standard-layout.module.css'

class StandardLayout extends Component {

  siteHeader = React.createRef()

  render() {
    const {
      children,
      title,
      canDock,
      subtitle
    } = this.props

    return (
      <div className={styles.page}>
        <SiteHeader
          innerRef={this.siteHeader}
          title={title}
          subtitle={subtitle}
          canDock={canDock} />
        <main className={styles.body}>
          {children}
        </main>
      </div>
    )
  }
}
export default StandardLayout
