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

class PortalSource extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {destination: null};
  }

  static propTypes = {
    name: types.string.isRequired
  };

  componentWillMount() {
    emitter.on('destination', this.setDestination);
    this.componentDidUpdate();
  }

  componentWillUnmount() {
    emitter.removeListener('destination', this.setDestination);
    var {root} = this.state.destination || {};
    if(root) {
      root.parentNode.removeChild(root);
    }
  }

  componentDidUpdate() {
    var {root} = this.state.destination || {};
    if (root) ReactDOM.render(<div>{this.props.children}</div>, root);
  }

  setDestination = () => {
    var {destination} = this.state;
    var destinationPortal = destinationPortals[this.props.name];
    if (destination && destination.portal === destinationPortal) return;
    this.setState({destination: destinationPortal && {portal: destinationPortal, root: createRoot(destinationPortal)}});
  };

  render() {
    return null;
  }
}

class PortalDestination extends React.Component {
  static propTypes = {
    name: types.string.isRequired
  };

  componentDidMount() {
    var {name} = this.props;
    if (name in destinationPortals) {
      console.warn(`Warning: Multiple destination portals with the same name "${name}" detected.`);
    }

    destinationPortals[name] = this;
    emitter.emit('destination', this);
  }

  componentWillUnmount() {
    delete destinationPortals[this.props.name];
    emitter.emit('destination', this);
  }

  render() {
    return (<div/>);
  }
}

module.exports = {
  PortalSource,
  PortalDestination,
  reset
};
