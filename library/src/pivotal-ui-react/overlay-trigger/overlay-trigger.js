import React from 'react';
import uniqueid from 'lodash.uniqueid';
import TetherComponent from 'react-tether';

import mixin from 'pui-react-mixins';
import Scrim from 'pui-react-mixins/mixins/scrim_mixin';

const types = React.PropTypes;

const TETHER_PLACEMENTS = {
  top:    'bottom center',
  bottom: 'top center',
  left:   'middle right',
  right:  'middle left'
};

const privates = new WeakMap();

class OverlayTrigger extends mixin(React.Component).with(Scrim) {
  constructor(props, context) {
    super(props, context);
    privates.set(this, {});
    this.state = {
      display: props.display
    }
  }

  static propTypes = {
    delay: types.number,
    delayHide: types.number,
    delayShow: types.number,
    display: types.bool,
    onEntered: types.func,
    onExited: types.func,
    overlay: types.element,
    pin: types.bool,
    placement: types.oneOf(['top', 'bottom', 'left', 'right']),
    disableScrim: types.bool,
    trigger: types.oneOf(['hover', 'click', 'focus', 'manual'])
  };

  static defaultProps = {
    display: false,
    pin: true,
    placement: 'right',
    trigger: 'hover'
  };

  componentWillReceiveProps({display}) {
    if (display !== this.props.display) this.setDisplay(display);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.display !== this.state.display) {
      const {onEntered, onExited} = this.props;
      const callback = this.state.display ? onEntered : onExited;
      callback && callback();
    }
  }

  componentWillUnmount() {
    if(super.componentWillUnmount) super.componentWillUnmount();
    clearTimeout(privates.get(this).timeout);
  }

  triggerShow = (eventType) => {
    return (...args) => {
      this.show();
      const userCallback = this.props.children.props[eventType];
      userCallback && userCallback(...args);
    }
  };

  triggerHide = (eventType) => {
    return (...args) => {
      this.hide();
      const userCallback = this.props.children.props[eventType];
      userCallback && userCallback(...args);
    }
  };

  getDelay = (display) => {
    const {delay, delayHide, delayShow} = this.props;
    if (display && delayShow) return delayShow;
    if (!display && delayHide) return delayHide;
    return delay;
  };

  scrimClick = () => {
    this.hide();
  };

  setDisplay = (display) => {
    clearTimeout(privates.get(this).timeout);
    if(display === this.state.display) return;
    const delay = this.getDelay(display);
    let timeout;
    if(delay) {
      timeout = setTimeout(() => {this.setState({display})}, delay);
    } else {
      this.setState({display});
    }

    privates.set(this, {timeout});
  };

  click = (...args) => {
    this.setDisplay(!this.state.display);
    const userCallback = this.props.children.props.onClick;
    userCallback && userCallback(...args);
  };

  show = () => {
    this.setDisplay(true);
  };

  hide = () => {
    this.setDisplay(false)
  };

  render() {
    const {pin, placement, trigger} = this.props;
    const {display} = this.state;
    let {children, overlay} = this.props;

    const overlayId = overlay.props.id || uniqueid('overlay');
    overlay = React.cloneElement(overlay, {id: overlayId});

    const triggerHandlers = {
      'manual': {},
      'hover': {
        onMouseOver: this.triggerShow('onMouseOver'),
        onMouseOut: this.triggerHide('onMouseOut')
      },
      'focus': {
        onFocus: this.triggerShow('onFocus'),
        onBlur: this.triggerHide('onFocus')
      },
      'click': {
        onClick: this.click
      }
    }[trigger];

    children = React.cloneElement(children, {
      'aria-describedby': overlayId,
      ...triggerHandlers
    });

    const tetherProps = {
      attachment: TETHER_PLACEMENTS[placement],
      constraints: pin ? [{to: 'window', attachment: 'together'}] : [],
      classes: {'target-attached': 'overlay-placement'}
    };

    return (
      <TetherComponent
        {...tetherProps}
      >
        {children}
        {display && overlay}
      </TetherComponent>
    );
  }
}

module.exports = {
  OverlayTrigger
};
