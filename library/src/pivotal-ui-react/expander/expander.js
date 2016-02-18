const React = require('react');
const Collapse = require('react-bootstrap/lib/Collapse');

const ExpanderTrigger = React.createClass({
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

const ExpanderContent = React.createClass({
  propTypes: {
    expanded: React.PropTypes.bool
  },

  getInitialState() {
    return {expanded: this.props.expanded};
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.expanded !== this.props.expanded) {
      this.setState({expanded: nextProps.expanded});
    }
  },

  toggle() {
    this.setState({expanded: !this.state.expanded});
  },

  render() {
    const {children, ...props} = this.props;
    return (
      <Collapse {...{'in': this.state.expanded, ...props}}>
        <div style={{overflow: 'hidden'}}>
          {children}
        </div>
      </Collapse>
    );
  }
});

module.exports = {ExpanderTrigger, ExpanderContent};
