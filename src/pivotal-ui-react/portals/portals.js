var EventEmitter = require('node-event-emitter');
var React = require('react');
var warning = require('react/lib/warning');

var types = React.PropTypes;

var destinationPortals = {};
var emitter = new EventEmitter();

function createRoot(reactElement) {
  var destination = document.createElement('div');
  reactElement.getDOMNode().appendChild(destination);
  return destination;
}

function reset() {
  emitter.removeAllListeners();
  destinationPortals = {};
}

/**
 * @component PortalSource
 * @description Children of PortalSource will be rendered in the corresponding PortalDestination
 *
 * @property name {String} Identifier for linking source and destination portals
 *
 * @example ```js
 * var PortalSource = require('pui-react-portals').PortalSource;
 * var MyComponent = React.createClass({
 *   render() {
 *     return (
 *       <body>
 *         <section>
 *           <PortalSource name="modal">Modal Content</PortalSource>
 *         </section>
 *
 *         <PortalDestination name="modal"/>
 *       </body>
 *     );
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html)
 */

var PortalSource = React.createClass({
  propTypes: {
    name: types.string.isRequired
  },

  getInitialState() {
    return {destination: null};
  },

  componentWillMount() {
    emitter.on('destination', this.setDestination);
    this.componentDidUpdate();
  },

  componentWillUnmount() {
    emitter.removeListener('destination', this.setDestination);
    var {root} = this.state.destination || {};
    if(root) {
      root.parentNode.removeChild(root);
    }
  },

  setDestination() {
    var {destination} = this.state;
    var destinationPortal = destinationPortals[this.props.name];
    if (!this.isMounted() || (destination && destination.portal === destinationPortal)) return;
    this.setState({destination: destinationPortal && {portal: destinationPortal, root: createRoot(destinationPortal)}});
  },

  componentDidUpdate() {
    var {root} = this.state.destination || {};
    if (root) React.render(<div>{this.props.children}</div>, root);
  },

  render() {
    return null;
  }
});


/**
 * @component PortalDestination
 * @description Children of PortalSource will be rendered in the corresponding PortalDestination
 *
 * @property name {String} Identifier for linking source and destination portals
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html)
 */

var PortalDestination = React.createClass({
  propTypes: {
    name: types.string.isRequired
  },

  componentDidMount() {
    var {name} = this.props;
    if (name in destinationPortals) {
      warning(false, `Multiple destination portals with the same name "${name}" detected.`);
    }

    destinationPortals[name] = this;
    emitter.emit('destination', this);
  },

  componentWillUnmount() {
    delete destinationPortals[this.props.name];
    emitter.emit('destination', this);
  },

  render() {
    return (<div/>);
  }
});

module.exports = {
  PortalSource,
  PortalDestination,
  reset
};

/*doc
---
title: Portals
name: portals_react
categories:
- React
---

<code class="pam">
<i class="fa fa-download" alt="Install the Component">
npm install pui-react-portals --save
</i>
</code>

Require the subcomponents:

```
var PortalSource = require('pui-react-portals').PortalSource;
var PortalDestination = require('pui-react-portals').PortalDestination;
```

The `Portal` components render DOM nodes elsewhere on the page. This is useful for things like
modals, tooltips, and dropdowns, when you want to define the content near the trigger, but have
it display at the bottom of the page (generally to solve z-index and overflow incompatibilities).

For example, modals can be rendered at the bottom of `<body>`, but the React component that creates
the modal content (e.g. a `<button>`) does not have access to `<body>` directly.
If a `PortalDestination` is put at the bottom of `<body>`, a `PortalSource` can then be used
anywhere without knowing about `<body>`.

```react_example
<div>
  <section>
    <span>Content will be transported from here:</span>
    <PortalSource name="modal">Transported content</PortalSource>
  </section>
  <section className="mvxxl">Unrelated content</section>
  <section>
    <span>To here:</span>
    <PortalDestination name="modal"/>
  </section>
</div>
```
*/
