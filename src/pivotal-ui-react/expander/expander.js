var React = require('react/addons');
var types = React.PropTypes;
var {CSSTransitionGroup} = React.addons;

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
 *         <ExpanderTrigger ref="trigger">Click to Toggle Content</ExpanderTrigger>
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

  toggleExpander() {
    if (this.state.target) {
      this.state.target.toggle();
    } else {
      console.warn('No ExpanderContent provided to ExpanderTrigger.');
    }
  },

  render() {
    return <div onClick={this.toggleExpander}>{this.props.children}</div>;
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
    expanded: types.bool
  },

  getInitialState() {
    return {expanded: this.props.expanded};
  },

  toggle() {
    this.setState({expanded: !this.state.expanded});
  },

  render() {
    var content = this.state.expanded ?
      <div key="expandedContent" style={{overflow: 'hidden'}}>{this.props.children}</div> :
      null;
    return <CSSTransitionGroup transitionName="expander">{content}</CSSTransitionGroup>;
  }
});

module.exports = {ExpanderTrigger, ExpanderContent};
