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
    inputClassName: types.string,
    success: types.bool
  },

  render() {
    const {className, label, labelClassName, displayError, errorMessage, inputClassName, success, ...inputProps} = this.props;
    const {id} = inputProps;
    const successClassName = success ? 'has-success' : '';
    const formClasses = classnames('form-group', className, successClassName, {'has-error': displayError});
    const labelClasses = classnames('control-label', labelClassName);
    inputProps.className = classnames(inputClassName, 'form-control');
    return (
      <div>
        <label htmlFor={id} className={labelClasses}>{label}</label>
        <div className={formClasses}>
          <input {...inputProps} />
          {displayError && <div className="error-text help-block">
            {errorMessage ? errorMessage : `Please enter your ${label.toLowerCase()}.`}
          </div>}
        </div>
      </div>
    );
  }
});

module.exports = { SearchInput, BasicInput };
