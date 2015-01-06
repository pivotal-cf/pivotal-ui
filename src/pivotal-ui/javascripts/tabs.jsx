'use strict';

var React = require('react');
var _ = require('lodash');

var SimpleAltTabs = React.createClass({
  render: function () {
    var activeIndex = _.findIndex(this.props.children, function (tab) {
      return tab.props.active;
    });

    if (activeIndex === -1) {
      activeIndex = 0;
    }

    var tabs = _.map(this.props.children, function(tab, index) {
      var className = index === activeIndex ? 'active' : '';
      var tabId = '#tab-' + index;

      return (
        <li key={'tab-head-' + index} className={className}>
          <a data-toggle="tab" href={tabId}>{tab.props.heading}</a>
        </li>
      );
    });

    var contents = _.map(this.props.children, function(tab, index) {
      var classes = ['tab-pane', 'fade'];
      var tabId = 'tab-' + index;
      if (index === activeIndex) {
        classes.push('in');
        classes.push('active');
      }

      return (
        <div key={'tab-content-' + index} id={tabId} className={classes.join(" ")}>
          {tab.props.children}
        </div>
      );
    });

    return (
      <div className="tab-simple-alt">
        <ul className="nav nav-tabs">
          {tabs}
        </ul>
        <div className="tab-content">
          {contents}
        </div>
      </div>
    );
  }
});

var Tab = React.createClass({
  render: function () {
    return "";
  }
});

module.exports = {
  SimpleAltTabs: SimpleAltTabs,
  Tab: Tab
};
