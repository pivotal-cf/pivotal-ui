import React, {Component} from 'react';

export default class ErrorBoundary extends Component {
  state = {hasError: false};

  componentWillReceiveProps() {
    this.setState({hasError: false});
  }

  componentDidCatch(error, info) {
    this.setState({hasError: true, error, info});
  }

  render() {
    const {hasError, error} = this.state;
    if (hasError) return <pre className="caught-error">{error.message}</pre>;
    return this.props.children;
  }
}