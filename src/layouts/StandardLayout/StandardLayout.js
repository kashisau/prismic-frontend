import React, { Component, useState } from 'react'
import SiteHeader from '../../components/SiteHeader'
import SiteFooter from '../../components/SiteFooter'
import styles from './standard-layout.module.css'

class StandardLayout extends Component {

  siteHeader = React.createRef()

  render() {
    const {
      children,
      title,
      canDock
    } = this.props

    return (
      <div className={styles.page}>
        <SiteHeader
          innerRef={this.siteHeader}
          pageTitle={title}
          canDock={canDock} />
        <main className={styles.body}>
          {children}
        </main>
        <SiteFooter />
      </div>
    )
  }
}
export default StandardLayout
