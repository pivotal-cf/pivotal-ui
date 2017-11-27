import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import deepEqual from 'deep-equal';
import {FormRow} from './form-row';
import {find} from '../helpers';

const deepClone = o => JSON.parse(JSON.stringify(o));
const noop = () => {
};

export class Form extends React.Component {
  static propTypes = {
    onModified: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onSubmitError: PropTypes.func.isRequired,
    afterSubmit: PropTypes.func.isRequired
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
              initial[name] = initialValue || '';
            }
          })
      ));

    const current = deepClone(initial);
    this.state = {
      initial,
      current,
      saving: false,
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
    const {initial, current, saving, requiredFields} = this.state;
    return !saving
      && find(Object.keys(initial), key => !deepEqual(initial[key], current[key]))
      && (checkRequiredFields
        ? checkRequiredFields(this.state.current)
        : !find(requiredFields, key => !current[key]))
      && !find(
        React.Children.toArray(children),
        row => find(
          React.Children.toArray(row.props.children),
          ({props: {name, validator}}) => validator && validator(this.state.current[name])));
  }

  canReset() {
    const {saving, initial, current} = this.state;
    return !saving && !deepEqual(initial, current);
  }

  async onSubmit(e) {
    e && e.preventDefault();
    const {onSubmit, onSubmitError, afterSubmit, onModified} = this.props;
    const {initial, current} = this.state;
    this.setState({saving: true});
    const nextState = {saving: false};
    try {
      const response = await onSubmit({initial, current});
      this.setState({...nextState, current, initial: deepClone(current), errors: {}});
      await onModified(false);
      afterSubmit({state: this.state, setState: this.setState, response, reset: this.reset});
    } catch (err) {
      this.setState({...nextState, errors: (onSubmitError && onSubmitError(err)) || {}});
      throw err;
    }
  }

  reset() {
    const {onModified} = this.props;
    const {initial} = this.state;
    onModified(false);
    this.setState({current: deepClone(initial), errors: {}});
  }

  render() {
    const {className, children} = this.props;
    const {saving} = this.state;
    const filteredChildren = React.Children.toArray(children).filter(child => {
      const childIsFormRow = child.type === FormRow || child.type.prototype instanceof FormRow;
      if (!childIsFormRow) {
        console.warn(`Child of type "${child.type}" will not be rendered. A Form\'s children should be of type FormRow.`);
      }
      return childIsFormRow;
    });

    return (
      <form {...{className: classnames('form', className), onSubmit: this.onSubmit}}>
        <fieldset {...{disabled: saving}}>
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