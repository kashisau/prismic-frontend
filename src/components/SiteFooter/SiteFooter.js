import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import { Link } from 'gatsby'
import classNames from 'classnames/bind'

import styles from './site-footer.module.css'
import logoGithub from '../../images/logo-github.svg'
import logoNetlify from '../../images/logo-netlify.svg'
import logoPrismic from '../../images/logo-prismic.svg'
import logoCloudflare from '../../images/logo-cloudflare.svg'

export default () => {
  const SiteFooterQuery = useStaticQuery(graphql`
    query SiteFooterQuery {
      allPrismicSiteMetadata {
        edges {
          node {
            data {
              footer_blurb {
                html
              }
            }
          }
        }
      }
    }
  `)

  const footerBlurb = SiteFooterQuery.allPrismicSiteMetadata.edges[0].node.data.footer_blurb
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <h1 className={styles.footerTitle}>Where I'm active</h1>
        <p className={styles.footerContactBlurb}>Examples of my work can be found on <a  href="https://github.com/kashisau">GitHub</a> or <a  href="https://bitbucket.org/kashisau/">BitBucket</a>. You can keep up with my adventures via <a  href="https://instagram.com/kashisamaraweera">Instagram</a>, track my progress as an aspiring shutterbug on my <a  href="https://www.instagram.com/kashis.photo/">alternate Instagram account</a>; read about my journey as an Australian Volunteer on my co-authored blog <a  href="https://medium.com/the-unlikely-sherpas">The Unlikely Sherpas</a>, or the exports of my ongoing study in philosophy &amp; linguistics on my blog, <a  href="https://enroute.kashis.com.au">En Route</a>. Or you can connect to my professional network via <a  href="https://au.linkedin.com/in/kashisau">LinkedIn</a>, and otherwise get in touch via email, <a  href="mailto:Kashi%20Samaraweera%20%3Ckashi@kashis.com.au%3E">kashi@kashis.com.au</a>.</p>
        <div className={styles.viewSource}>
          <h1 className={styles.sourceTitle}>Built with the following</h1>
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
}