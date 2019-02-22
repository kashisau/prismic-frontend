import React from 'react'
import PhotoLayout from '../layouts/PhotoLayout'
import StandardLayout from '../layouts/StandardLayout'
import Seo from '../components/Seo'
import PhotoStage from '../components/PhotoStage';

const PhotoPage = (pageData) => {
  const photo = pageData.pageContext
  const photoTitle = photo.title.text

  return (
  <StandardLayout
    title={photoTitle}
    subtitle="Photo"
    >
    <PhotoLayout>
      <Seo title={photoTitle} />
      <PhotoStage photo={photo} />
    </PhotoLayout>
  </StandardLayout>)
}

export default PhotoPage
