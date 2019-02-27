---
title: Overlay trigger
reactPath: pivotal-ui/react/overlay-trigger
reactComponents:
- OverlayTrigger
---

OverlayTriggers are highly configurable. Their associated overlays do not show up in the DOM until triggered.
This makes them ideal for highly repeated layouts such as lists.

```jsx
//title=Basic example
//description=To create a tooltip where the contents are not inlined with the triggering element itself, use the OverlayTrigger component. If the `overlay` property passed into the `OverlayTrigger` will be displayed on hover, this is where the `Tooltip` can be used. This can be useful in situations where you want to have many different elements trigger the same tooltip. Tooltips are placed using the `placement` property on `OverlayTrigger`.
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
  <p>
    Check out this
    <OverlayTrigger theme="light" overlay={<Tooltip>light tooltip</Tooltip>}>
      <span className="overlay-trigger" tabIndex="0"> light tooltip.</span>
    </OverlayTrigger>
  </p>
</div>
```

```html
//title=Resizable tooltips
<div>
<div class="tooltip">
  <button class="btn btn-default">
    A small tooltip
  </button>
  <div class="tooltip-container tooltip-sm">
    <div class="tooltip-content">Lorem ipsum dolor sit amet, consec</div>
  </div>
</div>

<div class="tooltip">
  <button class="btn btn-default">
    A medium tooltip
  </button>
  <div class="tooltip-container tooltip-md">
    <div class="tooltip-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</div>
  </div>
</div>

<div class="tooltip">
  <button class="btn btn-default">
    A large tooltip
  </button>
  <div class="tooltip-container tooltip-lg">
    <div class="tooltip-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
  </div>
</div>
</div>
```

If `trigger` is set to `manual`, display of the tooltip is entirely determined by the `display` prop,
which is controlled by the end user and not by `OverlayTrigger`.

## Props

Property       | Required | Type                                       | Default | Description
---------------|----------|--------------------------------------------|---------|---------------------------------------
`delay`        | no       | Number                                     |         | Number of milliseconds to delay show and hide
`delayHide`    | no       | Number                                     |         | Number of milliseconds to delay hide
`delayShow`    | no       | Number                                     |         | Number of milliseconds to delay show
`disableScrim` | no       | Boolean                                    | false   | Set to true to make tooltips stay open when clicking outside
`display`      | no       | Boolean                                    | false   | Whether or not to show the overlay
`isSticky`     | no       | Boolean                                    | false   | Whether the tooltip hover is sticky or not
`onEntered`    | no       | Function                                   |         | Callback that is called after the overlay is shown
`onExited`     | no       | Function                                   |         | Callback that is called after the overlay is hidden
`overlay`      | no       | Node                                       |         | An element or text to overlay next to the target
`pin`          | no       | Boolean                                    | true    | Whether or not to reposition overlays to stay in the window
`placement`    | no       | oneOf('top', 'bottom', 'left', 'right')    | 'right' | Placement of overlay in relation to target
`theme`        | no       | oneOf(['light', 'dark'])                   | dark    | Theme of tooltip background and text
`trigger`      | no       | oneOf('hover', 'click', 'focus', 'manual') | 'hover' | Action to trigger showing overlay
