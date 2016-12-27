import React from 'react';
const types = React.PropTypes;

export default ParentClass => {
  return class Transition extends ParentClass {
    static propTypes = {
      onEntered: types.func,
      onExited: types.func
    }

    componentWillUpdate(nextProps, nextState) {
      super.componentWillUpdate && super.componentWillUpdate(nextProps, nextState);

      const {open} = nextState;
      const {onEntered, onExited} = nextProps;

      const transitionCallback = open ? onEntered : onExited;
      const transitioning = (open !== this.state.open);
      if (transitioning && transitionCallback) transitionCallback();
    }
  };
};
