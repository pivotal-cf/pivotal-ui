'use strict';

var React = require('react');
var _ = require('lodash');

var PanelMixin = require('./mixins/panel-mixin');

var Panel = React.createClass({
  mixins: [PanelMixin],

  propTypes: {
    type: React.PropTypes.string,
    title: React.PropTypes.string
  },

  render: function () {
    var {type, className, padding, scrollable, children, ...other} = this.props;

    var classes = _.compact(['panel', type, className]),
        bodyClasses = _.compact(['panel-body', padding]),
        style = {};

    var title;
    if (this.props.title && this.props.title.length > 0) {
      title = (
        <div className="panel-header">
          <h5 className="panel-title-alt">{ this.props.title }</h5>
        </div>
      );
    } else {
      title = '';
    }

    if (scrollable) {
      classes.push(['panel-scrollable']);

      if (_.isNumber(scrollable)) {
        style.maxHeight = scrollable + 'px';
      }
    }

    return (
      <div {...other} className={classes.join(" ")} style={style}>
        { title }
        <div className={bodyClasses.join(" ")}>
          {children}
        </div>
      </div>
    );
  }
});

var SimplePanel = React.createClass({
  mixins: [PanelMixin],
  render: function () {
    return <Panel {...this.props} type="panel-simple" />;
  }
});

var BasicPanel = React.createClass({
  mixins: [PanelMixin],
  render: function () {
    return <Panel {...this.props} type="panel-basic" />;
  }
});

var BasicPanelAlt = React.createClass({
  mixins: [PanelMixin],
  render: function () {
    return <Panel {...this.props} type="panel-basic-alt" />;
  }
});

var ClickablePanel = React.createClass({
  mixins: [PanelMixin],
  render: function () {
    return <Panel {...this.props} type="panel-clickable" />;
  }
});

var ClickableAltPanel = React.createClass({
  mixins: [PanelMixin],
  render: function () {
    return <Panel {...this.props} type="panel-clickable-alt" />;
  }
});

var ShadowPanel = React.createClass({
  mixins: [PanelMixin],

  propTypes: {
    shadowLevel: React.PropTypes.oneOf([1, 2, 3, 4])
  },

  render: function () {
    var {shadowLevel, ...other} = this.props;
    shadowLevel = shadowLevel || 3;

    return <Panel {...other} type={'panel-shadow-' + shadowLevel} />;
  }
});

var HighlightPanel = React.createClass({
  mixins: [PanelMixin],
  render: function () {
    return <Panel {...this.props} type="panel-highlight" />;
  }
});

module.exports = {
  Panel: Panel,
  ClickablePanel: ClickablePanel,
  ClickableAltPanel: ClickableAltPanel,
  SimplePanel: SimplePanel,
  BasicPanel: BasicPanel,
  BasicPanelAlt: BasicPanelAlt,
  ShadowPanel: ShadowPanel,
  HighlightPanel: HighlightPanel
};
