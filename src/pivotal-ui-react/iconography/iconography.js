module.exports = {
  /**
   * @component Icon
   * @description Inserts a Font Awesome icon
   *
   * @property name {String} The name of the icon (without the fa- prefix)
   *
   * @example ```js
   * var Icon = require('pui-react-iconography').Icon;
   * var MyComponent = React.createClass({
   *   render() {
   *     return <Icon name="plus"/>;
   *   }
   * });
   * ```
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react_beta.html#icon_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#iconography)
   */
  Icon: require('react-fa/dist/Icon')
};