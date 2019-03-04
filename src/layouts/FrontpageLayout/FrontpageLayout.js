import React from 'react'
import StandardLayout from '../StandardLayout';

import styles from './frontpage-layout.module.css'

const FrontpageLayout = ({heroBlurb, children}) => {
  return (
    <StandardLayout>
      <div className={styles.heroBack}>
        <div className={styles.hero}>
          <p className={styles.blurb} dangerouslySetInnerHTML={{ __html: heroBlurb.html}} />
        </div>
      </div>
      {children}
    </StandardLayout>
  )
}

export default FrontpageLayout
