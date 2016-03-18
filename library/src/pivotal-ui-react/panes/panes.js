var React = require('react');
var types = React.PropTypes;
import {mergeProps} from 'pui-react-helpers';
require('pui-css-panes');

class BasePane extends React.Component {
  static propTypes = {
    className: types.string,
    innerClassName: types.string
  };

  render() {
    var {innerClassName, children, ...other} = this.props;
    const outerProps = mergeProps(other, {className: 'pane'});
    const innerProps = mergeProps({className: innerClassName}, {className: 'container'});
    return (
      <div {...outerProps} >
        <div {...innerProps}>{children}</div>
      </div>
    );
  }
}

class Pane extends React.Component {
  static propTypes = {
    className: types.string
  };

  render() {
    var {className, ...other} = this.props;
    return <BasePane {...other} className={className}/>;
  }
}

module.exports = {BasePane, Pane};
