import React from 'react'
import StandardLayout from '../StandardLayout';
import { Controller, Scene } from 'react-scrollmagic';
import { Tween } from 'react-gsap'

import classnames from 'classnames/bind'
import Img from 'gatsby-image'

import styles from './frontpage-layout.module.css'

const FrontpageLayout = ({
    hero_blurb: heroBlurb,
    workHero,
    featuredWorks,
    children
  }) => {
  const { title: heroTitle, org: heroSubtitle, blurb: heroArticleBlurb, product_image: heroProductImage } = workHero
  return (
    <StandardLayout>
      <div className={styles.hero}>
        <div className={styles.heroBack}>
          <div className={styles.blurb} dangerouslySetInnerHTML={{ __html: heroBlurb.html}} />
        </div>
        <h1 className={styles.pageTitle}>Latest<span className={styles.fullTitle}>&nbsp;work</span></h1>
        <article className={styles.heroArticle}>
          <Controller>
            <Scene duration={400}>
              {progress =>
                <Tween
                  to={{
                    x: '0%',
                    scale: '1'
                  }}
                  from={{
                    x: '1%',
                    scale: '1.05'
                  }}
                  totalProgress={progress}
                  paused>
                    <div className={styles.heroImage}>
                      <Img
                        fluid={heroProductImage.localFile.childImageSharp.fluid}
                        alt={heroTitle.text} />
                    </div>
                </Tween>
              }
            </Scene>
          </Controller>
          <hgroup className={styles.articleHeadings}>
            <h2 className={classnames(styles.heroTitle)}>{heroTitle.text}</h2>
            <h3 className={classnames(styles.heroSubtitle)}>{heroSubtitle.text}</h3>
          </hgroup>
          <div className={classnames(styles.subtitle, styles.heroBlurb)} dangerouslySetInnerHTML={{ __html: heroArticleBlurb.html}} />
        </article>
      </div>
      {featuredWorks && <section className={styles.latestWorkSpill}>
        <h1 className={styles.bodyTitle}>Previous<span className={styles.fullTitle}>&nbsp;work</span></h1>
        {featuredWorks.map(
          (work, index) => {
            return <article className={styles.workArticle} key={index} id={`work-item-${index}`}>
              <Controller>
                <Scene duration={600}
                  triggerElement={`#work-item-${index}`}
                  triggerHook="onEnter">
                  {progress =>
                    <Tween
                      to={{
                        x: `0%`,
                        scale: '1'
                      }}
                      from={{
                        x: `${index % 2 === 0 ? -3 : 3}%`,
                        scale: '1.1'
                      }}
                      totalProgress={progress}
                      paused>
                        <div className={styles.workImage}>
                        <Img
                          fluid={work.product_image.localFile.childImageSharp.fluid}
                          alt={work.title.text} />
                        </div>
                    </Tween>
                  }
                </Scene>
              </Controller>
              <hgroup className={styles.workHeadings}>
                <h2 className={styles.workTitle}>{work.title.text}</h2>
                <h3 className={styles.workSubtitle}>{work.org.text}</h3>
              </hgroup>
              <div className={styles.workBlurb} dangerouslySetInnerHTML={{ __html: work.blurb.html }} />
            </article>
          })}
        </section>}
    </StandardLayout>
  )
}

export default FrontpageLayout
