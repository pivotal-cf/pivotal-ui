import React from 'react';
import {copy} from './clipboard-helper';
import {mergeProps} from 'pui-react-helpers';
import {Icon} from 'pui-react-iconography';
import {TooltipTrigger} from 'pui-react-tooltip';
import 'pui-css-copy-to-clipboard';

const types = React.PropTypes;

export class CopyToClipboard extends React.Component {
  static propTypes = {
    text: types.string.isRequired,
    onClick: types.func,
    getWindow: types.func,
  }

  static defaultProps = {
    getWindow: () => window,
  }

  click = ({props, text}, e) => {
    const window = this.props.getWindow()
    copy(window, window.document, text);
    const {onClick} = props;
    if(onClick) onClick(e);
  }

  render() {
    const {children, text, onClick, getWindow, ...others} = this.props;
    const obj = {props: this.props, text: null};

    const anchorProps = mergeProps(others, {
      className: 'copy-to-clipboard',
      onClick: this.click.bind(undefined, obj),
      role: 'button'
    });

    return (<a {...anchorProps}>
      <span className="sr-only" ref={ref => obj.text = ref}>{text}</span>
      {children}
    </a>);
  }
}

export class CopyToClipboardButton extends React.Component {
  static propTypes = {
    text: types.string,
    onClick: types.func,
    getWindow: types.func
  };

  static defaultProps = {
    onClick() {
    },
    getWindow: () => window
  };

  constructor(props, context) {
    super(props, context);
    this.state = {display: false};
  }

  click = e => {
    if(!this.state.display) this.setState({display: true}, () => {
      this.setState({display: false});
    });
    this.props.onClick(e);
  };

  render() {
    const {onClick, ...props} = this.props;
    const {display} = this.state;

    const copyProps = mergeProps(props, {
      className: 'copy-to-clipboard-button',
      onClick: this.click,
      getWindow: this.props.getWindow
    });

    const button = (<div className="clipboard-button">
      <Icon src="copy"/>
    </div>)

    return (<CopyToClipboard {...copyProps}>
      <TooltipTrigger tooltip="Copied" trigger="click">{button}</TooltipTrigger>
    </CopyToClipboard>)
  }
}