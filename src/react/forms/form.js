import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import deepEqual from 'deep-equal';
import {FormUnit} from './form-unit';
import {find} from '../helpers';
import {Input} from '../inputs';
import crypto from 'crypto';

const deepClone = o => JSON.parse(JSON.stringify(o));
// eslint-disable-next-line no-unused-vars
const getFieldEntries = fields => Object.entries(fields).filter(([name, props]) => props);
const isOptional = ({optional}, current) => typeof optional === 'function' ? optional({current}) : optional;
const isPromise = promise => promise && typeof promise.then === 'function';
const newId = () => crypto.randomBytes(16).toString('base64');
const noop = () => undefined;

const newFormState = (fields, ids, cb) => getFieldEntries(fields)
  .reduce((memo, [name, props]) => {
    const {initialValue, currentValue} = cb({...props, name});
    memo.initial[name] = initialValue;
    memo.current[name] = currentValue;
    memo.ids[name] = ids[name] || newId();
    return memo;
  }, {initial: {}, current: {}, ids, submitting: false, errors: {}});
const newInitialValue = initialValue => [null, undefined].includes(initialValue) ? '' : initialValue;

export class Form extends React.Component {
  static propTypes = {
    fields: PropTypes.object,
    onModified: PropTypes.func,
    onSubmit: PropTypes.func,
    onSubmitError: PropTypes.func,
    afterSubmit: PropTypes.func,
    resetOnSubmit: PropTypes.bool
  };

  static defaultProps = {
    children: noop,
    fields: {},
    onModified: noop,
    onSubmit: noop,
    onSubmitError: () => ({}),
    afterSubmit: noop
  };

  constructor(props) {
    super(props);
    this.state = newFormState(props.fields, {}, ({initialValue}) => {
      initialValue = newInitialValue(initialValue);
      return {initialValue, currentValue: deepClone(initialValue)};
    });
    this.setState = this.setState.bind(this);
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
          initialValue: initial.hasOwnProperty(name) ? initial[name] : initialValue,
          currentValue: current.hasOwnProperty(name) ? current[name] : deepClone(initialValue)
        };
      });
    nextState.initial = newInitial;
    nextState.current = newCurrent;
    nextState.ids = ids;
    return true;
  }

  componentWillUnmount() {
    this.props.onModified(false);
  }

  onChangeCheckbox = (name, cb = noop) => val => {
    if (typeof val.persist === 'function') val.persist();
    this.setValues({[name]: !this.state.current[name]}, () => cb(val));
  };

  onChange = (name, validator, cb = noop) => val => {
    const {initial} = this.state;
    const {onModified} = this.props;
    const value = val.target && 'value' in val.target ? val.target.value : val;
    const nextState = {current: {...this.state.current, [name]: value}};
    const error = validator && validator(value);
    if (!error) {
      nextState.errors = {...this.state.errors};
      delete nextState.errors[name];
    }
    if (typeof val.persist === 'function') val.persist();
    this.setState(nextState, () => cb(val));
    onModified(!deepEqual(initial, nextState.current));
  };

  onBlur = ({name, validator}) => val => {
    const value = val.target && 'value' in val.target ? val.target.value : val;

    const error = validator(value);
    this.setState({errors: {...this.state.errors, [name]: error}});
  };

  canReset = () => !this.state.submitting && !deepEqual(this.state.initial, this.state.current);

  reset = () => {
    const {onModified} = this.props;
    const {initial} = this.state;
    onModified(false);
    this.setState({current: deepClone(initial), errors: {}});
  };

  canSubmit = ({checkRequiredFields} = {}) => {
    const {fields} = this.props;
    const {initial, current, submitting} = this.state;
    return !submitting
      && find(Object.keys(initial), key => !deepEqual(initial[key], current[key]))
      && (checkRequiredFields
        ? checkRequiredFields(this.state.current)
        : !find(Object.keys(fields)
          .filter(name => fields[name] && !isOptional(fields[name], current)), name => !current[name]))
      && !find(getFieldEntries(fields), ([name, {validator}]) => validator && validator(this.state.current[name]));
  };

  onSubmit = e => {
    e && e.preventDefault();
    const {onSubmit, onSubmitError, afterSubmit, onModified, resetOnSubmit} = this.props;
    const {initial, current} = this.state;
    this.setState({submitting: true});
    const nextState = {submitting: false};

    const onSuccess = response => {
      this.setState({
        ...nextState,
        current: resetOnSubmit ? deepClone(initial) : current,
        initial: resetOnSubmit ? initial : deepClone(current),
        errors: {}
      });
      const after = () => afterSubmit({state: this.state, response, reset: this.reset});
      const onModifiedPromise = onModified(false);
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
        onChange: onChange(name, validator), canSubmit, canReset, reset, onSubmit, submitting, setValues, state, onBlur: onBlur({name, validator})
      });

    if (!element || React.Children.count(element) !== 1 || !name) return element;

    const props = {name: element.props.name || name};
    props.id = element.props.id || ids[props.name];

    if (element.props.type === 'checkbox') {
      props.checked = !!(element.props.hasOwnProperty('checked') ? element.props.checked : (state.current && state.current[name]));
      props.onChange = onChangeCheckbox(name, element.props.onChange);
    } else {
      props.value = element.props.hasOwnProperty('value') ? element.props.value : (state.current && state.current[name]);
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

    const formUnits = getFieldEntries(fields).reduce((memo, [name, props]) => {
      const error = state.errors[name];
      const children = this.controlField({...props, name, ids});
      const help = error || props.help;
      const labelFor = props.labelFor || children.props.id;
      // eslint-disable-next-line no-unused-vars
      const {className: _, ...rest} = props;
      const formUnit = (
        <FormUnit {...{
          ...rest, key: name, optional: isOptional(rest, current), setValues, state, name, hasError: !!error,
          help, labelFor, children
        }}/>
      );
      return {...memo, [name]: formUnit};
    }, {});

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