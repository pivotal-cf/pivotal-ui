var EventEmitter = require('node-event-emitter');
var React = require('react');
var ReactDOM = require('react-dom');

var types = React.PropTypes;

var destinationPortals = {};
var emitter = new EventEmitter();

function createRoot(reactElement) {
  var destination = document.createElement('div');
  ReactDOM.findDOMNode(reactElement).appendChild(destination);
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
    if (root) ReactDOM.render(<div>{this.props.children}</div>, root);
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
 */

var PortalDestination = React.createClass({
  propTypes: {
    name: types.string.isRequired
  },

  componentDidMount() {
    var {name} = this.props;
    if (name in destinationPortals) {
      console.warn(`Warning: Multiple destination portals with the same name "${name}" detected.`);
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
