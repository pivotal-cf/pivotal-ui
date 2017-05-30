import React from 'react';
import 'pui-css-tooltips';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Scrim from 'pui-react-mixins/mixins/scrim_mixin';
import TetherComponent from 'react-tether';
import uniqueid from 'lodash.uniqueid';
import {default as mixin} from 'pui-react-mixins';

const TETHER_PLACEMENTS = {
  top: 'bottom center',
  bottom: 'top center',
  left: 'middle right',
  right: 'middle left'
};

const privates = new WeakMap();

export class OverlayTrigger extends mixin(React.Component).with(Scrim) {
  constructor(props, context) {
    super(props, context);
    privates.set(this, {});
    this.state = {
      display: props.display
    };
  }

  static propTypes = {
    delay: PropTypes.number,
    delayHide: PropTypes.number,
    delayShow: PropTypes.number,
    disableScrim: PropTypes.bool,
    display: PropTypes.bool,
    onEntered: PropTypes.func,
    onExited: PropTypes.func,
    overlay: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
    pin: PropTypes.bool,
    placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    theme: PropTypes.oneOf(['light', 'dark']),
    trigger: PropTypes.oneOf(['hover', 'click', 'focus', 'manual'])
  }

  static defaultProps = {
    display: false,
    pin: true,
    placement: 'right',
    theme: 'dark',
    trigger: 'hover'
  }

  componentWillReceiveProps({display}) {
    if(display !== this.props.display) this.setDisplay(display);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.display !== this.state.display) {
      const {onEntered, onExited} = this.props;
      const callback = this.state.display ? onEntered : onExited;
      callback && callback();
    }
  }

  componentWillUnmount() {
    if(super.componentWillUnmount) super.componentWillUnmount();
    clearTimeout(privates.get(this).timeout);
  }

  triggerShow = eventType => {
    return (...args) => {
      this.show();
      const userCallback = this.props.children.props[eventType];
      userCallback && userCallback(...args);
    };
  }

  triggerHide = eventType => {
    return (...args) => {
      this.hide();
      const userCallback = this.props.children.props[eventType];
      userCallback && userCallback(...args);
    };
  }

  getDelay = display => {
    const {delay, delayHide, delayShow} = this.props;
    if(display && delayShow) return delayShow;
    if(!display && delayHide) return delayHide;
    return delay;
  }

  scrimClick = () => this.hide()

  setDisplay = (display) => {
    const oldTimeout = privates.get(this).timeout;

    if(display === this.state.display) {
      clearTimeout(oldTimeout);
      privates.set(this, {timeout: null});
      return;
    }

    const delay = this.getDelay(display);

    if(oldTimeout && delay) return;

    let timeout;
    if(delay) {
      timeout = setTimeout(() => {
        privates.set(this, {timeout: null});
        this.setState({display});
      }, delay);
    } else {
      this.setState({display});
    }

    privates.set(this, {timeout});
  }

  click = (...args) => {
    this.setDisplay(!this.state.display);
    const userCallback = this.props.children.props.onClick;
    userCallback && userCallback(...args);
  }

  show = () => this.setDisplay(true)

  hide = () => this.setDisplay(false)

  render() {
    let {children, overlay, pin, placement, theme, trigger, ...props} = this.props;
    const {display} = this.state;

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
        onBlur: this.triggerHide('onBlur')
      },
      'click': {
        onClick: this.click
      }
    }[trigger];

    children = React.cloneElement(children, {
      'aria-describedby': overlayId,
      ...triggerHandlers
    });

    const classes = classnames('tooltip', {
        'tooltip-light': theme === 'light'
      }
    );

    const tetherProps = {
      attachment: TETHER_PLACEMENTS[placement],
      constraints: pin ? [{to: 'window', attachment: 'together', pin: true}] : [],
      className: classes,
      classes: {'target-attached': 'tooltip'},
      ...props
    };

    return (<TetherComponent {...tetherProps} >
      {children}
      {display && overlay}
    </TetherComponent>);
  }
}