import raf from 'raf';
import React from 'react';
import ReactDOM from 'react-dom';
import shallowEqual from 'fbjs/lib/shallowEqual';
import mixin from '../mixins';
import Mounted from '../mixins/mounted_mixin';

const rafify = callback => (...args) => raf(() => callback.call(this, ...args));
const privates = new WeakMap();
const properties = ['width', 'height', 'top', 'right', 'bottom', 'left'];

export const useBoundingClientRect = Klass => {
  return class BoundingClientRect extends mixin(React.PureComponent).with(Mounted) {
    constructor(props, context) {
      super(props, context);
      let resolver;
      const containerReady = new Promise(resolve => resolver = resolve);
      containerReady.resolve = resolver;
      const {state} = this;
      this.state = {...state, container: null, containerReady};
      this.resize = rafify(this.resize);

      this.getBoundingClientRect = this.getBoundingClientRect.bind(this);
    }

    componentDidMount() {
      super.componentDidMount();
      privates.set(this, {resize: this.resize});
      window.addEventListener('resize', this.resize);
      this.setState({container: ReactDOM.findDOMNode(this.component)});
      setTimeout(() => this.state.containerReady.resolve(this.state.container), 0);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      const {resize} = privates.get(this) || {};
      window.removeEventListener('resize', resize);
      privates.delete(this);
    }

    componentDidUpdate(previousProps) {
      if (!shallowEqual(this.props, previousProps)) this.resize();
    }

    getBoundingClientRect() {
      return this.state.container && this.state.container.getBoundingClientRect() || {};
    }

    resize = () => {
      const {boundingClientRect: prevBoundingClientRect} = privates.get(this) || {};
      const boundingClientRect = this.getBoundingClientRect();
      const isNotEqual = property => boundingClientRect[property] !== prevBoundingClientRect[property];
      if (!prevBoundingClientRect || properties.some(isNotEqual)) {
        this.mounted() && this.forceUpdate();
      }
    }

    render() {
      const {resize} = privates.get(this) || {};
      const boundingClientRect = this.getBoundingClientRect();
      privates.set(this, {boundingClientRect, resize});
      return <Klass {...this.props} {...this.state} {...{boundingClientRect}} ref={ref => this.component = ref}/>;
    }
  };
};
