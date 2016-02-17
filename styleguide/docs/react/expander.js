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
var ExpanderContent = require('pui-react-expander').ExpanderContent;
```


Expanders are collapsable content areas which are unlike their accordion counterparts in that they do not require a
parent collapse and child content structure. This means you can trigger the expanding and collapsing content from somewhere
else within the DOM.

The expander pattern requires two components -- the ExpanderContent and the ExpanderTrigger. You will need to implement a
component which handles the communication between these two components so the Trigger knows which Content to toggle. This is done
through the setTarget method exposed on the ExpanderTrigger. *Note that the contents of the ExpanderTrigger component must be a button or link.*

See the example below for how to use these components in your own application.

```jsx_example
var MoreInfo = React.createClass({
 getInitialState() {
   return {expanded: false};
 },

 toggleContent() {
   this.setState({expanded: !this.state.expanded});
 },

 render: function() {
   return (
     <main>
       <ExpanderContent expanded={this.state.expanded}>
         <p className='h1 bg-neutral-2 type-neutral-9'>Content in expander</p>
       </ExpanderContent>
       <button className='btn btn-highlight' onClick={this.toggleContent}>
         Toggle Content
       </button>
     </main>
   );
 }
});
```

```react_example
<MoreInfo />
```
*/
