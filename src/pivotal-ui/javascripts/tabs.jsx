'use strict';

var React = require('react');
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');

var Tab = TabPane;

var SimpleAltTabs = React.createClass({
  render: function () {
    return (
      <div className="tab-simple-alt">
        <TabbedArea {...this.props} />
      </div>
    );
  }
});

var SimpleTabs = React.createClass({
  render: function () {
    return (
      <div className="tab-simple">
        <TabbedArea {...this.props} />
      </div>
    );
  }
});

module.exports = {
  SimpleAltTabs: SimpleAltTabs,
  SimpleTabs: SimpleTabs,
  Tab: Tab
};
