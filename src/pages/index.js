import React from 'react'
import { graphql } from 'gatsby'

import FrontpageLayout from '../layouts/FrontpageLayout'
import Seo from '../components/Seo'

const IndexPage = ({data}) => {
  const homepageData = data.allPrismicHomePage.edges[0].node.data
  const workHero = homepageData.work_hero.document[0].data
  const featuredWorks = homepageData.featured_work[0].items.reduce(
      (works, workItem) => { works.push(workItem.work.document[0].data); return works; },
    []);
  const { title, hero_blurb: heroBlurb, subtitle, body } = homepageData;

  return (
    <>
    <Seo title={`${title.text} — ${subtitle.text}`} />
    <FrontpageLayout {...homepageData} workHero={workHero} featuredWorks={featuredWorks}>
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

fragment workItem on PrismicWork {
  data {
    title {
      text
    }
    org {
      text
    }
    company {
      text
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
    blurb {
      html
    }
    url {
      target
    }
  }
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
          work_hero {
            document {
              ...workItem
            }
          }
          featured_work: body1 {           
            items {
              work {
                document {
                  ...workItem
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
