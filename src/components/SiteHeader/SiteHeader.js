import React, { Component, createRef, forwardRef } from 'react'
import SiteNav from '../SiteNav'
import classNames from 'classnames/bind'

import styles from './site-header.module.css'

class SiteHeader extends Component {

  siteNav = React.createRef()

  state = {
    active: true
  }

  render() {
    const { active } = this.state
    const { pageTitle: title } = this.props

    const classes = classNames.bind(styles)
    const activeClasses = classes(
      { 'active': active }
    )

    return (
      <div className={styles.headerBack}>
        <header className={classNames(styles.siteHeader, activeClasses)} ref={this.props.innerRef}>
          <div
            className={styles.logos}>
            <span className={styles.logoType}>Kashi Samaraweera</span>
          </div>
          <hgroup
            className={styles.pageHeadings}>
            {title && <h1 className={styles.title}>{title}</h1>}
          </hgroup>
          <SiteNav className={styles.siteNav} isActive={active} ref={this.siteNav} />
        </header>
      </div>
    )
  }
}

export default forwardRef((props, ref) => <SiteHeader innerRef={ref} {...props} />)