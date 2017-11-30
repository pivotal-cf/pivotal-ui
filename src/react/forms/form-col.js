import React from 'react';
import PropTypes from 'prop-types';
import {FormUnit} from './form-unit';
import {FlexCol} from '../flex-grids';
import crypto from 'crypto';
import classnames from 'classnames';

const newId = () => crypto.randomBytes(16).toString('base64');

export class FormCol extends React.Component {
  static propTypes = {
    state: PropTypes.object,
    setState: PropTypes.func,
    canSubmit: PropTypes.func,
    onSubmit: PropTypes.func,
    canReset: PropTypes.func,
    reset: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onChangeCheckbox: PropTypes.func,
    name: PropTypes.string,
    help: PropTypes.node,
    validator: PropTypes.func,
    retainLabelHeight: PropTypes.bool,
    hidden: PropTypes.bool,
    labelFor: PropTypes.string,
    fixed: PropTypes.bool
  };

  static defaultProps = {
    state: {}
  };

  componentDidMount() {
    require('../../css/forms');
  }

  render() {
    const {
      state, setState, canSubmit, onSubmit, canReset, reset, onChange, onBlur, onChangeCheckbox, fixed,
      children, name, help, validator, retainLabelHeight, hidden, labelFor, className, id, ...rest
    } = this.props;

    const element = typeof children !== 'function' ? children : children({
      canSubmit,
      canReset,
      reset,
      onSubmit,
      submitting: state.submitting,
      setState,
      state,
      onChange: onChange ? onChange(name, validator) : () => null
    });

    let field = element, htmlFor;
    if (element && React.Children.count(element) === 1) {
      const props = {
        name: element.props.name || name,
        id: element.props.id || newId()
      };
      htmlFor = labelFor || props.id;

      if (name) {
        const isCheckbox = element.props.type === 'checkbox';
        if (isCheckbox) {
          props.checked = state.current[name];
          props.onChange = element.props.onChange || onChangeCheckbox(name);
        } else {
          props.value = element.props.value || (state.current && state.current[name]);
          props.onChange = element.props.onChange || (onChange ? onChange(name, validator) : () => {
            });
          validator && (props.onBlur = onBlur({name, validator}));
        }
      }
      field = React.cloneElement(element, props);
    }

    return (
      <FlexCol {...{className: classnames(className, 'form-col', {'col-fixed': fixed}), id, hidden}}>
        <FormUnit {...{
          retainLabelHeight,
          hasError: state.errors && !!state.errors[name],
          labelFor: htmlFor,
          state,
          setState,
          ...rest,
          field,
          help: (state.errors && state.errors[name]) || help
        }}/>
      </FlexCol>
    );
  }
}
