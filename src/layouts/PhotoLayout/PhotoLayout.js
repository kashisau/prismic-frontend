import React from 'react'
import './photo-layout.css'

class PhotoLayout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <article className="PageMain">
      {children}
      </article>
    );
  }
}

export default PhotoLayout
