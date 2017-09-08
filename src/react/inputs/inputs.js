import classnames from 'classnames';
import {Icon} from '../iconography';
import {mergeProps} from '../helpers';
import React from 'react';
import PropTypes from 'prop-types';

export class Input extends React.Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
    displayError: PropTypes.bool,
    errorMessage: PropTypes.node,
    id: PropTypes.string,
    inputClassName: PropTypes.string,
    label: PropTypes.node,
    labelClassName: PropTypes.string,
    placeholder: PropTypes.string,
    search: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    success: PropTypes.bool,
    leftIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.object])
  };

  componentDidMount() {
    require('../../css/forms');
    if(this.props.autoFocus) this.input.focus();
  }

  render() {
    const {className, autoFocus, displayError, errorMessage, inputClassName, label, labelClassName, search, size, success, leftIcon, ...props} = this.props;
    const {id, placeholder} = props;
    const successClassName = success ? 'form-group-right-icon' : '';
    const formClasses = classnames(
      'form-group',
      {'form-group-left-icon': search || leftIcon},
      className,
      successClassName,
      {'has-error': displayError}
    );
    const labelClasses = classnames('control-label', labelClassName, {
      'label-lg': size === 'large',
      'label-sm': size === 'small',
    });
    const inputClassNames = classnames(inputClassName, {
      'input-lg': size === 'large',
      'input-sm': size === 'small',
    });
    const inputProps = mergeProps(props, {className: inputClassNames, 'aria-label': placeholder});
    const leftIconSrc = leftIcon || (search && 'search');
    const customLeftIcon = typeof leftIconSrc === 'string' ?
      <Icon className="input-icon" src={leftIconSrc}/> : <span className="input-icon">{leftIconSrc}</span>;

    return (<div className={formClasses}>
      {label && <label htmlFor={id} className={labelClasses}>{label}</label>}
      <div className="input-wrapper">
        <input {...inputProps} ref={ref => this.input = ref}/>
        {leftIconSrc && customLeftIcon}
        {success && <Icon className="success" src="check"/>}
      </div>
      {displayError && <div className="help-block">
        {errorMessage ? errorMessage : `Please enter your ${label.toLowerCase()}.`}
      </div>}
    </div>);
  }
}
