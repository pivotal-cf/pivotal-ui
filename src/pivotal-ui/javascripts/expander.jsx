'use strict';

var React = require('react');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var ExpanderContent = React.createClass({
  propTypes: {
    expanded: React.PropTypes.bool
  },

  getInitialState: function() {
    return {
      expanded: this.props.expanded
    };
  },

  toggle: function() {
    this.setState({
      expanded: !this.state.expanded
    });
  },

  render: function() {
    var content;

    if (this.state.expanded) {
      content = (
        <div key='expandedContent' style={{overflow: 'hidden'}}>
          {this.props.children}
        </div>
      );
    }

    return (
      <ReactCSSTransitionGroup transitionName='expander'>
        {content}
      </ReactCSSTransitionGroup>
    );
  }
});

var ExpanderTrigger = React.createClass({
  getInitialState: function () {
    return { };
  },

  setTarget: function(target) {
    this.setState({
      target: target
    });
  },

  render: function() {
    var self = this;

    function toggleExpander() {
      if (self.state.target) {
        self.state.target.toggle();
      } else {
        console.warn("No ExpanderContent provided to ExpanderTrigger.");
      }
    }

    return (
      <div onClick={toggleExpander}>
        {this.props.children}
      </div>
    );
  }
});


module.exports = {
  ExpanderContent: ExpanderContent,
  ExpanderTrigger: ExpanderTrigger
};
