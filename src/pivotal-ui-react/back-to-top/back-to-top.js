var React = require('react');
var AnimationMixin = require('pui-react-animation');
var throttle = require('lodash.throttle');
var {getScrollTop, setScrollTop} = require('./scroll-top');
import {mergeProps} from 'pui-react-helpers';


/**
 * @component BackToTop
 * @description A component for scrolling to the top of a page
 *
 * @example ```js
 * var BackToTop = require('pui-react-back-to-top').BackToTop;
 * var MyComponent = React.createClass({
 *   render() {
 *     return <BackToTop/>;
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react_beta.html#back_to_top)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#back_to_top)
 */
var BackToTop = React.createClass({
  mixins: [AnimationMixin],

  statics: {
    FADE_DURATION: 300,
    VISIBILITY_HEIGHT: 400,
    SCROLL_DURATION: 800
  },

  getInitialState() {
    return {visible: false};
  },

  componentDidMount() {
    this.updateScroll = throttle(this.updateScroll, 100);
    window.addEventListener('scroll', this.updateScroll);
  },

  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateScroll);
  },

  updateScroll() {
    this.setState({visible: getScrollTop() > BackToTop.VISIBILITY_HEIGHT});
  },

  scrollToTop() {
    this.animate(value => setScrollTop(value), 0, BackToTop.SCROLL_DURATION, {startValue: getScrollTop()});
  },

  render() {
    var {visible} = this.state;
    var props = mergeProps(this.props,
      {
        className: 'back-to-top',
        style: {display: 'inline', opacity: this.animate('opacity', visible ? 1 : 0, BackToTop.FADE_DURATION)}
      }
    );
    return <a {...props} role='button' onClick={this.scrollToTop}/>;
  }
});

module.exports = {BackToTop};
