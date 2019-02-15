import React from 'react'
import { graphql } from 'gatsby'
import Header from '../components/Header'
import Seo from '../components/Seo'
import PhotosIndexLayout from '../layouts/PhotosIndexLayout'
import PhotoExif from '../services/PhotoExif'

const { getExifFromUrl } = PhotoExif;

class PhotosPage extends React.Component {
  state = {
    photos: []
  }

  constructor(props) {
    super(props);
    this.state.photos = props.data.allPrismicPhoto.edges.reduce((photos, edge) => {
      const photoData = edge.node.data;
      const url = photoData.photo_file.url
      const slug = edge.node.slugs[0];
      const exifResolved = getExifFromUrl(url);

      const photo = {
        title: photoData.title,
        description: photoData.photo_description,
        gatsbyImage: photoData.photo_file,
        url: url,
        slug: slug,
        exif: exifResolved,
      };

      photos.push(photo);
      return photos;
    }, []);
  }

  render() {
    const { photos } = this.state

    return (<PhotosIndexLayout photos={photos}>
      <Seo title="Photos" description="A collection of photos by Kashi Samaraweera" />
      <Header siteTitle="Photos" subtitle="shutterbug" />
    </PhotosIndexLayout>)
  }
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
  }
`

export default PhotosPage
