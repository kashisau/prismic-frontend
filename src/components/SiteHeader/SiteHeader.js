import React, { Component, createRef, forwardRef } from 'react'
import SiteNav from '../SiteNav'
import classNames from 'classnames/bind'

import styles from './site-header.module.css'

class SiteHeader extends Component {

  headings = createRef()
  menuButton = createRef()
  siteNav = createRef()

  DEFAULT_PADDING_MIN = 4
  DEFAULT_PADDING_MAX = 24

  state = {
    menuActive: true,
    siteNameActive: false,
    headerPadding: this.DEFAULT_PADDING_MIN,
    lastScrollPos: 0
  }

  watchScroll = () =>  {

  }

  componentDidMount() {
    window.addEventListener('scroll', this.watchScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.watchScroll)
  }

  render() {
    const { menuActive, siteNameActive } = this.state
    const { title, subtitle } = this.props

    const classes = classNames.bind(styles)
    const activeClasses = classes(
      { 'siteNameActive': siteNameActive },
      { 'menuActive': menuActive }
    )

    return (
      <header className={classNames(styles.siteHeader, activeClasses)} ref={this.props.innerRef}>
        <div className={styles.logos}>
          <span className={styles.logoType}>Sliding menu</span>
          <span className={styles.logoTypeSubtitle}>Standard web app</span>
        </div>
        <hgroup className={styles.pageHeadings}>
          {subtitle && <h2 className={styles.subtitle}>{subtitle}</h2>}
          {title && <h1 className={styles.title}>{title}</h1>}
        </hgroup>
        <button
          className={styles.menuToggle}
          onClick={_ => this.setState({ menuActive: !menuActive})}
          ref={ref => this.menuButton}>Menu</button>
        <SiteNav className={styles.siteNav} isActive={menuActive} ref={this.siteNav} />
      </header>
    )
  }
}

export default forwardRef((props, ref) => <SiteHeader innerRef={ref} {...props} />)