import React, {Fragment} from 'react';
import {graphql} from 'gatsby';
import {Icon} from '../../../src/react/iconography';
import {Grid, FlexCol} from '../../../src/react/flex-grids';
import {WarningAlert} from '../../../src/react/alerts';
import Head from './head';
import renderMarkdown from '../helpers/render_markdown';
import '../../stylesheets/page.scss';

export default function Page({data}) {
  const {markdownRemark: pageData, site: {siteMetadata}} = data;
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
    <Fragment>
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
    </Fragment>
  );
}

export const pageQuery = graphql`
  query DocPageByPath($path: String!) {
    site {
      siteMetadata {
        repoUrl
        sidebarGroups { id label }
      }
    }
    markdownRemark(fields: { route: { eq: $path } }) {
      htmlAst
      fields { route group }
      frontmatter { title deprecationMessage }
    }
  }
`;
