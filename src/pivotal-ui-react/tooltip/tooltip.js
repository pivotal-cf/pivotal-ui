module.exports = {
  /**
   * @component Tooltip
   * @description When paired with `<OverlayTrigger>`, displays a tooltip on a specified user action
   *
   * @example ```js
   * var OverlayTrigger = require('pui-react-overlay-trigger').OverlayTrigger;
   * var Tooltip = require('pui-react-overlay-tooltip').Tooltip;
   * var MyComponent = React.createClass({
   *   render() {
   *     return (
   *       <OverlayTrigger placement="left" overlay={<Tooltip>This is the tooltip content</Tooltip>}>
   *         <a href="#">tooltip will show on the left on hover</a>
   *       </OverlayTrigger>
   *     );
   *   }
   * });
   * ```
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#tooltips_react)
   */
  Tooltip: require('react-bootstrap').Tooltip
};
