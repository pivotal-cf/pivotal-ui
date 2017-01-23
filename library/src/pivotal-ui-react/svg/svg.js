import React from 'react';

const types = React.PropTypes;

export class Svg extends React.Component {
  static propTypes = {
    src: types.string.isRequired
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
    try {
      return require(`!!babel-loader!svg-react-loader!../pui-css-iconography/svgs/${src}.svg`);
    } catch (e) {
    }
  }

  render() {
    const {src, ...props} = this.props;
    const {Component} = this.state;
    if (Component) return <Component {...props}/>;
    return <svg {...props}/>;
  }
}
