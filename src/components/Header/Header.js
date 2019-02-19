import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames/bind';

import styles from './header.module.css'

const Header = ({ siteTitle, subtitle, className }) => {
  const headerClassNames = classNames(styles.Header, className)
  return (
    <header className={headerClassNames}>
      <h1>{siteTitle}</h1>
      <h2>{subtitle}</h2>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
  subtitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
