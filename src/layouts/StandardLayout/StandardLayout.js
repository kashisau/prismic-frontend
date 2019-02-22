import React, { useState } from 'react'
import SiteNav from '../../components/SiteNav'
import classNames from 'classnames/bind'

import styles from './standard-layout.module.css'

const StandardLayout = ({children, section = "photos", pageTitle = "There was movement at the station for the word had passed around"}) => {
  const [menuActive, setMenuActive] = useState(true)
  const [titleActive, setTitleActive] = useState(true)

  const activeClasses = classNames.bind(styles)

  return (
    <div className={activeClasses('page', { 'menuActive': menuActive }, { 'titleActive': titleActive })}>
      <header className={styles.siteHeader}>
        {pageTitle && section &&
          <hgroup className={styles.pageHeadingGroup}>
            <div className={styles.pageHeadings}>
              <h2 className={styles.section}>{section}</h2>
              <h1 className={styles.pageTitle}>{pageTitle}</h1>
            </div>
            <h1 className={styles.logoType}>Logo Name</h1>
          </hgroup>
          ||
          <h1 className={styles.logoType}>Logo Name</h1>
        }
        <button
          className={styles.menuToggle}
          onClick={e => { setMenuActive(!menuActive); setTitleActive(!titleActive)}}>Menu</button>
        <SiteNav className={styles.siteNav} />
        {children}
      </header>
    </div>
  )
}

export default StandardLayout