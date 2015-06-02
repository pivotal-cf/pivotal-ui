var React = require('react');
var AnimationMixin = require('pui-react-animation');
var throttle = require('lodash.throttle');

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
    this.setState({visible: document.body.scrollTop > BackToTop.VISIBILITY_HEIGHT});
  },

  scrollToTop() {
    this.animate(value => document.body.scrollTop = value, 0, BackToTop.SCROLL_DURATION, {startValue: document.body.scrollTop});
  },

  render() {
    var {visible} = this.state;
    var style = {display: 'inline', opacity: this.animate('opacity', visible ? 1 : 0, BackToTop.FADE_DURATION)};

    return <a className="back-to-top" role="button" onClick={this.scrollToTop} style={style}/>;
  }
});

module.exports = {BackToTop};