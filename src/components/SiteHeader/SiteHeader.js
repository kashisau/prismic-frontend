import React, { Component, createRef, forwardRef } from 'react'
import SiteNav from '../SiteNav'
import classNames from 'classnames/bind'

import styles from './site-header.module.css'

const DEFAULT_PADDING_MIN = 4
const DEFAULT_PADDING_MAX = 24
const SCROLL_DAMPENER = 4

class SiteHeader extends Component {

  logos = createRef()
  pageHeadings = createRef()
  menuToggle = createRef()

  lastScrollPos = 0
  headerPadding = DEFAULT_PADDING_MAX

  state = {
    menuActive: false,
    siteNameActive: false
  }

  watchScroll = () =>  {
    const { menuActive } = this.state
    if (menuActive) return

    const { headerPadding, lastScrollPos, logos, pageHeadings, menuToggle } = this
    const scrollPos = window.scrollY
    const scrollDelta = (scrollPos - lastScrollPos) / SCROLL_DAMPENER
    const newHeaderPadding =
      Math.max(
        Math.min(DEFAULT_PADDING_MAX, headerPadding - scrollDelta),
        DEFAULT_PADDING_MIN
      )
    const paddedElements = [logos, pageHeadings, menuToggle]

    this.lastScrollPos = scrollPos

    if (newHeaderPadding === headerPadding) return

    switch (newHeaderPadding) {
      case DEFAULT_PADDING_MAX:
        this.setState({ siteNameActive: true })
        break
      case DEFAULT_PADDING_MIN:
        this.setState({ siteNameActive: false })
        break
    }

    this.headerPadding = newHeaderPadding
    const marginString = `${newHeaderPadding}px`

    paddedElements.forEach(({current: element}) => {
      element.style.marginTop = marginString
      element.style.marginBottom = marginString
    })
  }

  toggleMenu = () => {
    const { menuActive } = this.state
    const { headerPadding } = this

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
      siteNameActive: false
    })
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

    const scrollMargins = {
      marginTop: menuActive? DEFAULT_PADDING_MAX : undefined,
      marginBottom: menuActive? DEFAULT_PADDING_MAX : undefined
    }

    return (
      <header className={classNames(styles.siteHeader, activeClasses)} ref={this.props.innerRef}>
        <div
          className={styles.logos}
          style={scrollMargins}
          ref={this.logos}>
          <span className={styles.logoType}>Sliding menu</span>
          <span className={styles.logoTypeSubtitle}>Standard web app</span>
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
    )
  }
}

export default forwardRef((props, ref) => <SiteHeader innerRef={ref} {...props} />)