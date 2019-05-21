import React from 'react'
import StandardLayout from '../StandardLayout';
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
          <Img
            className={styles.heroImage}
            fluid={heroProductImage.localFile.childImageSharp.fluid}
            alt={heroTitle.text} />
          <hgroup className={styles.articleHeadings}>
            <h2 className={classnames(styles.heroTitle)}>{heroTitle.text}</h2>
            <h3 className={classnames(styles.heroSubtitle)}>{heroSubtitle.text}</h3>
          </hgroup>
          <div className={classnames(styles.subtitle, styles.heroBlurb)} dangerouslySetInnerHTML={{ __html: heroArticleBlurb.html}} />
        </article>
      </div>
      {featuredWorks && <section className={styles.latestWorkSpill}>
        <h1 className={styles.bodyTitle}>Previously<span className={styles.fullTitle}>&nbsp;working on</span></h1>
        {featuredWorks.map((work, index) => 
          <article className={styles.workArticle} key={index}>
            <Img
              className={styles.workImage}
              fluid={work.product_image.localFile.childImageSharp.fluid}
              alt={work.title.text} />
            <hgroup className={styles.articleHeadings}>
              <h2 className={classnames(styles.heroTitle)}>{work.title.text}</h2>
              <h3 className={classnames(styles.heroSubtitle)}>{work.org.text}</h3>
            </hgroup>
            <div dangerouslySetInnerHTML={{ __html: work.blurb.html }} />
          </article>)}
        </section>}
    </StandardLayout>
  )
}

export default FrontpageLayout
