const path = require('path')
const fetch = require('node-fetch')
const ExifParser = require('exif-parser')
const AspectRatio = require('./src/services/AspectRatio/AspectRatio')
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const photoHeaderRequestSettings = {
  redirect: "follow",
  cache: "no-cache",
  headers: {
    "Content-Type": "image/jpeg",
    "Range": "bytes=0-65536"
  }
}

exports.createPages = async ({ graphql, actions, createNodeId, store, cache }) => {
  const { createPage, createNode } = actions
  const photoPage = path.resolve(`src/pages/_photo.js`)
  const photoQuery = await graphql(
      `fragment childImageSharpFluid on ImageSharpFluid {
        base64
        aspectRatio
        src
        srcSet
        srcWebp
        srcSetWebp
        sizes
      }

      query SitePhotoListQuery {
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
                  localFile {
                    childImageSharp {
                      fluid(maxWidth: 2560) {
                        ...childImageSharpFluid
                      }
                    }
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
      }`)

  const photoNodes = photoQuery.data.allPrismicPhoto.edges;
  const photoPages = []

  const resolvePhoto = async ({ node }) => {
    const { id, slugs, data } = node;
    const url = data.photo_file.url
    const path = slugs[0]

    const photoHeader = await fetch(url, photoHeaderRequestSettings)
    const photoBuffer = await photoHeader.buffer()
    const imagePartial = ExifParser.create(photoBuffer)
    const imageExif = imagePartial.parse()
    const imageSize = imageExif.imageSize
    const aspectRatio = AspectRatio.getAspectRatio(imageSize)

    const remoteFileNode = await createRemoteFileNode({
      // The source url of the remote file
      url,
      store,
      cache,
      createNode,
      createNodeId,
    })

    const photoData = {
      id,
      slug: path,
      exif: imageExif,
      title: data.title,
      aspectRatio,
      description: data.photo_description,
      file: data.photo_file,
      photoNodeId: remoteFileNode.id,
      instagram: data.instagram
    }

    createPage({
      path,
      component: photoPage,
      context: {
        ...photoData
      },
    })
  }

  photoNodes.forEach(photo => photoPages.push(resolvePhoto(photo)))
  return Promise.all(photoPages)
}
