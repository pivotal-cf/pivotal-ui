import React from 'react';
import classnames from 'classnames';
import {Icon} from '../iconography';
import PropTypes from 'prop-types';
import uniqueId from 'lodash.uniqueid';

export class Checkbox extends React.Component {
  static propTypes = {
    checked: PropTypes.bool,
    className: PropTypes.string,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    indeterminate: PropTypes.bool,
    labelClassName: PropTypes.string,
    name: PropTypes.string,
    noSelect: PropTypes.bool,
    onChange: PropTypes.func,
    style: PropTypes.object,
    type: PropTypes.string
  };

  static defaultProps = {
    indeterminate: false,
    noSelect: false,
    type: 'checkbox'
  };

  componentDidMount() {
    this.el.indeterminate = this.props.indeterminate;
    require('../../css/forms');
    require('../../css/checkbox');
  }

  componentDidUpdate(prevProps) {
    if (prevProps.indeterminate !== this.props.indeterminate) {
      this.el.indeterminate = this.props.indeterminate;
    }
  }

  render() {
    const {noSelect, indeterminate, className, disabled, children, labelClassName, style, id = uniqueId('checkbox'), ...others} = this.props;

    return (
      <div {...{className: classnames('pui-checkbox', className), style}}>
        <input {...{
          ...others,
          className: 'pui-checkbox-input',
          type: 'checkbox',
          id,
          disabled,
          ref: el => this.el = el,
          'aria-disabled': disabled
        }}/>
        <label {...{className: classnames('pui-checkbox-label', labelClassName, {'pui-no-select': noSelect}), htmlFor: id}}>
          <span className="pui-checkbox-control">
            <Icon src={indeterminate ? 'remove' : 'check'}/>
          </span>
          {children}
        </label>
      </div>);
  }
}