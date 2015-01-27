'use strict';

var React = require('react');

var SearchInput = React.createClass({
  propTypes: {
    placeholder: React.PropTypes.string
  },

  render: function () {
    var {placeholder, className, ...other} = this.props;
    var inputClasses = ['form-control'];

    if (className) {
      inputClasses.push(className);
    }

    inputClasses = inputClasses.join(" ");

    return(
      <div className='form-group form-group-search'>
        <input {...other} type='text' className={inputClasses} placeholder={placeholder}/>
        <i className='fa fa-search' />
      </div>
    );
  }
});

module.exports = {
  SearchInput: SearchInput
};
