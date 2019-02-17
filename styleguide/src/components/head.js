import React from 'react';
import Helmet from 'react-helmet';
import {StaticQuery, graphql} from 'gatsby';
import favicon from '../../static/favicon.ico';

const link = [{
  rel: 'shortcut icon', type: 'image/ico', href: favicon
}];

const buildMeta = (title, description, siteMetadata, keywords, meta) => [
  {name: 'description', content: description},
  {property: 'og:title', content: title},
  {property: 'og:description', content: description},
  {property: 'og:type', content: 'website'},
  {name: 'twitter:card', content: 'summary'},
  {name: 'twitter:creator', content: siteMetadata.author},
  {name: 'twitter:title', content: title},
  {name: 'twitter:description', content: description},
  keywords.length && {name: 'keywords', content: keywords.join(', ')},
  ...meta
].filter(Boolean);

function Head({description, lang, meta, keywords, title}) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const {siteMetadata} = data.site;
        const metaDescription = description || siteMetadata.description;

        return (
          <Helmet
            htmlAttributes={{lang}}
            title={title}
            titleTemplate={`%s | ${siteMetadata.title}`}
            link={link}
            meta={buildMeta(title, metaDescription, siteMetadata, keywords, meta)}
          />
        );
      }}
    />
  );
}

Head.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: []
};

export default Head;

const detailsQuery = graphql`
  query DefaultHeadQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`;
