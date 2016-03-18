const React = require('react');
const {PropTypes} = React;
const ReactFaIcon = require('react-fa/lib/Icon');
const objectAssign = require('object-assign');
const classnames = require('classnames');
require('pui-css-iconography');

class Icon extends React.Component {
  render() {
    const {size, className, ...props} = this.props;

    const classes = classnames(className, {[`fa-${size}`]: size});

    return (<ReactFaIcon className={classes} {...props} />);
  }
}

function satisfiesOneOf(...propTypes) {
  return function(props, propName, componentName) {
    var error;
    var errorMessages = [];
    for (var propType of propTypes) {
      error = propType(props, propName, componentName);
      if (!error) {
        return null;
      } else {
        errorMessages.push(error.message);
      }
    }

    return new Error(`Failed to satisfy any of the possible requirements:\n  ${errorMessages.join('\n  ')}`);
  };
}

Icon.propTypes = objectAssign({}, ReactFaIcon.propTypes, {
  size: satisfiesOneOf(
    ReactFaIcon.propTypes.size,
    PropTypes.oneOf([ 'title', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'sm', 'xs' ])
  )
});

module.exports = {
  Icon: Icon
};
