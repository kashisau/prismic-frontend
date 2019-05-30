import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

const Seo = ({ siteMetadata, title, description, author, keywords, children }) => {
  const siteMetadataObj = siteMetadata.allPrismicSiteMetadata.edges["0"].node.data;
  const ogImageFile = siteMetadata.allFile.edges["0"].node.publicURL;
  const siteDomainEnv = process.env.SITE_DOMAIN || 'https://kashis.com.au';

  const { site_name: titleObj, site_description: descriptionObj, keywords: keywordsObj, author: authorObj } = siteMetadataObj;

  const siteTitle = titleObj.text;
  const siteDescription = descriptionObj.text;
  const siteKeywords = keywordsObj;
  const siteAuthor = authorObj.text;

  const titleTag = title || siteTitle;
  const descriptionTag = description || siteDescription;
  const authorTag = author || siteAuthor;
  const keywordsTag = keywords || siteKeywords;

  const lang = "en-AU";

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={titleTag}
      meta={[
        {
          name: 'description',
          content: descriptionTag,
        },
        {
          property: 'og:title',
          content: titleTag,
        },
        {
          property: 'og:description',
          content: descriptionTag,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:image',
          content: `${siteDomainEnv}${ogImageFile}`,
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: authorTag,
        },
        {
          name: 'twitter:title',
          content: titleTag,
        },
        {
          name: 'twitter:description',
          content: descriptionTag,
        },
        {
          property: 'thubnail',
          content: `${siteDomainEnv}${ogImageFile}`,
        }
      ]
        .concat(
          keywordsTag.length > 0
            ? {
                name: 'keywords',
                content: keywordsTag.join(', '),
              }
            : []
        )}
    >
    {children}
    </Helmet>
  )
}

const query = graphql`
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
          author {
            text
          }
        }
      }
    }
  }
  allFile(filter: {name: { eq :"og-image" }}) {
    edges {
      node {
        publicURL
      }
    }
  }
}
`

export default props => (
  <StaticQuery
    query={query}
    render={siteMetadata => <Seo siteMetadata={siteMetadata} {...props} />}
  />
)

