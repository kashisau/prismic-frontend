import React from 'react'
import { Link } from 'gatsby'

const PhotoThumb = ({prethumb, title, slug}) => {
  return (
    <Link to={`/${slug}`}><img src={prethumb} alt={title} /></Link>
  )
}

export default PhotoThumb
