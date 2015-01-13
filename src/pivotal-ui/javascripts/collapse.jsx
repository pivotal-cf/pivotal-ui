'use strict';

var React = require('react');
var BsPanel = require('react-bootstrap/Panel');
var classSet = React.addons.classSet;

var CollapseBase = React.createClass({
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
    var classes = classSet({
      'panel-divider': this.props.divider
    });
    return (
      <BsPanel className={classes} collapsable expanded={this.state.expanded} onSelect={this.handleSelect} header={this.props.header}>
        {this.props.children}
      </BsPanel>
    );
  }
});

var Collapse = React.createClass({
  render: function render() {
    var header = (
      <div className="collapse-trigger">
        <div className="when-collapsed-inline">
          <i className="fa fa-caret-right collapse-icon"></i>
        </div>
        <div className="when-expanded-inline">
          <i className="fa fa-caret-down collapse-icon"></i>
        </div>
        {this.props.header}
      </div>
    );

    return (
      <CollapseBase {...this.props} header={header}>
        {this.props.children}
      </CollapseBase>
    );
  }
});

var CollapseAlt = React.createClass({
  render: function render() {
    var header = (
      <div className="collapse-trigger">
        <div className="when-collapsed-inline">
          <i className="fa fa-plus-square collapse-icon"></i>
        </div>
        <div className="when-expanded-inline">
          <i className="fa fa-minus-square collapse-icon"></i>
        </div>
        {this.props.header}
      </div>
    );

    return (
      <CollapseBase {...this.props} header={header}>
        {this.props.children}
      </CollapseBase>
    );
  }
});


module.exports = {
  CollapseBase: CollapseBase,
  Collapse: Collapse,
  CollapseAlt: CollapseAlt
};
