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
name: 1_tooltip
parent: tooltips_react
---
## Props

Property       | Required | Type                                      | Default  | Description
---------------|----------|-------------------------------------------|----------|----------------------------------
content        | yes      | string                                    |          | Tooltip content
visible        | no       | Boolean                                   | true     | Whether the tooltip contents are visible
size           | no       | oneOf(['auto', 'sm', 'md', 'lg'])         | auto     | Size of the tooltip

* See [React proptype definitions here](https://facebook.github.io/react/docs/typechecking-with-proptypes.html)

The Tooltip component is a styled container for content that should be displayed when triggered by an
OverlayTrigger. It does not exhibit any dynamic behavior on it's own.
*/

/*doc
---
title: SimpleTooltips
name: 2_simple_tooltips
parent: tooltips_react
---

## Props

Property       | Required | Type                                      | Default  | Description
---------------|----------|-------------------------------------------|----------|----------------------------------
tooltipContent | yes      | Node                                      |          | Tooltip content
position       | no       | oneOf(['left', 'right', 'bottom', 'top']) | top      | Tooltip position relative to content
trigger        | no       | oneOf(['hover', 'click'])                 | hover    | What to trigger on
clickHideDelay | no       | Number                                    | 1000     | How long (in milliseconds) to wait before hiding after click
onEnter        | no       | Func                                      | () => {} | Callback fired when tooltip is shown
onExit         | no       | Func                                      | () => {} | Callback fired when tooltip is hidden
theme          | no       | oneOf(['light', 'dark'])                  | dark     | Theme of tooltip background and text
size           | no       | oneOf(['auto', 'sm', 'md', 'lg'])         | auto     | Size of the tooltip

* See [React proptype definitions here](https://facebook.github.io/react/docs/typechecking-with-proptypes.html)

## Basic usage

Import the subcomponents:

```
import {SimpleTooltip} from 'pui-react-tooltip';
```

SimpleTooltips are an easy way to create CSS driven tooltips with the tooltip content created inline with the
triggering element.

```react_example
<div>
  <SimpleTooltip tooltipContent="Some tooltip" size="sm">
    <button>Hover over me</button>
  </SimpleTooltip>
  <SimpleTooltip tooltipContent="Some tooltip" trigger="click" size="sm">
    <button>Click me</button>
  </SimpleTooltip>
</div>
```
*/

/*doc
---
title: OverlayTrigger
name: 3_overlay_trigger
parent: tooltips_react
---

## Props

Property     | Required | Type                                       | Default | Description
-------------|----------|--------------------------------------------|---------|---------------------------------------
delay        | no       | Number                                     |         | Number of milliseconds to delay show and hide
delayHide    | no       | Number                                     |         | Number of milliseconds to delay hide
delayShow    | no       | Number                                     |         | Number of milliseconds to delay show
display      | no       | Boolean                                    | false   | Whether or not to show the overlay
onEntered    | no       | Function                                   |         | Callback that is called after the overlay is shown
onExited     | no       | Function                                   |         | Callback that is called after the overlay is hidden
overlay      | no       | Node                                       |         | An element or text to overlay next to the target
pin          | no       | Boolean                                    | true    | Whether or not to reposition overlays to stay in the window
placement    | no       | oneOf('top', 'bottom', 'left', 'right')    | 'right' | Placement of overlay in relation to target
disableScrim | no       | Boolean                                    | false   | Set to true to make tooltips stay open when clicking outside
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
  <p>
    Check out this
    <OverlayTrigger placement="left" overlay={<Tooltip content="I should be on the left" size="sm"/>}>
      <span className="overlay-trigger" tabIndex="0"> tooltip on the left.</span>
    </OverlayTrigger>
  </p>
  <p>
    Check out this
    <OverlayTrigger placement="right" overlay={<Tooltip content="I should be on the right" size="sm"/>}>
      <span className="overlay-trigger" tabIndex="0"> tooltip on the right.</span>
    </OverlayTrigger>
  </p>
  <p>
    Check out this
    <OverlayTrigger placement="top" overlay={<Tooltip content="I should be on the top" size="sm"/>}>
      <span className="overlay-trigger" tabIndex="0"> tooltip on the top.</span>
    </OverlayTrigger>
  </p>
  <p>
    Check out this
    <OverlayTrigger placement="bottom" overlay={<Tooltip content="I should be on the bottom" size="sm"/>}>
      <span className="overlay-trigger" tabIndex="0"> tooltip on the bottom.</span>
    </OverlayTrigger>
  </p>
</div>
```

If `trigger` is set to `manual`, display of the tooltip is entirely determined by the `display` prop,
which is controlled by the end user and not by `OverlayTrigger`.
*/
