import React from 'react';
import Animation from '../mixins/mixins/animation_mixin';
import {LargeTabs} from './large_tabs';
import {default as mixin} from '../mixins';
import PropTypes from 'prop-types';
import MediaSize from './media_size';
import {SmallTabs} from './small_tabs';
import uniqueid from 'lodash.uniqueid';

const privates = new WeakMap();

const triggerEnteredAndExitedCallbacks = (childArray, {enteredKey, exitedKey}) => {
  childArray.forEach(({props: {eventKey, onEntered, onExited}}) => {
    if (eventKey === enteredKey) {
      onEntered(eventKey);
    } else if (eventKey === exitedKey) {
      onExited(eventKey);
    }
  });
};

export class Tabs extends mixin(React.Component).with(Animation) {
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
    actions: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
    activeKey: PropTypes.number,
    animation: PropTypes.bool,
    defaultActiveKey: PropTypes.any,
    id: PropTypes.string,
    largeScreenClassName: PropTypes.string,
    onSelect: PropTypes.func,
    paneWidth: PropTypes.number,
    position: PropTypes.oneOf(['top', 'left']),
    responsiveBreakpoint: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
    smallScreenClassName: PropTypes.string,
    tabType: PropTypes.oneOf(['simple', 'simple-alt', 'left']),
    tabWidth: PropTypes.number
  };

  static defaultProps = {
    animation: true,
    responsiveBreakpoint: 'xs',
    tabType: 'simple'
  };

  static ANIMATION_TIME = 400;

  componentDidMount() {
    require('../../css/tabs');
    window.addEventListener('resize', this.checkScreenSize);
    this.checkScreenSize();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultActiveKey !== this.props.defaultActiveKey) {
      this.setActiveKey(nextProps.defaultActiveKey);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkScreenSize);
  }

  setActiveKey = key => {
    const previousActiveKey = this.state.activeKey;
    this.setState({
      activeKey: key,
      previousActiveKey
    });

    if (key !== previousActiveKey) {
      this.animate('transitionProgress', 0);
      privates.set(this, 0);
    }
  };

  checkScreenSize = () => {
    if (MediaSize.matches(this.props.responsiveBreakpoint)) {
      this.setState({smallScreen: false});
    } else {
      this.setState({smallScreen: true});
    }
  };

  updateTransitionProgressAndTriggerCallbacks = childArray => {
    const {animation} = this.props;
    const oldTransitionProgress = privates.get(this);
    const transitionProgress = this.animate('transitionProgress', 1, animation ? Tabs.ANIMATION_TIME : 0);
    this.triggerTransitionCallbacks({childArray, oldTransitionProgress, transitionProgress});

    privates.set(this, transitionProgress);
    return transitionProgress;
  };

  triggerTransitionCallbacks = ({childArray, oldTransitionProgress, transitionProgress}) => {
    if (oldTransitionProgress < 1 && transitionProgress === 1) {
      const exitedKey = this.state.previousActiveKey;
      const enteredKey = this.state.activeKey;
      triggerEnteredAndExitedCallbacks(childArray, {enteredKey, exitedKey});
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
      ...props
    } = this.props;
    const {activeKey, previousActiveKey} = this.state;

    return <LargeTabs {...{...props, childArray, activeKey, previousActiveKey, id, handleClick: this.handleClick, transitionProgress}}/>;
  }
}

export class LeftTabs extends React.PureComponent {
  static propTypes = {
    position: PropTypes.oneOf(['top', 'left']),
    tabWidth: PropTypes.number,
  };

  static defaultProps = {
    position: 'left',
    tabWidth: 3,
    tabType: 'left'
  };

  componentDidMount() {
    require('../../css/tabs');
  }

  render() {
    let {tabWidth, ...props} = this.props;
    return <Tabs {...props} tabWidth={tabWidth}/>;
  }
}
