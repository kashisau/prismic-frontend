import React from 'react'
import { graphql } from 'gatsby'

import FrontpageLayout from '../layouts/FrontpageLayout'
import Seo from '../components/Seo'

const IndexPage = ({data}) => {
  const homepageData = data.allPrismicHomePage.edges[0].node.data;
  const { title, hero_blurb: heroBlurb, subtitle, body } = homepageData;

  return (
    <FrontpageLayout heroBlurb={heroBlurb}>
      <section dangerouslySetInnerHTML={{ __html: body.html}} />
      <Seo title={title.text} />
    </FrontpageLayout>
  )
}

export const query = graphql`
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
          }
        }
      }
    }
  }
`

export default IndexPage
