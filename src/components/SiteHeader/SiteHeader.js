import React, { Component, createRef, forwardRef } from 'react'
import SiteNav from '../SiteNav'
import classNames from 'classnames/bind'

import styles from './site-header.module.css'

const DEFAULT_PADDING_MIN = 4
const DEFAULT_PADDING_MAX = 24
const LOGO_SCALE_MIN = 1;
const LOGO_SCALE_MAX = 1.5;
const SCROLL_DAMPENER = 4

class SiteHeader extends Component {

  logos = createRef()
  pageHeadings = createRef()
  menuToggle = createRef()

  lastScrollPos = 0
  headerPadding = DEFAULT_PADDING_MAX

  state = {
    menuActive: false,
    docked: true,
    siteNameActive: true
  }

  watchScroll = () =>  window.requestAnimationFrame(() => {
    const { menuActive } = this.state
    if (menuActive) return

    const { headerPadding, lastScrollPos, logos, pageHeadings, menuToggle } = this
    const { title } = this.props
    const { docked } = this.state

    const scrollPos = window.scrollY
    const scrollDelta = (scrollPos - lastScrollPos) / SCROLL_DAMPENER
    const newHeaderPadding =
      Math.max(
        Math.min(DEFAULT_PADDING_MAX, headerPadding - scrollDelta),
        DEFAULT_PADDING_MIN
      )
    const paddedElements = [logos, pageHeadings, menuToggle]

    this.lastScrollPos = scrollPos

    if (scrollPos <= 25) this.setState({ docked: true })
    else if (scrollPos > 25 && docked) this.setState({ docked: false })

    if (newHeaderPadding === headerPadding) return

    if (title) {
      switch (newHeaderPadding) {
        case DEFAULT_PADDING_MAX:
          this.setState({ siteNameActive: true })
          break
        case DEFAULT_PADDING_MIN:
          this.setState({ siteNameActive: false })
          break
      }
    }

    this.headerPadding = newHeaderPadding
    const marginString = `${newHeaderPadding}px`

    paddedElements.forEach(({current: element}) => {
      if (!element) return
      element.style.marginTop = marginString
      element.style.marginBottom = marginString
    })
  })

  toggleMenu = () => {
    const { menuActive } = this.state
    const { title } = this.props
    const newMenuActive = !menuActive

    if (newMenuActive) {
      // Set our header padding
      this.headerPadding = DEFAULT_PADDING_MAX
      this.setState({
        menuActive: newMenuActive,
        siteNameActive: true
      })
      return
    }

    this.setState({
      menuActive: false,
      siteNameActive: title? false : true
    })
  }

  componentDidMount() {
    window.addEventListener('scroll', this.watchScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.watchScroll)
  }

  render() {
    const { menuActive, siteNameActive, docked } = this.state
    const { title, subtitle, canDock = false } = this.props

    const classes = classNames.bind(styles)
    const activeClasses = classes(
      { 'siteNameActive': siteNameActive },
      { 'menuActive': menuActive },
      { 'docked': canDock && docked }
    )

    const scrollMargins = {
      marginTop: menuActive? DEFAULT_PADDING_MAX : undefined,
      marginBottom: menuActive? DEFAULT_PADDING_MAX : undefined
    }

    return (
      <div className={styles.headerBack}>
        <header className={classNames(styles.siteHeader, activeClasses)} ref={this.props.innerRef}>
          <div
            className={styles.logos}
            style={scrollMargins}
            ref={this.logos}>
            <span className={styles.logoType}>Kashi Samaraweera</span>
            <span className={styles.logoTypeSubtitle}>Web application developer</span>
          </div>
          <hgroup
            className={styles.pageHeadings}
            style={scrollMargins}
            ref={this.pageHeadings}>
            {subtitle && <h2 className={styles.subtitle}>{subtitle}</h2>}
            {title && <h1 className={styles.title}>{title}</h1>}
          </hgroup>
          <button
            className={styles.menuToggle}
            style={scrollMargins}
            onClick={this.toggleMenu}
            ref={this.menuToggle}>
            Menu
          </button>
          <SiteNav className={styles.siteNav} isActive={menuActive} ref={this.siteNav} />
        </header>
      </div>
    )
  }
}

export default forwardRef((props, ref) => <SiteHeader innerRef={ref} {...props} />)