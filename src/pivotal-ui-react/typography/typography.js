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
var AlternateH1 = defHeader({element: 'h1', color: 'type-dark-2', bold: 'max'});

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
var MarketingH1 = defHeader({element: 'h1', size: 'title', bold: 'high', color: 'type-dark-2'});

/**
 * @component MarketingH2
 * @description A large level 2 header for use on marking sites
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#type_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#type)
 */
var MarketingH2 = defHeader({element: 'h2', size: 'h1', bold: 'high', color: 'type-dark-2'});

/**
 * @component MarketingH3
 * @description A large level 3 header for use on marking sites
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#type_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#type)
 */
var MarketingH3 = defHeader({element: 'h3', size: 'h2', bold: 'high', color: 'type-dark-2'});

/**
 * @component MarketingH4
 * @description A large level 4 header for use on marking sites
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#type_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#type)
 */
var MarketingH4 = defHeader({element: 'h4', size: 'h3', bold: 'high', color: 'type-dark-2'});

/**
 * @component MarketingH5
 * @description A large level 5 header for use on marking sites
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#type_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#type)
 */
var MarketingH5 = defHeader({element: 'h5', size: 'h4', bold: 'high', color: 'type-dark-2'});

/**
 * @component MarketingH6
 * @description A large level 6 header for use on marking sites
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#type_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#type)
 */
var MarketingH6 = defHeader({element: 'h6', size: 'h5', bold: 'high', color: 'type-dark-2'});

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


/*doc
---
title: Typography
name: type_react
category:
- React
---

<code class="pam">
<i class="fa fa-download" alt="Install the Component">
npm install pui-react-typography --save
</i>
</code>

Require the subcomponents:

```
var DefaultH1 = require('pui-react-typography').DefaultH1;
var DefaultH2 = require('pui-react-typography').DefaultH2;
var DefaultH3 = require('pui-react-typography').DefaultH3;
var DefaultH4 = require('pui-react-typography').DefaultH4;
var DefaultH5 = require('pui-react-typography').DefaultH5;
var DefaultH6 = require('pui-react-typography').DefaultH6;
var AlternateH1 = require('pui-react-typography').AlternateH1;
var AlternateH2 = require('pui-react-typography').AlternateH2;
var AlternateH3 = require('pui-react-typography').AlternateH3;
var AlternateH4 = require('pui-react-typography').AlternateH4;
var AlternateH5 = require('pui-react-typography').AlternateH5;
var AlternateH6 = require('pui-react-typography').AlternateH6;
var MarketingH1 = require('pui-react-typography').MarketingH1;
var MarketingH2 = require('pui-react-typography').MarketingH2;
var MarketingH3 = require('pui-react-typography').MarketingH3;
var MarketingH4 = require('pui-react-typography').MarketingH4;
var MarketingH5 = require('pui-react-typography').MarketingH5;
var MarketingH6 = require('pui-react-typography').MarketingH6;
var Heading = require('pui-react-typography').Heading;
```

We have three type systems. Which one you choose depends on your product.

* Marketing sites should use the largest styles, for example `<MarketingH1>A Top Level Heading</MarketingH1>`
* Most sites will use our default headings, for example `<DefaultH1>A Top Level Heading</DefaultH1>`
* Rarely, sites will need a smaller type scale, for example `<AlternateH1>A Top Level Heading</AlternateH1>`
*/

/*doc
---
title: Default
name: 01_type_default_react
parent: type_react
---

```react_example_table
<DefaultH1>h1 31px</DefaultH1>

<DefaultH2>h2 25px</DefaultH2>

<DefaultH3>h3 20px</DefaultH3>

<DefaultH4>h4 18px</DefaultH4>

<DefaultH5>h5 16px</DefaultH5>

<DefaultH6>h6 13px</DefaultH6>
```
*/

/*doc
---
title: Alternate
name: 02_type_alt_react
parent: type_react
---


```react_example_table
<AlternateH1>This is an H1</AlternateH1>

<AlternateH2>This is an H2</AlternateH2>

<AlternateH3>This is an H3</AlternateH3>

<AlternateH4>This is an H4</AlternateH4>

<AlternateH5>This is an H5</AlternateH5>

<AlternateH6>This is an H6</AlternateH6>
```
*/

/*doc
---
title: Marketing
name: 03_type_marketing_react
parent: type_react
---

```react_example_table
<MarketingH1>This is an h1</MarketingH1>

<MarketingH2>This is an h2</MarketingH2>

<MarketingH3>This is an h3</MarketingH3>

<MarketingH4>This is an h4</MarketingH4>

<MarketingH5>This is an h5</MarketingH5>

<MarketingH6>This is an h6</MarketingH6>
```
*/

/*doc
---
title: Custom
name: 04_type_custom_react
parent: type_react
---

Usually, you want to use the provided headings. If your mock doesn't exactly match, you should try the normal headings,
and see if it still looks ok. If it doesn't (this should be rare!) you can use our custom type generator.

You may want to wrap this in a custom reusable React component rather than calling it directly.

```react_example
<Heading element="h1" bold="high" color="type-brand-5">This is a custom h1</Heading>
```*/
