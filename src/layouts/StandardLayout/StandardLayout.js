import React, { Component, useState } from 'react'
import SiteNav from '../../components/SiteNav'
import classNames from 'classnames/bind'

import styles from './standard-layout.module.css'

class StandardLayout extends Component {
  render() {
    const {
      children,
      subtitle,
      title
    } = this.props

    const { menuActive, titleActive, headerCollapsed, menuFloat } = this.state

    const activeClasses = classNames.bind(styles)

    return (
      <div className={styles.page}>
        <SiteHeader />
        <main className={styles.body}>
          {children}
        </main>
      </div>
    )
  }
}
export default StandardLayout
