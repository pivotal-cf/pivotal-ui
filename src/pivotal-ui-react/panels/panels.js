var React = require('react');
var types = React.PropTypes;
var classnames = require('classnames');
import {mergeProps} from 'pui-react-helpers';

var paddingTypes = [
  for (type of ['p', 'm'])
  for (location of ['l', 'r', 't', 'b', 'h', 'v', 'a'])
  for (size of ['n', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl'])
  `${type}${location}${size}`
  ];
var PanelTypes = {
  propTypes: {
    type: types.string,
    innerClassName: types.string,
    padding: function(props, propName, componentName) {
      if (props.padding && !props.padding.split(' ').every(pad => paddingTypes.indexOf(pad) >= 0)) {
        return new Error(`Invalid padding type used in ${componentName}`);
      }
    },
    scrollable: types.oneOfType([
      types.bool,
      types.number
    ])
  }
};

/**
 * @component Panel
 * @description A container for grouping related content
 *
 * @property title {String} Text to show as the header of the `<Panel>`
 *
 * @example ```js
 * var Panel = require('pui-react-panels').Panel;
 * var MyComponent = React.createClass({
 *   render() {
 *     return <Panel title="Header Text">Content Text</Panel>;
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#panel_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#panel)
 */
var Panel = React.createClass({

  propTypes: {
    kind: types.string,
    title: types.string,
    type: types.string,
    innerClassName: types.string,
    padding: function(props, propName, componentName) {
      if (props.padding && !props.padding.split(' ').every(pad => paddingTypes.indexOf(pad) >= 0)) {
        return new Error(`Invalid padding type used in ${componentName}`);
      }
    },
    scrollable: types.oneOfType([
      types.bool,
      types.number
    ])
  },

  render() {
   const {kind, innerClassName, padding, scrollable, children, ...other} = this.props;
    const panelStyle = (typeof scrollable === 'number') ? {maxHeight: `${scrollable}px`} : null;
    const props = mergeProps(other, {
      className: ['panel', kind, {'panel-scrollable': scrollable}],
      style: panelStyle
    });

    const title = this.props.title ? (
      <div className="panel-header">
        <h5 className="panel-title-alt">{this.props.title}</h5>
      </div>
    ) : null;

    return (
      <div {...props}>
        {title}
        <div className={classnames('panel-body', padding, innerClassName)}>{children}</div>
      </div>
    );
  }
});

/**
 * @component ShadowPanel
 * @description A `<Panel>` with a shadow on the bottom
 *
 * @property title {String} Text to show as the header of the `<Panel>`
 * @property shadowLevel {Number} The thickness (1-4) (defaults to `3`) of the shadow
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#panel_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#panel)
 */
var ShadowPanel = React.createClass({
  mixins: [PanelTypes],

  propTypes: {
    shadowLevel: types.oneOf([1, 2, 3, 4])
  },

  getDefaultProps() {
    return {shadowLevel: 3};
  },

  render() {
    var {shadowLevel, ...other} = this.props;
    return <Panel {...other} kind={`panel-shadow-${shadowLevel}`}/>;
  }
});

function defPanel(props) {
  return React.createClass({
    mixins: [PanelTypes],
    render() {
      return <Panel {...props} {...this.props}/>;
    }
  });
}

module.exports = {
  Panel,

  /**
   * @component SimplePanel
   * @description A `<Panel>` with a simple rectangular border
   *
   * @property title {String} Text to show as the header of the `<Panel>`
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#panel_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#panel)
   */
  SimplePanel: defPanel({kind: 'panel-simple'}),

  /**
   * @component BasicPanel
   * @description A `<Panel>` with padding and a shadow on the bottom
   *
   * @property title {String} Text to show as the header of the `<Panel>`
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#panel_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#panel)
   */
  BasicPanel: defPanel({kind: 'panel-basic'}),

  /**
   * @component BasicPanelAlt
   * @description A `<Panel>` with padding, a shadow on the bottom, and a round border
   *
   * @property title {String} Text to show as the header of the `<Panel>`
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#panel_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#panel)
   */
  BasicPanelAlt: defPanel({kind: 'panel-basic-alt'}),

  /**
   * @component ClickablePanel
   * @description A `<Panel>` with a background that lightens when hovered to indicate it is clickable
   *
   * @property title {String} Text to show as the header of the `<Panel>`
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#panel_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#panel)
   */
  ClickablePanel: defPanel({kind: 'panel-clickable'}),

  /**
   * @component ClickableAltPanel
   * @description A `<Panel>` with a rounded border, a shadow on the bottom, and a background that lightens when hovered to indicate it is clickable
   *
   * @property title {String} Text to show as the header of the `<Panel>`
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#panel_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#panel)
   */
  ClickableAltPanel: defPanel({kind: 'panel-clickable-alt'}),

  /**
   * @component HighlightPanel
   * @description A `<Panel>` with a rounded border and a shadow on the bottom for highlighting important parts of a page
   *
   * @property title {String} Text to show as the header of the `<Panel>`
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#panel_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#panel)
   */
  HighlightPanel: defPanel({kind: 'panel-highlight'}),

  ShadowPanel
};


/*doc
---
title: Panels
name: panel_react
categories:
 - react_all_panels
 - react_all
---

<code class="pam">
<i class="fa fa-download" alt="Install the Component">
npm install pui-react-panels --save
</i>
</code>

Require the subcomponents:

```
var Panel = require('pui-react-panels').Panel;
var BasicPanelAlt = require('pui-react-panels').BasicPanelAlt;
var BasicPanel = require('pui-react-panels').BasicPanel;
var ClickablePanel = require('pui-react-panels').ClickablePanel;
var ClickableAltPanel = require('pui-react-panels').ClickableAltPanel;
var HighlightPanel = require('pui-react-panels').HighlightPanel;
var ScrollablePanel = require('pui-react-panels').ScrollablePanel;
var ShadowPanel = require('pui-react-panels').ShadowPanel;
var SimplePanel = require('pui-react-panels').SimplePanel;
```


Panel components are straightforward implementations of the [Panel][panel] styling. The `Panel` component itself
is the base, and there are many different flavors of Panels which all construct a particularly styled `Panel`.

See examples below.

```react_example_table
<Panel className="bg-neutral-8">
  <p>Base Panel</p>
</Panel>

<Panel className="bg-neutral-8 optional-class"
  innerClassName="opt-inner-class">
  <p>Base Panel</p>
</Panel>
```
*/

/*doc
---
title: Scrolling
name: panel_scroll_react
parent: panel_react
---

A ScrollingPanel is created by using a `Panel` component and including a true value for the `scrollable`
property. Alternatively, if this value is a number, it will become the height of the scrollable panel in pixels!

```react_example_table
<Panel className="bg-neutral-8" scrollable={100}>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
</Panel>

<Panel className="bg-neutral-8" scrollable={true}>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
  <p>Scrollable Panel</p>
</Panel>
```
*/

/*doc
---
title: Padding
name: panel_padding_react
parent: panel_react
---

Add a "padding" attribute (i.e. `pal`, `pbn`, etc.) to change the padding on the `panel-body`.

```react_example_table
<Panel className="bg-neutral-8" padding="paxxl">
  <p>Base Panel</p>
</Panel>

```

*/

/*doc
---
title: Simple
name: panel_simple_react
parent: panel_react
---

```react_example_table
<SimplePanel>
  Simple Panel
</SimplePanel>
```
*/

/*doc
---
title: Basic
name: panel_basic_react
parent: panel_react
---

```react_example_table
<BasicPanel>
  Basic Panel
</BasicPanel>

<BasicPanel title='Basic Title'>
  Basic Panel
</BasicPanel>
```
*/


/*doc
---
title: Basic Panel Alt
name: panel_basic_alt_react
parent: panel_react
---

```react_example_table
<BasicPanelAlt>
  Basic Panel
</BasicPanelAlt>

<BasicPanelAlt title='Basic Alt Title'>
  Basic Panel
</BasicPanelAlt>
```
*/

/*doc
---
title: Shadow
name: panel_shadow_react
parent: panel_react
---

`ShadowPanels` accept a `shadowLevel` property between 1 and 4 (darkest to lightest).
If no `shadowLevel` is set, a default value of 3 is applied.

```react_example_table
<ShadowPanel>Shadow Panel (Defaults to shadow level 3)</ShadowPanel>

<ShadowPanel shadowLevel={1}>Shadow Panel (level 1)</ShadowPanel>

<ShadowPanel shadowLevel={2}>Shadow Panel (level 2)</ShadowPanel>

<ShadowPanel shadowLevel={3}>Shadow Panel (level 3)</ShadowPanel>

<ShadowPanel shadowLevel={4}>Shadow Panel (level 4)</ShadowPanel>
```

*/

/*doc
---
title: Clickable
name: panel_clickable_react
parent: panel_react
---

```react_example_table
<ClickablePanel>Clickable Panel</ClickablePanel>

<ClickableAltPanel>Clickable Panel (Alt)</ClickableAltPanel>
```
*/

/*doc
---
title: Highlight
name: panel_highlight_react
parent: panel_react
---

```react_example_table
<HighlightPanel>
  Highlight Panel
</HighlightPanel>
```
*/
