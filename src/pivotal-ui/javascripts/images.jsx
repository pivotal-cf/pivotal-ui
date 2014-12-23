'use strict';

var React = require('react/addons');
var _ = require('lodash');

var setClass = React.addons.classSet;

var Image = React.createClass({


  render: function () {
    var classes = setClass({
      'img-responsive': this.props.responsive
    });

    if (this.props.href){
      return(
        <a href={this.props.href}>
          <img {...this.props} className={classes}>
            {this.props.children}
          </img>
        </a>
        );
    }
    else {
      return (
        <img {...this.props} className={classes}>
          {this.props.children}
        </img>
        );
    }
  }
});

module.exports = {
  Image: Image
};
