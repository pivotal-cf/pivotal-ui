var React = require('react');
var types = React.PropTypes;
import {mergeProps} from 'pui-react-helpers';
import 'pui-css-panes';

var BasePane = React.createClass({
  propTypes: {
    className: types.string,
    innerClassName: types.string
  },

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
});

var Pane = React.createClass({
  propTypes: {
    className: types.string
  },
  render() {
    var {className, ...other} = this.props;
    return <BasePane {...other} className={className}/>;
  }
});

module.exports = {BasePane, Pane};
