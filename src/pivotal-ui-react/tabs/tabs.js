import React from 'react';
import Tabs from 'react-bootstrap/lib/Tabs';
import BsTab from 'react-bootstrap/lib/Tab';
import uniqueid from 'lodash.uniqueid';

/**
 * @component SimpleTabs
 * @description Tab-based content toggling
 *
 * @property defaultActiveKey {Number} Indicates which `<Tab>` to show by default
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
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#tabs_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#tab)
 */
let SimpleTabs = React.createClass({
  render() {
    return <div className="tab-simple"><Tabs id={uniqueid('pui-react-tabs-')} {...this.props}/></div>;
  }
});

/**
 * @component SimpleAltTabs
 * @description `<SimpleTabs>` with different styling
 *
 * @property defaultActiveKey {Number} Indicates which tab to show by default
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
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#tabs_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#tab)
 */
let SimpleAltTabs = React.createClass({
  render() {
    return <div className="tab-simple-alt"><Tabs id={uniqueid('pui-react-tabs-')} {...this.props}/></div>;
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
  SimpleTabs,
  SimpleAltTabs,
  Tab
};
