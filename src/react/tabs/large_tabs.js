import React from 'react';
import PropTypes from 'prop-types';
import Animation from '../mixins/mixins/animation_mixin';
import TabContent from './tab_content';
import TabHeaders from './tab_headers';
import classnames from 'classnames';
import {default as mixin} from '../mixins';

export class LargeTabs extends mixin(React.Component).with(Animation) {
  static propTypes = {
    actions: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
    activeKey: PropTypes.any,
    childArray: PropTypes.array,
    handleClick: PropTypes.func,
    id: PropTypes.string,
    largeScreenClassName: PropTypes.string,
    onSelect: PropTypes.func,
    paneWidth: PropTypes.number,
    position: PropTypes.oneOf(['top', 'left']),
    previouslyActiveKey: PropTypes.any,
    tabType: PropTypes.oneOf(['simple', 'simple-alt', 'left']),
    tabWidth: PropTypes.number
  };

  render() {
    const {
      actions,
      activeKey,
      className,
      childArray,
      handleClick,
      id,
      largeScreenClassName,
      onSelect,
      paneWidth,
      position,
      previousActiveKey,
      tabType,
      tabWidth,
      transitionProgress,
      ...props
    } = this.props;

    const currentActiveKey = transitionProgress >= 0.5 ? activeKey : previousActiveKey;
    const largeScreenClasses = classnames([`tab-${tabType}`, largeScreenClassName, className]);
    const actionsNode = actions ? <div className="tabs-action">{actions}</div> : null;
    const isLeft = position === 'left';
    
    return (<div className={classnames(largeScreenClasses, {'tab-left clearfix': isLeft})} {...props}>
      {actionsNode}
      <TabHeaders {...{childArray, activeKey, handleClick, isLeft, id, onSelect, tabWidth}} />
      <TabContent {...{childArray, activeKey: currentActiveKey, id, isLeft, paneWidth, transitionProgress}}/>
    </div>);
  }
}
