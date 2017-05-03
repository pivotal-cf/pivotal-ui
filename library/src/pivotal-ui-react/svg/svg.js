import React from 'react';
import PropTypes from 'prop-types';

export class Svg extends React.Component {
  static propTypes = {
    src: PropTypes.string.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.state = {Component: null};
  }

  componentDidMount() {
    const {src} = this.props;
    this.setState({Component: this.svgPathLoader(src)});
  }

  svgPathLoader(src) {
    function _unDefault(obj) { return obj && obj.__esModule ? obj.default : obj; }
    try {
      return _unDefault(require(`!!babel-loader!react-svg-loader?{"svgo":{"plugins":[{"removeUnknownsAndDefaults":false},{"cleanupNumericValues":false},{"removeUselessStrokeAndFill":false}]}}!../../app/svg/${src}.svg`));
    } catch (e) {}
  }

  render() {
    const {src, ...props} = this.props;
    const {Component} = this.state;
    if (Component) return <Component {...props}/>;
    return <svg {...props}/>;
  }
}
