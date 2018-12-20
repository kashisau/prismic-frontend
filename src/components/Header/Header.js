import PropTypes from 'prop-types'
import React from 'react'

import './header.css'

const Header = ({ siteTitle, subtitle }) => (
  <header className="Header">
    <h1>{siteTitle}</h1>
    <h2>{subtitle}</h2>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
  subtitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
