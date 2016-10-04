/*doc
---
title: Expander
name: expander_react
categories:
 - react_components_expander
 - react_all
---


<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install pui-react-expander --save
</code>

Require the subcomponent:

```
var ExpanderContent = require('pui-react-expander').ExpanderContent;
```

Expanders are collapsible content areas. Unlike their accordion counterparts, Expanders do not require a
parent collapse and child content structure. This means you can trigger the expanding and collapsing content from somewhere
else within the DOM.

The Expander component accepts an "onEntered" and an "onExited" callback that triggers after animation is complete.

See the example below for how to use these components in your own application.

```jsx_example
const MoreInfo = React.createClass({
  getInitialState() {
    return {expanded: false};
  },

  toggleContent() {
    this.setState({expanded: !this.state.expanded});
  },

  render: function() {
    return (
      <main>
        <ExpanderContent
          expanded={this.state.expanded}
          onEntered={() => {console.log('onEntered')}}
          onExited={() => {console.log('onExited')}}>
            <p className='h1 bg-neutral-2 type-neutral-9'>
              Content in expander
            </p>
        </ExpanderContent>
        <button className='btn-highlight' onClick={this.toggleContent}>
          Toggle Content
        </button>
      </main>
    )
  }
});
```

```react_example
<MoreInfo />
```
*/
