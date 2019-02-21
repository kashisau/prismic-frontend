import React from 'react'
import { Link } from 'gatsby'
import classNames from 'classnames/bind'

import styles from './site-nav.module.css'

const SiteNav = ({className, active}) => {
  return (
    <nav className={classNames(styles.nav, className)}>
      <h2 className={styles.title}>Menu</h2>
      <ul className={styles.menu}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/">Photos</Link></li>
        <li><Link to="/">About</Link></li>
      </ul>
    </nav>
  )
}

export default SiteNav