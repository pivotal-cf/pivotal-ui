import puiPackage from '../../package.json';

export const siteMetadata = {
  title: 'Pivotal UI',
  description: 'Style guide for Pivotal UI, Pivotal\'s design system',
  author: 'Pivotal',
  repoUrl: puiPackage.homepage,
  version: puiPackage.version,
  sidebarGroups: [
    {id: 'about', label: 'About'},
    {id: 'concepts', label: 'Concepts'},
    {id: 'tools', label: 'Tools'},
    {id: 'modifiers', label: 'Modifiers'},
    {id: 'components', label: 'Components'},
    {id: 'guides', label: 'Guides'}
  ]
};

export const plugins = [
  'gatsby-plugin-sass',
  'gatsby-plugin-react-helmet',
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'docs',
      path: `${__dirname}/../../docs`
    }
  },
  {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [
        'gatsby-pivotal-ui-styleguide'
      ]
    }
  }
];