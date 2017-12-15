import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uniqueId from 'lodash.uniqueid';

export class Radio extends React.Component {
  static propTypes = {
    checked: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    id: PropTypes.string,
    labelClassName: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    style: PropTypes.object,
    value: PropTypes.string.isRequired,
  };

  componentDidMount() {
    require('../../css/forms');
    require('../../css/radio');
  }

  render() {
    const {className, disabled, children, labelClassName, style, id = uniqueId('radio'), ...others} = this.props;

    return (
      <div {...{className: classnames('pui-radio', className), style}}>
        <input {...{
          ...others,
          className: 'pui-radio-input',
          type: 'radio',
          id,
          disabled,
          'aria-disabled': disabled
        }}/>
        <label {...{className: classnames('pui-radio-label', labelClassName), htmlFor: id}}>
          <span className="pui-radio-circle"/>
          {children}
        </label>
      </div>);
  }
}