'use strict';

var React = require('react/addons');

var setClass = React.addons.classSet;

var UIImage = React.createClass({
  render: function () {
    var classes = setClass({
      'img-responsive': this.props.responsive
    });

    var href = this.props.href;
    delete this.props.href;

    if (href){
      return(
        <a href={href}>
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
  Image: UIImage
};
