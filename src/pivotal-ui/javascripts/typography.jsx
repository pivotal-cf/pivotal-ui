'use strict';

var React = require('react');
var _ = require('lodash');


var Heading = React.createClass({
  acceptedSizeClasses: ['title', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'small'],
  acceptedBoldClasses: ['low', 'default', 'high', 'max'],
  render: function render() {
    var classes = [];

    if(this.props.className) {
      classes.push(this.props.className);
    }

    if (_.contains(this.acceptedSizeClasses, this.props.size)) {
      classes.push(this.props.size);
    }

    if (_.contains(this.acceptedBoldClasses, this.props.bold)) {
      classes.push("em-" + this.props.bold);
    }

    if (this.props.allcaps) {
      classes.push("em-alt");
    }

    if (this.props.color) {
      classes.push(this.props.color);
    }

    var joinedClasses = classes.join(' ');

    switch(this.props.element) {
      case "h1":
        return (<h1 {...this.props} className={joinedClasses}>{this.props.children}</h1>);
      case "h2":
        return (<h2 {...this.props} className={joinedClasses}>{this.props.children}</h2>);
      case "h3":
        return (<h3 {...this.props} className={joinedClasses}>{this.props.children}</h3>);
      case "h4":
        return (<h4 {...this.props} className={joinedClasses}>{this.props.children}</h4>);
      case "h5":
        return (<h5 {...this.props} className={joinedClasses}>{this.props.children}</h5>);
      case "h6":
        return (<h6 {...this.props} className={joinedClasses}>{this.props.children}</h6>);
      default:
        return (<p {...this.props} className={joinedClasses}> {this.props.children}</p>);
    }
  }
});

var AlternateH1 = React.createClass({
  getDefaultProps: function () {
    return {
      bold: 'high',
      color: 'type-dark-1'
    }
  },

  render: function render() {
    return (
      <Heading element="h1" {...this.props}>{this.props.children}</Heading>
     );
  }
});

var AlternateH2 = React.createClass({
  getDefaultProps: function () {
    return {
      bold: 'high',
      size: 'h4',
      allcaps: true
    }
  },

  render: function render() {
    return (
      <Heading element="h2"  {...this.props}>{this.props.children}</Heading>
      );
  }
});

var AlternateH3 = React.createClass({
  getDefaultProps: function () {
    return {
      bold: 'high',
      size: 'h4'
    }
  },

  render: function render() {
    return (
      <Heading element="h3" {...this.props}>{this.props.children}</Heading>
      );
  }
});

var DefaultH1 = React.createClass({
  getDefaultProps: function () {
    return {
      bold: 'high'
    }
  },

  render: function render() {
    return (
      <Heading element="h1" {...this.props}>{this.props.children}</Heading>
      );
  }
});

var DefaultH2 = React.createClass({
  getDefaultProps: function () {
    return {
      color: 'type-dark-1',
      bold: 'high'
    }
  },

  render: function render() {
    return (
      <Heading element="h2" {...this.props}>{this.props.children}</Heading>
      );
  }
});

var DefaultH3 = React.createClass({
  getDefaultProps: function () {
    return {
      color: 'type-dark-1',
      size: 'h4',
      bold: 'high'
    }
  },

  render: function render() {
    return (
      <Heading element="h3" {...this.props}>{this.props.children}</Heading>
    );
  }
});

module.exports = {
  AlternateH1: AlternateH1,
  AlternateH2: AlternateH2,
  AlternateH3: AlternateH3,
  DefaultH1: DefaultH1,
  DefaultH2: DefaultH2,
  DefaultH3: DefaultH3,
  Heading: Heading
};
