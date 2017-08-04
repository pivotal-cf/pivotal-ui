import React from 'react';
import PropTypes from 'prop-types';
import {Collapsible} from 'pui-react-collapsible';
import classnames from 'classnames';

class SmallTab extends React.PureComponent {
  static propTypes = {
    animation: PropTypes.bool,
    ariaLabelledBy: PropTypes.string,
    disabled: PropTypes.bool,
    expanded: PropTypes.bool,
    header: PropTypes.node,
    onClick: PropTypes.func,
    paneId: PropTypes.string
  };

  render() {
    const {animation, ariaLabelledBy, children, disabled, expanded, header, onClick, paneId} = this.props;
    let delay;
    if (!animation) delay = 0;

    const collapsibleProps = {
      'aria-labelledby': ariaLabelledBy,
      className: 'tab-content',
      delay,
      expanded,
      role: 'tabpanel'
    };

    return (<div>
      <div className="tab-heading">
        <h4 className="tab-title" role="presentation">
          <a aria-expanded={expanded} aria-controls={paneId} aria-selected={expanded}
             className={classnames({disabled})} role="tab" onClick={onClick}>{header}</a>
        </h4>
      </div>
      <Collapsible {...collapsibleProps}>
        {children}
      </Collapsible>
    </div>);
  }
}

export class SmallTabs extends React.Component {
  static propTypes = {
    actions: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
    activeKey: PropTypes.number,
    animation: PropTypes.bool,
    id: PropTypes.string,
    handleClick: PropTypes.func,
    onSelect: PropTypes.func,
    smallScreenClassName: PropTypes.string,
    tabType: PropTypes.string
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
      const onClick = disabled ? () => {
      } : (e) => handleClick(e, eventKey, onSelect);
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

    return (<div className={smallScreenClasses}>
      {actionsNode}
      {childrenAsPanels}
    </div>);
  }
}
