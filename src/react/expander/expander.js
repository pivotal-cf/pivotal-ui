import React from 'react';
import PropTypes from 'prop-types';
import {Collapsible} from '../collapsible';

export class ExpanderTrigger extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  setTarget = target => this.setState({target});

  toggleExpander = event => {
    event.preventDefault();
    if (this.state.target) {
      this.state.target.toggle();
    } else {
      console.warn('No ExpanderContent provided to ExpanderTrigger.');
    }
  };

  render() {
    return React.cloneElement(this.props.children, {onClick: this.toggleExpander});
  }
}

export class ExpanderContent extends React.PureComponent {
  static propTypes = {
    expanded: PropTypes.bool
  };

  constructor(props, context) {
    super(props, context);
    this.state = {expanded: this.props.expanded};
  }

  toggle = () => this.setState({expanded: !this.state.expanded});

  render() {
    const {expanded} = this.state;
    return <Collapsible {...{...this.props, expanded}}/>;
  }
}
