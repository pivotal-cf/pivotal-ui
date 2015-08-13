import classnames from 'classnames';
import {mergeProps} from 'pui-react-helpers';
import React from 'react';

/**
 * @component SelectFancy
 * @description A select with a fancy style
 *
 * @property disabled {Boolean} Whether to disable the select.
 *
 * @example ```js
 * var SelectFancy = require('pui-react-select-fancy').SelectFancy;
 * var MyComponent = React.createClass({
 *   render() {
 *     return (
 *     <SelectFancy name="my-select">
 *       <option>Fancy Option 1</option>
 *       <option>Fancy Option 2</option>
 *     </SelectFancy>
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#form_select_fancy)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/forms.html#02_form_fancy_select)
 */

const types = React.PropTypes;

var SelectFancy = React.createClass({
  propTypes: {
    disabled: types.bool
  },

  render() {
    const {disabled} = this.props;
    const {className, style, ...props} = mergeProps(this.props, {className: classnames('select-fancy', {disabled})});
    return (<div {...{className, style}}><select {...props} className="form-control"/></div>);
  }
});

module.exports = {SelectFancy};