import React from 'react'
import { graphql } from 'gatsby'
import StandardLayout from '../layouts/StandardLayout'
import Seo from '../components/Seo'

const IndexPage = ({data}) => {
  const homepageData = data.allPrismicHomePage.edges[0].node.data;
  const { title, subtitle, body } = homepageData;

  return (
    <StandardLayout
    title={title.text}
    subtitle={subtitle.text}>
      <section dangerouslySetInnerHTML={{ __html: body.html}} />
      <Seo title={title.text} />
    </StandardLayout>
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
