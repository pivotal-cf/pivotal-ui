const classnames = require('classnames');
const {Icon} = require('pui-react-iconography');
const {mergeProps} = require('pui-react-helpers');
const React = require('react');
const types = React.PropTypes;
require('pui-css-forms');

class Input extends React.Component {
  static propTypes = {
    displayError: types.bool,
    errorMessage: types.node,
    id: types.string,
    inputClassName: types.string,
    label: types.node,
    labelClassName: types.string,
    placeholder: types.string,
    search: types.bool,
    success: types.bool,
    leftIcon: types.oneOfType([
      types.string,
      types.element
    ])
  };

  render() {
    const {className, displayError, errorMessage, inputClassName, label, labelClassName, search, success, leftIcon, ...props} = this.props;
    const {id, placeholder} = props;
    const successClassName = success ? 'has-success' : '';
    const formClasses = classnames(
      'form-group',
      {'form-group-left-icon': search || leftIcon},
      className,
      successClassName,
      {'has-error': displayError}
    );
    const labelClasses = classnames('control-label', labelClassName);
    const inputClassNames = classnames(inputClassName, 'form-control');
    const inputProps = mergeProps(props, {className: inputClassNames, 'aria-label': placeholder});
    const leftIconSrc = leftIcon || (search && 'search');
    const leftIconClass = 'input-left-icon';
    const customLeftIcon = typeof leftIconSrc === 'string' ?
      <Icon className={leftIconClass} src={leftIconSrc}/> : <span className={leftIconClass}>{leftIconSrc}</span>;
    return (
      <div className={formClasses}>
        {label && <label htmlFor={id} className={labelClasses}>{label}</label>}
        <div className="input-wrapper">
          <input {...inputProps} />
          {leftIconSrc && customLeftIcon}
          {success && <Icon className="success" src="check"/>}
        </div>
        {displayError && <div className="error-text help-block">
          {errorMessage ? errorMessage : `Please enter your ${label.toLowerCase()}.`}
        </div>}
      </div>
    );
  }
}

module.exports = {Input};
