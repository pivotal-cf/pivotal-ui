import React from 'react';
import uniqueid from 'lodash.uniqueid';
import TetherComponent from 'react-tether';

const types = React.PropTypes;

const TETHER_PLACEMENTS = {
  top:    'bottom center',
  bottom: 'top center',
  left:   'middle right',
  right:  'middle left'
};

const OverlayTrigger = React.createClass({
  propTypes: {
    delay: types.number,
    delayHide: types.number,
    delayShow: types.number,
    display: types.bool,
    onEntered: types.func,
    onExited: types.func,
    overlay: types.element,
    pin: types.bool,
    placement: types.oneOf(['top', 'bottom', 'left', 'right']),
    rootClose: types.bool,
    trigger: types.oneOf(['hover', 'click', 'focus', 'manual'])
  },

  getDefaultProps() {
    return {
      display: false,
      pin: true,
      placement: 'right',
      rootClose: true,
      trigger: 'hover'
    };
  },

  getInitialState() {
    return {
      display: this.props.display
    }
  },

  componentWillReceiveProps({display, rootClose}) {
    if(display !== this.props.display) this.setDisplay(display);
    if(rootClose !== this.props.rootClose) {
      if (rootClose) {
        document.documentElement.addEventListener('click', this.hide);
      } else {
        document.documentElement.removeEventListener('click', this.hide);
      }
    }
  },

  componentDidMount() {
    if (!this.props.rootClose) return;
    document.documentElement.addEventListener('click', this.hide);
  },

  componentWillUnmount() {
    if (!this.props.rootClose) return;
    document.documentElement.removeEventListener('click', this.hide);
  },

  componentDidUpdate(prevProps, prevState) {
    if (prevState.display !== this.state.display) {
      const {onEntered, onExited} = this.props;
      const callback = this.state.display ? onEntered : onExited;
      callback && callback();
    }
  },

  triggerShow(eventType) {
    return (...args) => {
      this.show();
      const userCallback = this.props.children.props[eventType];
      userCallback && userCallback(...args);
    }
  },

  triggerHide(eventType) {
    return (...args) => {
      this.hide();
      const userCallback = this.props.children.props[eventType];
      userCallback && userCallback(...args);
    }
  },

  setDisplay(display) {
    const {delay, delayHide, delayShow} = this.props;
    if(display && delayShow) {
      return setTimeout(() => {this.setState({display})}, delayShow);
    }
    if (!display && delayHide) {
      return setTimeout(() => {this.setState({display})}, delayHide);
    }
    if(delay) {
      return setTimeout(() => {this.setState({display})}, delay);
    }

    return this.setState({display});
  },

  click(...args) {
    this.setDisplay(!this.state.display);
    const userCallback = this.props.children.props.onClick;
    userCallback && userCallback(...args);
  },

  show() {
    this.setDisplay(true);
  },

  hide() {
    this.setDisplay(false)
  },

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
      constraints: pin ? [{ to: 'window', attachment: 'together' }] : [],
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
});

module.exports = {
  OverlayTrigger
};
