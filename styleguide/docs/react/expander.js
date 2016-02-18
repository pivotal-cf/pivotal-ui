/*doc
---
title: Expander
name: expander_react
categories:
 - react_components_expander
 - react_all
---


<code class="pam">
<i class="fa fa-download" alt="Install the Component">
npm install pui-react-expander --save
</i>
</code>

Require the subcomponents:

```
const ExpanderContent = require('pui-react-expander').ExpanderContent;
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

  onSomething(something) {
    return () => console.log('triggered ', something)
  },

  render: function() {
     const callbacks = {
       onEntered: this.onSomething('onEntered'),
       onExited: this.onSomething('onExited')
     };

    return (
      <main>
        <ExpanderContent
          expanded={this.state.expanded}
          onEntered={callbacks.onEntered}
          onExited={callbacks.onExited}>
            <p className='h1 bg-neutral-2 type-neutral-9'>
              Content in expander
            </p>
        </ExpanderContent>
        <button className='btn btn-highlight' onClick={this.toggleContent}>
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
