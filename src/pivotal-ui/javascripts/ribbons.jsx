'use strict';

var React = require('react/addons');


var InlineRibbon = React.createClass({
  render: function() {
    return (
      <div className = "inline-ribbon">
        {this.props.children}
      </div>
    );
  }
});


var BannerRibbon = React.createClass({
  render: function() {
    return (
      <div className = "ribbon-banner">
        {this.props.children}
      </div>
      );
  }
});


module.exports = {
  BannerRibbon: BannerRibbon,
  InlineRibbon: InlineRibbon
};




