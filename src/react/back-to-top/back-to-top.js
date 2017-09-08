import {Icon} from '../iconography';
import React from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import {getScrollTop, setScrollTop} from './scroll-top';
import {mergeProps} from '../helpers';
import {default as mixin} from '../mixins';
import Animation from '../mixins/mixins/animation_mixin';

export class BackToTop extends mixin(React.PureComponent).with(Animation) {
  constructor(props, context) {
    super(props, context);
    this.state = {visible: false};
  }

  static propTypes = {
    alwaysVisible: PropTypes.bool
  };

  static FADE_DURATION = 300;
  static VISIBILITY_HEIGHT = 400;
  static SCROLL_DURATION = 800;

  componentDidMount() {
    require('../../css/back-to-top');
    this.updateScroll = throttle(this.updateScroll, 100);
    window.addEventListener('scroll', this.updateScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateScroll);
  }

  updateScroll = () => this.setState({visible: getScrollTop() > BackToTop.VISIBILITY_HEIGHT});

  scrollToTop = () => this.animate(value => setScrollTop(value), 0, BackToTop.SCROLL_DURATION, {startValue: getScrollTop()});

  render() {
    const {alwaysVisible, ...others} = this.props;
    const {visible: visibleState} = this.state;
    const visible = alwaysVisible || visibleState;
    const props = mergeProps(others,
      {
        className: 'back-to-top',
        style: {display: 'inline', opacity: this.animate('opacity', visible ? 1 : 0, BackToTop.FADE_DURATION)}
      }
    );

    return (<a {...props} onClick={this.scrollToTop} href="#top" aria-label="Back to top">
      <Icon style={{strokeWidth: 100}} src="arrow_upward"/>
    </a>);
  }
}
