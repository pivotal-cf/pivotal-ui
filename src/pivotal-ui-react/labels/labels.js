var React = require('react');

/**
 * @component Label
 * @description Highlighted pill of text
 *
 * @example ```js
 * var Label = require('pui-react-labels').Label;
 * var MyComponent = React.createClass({
 *   render() {
 *     return <Label>New</Label>;
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react_beta.html#label_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#label)
 */
var Label = React.createClass({
  render() {
    return <span className="label label-primary">{this.props.children}</span>;
  }
});

module.exports = {Label};
