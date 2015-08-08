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
    onSelect: React.PropTypes.func
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
    const {defaultActiveKey, children, responsiveBreakpoint, tabType, largeScreenClassName, smallScreenClassName, onSelect, ...props} = this.props;
    const largeScreenClasses = classnames([`hidden-${responsiveBreakpoint}`, tabType, largeScreenClassName]);
    const smallScreenClasses = classnames([`visible-${responsiveBreakpoint}-block`, `${tabType}-small-screen`, smallScreenClassName]);
    return (
      <div {...props}>
        <div className={largeScreenClasses}>
          <Tabs id={uniqueid('pui-react-tabs-')} activeKey={this.state.activeKey} onSelect={this.handleSelect}>
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
