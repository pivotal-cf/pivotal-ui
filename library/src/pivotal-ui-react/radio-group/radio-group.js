// DEPRECATED: MOVED INTO RADIO

var React = require('react');
import {mergeProps} from 'pui-react-helpers';

var RadioGroup = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func
  },

  render: function() {
    var {name, children, onChange, ...others} = this.props;

    children = React.Children.map(children,
      (child) => React.cloneElement(child, {name, onChange: onChange})
    );

    var props = mergeProps(others, {className: 'radio-group'});


    return <div {...props} >{children}</div>;
  }
});

module.exports = {RadioGroup};
