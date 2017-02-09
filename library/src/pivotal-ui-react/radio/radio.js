import React from 'react';
import {mergeProps} from 'pui-react-helpers';
import classnames from 'classnames';
import uniqueId from 'lodash.uniqueid';
import 'pui-css-forms';

export class Radio extends React.Component {
  static propTypes = {
    checked: React.PropTypes.bool,
    defaultChecked: React.PropTypes.bool,
    name: React.PropTypes.string,
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    style: React.PropTypes.object,
    disabled: React.PropTypes.bool
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
    id: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func
  }

  render() {
    let {name, children, onChange, ...others} = this.props;
    children = React.Children.map(children, child => React.cloneElement(child, {name, onChange: onChange}));
    const props = mergeProps(others, {className: 'radio-group'});

    return <div {...props} >{children}</div>;
  }
}
