module.exports = function(context) {
  return {
    MemberExpression: function(node) {
      if (node.property.name === 'log' && node.object.name === 'console') {
        context.report(node, 'Found console.log')
      }
    }
  };
};
