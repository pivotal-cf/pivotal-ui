---
title: Tooltips
menu: components
cssPath: pivotal-ui/css/tooltips
reactPath: pivotal-ui/react/tooltip
reactComponents:
  - Tooltip
  - TooltipTrigger
---

# Overview

The Tooltip component is a styled container for content that should be displayed when triggered by an
OverlayTrigger or TooltipTrigger. It does not exhibit any dynamic behavior on its own.

TooltipTriggers are simpler to use, and their associated Tooltips are shown and hidden using CSS `visibility` rules.
In contrast to OverlayTriggers, the markup always exists in the DOM.

# Examples

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

# Props

## Tooltip props

Property       | Required | Type                                      | Default  | Description
---------------|----------|-------------------------------------------|----------|----------------------------------
`visible`      | no       | Boolean                                   | true     | Whether the tooltip contents are visible
`size`         | no       | oneOf(['auto', 'sm', 'md', 'lg'])         | auto     | Size of the tooltip
`isSticky`     | no       | Boolean                                   | false    | Whether the tooltip hover is sticky or not

## TooltipTrigger props

Property         | Required | Type                                      | Default  | Description
-----------------|----------|-------------------------------------------|----------|----------------------------------
`clickHideDelay` | no       | Number                                    | 1000     | How long (in milliseconds) to wait before hiding after click
`display`        | no       | Boolean                                   | false    | if `trigger` is set to `manual` controls whether or not the tooltip is visible
`isSticky`       | no       | Boolean                                   | false    | Whether the tooltip hover is sticky or not
`onEntered`      | no       | Func                                      | () => {} | Callback that is called after the tooltip is shown
`onExited`       | no       | Func                                      | () => {} | Callback that is called after the tooltip is hidden
`placement`      | no       | oneOf(['left', 'right', 'bottom', 'top']) | top      | Placement of tooltip in relation to target
`size`           | no       | oneOf(['auto', 'sm', 'md', 'lg'])         | auto     | Size of the tooltip
`theme`          | no       | oneOf(['light', 'dark'])                  | dark     | Theme of tooltip background and text
`tooltip`        | yes      | Node                                      |          | Tooltip content - will be wrapped in a Tooltip component
`trigger`        | no       | oneOf(['hover', 'click', 'manual'])       | hover    | Action to trigger showing tooltip