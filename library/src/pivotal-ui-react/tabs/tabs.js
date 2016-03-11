import React from 'react';
import BsTab from 'react-bootstrap/lib/Tab';
import uniqueid from 'lodash.uniqueid';
import classnames from 'classnames';
import MediaSize from './media-size';
import 'pui-css-collapse';
import 'pui-css-tabs';
import {mixin, Animation} from 'pui-react-mixins';

const types = React.PropTypes;

class SmallTab extends React.Component {
  static propTypes = {
    expanded: types.bool,
    header: types.node,
    onClick: types.func,
    paneId: types.string,
    transitionProgress: types.number
  };

  render() {
    const {className, children, expanded, header, onClick, paneId, transitionProgress, ...props} = this.props;
    const style = transitionProgress < 1 ? {opacity: Math.abs(1 - 2 * transitionProgress)} : {};

    return (
      <div>
        <div className="tab-heading">
          <h4 className="tab-title" role="presentation">
            <a aria-expanded={expanded} aria-controls={paneId} aria-selected={expanded} role="tab" onClick={onClick}>{header}</a>
          </h4>
        </div>
        <div className={classnames(className, 'tab-collapse', 'collapse', {'in': expanded})} aria-hidden={!expanded} role="tabpanel" {...props}>
          <div className="tab-body">
            <div style={style}>{children}</div>
          </div>
        </div>
      </div>
    );
  }
}

class SmallTabs extends React.Component {
  static propTypes = {
    activeKey: types.number,
    id: types.string,
    handleClick: types.func,
    onSelect: types.func,
    previousActiveKey: types.number,
    smallScreenClassName: types.string,
    tabType: types.string,
    transitionProgress: types.number
  };

  render() {
    const {
      activeKey,
      children,
      className,
      id,
      handleClick,
      onSelect,
      previousActiveKey,
      smallScreenClassName,
      tabType,
      transitionProgress
      } = this.props;
    const smallScreenClasses = classnames([`tab-${tabType}-small-screen`, 'panel-group', smallScreenClassName, className]);
    const childArray = React.Children.toArray(children);
    const animatedActiveKey = transitionProgress >= 0.5 ? activeKey : previousActiveKey;
    const childrenAsPanels = childArray.map((child, key) => {
      const {title, eventKey, children} = child.props;
      const isActive = (eventKey === animatedActiveKey);
      const paneId = `${id}-pane-${key}`;
      const myProps = {
        expanded: isActive,
        header: title,
        key,
        onClick: (e) => handleClick(e, eventKey, onSelect),
        paneId,
        transitionProgress
      };
      return <SmallTab {...myProps}>{isActive && children}</SmallTab>;
    });

    return (
      <div className={smallScreenClasses}>{childrenAsPanels}</div>
    );
  }
}

class Tabs extends mixin(React.Component).with(Animation) {
  constructor(props, context) {
    super(props, context);

    let {id} = this.props;
    if (typeof id === 'undefined') {
      id = uniqueid('pui-react-tabs-');
    }
    this.state = {
      activeKey: this.props.defaultActiveKey,
      smallScreen: false,
      id
    };
  }

  static propTypes = {
    activeKey: types.number,
    defaultActiveKey: types.any,
    id: types.string,
    largeScreenClassName: types.string,
    onSelect: types.func,
    paneWidth: types.number,
    position: types.oneOf(['top', 'left']),
    responsiveBreakpoint: types.oneOf(['xs', 'sm', 'md', 'lg']),
    smallScreenClassName: types.string,
    tabType: types.oneOf(['simple', 'simple-alt', 'left']),
    tabWidth: types.number
  };

  static defaultProps = {
    responsiveBreakpoint: 'xs',
    tabType: 'simple'
  };

  static ANIMATION_TIME = 500;

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
    if (key !== previousActiveKey) this.animate('transitionProgress', 0);
  }

  checkScreenSize = () => {
    if (MediaSize.matches(this.props.responsiveBreakpoint)) {
      this.setState({smallScreen: false});
    } else {
      this.setState({smallScreen: true});
    }
  };

  handleClick = (e, eventKey, callback) => {
    if (callback) {
      (callback(e, eventKey));
    } else {
      this.setActiveKey(eventKey);
    }
  };

  render() {
    const {
      children,
      className,
      defaultActiveKey,
      id = this.state.id,
      largeScreenClassName,
      onSelect,
      paneWidth,
      position,
      tabType,
      tabWidth,
      responsiveBreakpoint,
      ...props} = this.props;
    const largeScreenClasses = classnames([`tab-${tabType}`, largeScreenClassName, className]);

    const transitionProgress = this.animate('transitionProgress', 1, Tabs.ANIMATION_TIME);

    const childArray = React.Children.toArray(children);

    if (this.state.smallScreen) {
      return (
        <SmallTabs {...this.state} {...this.props} {...{transitionProgress, handleClick: this.handleClick}}/>
      );
    }

    const listChildren = childArray.map((child, key) => {
      const {eventKey} = child.props;
      const paneId = `${id}-pane-${key}`;
      const tabId = `${id}-tab-${key}`;
      const isActive = (eventKey === this.state.activeKey);

      return (
        <li key={key} role='presentation' className={classnames({active: isActive})}>
          <a id={tabId} aria-controls={paneId} aria-selected={isActive} role="tab" onClick={(e) => this.handleClick(e, eventKey, onSelect)}>{child.props.title}</a>
        </li>
      )
    });

    const isLeft = position === 'left';
    const leftPaneClasses = `col-xs-${paneWidth}`;
    const leftTabClasses = `col-xs-${tabWidth} nav-pills nav-stacked`;

    let tabContent = null;
    const activeKey = transitionProgress >= 0.5 ? this.state.activeKey : this.state.previousActiveKey;
    childArray.forEach((child, key) => {
      const {eventKey, children} = child.props;
      const paneId = `${id}-pane-${key}`;
      const tabId = `${id}-tab-${key}`;
      const isActive = (eventKey === activeKey);
      const style = transitionProgress < 1 ? {opacity: Math.abs(1 - 2 * transitionProgress)} : {};

      if (!isActive) return false;
      tabContent = (
        <div className={classnames('tab-content', {[leftPaneClasses]: isLeft})} style={style}>
          <div className='tab-pane fade active in' id={paneId} role='tabpanel' aria-labelledby={tabId} aria-hidden='false'>
            {children}
          </div>
        </div>
      );
    });

    return (
      <div className={classnames(largeScreenClasses, {'tab-left clearfix': isLeft})} {...props}>
        <ul role='tablist'
            className={classnames('nav', {'nav-tabs': !isLeft}, {[leftTabClasses]: isLeft})}>
          {listChildren}
        </ul>
        {tabContent}
      </div>
    );
  }
}

class LeftTabs extends React.Component {
  static propTypes = {
    position: types.oneOf(['top', 'left']),
    tabWidth: types.number,
    paneWidth: types.number
  };

  static defaultProps = {
    position: 'left',
    tabWidth: 6,
    tabType: 'left'
  };

  render() {
    let {tabWidth, paneWidth, ...props} = this.props;
    if (!paneWidth) {
      paneWidth = 24 - tabWidth;
    }
    return (
      <Tabs {...props} tabWidth={tabWidth} paneWidth={paneWidth}/>
    );
  }
}

let Tab = BsTab;

module.exports = {
  Tabs,
  Tab,
  LeftTabs
};
