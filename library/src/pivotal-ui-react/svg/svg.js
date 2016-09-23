const React = require('react');

const types = React.PropTypes;

class Svg extends React.Component  {
  static propTypes = {
    src: types.string.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {Component: null};
  }

  svgPathLoader(src) {
    try {
      return require(`babel!svg-react!../../app/svg/${src}.svg`);
    } catch(e) {
    }
  }

  componentDidMount() {
    const {src} = this.props;
    this.setState({Component: this.svgPathLoader(src)});
  }

  render() {
    const {src, ...props} = this.props;
    const {Component} = this.state;
    if (Component) return <Component {...props}/>;
    return (<svg {...props}/>);
  }
}

module.exports = {Svg};