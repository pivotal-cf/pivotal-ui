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
 */
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


/*doc
---
title: Back to Top
name: back_to_top_react
categories:
 - react_components_back-to-top
 - react_all
---

<code class="pam">
<i class="fa fa-download" alt="Install the Component">
npm install pui-react-back-to-top --save
</i>
</code>

Require the subcomponent:

```
var BackToTop = require('pui-react-back-to-top').BackToTop;
```

You can use this component to scroll to the top of a page.

The button will be fixed to the bottom right hand corner of the page.

If `alwaysVisible` is not set, the component will only appear after the window has been scrolled.

You can place the link anywhere in your markup, but best practices are either towards the top or bottom of your markup.



```react_wrapped_example
<BackToTop alwaysVisible />
```
*/
