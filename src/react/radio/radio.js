import React from 'react';
import PropTypes from 'prop-types';
import {mergeProps} from '../helpers';
import classnames from 'classnames';
import uniqueId from 'lodash.uniqueid';

export class Radio extends React.Component {
  static propTypes = {
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    name: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    id: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    disabled: PropTypes.bool
  };

  componentDidMount() {
    require('../../css/forms');
  }

  render() {
    const {className, style, children, disabled, id = uniqueId('radio'), ...others} = this.props;
    return (<div {...{className: classnames('radio', className), style}}>
      <input type="radio" disabled={disabled} aria-disabled={disabled} id={id} {...others}/>
      {children}
    </div>);
  }
}

export class RadioGroup extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func
  };

  componentDidMount() {
    require('../../css/forms');
  }

  render() {
    let {name, children, onChange, ...others} = this.props;
    children = React.Children.map(children, child => React.cloneElement(child, {name, onChange: onChange}));
    const props = mergeProps(others, {className: 'radio-group'});

    return <div {...props} >{children}</div>;
  }
}
