import classnames from 'classnames';
import {mergeProps} from 'pui-react-helpers';
import React from 'react';
import 'pui-css-forms';

const types = React.PropTypes;

class SelectFancy extends React.Component {
  static propTypes = {
    disabled: types.bool
  };

  render() {
    const {disabled} = this.props;
    const {className, style, ...props} = mergeProps(this.props, {className: classnames('select-fancy', {disabled})});
    return (<div {...{className, style}}><select {...props} className="form-control"/></div>);
  }
}

module.exports = {SelectFancy};
