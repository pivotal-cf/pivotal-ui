'use strict';

var React = require('react/addons');

var setClass = React.addons.classSet;

var UIImage = React.createClass({
  propTypes: {
    responsive: React.PropTypes.bool,
    href: React.PropTypes.string,
    src: React.PropTypes.string.isRequired
  },

  render: function () {
    var {responsive, href, src, children, ...other} = this.props;

    var classes = setClass({
      'img-responsive': responsive
    });

    var image = (
      <img {...other} src={src} className={classes}>
        {children}
      </img>
    );

    return (href) ? <a href={href}>{image}</a> : image;
  }
});

module.exports = {
  Image: UIImage
};
