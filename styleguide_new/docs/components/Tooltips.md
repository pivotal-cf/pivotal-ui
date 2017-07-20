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

# OverlayTrigger

## Description

OverlayTriggers are highly configurable. Their associated overlays do not show up in the DOM until triggered.
This makes them ideal for highly repeated layouts such as lists.

## Examples

```jsx
::title=Basic example
::description=To create a tooltip where the contents are not inlined with the triggering element itself, use the OverlayTrigger component. If the `overlay` property passed into the `OverlayTrigger` will be displayed on hover, this is where the `Tooltip` can be used. This can be useful in situations where you want to have many different elements trigger the same tooltip. Tooltips are placed using the `placement` property on `OverlayTrigger`, "left", "right", "bottom", "top".
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

```html
::title=Form icon tooltip
<form>
  <div class="form-group">
    <label for="formIconExample">Email address
      <div class="tooltip tooltip-light tooltip-md">
        <div class="icon icon-baseline">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path d="M22 34h4V22h-4v12zm2-30C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16zm-2-22h4v-4h-4v4z"></path></svg>
        </div>
        <div class="tooltip-container">
          <div class="tooltip-content">
            Form Icon Tooltip
          </div>
        </div>
      </div>
    </label>
    <input type="email" class="form-control" id="formIconExample" placeholder="Enter email">
  </div>
</form>
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
onEntered    | no       | Function                                   |         | Callback that is called after the overlay is shown
onExited     | no       | Function                                   |         | Callback that is called after the overlay is hidden
overlay      | no       | Node                                       |         | An element or text to overlay next to the target
pin          | no       | Boolean                                    | true    | Whether or not to reposition overlays to stay in the window
placement    | no       | oneOf('top', 'bottom', 'left', 'right')    | 'right' | Placement of overlay in relation to target
theme        | no       | oneOf(['light', 'dark'])                   | dark    | Theme of tooltip background and text
trigger      | no       | oneOf('hover', 'click', 'focus', 'manual') | 'hover' | Action to trigger showing overlay
isSticky     | no       | Boolean                                    | false   | Whether the tooltip hover is sticky or not


# TooltipTrigger

## Description

TooltipTriggers are simpler to use, and their associated Tooltips are shown and hidden using css `visibility` rules.
In contrast to OverlayTriggers, the markup always exists in the DOM.

## Examples

```jsx
::title=Basic Eample
::description=TooltipTriggers are an easy way to create CSS-driven tooltips with the tooltip content created inline with the triggering element. The content of the tooltip is wrapped in a Tooltip component for ease of styling. Please note that the TooltipTrigger will add a lot of markup to the DOM if you are using it in a highly repeated layout.
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
  <div className="form-group form-inline">
    <TooltipTrigger tooltip="Some tooltip" isSticky={true} placement="right">
      <button className="btn btn-default">Hover over me too!</button>
    </TooltipTrigger>
  </div>
</div>
```

```jsx
::title=Markup Example
::description=Since the tooltip property is of type Node, you may add markup to the tooltip, such as links.
<div>
  <div className="form-group form-inline">
    <TooltipTrigger tooltip={<a href="#">clickable link</a>} theme="light">
      <button className="btn btn-default">Hover for clickable tooltip</button>
    </TooltipTrigger>
  </div>
</div>
```

## Installation & Usage

#### React
`npm install pui-react-tooltip --save`

```
import {Tooltip, TooltipTrigger} from 'pui-react-tooltip';
import {OverlayTrigger} from 'pui-react-overlay-trigger';
```

#### CSS Only
`npm install pui-css-tooltips --save`

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
isSticky       | no       | Boolean                                   | false    | Whether the tooltip hover is sticky or not
