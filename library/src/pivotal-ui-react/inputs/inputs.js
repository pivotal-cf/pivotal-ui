const React = require('react');
const types = React.PropTypes;
import {mergeProps} from 'pui-react-helpers';
import classnames from 'classnames';
import 'pui-css-forms';

const SearchInput = React.createClass({
  propTypes: {
    placeholder: types.string
  },

  render() {
    const props = mergeProps(this.props, {className: 'form-control', type: 'text', 'aria-label': this.props.placeholder});
    return (
      <div className="form-group form-group-search">
        <input {...props}/>
        <i className='search-icon'/>
      </div>
    );
  }
});

const BasicInput = React.createClass({
  propTypes: {
    id: types.string,
    label: types.node,
    labelClassName: types.string,
    displayError: types.bool,
    errorMessage: types.node,
    inputClassName: types.string
  },

  render() {
    const {className, label, labelClassName, displayError, errorMessage, inputClassName, ...inputProps} = this.props;
    const {id} = inputProps;
    inputProps.className = classnames(inputClassName, 'form-control');
    const formClasses = classnames('form-group', className, {'has-error': displayError});
    const labelClasses = classnames('control-label', labelClassName);
    return (
      <div className={formClasses}>
        <label htmlFor={id} className={labelClasses}>{label}</label>
        <input {...inputProps}/>
        {displayError && <div className="error-text help-block">
          {errorMessage ? errorMessage : `Please enter your ${label.toLowerCase()}.`}
        </div>}
      </div>
    );
  }
});

module.exports = { SearchInput, BasicInput };
