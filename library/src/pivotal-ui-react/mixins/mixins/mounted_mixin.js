const privates = new WeakMap();

module.exports = function(ParentClass) {
  return class Mounted extends ParentClass {
    componentDidMount() {
      privates.set(this, {isMounted: true});
      if (super.componentDidMount) super.componentDidMount();
    }

    componentWillUnmount() {
      privates.delete(this);
      if (super.componentWillUnmount) super.componentWillUnmount();
    }

    mounted() {
      const {isMounted} = privates.get(this) || {};
      return !!isMounted;
    }
  };
};