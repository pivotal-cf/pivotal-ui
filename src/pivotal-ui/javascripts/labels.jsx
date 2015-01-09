'use strict';

var React = require('react/addons');

var Label = React.createClass({
  render: function () {
    return (
      <span className="label label-primary">
        {this.props.children}
      </span>
    );
  }
});

module.exports = {
  Label: Label
};
