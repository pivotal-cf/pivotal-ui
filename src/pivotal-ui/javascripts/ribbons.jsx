'use strict';

var React = require('react/addons');
var classSet = React.classSet;

var InlineRibbon = React.createClass({

  render: function() {
    var type;
    if (this.props.primary) {
      type = "inline-ribbon ribbon-primary";
    }
    else {
      type = "inline-ribbon";
    }

    return (
      <div className = {type}>
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




