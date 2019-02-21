import React from 'react'
import Header from '../../components/Header'

import styles from './frontpage-layout.module.css'

class FrontpageLayout extends React.Component {

  articleRef = React.createRef();

  shadow = mouseEvent => {
    const article = this.articleRef.current;

    const mediaQueryMatches = window.matchMedia('screen and (min-width: 768px)');
    if ( ! mediaQueryMatches.matches) {
      article.style.boxShadow = "";
      article.style.transform = "";
      return;
    }

    const { clientX: x, clientY: y } = mouseEvent;
    if (!x || !y) return;

    const articleRect = article.getBoundingClientRect()
    const { top, right, bottom, left } = articleRect;

    const width = right - left;
    const height = bottom - top;

    const centreX = (left + right) / 2;
    const centreY = (top + bottom) / 2;
    const deltaX = x - centreX;
    const deltaY = y - centreY;

    const ratioX = Math.round(deltaX / (width/2) * 100) / 100;
    const ratioY = Math.round(deltaY / (height/2) * 100) / 100;

    const shadowX = ratioX*20;
    const shadowY = ratioY*20;
    const boxShadowString = `${-shadowX}px ${-shadowY}px 60px rgba(0,0,0,0.5)`;
    article.style.boxShadow = boxShadowString;

    const rotateX = ratioX * 2;
    const rotateY = ratioY * 2;
    const rotateXString = `rotateX(${-rotateX}deg)`;
    const rotateYString = `rotateY(${-rotateY}deg)`;
    article.style.transform = `${rotateXString} ${rotateYString}`;
  }

  componentDidMount() {
    window.addEventListener('resize', this.shadow);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.shadow);
  }

  render() {
    const { children, body, title, subtitle } = this.props;
    return (
      <article
        className={styles.PageMain}
        onMouseMove={this.shadow}
        ref={this.articleRef}>
        <Header siteTitle={title} subtitle={subtitle} />
        <section className={styles.mainBody} dangerouslySetInnerHTML={{ __html: body}} />
        {children}
      </article>
    )
  }
}

export default FrontpageLayout
