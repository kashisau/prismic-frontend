import React from 'react'
import { graphql } from 'gatsby'
import Header from '../components/Header'
import Seo from '../components/Seo'
import PhotoThumb from '../components/PhotoThumb'
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
      const responsiveImages = photoData.photo_file
      const slug = edge.node.slugs[0];
      const exifResolved = getExifFromUrl(url);

      const photo = {
        title: photoData.title,
        description: photoData.photo_description,
        url: url,
        responsiveImages: responsiveImages,
        slug: slug,
        exif: exifResolved,
        prethumb: photoData.photo_file.Prethumb.url
      };

      photos.push(photo);
      return photos;
    }, []);
  }

  render() {
    const { photos } = this.state
    const photoThumbs = photos.map((photo, i) => <PhotoThumb key={i} {...photo} />);

    return (<PhotosIndexLayout>
      <Seo title="Photos" description="A collection of photos by Kashi Samaraweera" />
      <Header siteTitle="Photos" subtitle="shutterbug" />
      <section className="MainBody">
        {photoThumbs}
      </section>
    </PhotosIndexLayout>)
  }
}

export const query = graphql`
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
}
`

export default PhotosPage
