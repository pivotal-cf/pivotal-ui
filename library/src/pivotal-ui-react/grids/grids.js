var React = require('react');
var types = React.PropTypes;
var BootstrapRow = require('react-bootstrap/lib/Row');
import {mergeProps} from 'pui-react-helpers';
import 'pui-css-grids';

var Row = React.createClass({
  propTypes: {
    gutter: types.oneOf(['sm', 'md', 'lg'])
  },

  render() {
    const {gutter, children, ...other} = this.props;
    const gutterClass = {
      'row-gutter-md': gutter === 'md',
      'row-gutter-sm': gutter === 'sm'
    };
    const props = mergeProps(other, {className: gutterClass});
    return (<BootstrapRow {...props}>{children}</BootstrapRow>);
  }
});

var Col = require('react-bootstrap/lib/Col');

module.exports = {Row, Col};
