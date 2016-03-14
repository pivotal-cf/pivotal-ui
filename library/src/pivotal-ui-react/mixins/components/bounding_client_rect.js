const raf = require('raf');
const React = require('react');
const ReactDOM = require('react-dom');
const shallowEqual = require('fbjs/lib/shallowEqual');
import mixin from '../mixins';
const ShallowCompare = require('../mixins/shallow_compare_mixin');
const Component = mixin(React.Component).with(ShallowCompare);

const rafify = function rafify(callback) {
  return function(...args) {
    raf(() => callback.call(this, ...args));
  };
};

const privates = new WeakMap();

const properties = ['width', 'height', 'top', 'right', 'bottom', 'left'];

module.exports = {
  useBoundingClientRect(Klass) {
    return class BoundingClientRect extends Component {
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
        privates.set(this, {resize: this.resize});
        window.addEventListener('resize', this.resize);
        this.setState({container: ReactDOM.findDOMNode(this.component)});
        setImmediate(() => this.state.containerReady.resolve(this.state.container));
      }

      componentWillUnmount() {
        const {resize} = privates.get(this) || {};
        window.removeEventListener('resize', resize);
        privates.delete(this);
      }

      componentWillReceiveProps(nextProps) {
        if (!shallowEqual(this.props, nextProps)) this.resize();
      }

      getBoundingClientRect() {
        return this.state.container && this.state.container.getBoundingClientRect() || {};
      }

      resize = () => {
        const {boundingClientRect: prevBoundingClientRect} = privates.get(this) || {};
        const boundingClientRect = this.getBoundingClientRect();
        const isNotEqual = property => boundingClientRect[property] !== prevBoundingClientRect[property];
        if (!prevBoundingClientRect || properties.some(isNotEqual)) this.forceUpdate();
      };

      render() {
        const {resize} = privates.get(this) || {};
        const boundingClientRect = this.getBoundingClientRect();
        privates.set(this, {boundingClientRect, resize});
        return (
          <Klass {...this.props} {...this.state} {...{boundingClientRect}} ref={ref => this.component = ref}/>
        );
      }
    };
  }
};
