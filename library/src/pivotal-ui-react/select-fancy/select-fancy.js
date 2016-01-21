import classnames from 'classnames';
import {mergeProps} from 'pui-react-helpers';
import React from 'react';

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
