const React = require('react');
const types = React.PropTypes;
import {mergeProps} from 'pui-react-helpers';
import classnames from 'classnames';
import 'pui-css-forms';

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
        <label htmlFor={id} className={labelClasses}>{label}</label>
        <input {...inputProps} />
        {search && <i className='search-icon'/>}
        {displayError && <div className="error-text help-block">
          {errorMessage ? errorMessage : `Please enter your ${label.toLowerCase()}.`}
        </div>}
      </div>
    );
  }
}

module.exports = {Input};
