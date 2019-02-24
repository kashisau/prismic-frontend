import React, { useState } from 'react'
import SiteNav from '../../components/SiteNav'
import classNames from 'classnames/bind'

import styles from './standard-layout.module.css'

const StandardLayout = (
  {
    children,
    hasHeaderCollapsed = false,
    hasTitleActive = false,
    hasMenuFloat = true,
    subtitle,
    title
  }) => {

  const [menuFloat, setMenuFloat] = useState(hasMenuFloat)
  const [menuActive, setMenuActive] = useState(false)
  const [headerCollapsed, setHeaderCollapsed] = useState(hasHeaderCollapsed)
  const [titleActive, setTitleActive] = useState(!title || hasTitleActive)

  const activeClasses = classNames.bind(styles)

  window.addEventListener('scroll', _ => {
    const scrollPos = window.scrollY;
    if (scrollPos > 1)
      setHeaderCollapsed(true)
    else
      setHeaderCollapsed(false)
  })

  return (
    <div
      className={activeClasses(
        'page',
        { 'menuFloat': menuFloat },
        { 'titleActive': titleActive },
        { 'headerCollapsed': headerCollapsed },
        { 'menuActive': menuActive }
      )}>
      <header className={styles.siteHeader}>
        <hgroup className={styles.pageHeadingGroup}>
          <div className={styles.pageHeadings}>
            {subtitle && <h2 className={styles.subtitle}>{subtitle}</h2>}
            {title && <h1 className={styles.title}>{title}</h1>}
          </div>
          <span className={classNames(styles.h1, styles.logoType)}>Sliding menu</span>
          <span className={styles.logoTypeSubtitle}>Standard web app</span>
        </hgroup>
        <button
          className={styles.menuToggle}
          onClick={_ => { setMenuActive(!menuActive)}}>Menu</button>
        <SiteNav className={styles.siteNav} isActive={menuActive} />
      </header>
      <main className={styles.body}>
        {children}
      </main>
    </div>
  )
}

export default StandardLayout