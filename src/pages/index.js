import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../layouts/layout'
import SEO from '../components/seo'

const IndexPage = ({data}) => {
  const homepageData = data.allPrismicHomePage.edges[0].node.data;
  const { title, subtitle, body } = homepageData;

  return (<Layout siteTitle={title.text}>
    <h2>{subtitle.text}</h2>
    <div dangerouslySetInnerHTML={{ __html: body.html}} />
    <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
  </Layout>)
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
