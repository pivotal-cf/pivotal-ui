---
title: Expander
menu: components
reactPath: pivotal-ui/react/expander
reactComponents:
  ExpanderContent:
    delay: Duration (in milliseconds) of expand/collapse animation
    disableAnimation: If true, disables animation on expand/collapse
    expanded: Whether the component is expanded
    onEntered: Callback called when animation begins
    onExited: Callback called when animation ends
    boundingClientRect: (undocumented)
    container: (undocumented)
    containerReady: (undocumented)
    transitionProgress: (undocumented)
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