var React = require('react');
import {mergeProps} from 'pui-react-helpers';

var TypographyMixin = {
  propTypes: {
    allCaps: React.PropTypes.bool,
    bold: React.PropTypes.oneOf(['low', 'default', 'high', 'max']),
    color: React.PropTypes.string,
    element: React.PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p']),
    size: React.PropTypes.oneOf(['title', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'small'])
  }
};

var Heading = React.createClass({
  propTypes: {
    allCaps: React.PropTypes.bool,
    bold: React.PropTypes.oneOf(['low', 'default', 'high', 'max']),
    color: React.PropTypes.string,
    element: React.PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p']),
    size: React.PropTypes.oneOf(['title', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'small'])
  },

  render() {
    var {size, bold, allCaps, color, element = 'p', children, ...other} = this.props;

    var classes = [
      size,
      bold && `em-${bold}`,
      allCaps && 'em-alt',
      color
    ]
      .filter(Boolean)
      .join(' ');

    const props = mergeProps(other, {className: classes});
    var Klass = element;
    return <Klass {...props}>{children}</Klass>;
  }
});

function defHeader(props) {
  return React.createClass({
    mixins: [TypographyMixin],
    render() {
      return (<Heading {...this.props} {...props}/>);
    }
  });
}

/**
 * @component DefaultH1
 * @description A level 1 header
 *
 * @example ```js
 * var DefaultH1 = require('pui-react-typography').DefaultH1;
 * var MyComponent = React.createClass({
 *   render() {
 *     return <DefaultH1>Content Title</DefaultH1>;
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#type_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#type)
 */
var DefaultH1 = defHeader({element: 'h1'});
/**
 * @component DefaultH2
 * @description A level 2 header
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#type_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#type)
 */
var DefaultH2 = defHeader({element: 'h2'});

/**
 * @component DefaultH3
 * @description A level 3 header
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#type_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#type)
 */
var DefaultH3 = defHeader({element: 'h3'});

/**
 * @component DefaultH4
 * @description A level 4 header
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#type_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#type)
 */
var DefaultH4 = defHeader({element: 'h4'});

/**
 * @component DefaultH5
 * @description A level 5 header
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#type_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#type)
 */
var DefaultH5 = defHeader({element: 'h5'});

/**
 * @component DefaultH6
 * @description A level 6 header
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#type_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#type)
 */
var DefaultH6 = defHeader({element: 'h6'});

/**
 * @component AlternateH1
 * @description A level 1 header on a smaller type scale
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#type_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#type)
 */
var AlternateH1 = defHeader({element: 'h1', color: 'type-dark-1', bold: 'max'});

/**
 * @component AlternateH2
 * @description A level 2 header on a smaller type scale
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#type_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#type)
 */
var AlternateH2 = defHeader({element: 'h2', size: 'h4', bold: 'high', allCaps: true});

/**
 * @component AlternateH3
 * @description A level 3 header on a smaller type scale
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#type_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#type)
 */
var AlternateH3 = defHeader({element: 'h3', size: 'h4'});

/**
 * @component AlternateH4
 * @description A level 4 header on a smaller type scale
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#type_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#type)
 */
var AlternateH4 = defHeader({element: 'h4', size: 'h6', bold: 'high', allCaps: true});

/**
 * @component AlternateH5
 * @description A level 5 header on a smaller type scale
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#type_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#type)
 */
var AlternateH5 = defHeader({element: 'h5', size: 'h6', bold: 'high'});

/**
 * @component AlternateH6
 * @description A level 6 header on a smaller type scale
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#type_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#type)
 */
var AlternateH6 = defHeader({element: 'h6'});

/**
 * @component MarketingH1
 * @description A large level 1 header for use on marking sites
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#type_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#type)
 */
var MarketingH1 = defHeader({element: 'h1', size: 'title', bold: 'high', color: 'type-dark-1'});

/**
 * @component MarketingH2
 * @description A large level 2 header for use on marking sites
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#type_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#type)
 */
var MarketingH2 = defHeader({element: 'h2', size: 'h1', bold: 'high', color: 'type-dark-1'});

/**
 * @component MarketingH3
 * @description A large level 3 header for use on marking sites
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#type_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#type)
 */
var MarketingH3 = defHeader({element: 'h3', size: 'h2', bold: 'high', color: 'type-dark-1'});

/**
 * @component MarketingH4
 * @description A large level 4 header for use on marking sites
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#type_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#type)
 */
var MarketingH4 = defHeader({element: 'h4', size: 'h3', bold: 'high', color: 'type-dark-1'});

/**
 * @component MarketingH5
 * @description A large level 5 header for use on marking sites
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#type_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#type)
 */
var MarketingH5 = defHeader({element: 'h5', size: 'h4', bold: 'high', color: 'type-dark-1'});

/**
 * @component MarketingH6
 * @description A large level 6 header for use on marking sites
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#type_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#type)
 */
var MarketingH6 = defHeader({element: 'h6', size: 'h5', bold: 'high', color: 'type-dark-1'});

module.exports = {
  DefaultH1,
  DefaultH2,
  DefaultH3,
  DefaultH4,
  DefaultH5,
  DefaultH6,
  AlternateH1,
  AlternateH2,
  AlternateH3,
  AlternateH4,
  AlternateH5,
  AlternateH6,
  MarketingH1,
  MarketingH2,
  MarketingH3,
  MarketingH4,
  MarketingH5,
  MarketingH6,
  Heading
};
