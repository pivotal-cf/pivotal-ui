import React from 'react';
import Tabs from 'react-bootstrap/lib/Tabs';
import BsTab from 'react-bootstrap/lib/Tab';
import Accordion from 'react-bootstrap/lib/Accordion';
import Panel from 'react-bootstrap/lib/Panel';
import uniqueid from 'lodash.uniqueid';
import classnames from 'classnames';
import raf from 'raf';
import MediaSize from './media-size';

const BaseTabs = React.createClass({
  propTypes: {
    defaultActiveKey: React.PropTypes.any,
    tabType: React.PropTypes.oneOf(['tab-simple', 'tab-simple-alt', 'tab-left']),
    responsiveBreakpoint: React.PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
    largeScreenClassName: React.PropTypes.string,
    smallScreenClassName: React.PropTypes.string,
    onSelect: React.PropTypes.func,
    position: React.PropTypes.oneOf(['top', 'left']),
    tabWidth: React.PropTypes.number,
    paneWidth: React.PropTypes.number,
    id: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      responsiveBreakpoint: 'xs'
    };
  },

  getInitialState() {
    return {
      activeKey: this.props.defaultActiveKey,
      smallScreen: false,
      id: uniqueid('pui-react-tabs-')
    };
  },

  setActiveKey(key) {
    const previousActiveKey = this.state.activeKey;
    this.setState({
      activeKey: key,
      previousActiveKey
    });
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultActiveKey !== this.props.defaultActiveKey) {
      this.setActiveKey(nextProps.defaultActiveKey);
    }
  },

  componentDidMount() {
    raf(this.checkScreenSize);
  },

  checkScreenSize() {
    if(!this.isMounted()) {
      return;
    } else {
      if(MediaSize.matches(this.props.responsiveBreakpoint)) {
        this.setState({smallScreen: false});
      } else {
        this.setState({smallScreen: true});
      }

      raf(this.checkScreenSize);
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
    const largeScreenClasses = classnames([tabType, largeScreenClassName]);
    const smallScreenClasses = classnames([`${tabType}-small-screen`, smallScreenClassName]);

    let tabs;

    if(this.state.smallScreen) {
      const childrenAsPanels = React.Children.map(children, (child) => {
        const {title, ...childProps} = child.props;
        return <Panel header={title} {...childProps}/>;
      });

      tabs = (
        <Accordion className={smallScreenClasses}
                   activeKey={this.state.activeKey}
                   onSelect={this.handleSelect}>
          {childrenAsPanels}
        </Accordion>
      );
    } else {
      tabs = (
        <div className={largeScreenClasses}>
          <Tabs id={this.state.id || this.props.id}
                position={position}
                tabWidth={tabWidth}
                paneWidth={paneWidth}
                activeKey={this.state.activeKey}
                onSelect={this.handleSelect}>
            {children}
          </Tabs>
        </div>
      );
    }

    return (
      <div {...props}>
        {tabs}
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
 * @property tabWidth {number} Takes the number of bs Columns. Optional: the default is 6.
 *
 * @property paneWidth {number} Takes the number of bs Columns. Optional: the default is 24 - tabWidth.
 *
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
      tabWidth: 6
    };
  },
  render() {
    let {tabWidth, paneWidth, ...props} = this.props;
    if (!paneWidth) {
      paneWidth = 24 - tabWidth;
    }
    return (
      <BaseTabs {...props} tabWidth={tabWidth} paneWidth={paneWidth} tabType="tab-left"/>
    );
  }
});

/**
 * @component Tab
 * @description A container for content in a `<SimpleTabs>` or `<SimpleAltTabs>`
 *
 * @property eventKey {Number} An identifier for the tab
 *
 */
let Tab = BsTab;

module.exports = {
  BaseTabs,
  SimpleTabs,
  SimpleAltTabs,
  Tab,
  LeftTabs
};
