'use strict';

var React = require('react/addons');

var Ribbon = React.createClass({
  render: function() {
    return (
      <div className='inline-ribbon'>
        {this.props.children}
      </div>
    );
  }
});

var PrimaryRibbon = React.createClass({
  render: function() {
    return (
      <div className='inline-ribbon ribbon-primary'>
        {this.props.children}
      </div>
    );
  }
});

var Banner = React.createClass({
  render: function() {
    return (
      <div className='ribbon-banner'>
        {this.props.children}
      </div>
    );
  }
});

module.exports = {
  Ribbon: Ribbon,
  PrimaryRibbon: PrimaryRibbon,
  Banner: Banner
};
