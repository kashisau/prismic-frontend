import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import classNames from 'classnames/bind'

import styles from './site-footer.module.css'
import logoGithub from '../../images/logo-github.svg'
import logoNetlify from '../../images/logo-netlify.svg'
import logoPrismic from '../../images/logo-prismic.svg'

const SiteFooter = ({}) => {
  const { prismicSiteMetadata } = useStaticQuery(query)

  const footerBlurbHtml = prismicSiteMetadata.data.footer_blurb.html
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <h1 className={styles.footerTitle}>Where I'm active</h1>
        <div className={styles.footerContactBlurb} dangerouslySetInnerHTML={{ __html: footerBlurbHtml }} />
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

const query = graphql`
query SiteFooter {
  prismicSiteMetadata {
    data {
      footer_blurb {
        html
      }
    }
  }
}
`

export default SiteFooter