import React from 'react';
import ReactDOM from 'react-dom';

export function setProps(props, node = root) {
  const Component = this.constructor;
  ReactDOM.render(<Component {...this.props} {...props}/>, node);
};