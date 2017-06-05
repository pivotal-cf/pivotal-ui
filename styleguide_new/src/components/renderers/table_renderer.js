import React, {Component} from 'react';

export default class TableRenderer extends Component {
  render() {
    const {children, ...props} = this.props;

    return (
      <table {...props} {...{className: 'table'}}>
        {children.filter(child => child !== '\n')}
      </table>
    );
  }
}