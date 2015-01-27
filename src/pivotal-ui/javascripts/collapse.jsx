'use strict';

var React = require('react');
var BsPanel = require('react-bootstrap/Panel');
var classSet = React.addons.classSet;

var CollapseMixin = require('./mixins/collapse-mixin');

var BaseCollapse = React.createClass({
  mixins: [CollapseMixin],

  getInitialState: function render() {
    return {
      expanded: false
    };
  },

  handleSelect: function () {
    this.setState({
      expanded: !this.state.expanded
    });
  },

  render: function render() {
    var {divider, header, children, ...others} = this.props;

    var classes = classSet({
      'panel-divider': divider
    });

    return (
      <BsPanel {...others} className={classes} collapsable expanded={this.state.expanded} onSelect={this.handleSelect} header={header}>
        {children}
      </BsPanel>
    );
  }
});

var Collapse = React.createClass({
  mixins: [CollapseMixin],

  render: function render() {
    var {header, ...others} = this.props;

    header = (
      <div className="collapse-trigger">
        <div className="when-collapsed-inline">
          <i className="fa fa-caret-right collapse-icon"></i>
        </div>
        <div className="when-expanded-inline">
          <i className="fa fa-caret-down collapse-icon"></i>
        </div>
        {header}
      </div>
    );

    return <BaseCollapse {...others} header={header} />;
  }
});

var AltCollapse = React.createClass({
  mixins: [CollapseMixin],

  render: function render() {
    var {header, ...others} = this.props;

    header = (
      <div className="collapse-trigger">
        <div className="when-collapsed-inline">
          <i className="fa fa-plus-square collapse-icon"></i>
        </div>
        <div className="when-expanded-inline">
          <i className="fa fa-minus-square collapse-icon"></i>
        </div>
        {header}
      </div>
    );

    return (
      <BaseCollapse {...others} header={header} />
    );
  }
});

module.exports = {
  BaseCollapse: BaseCollapse,
  Collapse: Collapse,
  AltCollapse: AltCollapse
};
