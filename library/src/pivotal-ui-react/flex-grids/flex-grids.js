const React = require('react');
const types = React.PropTypes;

require('pui-css-flex-grids');

class Grid extends React.Component {
  static propTypes = {
    gutter: types.bool
  }

  static defaultProps = {
    gutter: true
  }

  render() {
    const {gutter, children, ...props} = this.props
    const gutterClass = gutter ? '' : 'grid-nogutter'
    return <div className={`grid ${gutterClass}`} {...props}>
      {children}
    </div>
  }
}

class Col extends React.Component {
  render() {
    const {children, ...props} = this.props
    return <div className="col" {...props}>
      {children}
    </div>
  }
}


module.exports = {Grid, Col};
