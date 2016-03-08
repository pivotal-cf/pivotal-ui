import AnimationMixin from 'pui-react-animation';

function mixin(ParentClass) {
  return {
    with(...classGenerators) {
      return classGenerators.reduceRight((ParentClass, classGenerator) => classGenerator(ParentClass), ParentClass);
    }
  };
}

function Animation(ParentClass) {
  return class Animation extends ParentClass {
    componentWillUnmount() {
      if (super.componentWillUnmount) super.componentWillUnmount();
      this::AnimationMixin.componentWillUnmount();
    }

    shouldAnimate = AnimationMixin.shouldAnimate;

    animate = AnimationMixin.animate;
  };
}

module.exports = {
  mixin,
  Animation
};

