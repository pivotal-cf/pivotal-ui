'use strict';

var React = require('react/addons');

var Dropdown = require('react-bootstrap/DropdownButton');
var DropdownItem = require('react-bootstrap/MenuItem');

var LinkDropdown = React.createClass({
  render: function () {
    return (
      <Dropdown {...this.props} bsStyle='link' />
    );
  }
});

var DefaultAltDropdown = React.createClass({
  render: function () {
    return (
      <Dropdown {...this.props} className='btn-default-alt' />
    );
  }
});

var PrimaryDropdown = React.createClass({
  render: function () {
    return (
      <Dropdown {...this.props} bsStyle='primary' />
    );
  }
});

var LowlightDropdown = React.createClass({
  render: function () {
    return (
      <Dropdown {...this.props} className='btn-lowlight' />
    );
  }
});

var DangerDropdown = React.createClass({
  render: function () {
    return (
      <Dropdown {...this.props} bsStyle='danger' />
    );
  }
});

var HighlightDropdown = React.createClass({
  render: function () {
    return (
      <Dropdown {...this.props} className='btn-highlight' />
    );
  }
});

var HighlightAltDropdown = React.createClass({
  render: function () {
    return (
      <Dropdown {...this.props} className='btn-highlight-alt' />
    );
  }
});


module.exports = {
  Dropdown: Dropdown,
  LinkDropdown: LinkDropdown,
  DefaultAltDropdown: DefaultAltDropdown,
  PrimaryDropdown: PrimaryDropdown,
  LowlightDropdown: LowlightDropdown,
  DangerDropdown: DangerDropdown,
  HighlightDropdown: HighlightDropdown,
  HighlightAltDropdown: HighlightAltDropdown,
  DropdownItem: DropdownItem
};
