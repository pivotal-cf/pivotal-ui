# Expander

`npm install pui-react-expander --save`

## Description
Expanders are collapsible content areas. Unlike their accordion counterparts, Expanders do not require a
parent collapse and child content structure. This means you can trigger the expanding and collapsing content from somewhere
else within the DOM.

## Basic Usage
Import the subcomponent:

```
import {ExpanderContent} from 'pui-react-expander';
```

The Expander component accepts an "onEntered" and an "onExited" callback that triggers after animation is complete.

See the example below for how to use these components in your own application.


```jsx
::title=Basic Example
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

<div>
    <MoreInfo />
</div>
```

## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
expanded  | no | Boolean   | false | Whether to render expanded or not
onEntered | no | Function  |       | Hook that fires when expand occurs
onExited  | no | Function  |       | Hook that fires when collapse occurs

Note: all props of the 'collapse