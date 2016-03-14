import React from 'react';
import ReactDOM from 'react-dom';

const types = React.PropTypes;

function rootClick(e) {
  if (this.props.disableScrim || ReactDOM.findDOMNode(this).contains(e.target)) return;
  this.scrimClick(e);
}

const privates = new WeakMap();

module.exports = function(ParentClass) {
  return class Scrim extends ParentClass {
    static propTypes = {
      disableScrim: types.bool
    };

    constructor(props, context) {
      super(props, context);
      privates.set(this, rootClick.bind(this));
    }

    scrimClick() {}

    componentDidMount(...args) {
      if(super.componentDidMount) super.componentDidMount(...args);
      document.documentElement.addEventListener('click', privates.get(this));
    }

    componentWillUnmount(...args) {
      if(super.componentWillUnmount) super.componentWillUnmount(...args);
      document.documentElement.removeEventListener('click', privates.get(this));
    }
  }
};
