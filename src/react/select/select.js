import React from 'react';
import PropTypes from 'prop-types';
import {DefaultButton} from '../buttons';
import {mergeProps} from '../helpers';
import {Icon} from '../iconography';
import {default as mixin} from '../mixins';
import Scrim from '../mixins/mixins/scrim_mixin';
import Transition from '../mixins/mixins/transition_mixin';
import classnames from 'classnames';

const isBlank = value => value === null || value === undefined;

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

  componentDidMount() {
    super.componentDidMount();
    require('../../css/select');
  }

  toggle = () => this.setState({open: !this.state.open});

  select = e => {
    const value = e.target.getAttribute('data-value');

    this.setState({
      open: false,
      uncontrolledValue: value
    }, this.props.onChange && this.props.onChange(e, value));
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
        'data-value': value,
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
