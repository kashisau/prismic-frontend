import React, { Component, createRef, forwardRef } from 'react'
import SiteNav from '../SiteNav'
import classNames from 'classnames/bind'

import styles from './site-header.module.css'

class SiteHeader extends Component {

  lastScrollPos = 0

  state = {
    menuActive: false,
    siteNameActive: true
  }

  toggleMenu = () => {
    const { menuActive } = this.state
    const { title } = this.props
    const newMenuActive = !menuActive

    this.setState({
      menuActive: !menuActive,
      siteNameActive: true
    })
  }

  render() {
    const { menuActive, siteNameActive } = this.state
    const { title, subtitle } = this.props

    const classes = classNames.bind(styles)
    const activeClasses = classes(
      { 'siteNameActive': siteNameActive && menuActive },
      { 'menuActive': menuActive }
    )

    return (
      <div className={styles.headerBack}>
        <header className={classNames(styles.siteHeader, activeClasses)} ref={this.props.innerRef}>
          <div
            className={styles.logos}>
            <span className={styles.logoType}>Kashi Samaraweera</span>
            <span className={styles.logoTypeSubtitle}>Web application developer</span>
          </div>
          <hgroup
            className={styles.pageHeadings}>
            {subtitle && <h2 className={styles.subtitle}>{subtitle}</h2>}
            {title && <h1 className={styles.title}>{title}</h1>}
          </hgroup>
          <button
            className={styles.menuToggle}
            onClick={this.toggleMenu}>
            Menu
          </button>
          <SiteNav className={styles.siteNav} isActive={menuActive} ref={this.siteNav} />
        </header>
      </div>
    )
  }
}

export default forwardRef((props, ref) => <SiteHeader innerRef={ref} {...props} />)