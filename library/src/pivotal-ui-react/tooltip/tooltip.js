import React from 'react'
import 'pui-css-tooltips'
import classnames from 'classnames'

const types = React.PropTypes;

export class Tooltip extends React.Component {
  static propTypes = {
    content: types.node.isRequired,
    visible: types.bool,
    size: types.oneOf(['auto','sm', 'md', 'lg'])
  }

  static defaultProps = {
    visible: true,
    size: 'auto'
  }

  constructor(props) {
    super(props)
  }

  render() {
    let {visible, size, className, ...others} = this.props

    const newClasses = classnames('tooltip-container', visible ? 'tooltip-container-visible' : 'tooltip-container-hidden',
                                  size === 'auto' ? null : `tooltip-${size}`,
                                  className)

    return (
      <div className={newClasses} {...others}>
        <div className="tooltip-content">{this.props.content}</div>
      </div>
    )
  }
}

export class TooltipTrigger extends React.Component {
  static propTypes = {
    tooltip: types.node.isRequired,
    position: types.oneOf(['left', 'right', 'bottom', 'top']),
    trigger: types.oneOf(['hover', 'click']),
    clickHideDelay: types.number,
    onEnter: types.func,
    onExit: types.func,
    theme: types.oneOf(['dark', 'light']),
    size: types.oneOf(['auto', 'sm', 'md', 'lg'])
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
    const {position, tooltip, trigger, className, clickHideDelay, onEnter, onExit, theme, size, ...others} = this.props
    const {visible} = this.state

    let positionClass
    if(position != 'top') {
      positionClass = `tooltip-${position}`
    }

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
      theme === 'light' ? 'tooltip-light' : null)
    const newProps = Object.assign({className: newClasses}, triggerHandler, others)

    return (
      <div {...newProps}>
        {this.props.children}
        <Tooltip size={this.props.size} visible={visible} content={tooltip}/>
      </div>
    )
  }
}