import BsOverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import React from 'react';
import uniqueid from 'lodash.uniqueid';
import 'pui-css-bootstrap';

const OverlayTrigger = React.createClass({
  propTypes: {
    overlay: React.PropTypes.element
  },
  render() {
    let {overlay, children, ...others} = this.props;
    if (!overlay.props.id) {
      overlay = React.cloneElement(overlay, {id: uniqueid('overlay')});
    }
    return (
      <span>
        <BsOverlayTrigger {...others} overlay={overlay}>
          {children}
        </BsOverlayTrigger>
        <span className="sr-only">{overlay.props.children}</span>
      </span>);
  }
});


module.exports = {
  OverlayTrigger
};
