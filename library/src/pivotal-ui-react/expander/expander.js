import React from 'react';
import {Collapsible} from 'pui-react-collapsible';

export class ExpanderTrigger extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  setTarget = target => this.setState({target})

  toggleExpander = event => {
    event.preventDefault();
    if (this.state.target) {
      this.state.target.toggle();
    } else {
      console.warn('No ExpanderContent provided to ExpanderTrigger.');
    }
  }

  render() {
    return React.cloneElement(this.props.children, {onClick: this.toggleExpander});
  }
}

export class ExpanderContent extends React.Component {
  static propTypes = {
    expanded: React.PropTypes.bool
  }

  constructor(props, context) {
    super(props, context);
    this.state = {expanded: this.props.expanded};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.expanded !== this.props.expanded) {
      this.setState({expanded: nextProps.expanded});
    }
  }

  toggle = () => this.setState({expanded: !this.state.expanded})

  render() {
    const {expanded} = this.state;
    return <Collapsible {...{...this.props, expanded}}/>;
  }
}
