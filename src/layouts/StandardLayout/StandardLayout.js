import React, { useState } from 'react'
import SiteNav from '../../components/SiteNav'
import classNames from 'classnames/bind'

import styles from './standard-layout.module.css'

const StandardLayout = (
  {
    children,
    hasMenuActive = false,
    hasHeaderCollapsed = false,
    hasTitleActive = false,
    subtitle,
    title
  }) => {

  const [menuActive, setMenuActive] = useState(hasMenuActive)
  const [headerCollapsed, setHeaderCollapsed] = useState(hasHeaderCollapsed)
  const [titleActive, setTitleActive] = useState(!title || hasTitleActive)

  const activeClasses = classNames.bind(styles)

  return (
    <div
      className={activeClasses(
        'page',
        { 'menuActive': menuActive },
        { 'headerCollapsed': headerCollapsed },
        { 'titleActive': titleActive }
      )}>
      <header className={styles.siteHeader} onClick={e => setTitleActive(!title || !titleActive)}>
          <hgroup className={styles.pageHeadingGroup}>
            <div className={styles.pageHeadings} {...(!titleActive? {'aria-hidden':true} : {})}>
              {subtitle && <h2 className={styles.subtitle}>{subtitle}</h2>}
              {title && <h1 className={styles.title}>{title}</h1>}
            </div>
            <span className={classNames(styles.h1, styles.logoType)} {...(!titleActive? {'aria-hidden':true} : {})}>Kashi Samaraweera</span>
            <span className={styles.logoTypeSubtitle}>Web application developer</span>
          </hgroup>
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