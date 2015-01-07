'use strict';

var React = require('react');
var _ = require('lodash');

var TabMenu = React.createClass({
  render: function () {
    var tabs = _.map(this.props.tabs, function(tab, index) {
      var className = (index === this.props.activeIndex) ? "active" : "";
      var key = "tab-control-" + index;
      return (
        <li key={key} className={className}>
          <a onClick={this.props.onTabClick} data-index={index}>{tab}</a>
        </li>
      );
    }, this);

    return (
      <ul className="nav nav-tabs">
        {tabs}
      </ul>
    );
  }
});

var TabContents = React.createClass({
  render: function () {
    var panels = _.map(this.props.children, function(panel, index) {
      var className = "tab-pane fade";
      className += (this.props.activeIndex === index) ? " active in" : "";

      var key = "tab-panel-" + index;

      return (
        <div key={key} className={className}>
          {panel.props.children}
        </div>
      );
    }, this);

    return (
      <div className="tab-content">
        {panels}
      </div>
    );
  }
});

var Tabs = React.createClass({
  getInitialState: function () {
    return {
      activeIndex: 0
    };
  },
  componentWillMount: function () {
    if (this.props.activeTab) {
      this.setState({ activeIndex: this.props.activeTab });
    }
  },
  updateTabs: function (event) {
    var tabIndex = parseInt(event.target.getAttribute('data-index'));
    this.setState({ activeIndex: tabIndex });
  },
  render: function () {
    var tabLinks = _.pluck(_.pluck(this.props.children, 'props'), 'heading');

    return (
      <div className="tab-simple">
        <TabMenu tabs={tabLinks} activeIndex={this.state.activeIndex} onTabClick={this.updateTabs}/>
        <TabContents activeIndex={this.state.activeIndex}>{this.props.children}</TabContents>
      </div>
    );
  }
});

var Tab = React.createClass({
  render: function () {
    return (
      <div>
        {this.props.children}
      </div>
      );
  }
});

module.exports = {
  Tabs: Tabs,
  Tab: Tab
};
