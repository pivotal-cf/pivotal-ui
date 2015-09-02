import BsOverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import React from 'react';
import uniqueid from 'lodash.uniqueid';

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
  /**
   * @component OverlayTrigger
   * @description Display a tooltip or popover on a specified user action
   *
   * @property placement {String} One of `left`, `right` (default), `top`, or `bottom`--determines where the place the overlay relative to the trigger
   * @property trigger {String, Array<String>} One of `hover` (default), `focus` (default), or `click`--defines which user actions trigger the overlay
   * @property overlay {Element} The HTML for the overlay
   *
   * @example ```js
   * var OverlayTrigger = require('pui-react-overlay-trigger').OverlayTrigger;
   * var MyComponent = React.createClass({
   *   render() {
   *     return (
   *       <OverlayTrigger placement="left" overlay={<p>This is the overlay content</p>}>
   *         <a href="#">tooltip will show on the left on hover</a>
   *       </OverlayTrigger>
   *     );
   *   }
   * });
   * ```
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#tooltips_react)
   */
  OverlayTrigger
};
