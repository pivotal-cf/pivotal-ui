import React from 'react';
import classnames from 'classnames';
import 'pui-css-tooltips';

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
