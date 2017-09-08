import React from 'react';

export class Label extends React.PureComponent {
  static defaultProps = {
    className: 'label label-primary'
  };

  componentDidMount() {
    require('../../css/labels');
  }

  render() {
    const {children, ...props} = this.props;
    return <span {...props}>{children}</span>;
  }
}
