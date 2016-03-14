const React = require('react');
const types = React.PropTypes;
import classnames from 'classnames';
import 'pui-css-forms';

class Checkbox extends React.Component {
  static propTypes = {
    displayError: types.bool,
    errorMessage: types.node,
    inputClassName: types.string,
    id: types.string,
    label: types.node,
    labelClassName: types.string
  };

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
}

module.exports = {Checkbox};
