import React from 'react';
import PropTypes from 'prop-types';

const unDefault = obj => obj && obj.__esModule ? obj.default : obj;

export class Svg extends React.PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {Component: null};
  }

  setComponent({src}) {
    this.setState({Component: unDefault(this.svgPathLoader(src))});
  }

  componentDidMount() {
    this.setComponent(this.props);
  }

  componentWillReceiveProps(props) {
    this.setComponent(props);
  }

  svgPathLoader(src) {
    try {
      return require(`!!babel-loader?{"presets":["react"]}!react-svg-loader?{"svgo":{"plugins":[{"removeUnknownsAndDefaults":false},{"cleanupNumericValues":false},{"removeUselessStrokeAndFill":false}]}}!../../../../app/svgs/${src}.svg`);
    } catch (e) {}
  }

  render() {
    const {src, ...props} = this.props;
    const {Component} = this.state;
    if (Component) return <Component {...props}/>;
    return <svg {...props}/>;
  }
}
