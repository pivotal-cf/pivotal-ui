import Animation from 'pui-react-mixins/mixins/animation_mixin';
import BsTab from 'react-bootstrap/lib/Tab';
import classnames from 'classnames';
import {SmallTabs} from './small_tabs';
import MediaSize from './media-size';
import mixin from 'pui-react-mixins';
require('pui-css-tabs');
import React from 'react';
import uniqueid from 'lodash.uniqueid';

const types = React.PropTypes;

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
    actions: types.node,
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
    animation: true,
    responsiveBreakpoint: 'xs',
    tabType: 'simple'
  };

  static ANIMATION_TIME = 400;

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
      actions,
      animation,
      children,
      className,
      defaultActiveKey,
      id = this.state.id,
      largeScreenClassName,
      onSelect,
      paneWidth,
      position,
      responsiveBreakpoint,
      smallScreenClassName,
      tabType,
      tabWidth,
      ...props} = this.props;
    const largeScreenClasses = classnames([`tab-${tabType}`, largeScreenClassName, className]);

    const transitionProgress = this.animate('transitionProgress', 1, animation ? Tabs.ANIMATION_TIME : 0);

    const childArray = React.Children.toArray(children);

    if (this.state.smallScreen) {
      return (
        <SmallTabs
          {...this.state}
          {...this.props}
          {...{
            transitionProgress,
            handleClick: this.handleClick
          }}

        />
      );
    }

    const listChildren = childArray.map((child, key) => {
      const {eventKey, tabClassName, title} = child.props;
      const paneId = `${id}-pane-${key}`;
      const tabId = `${id}-tab-${key}`;
      const isActive = (eventKey === this.state.activeKey);

      return (
        <li key={key} role='presentation' className={classnames({active: isActive})}>
          <a id={tabId} aria-controls={paneId} aria-selected={isActive} role="tab" className={tabClassName}
             onClick={(e) => this.handleClick(e, eventKey, onSelect)}>{title}</a>
        </li>
      )
    });

    const isLeft = position === 'left';
    const leftPaneClasses = `col-xs-${paneWidth}`;
    const leftTabClasses = `col-xs-${tabWidth} nav-pills nav-stacked`;

    let tabContent = null;
    const activeKey = transitionProgress >= 0.5 ? this.state.activeKey : this.state.previousActiveKey;
    childArray.forEach((child, key) => {
      const {eventKey, children, className, tabClassName, ...props} = child.props;
      const paneId = `${id}-pane-${key}`;
      const tabId = `${id}-tab-${key}`;
      const isActive = (eventKey === activeKey);
      const style = transitionProgress < 1 ? {opacity: Math.abs(1 - 2 * transitionProgress)} : {};

      if (!isActive) return false;
      tabContent = (
        <div className={classnames('tab-content', {[leftPaneClasses]: isLeft}, className)} {...props}>
          <div className='tab-pane fade active in' id={paneId} role='tabpanel' aria-labelledby={tabId}
               aria-hidden='false' style={style}>
            {children}
          </div>
        </div>
      );
    });

    const actionsNode = actions ? <div className="tabs-action">{actions}</div> : null;

    return (
      <div className={classnames(largeScreenClasses, {'tab-left clearfix': isLeft})} {...props}>
        {actionsNode}
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
