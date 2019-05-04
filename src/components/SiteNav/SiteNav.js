import React from 'react'
import { Link } from 'gatsby'
import classNames from 'classnames/bind'
import home from '../../images/button-home.svg'
import homeActive from '../../images/button-home-active.svg'
import about from '../../images/button-about.svg'
import aboutActive from '../../images/button-about-active.svg'
import work from '../../images/button-work.svg'
import workActive from '../../images/button-work-active.svg'
import contact from '../../images/button-contact.svg'
import contactActive from '../../images/button-contact-active.svg'

import styles from './site-nav.module.css'

const SiteNav = React.forwardRef(({className, isActive}, ref) => {
  return (
    <nav className={classNames(styles.nav, className)} ref={ref} {...(!isActive? {'aria-hidden':true} : {})}>
      <ul className={styles.menu} aria-title="Site level navigation">
        <li className={styles.menuItem}><Link activeClassName={styles.linkActive} to="/"><img src={homeActive} /><span className={styles.menuItemText}>Home</span></Link></li>
        <li className={styles.menuItem}><Link activeClassName={styles.linkActive} to="/about"><img src={about} /><span className={styles.menuItemText}>About</span></Link></li>
        <li className={styles.menuItem}><Link activeClassName={styles.linkActive} to="/work"><img src={work} /><span className={styles.menuItemText}>Work</span></Link></li>
        <li className={styles.menuItem}><Link activeClassName={styles.linkActive} to="/contact"><img src={contact} /><span className={styles.menuItemText}>Contact</span></Link></li>
      </ul>
    </nav>
  )
})

export default SiteNav