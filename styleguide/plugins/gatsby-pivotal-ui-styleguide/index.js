const visit = require('unist-util-visit');
const generateImportStatements = require('./generate_import_statements');

module.exports = ({markdownAST, markdownNode}) => {
  const {fields, frontmatter} = markdownNode;

  markdownAST.children.push(...generateImportStatements(frontmatter));
};