import React from 'react';
import PropTypes from 'prop-types';

export default ParentClass => {
  return class Transition extends ParentClass {
    static propTypes = {
      onEntered: PropTypes.func,
      onExited: PropTypes.func
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
