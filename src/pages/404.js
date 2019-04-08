import React from 'react'

import StandardLayout from '../layouts/StandardLayout'
import Seo from '../components/Seo'

const NotFoundPage = () => (
  <StandardLayout title="404: Not found">
    <Seo title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </StandardLayout>
)

export default NotFoundPage
