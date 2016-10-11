const {Icon} = require('pui-react-iconography');
const React = require('react');
const throttle = require('lodash.throttle');
const {getScrollTop, setScrollTop} = require('./scroll-top');
const {mergeProps} = require('pui-react-helpers');
const mixin = require('pui-react-mixins');
const Animation = require('pui-react-mixins/mixins/animation_mixin');
require('pui-css-back-to-top');

class BackToTop extends mixin(React.Component).with(Animation) {
  constructor(props, context) {
    super(props, context);
    this.state = {visible: false};
  }

  static propTypes = {
    alwaysVisible: React.PropTypes.bool
  };

  static FADE_DURATION = 300;
  static VISIBILITY_HEIGHT = 400;
  static SCROLL_DURATION = 800;

  componentDidMount() {
    this.updateScroll = throttle(this.updateScroll, 100);
    window.addEventListener('scroll', this.updateScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateScroll);
  }

  updateScroll = () => {
    this.setState({visible: getScrollTop() > BackToTop.VISIBILITY_HEIGHT});
  };

  scrollToTop = () => {
    this.animate(value => setScrollTop(value), 0, BackToTop.SCROLL_DURATION, {startValue: getScrollTop()});
  };

  render() {
    const {alwaysVisible, ...others} = this.props;
    var {visible: visibleState} = this.state;
    var visible = alwaysVisible || visibleState;
    var props = mergeProps(others,
      {
        className: 'back-to-top',
        style: {display: 'inline', opacity: this.animate('opacity', visible ? 1 : 0, BackToTop.FADE_DURATION)}
      }
    );

    return (
      <a {...props} onClick={this.scrollToTop} href="#top" aria-label="Back to top"><Icon style={{strokeWidth: 100}} src="arrow_upward"/></a>
    )
  }
}

module.exports = {BackToTop};
