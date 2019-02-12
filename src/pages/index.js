import React from 'react'
import { graphql } from 'gatsby'
import Header from '../components/Header'
import FrontpageLayout from '../layouts/FrontpageLayout'
import Seo from '../components/Seo'

const IndexPage = ({data}) => {
  const homepageData = data.allPrismicHomePage.edges[0].node.data;
  const { title, subtitle, body } = homepageData;

  return (<FrontpageLayout>
    <Seo title={title.text} />
    <Header siteTitle={title.text} subtitle={subtitle.text} />
    <section className="MainBody" dangerouslySetInnerHTML={{ __html: body.html}} />
  </FrontpageLayout>)
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
