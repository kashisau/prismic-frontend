const path = require('path')
const fs = require('fs')
const AspectRatio = require('./src/services/AspectRatio/AspectRatio')
const fastExif = require('fast-exif');
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)


/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

if(node.internal.type === 'File') {
      const absolutePath = node.absolutePath;
      fastExif.read(absolutePath)
        .then((exifData) => {
          createNodeField({
            node,
            name: 'exif',
            value: exifData
          });
        })
        .catch((err) => console.error(err));
  }
}

/**
 * Generate individual photo pages.
 */
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

      fragment exifData on File {
        fields {
          exif {
            exif {
              PixelXDimension
              PixelYDimension
              ExposureTime
              FNumber
              FocalLength
              ISO
              DateTimeOriginal
              DateTimeDigitized
            }
            image {
              Make
              Model
              Orientation
            }
            gps {
              GPSLatitude
              GPSLatitudeRef
              GPSLongitude
              GPSLongitudeRef
              GPSAltitude
              GPSTimeStamp
              GPSDateStamp
            }
          }
        }
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
                    ...exifData
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
    const imageExif = data.photo_file.localFile.fields.exif
    const imageSize = { width: imageExif.exif.PixelXDimension, height: imageExif.exif.PixelYDimension }
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
