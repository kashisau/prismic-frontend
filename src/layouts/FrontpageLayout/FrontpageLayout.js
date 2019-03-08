import React from 'react'
import StandardLayout from '../StandardLayout';
import classnames from 'classnames/bind'
import Img from 'gatsby-image'

import styles from './frontpage-layout.module.css'

const FrontpageLayout = ({
    hero_blurb: heroBlurb,
    hero_title: heroTitle,
    hero_content: heroData,
    children
  }) => {
  const hero = heroData.document[0].data
  const { title, photo_description: heroDescription, photo_file: photoFile } = hero
console.log("photoFile: ", photoFile)
  return (
    <StandardLayout canDock={true}>
      <div className={styles.heroBack}>
        <div className={styles.hero}>
          <p className={styles.blurb} dangerouslySetInnerHTML={{ __html: heroBlurb.html}} />
          <h1 className={styles.pageTitle}>{heroTitle.text}</h1>
          <article className={styles.heroArticle}>
            <hgroup className={styles.heroHeadings}>
              <h2 className={classnames(styles.title, styles.heroTitle)}>Photo</h2>
              <h3 className={classnames(styles.subtitle, styles.heroSubtitle)}>{title.text}</h3>
            </hgroup>
            <Img
              className={styles.heroImage}
              fluid={photoFile.localFile.childImageSharp.fluid}
              alt={title.text} />
          </article>
        </div>
      </div>
      {children}
    </StandardLayout>
  )
}

export default FrontpageLayout
