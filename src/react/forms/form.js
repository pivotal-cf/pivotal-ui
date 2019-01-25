import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import deepEqual from 'deep-equal';
import cloneDeep from 'lodash.clonedeep';
import {FormUnit} from './form-unit';
import {find} from '../helpers';
import {Input} from '../inputs';
import crypto from 'crypto';

const isOptional = ({optional}, current) => typeof optional === 'function' ? optional({current}) : optional;
const isPromise = promise => promise && typeof promise.then === 'function';
const newId = () => crypto.randomBytes(16).toString('base64');
const noop = () => undefined;

const newFormState = (fields, ids, cb) => {
  const state = {initial: {}, current: {}, ids, submitting: false, errors: {}};

  for (const name in fields) {
    const props = fields[name];
    if (!props) continue;

    const {initialValue, currentValue} = cb({...props, name});
    state.initial[name] = initialValue;
    state.current[name] = currentValue;
    state.ids[name] = ids[name] || newId();
  }

  return state;
};

const newInitialValue = initialValue =>
  initialValue === null || initialValue === undefined ? '' : initialValue;

export class Form extends React.Component {
  static propTypes = {
    afterSubmit: PropTypes.func,
    fields: PropTypes.object,
    onModified: PropTypes.func,
    onSubmit: PropTypes.func,
    onSubmitError: PropTypes.func,
    resetOnSubmit: PropTypes.bool
  };

  static defaultProps = {
    children: noop,
    fields: {},
    onSubmit: noop,
    onSubmitError: () => ({}),
    afterSubmit: noop
  };

  constructor(props) {
    super(props);
    this.state = newFormState(props.fields, {}, ({initialValue}) => {
      initialValue = newInitialValue(initialValue);
      return {initialValue, currentValue: cloneDeep(initialValue)};
    });
  }

  componentDidMount() {
    require('../../css/forms');
  }

  shouldComponentUpdate({fields}, nextState) {
    const {current, initial} = nextState;
    const {initial: newInitial, ids, current: newCurrent} = newFormState(fields, nextState.ids,
      ({name, initialValue}) => {
        initialValue = newInitialValue(initialValue);
        return {
          initialValue: initial.hasOwnProperty(name)
            ? initial[name] === this.state.initial[name] ? cloneDeep(initialValue) : initial[name]
            : cloneDeep(initialValue),
          currentValue: current.hasOwnProperty(name)
            ? current[name] === this.state.initial[name] ? cloneDeep(initialValue) : current[name]
            : cloneDeep(initialValue)
        };
      });
    nextState.initial = newInitial;
    nextState.current = newCurrent;
    nextState.ids = ids;
    return true;
  }

  componentWillUnmount() {
    if (this.props.onModified) this.props.onModified(false);
  }

  onChangeCheckbox = (name, cb) => val => {
    const {initial, current} = this.state;
    const value = !this.state.current[name];
    const nextState = {current: {...current, [name]: value}};

    if (typeof val.persist === 'function') val.persist();

    const nextValue = {[name]: value};
    if (cb) this.setValues(nextValue, () => cb(val));
    else this.setValues(nextValue);

    if (this.props.onModified) this.props.onModified(!deepEqual(initial, nextState.current));
  };

  onChange = (name, validator, cb) => val => {
    const {initial} = this.state;
    const value = val.target && 'value' in val.target ? val.target.value : val;
    const nextState = {current: {...this.state.current, [name]: value}};

    const error = validator && validator(value);
    if (!error) {
      nextState.errors = {...this.state.errors};
      delete nextState.errors[name];
    }

    if (typeof val.persist === 'function') val.persist();

    if (cb) this.setState(nextState, () => cb(val));
    else this.setState(nextState);

    if (this.props.onModified) this.props.onModified(!deepEqual(initial, nextState.current));
  };

  onBlur = ({name, validator}) => ({target: {value}}) => {
    const error = validator(value);
    this.setState({errors: {...this.state.errors, [name]: error}});
  };

  canReset = () => !this.state.submitting && !deepEqual(this.state.initial, this.state.current);

  reset = () => {
    const {initial} = this.state;
    if (this.props.onModified) this.props.onModified(false);
    this.setState({current: cloneDeep(initial), errors: {}});
  };

  canSubmit = ({checkRequiredFields = () => true} = {}) => {
    const {fields} = this.props;
    const {initial, current, submitting} = this.state;

    const isDiffFromInitial = find(Object.keys(initial), key => !deepEqual(initial[key], current[key]));

    let passesValidators = true;
    for (const name in fields) {
      const props = fields[name];
      if (!props) continue;

      if (props.validator && props.validator(current[name])) {
        passesValidators = false;
        break;
      }
    }

    return !submitting && isDiffFromInitial && checkRequiredFields(current) && passesValidators;
  };

  onSubmit = e => {
    e && e.preventDefault();
    const {fields, onSubmit, onSubmitError = noop, afterSubmit, onModified, resetOnSubmit} = this.props;
    const {initial, current} = this.state;
    this.setState({submitting: true});
    const nextState = {submitting: false};

    const requiredFields = Object.keys(fields).filter(name => fields[name] && !isOptional(fields[name], current));
    const missingFields = requiredFields.filter(name => !current[name] && current[name] !== 0);

    if (missingFields.length) {
      const errors = missingFields.reduce((memo, name) => ({...memo, [name]: 'Please enter a value.'}), {});
      this.setState({...nextState, errors});
      const e = new Error('Please enter values for all required fields.');
      onSubmitError(e);
      throw e;
    }

    const onSuccess = response => {
      this.setState({
        ...nextState,
        current: resetOnSubmit ? cloneDeep(initial) : current,
        initial: resetOnSubmit ? initial : cloneDeep(current),
        errors: {}
      });
      const after = () => afterSubmit({state: this.state, response, reset: this.reset});
      const onModifiedPromise = onModified && onModified(false);
      return isPromise(onModifiedPromise) ? onModifiedPromise.then(after) : after();
    };

    const onError = e => {
      this.setState({...nextState, errors: (onSubmitError && onSubmitError(e)) || {}});
    };

    try {
      const afterSubmitPromise = onSubmit({initial, current});
      if (isPromise(afterSubmitPromise)) {
        return afterSubmitPromise.then(onSuccess).catch(onError);
      } else {
        return onSuccess(afterSubmitPromise);
      }
    } catch (e) {
      onError(e);
      throw e;
    }
  };

  setValues = (values, cb) => this.setState({current: {...this.state.current, ...values}}, cb);

  controlField = ({children = <Input type="text"/>, validator, name, ids}) => {
    const {canSubmit, canReset, reset, onSubmit, setValues, state, onChange, onBlur, onChangeCheckbox} = this;
    const {submitting} = state;

    const element = typeof children !== 'function'
      ? children
      : children({
        onChange: onChange(name, validator), canSubmit, canReset, reset, onSubmit, submitting, setValues, state
      });

    if (!element || React.Children.count(element) !== 1 || !name) return element;

    const props = {name: element.props.name || name};
    props.id = element.props.id || ids[props.name];

    const hasCurrentValue = state.current.hasOwnProperty(name);

    if (element.props.type === 'checkbox') {
      props.checked = !!(hasCurrentValue
        ? (state.current && state.current[name])
        : element.props.checked);
      props.onChange = onChangeCheckbox(name, element.props.onChange);
    } else {
      props.value = hasCurrentValue
        ? (state.current && state.current[name])
        : element.props.value;
      props.onChange = onChange(name, validator, element.props.onChange);
      if (validator) props.onBlur = onBlur({name, validator});
    }

    return React.cloneElement(element, props);
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const {className, children, fields, onModified, onSubmitError, afterSubmit, resetOnSubmit, ...others} = this.props;
    const {canSubmit, canReset, reset, onSubmit, setValues, state, onBlur} = this;
    const {current, submitting, ids} = state;

    const formUnits = {};
    for (const name in fields) {
      const props = fields[name];
      if (!props) continue;

      const error = state.errors[name];
      const children = this.controlField({...props, name, ids});
      const help = error || props.help;
      const labelFor = props.labelFor || children.props.id;
      // eslint-disable-next-line no-unused-vars
      const {className: _, ...rest} = props;

      formUnits[name] = (
        <FormUnit {...{
          ...rest, key: name, optional: isOptional(rest, current), setValues, state, name, hasError: !!error,
          help, labelFor, children
        }}/>
      );
    }

    return (
      <form {...{...others, className: classnames('form', className), onSubmit: this.onSubmit}}>
        <fieldset {...{disabled: submitting}}>
          {children({
            fields: formUnits, canSubmit, canReset, reset, onSubmit, setValues, state, onBlur, submitting
          })}
        </fieldset>
      </form>
    );
  }
}
