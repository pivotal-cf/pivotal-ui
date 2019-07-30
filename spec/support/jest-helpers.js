import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';
import prettyFormat from 'pretty-format';

const {DOMElement, DOMCollection} = prettyFormat.plugins;

export function setProps(props, node = root) {
  const Component = this.constructor;
  ReactDOM.render(<Component {...this.props} {...props}/>, node);
};

export function logHtml(selector) {
  const domNode = jQuery(selector)[0];
  // eslint-disable-next-line no-console
  console.log(prettyFormat(domNode, {plugins: [DOMElement, DOMCollection]}));
}