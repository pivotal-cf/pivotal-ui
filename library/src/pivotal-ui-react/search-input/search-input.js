//DEPRECATED; USE INPUTS COMPONENT

var React = require('react');
var types = React.PropTypes;
import {mergeProps} from 'pui-react-helpers';

var SearchInput = React.createClass({
  propTypes: {
    placeholder: types.string
  },

  render: function() {
    const props = mergeProps(this.props, {className: 'form-control', type: 'text', 'aria-label': this.props.placeholder});
    return (
      <div className="form-group form-group-search">
        <input {...props}/>
        <i className="fa fa-search"/>
      </div>
    );
  }
});

module.exports = {SearchInput};
