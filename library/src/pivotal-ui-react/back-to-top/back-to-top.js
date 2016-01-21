var React = require('react');
var AnimationMixin = require('pui-react-animation');
var throttle = require('lodash.throttle');
var {getScrollTop, setScrollTop} = require('./scroll-top');
import {mergeProps} from 'pui-react-helpers';

var BackToTop = React.createClass({
  mixins: [AnimationMixin],

  propTypes: {
    alwaysVisible: React.PropTypes.bool
  },

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
    var {visible: visibleState} = this.state;
    var visible = this.props.alwaysVisible || visibleState;
    var props = mergeProps(this.props,
      {
        className: 'back-to-top',
        style: {display: 'inline', opacity: this.animate('opacity', visible ? 1 : 0, BackToTop.FADE_DURATION)}
      }
    );
    return <a {...props} onClick={this.scrollToTop} href="#top" aria-label="Back to top" />;
  }
});

module.exports = {BackToTop};
