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
  const photoPage = path.resolve(`src/pages/_photo.js`)
  const requestSettings = {
    redirect: "follow",
    cache: "no-cache",
    headers: {
      "Content-Type": "image/jpeg",
      "Range": "bytes=0-65536"
    }
  }

  return photoQuery = 
    graphql(
      `query SitePhotoListQuery {
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
    }`
    )
    .then(photoQuery => {
      const photoNodes = photoQuery.data.allPrismicPhoto.edges;
      const photoPages = []

      const resolvePhoto = async ({ node }) => {
        const { id, slugs, data } = node;
        const path = slugs[0]
        const photoData = {
          id,
          slug: path,
          title: data.title,
          description: data.photo_description,
          file: data.photo_file,
          instagram: data.instagram
        }

        const photoHeader = await fetch(photoData.file.url, requestSettings)
        const photoBuffer = await photoHeader.buffer()
        const imagePartial = ExifParser.create(photoBuffer)
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
      }

      photoNodes.forEach(photo => photoPages.push(resolvePhoto(photo)))
      return Promise.all(photoPages)
    })
  }
