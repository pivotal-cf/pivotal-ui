'use strict';

var React = require('react/addons');


var Ribbon = React.createClass({
  render: function() {
    return (
      <div className = "inline-ribbon">
        {this.props.children}
      </div>
    );
  }
});


module.exports = {

  Ribbon: Ribbon
};




