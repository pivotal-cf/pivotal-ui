import React from 'react';
import 'pui-css-labels';

export class Label extends React.PureComponent {
  static defaultProps = {
    className: 'label label-primary'
  };

  render() {
    const {children, ...props} = this.props;
    return <span {...props}>{children}</span>;
  }
}
