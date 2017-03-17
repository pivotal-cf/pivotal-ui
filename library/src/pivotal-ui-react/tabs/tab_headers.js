import classnames from 'classnames'
import React from 'react'

const types = React.PropTypes

export default class TabHeaders extends React.Component {
  static propTypes = {
    activeKey: types.any,
    childArray: types.array,
    handleClick: types.func,
    isLeft: types.bool,
    id: types.string.isRequired,
    onSelect: types.func,
    tabWidth: types.number
  }

  render() {
    const {childArray, activeKey, handleClick, isLeft, id, onSelect, tabWidth} = this.props
    const leftTabClasses = `col-xs-${tabWidth} nav-pills nav-stacked`

    const listChildren = childArray.map((child, key) => {
      const {disabled, eventKey, tabClassName, title} = child.props
      const paneId = `${id}-pane-${key}`
      const tabId = `${id}-tab-${key}`
      const isActive = (eventKey === activeKey)

      const onClick = disabled ? () => {} : e => handleClick(e, eventKey, onSelect)
      return (
        <li key={key} role='presentation' className={classnames({active: isActive, disabled})} aria-expanded={isActive}>
          <a id={tabId} aria-controls={paneId} aria-selected={isActive} role="tab" className={tabClassName} tabIndex="0"
             onClick={onClick}>{title}</a>
        </li>
      )
    })

    return (<ul role='tablist' className={classnames('nav', {'nav-tabs': !isLeft}, {[leftTabClasses]: isLeft})}>
      {listChildren}
    </ul>)
  }
}
