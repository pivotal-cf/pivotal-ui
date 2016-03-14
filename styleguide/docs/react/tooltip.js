/*doc
---
title: Tooltips
name: tooltips_react
categories:
 - react_base_tooltips
 - react_all
---

<code class="pam">
<i class="fa fa-download" alt="Install the Component">
npm install pui-react-tooltip pui-react-overlay-trigger --save
</i>
</code>

Require the subcomponents:

```
var Tooltip = require('pui-react-tooltip').Tooltip;
var OverlayTrigger = require('pui-react-overlay-trigger').OverlayTrigger;
```

Tooltips are used to display extra information on hover.
To make an element show a tooltip, wrap it in an `OverlayTrigger`.
If the `overlay` property passed into the `OverlayTrigger` will be displayed on hover,
this is where the `Tooltip` can be used.

Tooltips are placed using the `placement` property on `OverlayTrigger`, "left", "right", "bottom", "top".

```react_example
<div>
  <p>
    Check out this
    <OverlayTrigger placement="left" overlay={<Tooltip>I should be on the left</Tooltip>}>
      <span className="overlay-trigger" tabIndex="0"> tooltip on the left.</span>
    </OverlayTrigger>
  </p>
  <p>
    Check out this
    <OverlayTrigger placement="right" overlay={<Tooltip>I should be on the right</Tooltip>}>
      <span className="overlay-trigger" tabIndex="0"> tooltip on the right.</span>
    </OverlayTrigger>
  </p>
  <p>
    Check out this
    <OverlayTrigger placement="top" overlay={<Tooltip>I should be on the top</Tooltip>}>
      <span className="overlay-trigger" tabIndex="0"> tooltip on the top.</span>
    </OverlayTrigger>
  </p>
  <p>
    Check out this
    <OverlayTrigger placement="bottom" overlay={<Tooltip>I should be on the bottom</Tooltip>}>
      <span className="overlay-trigger" tabIndex="0"> tooltip on the bottom.</span>
    </OverlayTrigger>
  </p>
</div>
```

The `OverlayTrigger` component accepts the following properties:

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `delay` | Number | none | number of milliseconds to delay show and hide |
| `delayHide` | Number | none | number of milliseconds to delay hide |
| `delayShow` | Number | none | number of milliseconds to delay show |
| `display` | Boolean | false | whether or not to show the overlay |
| `onEntered` | Function | none | callback that is called after the overlay is shown |
| `onExited` | Function | none | callback that is called after the overlay is hidden |
| `overlay` | node | - | an element or text to overlay next to the target |
| `pin` | Boolean | true | whether or not to reposition overlays to stay in the window |
| `placement` | one of `top`, `bottom`, `left`, `right` | `right` | placement of overlay in relation to target |
| `disableScrim` | Boolean | false | Set to `true` to make tooltips stay open when clicking outside |
| `trigger` | one of `hover`, `click`, `focus`, `manual` | `hover` | action to trigger showing overlay |


If `trigger` is set to `manual`, display of the tooltip is entirely determined by the `display` prop,
which is controlled by the end user and not by `OverlayTrigger`.
*/


