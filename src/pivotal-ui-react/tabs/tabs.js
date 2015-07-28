var React = require('react');
var TabbedArea = require('react-bootstrap').TabbedArea;
import {mergeProps} from 'pui-react-helpers';

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
var SimpleTabs = React.createClass({
  render() {
    const {className, id, style, ...props} = this.props;
    const simpleProps = mergeProps({className, id, style}, {className: 'tab-simple'});
    return <div {...simpleProps}><TabbedArea {...props}/></div>;
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
var SimpleAltTabs = React.createClass({
  render() {
    const {className, id, style, ...props} = this.props;
    const simpleAltProps = mergeProps({className, id, style}, {className: 'tab-simple-alt'});
    return <div {...simpleAltProps}><TabbedArea {...props}/></div>;
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
var Tab = require('react-bootstrap').TabPane;

module.exports = {
  SimpleTabs,
  SimpleAltTabs,
  Tab
};
