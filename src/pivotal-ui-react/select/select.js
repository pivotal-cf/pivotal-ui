import React from 'react';
import PropTypes from 'prop-types';
import {DefaultButton} from 'pui-react-buttons';
import {mergeProps} from 'pui-react-helpers';
import {Icon} from 'pui-react-iconography';
import {default as mixin} from 'pui-react-mixins';
import Scrim from 'pui-react-mixins/mixins/scrim_mixin';
import Transition from 'pui-react-mixins/mixins/transition_mixin';
import classnames from 'classnames';

import 'pui-css-select';

const isBlank = value => [null, undefined].includes(value);

export class Select extends mixin(React.Component).with(Scrim, Transition) {
  constructor(props, context) {
    super(props, context);
    const {defaultValue} = props;
    this.state = {
      open: false,
      uncontrolledValue: defaultValue
    };
  }

  static propTypes = {
    defaultValue: PropTypes.any,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onEntered: PropTypes.func,
    onExited: PropTypes.func,
    options: PropTypes.array.isRequired,
    value: PropTypes.any
  };

  toggle = () => this.setState({open: !this.state.open});

  select = e => {
    const value = e.target.getAttribute('value');
    Object.defineProperty(e.target, 'value', {value});

    this.setState({
      open: false,
      uncontrolledValue: value
    }, this.props.onChange && this.props.onChange(e));
  };

  scrimClick = () => this.setState({open: false});

  render() {
    const {open, uncontrolledValue} = this.state;
    const {value: controlledValue, defaultValue: __IGNORE2, onChange, name, options, onEntered, onExited, ...props} = mergeProps(this.props, {className: ['select', {open}]});
    const toggleValue = isBlank(controlledValue) ? uncontrolledValue : controlledValue;

    const {toggleLabel, selectOptions} = options.reduce((memo, option) => {
      const {value, label} = typeof option === 'object' ? option : {value: option, label: option};
      const selected = value === toggleValue;
      if (selected) memo.toggleLabel = label;
      const className = classnames({selected: value === toggleValue}, 'option');
      memo.selectOptions.push(<li {...{
        className,
        key: value,
        role: 'button',
        value,
        onClick: this.select
      }}>{label}</li>);
      return memo;
    }, {toggleLabel: toggleValue, selectOptions: []});
    const list = <ul>{selectOptions}</ul>;

    return (<div {...props}>
      <input type="hidden" {...{name, value: toggleValue}}/>
      <DefaultButton type="button" className="select-toggle" onClick={this.toggle}>
        <span className="select-toggle-label">{toggleLabel}</span>
        <Icon src="select_chevrons"/>
      </DefaultButton>
      {list}
      <div className="select-menu">{list}</div>
    </div>);
  }
}
