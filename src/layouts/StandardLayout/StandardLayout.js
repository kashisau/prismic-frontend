import React, { useState } from 'react'
import SiteNav from '../../components/SiteNav'
import classNames from 'classnames/bind'

import styles from './standard-layout.module.css'

const StandardLayout = (
  {
    children,
    subtitle = "Section name",
    title = "Page title"
  }) => {
  const [menuActive, setMenuActive] = useState(false)
  const [headerCollapsed, setHeaderCollapsed] = useState(true)
  const [titleActive, setTitleActive] = useState(false)

  const activeClasses = classNames.bind(styles)

  return (
    <div
      className={activeClasses(
        'page',
        { 'menuActive': menuActive },
        { 'headerCollapsed': headerCollapsed },
        { 'titleActive': titleActive }
      )}>
      <header className={styles.siteHeader}>
        {title &&
          <hgroup className={styles.pageHeadingGroup}>
            <div className={styles.pageHeadings} {...(!titleActive? {'aria-hidden':true} : {})}>
              {subtitle && <h2 className={styles.subtitle}>{subtitle}</h2>}
              <h1 className={styles.title}>{title}</h1>
            </div>
            <h1 className={styles.logoType} {...(!titleActive? {'aria-hidden':true} : {})}>Kashi Samaraweera</h1>
          </hgroup>
          ||
          <h1 className={styles.logoType}>Logo Name</h1>
        }
        <button
          className={styles.menuToggle}
          onClick={_ => { setMenuActive(!menuActive); setTitleActive(!titleActive); setHeaderCollapsed(!headerCollapsed)}}>Menu</button>
        <SiteNav className={styles.siteNav} isActive={menuActive} />
      </header>
      <main className={styles.body}>
        {children}
      </main>
    </div>
  )
}

export default StandardLayout