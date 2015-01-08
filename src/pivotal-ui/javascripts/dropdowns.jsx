'use strict';

var React = require('react/addons');

var Dropdown = require('react-bootstrap/DropdownButton');
var DropdownItem = require('react-bootstrap/MenuItem');

var DropdownLink = React.createClass({
    render: function () {
        return (
            <Dropdown bsStyle='link' {...this.props} />
        );
    }
});

var DropdownDefaultAlt = React.createClass({
    render: function () {
        return (
            <Dropdown className='btn-default-alt' {...this.props} />
        );
    }
});

var DropdownPrimary = React.createClass({
    render: function () {
        return (
            <Dropdown bsStyle='primary' {...this.props} />
        );
    }
});

var DropdownLowlight = React.createClass({
    render: function () {
        return (
            <Dropdown className='btn-lowlight' {...this.props} />
        );
    }
});

var DropdownDanger = React.createClass({
    render: function () {
        return (
            <Dropdown bsStyle='danger' {...this.props} />
        );
    }
});

var DropdownHighlight = React.createClass({
    render: function () {
        return (
            <Dropdown className='btn-highlight' {...this.props} />
        );
    }
});

var DropdownHighlightAlt = React.createClass({
    render: function () {
        return (
            <Dropdown className='btn-highlight-alt' {...this.props} />
        );
    }
});


module.exports = {
  Dropdown: Dropdown,
  DropdownLink: DropdownLink,
  DropdownDefaultAlt: DropdownDefaultAlt,
  DropdownPrimary: DropdownPrimary,
  DropdownLowlight: DropdownLowlight,
  DropdownDanger: DropdownDanger,
  DropdownHighlight: DropdownHighlight,
  DropdownHighlightAlt: DropdownHighlightAlt,
  DropdownItem: DropdownItem
};
