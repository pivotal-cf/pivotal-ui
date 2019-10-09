import React from 'react';
import PropTypes from 'prop-types';

export default ParentClass => {
  return class Transition extends ParentClass {
    static propTypes = {
      onEntered: PropTypes.func,
      onExited: PropTypes.func
    };

    componentDidUpdate(prevProps, prevState) {
      super.componentDidUpdate && super.componentDidUpdate(prevProps, prevState);

      const {open} = this.state;
      const {onEntered, onExited} = this.props;

      const transitionCallback = open ? onEntered : onExited;
      const transitioning = (open !== prevState.open);
      if (transitioning && transitionCallback) transitionCallback();
    }
  };
};
