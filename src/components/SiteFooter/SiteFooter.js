import React from 'react'
import { Link } from 'gatsby'
import classNames from 'classnames/bind'

import styles from './site-footer.module.css'

const SiteFooter = React.forwardRef(({className}, ref) => {
  return (
    <footer className={classNames(styles.footer)} ref={ref}>
      <h2 className={styles.footerTitle}>Where I'm active</h2>
      <p className={styles.footerContactBlurb}>Examples of my work can be found on&nbsp;<a href="https://github.com/kashisau">GitHub</a>&nbsp;or&nbsp;<a href="https://bitbucket.org/kashisau/">BitBucket</a>. You can keep up with my adventures via&nbsp;<a href="https://instagram.com/kashisamaraweera">Instagram</a> (or attempts to take a decent photo via my <a href="https://www.instagram.com/kashis.photo/">alternate Instagram account</a>), my journey as an Australian Volunteer through my co-authored blog, <a href="https://medium.com/the-unlikely-sherpas">The Unlikely Sherpas</a>; or connect to my professional network via&nbsp;<a href="https://au.linkedin.com/in/kashis">LinkedIn</a>&nbsp;and get in touch via email,&nbsp;<a href="mailto:Kashi%20Samaraweera%20%3Ckashi@kashis.com.au%3E">kashi@kashis.com.au</a>.</p>
    </footer>
  )
})

export default SiteFooter