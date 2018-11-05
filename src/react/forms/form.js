import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import deepEqual from 'deep-equal';
import {FormRow} from './form-row';
import {find} from '../helpers';

const deepClone = o => JSON.parse(JSON.stringify(o));
const noop = () => {
};

function isPromise(promise = {}) {
  return typeof promise.then === 'function';
}

export class Form extends React.Component {
  static propTypes = {
    onModified: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onSubmitError: PropTypes.func.isRequired,
    afterSubmit: PropTypes.func.isRequired,
    resetOnSubmit: PropTypes.bool
  };

  static defaultProps = {
    onModified: noop,
    onSubmit: noop,
    onSubmitError: () => ({}),
    afterSubmit: noop
  };

  constructor(props) {
    super(props);
    const requiredFields = [];
    const initial = {};

    const {children} = props;
    React.Children.toArray(children)
      .filter(r => r)
      .forEach(formRow => (
        React.Children.toArray(formRow.props.children)
          .filter(c => c)
          .forEach(formCol => {
            if (!formCol.props) return;
            const {name, optional, initialValue} = formCol.props;
            if (name) {
              optional || requiredFields.push(name);
              initial[name] = typeof initialValue === 'undefined' ? '' : initialValue;
            }
          })
      ));

    const current = deepClone(initial);
    this.state = {
      initial,
      current,
      submitting: false,
      errors: {},
      requiredFields
    };

    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.reset = this.reset.bind(this);
    this.canSubmit = this.canSubmit.bind(this);
    this.canReset = this.canReset.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    require('../../css/forms');
  }

  componentWillUnmount() {
    this.props.onModified(false);
  }

  onChangeCheckbox(name) {
    return () => {
      this.setState({
        current: {
          ...this.state.current,
          [name]: !this.state.current[name]
        }
      });
    };
  }

  onChange(name, validator) {
    const {initial} = this.state;
    const {onModified} = this.props;
    return (...args) => {
      const value = args.length > 1 ? args[1] : args[0] && args[0].target.value;
      const nextState = {
        current: {
          ...this.state.current,
          [name]: value
        }
      };
      const error = validator && validator(value);
      if (!error) {
        nextState.errors = {
          ...this.state.errors,
          [name]: undefined
        };
      }
      this.setState(nextState);
      onModified(!deepEqual(initial, nextState.current));
    };
  }

  onBlur({name, validator}) {
    return ({target: {value}}) => {
      const error = validator(value);
      this.setState({
        errors: {
          ...this.state.errors,
          [name]: error
        }
      });
    };
  }

  canSubmit({checkRequiredFields} = {}) {
    const {children} = this.props;
    const {initial, current, submitting, requiredFields} = this.state;

    const isDiffFromInitial = find(Object.keys(initial), key => !deepEqual(initial[key], current[key]));
    const requiredFieldsHaveValue = requiredFields.every(key => current[key] || current[key] === 0);
    const passesValidators = !find(
      React.Children.toArray(children),
      row => find(
        React.Children.toArray(row.props.children),
        ({props: {name, validator}}) => validator && validator(this.state.current[name])));

    return !submitting
      && isDiffFromInitial
      && (checkRequiredFields
        ? checkRequiredFields(this.state.current)
        : requiredFieldsHaveValue)
      && passesValidators;
  }

  canReset() {
    const {submitting, initial, current} = this.state;
    return !submitting && !deepEqual(initial, current);
  }

  onSubmit(e) {
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
  }

  reset() {
    const {onModified} = this.props;
    const {initial} = this.state;
    onModified(false);
    this.setState({current: deepClone(initial), errors: {}});
  }

  render() {
    const {className, children, onSubmit, resetOnSubmit, onModified, onSubmitError, afterSubmit, ...other} = this.props;
    const {submitting} = this.state;
    const filteredChildren = React.Children.toArray(children).filter(child => {
      const childIsFormRow = child.type === FormRow || child.type.prototype instanceof FormRow;
      if (!childIsFormRow) {
        console.warn(`Child of type "${child.type}" will not be rendered. A Form\'s children should be of type FormRow.`);
      }
      return childIsFormRow;
    });

    return (
      <form {...{className: classnames('form', className), onSubmit: this.onSubmit, ...other}}>
        <fieldset {...{disabled: submitting}}>
          {filteredChildren.map((formRow, key) => (
            React.cloneElement(formRow, {
              key,
              state: this.state,
              setState: this.setState,
              canSubmit: this.canSubmit,
              onSubmit: this.onSubmit,
              canReset: this.canReset,
              reset: this.reset,
              onChange: this.onChange,
              onBlur: this.onBlur,
              onChangeCheckbox: this.onChangeCheckbox
            })
          ))}
        </fieldset>
      </form>
    );
  }
}