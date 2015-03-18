'use strict';

var React = require('react/addons');
var ListMixin = require('./mixins/list-mixin');
var classnames = require('classnames');

var ListItem = React.createClass({
  mixins: [ListMixin],

  render: function() {
    return (
      <li {...this.props}>{this.props.children}</li>
    );
  }
});

var UnorderedList = React.createClass({
  mixins: [ListMixin],

  listAlignment: 'vertical',

  render: function() {
    var { children, className } = this.props;
    var classes = classnames({
      'list-unordered': !this.props.unstyled && !this.props.checked,
      'list-unstyled': this.props.unstyled,
      'list-checked': this.props.checked
    }, this.listSpacing(), className);

    return (
      <ul className={classes}>{children}</ul>
    );
  }
});

var OrderedList = React.createClass({
  mixins: [ListMixin],

  listAlignment: 'vertical',

  render: function() {
    var { children, className } = this.props;
    var classes = classnames({
      'list-unstyled': this.props.unstyled
    }, this.listSpacing(), className);

    return (
      <ol className={classes}>{children}</ol>
    );
  }
});

var InlineList = React.createClass({
  mixins: [ListMixin],

  listAlignment: 'horizontal',

  render: function() {
    var { children, className } = this.props;
    var classes = classnames({
      'list-inline': true,
      'list-inline-divider': this.props.divider
    }, this.listSpacing(), className);

    return (
      <ul className={classes}>{children}</ul>
    );
  }
});

var GroupList = React.createClass({
  mixins: [ListMixin],

  listAlignment: 'vertical',

  renderChildren: function() {
    return React.Children.map(this.props.children, c => React.addons.cloneWithProps(c, {className: 'list-group-item'}));
  },

  render: function() {
    var {className} = this.props;
    var classes = classnames({
      'list-group': true
    }, this.listSpacing(), className);

    return (
      <ul className={classes}>{this.renderChildren()}</ul>
    );
  }
});

var GroupListInverse = React.createClass({
  mixins: [ListMixin],

  renderChildren: function() {
    return React.Children.map(this.props.children, c => React.addons.cloneWithProps(c, {className: 'list-group-item'}));
  },

  listAlignment: 'vertical',

  render: function() {
    var {className} = this.props;
    var classes = classnames({
      'list-group-inverse': true
    }, this.listSpacing(), className);

    return (
      <ul className={classes}>{this.renderChildren()}</ul>
    );
  }
});

var StepList = React.createClass({
  mixins: [ListMixin],

  listAlignment: 'horizontal',

  render: function() {
    var { children, className } = this.props;
    var classes = classnames({
      'list-steps': true
    }, this.listSpacing(), className);

    return (
      <ol className={classes}>{children}</ol>
    );
  }
});

var BreadcrumbList = React.createClass({
  mixins: [ListMixin],

  listAlignment: 'horizontal',

  render: function() {
    var { children, className } = this.props;
    var classes = classnames({
      'list-breadcrumb': true
    }, this.listSpacing(), className);

    return (
      <ul className={classes}>{children}</ul>
    );
  }
});

module.exports = {
  ListItem,
  UnorderedList,
  OrderedList,
  InlineList,
  GroupList,
  GroupListInverse,
  StepList,
  BreadcrumbList
};
