---
title: Expander
menu: components
reactPath: pivotal-ui/react/expander
reactComponents:
  - ExpanderContent
---

# Overview

Expanders are collapsible content areas. Unlike their accordion counterparts, Expanders do not require a
parent collapse and child content structure. This means you can trigger the expanding and collapsing content from somewhere
else within the DOM.

The Expander component accepts an "onEntered" and an "onExited" callback that triggers after animation is complete.

# Examples

```jsx
::title=Basic example
::description=See the example below for how to use these components in your own application.
class MoreInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {expanded: false};
  }

  render() {
    return (
      <main>
        <ExpanderContent expanded={this.state.expanded}
                         onEntered={() => console.log('onEntered')}
                         onExited={() => console.log('onExited')}>
          <p className="h1 bg-neutral-2 type-neutral-9">
            Content in expander
          </p>
        </ExpanderContent>
        <button className="btn btn-primary" onClick={() => this.setState({expanded: !this.state.expanded})}>
          Toggle Content
        </button>
      </main>
    )
  }
}

<MoreInfo />
```

# Props

Property    | Required | Type     | Default | Description
------------|----------|----------|---------|------------
`delay`     | no       | Number   | 200     | Duration (in milliseconds) of expand/collapse animation
`expanded`  | no       | Boolean  |         | Whether the component is expanded
`onEntered` | no       | Function |         | Callback called when animation begins
`onExited`  | no       | Function |         | Callback called when animation ends