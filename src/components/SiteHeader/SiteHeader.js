import React, { Component, createRef, forwardRef } from 'react'
import SiteNav from '../SiteNav'
import classNames from 'classnames/bind'

import styles from './site-header.module.css'

const DEFAULT_PADDING_MIN = 4
const DEFAULT_PADDING_MAX = 24

class SiteHeader extends Component {

  logos = createRef()
  pageHeadings = createRef()
  menuToggle = createRef()

  state = {
    menuActive: true,
    siteNameActive: false,
    headerPadding: DEFAULT_PADDING_MIN,
    lastScrollPos: 0
  }

  watchScroll = () =>  {
    const { headerPadding, lastScrollPos, menuActive } = this.state
    if (menuActive) return

    const scrollPos = window.scrollY
    const scrollDelta = scrollPos - lastScrollPos
    const newHeaderPadding = headerPadding - scrollDelta

    this.setState({ lastScrollPos: scrollPos })

    if (newHeaderPadding < DEFAULT_PADDING_MIN) return
    if (newHeaderPadding > DEFAULT_PADDING_MAX) return

    this.setState({ headerPadding: newHeaderPadding })
  }

  componentDidMount() {
    window.addEventListener('scroll', this.watchScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.watchScroll)
  }

  render() {
    const { menuActive, siteNameActive, headerPadding } = this.state
    const { title, subtitle } = this.props

    const classes = classNames.bind(styles)
    const activeClasses = classes(
      { 'siteNameActive': siteNameActive },
      { 'menuActive': menuActive }
    )

    const scrollMargins = {
      marginTop: menuActive? DEFAULT_PADDING_MAX : headerPadding,
      marginBottom: menuActive? DEFAULT_PADDING_MAX : headerPadding
    }

    return (
      <header className={classNames(styles.siteHeader, activeClasses)} ref={this.props.innerRef}>
        <div className={styles.logos} ref={this.logos}>
          <span className={styles.logoType}>Sliding menu</span>
          <span className={styles.logoTypeSubtitle}>Standard web app</span>
        </div>
        <hgroup className={styles.pageHeadings} ref={this.pageHeadings}>
          {subtitle && <h2 className={styles.subtitle}>{subtitle}</h2>}
          {title && <h1 className={styles.title}>{title}</h1>}
        </hgroup>
        <button
          className={styles.menuToggle}
          onClick={_ => this.setState({ menuActive: !menuActive})}
          ref={this.menuToggle}
          style={scrollMargins}>Menu</button>
        <SiteNav className={styles.siteNav} isActive={menuActive} ref={this.siteNav} />
      </header>
    )
  }
}

export default forwardRef((props, ref) => <SiteHeader innerRef={ref} {...props} />)