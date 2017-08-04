import React from 'react';

import PropTypes from 'prop-types';

export class Tab extends React.PureComponent {
  static propTypes = {
    'aria-labelledby': PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    eventKey: PropTypes.any,
    onEntered: PropTypes.func,
    onExited: PropTypes.func,
    tabClassName: PropTypes.string,
    title: PropTypes.node.isRequired
  };

  static defaultProps = {
    onEntered() {},
    onExited() {}
  };

  render() {
    return null;
  }
}
