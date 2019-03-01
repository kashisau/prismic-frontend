import React from 'react'
import { graphql } from 'gatsby'
import Seo from '../components/Seo'
import PhotosIndexLayout from '../layouts/PhotosIndexLayout'
import StandardLayout from '../layouts/StandardLayout'
import AspectRatio from '../services/AspectRatio'

const PhotosPage = ({data}) => {
  const photos = data.allPrismicPhoto.edges.reduce((photos, edge) => {
    const photoData = edge.node.data;
    const url = photoData.photo_file.url
    const slug = edge.node.slugs[0];
    const imageExif = photoData.photo_file.localFile.fields.exif
    const imageSize = { width: imageExif.exif.PixelXDimension, height: imageExif.exif.PixelYDimension }
    const aspectRatio = AspectRatio.getAspectRatio(imageSize)

    const photo = {
      title: photoData.title,
      description: photoData.photo_description,
      aspectRatio,
      file: photoData.photo_file,
      url: url,
      slug: slug,
      exif: imageExif
    };

    photos.push(photo);
    return photos;
  }, []);

  photos.sort((photoA, photoB) => {
    const photoADate = new Date(photoA.exif.exif.DateTimeOriginal)
    const photoBDate = new Date(photoB.exif.exif.DateTimeOriginal)
    return photoADate - photoBDate
  })

  return (
    <StandardLayout
      title="There was movement at the station for the word had passed around that the colt from Old Regret had got away."
      subtitle="Photos">
      <PhotosIndexLayout photos={photos}></PhotosIndexLayout>
      <Seo title="Photos" description="A collection of photos by Kashi Samaraweera" />
    </StandardLayout>
  )
}

export const query = graphql`
  fragment childImageSharpFluid on ImageSharpFluid {
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
  }
`

export default PhotosPage
