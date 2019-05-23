import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import { Link } from 'gatsby'
import classNames from 'classnames/bind'

import styles from './site-footer.module.css'
import logoGithub from '../../images/logo-github.svg'
import logoNetlify from '../../images/logo-netlify.svg'
import logoPrismic from '../../images/logo-prismic.svg'
import logoCloudflare from '../../images/logo-cloudflare.svg'

export default () => (
  <StaticQuery
    query={graphql`
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
    `}
    render={data => {
      const footerBlurb = data.allPrismicSiteMetadata.edges[0].node.data.footer_blurb
      return (<footer className={styles.footer}>
        <div className={styles.footerContent}>
          <h1 className={styles.footerTitle}>Where I'm active</h1>
          <p className={styles.footerContactBlurb} dangerouslySetInnerHTML={{__html: footerBlurb.html}} />
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
      </footer>)
    }}
  />
)