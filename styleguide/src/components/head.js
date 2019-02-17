import React from 'react';
import Helmet from 'react-helmet';
import {siteMetadata} from '../../gatsby-config';
import favicon from '../../static/favicon.ico';

const link = [{
  rel: 'shortcut icon', type: 'image/ico', href: favicon
}];

const Head = ({title, description, lang = 'en', meta = [], keywords = []}) => {
  const metaDescription = description || siteMetadata.description;

  const fullMeta = [
    {name: 'description', content: metaDescription},
    {property: 'og:title', content: title},
    {property: 'og:description', content: metaDescription},
    {property: 'og:type', content: 'website'},
    {name: 'twitter:card', content: 'summary'},
    {name: 'twitter:creator', content: siteMetadata.author},
    {name: 'twitter:title', content: title},
    {name: 'twitter:description', content: metaDescription},
    keywords.length && {name: 'keywords', content: keywords.join(', ')},
    ...meta
  ].filter(Boolean);

  return (
    <Helmet
      htmlAttributes={{lang}}
      title={title}
      titleTemplate={`%s | ${siteMetadata.title}`}
      link={link}
      meta={fullMeta}
    />
  );
};

export default Head;
