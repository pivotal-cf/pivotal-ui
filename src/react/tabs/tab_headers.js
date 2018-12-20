import classnames from 'classnames';
import React from 'react';

import PropTypes from 'prop-types';

export default class TabHeaders extends React.Component {
  static propTypes = {
    activeKey: PropTypes.any,
    childArray: PropTypes.array,
    handleClick: PropTypes.func,
    isLeft: PropTypes.bool,
    id: PropTypes.string.isRequired,
    onSelect: PropTypes.func
  };

  render() {
    const {childArray, activeKey, handleClick, isLeft, id, onSelect} = this.props;
    const leftTabClasses = 'nav-pills nav-stacked';

    const listChildren = childArray.map((child, key) => {
      const {disabled, eventKey, tabClassName, title} = child.props;
      const paneId = `${id}-pane-${key}`;
      const tabId = `${id}-tab-${key}`;
      const isActive = (eventKey === activeKey);

      const onClick = disabled ? () => {} : e => handleClick(e, eventKey, onSelect);
      return (
        <li key={key} role="presentation" className={classnames({active: isActive, disabled})} aria-expanded={isActive}>
          <a id={tabId} aria-controls={paneId} aria-selected={isActive} role="tab" className={tabClassName} tabIndex="0"
             onClick={onClick} href="#">{title}</a>
        </li>
      );
    });

    return (<ul role="tablist" className={classnames('nav', {'nav-tabs': !isLeft, [leftTabClasses]: isLeft})}>
      {listChildren}
    </ul>);
  }
}
