---
title: Collapsible
reactPath: pivotal-ui/react/collapsible
reactComponents:
  - Collapsible
---

## Description

The `Collapsible` component can be used to hide and show elements. By default,
it animates the expanding and collapsing of its content, but this can be configured
through props.

## Examples

```jsx
::title=Basic example
::description=The `Collapsible`'s `expanded` prop comes from the outer component's `state`.

class CollapsibleExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {expanded: false};
  }

  render() {
    return <div>
      <FormUnit {...{
        labelFor: 'collapsible-example-toggle',
        label: 'Expanded',
        inline: true,
        labelPosition: 'after',
        hideHelpRow: true,
        field: <Toggle id="collapsible-example-toggle" checked={this.state.expanded} onChange={evt => this.setState({expanded: evt.target.checked})}/>
      }}/>
      <Collapsible expanded={this.state.expanded} delay={300}>
        <div className="mtl"><DefaultButton>Button 1</DefaultButton></div>
        <div className="mtl"><DefaultButton>Button 2</DefaultButton></div>
        <div className="mtl"><DefaultButton>Button 3</DefaultButton></div>
        <div className="mtl"><DefaultButton>Button 4</DefaultButton></div>
      </Collapsible>
    </div>;
  }
}

<CollapsibleExample/>
```

## Props

Property  | Required | Type     | Default | Description
----------|----------|----------|---------|------------
delay     | no       | Number   | 400     | Duration (in milliseconds) of expand/collapse animation
expanded  | no       | Boolean  |         | Whether the component is expanded
onEntered | no       | Function |         | Callback called when animation begins
onExited  | no       | Function |         | Callback called when animation ends