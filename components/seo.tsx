import React from 'react'
import Head from 'next/head'

import Banner from '../images/create-resume-banner.png'

interface Props {
  title?: string
  description?: string
  image?: string
  type?: string
  // twitterCreator: string
}

const urlBase = 'https://createresu.me'

const defaults = {
  title: 'Create Resume',
  description: 'Free, Private, Simple PDF Resume Generator',
  image: Banner.src,
  type: 'website',
  // twitterCreator: ''
}

const SEO: React.FC<Props> = ({ description, title, image, type }) => {
  const fullTitle = title ? `${title} | ${defaults.title}` : defaults.title

  const metaDescription = description || defaults.description
  const metaImage = `${urlBase}${image || defaults.image}`

  return (
    <Head>
      <title>{fullTitle}</title>

      <link rel="icon" href="/favicon.ico" />

      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={fullTitle} key="title" />
      <meta property="og:description" content={metaDescription} key="og:description" />
      <meta property="og:image" content={metaImage} key="og:image" />
      <meta property="og:site_name" content={defaults.title} key="og:site_name" />
      <meta property="og:type" content={type || defaults.type} key="og:type" />
      <meta property="twitter:card" content="summary_large_image" key="twitter:card" />
      {/* Future: add twitter handle? */}
      {/* {defaults.twitterCreator && <meta property="twitter:creator" content={defaults.twitterCreator} key="twitter:creator" />} */}
    </Head>
  )
}

export default SEO
