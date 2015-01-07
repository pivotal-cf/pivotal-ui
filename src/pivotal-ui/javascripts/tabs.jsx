'use strict';

var React = require('react/addons');
var _ = require('lodash');

var classSet = React.addons.classSet;

var TabMenu = React.createClass({
  render: function () {
    var tabs = _.map(this.props.tabs, function(tab, index) {
      var classes = classSet({
        'active': index === this.props.activeIndex
      });
      var key = "tab-control-" + index;
      return (
        <li key={key} className={classes}>
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
      var classes = classSet({
        'tab-pane': true,
        'fade': true,
        'active in': this.props.activeIndex === index
      });

      var key = "tab-panel-" + index;

      return (
        <div key={key} className={classes}>
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
    var classes = classSet({
      'tab-simple': !this.props.alt,
      'tab-simple-alt': this.props.alt
    });

    return (
      <div className={classes}>
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

var AltTabs = React.createClass({
  render: function () {
    return (
      <Tabs alt="true">
        {this.props.children}
      </Tabs>
    );
  }
});

module.exports = {
  Tabs: Tabs,
  AltTabs: AltTabs,
  Tab: Tab
};
