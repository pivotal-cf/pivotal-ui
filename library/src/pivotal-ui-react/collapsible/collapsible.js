import Animation from 'pui-react-mixins/mixins/animation_mixin';
import React from 'react';
import mixin from 'pui-react-mixins';
import {mergeProps} from 'pui-react-helpers';
import {useBoundingClientRect} from 'pui-react-mixins/components/bounding_client_rect'
import 'pui-css-collapse';

const types = React.PropTypes;

const privates = new WeakMap();

class Collapsible extends mixin(React.Component).with(Animation) {
  constructor(props, context) {
    super(props, context);
    privates.set(this, {isAnimating: false});
  }

  static propTypes = {
    boundingClientRect: types.object,
    delay: types.number,
    disableAnimation: types.bool,
    expanded: types.bool,
    onEntered: types.func,
    transitionProgress: types.number
  };

  static defaultProps = {
    delay: 400
  };

  toggleAnimation(isAnimating) {
    const {expanded, onEntered, onExited} = this.props;
    if(!isAnimating) {
      expanded && onEntered && onEntered();
      !expanded && onExited && onExited();
    }

    privates.set(this, {isAnimating});
  }

  render() {
    let {boundingClientRect: {height = 0}, children, delay, expanded, ...others} = this.props;

    const fractionOpen = this.animate('fractionOpen', expanded ? 1 : 0, delay);

    const isAnimating = (!expanded && fractionOpen > 0) || (expanded && fractionOpen < 1);
    const style = (height && isAnimating) ? {marginBottom: - height * (1 - fractionOpen)} : {};

    if(privates.get(this).isAnimating !== isAnimating) {
      this.toggleAnimation(isAnimating);
    }

    var props = mergeProps(others, {
      className: ['collapse', {'in': expanded || isAnimating}],
      style: isAnimating ? {overflow: 'hidden'} : {}
    });

    return (
      <div {...props}>
        <div className="collapse-shield" style={style}>
          {children}
        </div>
      </div>
    )
  }
}

module.exports = {Collapsible: useBoundingClientRect(Collapsible)};
