'use strict';

var React = require('react');
var _ = require('lodash');

var Panel = React.createClass({
  render: function () {
    var classes = _.compact(['panel', this.props.type, this.props.className]),
        bodyClasses = _.compact(['panel-body', this.props.padding]),
        style = {};

    if (this.props.scrollable) {
      classes.push(['panel-scrollable']);

      if (this.props.scrollable.match(/^\d+$/)) {
        style.maxHeight = this.props.scrollable + 'px';
      }
    }

    return (
      <div className={classes.join(" ")} style={style}>
        <div className={bodyClasses.join(" ")}>
          {this.props.children}
        </div>
      </div>
    );
  }
});

var SimplePanel = React.createClass({
  render: function () {
    return (
      <Panel {...this.props} type="panel-simple">
      </Panel>
    );
  }
});

var BasicPanel = React.createClass({
  render: function () {
    return (
      <Panel {...this.props} type="panel-basic">
      </Panel>
    );
  }
});

var ClickablePanel = React.createClass({
  render: function () {
    return (
      <Panel {...this.props} type="panel-clickable">
      </Panel>
    );
  }
});

var ClickableAltPanel = React.createClass({
  render: function () {
    return (
      <Panel {...this.props} type="panel-clickable-alt">
      </Panel>
    );
  }
});

var ShadowPanel = React.createClass({
  acceptedShadowLevels: ['1', '2', '3', '4'],
  render: function () {
    var type;

    if (_.contains(this.acceptedShadowLevels, '' + this.props.shadowLevel)) {
      type = "panel-shadow-" + this.props.shadowLevel;
    } else {
      type = "panel-shadow-3";
    }

    return (
      <Panel {...this.props} type={type}>
      </Panel>
    );
  }
});

var HighlightPanel = React.createClass({
  render: function () {
    return (
      <Panel {...this.props} type="panel-highlight">
      </Panel>
    );
  }
});


module.exports = {
  Panel: Panel,
  ClickablePanel: ClickablePanel,
  ClickableAltPanel: ClickableAltPanel,
  SimplePanel: SimplePanel,
  BasicPanel: BasicPanel,
  ShadowPanel: ShadowPanel,
  HighlightPanel: HighlightPanel
};
