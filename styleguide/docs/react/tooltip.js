/*doc
---
title: Tooltips
name: tooltips_react
categories:
- react_base_tooltips
- react_all
---

<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install pui-react-tooltip pui-react-overlay-trigger --save
</code>

## Props

OverlayTrigger

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
delay        | no | Number                                     |         | Number of milliseconds to delay show and hide
delayHide    | no | Number                                     |         | Number of milliseconds to delay hide
delayShow    | no | Number                                     |         | Number of milliseconds to delay show
display      | no | Boolean                                    | false   | Whether or not to show the overlay
onEntered    | no | Function                                   |         | Callback that is called after the overlay is shown
onExited     | no | Function                                   |         | Callback that is called after the overlay is hidden
overlay      | no | Node                                       |         | An element or text to overlay next to the target
pin          | no | Boolean                                    | true    | Whether or not to reposition overlays to stay in the window
placement    | no | oneOf('top', 'bottom', 'left', 'right')    | 'right' | Placement of overlay in relation to target
disableScrim | no | Boolean                                    | false   | Set to true to make tooltips stay open when clicking outside
trigger      | no | oneOf('hover', 'click', 'focus', 'manual') | 'hover' | Action to trigger showing overlay

## Basic usage

Import the subcomponents:

```
import {Tooltip} from 'pui-react-tooltip';
import {OverlayTrigger} from 'pui-react-overlay-trigger';
```

Tooltips are used to display extra information on hover. To make an element show
a tooltip, wrap it in an `OverlayTrigger`. If the `overlay` property passed into
the `OverlayTrigger` will be displayed on hover, this is where the `Tooltip`
can be used.

Tooltips are placed using the `placement` property on `OverlayTrigger`, "left",
"right", "bottom", "top".

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

If `trigger` is set to `manual`, display of the tooltip is entirely determined by the `display` prop,
which is controlled by the end user and not by `OverlayTrigger`.
*/
