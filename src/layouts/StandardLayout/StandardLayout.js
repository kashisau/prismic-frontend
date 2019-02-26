import React, { Component, useState } from 'react'
import SiteNav from '../../components/SiteNav'
import classNames from 'classnames/bind'

import styles from './standard-layout.module.css'

class StandardLayout extends Component {

  pageHeadingGroup = React.createRef()
  menuButton = React.createRef()
  siteNav = React.createRef()

  DEFAULT_PADDING_MIN = 4
  DEFAULT_PADDING_MAX = 24

  state = {
    menuActive: false,
    titleActive: false,
    headerCollapsed: false,
    menuFloat: true,
    headerPadding: 24,
    lastScrollPos: 0
  }

  watchScroll = () =>  {
    const scrollPos = window.scrollY;
    const { headerPadding, lastScrollPos, menuActive } = this.state

    if (menuActive) {
      return
    }

    const scrollDelta = (scrollPos - lastScrollPos)/4
    const newHeaderPadding = Math.max(
      this.DEFAULT_PADDING_MIN,
      Math.min(this.DEFAULT_PADDING_MAX, headerPadding - scrollDelta)
    )

    if (scrollDelta > 0) { // Scrolling down
      this.setState({
        titleActive: false,
        // headerCollapsed: true
      })
    } else { // Scrolling up
      this.setState({titleActive: true})
    }

    this.setState({ headerPadding: newHeaderPadding, lastScrollPos: scrollPos })
    this.setHeaderMargins(newHeaderPadding)
  }

  setMenuActive(newMenuActiveState) {
    this.setState({
      menuActive: newMenuActiveState,
      headerCollapsed: this.state.headerCollapsed && !newMenuActiveState
    });
    if (newMenuActiveState
        && this.state.menuActive !== newMenuActiveState) {
          const newPadding = this.DEFAULT_PADDING_MAX
      this.setHeaderMargins(newPadding)
      this.setState({
        headerPadding: newPadding
      })

    }

  }

  setHeaderMargins(padding) {
    this.pageHeadingGroup.style.marginTop= `${padding}px`
    this.pageHeadingGroup.style.marginBottom = `${padding}px`

    this.menuButton.style.marginTop= `${padding}px`
    this.menuButton.style.marginBottom = `${padding}px`
    
    if (this.siteNav)
      this.siteNav.style.marginBottom = `${padding}px`
  }

  componentDidMount() {
    window.addEventListener('scroll', this.watchScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.watchScroll)
  }

  render() {

    const {
      children,
      subtitle,
      title
    } = this.props

    const { menuActive, titleActive, headerCollapsed, menuFloat } = this.state

    const activeClasses = classNames.bind(styles)

    return (
      <div
        className={activeClasses(
          'page',
          { 'menuFloat': menuFloat },
          { 'titleActive': titleActive },
          { 'headerCollapsed': headerCollapsed },
          { 'menuActive': menuActive }
        )}>
        <header className={styles.siteHeader}>
          <hgroup className={styles.pageHeadingGroup} ref={ref => this.pageHeadingGroup = ref}>
            <div className={styles.pageHeadings}>
              {subtitle && <h2 className={styles.subtitle}>{subtitle}</h2>}
              {title && <h1 className={styles.title}>{title}</h1>}
            </div>
            <span className={classNames(styles.h1, styles.logoType)}>Sliding menu</span>
            <span className={styles.logoTypeSubtitle}>Standard web app</span>
          </hgroup>
          <button
            className={styles.menuToggle}
            onClick={_ => { this.setMenuActive(!menuActive)}}
            ref={ref => this.menuButton = ref}>Menu</button>
          <SiteNav className={styles.siteNav} isActive={menuActive} ref={ref => this.siteNav = ref} />
        </header>
        <main className={styles.body}>
          {children}
        </main>
      </div>
    )
  }
}
export default StandardLayout
