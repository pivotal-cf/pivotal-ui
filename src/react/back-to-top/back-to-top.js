import {Icon} from '../iconography';
import React from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import ScrollTop from './scroll-top';
import {mergeProps} from '../helpers';
import {default as mixin} from '../mixins';
import Animation from '../mixins/mixins/animation_mixin';

const privates = new WeakMap();

export class BackToTop extends mixin(React.PureComponent).with(Animation) {
  static propTypes = {
    alwaysVisible: PropTypes.bool,
    scrollableId: PropTypes.string
  };

  static FADE_DURATION = 200;
  static VISIBILITY_HEIGHT = 400;
  static SCROLL_DURATION = 200;

  constructor(props, context) {
    super(props, context);
    this.state = {visible: false};
  }

  componentDidMount() {
    require('../../css/back-to-top');
    this.updateScroll = throttle(this.updateScroll, 100);
    const {scrollableId} = this.props;
    const element = scrollableId && document.getElementById(scrollableId);
    if (element) element.addEventListener('scroll', this.updateScroll);
    else window.addEventListener('scroll', this.updateScroll);
    privates.set(this, {element});
  }

  componentWillUnmount() {
    const {element} = privates.get(this);
    if (element) element.removeEventListener('scroll', this.updateScroll);
    else window.removeEventListener('scroll', this.updateScroll);
  }

  updateScroll = () => {
    const {element} = privates.get(this);
    this.setState({visible: ScrollTop.getScrollTop(element, document) > BackToTop.VISIBILITY_HEIGHT});
  };

  scrollToTop = () => {
    const key = `pui-back-to-top-${Date.now()}`;
    this.setState({key});
  };

  render() {
    const {alwaysVisible, scrollableId, ...others} = this.props;
    const {visible: visibleState} = this.state;
    const {element} = privates.get(this) || {};
    const visible = alwaysVisible || visibleState;
    const props = mergeProps(others, {
      className: 'back-to-top pui-back-to-top',
      style: {display: 'inline', opacity: this.animate('opacity', visible ? 1 : 0, BackToTop.FADE_DURATION)}
    });

    const {key} = this.state;
    if (key) {
      const startValue = ScrollTop.getScrollTop(element, document);
      const scrollTarget = this.animate(key, 0, BackToTop.SCROLL_DURATION, {
        startValue,
        easing: 'easeOutCubic'
      });
      ScrollTop.setScrollTop(scrollTarget, element, document);
      if (!scrollTarget) setTimeout(() => this.setState({key: null}), 10);
    }

    return (<a {...props} onClick={this.scrollToTop} aria-label="Back to top">
      <Icon style={{strokeWidth: 100}} src="arrow_upward"/>
    </a>);
  }
}
