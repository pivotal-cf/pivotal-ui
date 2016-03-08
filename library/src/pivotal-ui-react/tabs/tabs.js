import React from 'react';
import Tabs from 'react-bootstrap/lib/Tabs';
import BsTab from 'react-bootstrap/lib/Tab';
import Accordion from 'react-bootstrap/lib/Accordion';
import Panel from 'react-bootstrap/lib/Panel';
import uniqueid from 'lodash.uniqueid';
import classnames from 'classnames';
import MediaSize from './media-size';
import 'pui-css-collapse';
import 'pui-css-tabs';

class BaseTabs extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      activeKey: this.props.defaultActiveKey,
      smallScreen: false,
      id: uniqueid('pui-react-tabs-')
    };
  }

  static propTypes = {
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
  };

  static defaultProps = {
    responsiveBreakpoint: 'xs'
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultActiveKey !== this.props.defaultActiveKey) {
      this.setActiveKey(nextProps.defaultActiveKey);
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.checkScreenSize);
    this.checkScreenSize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkScreenSize);
  }

  setActiveKey(key) {
    const previousActiveKey = this.state.activeKey;
    this.setState({
      activeKey: key,
      previousActiveKey
    });
  }

  checkScreenSize = () => {
    if(MediaSize.matches(this.props.responsiveBreakpoint)) {
      this.setState({smallScreen: false});
    } else {
      this.setState({smallScreen: true});
    }
  };

  handleSelect = (key) => {
    if (!this.props.onSelect) {
      this.setActiveKey(key);
    } else {
      this.props.onSelect(key);
    }
  };

  render() {
    const {defaultActiveKey, children, responsiveBreakpoint, tabType, largeScreenClassName,
      smallScreenClassName, onSelect, position, tabWidth, paneWidth, className, ...props} = this.props;
    const largeScreenClasses = classnames([tabType, largeScreenClassName, className]);
    const smallScreenClasses = classnames([`${tabType}-small-screen`, smallScreenClassName, className]);

    let tabs;

    if(this.state.smallScreen) {
      const childrenAsPanels = React.Children.map(children, (child) => {
        const {title, ...childProps} = child.props;
        return <Panel header={title} {...childProps}/>;
      });

      tabs = (
        <Accordion className={smallScreenClasses}
                   activeKey={this.state.activeKey}
                   onSelect={this.handleSelect}
                  {...props}>
          {childrenAsPanels}
        </Accordion>
      );
    } else {
      tabs = (
        <Tabs position={position}
              tabWidth={tabWidth}
              paneWidth={paneWidth}
              activeKey={this.state.activeKey}
              onSelect={this.handleSelect}
              className={largeScreenClasses}
              {...{id: this.state.id, ...props}}>
          {children}
        </Tabs>
      );
    }

    return (
      <div>
        {tabs}
      </div>
    );
  }
}

class SimpleTabs extends React.Component {
  render() {
    return (
      <BaseTabs {...this.props} tabType="tab-simple"/>
    );
  }
}

class SimpleAltTabs extends React.Component {
  render() {
    return (
      <BaseTabs {...this.props} tabType="tab-simple-alt"/>
    );
  }
}

class LeftTabs extends React.Component {
  static propTypes = {
    position: React.PropTypes.oneOf(['top', 'left']),
    tabWidth: React.PropTypes.number,
    paneWidth: React.PropTypes.number
  };

  static defaultProps = {
    position: 'left',
    tabWidth: 6
  };

  render() {
    let {tabWidth, paneWidth, ...props} = this.props;
    if (!paneWidth) {
      paneWidth = 24 - tabWidth;
    }
    return (
      <BaseTabs {...props} tabWidth={tabWidth} paneWidth={paneWidth} tabType="tab-left"/>
    );
  }
}

let Tab = BsTab;

module.exports = {
  BaseTabs,
  SimpleTabs,
  SimpleAltTabs,
  Tab,
  LeftTabs
};
