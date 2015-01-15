'use strict';

var React = require('react/addons');

var Dropdown = require('react-bootstrap/DropdownButton');
var DropdownItem = require('react-bootstrap/MenuItem');

var LinkDropdown = React.createClass({
    render: function () {
        return (
            <Dropdown bsStyle='link' {...this.props} />
        );
    }
});

var DefaultAltDropdown = React.createClass({
    render: function () {
        return (
            <Dropdown className='btn-default-alt' {...this.props} />
        );
    }
});

var PrimaryDropdown = React.createClass({
    render: function () {
        return (
            <Dropdown bsStyle='primary' {...this.props} />
        );
    }
});

var LowlightDropdown = React.createClass({
    render: function () {
        return (
            <Dropdown className='btn-lowlight' {...this.props} />
        );
    }
});

var DangerDropdown = React.createClass({
    render: function () {
        return (
            <Dropdown bsStyle='danger' {...this.props} />
        );
    }
});

var HighlightDropdown = React.createClass({
    render: function () {
        return (
            <Dropdown className='btn-highlight' {...this.props} />
        );
    }
});

var HighlightAltDropdown = React.createClass({
    render: function () {
        return (
            <Dropdown className='btn-highlight-alt' {...this.props} />
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
