import React from 'react'
import { Link } from 'gatsby'
import classNames from 'classnames/bind'

import styles from './site-footer.module.css'
import logoGithub from '../../images/logo-github.svg'
import logoNetlify from '../../images/logo-netlify.svg'
import logoPrismic from '../../images/logo-prismic.svg'
import logoCloudflare from '../../images/logo-cloudflare.svg'

const SiteFooter = React.forwardRef(({className}, ref) => {
  return (
    <footer className={styles.footer} ref={ref}>
      <div className={styles.footerContent}>
        <h2 className={styles.footerTitle}>Where I'm active</h2>
        <p className={styles.footerContactBlurb}>Examples of my work can be found on&nbsp;<a href="https://github.com/kashisau">GitHub</a>&nbsp;or&nbsp;<a href="https://bitbucket.org/kashisau/">BitBucket</a>. You can keep up with my adventures via&nbsp;<a href="https://instagram.com/kashisamaraweera">Instagram</a> (or attempts to take a decent photo via my <a href="https://www.instagram.com/kashis.photo/">alternate Instagram account</a>), my journey as an Australian Volunteer through my co-authored blog, <a href="https://medium.com/the-unlikely-sherpas">The Unlikely Sherpas</a>; or connect to my professional network via&nbsp;<a href="https://au.linkedin.com/in/kashis">LinkedIn</a>&nbsp;and get in touch via email,&nbsp;<a href="mailto:Kashi%20Samaraweera%20%3Ckashi@kashis.com.au%3E">kashi@kashis.com.au</a>.</p>
        <div className={styles.viewSource}>
          <h3 className={styles.sourceTitle}>Built with the following</h3>
          <p>This is an open source project, built on the following technologies.</p>
          <ul className={styles.providers}>
            <li className={styles.provider}><a href="https://www.netlify.com"><img className={styles.providerLogo} src={logoNetlify} alt="Netlify" /></a></li>
            <li className={styles.provider}><a href="https://prismic.io"><img className={styles.providerLogo} src={logoPrismic} alt="Prismic" /></a></li>
            <li className={styles.provider}><a href="https://github.com/kashisau/prismic-frontend"><img className={classNames(styles.providerLogo, styles.githubLogo)} src={logoGithub} alt="GitHub" /></a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
})

export default SiteFooter