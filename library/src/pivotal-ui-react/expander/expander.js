var React = require('react');
var Collapse = require('react-bootstrap/lib/Collapse');

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
