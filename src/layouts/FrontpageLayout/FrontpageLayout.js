import React from 'react'
import StandardLayout from '../StandardLayout';

import styles from './frontpage-layout.module.css'

const FrontpageLayout = ({heroBlurb, children}) => {
  return (
    <StandardLayout canDock={true}>
      <div className={styles.heroBack}>
        <div className={styles.hero}>
          <p className={styles.blurb} dangerouslySetInnerHTML={{ __html: heroBlurb.html}} />
          <h1 className={styles.pageTitle}>Latest News</h1>
          <article className={styles.heroArticle}>
            <hgroup>
              <h2>Art piece</h2>
              <h3>Category name</h3>
            </hgroup>
          </article>
        </div>
      </div>
      {children}
    </StandardLayout>
  )
}

export default FrontpageLayout
