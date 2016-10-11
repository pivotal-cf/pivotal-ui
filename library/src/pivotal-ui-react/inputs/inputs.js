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
    success: types.bool
  };

  render() {
    const {className, displayError, errorMessage, inputClassName, label, labelClassName, search, success, ...props} = this.props;
    const {id, placeholder} = props;
    const successClassName = success ? 'has-success' : '';
    const formClasses = classnames(
      'form-group',
      {'form-group-search': search},
      className,
      successClassName,
      {'has-error': displayError}
    );

    const labelClasses = classnames('control-label', labelClassName);
    const inputClassNames = classnames(inputClassName, 'form-control');
    const inputProps = mergeProps(props, {className: inputClassNames, 'aria-label': placeholder})
    return (
      <div className={formClasses}>
        {label && <label htmlFor={id} className={labelClasses}>{label}</label>}
        <div className="input-wrapper">
          <input {...inputProps} />
          {search && <Icon className="search" src="search"/>}
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
