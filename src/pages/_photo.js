import React from 'react'
import Header from '../components/Header'
import PhotoLayout from '../layouts/PhotoLayout'
import Seo from '../components/Seo'

const PhotoPage = (pageData) => {
  const photo = pageData.pageContext
  const photoTitle = photo.title.text

  return (<PhotoLayout>
    <Seo title={photoTitle} />
    <Header siteTitle={photoTitle} />
    <article>
      <p dangerouslySetInnerHTML={{__html: photo.description.html}} />
      <img src={photo.file.url} alt={photoTitle} className="Photo--full" />
    </article>
  </PhotoLayout>)
}

export default PhotoPage
