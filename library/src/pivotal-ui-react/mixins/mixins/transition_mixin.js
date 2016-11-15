import React from 'react';
const types = React.PropTypes;

module.exports = function Transition(Parent) {
  return class Transition extends Parent {
    static propTypes = {
      onEntered: types.func,
      onExited: types.func
    };

    componentWillUpdate(nextProps, nextState) {
      super.componentWillUpdate && super.componentWillUpdate(nextProps, nextState);

      const {open} = nextState;
      const {onEntered, onExited} = nextProps;

      const transitionCallback = open ? onEntered : onExited;
      const transitioning = (open !== this.state.open);
      if(transitioning && transitionCallback) transitionCallback();
    }
  };
};