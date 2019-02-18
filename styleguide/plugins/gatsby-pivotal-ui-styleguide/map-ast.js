const transformNode = (node, index, parent, callback) => {
  const {children} = node;
  const transformed = callback(node, index, parent);
  const newNode = transformed ? {...transformed} : node;

  if (children) {
    newNode.children = children.map((child, i) => {
      return transformNode(child, i, node, callback);
    });
  }

  return newNode;
};

module.exports = (markdownAst, transform) => {
  return transformNode(markdownAst, null, null, transform);
};