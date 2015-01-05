'use strict';

var React = require('react');

var SearchInput = React.createClass({
  render: function () {
    var inputClasses = ['form-control'];

    if (this.props.className) {
      inputClasses.push(this.props.className);
    }

    inputClasses = inputClasses.join(" ");

    return(
      <div className='form-group form-group-search'>
        <input {...this.props} type='text' className={inputClasses} placeholder={this.props.placeholder}/>
        <i className='fa fa-search' />
      </div>
    );
  }
});

module.exports = {
  SearchInput: SearchInput
};
