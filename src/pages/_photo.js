import React from 'react'
import PhotoLayout from '../layouts/PhotoLayout'
import Seo from '../components/Seo'

const PhotoPage = (pageData) => {
  const photo = pageData.pageContext
  const photoTitle = photo.title.text
  const url = photo.file.url
  const exif = photo.exif
  const photoDate = new Date(exif.tags.DateTimeOriginal*1000)
  const exposureTime = exif.tags.ExposureTime
  const exposureString = (exposureTime >= 1)? `${exposureTime}s` : `1/${1/exposureTime}s`

  return (<PhotoLayout>
    <Seo title={photoTitle} />
    <article>
      <img src={url} alt={photoTitle} className="Photo--full" />
      <header>
        <h1>{photoTitle}</h1>
        <ul>
          <li>Focal length: {exif.tags.FocalLength}mm</li>
          <li>Apeture: f/{exif.tags.FNumber}mm</li>
          <li>Shutter speed: {exposureString}</li>
          <li>Taken: <time dateTime={photoDate.toUTCString()}>{photoDate.toLocaleDateString()}</time></li>
        </ul>
        {exif.tags.Model}
      </header>
      <p dangerouslySetInnerHTML={{__html: photo.description.html}} />
    </article>
  </PhotoLayout>)
}

export default PhotoPage
