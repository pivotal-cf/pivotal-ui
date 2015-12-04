var React = require('react');
import {mergeProps} from 'pui-react-helpers';

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
 */
var Label = React.createClass({
  render() {
    let defaultProps = {
      className: ['label', 'label-primary']
    };
    let {children, ...others} = this.props;
    let props = mergeProps(others, defaultProps);
    return <span {...props}>{children}</span>;
  }
});

module.exports = {Label};
