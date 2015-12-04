var React = require('react');
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
