import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Grid} from '../flex-grids';
import {FormCol} from './form-col';

export class FormRow extends React.Component {
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
    wrapper: PropTypes.func
  };

  componentDidMount() {
    require('../../css/forms');
  }

  render() {
    const {wrapper, state, children, className, id, ...props} = this.props;

    const filteredChildren = React.Children.toArray(children).filter(child => {
      const childIsFormRow = child.type === FormCol || child.type.prototype instanceof FormCol;
      if (!childIsFormRow) {
        console.warn(`Child of type "${child.type}" will not be rendered. A FormRow's children should be of type FormCol.`);
      }
      return childIsFormRow;
    });

    const row = (<Grid {...{id, className: classnames(className, 'form-row')}}>{React.Children.map(filteredChildren, (formCol, key) => {
      return React.cloneElement(formCol, {...props, ...formCol.props, state, key});
    })}</Grid>);

    return wrapper ? React.cloneElement(wrapper(state), {children: row}) : row;
  }
}