import React, {PureComponent} from 'react';
import classnames from 'classnames';

export default class TableRenderer extends PureComponent {
  render() {
    const {className, ...props} = this.props;
    const thead = this.props.children.find(child => child.type === 'thead');
    const tbody = this.props.children.find(child => child.type === 'tbody');

    return (
      <table {...props} {...{className: classnames(className, 'table', 'md-table')}}>
        <thead>
          {React.Children.map(thead.props.children, child => {
            return React.cloneElement(child, {className: 'tr-no-h-borders bg-neutral-10'});
          })}
        </thead>
        <tbody>
          {React.Children.map(tbody.props.children, child => {
            return React.cloneElement(child, {className: 'tr-no-h-borders'});
          })}
        </tbody>
      </table>
    );
  }
}