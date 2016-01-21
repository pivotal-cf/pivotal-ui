var React = require('react');
import {mergeProps} from 'pui-react-helpers';

var Label = React.createClass({
  render() {
    let defaultProps = {
      className: ['label', 'label-primary']
    };
    let {children, ...others} = this.props;
    let props = mergeProps(others, defaultProps);
    return <span {...props}>{children}</span>;
  }
});

module.exports = {Label};
