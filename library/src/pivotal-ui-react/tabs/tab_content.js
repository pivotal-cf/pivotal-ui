import classnames from 'classnames';
import React from 'react';

import PropTypes from 'prop-types';

export default class TabContent extends React.Component {
  static propTypes = {
    activeKey: PropTypes.any,
    childArray: PropTypes.array,
    id: PropTypes.string,
    isLeft: PropTypes.bool,
    paneWidth: PropTypes.number,
    transitionProgress: PropTypes.number
  };

  render() {
    const {activeKey, childArray, id, isLeft, paneWidth, transitionProgress} = this.props;
    let tabContent = null;
    const leftPaneClasses = `col-xs-${paneWidth}`;

    childArray.forEach((child, key) => {
      const {
        ['aria-labelledby']: ariaLabelledBy,
        children,
        className,
        eventKey,
        onEntered,
        onExited,
        tabClassName,
        ...props
      } = child.props;

      const paneId = `${id}-pane-${key}`;
      const tabId = `${id}-tab-${key}`;
      const isActive = (eventKey === activeKey);
      const style = transitionProgress < 1 ? {opacity: Math.abs(1 - 2 * transitionProgress)} : {};

      if (!isActive) return false;
      tabContent = (
        <div className={classnames('tab-content', {[leftPaneClasses]: isLeft}, className)} {...props}>
          <div className="tab-pane fade active in" id={paneId} role="tabpanel" aria-labelledby={ariaLabelledBy || tabId}
               aria-hidden="false" style={style}>
            {children}
          </div>
        </div>
      );
    });

    return tabContent;
  }
}
