const path = require('path')
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  console.log("Creating pages!");
  return new Promise((resolve, reject) => {
    const photoFrame = path.resolve(`src/components/PhotoFrame/PhotoFrame.js`)
    // Query for markdown nodes to use in creating pages.
    resolve(
      graphql(`query SitePhotoListQuery {
        allPrismicPhoto {
          edges {
            node {
              id
              slugs
              data {
                
                title {
                  text
                }
                photo_description {
                  html
                }
                photo_file {
                  Prethumb {
                    url
                  }
                  url
                }
                instagram {
                  url
                }
              }
            }
          }
        }
      }`).then(result => {
        if (result.errors) {
          reject(result.errors)
        }
        const photoNodes = result.data.allPrismicPhoto.edges;

        // Create pages for each markdown file.
        photoNodes.forEach(({ node: photo }) => {
          console.log("photo: ", photo);
          const { id, slugs, data } = photo;
          const path = slugs[0]
          const photoData = {
            id,
            slug: path,
            title: data.title,
            description: data.photo_description,
            file: data.photo_file,
            instagram: data.instagram
          }
          createPage({
            path,
            component: photoFrame,
            // In your blog post template's graphql query, you can use path
            // as a GraphQL variable to query for data from the markdown file.
            context: {
              path,
              ...photoData
            },
          })
        })
      })
    )
  })
}
