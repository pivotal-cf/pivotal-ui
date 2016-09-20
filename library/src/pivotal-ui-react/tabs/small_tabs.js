import React from 'react';
import {Collapsible} from 'pui-react-collapsible';
import classnames from 'classnames';

const types = React.PropTypes;

class SmallTab extends React.Component {
  static propTypes = {
    animation: types.bool,
    ariaLabelledBy: types.string,
    disabled: types.bool,
    expanded: types.bool,
    header: types.node,
    onClick: types.func,
    paneId: types.string
  };

  render() {
    const {animation, ariaLabelledBy, children, disabled, expanded, header, onClick, paneId} = this.props;
    let delay;
    if(!animation) delay = 0;

    const collapsibleProps = {
      'aria-labelledby': ariaLabelledBy,
      className: 'tab-content',
      delay,
      expanded,
      role: 'tabpanel'
    };
    return (
      <div>
        <div className="tab-heading">
          <h4 className="tab-title" role="presentation">
            <a aria-expanded={expanded} aria-controls={paneId} aria-selected={expanded}
               className={classnames({disabled})} role="tab" onClick={onClick}>{header}</a>
          </h4>
        </div>
        <Collapsible {...collapsibleProps}>
          {children}
        </Collapsible>
      </div>
    );
  }
}

class SmallTabs extends React.Component {
  static propTypes = {
    actions: types.node,
    activeKey: types.number,
    animation: types.bool,
    id: types.string,
    handleClick: types.func,
    onSelect: types.func,
    smallScreenClassName: types.string,
    tabType: types.string
  };

  render() {
    const {
      actions,
      activeKey,
      animation,
      children,
      className,
      id,
      handleClick,
      onSelect,
      smallScreenClassName,
      tabType
      } = this.props;
    const smallScreenClasses = classnames([`tab-${tabType}-small-screen`, 'panel-group', smallScreenClassName, className]);
    const childArray = React.Children.toArray(children);
    const childrenAsPanels = childArray.map((child, key) => {
      const {['aria-labelledby']: ariaLabelledBy, disabled, title, eventKey, children} = child.props;
      const paneId = `${id}-pane-${key}`;
      const tabId = `${id}-tab-${key}`;
      const onClick = disabled ? () => {} : (e) => handleClick(e, eventKey, onSelect);
      const myProps = {
        animation,
        ariaLabelledBy: ariaLabelledBy || tabId,
        disabled,
        expanded: eventKey === activeKey,
        header: title,
        key,
        onClick,
        paneId
      };
      return <SmallTab {...myProps}>{children}</SmallTab>;
    });

    const actionsNode = actions ? <div className="tabs-action">{actions}</div> : null;

    return (
      <div className={smallScreenClasses}>
        {actionsNode}
        {childrenAsPanels}
      </div>
    );
  }
}

module.exports = {SmallTabs};
