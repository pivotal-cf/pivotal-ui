import React from 'react'
import 'pui-css-tooltips'
import classnames from 'classnames'

export class Tooltip extends React.Component {
  static propTypes = {
    content: React.PropTypes.element.isRequired,
    tooltipContent: React.PropTypes.node.isRequired,
    position: React.PropTypes.oneOf(['left', 'right', 'bottom', 'top']),
    trigger: React.PropTypes.oneOf(['hover', 'click']),
    clickHideDelay: React.PropTypes.number,
    onEnter: React.PropTypes.func,
    onExit: React.PropTypes.func,
    theme: React.PropTypes.oneOf(['dark', 'light']),
    size: React.PropTypes.oneOf(['auto', 'sm', 'md', 'lg'])
  }

  static defaultProps = {
    position: 'top',
    trigger: 'hover',
    clickHideDelay: 1000,
    onEnter: () => {},
    onExit: () => {},
    theme: 'dark',
    size: 'auto'
  }

  constructor(props) {
    super(props)
    this.state = {visible: false}
  }

  hoverHandler(e) {
    this.setState({visible: e.type === 'mouseenter'})
  }

  clickHandler() {
    this.setState({visible: true})
    setTimeout(() => {
      this.setState({visible: false})
    }, this.props.clickHideDelay)
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.visible && !this.state.visible) {
      this.props.onExit()
    } else if(!prevState.visible && this.state.visible) {
      this.props.onEnter()
    }
  }

  render() {
    const {position, content, tooltipContent, trigger, className, clickHideDelay, onEnter, onExit, theme, size, ...others} = this.props
    const {visible} = this.state

    let positionClass
    if(position != 'top') {
      positionClass = `tooltip-${position}`
    }

    const newContentClass = classnames('tooltip-container', visible ? 'tooltip-container-visible' : 'tooltip-container-hidden')
    const newContent = (<div className={newContentClass}>
      <div className="tooltip-content">
        {tooltipContent}
      </div>
    </div>)

    let triggerHandler
    switch(trigger) {
      case 'click':
        triggerHandler = {onClick: this.clickHandler.bind(this)}
        break
      default:
        triggerHandler = {
          onMouseEnter: this.hoverHandler.bind(this),
          onMouseLeave: this.hoverHandler.bind(this)
        }
        break
    }

    const newClasses = classnames('tooltip', className, positionClass,
      content.props ? content.props.className : null,
      theme === 'light' ? 'tooltip-light' : null,
      size === 'auto' ? null : `tooltip-${size}`)
    const newProps = Object.assign({className: newClasses}, triggerHandler, others)

    return React.cloneElement(content, newProps, content.props.children, newContent)
  }
}
