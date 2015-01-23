'use strict';

var React = require('react/addons');

var Li = React.createClass({
  render: function() {
    return (
      <li {...this.props}>{this.props.children}</li>
    );
  }
});


module.exports = {Li};
