import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from '../components/header'
import './layout.css'

const Layout = ({ children, siteTitle }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <article>
        <Header siteTitle={siteTitle || data.site.siteMetadata.title} />
        {children}
        </article>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  siteTitle: PropTypes.string
}

export default Layout
