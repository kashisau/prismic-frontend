import React from 'react'
import PhotoLayout from '../layouts/PhotoLayout'
import Seo from '../components/Seo'
import PhotoStage from '../components/PhotoStage';

const PhotoPage = (pageData) => {
  const photo = pageData.pageContext
  const photoTitle = photo.title.text

  return (<PhotoLayout>
    <Seo title={photoTitle} />
    <PhotoStage photo={photo} />
  </PhotoLayout>)
}

export default PhotoPage
