const classnames = require('classnames');
const React = require('react');
const ReactFaIcon = require('react-fa/lib/Icon');
require('pui-css-iconography');

const types = React.PropTypes;

class Icon extends React.Component {
  static propTypes = {
    className: types.string,
    size: types.string
  };

  render() {
    const {size, className, ...props} = this.props;

    const classes = classnames(className, {[`fa-${size}`]: size});

    return (<ReactFaIcon className={classes} {...props} />);
  }
}

module.exports = {Icon};
