module.exports = function(context) {
  return {
    MemberExpression: function(node) {
      if (node.property.name === 'assign' && node.object.name === 'Object') {
        context.report(node, 'Found Object.assign')
      }
    }
  };
};
