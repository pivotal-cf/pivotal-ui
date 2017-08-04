import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import 'pui-css-forms';

export class Checkbox extends React.PureComponent {
  static propTypes = {
    displayError: PropTypes.bool,
    errorMessage: PropTypes.node,
    inputClassName: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
    labelClassName: PropTypes.string
  };

  render() {
    const {className, displayError, errorMessage, inputClassName, label, labelClassName, ...inputProps} = this.props;
    const {disabled, id} = inputProps;
    const componentClasses = classnames('form-group', className, {'has-error': displayError});
    const labelClasses = classnames('control-label', labelClassName, {disabled});
    
    return (<div className={componentClasses}>
      <div className="checkbox">
        <label className={labelClasses} htmlFor={id}>
          <input className={inputClassName} type="checkbox" {...inputProps}/>
          {label}
        </label>
        {displayError && <span className="help-block has-error">
            {errorMessage}
          </span>}
      </div>
    </div>);
  }
}
