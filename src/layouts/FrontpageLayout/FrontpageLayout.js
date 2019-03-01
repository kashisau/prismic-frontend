import React from 'react'
import StandardLayout from '../StandardLayout';

import styles from './frontpage-layout.module.css'

const FrontpageLayout = ({children}) => {
  return (
    <StandardLayout>
      <div className={styles.heroBack}>
        <div className={styles.hero}>
          <p className={styles.blurb}>During the whole of a dull, dark, and soundless day in the autumn of the year, when the clouds hung oppressively low in the heavens...</p>
        </div>
      </div>
      {children}
    </StandardLayout>
  )
}

export default FrontpageLayout
