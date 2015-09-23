var React = require('react/addons');
var Collapse = require('react-bootstrap/lib/Collapse');

/**
 * @component ExpanderTrigger
 * @description A button that when clicked, shows or hides the content in the corresponding ExpanderContent
 *
 * @example ```js
 * var ExpanderTrigger = require('pui-react-expander').ExpanderTrigger;
 * var ExpanderContent = require('pui-react-expander').ExpanderContent;
 * var MyComponent = React.createClass({
 *   componentDidMount() {
 *     this.refs.trigger.setTarget(this.refs.content);
 *   },
 *
 *   render() {
 *     return (
 *       <article>
 *         <ExpanderTrigger ref="trigger"><button>Click to Toggle Content</button></ExpanderTrigger>
 *         <ExpanderContent ref="content">Content to be toggled</ExpanderContent>
 *       </article>
 *     );
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#expander_react)
 */
var ExpanderTrigger = React.createClass({
  getInitialState() {
    return {};
  },

  setTarget(target) {
    this.setState({target});
  },

  toggleExpander(event) {
    event.preventDefault();
    if (this.state.target) {
      this.state.target.toggle();
    } else {
      console.warn('No ExpanderContent provided to ExpanderTrigger.');
    }
  },

  render() {
    return React.cloneElement(this.props.children, {onClick: this.toggleExpander});
  }
});

/**
 * @component ExpanderContent
 * @description Denotes content that can be toggled via a corresponding ExpanderTrigger
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#expander_react)
 */
var ExpanderContent = React.createClass({
  propTypes: {
    expanded: React.PropTypes.bool
  },

  getInitialState() {
    return {expanded: this.props.expanded};
  },

  toggle() {
    this.setState({expanded: !this.state.expanded});
  },

  render() {
    return (
      <Collapse in={this.state.expanded}>
        <div style={{overflow: 'hidden'}}>
          {this.props.children}
        </div>
      </Collapse>
    );
  }
});

module.exports = {ExpanderTrigger, ExpanderContent};

/*doc
---
title: Expander
name: expander_react
categories:
 - react_all_expander
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
var ExpanderTrigger = require('pui-react-expander').ExpanderTrigger;
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
  componentDidMount: function () {
    this.refs.infoTrigger.setTarget(this.refs.infoContent);
  },
  render: function() {
    return (
      <main>
        <ExpanderContent ref="infoContent">
          <p className='h1 bg-neutral-2 type-neutral-9'>Content in expander</p>
        </ExpanderContent>
        <br/>
        <ExpanderTrigger ref="infoTrigger">
          <button className='btn btn-highlight'>Toggle Content</button>
        </ExpanderTrigger>
      </main>
    )
  }
});
```

```react_example
<MoreInfo />
```
*/
