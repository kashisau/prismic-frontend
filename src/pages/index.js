import React from 'react'
import { graphql } from 'gatsby'

import FrontpageLayout from '../layouts/FrontpageLayout'
import Seo from '../components/Seo'

const IndexPage = ({data}) => {
  const homepageData = data.allPrismicHomePage.edges[0].node.data;
  const homepageWorkData = data.allPrismicWork.edges.reduce((works, workEdge) => { works.push(workEdge.node.data); return works; }, []);
  const { title, hero_blurb: heroBlurb, subtitle, body } = homepageData;

  return (
    <>
    <Seo title={`${title.text} — ${subtitle.text}`} />
    <FrontpageLayout {...homepageData} featuredWorks={homepageWorkData}>
      <section dangerouslySetInnerHTML={{ __html: body.html}} />
    </FrontpageLayout>
    </>
  )
}

export const query = graphql`
  fragment childImageSharpFluid on ImageSharpFluid {
    base64
    aspectRatio
    src
    srcSet
    srcWebp
    srcSetWebp
    sizes
  }
      
  query HomePageQuery {
    allPrismicHomePage {
      edges {
        node {
          id
          first_publication_date
          last_publication_date
          data {
            title {
              text
            }
            subtitle {
              text
            }
            hero_blurb {
              html
            }
            body {
              html
            }
            hero_title {
              text
            }
            hero_subtitle {
              text
            }
            hero_article_blurb {
              html
            }
            hero_link {
              url
            }
            hero_content {
              document {
                data {
                  title {
                    text
                  }
                  photo_description {
                    html
                  }
                  photo_file {
                    localFile {
                      childImageSharp {
                        fluid(maxWidth: 1024) {
                          ...childImageSharpFluid
                        }
                      }
                    }
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
    allPrismicWork {
      edges {
        node {
          id
          first_publication_date
          last_publication_date
          data {
            title {
              text
            }
            org {
              text
            }
            blurb {
              html
            }
            product_image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1024) {
                    ...childImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export default IndexPage
