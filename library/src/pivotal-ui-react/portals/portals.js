import {EventEmitter} from 'events';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

let destinationPortals = {};
const emitter = new EventEmitter();

const createRoot = reactElement => {
  const destination = document.createElement('div');
  ReactDOM.findDOMNode(reactElement).appendChild(destination);
  return destination;
};

export const reset = () => {
  emitter.removeAllListeners();
  destinationPortals = {};
};

export class PortalSource extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.state = {destination: null};
  }

  componentWillMount() {
    emitter.on('destination', this.setDestination);
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    const {root} = this.state.destination || {};
    if (root) ReactDOM.render(<div>{this.props.children}</div>, root);
  }

  componentWillUnmount() {
    emitter.removeListener('destination', this.setDestination);
    const {root} = this.state.destination || {};
    if(root) {
      root.parentNode.removeChild(root);
    }
  }

  setDestination = () => {
    const {destination} = this.state;
    const destinationPortal = destinationPortals[this.props.name];
    if (destination && destination.portal === destinationPortal) return;
    this.setState({destination: destinationPortal && {portal: destinationPortal, root: createRoot(destinationPortal)}});
  }

  render() {
    return null;
  }
}

export class PortalDestination extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired
  }

  componentDidMount() {
    const {name} = this.props;
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
    return <div/>;
  }
}
