import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function rootClick(e) {
  const node = ReactDOM.findDOMNode(this);
  if (typeof node.contains !== 'function') {
    node.contains = HTMLDivElement.prototype.contains;
  }

  if (this.props.disableScrim || node.contains(e.target)) return;
  this.scrimClick(e);
}

const privates = new WeakMap();

export default ParentClass => {
  return class Scrim extends ParentClass {
    static propTypes = {
      disableScrim: PropTypes.bool
    };

    constructor(props, context) {
      super(props, context);
      privates.set(this, rootClick.bind(this));
    }

    scrimClick() {
    }

    componentDidMount(...args) {
      if (super.componentDidMount) super.componentDidMount(...args);
      const document = this.props.getDocument ? this.props.getDocument() : global.document;
      if (typeof document === 'object') document.documentElement.addEventListener('click', privates.get(this));
    }

    componentWillUnmount(...args) {
      if (super.componentWillUnmount) super.componentWillUnmount(...args);
      const document = this.props.getDocument ? this.props.getDocument() : global.document;
      if (typeof document === 'object') document.documentElement.removeEventListener('click', privates.get(this));
    }
  };
};