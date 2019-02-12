const path = require('path')
const fetch = require('node-fetch')
const ExifParser = require('exif-parser')
const AspectRatio = require('./src/services/AspectRatio/AspectRatio')
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
  const requestSettings = {
    redirect: "follow",
    cache: "no-cache",
    headers: {
      "Content-Type": "image/jpeg",
      "Range": "bytes=0-65536"
    }
  }

  return new Promise((resolve, reject) => {
    const photoPage = path.resolve(`src/pages/_photo.js`)
    // Query for markdown nodes to use in creating pages.
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
                Desktop {
                  url
                }
                Phone {
                  url
                }
                Thumb {
                  url
                }
                Tablet {
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

        resolve(fetch(photoData.file.url, requestSettings)
          .then(res => res.buffer())
          .then((imagePartialArrayBuffer) => {
            try {
              const imagePartial = ExifParser.create(imagePartialArrayBuffer)
              const imageExif = imagePartial.parse()
              photoData.exif = imageExif

              const imageSize = imageExif.imageSize
              const aspectRatio = AspectRatio.getAspectRatio(imageSize)
              photoData.aspectRatio = aspectRatio

              createPage({
                path,
                component: photoPage,
                // In your blog post template's graphql query, you can use path
                // as a GraphQL variable to query for data from the markdown file.
                context: {
                  ...photoData
                },
              })
              resolve();
            } catch (error) {
              reject(error);
            }
          })
        )
      })
    })
  })
}
