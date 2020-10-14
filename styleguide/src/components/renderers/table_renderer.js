import React, {Component} from 'react';
import classnames from 'classnames';

export default class TableRenderer extends Component {
  render() {
    const {className, ...props} = this.props;
    let {children} = this.props;

    children = children.filter(child => child !== '\n');

    return (
      <table {...props} {...{
        className: classnames(
          className,
          'table',
          'markdown-table',
          {'props-table': children[0].props.children[0].props.children[0].props.children[0] === 'Property'}
        )
      }}>
        {children}
      </table>
    );
  }
}