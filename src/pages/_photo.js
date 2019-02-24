import React from 'react'
import PhotoLayout from '../layouts/PhotoLayout'
import StandardLayout from '../layouts/StandardLayout'
import Seo from '../components/Seo'
import PhotoStage from '../components/PhotoStage';
import { ago } from 'time-ago'

const PhotoPage = (pageData) => {
  const photo = pageData.pageContext
  const photoTitle = photo.title.text
  const photoDate = new Date(photo.exif.exif.DateTimeOriginal)

  return (
  <StandardLayout
    title={photoTitle}
    subtitle={ago(photoDate)}
    >
    <PhotoLayout>
      <Seo title={photoTitle} />
      <PhotoStage photo={photo} />
    </PhotoLayout>
  </StandardLayout>)
}

export default PhotoPage
