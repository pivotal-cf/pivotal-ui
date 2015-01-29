'use strict';

var React = require('react/addons');
var ListMixin = require('./mixins/list-mixin');
var setClass = React.addons.classSet;

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

  render: function() {
    var { spacing, children } = this.props;
    var classes = setClass({
      'list-unordered': !this.props.unstyled && !this.props.checked,
      'list-unstyled': this.props.unstyled,
      'list-checked': this.props.checked
    });
    if (spacing) { classes += ' lv' + spacing; }

    return (
      <ul className={classes}>{children}</ul>
    );
  }
});

var OrderedList = React.createClass({
  mixins: [ListMixin],

  render: function() {
    var { spacing, children } = this.props;
    var classes = setClass({
      'list-unstyled': this.props.unstyled
    });
    if (spacing) { classes += ' lv' + spacing; }

    return (
      <ol className={classes}>{children}</ol>
    );
  }
});

var InlineList = React.createClass({
  mixins: [ListMixin],

  render: function() {
    var { spacing, children } = this.props;
    var classes = setClass({
      'list-inline': true,
      'list-inline-divider': this.props.divider,
    });
    if (spacing) { classes += ' lh' + spacing; }

    return (
      <ul className={classes}>{children}</ul>
    );
  }
});

var GroupList = React.createClass({
  mixins: [ListMixin],

  renderChildren: function() {
    return React.Children.map(this.props.children, c => React.addons.cloneWithProps(c, {className: 'list-group-item'}));
  },

  render: function() {
    var { spacing } = this.props;
    var classes = setClass({
      'list-group': true,
    });
    if (spacing) { classes += ' lv' + spacing; }

    return (
      <ul className={classes}>{this.renderChildren()}</ul>
    );
  }
});

var StepList = React.createClass({
  mixins: [ListMixin],

  render: function() {
    var { spacing, children } = this.props;
    var classes = setClass({
      'list-steps': true,
    });
    if (spacing) { classes += ' lh' + spacing; }

    return (
      <ol className={classes}>{children}</ol>
    );
  }
});

var BreadcrumbList = React.createClass({
  mixins: [ListMixin],

  render: function() {
    var { spacing, children } = this.props;
    var classes = setClass({
      'list-breadcrumb': true
    });
    if (spacing) { classes += ' lh' + spacing; }

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
  StepList,
  BreadcrumbList
};
