import React from 'react';
import {mergeProps} from 'pui-react-helpers';
import 'pui-css-panes';

const types = React.PropTypes;

export class BasePane extends React.Component {
  static propTypes = {
    className: types.string,
    innerClassName: types.string
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

export class Pane extends React.Component {
  static propTypes = {
    className: types.string
  }

  render() {
    const {className, ...other} = this.props;
    return <BasePane {...other} className={className}/>;
  }
}
