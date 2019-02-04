import React from 'react'
import PhotoLayout from '../layouts/PhotoLayout'
import Seo from '../components/Seo'

const PhotoPage = (pageData) => {
  const photo = pageData.pageContext
  const photoTitle = photo.title.text
  const url = photo.file.url
  return (<PhotoLayout>
    <Seo title={photoTitle} />
    <article>
      <img src={url} alt={photoTitle} className="Photo--full" />
      <header>
        <h1>{photoTitle}</h1>
      </header>
      <p dangerouslySetInnerHTML={{__html: photo.description.html}} />
    </article>
  </PhotoLayout>)
}

export default PhotoPage
