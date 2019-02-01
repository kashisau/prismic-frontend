import React from 'react'
import './photo-frame.css'
const PhotoFrame = (pageData) => {
  const photo = pageData.pageContext
  return (<div>
    <h1>{photo.title.text}</h1>
    <p dangerouslySetInnerHTML={{__html: photo.description.html}} />
    <img src={photo.file.url} alt={photo.title} />
  </div>);
}

export default PhotoFrame
