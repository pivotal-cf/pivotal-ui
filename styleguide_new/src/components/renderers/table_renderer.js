import React, {Component} from 'react';
import classnames from 'classnames';

export default class TableRenderer extends Component {
  render() {
    const {children, className, ...props} = this.props;

    return (
      <table {...props} {...{
        className: classnames(className, 'table', 'markdown-table')
      }}>
        {children.filter(child => child !== '\n')}
      </table>
    );
  }
}