import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  componentWillReceiveProps() {
    this.setState({hasError: false});
  }

  componentDidCatch(error, info) {
    this.setState({hasError: true, error, info});
  }

  render() {
    const {hasError, error} = this.state;
    if (hasError) {
      return <pre>{error.message}</pre>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;