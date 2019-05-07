import React from 'react'
import StandardLayout from '../StandardLayout';
import classnames from 'classnames/bind'
import Img from 'gatsby-image'

import styles from './frontpage-layout.module.css'

const FrontpageLayout = ({
    hero_blurb: heroBlurb,
    hero_title: heroTitle,
    hero_subtitle: heroSubtitle,
    hero_article_blurb: heroArticleBlurb,
    hero_content: heroData,
    children
  }) => {
  const hero = heroData.document[0].data
  const { title, photo_description: heroDescription, photo_file: photoFile } = hero
  
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
            fluid={photoFile.localFile.childImageSharp.fluid}
            alt={title.text} />
          <hgroup className={styles.articleHeadings}>
            <h2 className={classnames(styles.heroTitle)}>{heroTitle.text}</h2>
            <h3 className={classnames(styles.heroSubtitle)}>{heroSubtitle.text}</h3>
          </hgroup>
          <div className={classnames(styles.subtitle, styles.heroBlurb)} dangerouslySetInnerHTML={{ __html: heroArticleBlurb.html}} />
        </article>
      </div>
      <article className={styles.article}>
        {/* {children} */}
      </article>
    </StandardLayout>
  )
}

export default FrontpageLayout
