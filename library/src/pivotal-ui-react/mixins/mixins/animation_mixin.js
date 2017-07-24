import AnimationMixin from 'pui-react-animation';

export default ParentClass => {
  return class Animation extends ParentClass {
    componentWillUnmount() {
      if (super.componentWillUnmount) super.componentWillUnmount();
      this::AnimationMixin.componentWillUnmount();
    }

    shouldAnimate = AnimationMixin.shouldAnimate

    animate = AnimationMixin.animate
  };
};
