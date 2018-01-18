import React from 'react';
import Animation from '../mixins/mixins/animation_mixin';
import {default as mixin} from '../mixins';
import {mergeProps} from '../helpers';
import PropTypes from 'prop-types';
import {useBoundingClientRect} from '../mixins/components/bounding_client_rect';

const privates = new WeakMap();

class CollapsibleComponent extends mixin(React.Component).with(Animation) {
  constructor(props, context) {
    super(props, context);
    privates.set(this, {isAnimating: false, expanded: props.expanded});
  }

  static propTypes = {
    boundingClientRect: PropTypes.object,
    container: PropTypes.object,
    containerReady: PropTypes.object,
    delay: PropTypes.number,
    disableAnimation: PropTypes.bool,
    expanded: PropTypes.bool,
    onEntered: PropTypes.func,
    onExited: PropTypes.func,
    transitionProgress: PropTypes.number
  };

  static defaultProps = {
    delay: 400
  };

  componentDidMount() {
    require('../../css/collapse');
  }

  toggleAnimation = isAnimating => privates.set(this, {isAnimating});

  triggerExpansionCallbacks = isAnimating => {
    if (isAnimating) return;
    const {expanded, onEntered, onExited} = this.props;
    expanded && onEntered && onEntered();
    !expanded && onExited && onExited();
    privates.set(this, {expanded});
  };

  render() {
    let {boundingClientRect: {height = 0}, children, container, containerReady, delay, expanded, onEntered, onExited, ...others} = this.props;
    const fractionOpen = this.animate('fractionOpen', expanded ? 1 : 0, delay);
    const isAnimating = (!expanded && fractionOpen > 0) || (expanded && fractionOpen < 1);
    const style = (height && isAnimating) ? {marginBottom: -height * (1 - fractionOpen)} : {};

    if (privates.get(this).isAnimating !== isAnimating) {
      this.toggleAnimation(isAnimating);
    }

    if (privates.get(this).expanded !== expanded) {
      this.triggerExpansionCallbacks(isAnimating);
    }

    const props = mergeProps(others, {
      className: ['pui-collapsible', {'in': expanded || isAnimating}],
      style: isAnimating ? {overflow: 'hidden'} : {},
      'aria-hidden': !expanded
    });

    return (<div {...props}>
      <div className="pui-collapsible-shield" style={style}>
        {children}
      </div>
    </div>);
  }
}

export const Collapsible = useBoundingClientRect(CollapsibleComponent);
