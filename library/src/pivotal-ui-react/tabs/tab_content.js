const classnames = require('classnames');
const React = require('react');

const types = React.PropTypes;

class TabContent extends React.Component {
  static propTypes = {
    activeKey: types.any,
    childArray: types.array,
    id: types.string,
    isLeft: types.bool,
    paneWidth: types.number,
    transitionProgress: types.number
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
          <div className='tab-pane fade active in' id={paneId} role='tabpanel' aria-labelledby={ariaLabelledBy || tabId}
               aria-hidden='false' style={style}>
            {children}
          </div>
        </div>
      );
    });

    return tabContent;
  }
}

module.exports = TabContent;