import React from 'react';
import {StaticQuery, graphql} from 'gatsby';
import Sidebar from './sidebar';
import {headingTextToSlug} from '../helpers/markdown_utils';

const SidebarQuery = graphql`
  query SidebarQuery {
    site {
      siteMetadata {
        sidebarGroups { id label }
      }
    }
    allMarkdownRemark(limit: 1000) {
      edges {
        node {
          fields { route group }
          frontmatter { title weight }
          headings(depth: h2) { value }
        }
      }
    }
  }
`;

const collectPages = ({allMarkdownRemark: {edges}}) => edges.map(({node}) => {
  const {
    fields: {route, group},
    frontmatter: {title, weight},
    headings
  } = node;

  const sections = headings.map(({value}) => ({
    title: value,
    route: `${route}#${headingTextToSlug(value)}`
  }));

  return {route, group, title, weight: parseInt(weight || 0, 10), sections};
}).sort((a, b) => {
  if (a.weight === b.weight) return a.title.localeCompare(b.title);
  return b.weight - a.weight;
});

const renderSidebar = data => {
  return (
    <Sidebar
      pages={collectPages(data)}
      groups={data.site.siteMetadata.sidebarGroups}
    />
  );
};

const SidebarWrapper = () => (
  <StaticQuery
    query={SidebarQuery}
    render={renderSidebar}
  />
);

export default SidebarWrapper;
