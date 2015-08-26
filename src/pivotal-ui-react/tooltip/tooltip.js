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


/*doc
---
title: Tooltips
name: tooltips_react
categories:
- React
---

<code class="pam">
<i class="fa fa-download" alt="Install the Component">
npm install pui-react-tooltip --save
npm install pui-react-overlay-trigger --save
</i>
</code>

Require the subcomponent:

```
var Tooltip = require('pui-react-tooltip').Tooltip;
var OverlayTrigger = require('pui-react-overlay-trigger').OverlayTrigger;
```


Tooltips are used to display extra information on hover.
To make an element show a tooltip, wrap it in an `OverlayTrigger`.
If the `overlay` property passed into the `OverlayTrigger` will be displayed on hover,
this is where the `Tooltip` can be used. The is currently a thin wrapper around
React Bootstrap.

Tooltips are placed using the `placement` property on `OverlayTrigger`, "left", "right", "bottom", "top".

```react_example
<div>
  <p>
    Check out this
    <OverlayTrigger placement="left" overlay={<Tooltip>I should be on the left</Tooltip>}>
      <a href="#"> tooltip on the left</a>
    </OverlayTrigger>
  </p>
  <p>
    Check out this
    <OverlayTrigger placement="right" overlay={<Tooltip>I should be on the right</Tooltip>}>
      <a href="#"> tooltip on the right</a>
    </OverlayTrigger>
  </p>
  <p>
    Check out this
    <OverlayTrigger placement="top" overlay={<Tooltip>I should be on the top</Tooltip>}>
      <a href="#"> tooltip on the top</a>
    </OverlayTrigger>
  </p>
  <p>
    Check out this
    <OverlayTrigger placement="bottom" overlay={<Tooltip>I should be on the bottom</Tooltip>}>
      <a href="#"> tooltip on the bottom</a>
    </OverlayTrigger>
  </p>
</div>
```
*/
