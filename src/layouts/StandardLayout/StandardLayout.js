import React, { useState } from 'react'
import { Link } from 'gatsby'
import SiteNav from '../../components/SiteNav'
import classNames from 'classnames/bind'

import styles from './standard-layout.module.css'

const StandardLayout = ({children}) => {
  const [menuActive, setMenuActive] = useState(true)
  const activeClasses = classNames.bind(styles)

  return (
    <div className={activeClasses('page', { 'menuActive': menuActive })}>
      <header className={styles.siteHeader}>
        <h1 className={styles.logoType}>Kashi Samaraweera</h1>
        <button
          className={styles.menuToggle}
          onClick={e => setMenuActive(!menuActive)}>Menu</button>
        <SiteNav className={styles.siteNav} />
        {children}
      </header>
    </div>
  )
}

export default StandardLayout