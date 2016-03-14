const shallowCompare = require('react-addons-shallow-compare');

module.exports = function(ParentClass) {
  return class ShallowCompare extends ParentClass {
    shouldComponentUpdate(nextProps, nextState) {
      return shallowCompare(this, nextProps, nextState);
    }
  };
};