const React = require('react');
const {PropTypes} = React;
const ReactFaIcon = require('react-fa/dist/Icon');
const objectAssign = require('object-assign');

class Icon extends React.Component {
  render() {
    const {size, className, ...props} = this.props;

    return (<ReactFaIcon className={`${className} fa-${size}`.trim()} {...props} />);
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
  /**
   * @component Icon
   * @description Inserts a Font Awesome icon
   *
   * @property name {String} The name of the icon (without the fa- prefix)
   * @property size {String} Can either be a PUI typography size (title, h1,
   * h2, h3, h4, h5, h6, sm, xs) or a FA size (lg, 2x, 3x, 4x, 5x).
   *
   * @example ```js
   * var Icon = require('pui-react-iconography').Icon;
   * var MyComponent = React.createClass({
   *   render() {
   *     return <Icon name="plus" size="h5"/>;
   *   }
   * });
   * ```
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react_beta.html#icon_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#iconography)
   */
  Icon: Icon
};
