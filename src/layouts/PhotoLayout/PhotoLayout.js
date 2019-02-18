import React from 'react'
import './photo-layout.css'

class PhotoLayout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <section className="PageMain">
      {children}
      </section>
    );
  }
}

export default PhotoLayout
