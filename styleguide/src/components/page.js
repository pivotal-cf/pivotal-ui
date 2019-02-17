import React from 'react';
import {graphql} from 'gatsby';
import {Icon} from '../../../src/react/iconography';
import {Grid, FlexCol} from '../../../src/react/flex-grids';
import {WarningAlert} from '../../../src/react/alerts';
import Head from './head';
import renderMarkdown from '../helpers/render-markdown';
import {siteMetadata} from '../../gatsby-config';
import '../../stylesheets/page.scss';

const Page = ({data}) => {
  const {markdownRemark: pageData} = data;
  const {
    htmlAst,
    fields: {route, group},
    frontmatter: {title, deprecationMessage}
  } = pageData;

  const editUrl = `${siteMetadata.repoUrl}/edit/master/docs${route.replace(/\/$/, '.md')}`;
  const issueUrl = `${siteMetadata.repoUrl}/issues/new`;
  const pageGroup = siteMetadata.sidebarGroups.find(g => g.id === group);
  const groupLabel = pageGroup ? pageGroup.label : '';

  return (
    <>
      <Head title={title} />

      <header>
        <Grid className="styleguide-page-breadcrumbs">
          <FlexCol className="type-sm">
            {groupLabel} / {title}
          </FlexCol>
          <FlexCol fixed>
            <a className="type-underline-hover type-sm" href={editUrl} target="_blank" rel="noopener noreferrer">
              <Icon verticalAlign="baseline" src="mode_edit"/>
              <span className="mlm">Edit this page</span>
            </a>
            <a className="type-underline-hover type-sm mlxl" href={issueUrl} target="_blank" rel="noopener noreferrer">
              <Icon verticalAlign="baseline" src="github"/>
              <span className="mlm">Report an issue</span>
            </a>
          </FlexCol>
        </Grid>
        <h1 className="mvxxl pbl em-high border-bottom styleguide-h1">
          {title}
        </h1>
      </header>

      {deprecationMessage && (
        <WarningAlert className="mbxl">{deprecationMessage}</WarningAlert>
      )}

      {renderMarkdown(htmlAst)}
    </>
  );
};

export default Page;

export const pageQuery = graphql`
  query DocPageByPath($path: String!) {
    markdownRemark(fields: { route: { eq: $path } }) {
      htmlAst
      fields { route group }
      frontmatter { title deprecationMessage }
    }
  }
`;