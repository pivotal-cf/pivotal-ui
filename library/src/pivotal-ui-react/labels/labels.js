import React from 'react';
import {mergeProps} from 'pui-react-helpers';
import 'pui-css-labels';

export class Label extends React.Component {
  static defaultProps = {
    className: 'label label-primary'
  }

  render() {
    const {children, ...props} = this.props;
    return <span {...props}>{children}</span>;
  }
}
