const mapAst = require('./map-ast');
const generateImportStatements = require('./generate-import-statements');
const transformCodeBlock = require('./transform-code-block');

module.exports = remarkData => {
  const {frontmatter} = remarkData.markdownNode;

  remarkData.markdownAST.children.push(
    ...generateImportStatements(frontmatter)
  );

  remarkData.markdownAST = mapAst(remarkData.markdownAST, node => {
    if (node.type === 'code') {
      return transformCodeBlock(node);
    }
  });
};