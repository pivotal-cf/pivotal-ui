import Animation from 'pui-react-mixins/mixins/animation_mixin';
import React from 'react';
import mixin from 'pui-react-mixins';
import {mergeProps} from 'pui-react-helpers';
import {useBoundingClientRect} from 'pui-react-mixins/components/bounding_client_rect';
require('pui-css-collapse');

const types = React.PropTypes;

const privates = new WeakMap();

class Collapsible extends mixin(React.Component).with(Animation) {
  constructor(props, context) {
    super(props, context);
    privates.set(this, {isAnimating: false, expanded: props.expanded});
  }

  static propTypes = {
    boundingClientRect: types.object,
    container: types.object,
    containerReady: types.object,
    delay: types.number,
    disableAnimation: types.bool,
    expanded: types.bool,
    onEntered: types.func,
    onExited: types.func,
    transitionProgress: types.number
  };

  static defaultProps = {
    delay: 400
  };

  toggleAnimation(isAnimating) {
    privates.set(this, {isAnimating});
  }

  triggerExpansionCallbacks(isAnimating) {
    if (isAnimating) { return; }
    const {expanded, onEntered, onExited} = this.props;
    expanded && onEntered && onEntered();
    !expanded && onExited && onExited();
    privates.set(this, {expanded});
  }

  render() {
    let {boundingClientRect: {height = 0}, children, container, containerReady, delay, expanded, onEntered, onExited, ...others} = this.props;

    const fractionOpen = this.animate('fractionOpen', expanded ? 1 : 0, delay);

    const isAnimating = (!expanded && fractionOpen > 0) || (expanded && fractionOpen < 1);
    const style = (height && isAnimating) ? {marginBottom: - height * (1 - fractionOpen)} : {};

    if(privates.get(this).isAnimating !== isAnimating) {
      this.toggleAnimation(isAnimating);
    }

    if(privates.get(this).expanded !== expanded) {
      this.triggerExpansionCallbacks(isAnimating);
    }

    var props = mergeProps(others, {
      className: ['collapse', {'in': expanded || isAnimating}],
      style: isAnimating ? {overflow: 'hidden'} : {},
      'aria-hidden': !expanded
    });

    return (
      <div {...props}>
        <div className="collapse-shield" style={style}>
          {children}
        </div>
      </div>
    );
  }
}

module.exports = {Collapsible: useBoundingClientRect(Collapsible)};
