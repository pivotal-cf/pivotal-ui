const path = require('path');
const puiPkg = require('../package.json');

exports.siteMetadata = {
  title: 'Pivotal UI',
  description: 'Style guide for Pivotal UI, design system and component library of Pivotal Software',
  author: 'Pivotal',
  repoUrl: puiPkg.homepage,
  version: puiPkg.version,
  sidebarGroups: [
    {id: 'about', label: 'About'},
    {id: 'concepts', label: 'Concepts'},
    {id: 'tools', label: 'Tools'},
    {id: 'modifiers', label: 'Modifiers'},
    {id: 'components', label: 'Components'},
    {id: 'guides', label: 'Guides'}
  ]
};

exports.plugins = [
  'gatsby-plugin-sass',
  'gatsby-plugin-react-helmet',
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'docs',
      path: path.resolve(__dirname, '../docs')
    }
  },
  {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [
        'gatsby-pivotal-ui-styleguide'
      ]
    }
  },
  {
    resolve: '@gatsby-contrib/gatsby-plugin-elasticlunr-search',
    options: {
      fields: ['title'],
      resolvers: {
        MarkdownRemark: {
          title: node => node.frontmatter.title,
          route: node => node.fields.route,
          group: node => (exports.siteMetadata.sidebarGroups.find(
            group => group.id === node.fields.group
          ) || {}).label
        }
      }
    }
  },
];