import React from 'react';
import PropTypes from 'prop-types';
import {mergeProps} from '../helpers';

export class BasePane extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    innerClassName: PropTypes.string
  };

  componentDidMount() {
    require('../../css/panes');
  }

  render() {
    const {innerClassName, children, ...other} = this.props;
    const outerProps = mergeProps(other, {className: 'pane'});
    const innerProps = mergeProps({className: innerClassName}, {className: 'container'});

    return (<div {...outerProps} >
      <div {...innerProps}>{children}</div>
    </div>);
  }
}

export class Pane extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string
  };

  componentDidMount() {
    require('../../css/panes');
  }

  render() {
    const {className, ...other} = this.props;
    return <BasePane {...other} className={className}/>;
  }
}
