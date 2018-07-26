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

const newFormState = (children, cb) => {
  const initial = {}, current = {}, requiredFields = [];

  React.Children.toArray(children)
    .filter(r => r)
    .forEach(formRow => (
      React.Children.toArray(formRow.props.children)
        .filter(c => c)
        .forEach(formCol => {
          if (!formCol.props || !formCol.props.name) return;
          const {initialValue, currentValue, isRequired} = cb(formCol.props);
          const {name} = formCol.props;
          initial[name] = initialValue;
          current[name] = currentValue;
          isRequired && requiredFields.push(name);
        })
    ));

  return {initial, current, requiredFields};
};

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
    this.state = {
      submitting: false,
      errors: {},
      ...newFormState(props.children, ({name, optional, initialValue}) => {
        initialValue = typeof initialValue === 'undefined' ? '' : initialValue;
        return {isRequired: !optional, initialValue, currentValue: deepClone(initialValue)};
      })
    };
  }

  componentDidMount() {
    require('../../css/forms');
  }

  shouldComponentUpdate({children}, nextState) {
    const {current: oldCurrent, initial: oldInitial} = nextState;

    const {initial, current, requiredFields} = newFormState(children, ({name, optional, initialValue}) => {
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

  onChangeCheckbox = name => {
    return () => {
      this.setState({
        current: {
          ...this.state.current,
          [name]: !this.state.current[name]
        }
      });
    };
  };

  onChange = (name, validator) => {
    const {initial} = this.state;
    const {onModified} = this.props;
    return val => {
      const value = val.target && val.target.hasOwnProperty('value') ? val.target.value : val;
      const nextState = {
        current: {
          ...this.state.current,
          [name]: value
        }
      };
      const error = validator && validator(value);
      if (!error) {
        nextState.errors = {...this.state.errors};
        delete nextState.errors[name];
      }
      this.setState(nextState);
      onModified(!deepEqual(initial, nextState.current));
    };
  };

  onBlur = ({name, validator}) => {
    return ({target: {value}}) => {
      const error = validator(value);
      this.setState({
        errors: {
          ...this.state.errors,
          [name]: error
        }
      });
    };
  };

  canSubmit = ({checkRequiredFields} = {}) => {
    const {children} = this.props;
    const {initial, current, submitting, requiredFields} = this.state;
    return !submitting
      && find(Object.keys(initial), key => !deepEqual(initial[key], current[key]))
      && (checkRequiredFields
        ? checkRequiredFields(this.state.current)
        : !find(requiredFields, key => !current[key]))
      && !find(
        React.Children.toArray(children),
        row => find(
          React.Children.toArray(row.props.children),
          ({props: {name, validator}}) => validator && validator(this.state.current[name])));
  };

  canReset = () => {
    const {submitting, initial, current} = this.state;
    return !submitting && !deepEqual(initial, current);
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

  reset = () => {
    const {onModified} = this.props;
    const {initial} = this.state;
    onModified(false);
    this.setState({current: deepClone(initial), errors: {}});
  };

  render() {
    const {className, children, onSubmit, resetOnSubmit, onModified, onSubmitError, afterSubmit, ...other} = this.props;
    const {submitting} = this.state;
    const filteredChildren = React.Children.toArray(children).filter(child => {
      const childIsFormRow = child.type === FormRow || child.type.prototype instanceof FormRow;
      if (!childIsFormRow) {
        console.warn(`Child of type "${child.type}" will not be rendered. A Form's children should be of type FormRow.`);
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