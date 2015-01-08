'use strict';

var React = require('react/addons');
var setClass = React.addons.classSet;

var InlineRibbon = React.createClass({
  render: function() {
    var classes = setClass({
      'inline-ribbon': true,
      'ribbon-primary': this.props.primary
    });

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
});

var BannerRibbon = React.createClass({
  render: function() {
    var classes = setClass({
      'ribbon-banner': true,
      'ribbon-primary': this.props.primary
    });

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = {
  BannerRibbon: BannerRibbon,
  InlineRibbon: InlineRibbon
};
