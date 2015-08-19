import React from 'react';
import Tabs from 'react-bootstrap/lib/Tabs';
import BsTab from 'react-bootstrap/lib/Tab';
import Accordion from 'react-bootstrap/lib/Accordion';
import Panel from 'react-bootstrap/lib/Panel';
import uniqueid from 'lodash.uniqueid';
import classnames from 'classnames';


const BaseTabs = React.createClass({
  propTypes: {
    defaultActiveKey: React.PropTypes.any,
    tabType: React.PropTypes.oneOf(['tab-simple', 'tab-simple-alt']),
    responsiveBreakpoint: React.PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
    largeScreenClassName: React.PropTypes.string,
    smallScreenClassName: React.PropTypes.string,
    onSelect: React.PropTypes.func,
    position: React.PropTypes.oneOf(['top', 'left']),
    tabWidth: React.PropTypes.number,
    paneWidth: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      responsiveBreakpoint: 'xs'
    };
  },

  getInitialState() {
    return {activeKey: this.props.defaultActiveKey};
  },

  setActiveKey(key) {
    this.setState({activeKey: key});
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultActiveKey !== this.props.defaultActiveKey) {
      this.setActiveKey(nextProps.defaultActiveKey);
    }
  },

  handleSelect(key) {
    if (!this.props.onSelect) {
      this.setActiveKey(key);
    } else {
      this.props.onSelect(key);
    }
  },

  render() {
    const {defaultActiveKey, children, responsiveBreakpoint, tabType, largeScreenClassName,
      smallScreenClassName, onSelect, position, tabWidth, paneWidth, ...props} = this.props;
    const largeScreenClasses = classnames([`hidden-${responsiveBreakpoint}`, tabType, largeScreenClassName]);
    const smallScreenClasses = classnames([`visible-${responsiveBreakpoint}-block`, `${tabType}-small-screen`, smallScreenClassName]);
    return (
      <div {...props}>
        <div className={largeScreenClasses}>
          <Tabs id={uniqueid('pui-react-tabs-')} position={position} tabWidth={tabWidth} paneWidth={paneWidth} activeKey={this.state.activeKey} onSelect={this.handleSelect}>
            {children}
          </Tabs>
        </div>
        <Accordion className={smallScreenClasses} activeKey={this.state.activeKey} onSelect={this.handleSelect}>
          {React.Children.map(children, (child) => {
            const {title, ...childProps} = child.props;
            return <Panel header={title} {...childProps}/>;
          })}
        </Accordion>
      </div>
    );
  }
});

/**
 * @component SimpleTabs
 * @description Tab-based content toggling
 *

 * @example ```js
 * var SimpleTabs = require('pui-react-tabs').SimpleTabs;
 * var Tab = require('pui-react-tabs').Tab;
 * var MyComponent = React.createClass({
 *   render() {
 *     return (
 *       <SimpleTabs defaultActiveKey={2}>
 *         <Tab eventKey={1}>Content for tab 1</Tab>
 *         <Tab eventKey={2}>Content for tab 2</Tab>
 *         <Tab eventKey={3}>Content for tab 3</Tab>
 *       </SimpleTabs>
 *     );
 *   }
 * });
 * ```
 *
 * @property responsiveBreakpoint {one of: `"xs"`, `"sm"`, `"md"`, `lg`} The
 * size at which the small-screen tabs (accordion-style) should switch to
 * large-screen tabs (folder-style)
 *
 * @property defaultActiveKey {should equal one of your tab's event keys} The
 * tab which will start out open
 *
 * @property smallScreenClassName {css class} Will be applied to small screen
 * tabs only
 *
 * @property largeScreenClassName {css class} Will be applied to large screen
 * tabs only
 *
 * @property onSelect {function} Will override default behavior when clicking
 * on a tab. If you want to retain the default behavior as well as add new
 * functionality, change default active key in the function you provide
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#tabs_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#tab)
 */
const SimpleTabs = React.createClass({
  render() {
    return (
      <BaseTabs {...this.props} tabType="tab-simple"/>
    );
  }
});

/**
 * @component SimpleAltTabs
 * @description `<SimpleTabs>` with different styling
 *
 * @example ```js
 * var SimpleAltTabs = require('pui-react-tabs').SimpleAltTabs;
 * var Tab = require('pui-react-tabs').Tab;
 * var MyComponent = React.createClass({
 *   render() {
 *     return (
 *       <SimpleAltTabs defaultActiveKey={2}>
 *         <Tab eventKey={1}>Content for tab 1</Tab>
 *         <Tab eventKey={2}>Content for tab 2</Tab>
 *         <Tab eventKey={3}>Content for tab 3</Tab>
 *       </SimpleAltTabs>
 *     );
 *   }
 * });
 * ```
 *
 * @property responsiveBreakpoint {one of: `"xs"`, `"sm"`, `"md"`, `lg`} The
 * size at which the small-screen tabs (accordion-style) should switch to
 * large-screen tabs (folder-style)
 *
 * @property defaultActiveKey {should equal one of your tab's event keys} The
 * tab which will start out open
 *
 * @property smallScreenClassName {css class} Will be applied to small screen
 * tabs only
 *
 * @property largeScreenClassName {css class} Will be applied to large screen
 * tabs only
 *
 * @property onSelect {function} Will override default behavior when clicking
 * on a tab. If you want to retain the default behavior as well as add new
 * functionality, change default active key in the function you provide
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#tabs_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#tab)
 */
const SimpleAltTabs = React.createClass({
  render() {
    return (
      <BaseTabs {...this.props} tabType="tab-simple-alt"/>
    );
  }
});

/**
 * @component LeftTabs
 * @description Tabs with the nav stacked on the left
 *
 * @example ```js
 * var LeftTabs = require('pui-react-tabs').LeftTabs;
 * var Tab = require('pui-react-tabs').Tab;
 * var MyComponent = React.createClass({
 *   render() {
 *     return (
 *       <LeftTabs defaultActiveKey={1} tabWidth={3} paneWidth={9}>
 *         <Tab eventKey={1} title="Tab 1">Wow!</Tab>
 *         <Tab eventKey={2} title="Tab 2">
 *           <h2>Neat!</h2>
 *           <span>So much content.</span>
 *         </Tab>
 *       </LeftTabs>
 *     );
 *   }
 * });
 * ```
 *
 * @property responsiveBreakpoint {one of: `"xs"`, `"sm"`, `"md"`, `lg`} The
 * size at which the small-screen tabs (accordion-style) should switch to
 * large-screen tabs (folder-style)
 *
 * @property defaultActiveKey {should equal one of your tab's event keys} The
 * tab which will start out open
 *
 * @property smallScreenClassName {css class} Will be applied to small screen
 * tabs only
 *
 * @property largeScreenClassName {css class} Will be applied to large screen
 * tabs only
 *
 * @property onSelect {function} Will override default behavior when clicking
 * on a tab. If you want to retain the default behavior as well as add new
 * functionality, change default active key in the function you provide
 *
 * @property tabWidth {number} Takes the number of bs Columns. Optional: the default is 3.
 *
 * @property paneWidth {number} Takes the number of bs Columns. Optional: the default is 12 - tabWidth.
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#tabs_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#tab)
 */
const LeftTabs = React.createClass({
  propTypes: {
    position: React.PropTypes.oneOf(['top', 'left']),
    tabWidth: React.PropTypes.number,
    paneWidth: React.PropTypes.number
  },
  getDefaultProps() {
    return {
      position: 'left',
      tabWidth: 3
    };
  },
  render() {
    let {tabWidth, paneWidth, ...props} = this.props;
    if (!paneWidth) {
      paneWidth = 12 - tabWidth;
    }
    return (
      <BaseTabs {...props} tabWidth={tabWidth} paneWidth={paneWidth} tabType="tab-simple-alt"/>
    );
  }
});

/**
 * @component Tab
 * @description A container for content in a `<SimpleTabs>` or `<SimpleAltTabs>`
 *
 * @property eventKey {Number} An identifier for the tab
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#tabs_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#tab)
 */
let Tab = BsTab;

module.exports = {
  BaseTabs,
  SimpleTabs,
  SimpleAltTabs,
  Tab,
  LeftTabs
};


/*doc
---
title: Tabs
name: tabs_react
categories:
- React
---

<code class="pam">
<i class="fa fa-download" alt="Install the Component">
npm install pui-react-tabs --save
</i>
</code>

Require the subcomponent:

```
var SimpleTabs = require('pui-react-tabs').SimpleTabs;
```


Using Tab components in React consists of a parent element for the desired Tab type (for example,
`SimpleTabs` or `SimpleAltTabs`). Each `Tab` is a child of this and has a `tab` property for the
string value a Tab should display. Additionally, each `Tab` must define an `eventKey` property
for uniquely identifying this tab to its parent component.

Tabs are responsive, and will display accordion-style on small screens and folder-style on large
screens. They can also take a few optional special props.

Property   | Required? | Type             | Description
-----------| ----------|------------------| --------------------------------------------------------------------------
`responsiveBreakpoint` | no        | one of: `"xs"`, `"sm"`, `"md"`, `lg`,          | The size at which the small-screen tabs (accordion-style) should switch to large-screen tabs (folder-style)
`defaultActiveKey` | no            | should equal one of your tab's event keys | The tab which will start out open
`smallScreenClassName` | no  | css class | Will be applied to small screen tabs only
`largeScreenClassName` | no  | css class | Will be applied to large screen tabs only
`onSelect` | no | function | Will override default behavior when clicking on a tab. If you want to retain the default behavior as well as add new functionality, change default active key in the function you provide

*/

/*doc
---
title: Simple
name: 01_simple_tabs_react
parent: tabs_react
---

```react_example
<SimpleTabs defaultActiveKey={1}>
  <Tab eventKey={1} title="Tab 1">Wow!</Tab>
  <Tab eventKey={2} title="Tab 2">
    <h2>Neat!</h2>
    <span>So much content.</span>
  </Tab>
</SimpleTabs>
```
*/

/*doc
---
title: Alt
name: 02_alt_tabs_react
parent: tabs_react
---

```react_example
<SimpleAltTabs defaultActiveKey={2}>
  <Tab eventKey={1} title="Tab 1">Wow!</Tab>
  <Tab eventKey={2} title="Tab 2">
    <h2>Neat!</h2>
    <span>So much content.</span>
  </Tab>
</SimpleAltTabs>
```
*/


/*doc
 ---
 title: Left
 name: 03_left_tabs_react
 parent: tabs_react
 ---

 `LeftTabs` can be used to create tabs where the nav is stacked on the left. They
 take a few optional special properties in addition to the same properties as SimpleTabs and SimpleAltTabs.

 Property   | Required? | Type             | Description                                  | Default
 -----------| ----------|------------------| ---------------------------------------------|------------------------
 `tabWidth` | no        |  `number`        | The number of bs columns for the tabs        | 3
 `paneWidth` | no       | `number`         | The number of bs columns for the tab content | 12 - `tabWidth`

```react_example
<LeftTabs defaultActiveKey={1} tabWidth={3} paneWidth={9}>
  <Tab eventKey={1} title="Tab 1">Wow!</Tab>
  <Tab eventKey={2} title="Tab 2">
    Neat!
    <span>So much content.</span>
  </Tab>
</LeftTabs>
```

 */
