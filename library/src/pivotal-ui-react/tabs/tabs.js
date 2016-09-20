const Animation = require('pui-react-mixins/mixins/animation_mixin');
const {LargeTabs} = require('./large_tabs');
const mixin = require('pui-react-mixins');
const Tab = require('./tab');
const MediaSize = require('./media-size');
const {SmallTabs} = require('./small_tabs');
require('pui-css-tabs');
const React = require('react');
const uniqueid = require('lodash.uniqueid');

const types = React.PropTypes;

const privates = new WeakMap();

function triggerEnteredAndExitedCallbacks(childArray, {enteredKey, exitedKey}) {
  childArray.forEach(({props: {eventKey, onEntered, onExited}}) => {
    if(eventKey === enteredKey) {
      onEntered(eventKey);
    } else if (eventKey === exitedKey) {
      onExited(eventKey);
    }
  });
}

class Tabs extends mixin(React.Component).with(Animation) {
  constructor(props, context) {
    super(props, context);

    let {id} = this.props;
    if (typeof id === 'undefined') {
      id = uniqueid('pui-react-tabs-');
    }
    this.state = {
      activeKey: this.props.defaultActiveKey,
      smallScreen: false,
      id
    };
    privates.set(this, 0);
  }

  static propTypes = {
    actions: types.node,
    activeKey: types.number,
    animation: types.bool,
    defaultActiveKey: types.any,
    id: types.string,
    largeScreenClassName: types.string,
    onSelect: types.func,
    paneWidth: types.number,
    position: types.oneOf(['top', 'left']),
    responsiveBreakpoint: types.oneOf(['xs', 'sm', 'md', 'lg']),
    smallScreenClassName: types.string,
    tabType: types.oneOf(['simple', 'simple-alt', 'left']),
    tabWidth: types.number
  };

  static defaultProps = {
    animation: true,
    responsiveBreakpoint: 'xs',
    tabType: 'simple'
  };

  static ANIMATION_TIME = 400;

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultActiveKey !== this.props.defaultActiveKey) {
      this.setActiveKey(nextProps.defaultActiveKey);
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.checkScreenSize);
    this.checkScreenSize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkScreenSize);
  }

  setActiveKey(key) {
    const previousActiveKey = this.state.activeKey;
    this.setState({
      activeKey: key,
      previousActiveKey
    });
    if (key !== previousActiveKey) {
      this.animate('transitionProgress', 0);
      privates.set(this, 0);
    }
  }

  checkScreenSize = () => {
    if (MediaSize.matches(this.props.responsiveBreakpoint)) {
      this.setState({smallScreen: false});
    } else {
      this.setState({smallScreen: true});
    }
  };

  updateTransitionProgressAndTriggerCallbacks = (childArray) => {
    const {animation} = this.props;
    const oldTransitionProgress = privates.get(this);
    const transitionProgress = this.animate('transitionProgress', 1, animation ? Tabs.ANIMATION_TIME : 0);
    this.triggerTransitionCallbacks({childArray, oldTransitionProgress, transitionProgress});

    privates.set(this, transitionProgress);
    return transitionProgress;
  };

  triggerTransitionCallbacks = ({childArray, oldTransitionProgress, transitionProgress}) => {
    if(oldTransitionProgress < 1 && transitionProgress === 1) {
      const exitedKey = this.state.previousActiveKey;
      const enteredKey = this.state.activeKey;
      triggerEnteredAndExitedCallbacks(childArray, {enteredKey, exitedKey})
    }
  };

  handleClick = (e, eventKey, callback) => {
    if (callback) {
      (callback(e, eventKey));
    } else {
      this.setActiveKey(eventKey);
    }
  };

  render() {
    const {children} = this.props;
    const childArray = React.Children.toArray(children);
    const transitionProgress = this.updateTransitionProgressAndTriggerCallbacks(childArray);

    if (this.state.smallScreen) {
      return (
        <SmallTabs
          {...this.state}
          {...this.props}
          {...{
            transitionProgress,
            handleClick: this.handleClick
          }}

        />
      );
    }

    const {
      animation: __ignore1,
      children: _ignore2,
      defaultActiveKey: __ignore3,
      id = this.state.id,
      responsiveBreakpoint: __ignore4,
      smallScreenClassName: __ignore5,
      ...props} = this.props;
      const {activeKey, previousActiveKey} = this.state;

    return (
      <LargeTabs
        {...{...props, childArray, activeKey, previousActiveKey, id,
          handleClick: this.handleClick, transitionProgress}}/>
    );
  }
}

class LeftTabs extends React.Component {
  static propTypes = {
    position: types.oneOf(['top', 'left']),
    tabWidth: types.number,
    paneWidth: types.number
  };

  static defaultProps = {
    position: 'left',
    tabWidth: 6,
    tabType: 'left'
  };

  render() {
    let {tabWidth, paneWidth, ...props} = this.props;
    if (!paneWidth) {
      paneWidth = 24 - tabWidth;
    }
    return (
      <Tabs {...props} tabWidth={tabWidth} paneWidth={paneWidth}/>
    );
  }
}

module.exports = {
  Tabs,
  Tab,
  LeftTabs
};
