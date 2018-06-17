---
title: Tooltips
menu: components
cssPath: pivotal-ui/css/tooltips
reactPath: pivotal-ui/react/tooltip
componentProps:
  Tooltip: {}
  TooltipTrigger: {}
---

# Overview

- [Tooltips](#tooltips)
- [Overlay Triggers](#overlay-triggers)
- [Tooltip Triggers](#tooltip-triggers)

# Tooltips

## Description

The Tooltip component is a styled container for content that should be displayed when triggered by an
OverlayTrigger or TooltipTrigger. It does not exhibit any dynamic behavior on its own.

## Props

Property       | Required | Type                                      | Default  | Description
---------------|----------|-------------------------------------------|----------|----------------------------------
visible        | no       | Boolean                                   | true     | Whether the tooltip contents are visible
size           | no       | oneOf(['auto', 'sm', 'md', 'lg'])         | auto     | Size of the tooltip
isSticky       | no       | Boolean                                   | false    | Whether the tooltip hover is sticky or not

# Overlay Triggers

## Description

OverlayTriggers are highly configurable. Their associated overlays do not show up in the DOM until triggered.
This makes them ideal for highly repeated layouts such as lists.

## Examples

```jsx
::title=Basic example
::description=To create a tooltip where the contents are not inlined with the triggering element itself, use the OverlayTrigger component. If the `overlay` property passed into the `OverlayTrigger` will be displayed on hover, this is where the `Tooltip` can be used. This can be useful in situations where you want to have many different elements trigger the same tooltip. Tooltips are placed using the `placement` property on `OverlayTrigger`.
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
::title=Resizable tooltips
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

Property     | Required | Type                                       | Default | Description
-------------|----------|--------------------------------------------|---------|---------------------------------------
delay        | no       | Number                                     |         | Number of milliseconds to delay show and hide
delayHide    | no       | Number                                     |         | Number of milliseconds to delay hide
delayShow    | no       | Number                                     |         | Number of milliseconds to delay show
disableScrim | no       | Boolean                                    | false   | Set to true to make tooltips stay open when clicking outside
display      | no       | Boolean                                    | false   | Whether or not to show the overlay
isSticky     | no       | Boolean                                    | false   | Whether the tooltip hover is sticky or not
onEntered    | no       | Function                                   |         | Callback that is called after the overlay is shown
onExited     | no       | Function                                   |         | Callback that is called after the overlay is hidden
overlay      | no       | Node                                       |         | An element or text to overlay next to the target
pin          | no       | Boolean                                    | true    | Whether or not to reposition overlays to stay in the window
placement    | no       | oneOf('top', 'bottom', 'left', 'right')    | 'right' | Placement of overlay in relation to target
theme        | no       | oneOf(['light', 'dark'])                   | dark    | Theme of tooltip background and text
trigger      | no       | oneOf('hover', 'click', 'focus', 'manual') | 'hover' | Action to trigger showing overlay


# Tooltip Triggers

## Description

TooltipTriggers are simpler to use, and their associated Tooltips are shown and hidden using CSS `visibility` rules.
In contrast to OverlayTriggers, the markup always exists in the DOM.

## Examples

```jsx
::title=Basic example
::description=TooltipTriggers are an easy way to create CSS-driven tooltips with the tooltip content created inline with the triggering element. The content of the tooltip is wrapped in a Tooltip component for ease of styling. Please note that the TooltipTrigger will add a lot of markup to the DOM if you are using it in a highly repeated layout.
<Grid>
  <FlexCol fixed>
    <TooltipTrigger tooltip="Some tooltip">
      <button className="btn btn-default">Hover over me</button>
    </TooltipTrigger>
  </FlexCol>
  <FlexCol fixed>
    <TooltipTrigger tooltip="Some tooltip" trigger="click">
      <button className="btn btn-default">Click me</button>
    </TooltipTrigger>
  </FlexCol>
  <FlexCol fixed>
    <TooltipTrigger tooltip="Some tooltip" isSticky={true} placement="right">
      <button className="btn btn-default">Hover over me too!</button>
    </TooltipTrigger>
  </FlexCol>
</Grid>
```

```jsx
::title=Markup example
::description=Since the tooltip property is of type Node, you may add markup to the tooltip, such as links.
<TooltipTrigger isSticky tooltip={<a href="#">clickable link</a>} theme="light">
  <button className="btn btn-default">Hover for clickable tooltip</button>
</TooltipTrigger>
```

```jsx
::title=Manual trigger example
::description=The trigger is manual, so the visibility of the tooltip is controlled by the display prop.
class ManualTooltipExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayTooltip: false
    }
  }

  render() {
    return (
      <div>
        <Checkbox {...{
          onChange: () => this.setState({displayTooltip: !this.state.displayTooltip})
        }}>show/hide tooltip</Checkbox>
        <TooltipTrigger {...{
          trigger: 'manual',
          display: this.state.displayTooltip,
          placement: 'right',
          tooltip: 'Some tooltip',
          theme: 'light'
        }}>
          <DefaultButton>Check the checkbox to display my tooltip</DefaultButton>
        </TooltipTrigger>
      </div>
    );
  }
}

<ManualTooltipExample/>

```

## Props

Property       | Required | Type                                      | Default  | Description
---------------|----------|-------------------------------------------|----------|----------------------------------
clickHideDelay | no       | Number                                    | 1000     | How long (in milliseconds) to wait before hiding after click
display        | no       | Boolean                                   | false    | if `trigger` is set to `manual` controls whether or not the tooltip is visible
isSticky       | no       | Boolean                                   | false    | Whether the tooltip hover is sticky or not
onEntered      | no       | Func                                      | () => {} | Callback that is called after the tooltip is shown
onExited       | no       | Func                                      | () => {} | Callback that is called after the tooltip is hidden
placement      | no       | oneOf(['left', 'right', 'bottom', 'top']) | top      | Placement of tooltip in relation to target
size           | no       | oneOf(['auto', 'sm', 'md', 'lg'])         | auto     | Size of the tooltip
theme          | no       | oneOf(['light', 'dark'])                  | dark     | Theme of tooltip background and text
tooltip        | yes      | Node                                      |          | Tooltip content - will be wrapped in a Tooltip component
trigger        | no       | oneOf(['hover', 'click', 'manual'])       | hover    | Action to trigger showing tooltip