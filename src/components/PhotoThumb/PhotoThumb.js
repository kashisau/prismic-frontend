import React from 'react'

const PhotoThumb = ({prethumb, title, className}) => {
  return (
    <img className={className} src={prethumb} alt={title.text} />
  )
}

export default PhotoThumb
