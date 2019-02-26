import React from 'react'
import { Link } from 'gatsby'
import classNames from 'classnames/bind'

import styles from './site-nav.module.css'

const SiteNav = React.forwardRef(({className, isActive}, ref) => {
  return (
    <nav className={classNames(styles.nav, className)} ref={ref} {...(!isActive? {'aria-hidden':true} : {})}>
      <h2 className={styles.title}>Menu</h2>
      <ul className={styles.menu}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/photos">Menu item 1</Link></li>
        <li><Link to="/">Menu item 2</Link></li>
      </ul>
    </nav>
  )
})

export default SiteNav