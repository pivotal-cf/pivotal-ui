import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Grid} from '../flex-grids';

export class FormRow extends React.Component {
  static propTypes = {
    state: PropTypes.object,
    children: PropTypes.node,
    className: PropTypes.string,
    id: PropTypes.string,
    wrapper: PropTypes.func
  };

  componentDidMount() {
    require('../../css/forms');
  }

  render() {
    const {state, children, className, id, wrapper} = this.props;
    const row = (<Grid {...{id, className: classnames(className, 'form-row')}}>{children}</Grid>);
    return wrapper ? React.cloneElement(wrapper(state), {children: row}) : row;
  }
}