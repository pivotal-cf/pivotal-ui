const path = require('path');
const {createFilePath} = require('gatsby-source-filesystem');

const pageTemplate = path.resolve(__dirname, './src/components/page.js');

exports.onCreateNode = ({node, getNode, actions}) => {
  if (node.internal.type === 'MarkdownRemark') {
    const route = createFilePath({node, getNode});
    const group = route.split('/')[1];

    actions.createNodeField({node, name: 'route', value: route});
    actions.createNodeField({node, name: 'group', value: group});
  }
};

exports.createPages = ({graphql, actions}) => {
  return new Promise((resolve, reject) => {
    graphql(
      `{
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              fields {
                route
              }
            }
          }
        }
      }`
    ).then(result => {
      if (result.errors) reject(result.errors);

      result.data.allMarkdownRemark.edges.forEach(({node}) => {
        actions.createPage({
          path: node.fields.route,
          component: pageTemplate,
          context: {}
        });
      });

      resolve();
    });
  });
};

exports.onCreateWebpackConfig = ({actions}) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          // PUI CSS files (.css) are generated when PUI is built for
          // production - they're not available during development.
          // Here, we tell Webpack to not try to load the CSS. Instead,
          // we import PUI .scss files directly elsewhere.
          test: /\/src\/css\/.*index.js$/,
          use: 'null-loader'
        }
      ]
    }
  });
};