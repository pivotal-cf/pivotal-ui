const Animation = require('pui-react-mixins/mixins/animation_mixin');
const TabContent = require('./tab_content');
const TabHeaders = require('./tab_headers');
const classnames = require('classnames');
const mixin = require('pui-react-mixins');
const React = require('react');

const types = React.PropTypes;

class LargeTabs extends mixin(React.Component).with(Animation) {
  static propTypes = {
    actions: types.node,
    activeKey: types.number,
    childArray: types.array,
    handleClick: types.func,
    id: types.string,
    largeScreenClassName: types.string,
    onSelect: types.func,
    paneWidth: types.number,
    position: types.oneOf(['top', 'left']),
    previouslyActiveKey: types.any,
    tabType: types.oneOf(['simple', 'simple-alt', 'left']),
    tabWidth: types.number
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
      ...props} = this.props;

    const currentActiveKey = transitionProgress >= 0.5 ? activeKey : previousActiveKey;
    const largeScreenClasses = classnames([`tab-${tabType}`, largeScreenClassName, className]);
    const actionsNode = actions ? <div className="tabs-action">{actions}</div> : null;
    const isLeft = position === 'left';

    return (
      <div className={classnames(largeScreenClasses, {'tab-left clearfix': isLeft})} {...props}>
        {actionsNode}
        <TabHeaders {...{childArray, activeKey, handleClick, isLeft, id, onSelect, tabWidth}} />
        <TabContent {...{childArray, activeKey: currentActiveKey, id, isLeft, paneWidth, transitionProgress}}/>
      </div>
    );
  }
}

module.exports = {LargeTabs};
