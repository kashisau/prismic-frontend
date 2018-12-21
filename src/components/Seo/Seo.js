import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

const Seo = ({ data }) => {
  const siteMetadata = data.allPrismicSiteMetadata.edges[0].node.data;
  const { site_name: titleObj, site_description: descriptionObj, keywordsObj } = siteMetadata;
  const title = titleObj.text;
  const description = descriptionObj.text;
  const keywords = keywordsObj;
  const lang = "en-AU";

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${data.site.siteMetadata.title}`}
      meta={[
        {
          name: 'description',
          content: description,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: description,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: data.site.siteMetadata.author,
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: description,
        },
      ]
        .concat(
          keywords.length > 0
            ? {
                name: 'keywords',
                content: keywords.join(', '),
              }
            : []
        )}
    />
  )
}

export default props => (
  <StaticQuery
    query={query}
    render={data => <Seo data={data} {...props} />}
  />
)

export const query = graphql`
query SiteMetatdataQuery {
  allPrismicSiteMetadata {
    edges {
      node {
        data {
          site_name {
            text
          }
          site_description {
            text
          }
          keywords {
            text
          }
        }
      }
    }
  }
}
`
