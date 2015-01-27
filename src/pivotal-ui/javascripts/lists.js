'use strict';

var _ = require('lodash');
var React = require('react/addons');
var setClass = React.addons.classSet;

var ListItem = React.createClass({
  render: function() {
    return (
      <li {...this.props}>{this.props.children}</li>
    );
  }
});

var UnorderedList = React.createClass({
  render: function() {
    var classes = setClass({
      'list-unordered': !this.props.unstyled && !this.props.checked,
      'list-unstyled': this.props.unstyled,
      'list-checked': this.props.checked
    });
    return (
      <ul className={classes}>{this.props.children}</ul>
    );
  }
});

var OrderedList = React.createClass({
  render: function() {
    var classes = setClass({
      'list-unstyled': this.props.unstyled
    });
    return (
      <ol className={classes}>{this.props.children}</ol>
    );
  }
});

var InlineList = React.createClass({
  render: function() {
    var classes = setClass({
      'list-inline': true,
      'list-inline-divider': this.props.divider,
    });
    return (
      <ul className={classes}>{this.props.children}</ul>
    );
  }
});

var GroupList = React.createClass({
  renderChildren: function() {
    return React.Children.map(this.props.children, c => React.addons.cloneWithProps(c, {className: 'list-group-item'}));
  },

  render: function() {
    return (
      <ul className='list-group'>{this.renderChildren()}</ul>
    );
  }
});

var StepList = React.createClass({
  render: function() {
    return (
      <ol className='list-steps'>{this.props.children}</ol>
    );
  }
});

var BreadcrumbList = React.createClass({
  render: function() {
    return (
      <ul className='list-breadcrumb'>{this.props.children}</ul>
    );
  }
});

module.exports = {
  ListItem,
  UnorderedList,
  OrderedList,
  InlineList,
  GroupList,
  StepList,
  BreadcrumbList
};
