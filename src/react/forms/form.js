import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import deepEqual from 'deep-equal';
import {FormUnit} from './form-unit';
import {find} from '../helpers';
import {Input} from '../inputs';
import crypto from 'crypto';

const deepClone = o => JSON.parse(JSON.stringify(o));
const isPromise = promise => promise && typeof promise.then === 'function';
const newId = () => crypto.randomBytes(16).toString('base64');
const noop = () => undefined;

const newFormState = (fields, cb) => Object.entries(fields)
  .filter(([name, props]) => props)
  .reduce((memo, [name, props]) => {
    const {initialValue, currentValue, isRequired} = cb({...props, name});
    memo.initial[name] = initialValue;
    memo.current[name] = currentValue;
    isRequired && memo.requiredFields.push(name);
    return memo;
  }, {initial: {}, current: {}, requiredFields: [], submitting: false, errors: {}});

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
    this.state = newFormState(props.fields, ({optional, initialValue}) => {
      initialValue = typeof initialValue === 'undefined' ? '' : initialValue;
      return {isRequired: !optional, initialValue, currentValue: deepClone(initialValue)};
    });
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    require('../../css/forms');
  }

  shouldComponentUpdate({fields}, nextState) {
    const {current: oldCurrent, initial: oldInitial} = nextState;
    const {initial, current, requiredFields} = newFormState(fields, ({name, optional, initialValue}) => {
      initialValue = typeof initialValue === 'undefined' ? '' : initialValue;
      return {
        isRequired: !optional,
        initialValue: oldInitial.hasOwnProperty(name) ? oldInitial[name] : initialValue,
        currentValue: oldCurrent.hasOwnProperty(name) ? oldCurrent[name] : deepClone(initialValue)
      };
    });
    nextState.initial = initial;
    nextState.current = current;
    nextState.requiredFields = requiredFields;
    return true;
  }

  componentWillUnmount() {
    this.props.onModified(false);
  }

  onChangeCheckbox = name => () => this.setState({current: {...this.state.current, [name]: !this.state.current[name]}});

  onChange = (name, validator) => val => {
    const {initial} = this.state;
    const {onModified} = this.props;
    const value = val.target && 'value' in val.target ? val.target.value : val;
    const nextState = {current: {...this.state.current, [name]: value}};
    const error = validator && validator(value);
    if (!error) {
      nextState.errors = {...this.state.errors};
      delete nextState.errors[name];
    }
    this.setState(nextState);
    onModified(!deepEqual(initial, nextState.current));
  };

  onBlur = ({name, validator}) => ({target: {value}}) => {
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
    const {initial, current, submitting, requiredFields} = this.state;
    return !submitting
      && find(Object.keys(initial), key => !deepEqual(initial[key], current[key]))
      && (checkRequiredFields
        ? checkRequiredFields(this.state.current)
        : !find(requiredFields, key => !current[key]))
      && !find(Object.entries(fields), ([name, {validator}]) => validator && validator(this.state.current[name]));
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
      const after = () => afterSubmit({state: this.state, setState: this.setState, response, reset: this.reset});
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

  controlField = ({children = <Input/>, validator, name}) => {
    const {canSubmit, canReset, reset, onSubmit, setState, state, onChange, onBlur, onChangeCheckbox} = this;
    const {submitting} = state;

    const element = typeof children !== 'function' ? children : children({
      canSubmit, canReset, reset, onSubmit, submitting, setState, state, onChange: onChange(name, validator)
    });

    if (!element || React.Children.count(element) !== 1 || !name) return element;

    const props = {name: element.props.name || name, id: element.props.id || newId()};

    if (element.props.type === 'checkbox') {
      props.checked = !!(element.props.hasOwnProperty('checked') ? element.props.checked : (state.current && state.current[name]));
      props.onChange = element.props.onChange || onChangeCheckbox(name);
    } else {
      props.value = element.props.hasOwnProperty('value') ? element.props.value : (state.current && state.current[name]);
      props.onChange = element.props.onChange || onChange(name, validator);
      if (validator) props.onBlur = onBlur({name, validator});
    }

    return React.cloneElement(element, props);
  };

  render() {
    const {className, children, fields, onModified, onSubmitError, afterSubmit, resetOnSubmit, ...others} = this.props;
    const {canSubmit, canReset, reset, onSubmit, setState, state, onChange, onBlur, onChangeCheckbox} = this;

    const formUnits = Object.entries(fields).reduce((memo, [name, props]) => {
      const error = state.errors[name];
      const field = this.controlField({...props, name});
      const help = error || props.help;
      const labelFor = props.labelFor || field.props.id;
      return {...memo, [name]: <FormUnit {...{...props, name, field, hasError: !!error, help, labelFor}}/>};
    }, {});

    return (
      <form {...{...others, className: classnames('form', className), onSubmit: this.onSubmit}}>
        <fieldset {...{disabled: state.submitting}}>
          {children({
            fields: formUnits, canSubmit, canReset, reset, onSubmit, setState, state, onChange, onBlur, onChangeCheckbox
          })}
        </fieldset>
      </form>
    );
  }
}