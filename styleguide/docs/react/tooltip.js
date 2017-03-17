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
npm install pui-react-tooltip --save
</code>
*/

/*doc
---
title: Tooltip
name: 0_tooltip
parent: tooltips_react
---
## Props

Property       | Required | Type                                      | Default  | Description
---------------|----------|-------------------------------------------|----------|----------------------------------
visible        | no       | Boolean                                   | true     | Whether the tooltip contents are visible
size           | no       | oneOf(['auto', 'sm', 'md', 'lg'])         | auto     | Size of the tooltip

* See [React proptype definitions here](https://facebook.github.io/react/docs/typechecking-with-proptypes.html)

The Tooltip component is a styled container for content that should be displayed when triggered by an
OverlayTrigger or TooltipTrigger. It does not exhibit any dynamic behavior on its own.
*/

/*doc
---
title: OverlayTrigger vs TooltipTrigger
name: overlay_vs_tooltip
parent: 0_tooltip
---
OverlayTriggers are highly configurable. Their associated overlays do not show up in the DOM until triggered.
This makes them ideal for highly repeated layouts such as lists.
TooltipTriggers are simpler to use, and their associated Tooltips are shown and hidden using css `visibility` rules.
In contrast to OverlayTriggers, the markup always exists in the DOM.
*/

/*doc
---
title: OverlayTrigger
name: 2_overlay_trigger
parent: tooltips_react
---

## Props

Property     | Required | Type                                       | Default | Description
-------------|----------|--------------------------------------------|---------|---------------------------------------
delay        | no       | Number                                     |         | Number of milliseconds to delay show and hide
delayHide    | no       | Number                                     |         | Number of milliseconds to delay hide
delayShow    | no       | Number                                     |         | Number of milliseconds to delay show
disableScrim | no       | Boolean                                    | false   | Set to true to make tooltips stay open when clicking outside
display      | no       | Boolean                                    | false   | Whether or not to show the overlay
onEntered    | no       | Function                                   |         | Callback that is called after the overlay is shown
onExited     | no       | Function                                   |         | Callback that is called after the overlay is hidden
overlay      | no       | Node                                       |         | An element or text to overlay next to the target
pin          | no       | Boolean                                    | true    | Whether or not to reposition overlays to stay in the window
placement    | no       | oneOf('top', 'bottom', 'left', 'right')    | 'right' | Placement of overlay in relation to target
theme        | no       | oneOf(['light', 'dark'])                   | dark    | Theme of tooltip background and text
trigger      | no       | oneOf('hover', 'click', 'focus', 'manual') | 'hover' | Action to trigger showing overlay

## Basic usage

Import the subcomponents:

```
import {Tooltip} from 'pui-react-tooltip';
import {OverlayTrigger} from 'pui-react-overlay-trigger';
```

To create a tooltip where the contents are not inlined with the triggering element itself, use the OverlayTrigger component.
If the `overlay` property passed into the `OverlayTrigger` will be displayed on hover, this is where the `Tooltip`
can be used. This can be useful in situations where you want to have many different elements trigger the same tooltip.

Tooltips are placed using the `placement` property on `OverlayTrigger`, "left",
"right", "bottom", "top".


```react_example
<div>
  <div className="form-group">
    Check out this
    <OverlayTrigger placement="left" overlay={<Tooltip>I should be on the left</Tooltip>}>
      <span className="overlay-trigger" tabIndex="0"> tooltip on the left.</span>
    </OverlayTrigger>
  </div>
  <div className="form-group">
    Check out this
    <OverlayTrigger placement="right" overlay={<Tooltip>I should be on the right</Tooltip>}>
      <span className="overlay-trigger" tabIndex="0"> tooltip on the right.</span>
    </OverlayTrigger>
  </div>
  <div className="form-group">
    Check out this
    <OverlayTrigger placement="top" overlay={<Tooltip>I should be on the top</Tooltip>}>
      <span className="overlay-trigger" tabIndex="0"> tooltip on the top.</span>
    </OverlayTrigger>
  </div>
  <div className="form-group">
    Check out this
    <OverlayTrigger placement="bottom" overlay={<Tooltip>I should be on the bottom</Tooltip>}>
      <span className="overlay-trigger" tabIndex="0"> tooltip on the bottom.</span>
    </OverlayTrigger>
  </div>
  <div className="form-group">
    Check out this
    <OverlayTrigger theme="light" overlay={<Tooltip>light tooltip</Tooltip>}>
      <span className="overlay-trigger" tabIndex="0"> light tooltip.</span>
    </OverlayTrigger>
  </div>
</div>
```

If `trigger` is set to `manual`, display of the tooltip is entirely determined by the `display` prop,
which is controlled by the end user and not by `OverlayTrigger`.
*/

/*doc
---
title: TooltipTrigger
name: 3_tooltip_trigger
parent: tooltips_react
---

## Props

Property       | Required | Type                                      | Default  | Description
---------------|----------|-------------------------------------------|----------|----------------------------------
tooltip        | yes      | Node                                      |          | Tooltip content - will be wrapped in a Tooltip component
placement      | no       | oneOf(['left', 'right', 'bottom', 'top']) | top      | Placement of tooltip in relation to target
trigger        | no       | oneOf(['hover', 'click'])                 | hover    | Action to trigger showing tooltip
clickHideDelay | no       | Number                                    | 1000     | How long (in milliseconds) to wait before hiding after click
onEntered      | no       | Func                                      | () => {} | Callback that is called after the tooltip is shown
onExited       | no       | Func                                      | () => {} | Callback that is called after the tooltip is hidden
theme          | no       | oneOf(['light', 'dark'])                  | dark     | Theme of tooltip background and text
size           | no       | oneOf(['auto', 'sm', 'md', 'lg'])         | auto     | Size of the tooltip

* See [React proptype definitions here](https://facebook.github.io/react/docs/typechecking-with-proptypes.html)

## Basic usage

Import the subcomponents:

```
import {TooltipTrigger} from 'pui-react-tooltip';
```

TooltipTriggers are an easy way to create CSS-driven tooltips with the tooltip content created inline with the
triggering element. The content of the tooltip is wrapped in a Tooltip component for ease of styling. Please note that
the TooltipTrigger will add a lot of markup to the DOM if you are using it in a highly repeated layout.

```react_example
<div>
  <div className="form-group form-inline">
    <TooltipTrigger tooltip="Some tooltip">
      <button className="btn btn-default">Hover over me</button>
    </TooltipTrigger>
  </div>
  <div className="form-group form-inline">
    <TooltipTrigger tooltip="Some tooltip" trigger="click">
      <button className="btn btn-default">Click me</button>
    </TooltipTrigger>
  </div>
</div>
```

Since the tooltip property is of type Node, you may add markup to the tooltip, such as links.

```react_example
<div>
  <div className="form-group form-inline">
    <TooltipTrigger tooltip={<a href="#">clickable link</a>} theme="light">
      <button className="btn btn-default">Hover for clickable tooltip</button>
    </TooltipTrigger>
  </div>
</div>
```
*/