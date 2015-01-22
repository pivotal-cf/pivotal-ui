'use strict';

var React = require('react/addons');

var Radio = React.createClass({
  propTypes: {
    checked: React.PropTypes.bool,
    defaultChecked: React.PropTypes.bool,
    name: React.PropTypes.string,
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    id: React.PropTypes.string
  },

  render: function() {
    var {id, checked, defaultChecked, name, value, onChange} = this.props;
    return (
      <div className='radio'>
        <label>
          <input type='radio' {...{id, checked, defaultChecked, name, value, onChange}}>
            {this.props.children}
          </input>
        </label>
      </div>
    );
  }
});

module.exports = {Radio};
