import React from 'react';
import PropTypes from 'prop-types';
import {FlexCol} from '../flex-grids';
import classnames from 'classnames';

export class FormCol extends React.Component {
  static propTypes = {
    state: PropTypes.object,
    setState: PropTypes.func,
    canSubmit: PropTypes.func,
    onSubmit: PropTypes.func,
    canReset: PropTypes.func,
    reset: PropTypes.func,
    hidden: PropTypes.bool,
    fixed: PropTypes.bool
  };

  static defaultProps = {state: {}};

  componentDidMount() {
    require('../../css/forms');
  }

  render() {
    const {state, setState, canSubmit, onSubmit, canReset, reset, fixed, children, hidden, className, id} = this.props;
    return (
      <FlexCol {...{className: classnames(className, 'form-col', {'col-fixed': fixed}), id, hidden}}>
        {typeof children === 'function'
          ? children({canSubmit, canReset, reset, onSubmit, submitting: state.submitting, setState, state})
          : children}
      </FlexCol>
    );
  }
}
