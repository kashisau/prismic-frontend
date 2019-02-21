import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import SiteNav from '../../components/SiteNav'
import classNames from 'classnames/bind'

import styles from './standard-layout.module.css'

const StandardLayout = ({children, menuActive}) => {
  return (
    <div className={styles.page}>
      <header className={styles.siteHeader}>
        <h1 className={styles.logoType}>Kashi Samaraweera</h1>
        <SiteNav className={styles.siteNav} />
        {children}
      </header>
    </div>
  )
}

export default StandardLayout