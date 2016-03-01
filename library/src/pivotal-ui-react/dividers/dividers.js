var React = require('react');
var types = React.PropTypes;
import {mergeProps} from 'pui-react-helpers';
import 'pui-css-dividers';

var DividerProps = {
  propTypes: {
    inverse: types.bool,
    size: types.oneOf(['large'])
  }
};

var Divider = React.createClass({
  propTypes: {
    inverse: types.bool,
    size: types.oneOf(['large'])
  },

  render() {
    var {inverse, size, ...others} = this.props;
    var dividerClass =
      {
        'divider-1': inverse && size !== 'large',
        'divider-2': inverse && size === 'large',
        'divider-alternate-1': !inverse && size !== 'large',
        'divider-alternate-2': !inverse && size === 'large'
      };

    const props = mergeProps(others, {className: dividerClass});

    return <hr {...props}/>;
  }
});

function defDivider(props) {
  return React.createClass({
    mixins: [DividerProps],
    render() {
      return <Divider {...props} {...this.props} />;
    }
  });
}

module.exports = {
  Divider,
  InverseDivider: defDivider({inverse: true})
};
