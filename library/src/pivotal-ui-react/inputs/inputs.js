import classnames from 'classnames';
import {Icon} from 'pui-react-iconography';
import {mergeProps} from 'pui-react-helpers';
import React from 'react';
import 'pui-css-forms';

const types = React.PropTypes;

export class Input extends React.Component {
  static propTypes = {
    autoFocus: types.bool,
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
  }

  componentDidMount() {
    if (this.props.autoFocus) this.input.focus()
  }

  render() {
    const {className, autoFocus, displayError, errorMessage, inputClassName, label, labelClassName, search, success, leftIcon, ...props} = this.props;
    const {id, placeholder} = props;
    const successClassName = success ? 'form-group-right-icon' : '';
    const formClasses = classnames(
      'form-group',
      {'form-group-left-icon': search || leftIcon},
      className,
      successClassName,
      {'has-error': displayError}
    );
    const labelClasses = classnames('control-label', labelClassName);
    const inputClassNames = classnames(inputClassName);
    const inputProps = mergeProps(props, {className: inputClassNames, 'aria-label': placeholder});
    const leftIconSrc = leftIcon || (search && 'search');
    const customLeftIcon = typeof leftIconSrc === 'string' ?
      <Icon className="input-icon" src={leftIconSrc}/> : <span className="input-icon">{leftIconSrc}</span>;

    return (<div className={formClasses}>
      {label && <label htmlFor={id} className={labelClasses}>{label}</label>}
      <div className="input-wrapper">
        <input {...inputProps} ref={ref => this.input = ref} />
        {leftIconSrc && customLeftIcon}
        {success && <Icon className="success" src="check"/>}
      </div>
      {displayError && <div className="help-block">
        {errorMessage ? errorMessage : `Please enter your ${label.toLowerCase()}.`}
      </div>}
    </div>);
  }
}
