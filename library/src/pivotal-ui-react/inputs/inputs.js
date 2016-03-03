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
    displayError: types.bool,
    errorMessage: types.node,
    id: types.string,
    inputClassName: types.string,
    label: types.node,
    labelClassName: types.string,
    success: types.bool
  },

  render() {
    const {className, displayError, errorMessage, inputClassName, label, labelClassName, success, ...inputProps} = this.props;
    const {id} = inputProps;
    const successClassName = success ? 'has-success' : '';
    const formClasses = classnames('form-group', className, successClassName, {'has-error': displayError});
    const labelClasses = classnames('control-label', labelClassName);
    inputProps.className = classnames(inputClassName, 'form-control');
    return (
      <div className={formClasses}>
        <label htmlFor={id} className={labelClasses}>{label}</label>
        <input {...inputProps} />
        {displayError && <div className="error-text help-block">
          {errorMessage ? errorMessage : `Please enter your ${label.toLowerCase()}.`}
        </div>}
      </div>
    );
  }
});


const Checkbox = React.createClass({
  propTypes: {
    displayError: types.bool,
    errorMessage: types.node,
    inputClassName: types.string,
    id: types.string,
    label: types.node,
    labelClassName: types.string
  },

  render() {
    const {className, displayError, errorMessage, inputClassName, label, labelClassName, ...inputProps} = this.props;
    const {disabled, id} = inputProps;
    const componentClasses = classnames('form-group', className, {'has-error': displayError});
    const labelClasses = classnames('control-label', labelClassName, {disabled});

    return (
      <div className={componentClasses}>
        <div className="checkbox">
          <label className={labelClasses} htmlFor={id}>
            <input className={inputClassName} type="checkbox" {...inputProps}/>
            {label}
          </label>
          {displayError && <span className="help-block has-error">
            {errorMessage}
          </span>}
        </div>
      </div>
    );
  }
});

module.exports = {BasicInput, Checkbox, SearchInput};
