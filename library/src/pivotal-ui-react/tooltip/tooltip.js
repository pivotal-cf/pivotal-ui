import React from 'react';
import classnames from 'classnames';

class Tooltip extends React.Component {
  render() {
    const {children, className, ...props} = this.props;
    return (
      <div {...{className: classnames('pui-tooltip', className), ...props}}>
        <div className="pui-tooltip-inner">{children}</div>
        <div className="pui-tooltip-caret"/>
      </div>
    );
  }
}

module.exports = {
  Tooltip
};
