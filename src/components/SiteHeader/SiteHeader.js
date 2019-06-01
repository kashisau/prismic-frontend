import React, { Component, createRef, forwardRef } from 'react'
import { Controller, Scene } from 'react-scrollmagic'
import { Tween } from 'react-gsap'

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
    const { pageTitle } = this.props

    const classes = classNames.bind(styles)
    const activeClasses = classes(
      { 'active': active }
    )

    return (
      <Controller>
        <Scene duration={200}>
          {progress => 
            <Tween
              to={{
                y: "-50%",
                boxShadow: '0 1px 20px 0 rgba(0,0,0,0.5)'
              }}
              ease="easeOut"
              totalProgress={progress}
              paused>
                <header className={styles.headerBack}>
                  <div className={classNames(styles.siteHeader, activeClasses)} ref={this.props.innerRef}>
                    <hgroup className={styles.logos}>
                      <Tween
                        to={{
                          scale: 0.5,
                          y: "45%"
                        }}
                        ease="easeOut"
                        totalProgress={progress}
                        paused>
                        <h1 className={styles.logoType}>Kashi Samaraweera</h1>
                      </Tween>
                      {/* {pageTitle && <h2 className={styles.title}>{pageTitle}</h2>} */}
                    </hgroup>
                    {/* <SiteNav className={styles.siteNav} isActive={active} ref={this.siteNav} /> */}
                  </div>
                </header>
            </Tween>
          }
        </Scene>
      </Controller>
    )
  }
}

export default forwardRef((props, ref) => <SiteHeader innerRef={ref} {...props} />)